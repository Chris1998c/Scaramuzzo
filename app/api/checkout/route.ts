import Stripe from "stripe";
import { NextResponse } from "next/server";
import { productTranslations } from "@/app/products/data";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Tipo per metadata del webhook
type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// Quantità massima ragionevole per singolo articolo
const MAX_QTY = 20;

// Catalogo server-side: unica fonte di verità per prezzo/nome/immagine
const catalog = productTranslations.it.products;

export async function POST(request: Request) {
  try {
    // ⚠️ Dal client accettiamo SOLO id e qty: tutto il resto è ricostruito lato server.
    const { cart }: { cart: Array<{ id?: unknown; qty?: unknown }> } =
      await request.json();

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Carrello vuoto o non valido" },
        { status: 400 }
      );
    }

    // --- ITEMS VALIDATI E RICOSTRUITI DAL SERVER ---
    const trustedItems: OrderItem[] = [];

    for (const rawItem of cart) {
      const id = rawItem?.id;
      const qty = rawItem?.qty;

      // Validazione id
      if (typeof id !== "string" || id.length === 0) {
        return NextResponse.json(
          { error: "Articolo non valido nel carrello." },
          { status: 400 }
        );
      }

      // Validazione qty: intero, minimo 1, massimo MAX_QTY
      if (
        typeof qty !== "number" ||
        !Number.isInteger(qty) ||
        qty < 1 ||
        qty > MAX_QTY
      ) {
        return NextResponse.json(
          {
            error: `Quantità non valida per "${id}". Consentito: intero da 1 a ${MAX_QTY}.`,
          },
          { status: 400 }
        );
      }

      // Prodotto reale dal catalogo server-side
      const product = catalog.find((p) => p.id === id);

      if (!product) {
        return NextResponse.json(
          { error: `Prodotto non trovato: "${id}".` },
          { status: 400 }
        );
      }

      const absoluteImage = product.image.startsWith("http")
        ? product.image
        : `${process.env.NEXT_PUBLIC_SITE_URL}${product.image}`;

      trustedItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        image: absoluteImage,
      });
    }

    // --- CALCOLO SUBTOTALE (su prezzi server-side) ---
    const subtotal = trustedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // --- SPEDIZIONE: GRATIS sopra 49€ ---
    const shippingCost = subtotal >= 49 ? 0 : 7;

    // --- COSTRUZIONE ITEMS PER METADATA ---
    const metadataItems: OrderItem[] = trustedItems;

    // --- LINE ITEMS PRODOTTI ---
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      trustedItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

    // --- LINE ITEM SPEDIZIONE ---
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Spedizione",
            images: [
              `${process.env.NEXT_PUBLIC_SITE_URL}/scaramuzzo-hair-natural-beauty-video-01-immagine-sovrapposta-removebg-preview.webp`
            ],
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

      // *** METADATA ESSENZIALI ***
      metadata: {
        items: JSON.stringify(metadataItems),
        shippingCost: shippingCost.toString(),
        subtotal: subtotal.toString(),
      },

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
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
