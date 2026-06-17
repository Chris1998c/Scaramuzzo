export type { ConsentCategory, ConsentPreferences } from "./types";
export { DEFAULT_CONSENT, ACCEPT_ALL_CONSENT } from "./types";

export {
  CONSENT_STORAGE_KEY,
  readConsentPreferences,
  writeConsentPreferences,
  consentFromAcceptAll,
  consentFromRejectAll,
} from "./storage";

export {
  CONSENT_MODE_DEFAULT_SCRIPT,
  applyConsentUpdate,
} from "./consentMode";

export { GTM_ID, isGtmConfigured, getGtmScriptSrc, getGtmNoscriptSrc } from "./gtm";

export {
  getConsentPreferences,
  hasAnalyticsConsent,
  hasMarketingConsent,
  publishConsent,
  restoreConsentFromStorage,
} from "./consent";
