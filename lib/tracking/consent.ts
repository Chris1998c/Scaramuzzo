import { applyConsentUpdate } from "./consentMode";
import { readConsentPreferences } from "./storage";
import { trackEvent } from "./trackEvent";
import type { ConsentPreferences } from "./types";

export function getConsentPreferences(): ConsentPreferences | null {
  return readConsentPreferences();
}

export function hasAnalyticsConsent(): boolean {
  return readConsentPreferences()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return readConsentPreferences()?.marketing === true;
}

function wasConsentRestoredPreGtm(): boolean {
  if (typeof window === "undefined") return false;
  return window.__scaramuzzoConsentRestored === true;
}

/**
 * Applica Consent Mode + evento dataLayer.
 * Usare solo quando l'utente salva/aggiorna preferenze (non al restore pre-GTM).
 */
export function publishConsent(preferences: ConsentPreferences) {
  applyConsentUpdate(preferences);

  trackEvent("consent_update", {
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    source: "user_action",
  });
}

/**
 * Ripristino runtime post-hydration — solo se il bootstrap pre-GTM non ha già applicato il consenso.
 * Non emette consent_update per evitare duplicati GTM.
 */
export function restoreConsentFromStorage() {
  if (wasConsentRestoredPreGtm()) return;

  const stored = readConsentPreferences();
  if (stored) applyConsentUpdate(stored);
}
