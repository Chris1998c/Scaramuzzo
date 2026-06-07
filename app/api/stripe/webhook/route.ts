import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email/sendOrderEmail";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  if (!sig) {
    console.error("❌ Missing Stripe signature");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  // 🔐 Verifica firma Stripe
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

  // 🎯 Evento Checkout Completato
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // 🔁 IDEMPOTENZA: se già processato, non reinviare le email
    if (session.metadata?.emailed === "1") {
      console.log("↩️ Ordine già processato, skip email:", session.id);
      return NextResponse.json({ received: true });
    }

    const orderId = session.id;
    const customerEmail = session.customer_details?.email || "";

    const subtotal = Number(session.metadata?.subtotal || "0");
    const shippingCost = Number(session.metadata?.shippingCost || "0");

    // Prodotti acquistati
    const items = JSON.parse(session.metadata?.items || "[]") as {
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }[];

    const total = subtotal + shippingCost;

    console.log("📦 Nuovo ordine completato:", orderId);

    // ---------------------------------------------------
    // 📧 EMAIL AL CLIENTE (solo se l'email è presente)
    // ---------------------------------------------------
    if (customerEmail) {
      await sendOrderEmail({
        orderId,
        customerEmail,
        total,
        items,
      });
    } else {
      console.warn("⚠️ Email cliente mancante: invio solo email staff.");
    }

    // ---------------------------------------------------
    // 📧 EMAIL A TE (STAFF SCARAMUZZO)
    // ---------------------------------------------------
    await sendOrderEmail({
      orderId,
      customerEmail: "scaramuzzohnb@gmail.com",
      total,
      items,
    });

    console.log("📨 Email inviate");

    // ---------------------------------------------------
    // ✅ MARCA COME PROCESSATO (preserva i metadata esistenti)
    // ---------------------------------------------------
    try {
      await stripe.checkout.sessions.update(session.id, {
        metadata: {
          ...session.metadata,
          emailed: "1",
        },
      });
    } catch (err) {
      console.error("❌ Errore aggiornamento metadata sessione:", err);
    }
  }

  return NextResponse.json({ received: true });
}
