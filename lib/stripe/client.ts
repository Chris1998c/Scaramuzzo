import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return stripeClient;
}

export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  return Boolean(key && key.length > 0);
}

export function stripeDashboardBaseUrl(): string {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  return key.startsWith("sk_test_")
    ? "https://dashboard.stripe.com/test"
    : "https://dashboard.stripe.com";
}

export function checkoutSessionDashboardUrl(sessionId: string): string {
  return `${stripeDashboardBaseUrl()}/checkout/sessions/${sessionId}`;
}
