import { getSupabaseAdmin, hasSupabaseAdminCredentials } from "@/lib/supabase/admin";
import type { OrderItemRow, OrderRow } from "@/lib/crm/orderTypes";

export type CrmOrderListItem = {
  id: string;
  orderRef: string;
  customerEmail: string | null;
  totalCents: number;
  currency: string;
  status: string;
  paymentStatus: string | null;
  source: string | null;
  createdAt: string;
  stripeSessionId: string | null;
  fromDatabase: boolean;
};

export type CrmOrderDetail = OrderRow & {
  items: OrderItemRow[];
  fromDatabase: boolean;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

export async function listOrdersFromDatabase(
  limit = 50
): Promise<CrmOrderListItem[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, order_ref, customer_email, total, currency, status, payment_status, source, created_at, stripe_session_id"
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`LIST_ORDERS_FAILED: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    orderRef: row.order_ref,
    customerEmail: row.customer_email,
    totalCents: row.total,
    currency: row.currency,
    status: row.status,
    paymentStatus: row.payment_status,
    source: row.source,
    createdAt: row.created_at,
    stripeSessionId: row.stripe_session_id,
    fromDatabase: true,
  }));
}

export async function getOrderFromDatabase(
  idOrSessionId: string
): Promise<CrmOrderDetail | null> {
  const supabase = getSupabaseAdmin();

  let query = supabase.from("orders").select("*");

  if (isUuid(idOrSessionId)) {
    query = query.eq("id", idOrSessionId);
  } else {
    query = query.eq("stripe_session_id", idOrSessionId);
  }

  const { data: order, error } = await query.maybeSingle();

  if (error) {
    throw new Error(`GET_ORDER_FAILED: ${error.message}`);
  }

  if (!order) return null;

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", order.id)
    .order("created_at", { ascending: true });

  if (itemsError) {
    throw new Error(`GET_ORDER_ITEMS_FAILED: ${itemsError.message}`);
  }

  return {
    ...(order as OrderRow),
    items: (items ?? []) as OrderItemRow[],
    fromDatabase: true,
  };
}

export async function listCrmOrdersUnified(limit = 50): Promise<{
  orders: CrmOrderListItem[];
  source: "database" | "stripe";
}> {
  if (hasSupabaseAdminCredentials()) {
    try {
      const orders = await listOrdersFromDatabase(limit);
      if (orders.length > 0) {
        return { orders, source: "database" };
      }
    } catch (err) {
      console.warn("⚠️ Lettura ordini Supabase fallita, fallback Stripe:", err);
    }
  }

  const { listCrmOrdersFromStripe } = await import("@/lib/crm/stripeOrders");
  const stripeOrders = await listCrmOrdersFromStripe(limit);
  return { orders: stripeOrders, source: "stripe" };
}

export function formatAddressJson(
  address: OrderRow["shipping_address"]
): string | null {
  if (!address) return null;

  const parts = [
    address.name,
    [address.line1, address.line2].filter(Boolean).join(", "),
    [address.postal_code, address.city, address.state].filter(Boolean).join(" "),
    address.country,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join("\n") : null;
}
