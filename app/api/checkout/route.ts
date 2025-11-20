import Stripe from "stripe";
import { NextResponse } from "next/server";
import type { CartItem } from "@/lib/store/cartStore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { cart }: { cart: CartItem[] } = await request.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { error: "Carrello vuoto o non valido" },
        { status: 400 }
      );
    }

    // --- CALCOLO SUBTOTALE ---
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    // 🔥 SPEDIZIONE: GRATIS sopra 49€
    const shippingCost = subtotal >= 49 ? 0 : 7;

    // --- LINE ITEMS PRODOTTI ---
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [
              item.image.startsWith("http")
                ? item.image
                : `${process.env.NEXT_PUBLIC_SITE_URL}${item.image}`
            ],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      }));

    // --- LINE ITEM SPEDIZIONE ---
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Spedizione",
            images: [`${process.env.NEXT_PUBLIC_SITE_URL}/scaramuzzo-hair-natural-beauty-video-01-immagine-sovrapposta-removebg-preview.webp`],
          },
          unit_amount: shippingCost * 100,
        },
        quantity: 1,
      });
    }

    // --- CREA SESSIONE STRIPE ---
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IT", "FR", "DE", "ES", "PT", "BE", "NL", "AT"],
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("🔥 Stripe Checkout ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Errore checkout Stripe",
      },
      { status: 500 }
    );
  }
}
