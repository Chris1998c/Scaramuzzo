import Stripe from "stripe";
import { parseCheckoutSession } from "./parseCheckoutSession";

export type VerifiedCheckoutItem = {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
};

export type VerifiedCheckoutSession = {
  order_ref: string;
  value: number;
  currency: string;
  item_count: number;
  items: VerifiedCheckoutItem[];
};

const SESSION_ID_PATTERN = /^cs_[a-zA-Z0-9_]+$/;

export function isValidCheckoutSessionId(sessionId: string): boolean {
  return SESSION_ID_PATTERN.test(sessionId);
}

export async function verifyCheckoutSessionForTracking(
  stripe: Stripe,
  sessionId: string
): Promise<VerifiedCheckoutSession | null> {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid" || session.status !== "complete") {
    return null;
  }

  const parsed = await parseCheckoutSession(stripe, session);
  const itemCount = parsed.items.reduce((acc, item) => acc + item.quantity, 0);

  return {
    order_ref: parsed.orderRef,
    value: parsed.total,
    currency: (session.currency ?? "eur").toUpperCase(),
    item_count: itemCount,
    items: parsed.items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  };
}
