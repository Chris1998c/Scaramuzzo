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

  return {
    title: `${product.name} • Scaramuzzo Hair Natural Beauty`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
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
