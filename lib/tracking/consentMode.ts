import type { ConsentPreferences } from "./types";

/** Inline bootstrap — default denied + restore from localStorage, before GTM. */
export const CONSENT_BOOTSTRAP_SCRIPT = `(function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});var KEY='scaramuzzo-consent-v1';var LEGACY='cookie-consent';function parseConsent(raw){try{var p=JSON.parse(raw);if(p&&p.necessary===true&&typeof p.analytics==='boolean'&&typeof p.marketing==='boolean')return p;}catch(e){}return null;}function migrateLegacy(){try{var l=localStorage.getItem(LEGACY);if(!l)return null;var p={necessary:true,analytics:l==='accepted',marketing:l==='accepted',updatedAt:new Date().toISOString()};localStorage.setItem(KEY,JSON.stringify(p));localStorage.removeItem(LEGACY);return p;}catch(e){return null;}}var stored=null;try{var raw=localStorage.getItem(KEY);stored=raw?parseConsent(raw):migrateLegacy();}catch(e){}if(stored){gtag('consent','update',{analytics_storage:stored.analytics?'granted':'denied',ad_storage:stored.marketing?'granted':'denied',ad_user_data:stored.marketing?'granted':'denied',ad_personalization:stored.marketing?'granted':'denied'});window.__scaramuzzoConsentRestored=true;}})();`;

/** @deprecated Use CONSENT_BOOTSTRAP_SCRIPT */
export const CONSENT_MODE_DEFAULT_SCRIPT = CONSENT_BOOTSTRAP_SCRIPT;

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
