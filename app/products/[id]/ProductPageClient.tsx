// app/products/[id]/ProductPageClient.tsx
"use client";

import { FC, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Product, productTranslations } from "../data";

type Language = "it" | "en";

interface ProductPageClientProps {
  id: string;
}

const ProductPageClient: FC<ProductPageClientProps> = ({ id }) => {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("it");
  const [product, setProduct] = useState<Product | null>(null);

  // Recupero lingua salvata
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language | null;
    if (storedLanguage === "it" || storedLanguage === "en") {
      setLanguage(storedLanguage);
    }
  }, []);

  // Carico prodotto
  useEffect(() => {
    const current = productTranslations[language].products.find(
      (p) => p.id === id
    );
    setProduct(current || null);
  }, [id, language]);

  const handleBackClick = useCallback(() => {
    router.push("/products");
  }, [router]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const isItalian = language === "it";

  return (
    <section className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4 max-w-5xl grid gap-10 md:grid-cols-2 items-start">

        {/* ---------------- IMMAGINE PRODOTTO ---------------- */}
        <div className="w-full">
          <div className="relative w-full aspect-[3/4] max-w-md mx-auto rounded-xl border border-border bg-secondary/20 shadow-sm overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 80vw, 400px"
              className="p-6"
              style={{
                objectFit: "contain",   // NON zooma, NON taglia, rimane perfetta
              }}
            />
          </div>
        </div>

        {/* ---------------- DETTAGLI PRODOTTO ---------------- */}
        <div className="w-full">

          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            {product.name}
          </h1>

          {product.heroTagline && (
            <p className="text-base md:text-lg text-primary font-medium mb-4">
              {product.heroTagline}
            </p>
          )}

          <p className="text-sm md:text-base text-muted-foreground mb-6">
            {product.description}
          </p>

          <div className="border-t border-border pt-6 space-y-4">

            {/* DESCRIZIONE ESTESA */}
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {isItalian ? "Dettagli prodotto" : "Product details"}
              </h2>
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
                {product.detailedDescription}
              </p>
            </div>

            {/* BENEFICI */}
            {product.benefits && product.benefits.length > 0 && (
              <details className="border border-border rounded-lg p-4 bg-background/40">
                <summary className="cursor-pointer text-sm md:text-base font-semibold">
                  {isItalian ? "Punti di forza" : "Key benefits"}
                </summary>
                <ul className="mt-3 list-disc list-inside text-sm md:text-base space-y-1">
                  {product.benefits.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </details>
            )}

            {/* MODO D'USO */}
            {product.howToUse && (
              <details className="border border-border rounded-lg p-4 bg-background/40">
                <summary className="cursor-pointer text-sm md:text-base font-semibold">
                  {isItalian ? "Modo d’uso" : "How to use"}
                </summary>
                <p className="mt-3 text-sm md:text-base whitespace-pre-line">
                  {product.howToUse}
                </p>
              </details>
            )}

            {/* ATTIVI */}
            {product.keyActives && (
              <details className="border border-border rounded-lg p-4 bg-background/40">
                <summary className="cursor-pointer text-sm md:text-base font-semibold">
                  {isItalian ? "Principi attivi" : "Key ingredients"}
                </summary>
                <p className="mt-3 text-sm md:text-base whitespace-pre-line">
                  {product.keyActives}
                </p>
              </details>
            )}

            {/* INCI */}
            {product.inci && (
              <details className="border border-border rounded-lg p-4 bg-background/40">
                <summary className="cursor-pointer text-sm md:text-base font-semibold">
                  INCI
                </summary>
                <p className="mt-3 text-xs md:text-sm font-mono leading-relaxed break-words whitespace-pre-line">
                  {product.inci}
                </p>
              </details>
            )}
          </div>

          <Button onClick={handleBackClick} className="mt-8">
            {isItalian ? "Torna ai Prodotti" : "Back to Products"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductPageClient;
