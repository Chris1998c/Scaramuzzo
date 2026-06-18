"use client";

import { useState, useTransition } from "react";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/crm/orderTypes";
import { labelOrderStatus } from "@/lib/crm/format";
import { updateOrderAction } from "./actions";

type Props = {
  orderId: string;
  initialStatus: OrderStatus;
  initialTrackingCode: string;
  initialTrackingUrl: string;
  initialInternalNotes: string;
};

export function OrderUpdateForm({
  orderId,
  initialStatus,
  initialTrackingCode,
  initialTrackingUrl,
  initialInternalNotes,
}: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [trackingCode, setTrackingCode] = useState(initialTrackingCode);
  const [trackingUrl, setTrackingUrl] = useState(initialTrackingUrl);
  const [internalNotes, setInternalNotes] = useState(initialInternalNotes);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const formData = new FormData();
    formData.set("status", status);
    formData.set("tracking_code", trackingCode);
    formData.set("tracking_url", trackingUrl);
    formData.set("internal_notes", internalNotes);

    startTransition(async () => {
      try {
        await updateOrderAction(orderId, formData);
        setSaved(true);
      } catch {
        setError("Aggiornamento non riuscito.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="order-status"
          className="mb-1 block text-sm text-muted-foreground"
        >
          Stato operativo
        </label>
        <select
          id="order-status"
          value={status}
          disabled={isPending}
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
          className="w-full rounded-xl border border-border/50 bg-background/60 px-3 py-2 text-sm font-medium outline-none transition focus:border-accent/60 disabled:opacity-60"
        >
          {ORDER_STATUSES.map((value) => (
            <option key={value} value={value}>
              {labelOrderStatus(value)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="tracking-code"
          className="mb-1 block text-sm text-muted-foreground"
        >
          Codice tracking
        </label>
        <input
          id="tracking-code"
          type="text"
          value={trackingCode}
          disabled={isPending}
          onChange={(e) => setTrackingCode(e.target.value)}
          className="w-full rounded-xl border border-border/50 bg-background/60 px-3 py-2 text-sm outline-none transition focus:border-accent/60 disabled:opacity-60"
          placeholder="es. 1Z999AA10123456784"
        />
      </div>

      <div>
        <label
          htmlFor="tracking-url"
          className="mb-1 block text-sm text-muted-foreground"
        >
          URL tracking
        </label>
        <input
          id="tracking-url"
          type="url"
          value={trackingUrl}
          disabled={isPending}
          onChange={(e) => setTrackingUrl(e.target.value)}
          className="w-full rounded-xl border border-border/50 bg-background/60 px-3 py-2 text-sm outline-none transition focus:border-accent/60 disabled:opacity-60"
          placeholder="https://..."
        />
      </div>

      <div>
        <label
          htmlFor="internal-notes"
          className="mb-1 block text-sm text-muted-foreground"
        >
          Note interne
        </label>
        <textarea
          id="internal-notes"
          value={internalNotes}
          disabled={isPending}
          onChange={(e) => setInternalNotes(e.target.value)}
          rows={4}
          className="w-full resize-y rounded-xl border border-border/50 bg-background/60 px-3 py-2 text-sm outline-none transition focus:border-accent/60 disabled:opacity-60"
          placeholder="Note visibili solo in CRM"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm font-medium transition hover:bg-accent/20 disabled:opacity-60"
        >
          {isPending ? "Salvataggio…" : "Salva modifiche"}
        </button>
        {saved && !isPending && (
          <span className="text-xs text-emerald-400">Salvato.</span>
        )}
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    </form>
  );
}
