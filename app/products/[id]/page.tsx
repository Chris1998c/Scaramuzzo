// app/products/[id]/page.tsx

import type { Metadata } from "next";
import ProductPageClient from "./ProductPageClient";
import { productTranslations } from "../data";

export type PageProps = {
  params: {
    id: string;
  };
};

// 🔥 SEO DINAMICA PER OGNI PRODOTTO
export function generateMetadata(
  { params }: PageProps
): Metadata {
  const product =
    productTranslations.it.products.find((p) => p.id === params.id);

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
      images: [
        {
          url: product.image,
          width: 900,
          height: 900,
        },
      ],
    },
    alternates: {
      canonical: `https://www.scaramuzzo.green/products/${params.id}`,
    },
  };
}

// 🔥 RENDER CLIENT-SIDE DELLA PAGINA
export default function Page({ params }: PageProps) {
  return <ProductPageClient id={params.id} />;
}
