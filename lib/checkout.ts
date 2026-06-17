"use client";

import type { CartItem } from "@/lib/store/cartStore";
import { savePendingPurchase, sumCartQty } from "@/lib/tracking";

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
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data: { url?: string; order_ref?: string; error?: string } =
      await response.json();

    if (data.error) throw new Error(data.error);
    if (!data.url) throw new Error("URL checkout Stripe mancante.");

    const value = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const subtotal = value;
    const shipping = subtotal >= 49 ? 0 : 7;

    savePendingPurchase({
      order_ref: data.order_ref ?? "",
      value: subtotal + shipping,
      item_count: sumCartQty(cart),
    });

    // 🔥 REDIRECT IPHONE SAFE
    window.location.assign(data.url);

  } catch (err) {
    console.error("Checkout error:", err);
    alert("Errore durante il pagamento, riprova più tardi.");
  }
}
