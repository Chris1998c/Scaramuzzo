import type { TrackingEventName, TrackingPayload } from "./events";

/**
 * Push centralizzato sul dataLayer GTM.
 * No-op lato server. Non dipende da GA/Meta.
 */
export function trackEvent(
  eventName: TrackingEventName,
  payload?: TrackingPayload
): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: eventName,
    ...payload,
  });
}
