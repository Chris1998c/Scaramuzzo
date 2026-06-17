import Link from "next/link";
import { isStripeConfigured } from "@/lib/stripe/client";
import {
  formatOrderMoney,
  labelPaymentStatus,
  labelSessionStatus,
  listCrmOrders,
} from "@/lib/crm/stripeOrders";
import { formatDateTime, labelSource } from "@/lib/crm/format";

export default async function CrmOrdersPage() {
  if (!isStripeConfigured()) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/40 p-6 text-sm text-muted-foreground">
        Configurazione server incompleta: manca{" "}
        <code className="text-foreground">STRIPE_SECRET_KEY</code>.
      </div>
    );
  }

  let orders: Awaited<ReturnType<typeof listCrmOrders>> = [];
  let errorMessage: string | null = null;

  try {
    orders = await listCrmOrders(50);
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Errore nel caricamento ordini.";
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Ordini Stripe</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ultime 50 Checkout Sessions — fonte ordine: Stripe.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{orders.length} ordini</p>
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {errorMessage}
        </div>
      )}

      {orders.length === 0 && !errorMessage ? (
        <div className="rounded-2xl border border-border/40 bg-card/40 p-8 text-center text-sm text-muted-foreground">
          Nessun ordine trovato su Stripe.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/40 bg-card/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-border/40 bg-background/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Order ref</th>
                  <th className="px-4 py-3 font-semibold">Data</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Totale</th>
                  <th className="px-4 py-3 font-semibold">Pagamento</th>
                  <th className="px-4 py-3 font-semibold">Sessione</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.sessionId}
                    className="border-b border-border/30 transition hover:bg-background/30"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/crm/ordini/${order.sessionId}`}
                        className="font-medium text-accent hover:underline"
                      >
                        {order.orderRef}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDateTime(new Date(order.createdAt * 1000).toISOString())}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {order.customerEmail ?? "—"}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {formatOrderMoney(order.total, order.currency)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full border border-border/50 px-2.5 py-0.5 text-xs font-medium">
                        {labelPaymentStatus(order.paymentStatus)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {labelSessionStatus(order.status)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {order.source ? labelSource(order.source) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
