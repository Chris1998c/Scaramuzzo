import type Stripe from "stripe";
import { getSupabaseAdmin, hasSupabaseAdminCredentials } from "@/lib/supabase/admin";
import type { ParsedOrder } from "@/lib/stripe/parseCheckoutSession";
import type { OrderAddressJson } from "@/lib/crm/orderTypes";
import type { OrderItem } from "@/lib/email/sendOrderEmail";

function eurosToCents(value: number): number {
  return Math.round(value * 100);
}

function paymentIntentId(session: Stripe.Checkout.Session): string | null {
  const pi = session.payment_intent;
  if (!pi) return null;
  return typeof pi === "string" ? pi : pi.id;
}

function addressToJson(
  address: Stripe.Address | null | undefined,
  name?: string | null
): OrderAddressJson | null {
  if (!address) return null;

  return {
    name: name ?? null,
    line1: address.line1,
    line2: address.line2,
    city: address.city,
    state: address.state,
    postal_code: address.postal_code,
    country: address.country,
  };
}

function shippingDetailsFromSession(session: Stripe.Checkout.Session) {
  const extended = session as Stripe.Checkout.Session & {
    shipping_details?: {
      name?: string | null;
      address?: Stripe.Address | null;
    } | null;
  };

  return extended.shipping_details ?? null;
}

function metadataFromSession(
  session: Stripe.Checkout.Session
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(session.metadata ?? {})) {
    if (typeof value === "string" && value.length > 0) {
      out[key] = value;
    }
  }
  return out;
}

function catalogIdFromParsedItem(itemId: string): string | null {
  if (itemId.startsWith("cs_") || itemId.startsWith("li_")) {
    return null;
  }
  return itemId;
}

/** Chiave stabile per unique(order_id, line_item_id). */
export function resolveLineItemId(item: OrderItem, index: number): string {
  if (item.id.startsWith("li_")) {
    return item.id;
  }

  const catalogId = catalogIdFromParsedItem(item.id);
  if (catalogId) {
    return `catalog:${catalogId}:${index}`;
  }

  const nameKey = item.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return `fallback:${index}:${nameKey || "item"}`;
}

function buildSafeOrderPayload(
  session: Stripe.Checkout.Session,
  parsed: ParsedOrder,
  metadata: Record<string, string>,
  source: string,
  paidAt: string
) {
  const shippingDetails = shippingDetailsFromSession(session);

  return {
    stripe_payment_intent_id: paymentIntentId(session),
    order_ref: parsed.orderRef,
    source,
    customer_email: parsed.customerEmail || null,
    currency: (session.currency ?? "eur").toLowerCase(),
    subtotal: eurosToCents(parsed.subtotal),
    shipping: eurosToCents(parsed.shipping),
    discount: eurosToCents(parsed.discount),
    total: eurosToCents(parsed.total),
    payment_status: session.payment_status,
    stripe_status: session.status ?? null,
    shipping_name:
      shippingDetails?.name ?? session.customer_details?.name ?? null,
    shipping_address: addressToJson(
      shippingDetails?.address,
      shippingDetails?.name ?? session.customer_details?.name
    ),
    billing_address: addressToJson(
      session.customer_details?.address,
      session.customer_details?.name
    ),
    metadata,
    paid_at: paidAt,
  };
}

function buildItemRows(orderId: string, parsed: ParsedOrder) {
  return parsed.items.map((item, index) => {
    const unitAmount = eurosToCents(item.price);
    return {
      order_id: orderId,
      line_item_id: resolveLineItemId(item, index),
      catalog_id: catalogIdFromParsedItem(item.id),
      name: item.name,
      quantity: item.quantity,
      unit_amount: unitAmount,
      total: unitAmount * item.quantity,
      metadata: {},
    };
  });
}

async function syncOrderItems(
  orderId: string,
  parsed: ParsedOrder
): Promise<{ expected: number; synced: number; repaired: boolean }> {
  if (parsed.items.length === 0) {
    return { expected: 0, synced: 0, repaired: false };
  }

  const supabase = getSupabaseAdmin();
  const itemRows = buildItemRows(orderId, parsed);

  const { data: existingItems, error: existingError } = await supabase
    .from("order_items")
    .select("line_item_id")
    .eq("order_id", orderId);

  if (existingError) {
    throw new Error(`ORDER_ITEMS_LOOKUP_FAILED: ${existingError.message}`);
  }

  const existingIds = new Set(
    (existingItems ?? []).map((row) => row.line_item_id as string)
  );
  const expectedIds = new Set(itemRows.map((row) => row.line_item_id));
  const missingCount = itemRows.filter(
    (row) => !existingIds.has(row.line_item_id)
  ).length;
  const repaired =
    missingCount > 0 ||
    existingIds.size < expectedIds.size ||
    (existingIds.size > 0 && parsed.items.length > existingIds.size);

  const { error: upsertError } = await supabase
    .from("order_items")
    .upsert(itemRows, { onConflict: "order_id,line_item_id" });

  if (upsertError) {
    throw new Error(`ORDER_ITEMS_UPSERT_FAILED: ${upsertError.message}`);
  }

  return {
    expected: itemRows.length,
    synced: itemRows.length,
    repaired,
  };
}

export async function persistOrderFromCheckoutSession(
  session: Stripe.Checkout.Session,
  parsed: ParsedOrder
): Promise<{
  persisted: boolean;
  orderId?: string;
  itemsSynced?: number;
  itemsRepaired?: boolean;
}> {
  if (!hasSupabaseAdminCredentials()) {
    console.warn("⚠️ Supabase non configurato: ordine non persistito.");
    return { persisted: false };
  }

  const supabase = getSupabaseAdmin();
  const metadata = metadataFromSession(session);
  const source = metadata.source ?? "ecommerce";
  const paidAt = session.created
    ? new Date(session.created * 1000).toISOString()
    : new Date().toISOString();

  const { data: existing, error: existingError } = await supabase
    .from("orders")
    .select("id")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existingError) {
    throw new Error(`ORDER_LOOKUP_FAILED: ${existingError.message}`);
  }

  const safePayload = buildSafeOrderPayload(
    session,
    parsed,
    metadata,
    source,
    paidAt
  );

  let orderId: string;

  if (existing) {
    const { data: updated, error: updateError } = await supabase
      .from("orders")
      .update(safePayload)
      .eq("id", existing.id)
      .select("id")
      .single();

    if (updateError || !updated) {
      throw new Error(
        `ORDER_UPDATE_FAILED: ${updateError?.message ?? "unknown"}`
      );
    }

    orderId = updated.id;
  } else {
    const { data: inserted, error: insertError } = await supabase
      .from("orders")
      .insert({
        ...safePayload,
        stripe_session_id: session.id,
        status: "paid",
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      throw new Error(
        `ORDER_INSERT_FAILED: ${insertError?.message ?? "unknown"}`
      );
    }

    orderId = inserted.id;
  }

  const itemSync = await syncOrderItems(orderId, parsed);

  if (itemSync.repaired) {
    console.info(
      `🔧 Items ordine riparati/sincronizzati: ${parsed.orderRef} (${itemSync.synced}/${itemSync.expected})`
    );
  }

  return {
    persisted: true,
    orderId,
    itemsSynced: itemSync.synced,
    itemsRepaired: itemSync.repaired,
  };
}
