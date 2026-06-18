import Link from "next/link";
import { hasSupabaseAdminCredentials } from "@/lib/supabase/admin";
import { fetchTeamDashboard } from "@/lib/crm/fetchDashboard";
import {
  formatDateTime,
  labelOrderStatus,
  labelSource,
  labelStatus,
  labelType,
} from "@/lib/crm/format";
import { formatOrderMoney } from "@/lib/crm/stripeOrders";

function MetricCard({
  label,
  value,
  href,
  hint,
}: {
  label: string;
  value: number;
  href: string;
  hint?: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-border/40 bg-card/40 p-5 transition hover:border-accent/40 hover:bg-background/30"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Link>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/40 bg-card/40 p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {title}
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function EmptyRow({ message }: { message: string }) {
  return (
    <p className="text-sm text-muted-foreground">{message}</p>
  );
}

export default async function CrmDashboardPage() {
  if (!hasSupabaseAdminCredentials()) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/40 p-6 text-sm text-muted-foreground">
        Configurazione server incompleta: manca{" "}
        <code className="text-foreground">SUPABASE_SERVICE_ROLE_KEY</code>.
      </div>
    );
  }

  let data: Awaited<ReturnType<typeof fetchTeamDashboard>> | null = null;
  let errorMessage: string | null = null;

  try {
    data = await fetchTeamDashboard();
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Errore nel caricamento dashboard.";
  }

  if (errorMessage || !data) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-200">
        {errorMessage ?? "Dashboard non disponibile."}
      </div>
    );
  }

  const { metrics } = data;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Dashboard operativa</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Panoramica Team Scaramuzzo — consulenze e ordini.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard
          label="Nuove richieste"
          value={metrics.newConsultations}
          href="/crm/richieste?stato=nuova"
          hint="Tutte le tipologie"
        />
        <MetricCard
          label="Quiz prodotti"
          value={metrics.quizOpen}
          href="/crm/richieste?tipo=personalizzati"
          hint="Aperte / in lavorazione"
        />
        <MetricCard
          label="Botanical Color"
          value={metrics.bceOpen}
          href="/crm/richieste?tipo=botanical_color"
          hint="Aperte / in lavorazione"
        />
        <MetricCard
          label="Da evadere"
          value={metrics.ordersToFulfill}
          href="/crm/ordini"
          hint="Pagati, da preparare"
        />
        <MetricCard
          label="In preparazione"
          value={metrics.ordersInPreparation}
          href="/crm/ordini"
          hint="Stato processing"
        />
        <MetricCard
          label="Spediti"
          value={metrics.ordersShipped}
          href="/crm/ordini"
          hint="Stato shipped"
        />
      </div>

      <Section title="Azioni rapide">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/crm/richieste?stato=nuova"
            className="rounded-full border border-border/50 px-4 py-2 text-sm font-medium transition hover:border-accent/50 hover:bg-background/40"
          >
            Vedi richieste nuove
          </Link>
          <Link
            href="/crm/richieste?tipo=personalizzati"
            className="rounded-full border border-border/50 px-4 py-2 text-sm font-medium transition hover:border-accent/50 hover:bg-background/40"
          >
            Quiz prodotti personalizzati
          </Link>
          <Link
            href="/crm/richieste?tipo=botanical_color"
            className="rounded-full border border-border/50 px-4 py-2 text-sm font-medium transition hover:border-accent/50 hover:bg-background/40"
          >
            Botanical Color Experience
          </Link>
          <Link
            href="/crm/ordini"
            className="rounded-full border border-border/50 px-4 py-2 text-sm font-medium transition hover:border-accent/50 hover:bg-background/40"
          >
            Gestione ordini
          </Link>
        </div>
      </Section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Section
          title="Nuove richieste consulenza"
          action={
            <Link
              href="/crm/richieste?stato=nuova"
              className="text-xs font-medium text-accent hover:underline"
            >
              Vedi tutte
            </Link>
          }
        >
          {data.recentNewConsultations.length === 0 ? (
            <EmptyRow message="Nessuna richiesta nuova." />
          ) : (
            <ul className="space-y-3">
              {data.recentNewConsultations.map((row) => (
                <li
                  key={row.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/30 bg-background/30 px-4 py-3"
                >
                  <div>
                    <Link
                      href={`/crm/richieste/${row.id}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {row.public_ref}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {row.customer_name ?? "Cliente"} · {labelType(row.type)}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDateTime(row.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section
          title="Ordini da evadere"
          action={
            <Link
              href="/crm/ordini"
              className="text-xs font-medium text-accent hover:underline"
            >
              Vedi ordini
            </Link>
          }
        >
          {!data.ordersAvailable ? (
            <EmptyRow message="Tabella ordini non disponibile." />
          ) : data.ordersToFulfill.length === 0 ? (
            <EmptyRow message="Nessun ordine pagato in attesa." />
          ) : (
            <ul className="space-y-3">
              {data.ordersToFulfill.map((order) => (
                <li
                  key={order.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/30 bg-background/30 px-4 py-3"
                >
                  <div>
                    <Link
                      href={`/crm/ordini/${order.id}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {order.orderRef}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.customerEmail ?? "—"} ·{" "}
                      {formatOrderMoney(order.totalCents, order.currency, true)}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDateTime(order.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section
          title="Quiz prodotti — pipeline aperta"
          action={
            <Link
              href="/crm/richieste?tipo=personalizzati"
              className="text-xs font-medium text-accent hover:underline"
            >
              Vedi tutte
            </Link>
          }
        >
          {data.recentQuizConsultations.length === 0 ? (
            <EmptyRow message="Nessuna richiesta quiz aperta." />
          ) : (
            <ul className="space-y-3">
              {data.recentQuizConsultations.map((row) => (
                <li
                  key={row.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/30 bg-background/30 px-4 py-3"
                >
                  <div>
                    <Link
                      href={`/crm/richieste/${row.id}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {row.public_ref}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {row.customer_name ?? "Cliente"} · {labelStatus(row.status)}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDateTime(row.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section
          title="Ordini in preparazione"
          action={
            <Link
              href="/crm/ordini"
              className="text-xs font-medium text-accent hover:underline"
            >
              Vedi ordini
            </Link>
          }
        >
          {!data.ordersAvailable ? (
            <EmptyRow message="Tabella ordini non disponibile." />
          ) : data.ordersInPreparation.length === 0 ? (
            <EmptyRow message="Nessun ordine in preparazione." />
          ) : (
            <ul className="space-y-3">
              {data.ordersInPreparation.map((order) => (
                <li
                  key={order.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/30 bg-background/30 px-4 py-3"
                >
                  <div>
                    <Link
                      href={`/crm/ordini/${order.id}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {order.orderRef}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.customerEmail ?? "—"} ·{" "}
                      {labelOrderStatus(order.status)}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDateTime(order.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section
          title="Botanical Color Experience — pipeline aperta"
          action={
            <Link
              href="/crm/richieste?tipo=botanical_color"
              className="text-xs font-medium text-accent hover:underline"
            >
              Vedi tutte
            </Link>
          }
        >
          {data.recentBceConsultations.length === 0 ? (
            <EmptyRow message="Nessuna richiesta BCE aperta." />
          ) : (
            <ul className="space-y-3">
              {data.recentBceConsultations.map((row) => (
                <li
                  key={row.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/30 bg-background/30 px-4 py-3"
                >
                  <div>
                    <Link
                      href={`/crm/richieste/${row.id}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {row.public_ref}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {row.customer_name ?? "Cliente"} · {labelStatus(row.status)}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDateTime(row.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section
          title="Ordini spediti di recente"
          action={
            <Link
              href="/crm/ordini"
              className="text-xs font-medium text-accent hover:underline"
            >
              Vedi ordini
            </Link>
          }
        >
          {!data.ordersAvailable ? (
            <EmptyRow message="Tabella ordini non disponibile." />
          ) : data.recentShippedOrders.length === 0 ? (
            <EmptyRow message="Nessun ordine spedito recente." />
          ) : (
            <ul className="space-y-3">
              {data.recentShippedOrders.map((order) => (
                <li
                  key={order.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/30 bg-background/30 px-4 py-3"
                >
                  <div>
                    <Link
                      href={`/crm/ordini/${order.id}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {order.orderRef}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.customerEmail ?? "—"}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDateTime(order.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>

      <div className="mt-6">
        <Section
          title="Ultimi ordini e pagamenti"
          action={
            <Link
              href="/crm/ordini"
              className="text-xs font-medium text-accent hover:underline"
            >
              Vedi tutti
            </Link>
          }
        >
          {!data.ordersAvailable ? (
            <EmptyRow message="Tabella ordini non disponibile." />
          ) : data.recentOrders.length === 0 ? (
            <EmptyRow message="Nessun ordine registrato." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-border/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="pb-3 pr-4 font-semibold">Order ref</th>
                    <th className="pb-3 pr-4 font-semibold">Cliente</th>
                    <th className="pb-3 pr-4 font-semibold">Totale</th>
                    <th className="pb-3 pr-4 font-semibold">Stato</th>
                    <th className="pb-3 pr-4 font-semibold">Source</th>
                    <th className="pb-3 font-semibold">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border/20 last:border-0"
                    >
                      <td className="py-3 pr-4">
                        <Link
                          href={`/crm/ordini/${order.id}`}
                          className="font-medium text-accent hover:underline"
                        >
                          {order.orderRef}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {order.customerEmail ?? "—"}
                      </td>
                      <td className="py-3 pr-4 font-medium">
                        {formatOrderMoney(
                          order.totalCents,
                          order.currency,
                          true
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex rounded-full border border-border/50 px-2 py-0.5 text-xs">
                          {labelOrderStatus(order.status)}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {order.source ? labelSource(order.source) : "—"}
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {formatDateTime(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
