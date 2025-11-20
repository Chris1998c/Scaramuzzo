"use client";

import type { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pagamento completato • Scaramuzzo Hair Natural Beauty",
  description: "Il tuo pagamento è stato completato correttamente.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.scaramuzzo.green/checkout/success",
  },
};

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-neutral-100 px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">Pagamento completato ✔</h1>

      <p className="text-lg text-neutral-300 mb-4">
        Grazie per il tuo ordine!
      </p>

      {sessionId && (
        <p className="text-sm text-neutral-500">
          ID transazione: <span className="font-mono">{sessionId}</span>
        </p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-neutral-400 p-20">Caricamento…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
