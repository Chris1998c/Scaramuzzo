import { createClient, SupabaseClient } from "@supabase/supabase-js";

/** Rimuove spazi, virgolette e newline accidentalmente incollati in .env.local */
function normalizeEnv(value: string | undefined): string | undefined {
  if (value == null) return undefined;
  const trimmed = value.trim().replace(/^["']|["']$/g, "");
  return trimmed.length > 0 ? trimmed : undefined;
}

export interface SupabaseAdminDebugInfo {
  urlPresent: boolean;
  serviceRoleKeyPresent: boolean;
  serviceRoleKeyLength: number;
  serviceRoleKeyPrefix: string;
  looksLikePublishableKey: boolean;
  sameAsPublishableKey: boolean;
}

/** Debug sicuro — mai loggare la chiave completa. */
export function getSupabaseAdminDebugInfo(): SupabaseAdminDebugInfo {
  const serviceKey = normalizeEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const publishableKey = normalizeEnv(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
  const prefix = serviceKey ? serviceKey.slice(0, 8) : "(missing)";

  return {
    urlPresent: Boolean(normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL)),
    serviceRoleKeyPresent: Boolean(serviceKey),
    serviceRoleKeyLength: serviceKey?.length ?? 0,
    serviceRoleKeyPrefix: prefix,
    looksLikePublishableKey: Boolean(
      serviceKey?.startsWith("sb_publishable_")
    ),
    sameAsPublishableKey: Boolean(
      serviceKey && publishableKey && serviceKey === publishableKey
    ),
  };
}

export function logSupabaseAdminDebug(context: string): void {
  console.info(`[supabase-admin:${context}]`, getSupabaseAdminDebugInfo());
}

/**
 * Client Supabase con service role — solo server-side.
 * Bypassa RLS (necessario: consultations ha RLS senza policy pubbliche).
 * Nessuna cache: evita client creato con env stale in dev/hot reload.
 */
export function getSupabaseAdmin(): SupabaseClient {
  const url = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const serviceRoleKey = normalizeEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const publishableKey = normalizeEnv(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY_MISSING");
  }

  if (
    serviceRoleKey.startsWith("sb_publishable_") ||
    (publishableKey && serviceRoleKey === publishableKey)
  ) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY_IS_PUBLISHABLE");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function hasSupabaseAdminCredentials(): boolean {
  try {
    const url = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
    const serviceRoleKey = normalizeEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
    const publishableKey = normalizeEnv(
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    );
    if (!url || !serviceRoleKey) return false;
    if (serviceRoleKey.startsWith("sb_publishable_")) return false;
    if (publishableKey && serviceRoleKey === publishableKey) return false;
    return true;
  } catch {
    return false;
  }
}
