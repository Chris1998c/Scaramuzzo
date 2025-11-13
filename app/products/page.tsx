// app/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Language = "it" | "en";

export default function ProductsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  const translations = {
    it: {
      title: "I Nostri Prodotti",
      products: [
        {
          id: "shampoo-riflessante-henne",
          name: "Shampoo Riflessante all’Henné",
          description:
            "Shampoo ristrutturante con estratto di henné per riflessi luminosi.",
          image: "/sh-hennè.webp",
          imageAlt: "Shampoo Riflessante all’Henné",
        },
        {
          id: "maschera-riflessante-henne",
          name: "Maschera Riflessante all’Henné",
          description:
            "Maschera nutriente e illuminante per esaltare i riflessi dell’henné.",
          image: "/mask-hennè.webp",
          imageAlt: "Maschera Riflessante all’Henné",
        },
        {
          id: "shampoo-purificante-seboregolatore",
          name: "Shampoo Purificante Seboregolatore",
          description:
            "Azione riequilibrante per cute grassa, radici pesanti e sebo in eccesso.",
          image: "/sh-hennè.webp",
          imageAlt: "Shampoo Purificante Seboregolatore",
        },
        {
          id: "shampoo-volume",
          name: "Shampoo Volume & Leggerezza",
          description:
            "Dona corpo ai capelli fini mantenendoli leggeri e morbidi.",
          image: "/sh-hennè.webp",
          imageAlt: "Shampoo Volume & Leggerezza",
        },
      ],
    },
    en: {
      title: "Our Products",
      products: [
        {
          id: "shampoo-riflessante-henne",
          name: "Reflective Henna Shampoo",
          description:
            "Strengthening shampoo with henna extract for luminous reflections.",
          image: "/sh-hennè.webp",
          imageAlt: "Reflective Henna Shampoo",
        },
        {
          id: "maschera-riflessante-henne",
          name: "Reflective Henna Mask",
          description:
            "Nourishing and illuminating mask to enhance henna reflections.",
          image: "/mask-hennè.webp",
          imageAlt: "Reflective Henna Mask",
        },
        {
          id: "shampoo-purificante-seboregolatore",
          name: "Purifying Sebum-Regulating Shampoo",
          description:
            "Rebalancing action for oily scalp, heavy roots and excess sebum.",
          image: "/sh-hennè.webp",
          imageAlt: "Purifying Sebum-Regulating Shampoo",
        },
        {
          id: "shampoo-volume",
          name: "Volume & Lightweight Shampoo",
          description:
            "Gives body to fine hair while keeping it airy and soft.",
          image: "/sh-hennè.webp",
          imageAlt: "Volume & Lightweight Shampoo",
        },
      ],
    },
  };

  const t = translations[language];

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
}
