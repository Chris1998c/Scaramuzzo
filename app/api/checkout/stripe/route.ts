import Stripe from "stripe";
import { NextResponse } from "next/server";
import type { CartItem } from "@/lib/store/cartStore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const { cart }: { cart: CartItem[] } = await request.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { error: "Carrello vuoto o non valido" },
        { status: 400 }
      );
    }

    // --- CALCOLI ---
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingCost = subtotal >= 39 ? 0 : 7;

    // --- LINE ITEMS ---
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.map(
      (item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [
              item.image.startsWith("http")
                ? item.image
                : `${process.env.NEXT_PUBLIC_SITE_URL}${item.image}`,
            ],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      })
    );

    // --- SPEDIZIONE ---
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Spedizione",
            images: [
              `${process.env.NEXT_PUBLIC_SITE_URL}/logo.webp` // <— IMMAGINE BRAND PREMIUM
            ],
          },
          unit_amount: shippingCost * 100,
        },
        quantity: 1,
      });
    }

    // --- SESSIONE STRIPE ---
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Errore durante la creazione del checkout",
      },
      { status: 500 }
    );
  }
}
