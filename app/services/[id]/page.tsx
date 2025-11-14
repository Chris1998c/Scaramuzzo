import type { Metadata } from "next";
import { serviceTranslations } from "../data";
import ServiceDetailClient from "./ServicePageClient";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const service =
    serviceTranslations.it.services.find((s) => s.id === params.id) ||
    serviceTranslations.en.services.find((s) => s.id === params.id);

  if (!service) {
    return {
      title: "Servizio non trovato | Scaramuzzo",
      description: "Il servizio richiesto non è disponibile.",
    };
  }

  return {
    title: `${service.name} | Scaramuzzo Hair Natural Beauty`,
    description: service.description,
    openGraph: {
      title: service.name,
      description: service.description,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 800,
        },
      ],
    },
    alternates: {
      canonical: `https://www.scaramuzzo.green/services/${params.id}`,
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <ServiceDetailClient id={params.id} />;
}
