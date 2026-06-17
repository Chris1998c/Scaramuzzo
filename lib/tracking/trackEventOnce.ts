import type { TrackingEventName, TrackingPayload } from "./events";
import { trackEvent } from "./trackEvent";

/**
 * Emette un evento una sola volta per chiave sessionStorage.
 * Protegge da doppio fire in React Strict Mode.
 */
export function trackEventOnce(
  storageKey: string,
  eventName: TrackingEventName,
  payload?: TrackingPayload
): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(storageKey) === "1") return false;

  sessionStorage.setItem(storageKey, "1");
  trackEvent(eventName, payload);
  return true;
}
