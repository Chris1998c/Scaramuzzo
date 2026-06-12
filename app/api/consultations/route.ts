import { NextRequest, NextResponse } from "next/server";
import { createConsultation } from "@/lib/crm/createConsultation";
import { validateCreateConsultationBody } from "@/lib/crm/validateConsultation";
import { hasSupabaseAdminCredentials, logSupabaseAdminDebug } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!hasSupabaseAdminCredentials()) {
    return NextResponse.json(
      {
        error:
          "Configurazione server incompleta: aggiungere SUPABASE_SERVICE_ROLE_KEY in .env.local (Supabase → Settings → API → service_role). La publishable key non può scrivere con RLS attivo.",
      },
      { status: 503 }
    );
  }

  logSupabaseAdminDebug("post-start");

  try {
    const body: unknown = await req.json();
    const validated = validateCreateConsultationBody(body);

    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const result = await createConsultation(validated.data);

    return NextResponse.json(
      { id: result.id, publicRef: result.publicRef },
      { status: 201 }
    );
  } catch (err) {
    logSupabaseAdminDebug("post-error");
    console.error("[POST /api/consultations]", err);

    if (
      err instanceof Error &&
      err.message === "SUPABASE_SERVICE_ROLE_KEY_IS_PUBLISHABLE"
    ) {
      return NextResponse.json(
        {
          error:
            "SUPABASE_SERVICE_ROLE_KEY coincide con la publishable key o usa il prefisso sb_publishable_. Usare la secret/service_role key da Supabase → Settings → API.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Errore durante il salvataggio della consulenza." },
      { status: 500 }
    );
  }
}
