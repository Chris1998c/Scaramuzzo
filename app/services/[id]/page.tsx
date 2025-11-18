import type { Metadata } from "next";
import ServicePageClient from "./ServicePageClient";
import { serviceTranslations } from "../data";

export type PageProps = {
  params: { id: string };
};

// 🔥 SEO dinamica
export function generateMetadata(
  { params }: PageProps
): Metadata {
  const { id } = params;

  const service =
    serviceTranslations.it.services.find((s) => s.id === id);

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

export default function Page({ params }: PageProps) {
  const { id } = params;
  return <ServicePageClient id={id} />;
}
