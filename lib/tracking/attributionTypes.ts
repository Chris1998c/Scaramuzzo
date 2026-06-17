export type AttributionTouch = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  captured_at: number;
};

export type StoredAttribution = {
  first_touch: AttributionTouch | null;
  last_touch: AttributionTouch | null;
};

export type AttributionPayload = {
  first_touch: AttributionTouch | null;
  last_touch: AttributionTouch | null;
};

export const ATTRIBUTION_STORAGE_KEY = "scaramuzzo-attribution-v1";
export const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

export const STRIPE_ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_campaign",
  "gclid",
  "fbclid",
  "landing_page",
] as const;

export type StripeAttributionKey = (typeof STRIPE_ATTRIBUTION_KEYS)[number];

export const STRIPE_ATTRIBUTION_MAX: Record<StripeAttributionKey, number> = {
  utm_source: 100,
  utm_campaign: 100,
  gclid: 100,
  fbclid: 100,
  landing_page: 200,
};
