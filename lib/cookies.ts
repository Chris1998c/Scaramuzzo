export function hasConsent() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie-consent") === "accepted";
}
