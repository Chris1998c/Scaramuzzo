import type { Metadata } from "next";
import ServicePageClient from "./ServicePageClient";
import { serviceTranslations } from "../data";

export const dynamic = "force-static";

// Tipi corretti: params è una Promise
type PageProps = {
  params: Promise<{ id: string }>;
};

// ================================
//     SEO DINAMICA COMPLETA
// ================================
export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const { id } = await props.params;

  const service = serviceTranslations.it.services.find(
    (s) => s.id === id
  );

  if (!service) {
    return {
      title: "Servizio non trovato | Scaramuzzo",
      description: "Il servizio richiesto non è disponibile.",
    };
  }

  const absoluteImage = `https://www.scaramuzzo.green${service.image}`;
  const canonical = `https://www.scaramuzzo.green/services/${id}`;

  return {
    title: `${service.name} • Scaramuzzo Hair Natural Beauty`,
    description: service.description,

    alternates: { canonical },

    openGraph: {
      type: "website",          // <-- corretto per servizi
      url: canonical,
      title: service.name,
      description: service.description,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 800,
          alt: service.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: service.name,
      description: service.description,
      images: [absoluteImage],
    },
  };
}

// ================================
//     PAGINA DINAMICA
// ================================
export default async function Page(props: PageProps) {
  const { id } = await props.params;
  return <ServicePageClient id={id} />;
}
