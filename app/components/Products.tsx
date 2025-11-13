'use client'

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductsProps {
  language: "it" | "en";
}

const productsData = {
  it: {
    title: "I Nostri Prodotti",
    products: [
      {
        id: "shampoo-riflessante-henne",
        name: "Shampoo Riflessante con Henné",
        description: "Mantiene i riflessi naturali dei capelli trattati con henné.",
        image: "/sh-hennè.webp",
        imageAlt: "Shampoo Riflessante con Henné",
      },
      {
        id: "maschera-riflessante-henne",
        name: "Maschera Riflessante con Henné",
        description: "Nutre e ravviva il colore naturalmente.",
        image: "/mask-hennè.webp",
        imageAlt: "Maschera Riflessante con Henné",
      },
      {
        id: "shampoo-purificante-seboregolatore",
        name: "Shampoo Purificante-Seboregolatore",
        description: "Azione riequilibrante per cute grassa o sensibile.",
        image: "/sh-hennè.webp",
        imageAlt: "Shampoo Purificante",
      },
      {
        id: "bagnoschiuma-purificante",
        name: "Bagnoschiuma Purificante",
        description: "Sensazione di freschezza e pulizia profonda.",
        image: "/sh-hennè.webp",
        imageAlt: "Bagnoschiuma",
      },
      {
        id: "olio-lenitivo-olivo-e-girasole",
        name: "Olio Lenitivo Olivo & Girasole",
        description: "Idratazione intensa e naturale.",
        image: "/sh-hennè.webp",
        imageAlt: "Olio Lenitivo",
      },
    ],
  },
  en: {
    title: "Our Products",
    products: [
      {
        id: "shampoo-riflessante-henne",
        name: "Reflective Shampoo with Henna",
        description: "Enhances and maintains henna-treated hair tones.",
        image: "/sh-hennè.webp",
        imageAlt: "Reflective Shampoo",
      },
      {
        id: "maschera-riflessante-henne",
        name: "Reflective Mask with Henna",
        description: "Deeply nourishes and enhances reflections.",
        image: "/mask-hennè.webp",
        imageAlt: "Reflective Mask",
      },
      {
        id: "shampoo-purificante-seboregolatore",
        name: "Purifying & Sebum-Balancing Shampoo",
        description: "Rebalancing action for oily or sensitive scalp.",
        image: "/sh-hennè.webp",
        imageAlt: "Purifying Shampoo",
      },
      {
        id: "bagnoschiuma-purificante",
        name: "Purifying Body Wash",
        description: "Deep cleansing and a fresh sensation.",
        image: "/sh-hennè.webp",
        imageAlt: "Purifying Body Wash",
      },
      {
        id: "olio-lenitivo-olivo-e-girasole",
        name: "Soothing Oil – Olive & Sunflower",
        description: "Intense soothing and moisturizing action.",
        image: "/sh-hennè.webp",
        imageAlt: "Soothing Oil",
      },
    ],
  },
};

const Products: FC<ProductsProps> = ({ language }) => {
  const router = useRouter();
  const t = productsData[language];

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
          {t.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.products.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-contain rounded-t-lg p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  {product.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
