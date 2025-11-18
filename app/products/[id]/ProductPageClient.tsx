"use client";

import { FC, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Product, productTranslations } from "../data";

interface ProductPageClientProps {
  id: string;
}

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProductPageClient: FC<ProductPageClientProps> = ({ id }) => {
  const router = useRouter();
  const [language, setLanguage] = useState<"it" | "en">("it");
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as "it" | "en" | null;
    if (storedLanguage) setLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    const result = productTranslations[language].products.find(
      (p) => p.id === id
    );
    setProduct(result || null);
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
    <section className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          className="relative w-full h-full md:sticky md:top-24"
        >
          <div className="relative w-full aspect-[3/4] max-w-xl mx-auto rounded-3xl bg-secondary/10 border border-border/40 shadow-lg overflow-hidden group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width:768px) 90vw, 600px"
              className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          className="space-y-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {product.name}
          </h1>

          {product.heroTagline && (
            <p className="text-lg text-primary mb-4">{product.heroTagline}</p>
          )}

          <p className="text-base text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6 pt-6 border-t border-border/40">
            {product.detailedDescription && (
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {isItalian ? "Dettagli prodotto" : "Product details"}
                </h2>
                <p className="text-base leading-relaxed whitespace-pre-line">
                  {product.detailedDescription}
                </p>
              </div>
            )}

            {product.benefits?.length > 0 && (
              <details className="border border-border/40 rounded-xl p-5 bg-background/50 shadow-sm">
                <summary className="cursor-pointer text-lg font-semibold">
                  {isItalian ? "Punti di forza" : "Key benefits"}
                </summary>
                <ul className="mt-3 list-disc list-inside text-base space-y-1">
                  {product.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </details>
            )}

            {product.howToUse && (
              <details className="border border-border/40 rounded-xl p-5 bg-background/50 shadow-sm">
                <summary className="cursor-pointer text-lg font-semibold">
                  {isItalian ? "Modo d’uso" : "How to use"}
                </summary>
                <p className="mt-3 text-base whitespace-pre-line">
                  {product.howToUse}
                </p>
              </details>
            )}

            {product.keyActives && (
              <details className="border border-border/40 rounded-xl p-5 bg-background/50 shadow-sm">
                <summary className="cursor-pointer text-lg font-semibold">
                  {isItalian ? "Principi attivi" : "Key ingredients"}
                </summary>
                <p className="mt-3 text-base whitespace-pre-line">
                  {product.keyActives}
                </p>
              </details>
            )}

            {product.inci && (
              <details className="border border-border/40 rounded-xl p-5 bg-background/50 shadow-sm">
                <summary className="cursor-pointer text-lg font-semibold">
                  INCI
                </summary>
                <p className="mt-3 text-xs md:text-sm font-mono whitespace-pre-line">
                  {product.inci}
                </p>
              </details>
            )}
          </div>

          <Button
            onClick={handleBackClick}
            className="mt-4 px-6 py-2 rounded-xl text-sm shadow-md bg-accent hover:bg-accent/80"
          >
            {isItalian ? "Torna ai Prodotti" : "Back to Products"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPageClient;
