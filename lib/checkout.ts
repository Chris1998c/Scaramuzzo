"use client";

import type { CartItem } from "@/lib/store/cartStore";

/**
 * Checkout PREMIUM compatibile iPhone / Safari / Android / PC
 * Usa window.location.assign() per evitare blocchi su mobile.
 */
export async function startStripeCheckout(cart: CartItem[]): Promise<void> {
  if (!cart || cart.length === 0) {
    console.warn("Checkout bloccato: carrello vuoto.");
    return;
  }

  try {
    const response = await fetch("/api/checkout/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data: { url?: string; error?: string } = await response.json();

    if (data.error) throw new Error(data.error);
    if (!data.url) throw new Error("URL checkout Stripe mancante.");

    // 🔥 REDIRECT IPHONE SAFE
    window.location.assign(data.url);

  } catch (err) {
    console.error("Checkout error:", err);
    alert("Errore durante il pagamento, riprova più tardi.");
  }
}
