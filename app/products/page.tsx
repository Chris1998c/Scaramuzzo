"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "./data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/lib/store/cartStore";

// 🔥 import prodotti REALI da data.ts
import { productTranslations } from "./data";

type Language = "it" | "en";

export default function ProductsPage() {
  const router = useRouter();
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);

  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored) setLanguage(stored);
  }, []);

  const t = productTranslations[language];
  const products = t.products;

  // ============================================================
  // CATEGORIE AUTOMATICHE
  // ============================================================
  const shampoo = products.filter((p) => p.id.startsWith("shampoo"));
  const masks = products.filter((p) => p.id.startsWith("maschera"));
  const styling = products.filter((p) => p.id.startsWith("styling"));
  const treatments = products.filter((p) =>
    ["crema", "lozione"].some((k) => p.id.includes(k))
  );

  const fadeInitial = { opacity: 0, y: 20 };
  const fadeAnim = { opacity: 1, y: 0 };

  // ============================================================
  // CARD PRODOTTO PREMIUM
  // ============================================================
  const renderCard = (p: Product) => (
    <motion.div
      key={p.id}
      initial={fadeInitial}
      whileInView={fadeAnim}
      viewport={{ once: true }}
    >
      <Card className="bg-[#1b0d08] border border-neutral-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden">

        {/* IMMAGINE */}
        <div
          className="relative w-full h-72 cursor-pointer"
          onClick={() => router.push(`/products/${p.id}`)}
        >
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-contain p-4"
          />
        </div>

        {/* INFO */}
        <CardHeader>
          <CardTitle className="text-neutral-100 text-lg">
            {p.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <CardDescription className="text-neutral-300 text-sm">
            {p.description}
          </CardDescription>

          <p className="text-neutral-100 font-semibold text-lg">
            € {p.price.toFixed(2)}
          </p>

          <button
            onClick={() => {
              addToCart({
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.image,
              });
              openCart();
            }}
            className="w-full py-2.5 bg-black rounded-xl text-white font-semibold hover:bg-neutral-900 transition"
          >
            Aggiungi al carrello
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );

  // ============================================================
  // BLOCCO SEZIONE (STILE APPLE)
  // ============================================================
  const Section = ({
    title,
    items,
  }: {
    title: string;
    items: Product[];
  }) => {
    if (items.length === 0) return null;

    return (
      <motion.div
        initial={fadeInitial}
        whileInView={fadeAnim}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-neutral-100 mb-4">
          {title}
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => renderCard(p))}
        </div>
      </motion.div>
    );
  };

  // ============================================================
  // RENDER FINALE
  // ============================================================
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 space-y-20">

        {/* TITOLO */}
        <motion.h2
          initial={fadeInitial}
          whileInView={fadeAnim}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center text-neutral-100"
        >
         {language === "it" ? "I Nostri Prodotti" : "Our Products"}
        </motion.h2>

        {/* SEZIONI */}
        <Section title="Shampoo" items={shampoo} />
        <Section title="Maschere" items={masks} />
        <Section title="Styling" items={styling} />
        <Section title="Trattamenti" items={treatments} />

      </div>
    </section>
  );
}
