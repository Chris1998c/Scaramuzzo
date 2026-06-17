import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email/sendOrderEmail";
import {
  beginOrderProcessing,
  endOrderProcessing,
  isOrderProcessing,
} from "@/lib/stripe/orderIdempotency";
import { parseCheckoutSession } from "@/lib/stripe/parseCheckoutSession";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const STAFF_EMAIL = "scaramuzzohnb@gmail.com";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  if (!sig) {
    console.error("❌ Missing Stripe signature");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const error = err as Error;
    console.error("❌ Signature verification error:", error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.metadata?.emailed === "1") {
    console.log("↩️ Ordine già processato (metadata), skip:", session.id);
    return NextResponse.json({ received: true });
  }

  if (isOrderProcessing(session.id)) {
    console.log("↩️ Ordine già in elaborazione su questa istanza, skip:", session.id);
    return NextResponse.json({ received: true });
  }

  if (!beginOrderProcessing(session.id)) {
    return NextResponse.json({ received: true });
  }

  try {
    const fresh = await stripe.checkout.sessions.retrieve(session.id);

    if (fresh.metadata?.emailed === "1") {
      console.log("↩️ Ordine già processato (re-fetch), skip:", session.id);
      return NextResponse.json({ received: true });
    }

    const order = await parseCheckoutSession(stripe, fresh);

    console.log("📦 Nuovo ordine completato:", order.orderRef);

    const emailPayload = {
      orderId: order.orderId,
      orderRef: order.orderRef,
      customerEmail: order.customerEmail,
      total: order.total,
      subtotal: order.subtotal,
      shipping: order.shipping,
      discount: order.discount,
      items: order.items,
      billingAddress: order.billingAddress,
      shippingAddress: order.shippingAddress,
    };

    if (order.customerEmail) {
      const customerResult = await sendOrderEmail({
        ...emailPayload,
        recipientEmail: order.customerEmail,
      });

      if (!customerResult.success) {
        console.error("❌ Email cliente non inviata:", order.orderRef);
        return NextResponse.json({ error: "Customer email failed" }, { status: 500 });
      }
    } else {
      console.warn("⚠️ Email cliente mancante: invio solo email staff.");
    }

    const staffResult = await sendOrderEmail({
      ...emailPayload,
      recipientEmail: STAFF_EMAIL,
    });

    if (!staffResult.success) {
      console.error("❌ Email staff non inviata:", order.orderRef);
      return NextResponse.json({ error: "Staff email failed" }, { status: 500 });
    }

    await stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...fresh.metadata,
        emailed: "1",
      },
    });

    console.log("📨 Email inviate per ordine:", order.orderRef);
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Errore webhook checkout.session.completed:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  } finally {
    endOrderProcessing(session.id);
  }
}
