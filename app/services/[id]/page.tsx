import type { Metadata } from "next";
import ServicePageClient from "./ServicePageClient";
import { serviceTranslations } from "../data";

export const dynamic = "force-static";

// ❗ NON usiamo PageProps generati da Next
// creiamo un tipo manuale dove `params` è async
type PageProps = {
  params: Promise<{ id: string }>;
};

// ---------------------------------------------
// SEO DINAMICA CORRETTA (con await)
// ---------------------------------------------
export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const { id } = await props.params; // <-- 🔥 RISOLVE L’ERRORE

  const service = serviceTranslations.it.services.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Servizio non trovato | Scaramuzzo",
      description: "Il servizio richiesto non è disponibile.",
    };
  }

  return {
    title: `${service.name} • Scaramuzzo Hair Natural Beauty`,
    description: service.description,
    alternates: {
      canonical: `https://www.scaramuzzo.green/services/${id}`,
    },
  };
}

// ---------------------------------------------
// PAGE COMPONENT CORRETTO (anche lui async)
// ---------------------------------------------
export default async function Page(props: PageProps) {
  const { id } = await props.params; // <-- 🔥 RISOLVE L’ERRORE

  return <ServicePageClient id={id} />;
}
