import Link from "next/link";
import { notFound } from "next/navigation";
import { isStripeConfigured, checkoutSessionDashboardUrl } from "@/lib/stripe/client";
import {
  formatOrderMoney,
  getCrmOrderBySessionId,
  labelPaymentStatus,
  labelSessionStatus,
} from "@/lib/crm/stripeOrders";
import { labelSource } from "@/lib/crm/format";

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium sm:text-right">{value}</dd>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/40 bg-card/40 p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function CrmOrderDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  if (!isStripeConfigured()) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/40 p-6 text-sm text-muted-foreground">
        Configurazione server incompleta: manca{" "}
        <code className="text-foreground">STRIPE_SECRET_KEY</code>.
      </div>
    );
  }

  const order = await getCrmOrderBySessionId(sessionId);
  if (!order) notFound();

  const meta = order.metadata;
  const consultationRef = meta.consultation_ref ?? null;
  const consultationId = meta.consultation_id ?? null;

  return (
    <div>
      <Link
        href="/crm/ordini"
        className="text-sm font-medium text-accent hover:underline"
      >
        ← Torna agli ordini
      </Link>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Ordine Stripe
          </p>
          <h2 className="mt-1 text-2xl font-semibold">{order.orderRef}</h2>
        </div>
        <a
          href={checkoutSessionDashboardUrl(order.sessionId)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-border/50 px-5 py-2 text-sm font-medium transition hover:border-accent/50 hover:bg-background/40"
        >
          Apri in Stripe Dashboard
        </a>
      </div>

      <div className="mt-6 space-y-6">
        <Section title="Riepilogo">
          <dl className="space-y-2.5">
            <Field label="Order ref" value={order.orderRef} />
            <Field
              label="Stripe session id"
              value={<span className="font-mono text-xs">{order.sessionId}</span>}
            />
            <Field
              label="Stato pagamento"
              value={labelPaymentStatus(order.paymentStatus)}
            />
            <Field
              label="Stato sessione"
              value={labelSessionStatus(order.status)}
            />
            <Field label="Email cliente" value={order.customerEmail || "—"} />
            <Field
              label="Totale pagato"
              value={formatOrderMoney(order.total, order.currency)}
            />
          </dl>
        </Section>

        {(order.billingAddress || order.shippingAddress) && (
          <Section title="Indirizzi">
            <dl className="space-y-4">
              {order.billingAddress && (
                <div>
                  <dt className="text-sm text-muted-foreground">Fatturazione</dt>
                  <dd className="mt-1 whitespace-pre-line text-sm font-medium">
                    {order.billingAddress}
                  </dd>
                </div>
              )}
              {order.shippingAddress && (
                <div>
                  <dt className="text-sm text-muted-foreground">Spedizione</dt>
                  <dd className="mt-1 whitespace-pre-line text-sm font-medium">
                    {order.shippingAddress}
                  </dd>
                </div>
              )}
            </dl>
          </Section>
        )}

        <Section title="Line items">
          {order.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">—</p>
          ) : (
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={`${item.id}-${item.name}`}
                  className="flex items-start justify-between gap-4 rounded-xl border border-border/40 bg-background/30 px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Qtà {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {formatOrderMoney(item.price * item.quantity, order.currency)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Totali">
          <dl className="space-y-2.5">
            <Field
              label="Subtotale"
              value={formatOrderMoney(order.subtotal, order.currency)}
            />
            <Field
              label="Spedizione"
              value={formatOrderMoney(order.shipping, order.currency)}
            />
            <Field
              label="Sconto"
              value={formatOrderMoney(order.discount, order.currency)}
            />
            <Field
              label="Totale"
              value={formatOrderMoney(order.total, order.currency)}
            />
          </dl>
        </Section>

        <Section title="Metadata">
          <dl className="space-y-2.5">
            <Field
              label="Source"
              value={meta.source ? labelSource(meta.source) : "—"}
            />
            <Field label="Consultation ref" value={consultationRef ?? "—"} />
            {consultationId && (
              <Field
                label="Consultation"
                value={
                  <Link
                    href={`/crm/richieste/${consultationId}`}
                    className="text-accent hover:underline"
                  >
                    Apri richiesta
                  </Link>
                }
              />
            )}
            <Field label="UTM source" value={meta.utm_source ?? "—"} />
            <Field label="UTM campaign" value={meta.utm_campaign ?? "—"} />
          </dl>
        </Section>
      </div>
    </div>
  );
}
