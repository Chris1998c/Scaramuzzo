import { getSupabaseAdmin } from "@/lib/supabase/admin";

export interface ConsultationRow {
  id: string;
  public_ref: string;
  type: string;
  source: string;
  status: string;
  language: string;
  payload: Record<string, unknown>;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  whatsapp_clicked: boolean;
  created_at: string;
  updated_at: string;
}

const LIST_COLUMNS =
  "id, public_ref, type, source, status, language, payload, customer_name, customer_phone, created_at";

export interface ConsultationFilters {
  status?: string;
  type?: string;
  complexity?: string;
}

export async function listConsultations(
  limit = 50,
  filters: ConsultationFilters = {}
): Promise<ConsultationRow[]> {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("consultations")
    .select(LIST_COLUMNS)
    .order("created_at", { ascending: false });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.type) {
    query = query.eq("type", filters.type);
  }
  // La complessità vive nel payload JSONB: filtro a livello DB con freccia ->>.
  if (filters.complexity) {
    query = query.eq("payload->>complexity", filters.complexity);
  }

  const { data, error } = await query.limit(limit);

  if (error) {
    throw new Error(`LIST_CONSULTATIONS_FAILED: ${error.message}`);
  }

  return (data ?? []) as ConsultationRow[];
}

export async function getConsultationById(
  id: string
): Promise<ConsultationRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`GET_CONSULTATION_FAILED: ${error.message}`);
  }

  return data as ConsultationRow | null;
}

export function payloadComplexity(
  payload: Record<string, unknown>
): string | null {
  const value = payload.complexity;
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function payloadAgeRange(
  payload: Record<string, unknown>
): string | null {
  const value = payload.ageRange;
  return typeof value === "string" && value.length > 0 ? value : null;
}
