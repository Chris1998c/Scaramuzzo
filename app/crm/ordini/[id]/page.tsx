import Link from "next/link";
import { notFound } from "next/navigation";
import {
  checkoutSessionDashboardUrl,
  isStripeConfigured,
} from "@/lib/stripe/client";
import { hasSupabaseAdminCredentials } from "@/lib/supabase/admin";
import {
  formatAddressJson,
  getOrderFromDatabase,
} from "@/lib/crm/fetchOrders";
import type { CrmOrderDetail } from "@/lib/crm/fetchOrders";
import {
  formatOrderMoney,
  getCrmOrderFromStripe,
  labelPaymentStatus,
  labelSessionStatus,
} from "@/lib/crm/stripeOrders";
import {
  formatDateTime,
  labelOrderStatus,
  labelSource,
} from "@/lib/crm/format";
import { OrderUpdateForm } from "./OrderUpdateForm";

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

function metadataString(
  metadata: Record<string, unknown>,
  key: string
): string | null {
  const value = metadata[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function DatabaseOrderDetail({ order }: { order: CrmOrderDetail }) {
  const meta = order.metadata;
  const consultationRef = metadataString(meta, "consultation_ref");
  const consultationId = metadataString(meta, "consultation_id");
  const billingText = formatAddressJson(order.billing_address);
  const shippingText = formatAddressJson(order.shipping_address);
  const currency = order.currency;

  return (
    <div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Ordine operativo
          </p>
          <h2 className="mt-1 text-2xl font-semibold">{order.order_ref}</h2>
        </div>
        {order.stripe_session_id && isStripeConfigured() && (
          <a
            href={checkoutSessionDashboardUrl(order.stripe_session_id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-border/50 px-5 py-2 text-sm font-medium transition hover:border-accent/50 hover:bg-background/40"
          >
            Apri in Stripe Dashboard
          </a>
        )}
      </div>

      <div className="mt-6 space-y-6">
        <Section title="Gestione ordine">
          <OrderUpdateForm
            orderId={order.id}
            initialStatus={order.status}
            initialTrackingCode={order.tracking_code ?? ""}
            initialTrackingUrl={order.tracking_url ?? ""}
            initialInternalNotes={order.internal_notes ?? ""}
          />
        </Section>

        <Section title="Riepilogo">
          <dl className="space-y-2.5">
            <Field label="Order ref" value={order.order_ref} />
            <Field
              label="Stato operativo"
              value={labelOrderStatus(order.status)}
            />
            <Field
              label="Stato pagamento"
              value={
                order.payment_status
                  ? labelPaymentStatus(order.payment_status)
                  : "—"
              }
            />
            <Field
              label="Stato Stripe"
              value={
                order.stripe_status
                  ? labelSessionStatus(order.stripe_status)
                  : "—"
              }
            />
            <Field label="Email cliente" value={order.customer_email ?? "—"} />
            <Field
              label="Totale pagato"
              value={formatOrderMoney(order.total, currency, true)}
            />
            <Field
              label="Creato il"
              value={formatDateTime(order.created_at)}
            />
            {order.paid_at && (
              <Field label="Pagato il" value={formatDateTime(order.paid_at)} />
            )}
            {order.shipped_at && (
              <Field
                label="Spedito il"
                value={formatDateTime(order.shipped_at)}
              />
            )}
            {order.delivered_at && (
              <Field
                label="Consegnato il"
                value={formatDateTime(order.delivered_at)}
              />
            )}
            {order.tracking_code && (
              <Field label="Tracking" value={order.tracking_code} />
            )}
            {order.tracking_url && (
              <Field
                label="URL tracking"
                value={
                  <a
                    href={order.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Apri tracking
                  </a>
                }
              />
            )}
          </dl>
        </Section>

        {(billingText || shippingText || order.shipping_name) && (
          <Section title="Indirizzi">
            <dl className="space-y-4">
              {billingText && (
                <div>
                  <dt className="text-sm text-muted-foreground">Fatturazione</dt>
                  <dd className="mt-1 whitespace-pre-line text-sm font-medium">
                    {billingText}
                  </dd>
                </div>
              )}
              {(shippingText || order.shipping_name) && (
                <div>
                  <dt className="text-sm text-muted-foreground">Spedizione</dt>
                  <dd className="mt-1 whitespace-pre-line text-sm font-medium">
                    {[order.shipping_name, shippingText]
                      .filter(Boolean)
                      .join("\n")}
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
                  key={item.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-border/40 bg-background/30 px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Qtà {item.quantity}
                      {item.catalog_id ? ` · ${item.catalog_id}` : ""}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {formatOrderMoney(item.total, currency, true)}
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
              value={formatOrderMoney(order.subtotal, currency, true)}
            />
            <Field
              label="Spedizione"
              value={formatOrderMoney(order.shipping, currency, true)}
            />
            <Field
              label="Sconto"
              value={formatOrderMoney(order.discount, currency, true)}
            />
            <Field
              label="Totale"
              value={formatOrderMoney(order.total, currency, true)}
            />
          </dl>
        </Section>

        <Section title="Metadata">
          <dl className="space-y-2.5">
            <Field
              label="Source"
              value={order.source ? labelSource(order.source) : "—"}
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
            <Field
              label="UTM source"
              value={metadataString(meta, "utm_source") ?? "—"}
            />
            <Field
              label="UTM campaign"
              value={metadataString(meta, "utm_campaign") ?? "—"}
            />
          </dl>
        </Section>
      </div>
    </div>
  );
}

export default async function CrmOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isStripeConfigured() && !hasSupabaseAdminCredentials()) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/40 p-6 text-sm text-muted-foreground">
        Configurazione server incompleta: mancano{" "}
        <code className="text-foreground">STRIPE_SECRET_KEY</code> o Supabase.
      </div>
    );
  }

  if (hasSupabaseAdminCredentials()) {
    try {
      const dbOrder = await getOrderFromDatabase(id);
      if (dbOrder) {
        return (
          <div>
            <Link
              href="/crm/ordini"
              className="text-sm font-medium text-accent hover:underline"
            >
              ← Torna agli ordini
            </Link>
            <DatabaseOrderDetail order={dbOrder} />
          </div>
        );
      }
    } catch (err) {
      console.warn("⚠️ Lettura ordine Supabase fallita:", err);
    }
  }

  if (!isStripeConfigured()) {
    notFound();
  }

  const stripeOrder = await getCrmOrderFromStripe(id);
  if (!stripeOrder) notFound();

  const meta = stripeOrder.metadata;
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
            Ordine Stripe (fallback)
          </p>
          <h2 className="mt-1 text-2xl font-semibold">{stripeOrder.orderRef}</h2>
        </div>
        <a
          href={checkoutSessionDashboardUrl(stripeOrder.sessionId)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-border/50 px-5 py-2 text-sm font-medium transition hover:border-accent/50 hover:bg-background/40"
        >
          Apri in Stripe Dashboard
        </a>
      </div>

      <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/90">
        Ordine letto da Stripe. Per gestione operativa (stato, tracking, note)
        applicare la migration Supabase e attendere nuovi webhook.
      </div>

      <div className="mt-6 space-y-6">
        <Section title="Riepilogo">
          <dl className="space-y-2.5">
            <Field label="Order ref" value={stripeOrder.orderRef} />
            <Field
              label="Stripe session id"
              value={
                <span className="font-mono text-xs">{stripeOrder.sessionId}</span>
              }
            />
            <Field
              label="Stato pagamento"
              value={labelPaymentStatus(stripeOrder.paymentStatus)}
            />
            <Field
              label="Stato sessione"
              value={labelSessionStatus(stripeOrder.stripeStatus)}
            />
            <Field label="Email cliente" value={stripeOrder.customerEmail || "—"} />
            <Field
              label="Totale pagato"
              value={formatOrderMoney(stripeOrder.total, stripeOrder.currency)}
            />
          </dl>
        </Section>

        {(stripeOrder.billingAddress || stripeOrder.shippingAddress) && (
          <Section title="Indirizzi">
            <dl className="space-y-4">
              {stripeOrder.billingAddress && (
                <div>
                  <dt className="text-sm text-muted-foreground">Fatturazione</dt>
                  <dd className="mt-1 whitespace-pre-line text-sm font-medium">
                    {stripeOrder.billingAddress}
                  </dd>
                </div>
              )}
              {stripeOrder.shippingAddress && (
                <div>
                  <dt className="text-sm text-muted-foreground">Spedizione</dt>
                  <dd className="mt-1 whitespace-pre-line text-sm font-medium">
                    {stripeOrder.shippingAddress}
                  </dd>
                </div>
              )}
            </dl>
          </Section>
        )}

        <Section title="Line items">
          {stripeOrder.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">—</p>
          ) : (
            <div className="space-y-3">
              {stripeOrder.items.map((item) => (
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
                    {formatOrderMoney(
                      item.price * item.quantity,
                      stripeOrder.currency
                    )}
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
              value={formatOrderMoney(stripeOrder.subtotal, stripeOrder.currency)}
            />
            <Field
              label="Spedizione"
              value={formatOrderMoney(stripeOrder.shipping, stripeOrder.currency)}
            />
            <Field
              label="Sconto"
              value={formatOrderMoney(stripeOrder.discount, stripeOrder.currency)}
            />
            <Field
              label="Totale"
              value={formatOrderMoney(stripeOrder.total, stripeOrder.currency)}
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
