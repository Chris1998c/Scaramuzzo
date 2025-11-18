import type { Metadata } from "next";
import { productTranslations } from "../data";
import ClientWrapper from "./client-wrapper";

export const dynamic = "force-static";

type PageProps = {
  params: { id: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const { id } = params;
  const product = productTranslations.it.products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Prodotto non trovato | Scaramuzzo",
      description: "Il prodotto richiesto non è disponibile.",
    };
  }

  return {
    title: `${product.name} • Scaramuzzo Hair Natural Beauty`,
    description: product.description,
    openGraph: {
      title: `${product.name} • Scaramuzzo Hair Natural Beauty`,
      description: product.description,
      images: [{ url: product.image, width: 800, height: 800 }],
    },
    alternates: {
      canonical: `https://www.scaramuzzo.green/products/${id}`,
    },
  };
}

export default function Page({ params }: PageProps) {
  return <ClientWrapper id={params.id} />;
}
