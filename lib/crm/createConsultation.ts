import { randomBytes } from "crypto";
import { getSupabaseAdmin, logSupabaseAdminDebug } from "@/lib/supabase/admin";
import type {
  CreateConsultationInput,
  CreateConsultationResult,
} from "@/lib/crm/types";

const MAX_REF_RETRIES = 3;
const REF_ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomSuffix(length: number): string {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += REF_ALPHANUM[bytes[i]! % REF_ALPHANUM.length];
  }
  return out;
}

/** SC-YYYYMMDD-HHMMSS-XXXX — nessuna query DB, UTC per coerenza serverless. */
function nextPublicRef(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const mo = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const h = String(now.getUTCHours()).padStart(2, "0");
  const mi = String(now.getUTCMinutes()).padStart(2, "0");
  const s = String(now.getUTCSeconds()).padStart(2, "0");
  return `SC-${y}${mo}${d}-${h}${mi}${s}-${randomSuffix(4)}`;
}

export async function createConsultation(
  input: CreateConsultationInput
): Promise<CreateConsultationResult> {
  const supabase = getSupabaseAdmin();

  for (let attempt = 0; attempt < MAX_REF_RETRIES; attempt++) {
    const publicRef = nextPublicRef();

    const { data, error } = await supabase
      .from("consultations")
      .insert({
        public_ref: publicRef,
        type: input.type,
        source: input.source,
        language: input.language,
        payload: input.payload,
        customer_name: input.customerName ?? null,
        customer_phone: input.customerPhone ?? null,
        status: "nuova",
        whatsapp_clicked: false,
      })
      .select("id, public_ref")
      .single();

    if (!error && data) {
      return { id: data.id, publicRef: data.public_ref };
    }

    if (error?.code === "23505") {
      continue;
    }

    logSupabaseAdminDebug("insert-failed");

    throw new Error(`INSERT_FAILED: ${error?.message ?? "unknown"}`);
  }

  throw new Error("INSERT_FAILED: impossibile generare public_ref univoco");
}
