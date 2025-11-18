"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Language = "it" | "en";

interface SimpleProduct {
  id: string;
  name: string;
  description: string;
  image: string;
}

// -------------------------------------------
// PAGINA PRODOTTI (APPLE STYLE)
// -------------------------------------------
export default function ProductsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") setLanguage(stored);
  }, []);

  // -------------------------------------------
  // DATI BASE (LISTA RIDOTTA)
  // -------------------------------------------
  const translations: Record<
    Language,
    { title: string; products: SimpleProduct[] }
  > = {
    it: {
      title: "I Nostri Prodotti",
      products: [
        {
          id: "shampoo-riflessante-henne",
          name: "Shampoo Riflessante all’Henné",
          description:
            "Shampoo ristrutturante con estratto di henné per riflessi luminosi.",
          image: "/shampoo-hennè-nuovo.webp",
        },
        {
          id: "shampoo-emolliente",
          name: "Shampoo Emolliente",
          description:
            "Detersione delicata per cute sensibile e capelli secchi o fragili.",
          image: "/shampoo-emo-nuovo.webp",
        },
        {
          id: "shampoo-purificante-seboregolatore",
          name: "Shampoo Purificante Seboregolatore",
          description:
            "Azione riequilibrante per cute grassa e sebo in eccesso.",
          image: "/shampoo-purificante-nuovo.webp",
        },
        {
          id: "shampoo-energizzante",
          name: "Shampoo Energizzante – Stimolante",
          description:
            "Rosmarino e mentolo per cute fresca e capelli più forti.",
          image: "/sh-energizzante-nuovo.webp",
        },
        {
          id: "shampoo-rigenerante-bergamotto",
          name: "Shampoo Ristrutturante al Bergamotto",
          description: "Nutrimento e luce per capelli sensibilizzati.",
          image: "/shampoo-ristrutturante-nuovo.webp",
        },
        {
          id: "maschera-riflessante-henne",
          name: "Maschera Riflessante all’Henné",
          description: "Impacco illuminante per esaltare i riflessi naturali.",
          image: "/mask-hennè-nuovo.webp",
        },
        {
          id: "maschera-nutriente-oliva",
          name: "Maschera Nutriente all’Olio d’Oliva",
          description: "Capelli morbidi, elastici e nutriti in profondità.",
          image: "/mask-nutri-nuovo.webp",
        },
        {
          id: "maschera-ristrutturante-bergamotto",
          name: "Maschera Ristrutturante",
          description: "Azione riparatrice intensa per capelli danneggiati.",
          image: "/mask-ristrutturante-nuovo.webp",
        },
        {
          id: "styling-cream-curl",
          name: "Styling Cream Curl",
          description:
            "Crema modellante idratante per ricci definiti e morbidi.",
          image: "/styling-nuovo.webp",
        },
        {
          id: "crema-mani-liquirizia",
          name: "Crema Mani alla Liquirizia",
          description: "Idratazione intensa e azione uniformante.",
          image: "/crema-mani-nuovo.webp",
        },
        {
          id: "lozione-anticaduta",
          name: "Lozione Intensiva Anticaduta",
          description: "Azione stimolante con peptidi ed estratti vegetali.",
          image: "/lozione-nuovo.webp",
        },
      ],
    },
    en: {
      title: "Our Products",
      products: [],
    },
  };

  const t = translations[language];

  // -------------------------------------------
  // CATEGORIE
  // -------------------------------------------
  type CategoryKey = "shampoo" | "maschere" | "styling" | "trattamenti";
  const [openCategory, setOpenCategory] = useState<CategoryKey>("shampoo");

  const labels: Record<Language, Record<CategoryKey, string>> = {
    it: {
      shampoo: "Shampoo",
      maschere: "Maschere",
      styling: "Styling",
      trattamenti: "Trattamenti",
    },
    en: {
      shampoo: "Shampoos",
      maschere: "Masks",
      styling: "Styling",
      trattamenti: "Treatments",
    },
  };

  const shampooProducts = t.products.filter((p) => p.id.startsWith("shampoo-"));
  const maskProducts = t.products.filter((p) => p.id.startsWith("maschera-"));
  const stylingProducts = t.products.filter((p) =>
    p.id.startsWith("styling-")
  );
  const treatmentProducts = t.products.filter((p) =>
    ["crema", "lozione"].some((k) => p.id.includes(k))
  );

  // -------------------------------------------
  // SCROLL REFS PER CAROSELLO
  // -------------------------------------------
  const shampooRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const stylingRef = useRef<HTMLDivElement | null>(null);
  const treatmentRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (
    ref: React.RefObject<HTMLDivElement>,
    dir: "next" | "prev"
  ) => {
    if (!ref.current) return;
    const step = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({
      left: dir === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  const fadeInitial = { opacity: 0, y: 20 };
  const fadeWhileInView = { opacity: 1, y: 0 };

  const handleClick = (id: string) => router.push(`/products/${id}`);

  // -------------------------------------------
  // CARD PRODOTTO
  // -------------------------------------------
  const renderCards = (list: SimpleProduct[]) =>
    list.map((p) => (
      <motion.div
        key={p.id}
        initial={fadeInitial}
        whileInView={fadeWhileInView}
        viewport={{ once: true }}
      >
        <Card
          onClick={() => handleClick(p.id)}
          className="cursor-pointer hover:-translate-y-[4px] hover:shadow-2xl transition-all duration-300 bg-card/80 border border-border/60 rounded-2xl"
        >
          <div className="relative w-full h-80 sm:h-96 md:h-[420px]">
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-contain rounded-t-2xl p-2"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">{p.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm md:text-base">
              {p.description}
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    ));

  // -------------------------------------------
  // RENDER CATEGORIA (Accordion)
  // -------------------------------------------
  const renderCategory = (
    key: CategoryKey,
    label: string,
    products: SimpleProduct[],
    ref: React.RefObject<HTMLDivElement>
  ) => {
    if (products.length === 0) return null;

    const isOpen = openCategory === key;

    return (
      <motion.div
        initial={fadeInitial}
        whileInView={fadeWhileInView}
        viewport={{ once: true }}
        className="border rounded-2xl p-4 sm:p-6 shadow-md bg-card/40 backdrop-blur"
      >
        <button
          type="button"
          onClick={() => setOpenCategory(key)}
          className="w-full flex items-center justify-between gap-4"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-left">
            {label}
          </h3>

          <span
            className={`text-2xl transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ⌄
          </span>
        </button>

        {isOpen && (
          <div className="mt-5 space-y-6">
            {/* CAROSELLO MOBILE */}
            <div className="relative sm:hidden -mx-4">
              <div
                ref={ref}
                className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-thin"
              >
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="min-w-[260px] max-w-[280px] snap-start"
                  >
                    {renderCards([p])}
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollCarousel(ref, "prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-background/70 border border-border/70 shadow-lg backdrop-blur-sm"
              >
                ‹
              </button>
              <button
                onClick={() => scrollCarousel(ref, "next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-background/70 border border-border/70 shadow-lg backdrop-blur-sm"
              >
                ›
              </button>
            </div>

            {/* GRIGLIA DESKTOP */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCards(products)}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  // -------------------------------------------
  // RENDER FINALE
  // -------------------------------------------
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={fadeInitial}
          whileInView={fadeWhileInView}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          {t.title}
        </motion.h2>

        <div className="space-y-10">
          {renderCategory("shampoo", labels[language].shampoo, shampooProducts, shampooRef)}
          {renderCategory("maschere", labels[language].maschere, maskProducts, maskRef)}
          {renderCategory("styling", labels[language].styling, stylingProducts, stylingRef)}
          {renderCategory("trattamenti", labels[language].trattamenti, treatmentProducts, treatmentRef)}
        </div>
      </div>
    </section>
  );
}
