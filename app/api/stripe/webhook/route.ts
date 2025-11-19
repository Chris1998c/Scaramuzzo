import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await req.text();

  // Tipo sicuro per errore Stripe
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    const err = error as Error; // 👈 Nessun ANY
    return NextResponse.json(
      { error: `Webhook error: ${err.message}` },
      { status: 400 }
    );
  }

  // Gestione eventi
  switch (event.type) {
    case "checkout.session.completed":
      console.log("💳 PAYMENT COMPLETED:", event.data.object.id);
      break;

    case "payment_intent.succeeded":
      console.log("✅ Payment intent success:", event.data.object.id);
      break;

    case "payment_intent.payment_failed":
      console.log("❌ Payment failed:", event.data.object.id);
      break;

    default:
      console.log("Unhandled event:", event.type);
  }

  return NextResponse.json({ received: true });
}
