import type { Metadata } from "next";
import nextDynamic from "next/dynamic"; // ← nome cambiato per evitare conflitto
import { productTranslations } from "../data";

// Mantieni la pagina SERVER component
export const dynamic = "force-static";

type PageProps = {
  params: { id: string };
};

// Import dinamico corretto
const ProductPageClient = nextDynamic(() => import("./ProductPageClient"), {
  ssr: false,
});

// SEO dinamica
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

// Pagina
export default function Page({ params }: PageProps) {
  return <ProductPageClient id={params.id} />;
}
