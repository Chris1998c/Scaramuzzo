import type Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe/client";
import { parseCheckoutSession } from "@/lib/stripe/parseCheckoutSession";
import type { CrmOrderListItem } from "@/lib/crm/fetchOrders";

function sessionToListItem(session: Stripe.Checkout.Session): CrmOrderListItem {
  return {
    id: session.id,
    orderRef: session.metadata?.order_ref ?? session.id,
    customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
    totalCents: session.amount_total ?? 0,
    currency: (session.currency ?? "eur").toLowerCase(),
    status: session.status ?? "unknown",
    paymentStatus: session.payment_status,
    source: session.metadata?.source ?? null,
    createdAt: new Date(session.created * 1000).toISOString(),
    stripeSessionId: session.id,
    fromDatabase: false,
  };
}

export async function listCrmOrdersFromStripe(
  limit = 50
): Promise<CrmOrderListItem[]> {
  const stripe = getStripeClient();
  const response = await stripe.checkout.sessions.list({ limit });

  return response.data.map(sessionToListItem);
}

export type StripeOrderDetailFallback = {
  fromDatabase: false;
  sessionId: string;
  orderRef: string;
  customerEmail: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  paymentStatus: string;
  stripeStatus: string;
  billingAddress?: string;
  shippingAddress?: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  metadata: Record<string, string>;
};

export async function getCrmOrderFromStripe(
  sessionId: string
): Promise<StripeOrderDetailFallback | null> {
  if (!/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
    return null;
  }

  const stripe = getStripeClient();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const parsed = await parseCheckoutSession(stripe, session);

    const metadata: Record<string, string> = {};
    for (const [key, value] of Object.entries(session.metadata ?? {})) {
      if (typeof value === "string") metadata[key] = value;
    }

    return {
      fromDatabase: false,
      sessionId: session.id,
      orderRef: parsed.orderRef,
      customerEmail: parsed.customerEmail,
      subtotal: parsed.subtotal,
      shipping: parsed.shipping,
      discount: parsed.discount,
      total: parsed.total,
      currency: (session.currency ?? "eur").toUpperCase(),
      paymentStatus: session.payment_status,
      stripeStatus: session.status ?? "unknown",
      billingAddress: parsed.billingAddress,
      shippingAddress: parsed.shippingAddress,
      items: parsed.items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      metadata,
    };
  } catch {
    return null;
  }
}

export function formatOrderMoney(
  amount: number,
  currency: string,
  inCents = false
): string {
  const value = inCents ? amount / 100 : amount;
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(value);
}

export function labelPaymentStatus(value: string): string {
  const labels: Record<string, string> = {
    paid: "Pagato",
    unpaid: "Non pagato",
    no_payment_required: "Nessun pagamento",
  };
  return labels[value] ?? value;
}

export function labelSessionStatus(value: string): string {
  const labels: Record<string, string> = {
    complete: "Completata",
    open: "Aperta",
    expired: "Scaduta",
  };
  return labels[value] ?? value;
}
