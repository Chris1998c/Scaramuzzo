import type { Metadata } from "next";
import ProductPageClient from "./ProductPageClient";
import { productTranslations } from "../data";

export type PageProps = {
  params: Promise<{ id: string }>;
};

// 🔥 SEO dinamica
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;

  const product =
    productTranslations.it.products.find((p) => p.id === id);

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
          width: 800,
          height: 800,
        },
      ],
    },
    alternates: {
      canonical: `https://www.scaramuzzo.green/products/${id}`,
    },
  };
}

// 🔥 Pagina
export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <ProductPageClient id={id} />;
}
