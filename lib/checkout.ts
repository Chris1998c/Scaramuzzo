"use client";

import { CartItem } from "@/lib/store/cartStore";

/**
 * Avvia il checkout Stripe in modalità PREMIUM:
 * - gestione errori elegante
 * - redirect sicuro
 * - tipizzazione forte
 */
export async function startStripeCheckout(cart: CartItem[]): Promise<void> {
  if (!cart || cart.length === 0) {
    console.warn("Checkout bloccato: carrello vuoto.");
    return;
  }

  try {
    // UI loading event
    const loadingEvent = new CustomEvent("checkout-loading", {
      detail: true,
    });
    window.dispatchEvent(loadingEvent);

    const response = await fetch("/api/checkout/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data: { url?: string; error?: string } = await response.json();

    if (data.error) throw new Error(data.error);
    if (!data.url) throw new Error("Stripe URL non ricevuta");

    // 🔥 Redirect premium con piccola animazione
    document.body.classList.add("cursor-wait", "opacity-70");
    setTimeout(() => {
      window.location.href = data.url!;
    }, 150);

  } catch (err) {
    console.error("Checkout error:", err);

    // Evento → puoi ascoltarlo con un toast bello
    const errorEvent = new CustomEvent("checkout-error", {
      detail: err instanceof Error ? err.message : "Errore sconosciuto",
    });
    window.dispatchEvent(errorEvent);
  } finally {
    const loadingEvent = new CustomEvent("checkout-loading", {
      detail: false,
    });
    window.dispatchEvent(loadingEvent);

    document.body.classList.remove("cursor-wait", "opacity-70");
  }
}
