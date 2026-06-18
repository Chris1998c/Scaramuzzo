import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email/sendOrderEmail";
import {
  beginOrderProcessing,
  endOrderProcessing,
  isOrderProcessing,
} from "@/lib/stripe/orderIdempotency";
import { parseCheckoutSession } from "@/lib/stripe/parseCheckoutSession";
import { persistOrderFromCheckoutSession } from "@/lib/crm/persistOrder";

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

  if (isOrderProcessing(session.id)) {
    console.log("↩️ Ordine già in elaborazione su questa istanza, skip:", session.id);
    return NextResponse.json({ received: true });
  }

  if (!beginOrderProcessing(session.id)) {
    return NextResponse.json({ received: true });
  }

  try {
    const fresh = await stripe.checkout.sessions.retrieve(session.id);
    const order = await parseCheckoutSession(stripe, fresh);
    const emailsAlreadySent = fresh.metadata?.emailed === "1";

    console.log("📦 Nuovo ordine completato:", order.orderRef);

    let persistOk = false;
    try {
      const persisted = await persistOrderFromCheckoutSession(fresh, order);
      persistOk = persisted.persisted;
      if (persisted.persisted) {
        console.log("💾 Ordine persistito su Supabase:", {
          orderRef: order.orderRef,
          sessionId: fresh.id,
          orderId: persisted.orderId,
          itemsSynced: persisted.itemsSynced,
          itemsRepaired: persisted.itemsRepaired,
        });
      }
    } catch (persistErr) {
      const message =
        persistErr instanceof Error ? persistErr.message : String(persistErr);
      console.error("❌ PERSISTENZA ORDINE FALLITA — registro operativo incompleto:", {
        orderRef: order.orderRef,
        sessionId: fresh.id,
        error: message,
        emailsAlreadySent,
      });
    }

    if (emailsAlreadySent) {
      if (!persistOk) {
        console.error(
          "❌ Ordine già emailato ma persistenza Supabase ancora assente — attendere retry webhook Stripe:",
          order.orderRef
        );
      } else {
        console.log(
          "↩️ Email già inviate, persistenza verificata/riparata:",
          order.orderRef
        );
      }
      return NextResponse.json({ received: true });
    }

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
        ...(persistOk ? { persisted: "1" } : {}),
      },
    });

    if (!persistOk) {
      console.error(
        "❌ Email inviate ma persistenza Supabase fallita — ordine operativo mancante, retry webhook possibile:",
        order.orderRef
      );
    } else {
      console.log("📨 Email inviate e ordine persistito:", order.orderRef);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Errore webhook checkout.session.completed:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  } finally {
    endOrderProcessing(session.id);
  }
}
