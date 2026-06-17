"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  consentFromAcceptAll,
  consentFromRejectAll,
  publishConsent,
  readConsentPreferences,
  writeConsentPreferences,
} from "@/lib/tracking";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = readConsentPreferences();
    if (stored) {
      setOpen(false);
      return;
    }

    setOpen(true);
  }, []);

  const closeWithConsent = (preferences: {
    analytics: boolean;
    marketing: boolean;
  }) => {
    const saved = writeConsentPreferences(preferences);
    publishConsent(saved);
    setOpen(false);
  };

  const acceptAll = () => {
    const saved = consentFromAcceptAll();
    publishConsent(saved);
    setOpen(false);
  };

  const rejectAll = () => {
    const saved = consentFromRejectAll();
    publishConsent(saved);
    setOpen(false);
  };

  const savePreferences = () => {
    closeWithConsent({ analytics, marketing });
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-3xl rounded-2xl border border-neutral-700 bg-[#1b0d08]/95 p-6 text-white shadow-xl backdrop-blur-md">
        <h3 className="mb-2 text-xl font-semibold">Cookie & Privacy</h3>

        <p className="mb-4 text-sm leading-relaxed text-neutral-300">
          Utilizziamo cookie necessari per il funzionamento del sito e, previo
          consenso, cookie di analisi e marketing. Puoi accettare, rifiutare o
          personalizzare le tue scelte in qualsiasi momento.
        </p>

        {showPreferences && (
          <div className="mb-4 space-y-3 rounded-xl border border-neutral-700 bg-black/20 p-4">
            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm font-medium">Necessari</span>
                <span className="mt-1 block text-xs text-neutral-400">
                  Sempre attivi. Richiesti per sicurezza e funzionalità base.
                </span>
              </span>
              <span className="shrink-0 rounded-full bg-neutral-700 px-3 py-1 text-xs font-medium">
                Sempre attivi
              </span>
            </label>

            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm font-medium">Analytics</span>
                <span className="mt-1 block text-xs text-neutral-400">
                  Statistiche anonime per migliorare il sito.
                </span>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-4 w-4 accent-white"
              />
            </label>

            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm font-medium">Marketing</span>
                <span className="mt-1 block text-xs text-neutral-400">
                  Personalizzazione e misurazione campagne pubblicitarie.
                </span>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 h-4 w-4 accent-white"
              />
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={rejectAll}
            className="rounded-xl bg-neutral-700 px-4 py-2 text-sm transition hover:bg-neutral-600"
          >
            Rifiuta tutti
          </button>

          <button
            type="button"
            onClick={() => setShowPreferences((prev) => !prev)}
            className="rounded-xl border border-neutral-600 px-4 py-2 text-sm transition hover:bg-neutral-800"
          >
            {showPreferences ? "Nascondi preferenze" : "Personalizza"}
          </button>

          {showPreferences ? (
            <button
              type="button"
              onClick={savePreferences}
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              Salva preferenze
            </button>
          ) : (
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              Accetta tutti
            </button>
          )}
        </div>

        <p className="mt-4 text-xs text-neutral-500">
          Maggiori informazioni nella{" "}
          <Link href="/cookie" className="underline hover:text-neutral-300">
            Cookie Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
