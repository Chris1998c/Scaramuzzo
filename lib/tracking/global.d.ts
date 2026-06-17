export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    /** Set by CONSENT_BOOTSTRAP_SCRIPT when stored consent is applied pre-GTM. */
    __scaramuzzoConsentRestored?: boolean;
  }
}
