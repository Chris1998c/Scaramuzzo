/** Google Tag Manager container ID (es. GTM-XXXXXXX). */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";

export function isGtmConfigured(): boolean {
  return GTM_ID.length > 0;
}

export function getGtmScriptSrc(): string {
  return `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
}

export function getGtmNoscriptSrc(): string {
  return `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
}
