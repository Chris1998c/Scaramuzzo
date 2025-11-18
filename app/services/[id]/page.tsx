import type { Metadata } from "next";
import ServicePageClient from "./ServicePageClient";
import { serviceTranslations } from "../data";

export const dynamicParams = true;

export const dynamic = "force-static";

// Tipo giusto (SYNC, non async)
export type PageProps = {
  params: { id: string };
};

// 🔥 SEO DINAMICA — CORRETTA
export function generateMetadata({ params }: PageProps): Metadata {
  const id = params.id; // <— Sync, non Promise

  const service = serviceTranslations.it.services.find(s => s.id === id);

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

// 🔥 PAGE COMPONENT — CORRETTO
export default function Page({ params }: PageProps) {
  const id = params.id; // <— Sync anche qui
  return <ServicePageClient id={id} />;
}
