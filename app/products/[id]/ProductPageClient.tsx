"use client";

import { FC, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Product, productTranslations } from "../data";

type Language = "it" | "en";

interface Props {
  id: string;
}

const ProductPageClient: FC<Props> = ({ id }) => {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("it");
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language | null;
    if (storedLanguage === "it" || storedLanguage === "en") {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    const current = productTranslations[language].products.find(
      (p) => p.id === id
    );

    if (current) {
      setProduct(current);
      return;
    }

    // fallback: mappatura tra id IT/EN per le due lingue
    const otherLanguage: Language = language === "it" ? "en" : "it";
    const matching = productTranslations[otherLanguage].products.find(
      (p) => p.id === id
    );

    if (matching) {
      const corresponding = productTranslations[language].products.find(
        (p) =>
          (language === "it" &&
            p.id === "shampoo-riflessante-henne" &&
            matching.id === "reflective-henna-shampoo") ||
          (language === "it" &&
            p.id === "maschera-riflessante-henne" &&
            matching.id === "reflective-henna-mask") ||
          (language === "en" &&
            p.id === "reflective-henna-shampoo" &&
            matching.id === "shampoo-riflessante-henne") ||
          (language === "en" &&
            p.id === "reflective-henna-mask" &&
            matching.id === "maschera-riflessante-henne")
      );
      if (corresponding) {
        setProduct(corresponding);
        return;
      }
    }

    setProduct(null);
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
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO IMMAGINE + TITOLO */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain md:object-cover p-8 md:p-0"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {product.name}
          </h1>
          {product.heroTagline && (
            <p className="max-w-2xl text-sm md:text-lg text-white/90">
              {product.heroTagline}
            </p>
          )}
        </div>
      </div>

      {/* CONTENUTO PRODOTTO */}
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl space-y-10">
        {/* Descrizione + Benefici */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {isItalian ? "Descrizione" : "Description"}
            </h2>
            <p className="text-base leading-relaxed">
              {product.detailedDescription || product.description}
            </p>
          </div>

          {product.benefits && product.benefits.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isItalian ? "Benefici" : "Benefits"}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-base">
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modo d’uso */}
        {product.howToUse && (
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {isItalian ? "Modo d’uso" : "How to use"}
            </h2>
            <p className="text-base leading-relaxed">{product.howToUse}</p>
          </div>
        )}

        {/* Attivi principali */}
        {product.keyActives && (
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {isItalian ? "Principi attivi" : "Key actives"}
            </h2>
            <p className="text-base leading-relaxed">{product.keyActives}</p>
          </div>
        )}

        {/* INCI a scomparsa */}
        {product.inci && (
          <div>
            <details className="group border border-border rounded-lg px-4 py-3 bg-background/60">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold">
                <span>{isItalian ? "INCI completo" : "Full INCI"}</span>
                <span className="text-xs text-muted-foreground group-open:hidden">
                  {isItalian ? "Mostra" : "Show"}
                </span>
                <span className="text-xs text-muted-foreground hidden group-open:inline">
                  {isItalian ? "Nascondi" : "Hide"}
                </span>
              </summary>
              <div className="mt-3 text-sm leading-relaxed">
                <p>{product.inci}</p>
              </div>
            </details>
          </div>
        )}

        {/* Pulsante indietro */}
        <div>
          <Button onClick={handleBackClick}>
            {isItalian ? "Torna ai Prodotti" : "Back to Products"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPageClient;
