import type { ConsentPreferences } from "./types";

/** Inline script — must run in <head> before GTM. */
export const CONSENT_MODE_DEFAULT_SCRIPT = `(function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});})();`;

function pushConsentCommand(
  command: "default" | "update",
  values: Record<string, "granted" | "denied">
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];

  const gtag =
    typeof window.gtag === "function"
      ? window.gtag
      : (...args: unknown[]) => {
          window.dataLayer?.push(args);
        };

  gtag("consent", command, values);
}

export function applyConsentUpdate(preferences: ConsentPreferences) {
  pushConsentCommand("update", {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: preferences.marketing ? "granted" : "denied",
    ad_user_data: preferences.marketing ? "granted" : "denied",
    ad_personalization: preferences.marketing ? "granted" : "denied",
  });
}
