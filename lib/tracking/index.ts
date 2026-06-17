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
  CONSENT_BOOTSTRAP_SCRIPT,
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

export type {
  TrackingCategory,
  Serializable,
  TrackingPayload,
  EcommerceEventName,
  QuizEventName,
  BceEventName,
  LeadEventName,
  WhatsappEventName,
  TrackingEventName,
  TrackEventInput,
} from "./events";

export { trackEvent } from "./trackEvent";

export { trackEventOnce } from "./trackEventOnce";

export {
  trackQuizPersonalizzatiComplete,
  trackBceComplete,
  trackWhatsappClick,
} from "./businessEvents";

export type {
  QuizCompleteTrackingInput,
  BceCompleteTrackingInput,
  WhatsappClickLocation,
  WhatsappClickTrackingInput,
} from "./businessEvents";

export {
  ECOMMERCE_CURRENCY,
  getProductCategory,
  sumCartQty,
  mapCartItemsToTracking,
  trackViewItem,
  trackAddToCart,
  trackViewCart,
  trackBeginCheckout,
  fetchVerifiedCheckoutSession,
  trackPurchase,
} from "./ecommerceEvents";

export type {
  EcommerceTrackingItem,
  ViewItemInput,
  AddToCartInput,
  ViewCartInput,
  BeginCheckoutInput,
  VerifiedPurchaseResponse,
  PurchaseInput,
} from "./ecommerceEvents";

export {
  savePendingPurchase,
  readPendingPurchase,
  clearPendingPurchase,
  hasValidPendingPurchase,
  pendingOrderRefMatches,
  cartFingerprint,
} from "./pendingPurchase";

export type { PendingPurchase } from "./pendingPurchase";

export {
  captureAttributionFromUrl,
  getAttribution,
  getAttributionForPayload,
  getAttributionForTracking,
  getAttributionForStripeMetadata,
  withTrackingAttribution,
} from "./attribution";

export type {
  AttributionTouch,
  StoredAttribution,
  AttributionPayload,
} from "./attributionTypes";

export { ATTRIBUTION_STORAGE_KEY, ATTRIBUTION_TTL_MS } from "./attributionTypes";

export { sanitizeAttributionForStripe } from "./attributionMetadata";
