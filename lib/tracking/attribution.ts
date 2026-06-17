import {
  ATTRIBUTION_STORAGE_KEY,
  ATTRIBUTION_TTL_MS,
  type AttributionPayload,
  type AttributionTouch,
  type StoredAttribution,
} from "./attributionTypes";

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const CLICK_IDS = ["gclid", "fbclid"] as const;

const MAX_UTM = 120;
const MAX_LANDING = 300;
const MAX_REFERRER = 300;

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // quota / privacy mode
  }
}

function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

/** Rimuove query/hash per evitare PII accidentale in landing_page e referrer. */
export function sanitizeUrlForAttribution(
  rawUrl: string,
  kind: "landing_page" | "referrer"
): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    if (kind === "landing_page") {
      const url = trimmed.startsWith("/")
        ? new URL(trimmed, "https://local.invalid")
        : new URL(trimmed);
      return url.pathname || "/";
    }

    const url = new URL(trimmed);
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}

function isTouchExpired(touch: AttributionTouch | null | undefined): boolean {
  if (!touch) return true;
  return Date.now() - touch.captured_at > ATTRIBUTION_TTL_MS;
}

function hasMarketingSignal(touch: AttributionTouch): boolean {
  return (
    UTM_PARAMS.some((key) => Boolean(touch[key])) ||
    CLICK_IDS.some((key) => Boolean(touch[key]))
  );
}

function isExternalReferrer(referrer: string, hostname: string): boolean {
  if (!referrer) return false;

  try {
    const refHost = new URL(referrer).hostname;
    return refHost !== hostname;
  } catch {
    return false;
  }
}

function normalizeTouch(
  partial: Partial<AttributionTouch>
): AttributionTouch | null {
  const capturedAt = partial.captured_at ?? Date.now();
  const touch: AttributionTouch = { captured_at: capturedAt };

  for (const key of UTM_PARAMS) {
    const value = partial[key];
    if (typeof value === "string" && value.trim()) {
      touch[key] = truncate(value.trim(), MAX_UTM);
    }
  }

  for (const key of CLICK_IDS) {
    const value = partial[key];
    if (typeof value === "string" && value.trim()) {
      touch[key] = truncate(value.trim(), MAX_UTM);
    }
  }

  if (typeof partial.landing_page === "string" && partial.landing_page.trim()) {
    const sanitized =
      sanitizeUrlForAttribution(partial.landing_page, "landing_page") ??
      partial.landing_page.trim();
    touch.landing_page = truncate(sanitized, MAX_LANDING);
  }

  if (typeof partial.referrer === "string" && partial.referrer.trim()) {
    const sanitized = sanitizeUrlForAttribution(partial.referrer, "referrer");
    if (sanitized) {
      touch.referrer = truncate(sanitized, MAX_REFERRER);
    }
  }

  const hasData =
    hasMarketingSignal(touch) || touch.landing_page || touch.referrer;

  return hasData ? touch : null;
}

function parseTouchFromUrl(
  href: string,
  referrer: string
): AttributionTouch | null {
  if (typeof window === "undefined") return null;

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  const partial: Partial<AttributionTouch> = {
    captured_at: Date.now(),
  };

  const landingPath = sanitizeUrlForAttribution(href, "landing_page");
  if (landingPath) {
    partial.landing_page = landingPath;
  }

  if (isExternalReferrer(referrer, window.location.hostname)) {
    const safeReferrer = sanitizeUrlForAttribution(referrer, "referrer");
    if (safeReferrer) {
      partial.referrer = safeReferrer;
    }
  }

  for (const param of UTM_PARAMS) {
    const value = url.searchParams.get(param);
    if (value) partial[param] = value;
  }

  for (const param of CLICK_IDS) {
    const value = url.searchParams.get(param);
    if (value) partial[param] = value;
  }

  return normalizeTouch(partial);
}

function readStoredAttribution(): StoredAttribution {
  const raw = safeGetItem(ATTRIBUTION_STORAGE_KEY);
  if (!raw) {
    return { first_touch: null, last_touch: null };
  }

  try {
    const parsed = JSON.parse(raw) as StoredAttribution;
    return {
      first_touch:
        parsed.first_touch && !isTouchExpired(parsed.first_touch)
          ? parsed.first_touch
          : null,
      last_touch:
        parsed.last_touch && !isTouchExpired(parsed.last_touch)
          ? parsed.last_touch
          : null,
    };
  } catch {
    return { first_touch: null, last_touch: null };
  }
}

function writeStoredAttribution(data: StoredAttribution): void {
  safeSetItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(data));
}

export function captureAttributionFromUrl(url?: string): void {
  if (typeof window === "undefined") return;

  const touch = parseTouchFromUrl(
    url ?? window.location.href,
    document.referrer
  );
  if (!touch) return;

  const stored = readStoredAttribution();
  let { first_touch, last_touch } = stored;

  if (hasMarketingSignal(touch)) {
    if (!first_touch) first_touch = touch;
    last_touch = touch;
  } else if (!first_touch) {
    first_touch = touch;
    if (!last_touch) last_touch = touch;
  }

  writeStoredAttribution({ first_touch, last_touch });
}

export function getAttribution(): StoredAttribution | null {
  if (typeof window === "undefined") return null;

  const stored = readStoredAttribution();
  if (!stored.first_touch && !stored.last_touch) return null;

  return stored;
}

export function getAttributionForPayload(): AttributionPayload {
  const stored = getAttribution();
  return {
    first_touch: stored?.first_touch ?? null,
    last_touch: stored?.last_touch ?? null,
  };
}

export function getAttributionForTracking(): Record<string, string> {
  const { last_touch, first_touch } = getAttributionForPayload();
  const touch = last_touch ?? first_touch;
  if (!touch) return {};

  const out: Record<string, string> = {};
  if (touch.utm_source) out.utm_source = touch.utm_source;
  if (touch.utm_campaign) out.utm_campaign = touch.utm_campaign;
  if (touch.gclid) out.gclid = touch.gclid;
  if (touch.fbclid) out.fbclid = touch.fbclid;

  return out;
}

export function getAttributionForStripeMetadata(): Record<string, string> {
  const { last_touch, first_touch } = getAttributionForPayload();
  const touch = last_touch ?? first_touch;
  if (!touch) return {};

  const out: Record<string, string> = {};
  if (touch.utm_source) out.utm_source = truncate(touch.utm_source, 100);
  if (touch.utm_campaign) out.utm_campaign = truncate(touch.utm_campaign, 100);
  if (touch.gclid) out.gclid = truncate(touch.gclid, 100);
  if (touch.fbclid) out.fbclid = truncate(touch.fbclid, 100);
  if (touch.landing_page) out.landing_page = truncate(touch.landing_page, 200);

  return out;
}

export function withTrackingAttribution<T extends Record<string, unknown>>(
  payload: T
): T & Record<string, string> {
  return { ...payload, ...getAttributionForTracking() };
}
