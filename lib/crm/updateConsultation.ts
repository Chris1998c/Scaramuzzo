import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  CONSULTATION_STATUSES,
  type ConsultationStatus,
} from "@/lib/crm/types";

export function isValidStatus(value: string): value is ConsultationStatus {
  return (CONSULTATION_STATUSES as readonly string[]).includes(value);
}

export async function updateConsultationStatus(
  id: string,
  status: ConsultationStatus
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("consultations")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(`UPDATE_STATUS_FAILED: ${error.message}`);
  }
}
