"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { useCartStore } from "@/lib/store/cartStore";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const clearCart = useCartStore((s) => s.clearCart);
  const closeCart = useCartStore((s) => s.closeCart);

  useEffect(() => {
    clearCart();
    closeCart();
  }, [clearCart, closeCart]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-neutral-100">
      <h1 className="mb-6 text-4xl font-bold">Pagamento completato ✔</h1>

      <p className="mb-4 max-w-lg text-center text-lg text-neutral-300">
        Grazie per il tuo ordine. Riceverai a breve un&apos;email di conferma con
        il riepilogo del pagamento.
      </p>

      {sessionId && (
        <p className="mb-8 text-sm text-neutral-500">
          Riferimento pagamento:{" "}
          <span className="font-mono">{sessionId}</span>
        </p>
      )}

      <Link
        href="/products"
        className="rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
      >
        Continua lo shopping
      </Link>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-20 text-neutral-400">Caricamento…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
