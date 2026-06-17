import {
  ACCEPT_ALL_CONSENT,
  DEFAULT_CONSENT,
  type ConsentPreferences,
} from "./types";

export const CONSENT_STORAGE_KEY = "scaramuzzo-consent-v1";
const LEGACY_CONSENT_KEY = "cookie-consent";

function isConsentPreferences(value: unknown): value is ConsentPreferences {
  if (!value || typeof value !== "object") return false;
  const v = value as ConsentPreferences;
  return (
    v.necessary === true &&
    typeof v.analytics === "boolean" &&
    typeof v.marketing === "boolean"
  );
}

function migrateLegacyConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;

  const legacy = localStorage.getItem(LEGACY_CONSENT_KEY);
  if (!legacy) return null;

  const migrated: ConsentPreferences = {
    necessary: true,
    analytics: legacy === "accepted",
    marketing: legacy === "accepted",
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(migrated));
  localStorage.removeItem(LEGACY_CONSENT_KEY);

  return migrated;
}

export function readConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return migrateLegacyConsent();

    const parsed: unknown = JSON.parse(raw);
    if (!isConsentPreferences(parsed)) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function writeConsentPreferences(
  preferences: Omit<ConsentPreferences, "updatedAt" | "necessary">
): ConsentPreferences {
  const next: ConsentPreferences = {
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    localStorage.removeItem(LEGACY_CONSENT_KEY);
  }

  return next;
}

export function consentFromAcceptAll(): ConsentPreferences {
  return writeConsentPreferences({
    analytics: ACCEPT_ALL_CONSENT.analytics,
    marketing: ACCEPT_ALL_CONSENT.marketing,
  });
}

export function consentFromRejectAll(): ConsentPreferences {
  return writeConsentPreferences({
    analytics: DEFAULT_CONSENT.analytics,
    marketing: DEFAULT_CONSENT.marketing,
  });
}
