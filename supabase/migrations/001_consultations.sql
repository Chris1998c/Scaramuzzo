-- Scaramuzzo CRM — consulenze (Fase 2)
-- Eseguire in Supabase SQL Editor o via CLI migrate.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------------
-- consultations
-- ---------------------------------------------------------------------------
CREATE TABLE consultations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_ref       TEXT NOT NULL UNIQUE,
  type             TEXT NOT NULL CHECK (type IN ('personalizzati', 'botanical_color')),
  source           TEXT NOT NULL,
  status           TEXT NOT NULL DEFAULT 'nuova' CHECK (
    status IN (
      'nuova',
      'in_lavorazione',
      'in_attesa_cliente',
      'completata',
      'archiviata'
    )
  ),
  language         TEXT NOT NULL DEFAULT 'it' CHECK (language IN ('it', 'en')),
  payload          JSONB NOT NULL DEFAULT '{}'::jsonb,
  customer_name    TEXT,
  customer_phone   TEXT,
  customer_email   TEXT,
  whatsapp_clicked BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_consultations_type_status_created
  ON consultations (type, status, created_at DESC);

CREATE INDEX idx_consultations_public_ref
  ON consultations (public_ref);

CREATE INDEX idx_consultations_payload_gin
  ON consultations USING GIN (payload);

-- ---------------------------------------------------------------------------
-- consultation_notes
-- ---------------------------------------------------------------------------
CREATE TABLE consultation_notes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations (id) ON DELETE CASCADE,
  body            TEXT NOT NULL,
  author          TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_consultation_notes_consultation_id
  ON consultation_notes (consultation_id, created_at DESC);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security (no public policies — access via service role / API)
-- ---------------------------------------------------------------------------
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_notes ENABLE ROW LEVEL SECURITY;
