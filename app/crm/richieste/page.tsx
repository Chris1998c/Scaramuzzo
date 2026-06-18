import Link from "next/link";
import { hasSupabaseAdminCredentials } from "@/lib/supabase/admin";
import {
  listConsultations,
  payloadComplexity,
  payloadAgeRange,
} from "@/lib/crm/fetchConsultations";
import {
  formatDateTime,
  labelComplexity,
  labelStatus,
  labelType,
} from "@/lib/crm/format";
import {
  CONSULTATION_COMPLEXITIES,
  CONSULTATION_STATUSES,
  CONSULTATION_TYPES,
} from "@/lib/crm/types";

function pickFilter<T extends readonly string[]>(
  list: T,
  value: string | undefined
): T[number] | undefined {
  return value && (list as readonly string[]).includes(value)
    ? (value as T[number])
    : undefined;
}

export default async function CrmRichiestePage({
  searchParams,
}: {
  searchParams: Promise<{
    stato?: string;
    tipo?: string;
    complessita?: string;
  }>;
}) {
  if (!hasSupabaseAdminCredentials()) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/40 p-6 text-sm text-muted-foreground">
        Configurazione server incompleta: manca{" "}
        <code className="text-foreground">SUPABASE_SERVICE_ROLE_KEY</code>.
      </div>
    );
  }

  const sp = await searchParams;
  const statusFilter = pickFilter(CONSULTATION_STATUSES, sp.stato);
  const typeFilter = pickFilter(CONSULTATION_TYPES, sp.tipo);
  const complexityFilter = pickFilter(CONSULTATION_COMPLEXITIES, sp.complessita);
  const hasActiveFilter = Boolean(
    statusFilter || typeFilter || complexityFilter
  );

  let consultations: Awaited<ReturnType<typeof listConsultations>> = [];
  let errorMessage: string | null = null;

  try {
    consultations = await listConsultations(50, {
      status: statusFilter,
      type: typeFilter,
      complexity: complexityFilter,
    });
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Errore nel caricamento richieste.";
  }

  const selectClass =
    "rounded-xl border border-border/50 bg-background/60 px-3 py-2 text-sm outline-none transition focus:border-accent/60";

  return (
    <div>
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/crm"
            className="text-sm font-medium text-accent hover:underline"
          >
            ← Dashboard
          </Link>
          <h2 className="mt-2 text-2xl font-semibold">Richieste consulenza</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ultime 50 richieste, ordinate per data decrescente.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {consultations.length} richieste
        </p>
      </div>

      <form
        method="get"
        className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-border/40 bg-card/40 p-4"
      >
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Stato
          <select name="stato" defaultValue={statusFilter ?? ""} className={selectClass}>
            <option value="">Tutti</option>
            {CONSULTATION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {labelStatus(s)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Tipo
          <select name="tipo" defaultValue={typeFilter ?? ""} className={selectClass}>
            <option value="">Tutti</option>
            {CONSULTATION_TYPES.map((t) => (
              <option key={t} value={t}>
                {labelType(t)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Complessità
          <select
            name="complessita"
            defaultValue={complexityFilter ?? ""}
            className={selectClass}
          >
            <option value="">Tutte</option>
            {CONSULTATION_COMPLEXITIES.map((c) => (
              <option key={c} value={c}>
                {labelComplexity(c)}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
        >
          Filtra
        </button>
        {hasActiveFilter && (
          <Link
            href="/crm/richieste"
            className="rounded-full border border-border/50 px-5 py-2 text-sm font-medium transition hover:border-accent/50 hover:bg-background/40"
          >
            Azzera
          </Link>
        )}
      </form>

      {errorMessage && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {errorMessage}
        </div>
      )}

      {consultations.length === 0 && !errorMessage ? (
        <div className="rounded-2xl border border-border/40 bg-card/40 p-8 text-center text-sm text-muted-foreground">
          {hasActiveFilter
            ? "Nessuna richiesta corrisponde ai filtri."
            : "Nessuna richiesta salvata."}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/40 bg-card/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border/40 bg-background/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Riferimento</th>
                  <th className="px-4 py-3 font-semibold">Cliente</th>
                  <th className="px-4 py-3 font-semibold">WhatsApp</th>
                  <th className="px-4 py-3 font-semibold">Età</th>
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Complessità</th>
                  <th className="px-4 py-3 font-semibold">Data</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((row) => {
                  const complexity = payloadComplexity(row.payload);
                  const age = payloadAgeRange(row.payload);
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-border/30 transition hover:bg-background/30"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/crm/richieste/${row.id}`}
                          className="font-medium text-accent hover:underline"
                        >
                          {row.public_ref}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{row.customer_name ?? "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.customer_phone ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {age ?? "—"}
                      </td>
                      <td className="px-4 py-3">{labelType(row.type)}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full border border-border/50 px-2.5 py-0.5 text-xs font-medium">
                          {labelStatus(row.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {complexity ? labelComplexity(complexity) : "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDateTime(row.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
