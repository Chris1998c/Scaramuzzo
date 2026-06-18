"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { startStripeCheckout } from "@/lib/checkout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, Package } from "lucide-react";
import {
  cartFingerprint,
  mapCartItemsToTracking,
  sumCartQty,
  trackBeginCheckout,
} from "@/lib/tracking";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.getTotal());
  const trackedBeginCheckoutRef = useRef<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const fingerprint = cartFingerprint(items);
    if (trackedBeginCheckoutRef.current === fingerprint) return;

    const storageKey = `track-begin-checkout-${fingerprint}`;
    if (sessionStorage.getItem(storageKey) === "1") {
      trackedBeginCheckoutRef.current = fingerprint;
      return;
    }

    trackedBeginCheckoutRef.current = fingerprint;
    trackBeginCheckout({
      fingerprint,
      itemCount: sumCartQty(items),
      value: total,
      items: mapCartItemsToTracking(items),
    });
  }, [items, total]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 sm:py-16 text-neutral-100">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">
        Riepilogo ordine
      </h1>

      {items.length === 0 && (
        <div className="text-center py-24">
          <p className="text-lg text-neutral-400 mb-6">Il carrello è vuoto.</p>
          <button
            onClick={() => router.push("/products")}
            className="bg-white text-black px-7 py-3 rounded-xl font-medium hover:bg-neutral-200 transition"
          >
            Torna ai prodotti
          </button>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-8 sm:space-y-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 border-b border-neutral-800 pb-6 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#2a160c] sm:h-24 sm:w-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-semibold leading-snug sm:text-lg">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-400 sm:text-base">
                    Quantità: {item.qty}
                  </p>
                  <p className="mt-2 text-lg font-semibold sm:hidden">
                    € {(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>

              <p className="hidden shrink-0 text-lg font-semibold sm:block">
                € {(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}

          <ul className="space-y-3 rounded-xl border border-neutral-800 bg-[#1a0f0a]/60 px-4 py-4 sm:hidden">
            <li className="flex items-start gap-3 text-sm text-neutral-300">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Pagamento sicuro con Stripe
            </li>
            <li className="flex items-start gap-3 text-sm text-neutral-300">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Conferma ordine via email
            </li>
            <li className="flex items-start gap-3 text-sm text-neutral-300">
              <Package className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Spedizione gestita dal Team Scaramuzzo
            </li>
          </ul>

          <div className="pt-6 sm:pt-10 border-t border-neutral-800">
            <div className="flex justify-between text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
              <span>Totale</span>
              <span>€ {total.toFixed(2)}</span>
            </div>

            <ul className="mb-6 hidden space-y-2 sm:block">
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <Lock className="h-4 w-4 shrink-0 text-accent" />
                Pagamento sicuro con Stripe
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                Conferma ordine via email
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <Package className="h-4 w-4 shrink-0 text-accent" />
                Spedizione gestita dal Team Scaramuzzo
              </li>
            </ul>

            <button
              onClick={() => startStripeCheckout(items)}
              className="w-full min-h-[52px] bg-black text-white py-4 rounded-xl font-semibold text-lg sm:text-xl hover:bg-neutral-900 transition"
            >
              Paga ora
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
