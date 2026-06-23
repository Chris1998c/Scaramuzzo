import Stripe from "stripe";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { productTranslations } from "@/app/products/data";
import { getShippingEur, shippingFlatCents } from "@/lib/shipping";
import { sanitizeAttributionForStripe } from "@/lib/tracking/attributionMetadata";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const MAX_QTY = 20;
const MAX_CART_SUMMARY = 450;

// Catalogo server-side: unica fonte di verità per prezzo/nome/immagine
const catalog = productTranslations.it.products;

type TrustedItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

function buildOrderRef(): string {
  const suffix = randomBytes(3).toString("hex").toUpperCase();
  return `SCG-${Date.now().toString(36).toUpperCase()}-${suffix}`;
}

function buildCartSummary(items: TrustedItem[]): string {
  return items
    .map((item) => `${item.name} x${item.quantity}`)
    .join("; ")
    .slice(0, MAX_CART_SUMMARY);
}

export async function POST(request: Request) {
  try {
    // ⚠️ Dal client accettiamo SOLO id e qty: tutto il resto è ricostruito lato server.
    const body = (await request.json()) as {
      cart?: Array<{ id?: unknown; qty?: unknown }>;
      attribution?: unknown;
    };
    const { cart, attribution: rawAttribution } = body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Carrello vuoto o non valido" },
        { status: 400 }
      );
    }

    // --- ITEMS VALIDATI E RICOSTRUITI DAL SERVER ---
    const trustedItems: TrustedItem[] = [];

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

    const shippingCost = getShippingEur(subtotal);

    // --- LINE ITEMS PRODOTTI ---
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      trustedItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: { catalog_id: item.id },
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
          unit_amount: shippingFlatCents(),
        },
        quantity: 1,
      });
    }

    const orderRef = buildOrderRef();
    const cartSummary = buildCartSummary(trustedItems);
    const stripeAttribution = sanitizeAttributionForStripe(rawAttribution);

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

      metadata: {
        order_ref: orderRef,
        item_count: String(trustedItems.length),
        cart_summary: cartSummary,
        ...stripeAttribution,
      },

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    });

    return NextResponse.json({ url: session.url, order_ref: orderRef });
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
