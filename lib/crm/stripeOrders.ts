import type Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe/client";
import { parseCheckoutSession, type ParsedOrder } from "@/lib/stripe/parseCheckoutSession";

export type CrmOrderListItem = {
  sessionId: string;
  orderRef: string;
  createdAt: number;
  customerEmail: string | null;
  total: number;
  currency: string;
  paymentStatus: string;
  status: string;
  source: string | null;
};

function sessionToListItem(session: Stripe.Checkout.Session): CrmOrderListItem {
  return {
    sessionId: session.id,
    orderRef: session.metadata?.order_ref ?? session.id,
    createdAt: session.created,
    customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
    total: (session.amount_total ?? 0) / 100,
    currency: (session.currency ?? "eur").toUpperCase(),
    paymentStatus: session.payment_status,
    status: session.status ?? "unknown",
    source: session.metadata?.source ?? null,
  };
}

export async function listCrmOrders(limit = 50): Promise<CrmOrderListItem[]> {
  const stripe = getStripeClient();
  const response = await stripe.checkout.sessions.list({ limit });

  return response.data.map(sessionToListItem);
}

export type CrmOrderDetail = ParsedOrder & {
  sessionId: string;
  paymentStatus: string;
  status: string;
  currency: string;
  metadata: Record<string, string>;
};

export async function getCrmOrderBySessionId(
  sessionId: string
): Promise<CrmOrderDetail | null> {
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
      ...parsed,
      sessionId: session.id,
      paymentStatus: session.payment_status,
      status: session.status ?? "unknown",
      currency: (session.currency ?? "eur").toUpperCase(),
      metadata,
    };
  } catch {
    return null;
  }
}

export function formatOrderMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
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
