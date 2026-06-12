import {
  CONSULTATION_LANGUAGES,
  CONSULTATION_SOURCES,
  CONSULTATION_TYPES,
  type CreateConsultationInput,
} from "@/lib/crm/types";

const MAX_PAYLOAD_BYTES = 50_000;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function includes<T extends readonly string[]>(
  list: T,
  value: string
): value is T[number] {
  return (list as readonly string[]).includes(value);
}

export function validateCreateConsultationBody(
  body: unknown
): { ok: true; data: CreateConsultationInput } | { ok: false; error: string } {
  if (!isPlainObject(body)) {
    return { ok: false, error: "Body JSON non valido." };
  }

  const type = typeof body.type === "string" ? body.type : "";
  const source = typeof body.source === "string" ? body.source : "";
  const language = typeof body.language === "string" ? body.language : "";

  if (!includes(CONSULTATION_TYPES, type)) {
    return { ok: false, error: "Campo type non valido." };
  }
  if (!includes(CONSULTATION_SOURCES, source)) {
    return { ok: false, error: "Campo source non valido." };
  }
  if (!includes(CONSULTATION_LANGUAGES, language)) {
    return { ok: false, error: "Campo language non valido." };
  }
  if (!isPlainObject(body.payload)) {
    return { ok: false, error: "Campo payload deve essere un oggetto." };
  }

  const payloadSize = JSON.stringify(body.payload).length;
  if (payloadSize > MAX_PAYLOAD_BYTES) {
    return { ok: false, error: "Payload troppo grande." };
  }

  return {
    ok: true,
    data: { type, source, language, payload: body.payload },
  };
}
