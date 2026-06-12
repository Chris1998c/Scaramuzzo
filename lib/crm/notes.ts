import { getSupabaseAdmin } from "@/lib/supabase/admin";

export interface ConsultationNote {
  id: string;
  consultation_id: string;
  body: string;
  author: string;
  created_at: string;
}

const NOTE_COLUMNS = "id, consultation_id, body, author, created_at";

const MAX_NOTE_LENGTH = 5000;

export async function listConsultationNotes(
  consultationId: string
): Promise<ConsultationNote[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("consultation_notes")
    .select(NOTE_COLUMNS)
    .eq("consultation_id", consultationId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`LIST_NOTES_FAILED: ${error.message}`);
  }

  return (data ?? []) as ConsultationNote[];
}

export async function addConsultationNote(
  consultationId: string,
  body: string,
  author = "Staff"
): Promise<void> {
  const trimmed = body.trim();
  if (trimmed.length === 0) {
    throw new Error("ADD_NOTE_EMPTY");
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("consultation_notes").insert({
    consultation_id: consultationId,
    body: trimmed.slice(0, MAX_NOTE_LENGTH),
    author,
  });

  if (error) {
    throw new Error(`ADD_NOTE_FAILED: ${error.message}`);
  }
}
