import type { Metadata } from "next";
import { productTranslations } from "../data";
import ProductPageClient from "./ProductPageClient";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ id: string }>;
};

// === SEO DINAMICA ===
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params;

  const product = productTranslations.it.products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Prodotto non trovato | Scaramuzzo",
      description: "Il prodotto richiesto non è disponibile.",
    };
  }

  const absoluteImage = `https://www.scaramuzzo.green${product.image}`;

  return {
    title: `${product.name} • Scaramuzzo Hair Natural Beauty`,
    description: product.description,

    openGraph: {
      type: "website", // ← QUI IL FIX
      url: `https://www.scaramuzzo.green/products/${id}`,
      title: product.name,
      description: product.description,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 800,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [absoluteImage],
    },

    alternates: {
      canonical: `https://www.scaramuzzo.green/products/${id}`,
    },
  };
}

// === PAGINA DINAMICA ===
export default async function Page(props: PageProps) {
  const { id } = await props.params;
  return <ProductPageClient id={id} />;
}
