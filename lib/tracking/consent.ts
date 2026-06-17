import { applyConsentUpdate } from "./consentMode";
import { readConsentPreferences } from "./storage";
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

/** Applica Consent Mode + eventuale segnale GTM dopo salvataggio preferenze. */
export function publishConsent(preferences: ConsentPreferences) {
  applyConsentUpdate(preferences);

  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "consent_update",
    consent: {
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    },
  });
}

export function restoreConsentFromStorage() {
  const stored = readConsentPreferences();
  if (stored) publishConsent(stored);
}
