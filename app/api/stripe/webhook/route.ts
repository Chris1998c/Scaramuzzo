import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email/sendOrderEmail";
import fs from "fs";
import path from "path";

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
    // 💾 SALVATAGGIO ORDINE IN JSON (Vercel-compatible)
    // ---------------------------------------------------
    try {
      const ordersDir = "/tmp/orders";

      if (!fs.existsSync(ordersDir)) {
        fs.mkdirSync(ordersDir, { recursive: true });
      }

      const orderData = {
        orderId,
        date: new Date().toISOString(),
        customerEmail,
        subtotal,
        shippingCost,
        total,
        items,
        address: session.customer_details,
        shipping: session.customer_details,
      };

      const filePath = path.join(ordersDir, `${orderId}.json`);

      fs.writeFileSync(
        filePath,
        JSON.stringify(orderData, null, 2),
        "utf-8"
      );

      console.log("💾 Ordine salvato in:", filePath);
    } catch (err) {
      console.error("❌ Errore salvataggio JSON:", err);
    }

    // ---------------------------------------------------
    // 📧 EMAIL AL CLIENTE
    // ---------------------------------------------------
    await sendOrderEmail({
      orderId,
      customerEmail,
      total,
      items,
    });

    // ---------------------------------------------------
    // 📧 EMAIL A TE (STAFF SCARAMUZZO)
    // ---------------------------------------------------
    await sendOrderEmail({
      orderId,
      customerEmail: "scaramuzzohnb@gmail.com",
      total,
      items,
    });

    console.log("📨 Email cliente + staff inviate");
  }

  return NextResponse.json({ received: true });
}
