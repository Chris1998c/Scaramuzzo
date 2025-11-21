"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setOpen(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setOpen(false);
  };

  const rejectAll = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 px-4">
      <div className="max-w-3xl w-full bg-[#1b0d08]/95 border border-neutral-700 shadow-xl rounded-2xl p-6 text-white backdrop-blur-md">
        <h3 className="text-xl font-semibold mb-2">
          Cookie & Privacy
        </h3>

        <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
          Utilizziamo cookie tecnici e, previo consenso, cookie di analisi
          anonima per migliorare la tua esperienza. Nessun dato viene condiviso
          senza permesso.
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={rejectAll}
            className="px-4 py-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 transition text-sm"
          >
            Rifiuta
          </button>

          <button
            onClick={acceptAll}
            className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition text-sm"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
