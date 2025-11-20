import Stripe from "stripe";
import { NextResponse } from "next/server";

// ❗ IL WEBHOOK DEVE ESSERE NODE, NON EDGE
export const runtime = "nodejs";

// Stripe inizializzato SENZA apiVersion (usa quella del tuo account)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe Signature" }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // EVENTI SUPPORTATI
  switch (event.type) {
    case "checkout.session.completed":
      console.log("💳 Checkout completato:", event.data.object.id);
      break;

    case "payment_intent.succeeded":
      console.log("✅ Pagamento OK:", event.data.object.id);
      break;

    case "payment_intent.payment_failed":
      console.log("❌ Pagamento fallito:", event.data.object.id);
      break;

    default:
      console.log("ℹ️ Evento non gestito:", event.type);
  }

  return NextResponse.json({ received: true });
}
