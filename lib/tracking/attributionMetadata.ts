import type { StripeAttributionKey } from "./attributionTypes";
import {
  STRIPE_ATTRIBUTION_KEYS,
  STRIPE_ATTRIBUTION_MAX,
} from "./attributionTypes";

function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

/** Sanitizza attribution client-side per metadata Stripe (server-safe). */
export function sanitizeAttributionForStripe(
  raw: unknown
): Partial<Record<StripeAttributionKey, string>> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {};
  }

  const source = raw as Record<string, unknown>;
  const out: Partial<Record<StripeAttributionKey, string>> = {};

  for (const key of STRIPE_ATTRIBUTION_KEYS) {
    const value = source[key];
    if (typeof value !== "string") continue;

    const trimmed = value.trim();
    if (!trimmed) continue;

    out[key] = truncate(trimmed, STRIPE_ATTRIBUTION_MAX[key]);
  }

  return out;
}
