"use client";

import { useState, useTransition } from "react";
import { createManualPaymentLinkAction } from "./actions";

type Props = {
  consultationId: string;
  defaultEmail?: string | null;
};

export function ManualPaymentForm({ consultationId, defaultEmail }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [shipping, setShipping] = useState("");
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    url: string;
    orderRef: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const parseAmount = (raw: string): number | null => {
          const normalized = raw.trim().replace(",", ".");
          if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
          return Number(normalized);
        };

        const amountEur = parseAmount(amount);
        if (amountEur === null) {
          setError("Importo non valido: usa al massimo 2 decimali.");
          return;
        }

        let shippingEur: number | undefined;
        if (shipping.trim()) {
          const parsedShipping = parseAmount(shipping);
          if (parsedShipping === null) {
            setError("Spedizione non valida: usa al massimo 2 decimali.");
            return;
          }
          shippingEur = parsedShipping;
        }

        const response = await createManualPaymentLinkAction({
          consultationId,
          description,
          amountEur,
          shippingEur,
          customerEmail: email.trim() || undefined,
        });
        setResult(response);
      } catch (err) {
        setResult(null);
        setError(
          err instanceof Error ? err.message : "Errore durante la creazione del link."
        );
      }
    });
  };

  const inputClass =
    "w-full rounded-xl border border-border/50 bg-background/60 px-3 py-2 text-sm outline-none transition focus:border-accent/60";

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Descrizione
          </span>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
            placeholder="Es. Formula personalizzata + trattamento"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Importo €
            </span>
            <input
              type="text"
              inputMode="decimal"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputClass}
              placeholder="49.00"
              pattern="^\d+([.,]\d{1,2})?$"
              title="Minimo € 0,50 — massimo 2 decimali"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Spedizione € (opzionale)
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              className={inputClass}
              placeholder="4.99"
              pattern="^\d+([.,]\d{1,2})?$"
              title="Massimo 2 decimali"
            />
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Email cliente (opzionale)
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="cliente@email.it"
          />
        </label>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Generazione…" : "Genera link pagamento"}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4 rounded-xl border border-accent/30 bg-background/30 p-4">
          <p className="text-sm text-muted-foreground">
            Order ref:{" "}
            <span className="font-medium text-foreground">{result.orderRef}</span>
          </p>
          <label className="block space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Link Stripe Checkout
            </span>
            <input
              type="text"
              readOnly
              value={result.url}
              className={`${inputClass} font-mono text-xs`}
              onFocus={(e) => e.target.select()}
            />
          </label>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-border/50 px-5 py-2 text-sm font-medium transition hover:border-accent/50 hover:bg-background/40"
          >
            Apri link
          </a>
        </div>
      )}
    </div>
  );
}
