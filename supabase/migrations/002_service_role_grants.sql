-- Scaramuzzo CRM — grant service_role su tabelle consulenze
-- Necessario quando le tabelle sono create senza GRANT espliciti:
-- PostgREST (supabase-js) usa il ruolo service_role → "permission denied" senza grant.

GRANT USAGE ON SCHEMA public TO service_role;

GRANT ALL PRIVILEGES ON TABLE public.consultations TO service_role;
GRANT ALL PRIVILEGES ON TABLE public.consultation_notes TO service_role;
