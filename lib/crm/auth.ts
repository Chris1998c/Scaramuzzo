// Auth MVP per area CRM — cookie httpOnly, nessun localStorage.
// Token = SHA-256 di una stringa derivata dalla password (Web Crypto: edge + node).

export const CRM_COOKIE = "crm_session";
export const CRM_COOKIE_MAX_AGE = 60 * 60 * 12; // 12h

function getPassword(): string | null {
  const pw = process.env.CRM_ACCESS_PASSWORD?.trim();
  return pw && pw.length > 0 ? pw : null;
}

export function isCrmAuthConfigured(): boolean {
  return getPassword() !== null;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Token atteso nel cookie per la sessione corrente. null se non configurato. */
export async function expectedSessionToken(): Promise<string | null> {
  const pw = getPassword();
  if (!pw) return null;
  return sha256Hex(`scaramuzzo-crm:v1:${pw}`);
}

export async function verifyPassword(candidate: string): Promise<boolean> {
  const pw = getPassword();
  if (!pw) return false;
  return candidate === pw;
}

export async function isValidSessionValue(
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await expectedSessionToken();
  if (!expected) return false;
  return cookieValue === expected;
}
