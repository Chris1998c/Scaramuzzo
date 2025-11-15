// app/products/page.tsx
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

export default function ProductsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") setLanguage(stored);
  }, []);

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
          image: "/sh-hennè.webp",
        },
        {
          id: "shampoo-emolliente",
          name: "Shampoo Emolliente",
          description:
            "Detersione delicata per cute sensibile e capelli secchi o fragili.",
          image: "/shampoo-emo.PNG",
        },
        {
          id: "shampoo-purificante-seboregolatore",
          name: "Shampoo Purificante Seboregolatore",
          description:
            "Azione riequilibrante per cute grassa e sebo in eccesso.",
          image: "/shampoo-purificante.PNG",
        },
        {
          id: "shampoo-energizzante",
          name: "Shampoo Energizzante – Stimolante",
          description:
            "Rosmarino e mentolo per cute fresca e capelli più forti.",
          image: "/sh-energizzante-nuova.PNG",
        },
        {
          id: "shampoo-rigenerante-bergamotto",
          name: "Shampoo Ristrutturante al Bergamotto",
          description: "Nutrimento e luce per capelli sensibilizzati.",
          image: "/shampoo-ristrutturante.PNG",
        },
        {
          id: "maschera-riflessante-henne",
          name: "Maschera Riflessante all’Henné",
          description:
            "Impacco illuminante per esaltare i riflessi naturali.",
          image: "/mask-hennè.PNG",
        },
        {
          id: "maschera-nutriente-oliva",
          name: "Maschera Nutriente all’Olio d’Oliva",
          description: "Capelli morbidi, elastici e nutriti in profondità.",
          image: "/mask-nutri.PNG",
        },
        {
          id: "maschera-ristrutturante-bergamotto",
          name: "Maschera Ristrutturante al Bergamotto",
          description: "Azione riparatrice intensa per capelli danneggiati.",
          image: "/mask-ristrutturante.PNG",
        },
        {
          id: "styling-cream-curl",
          name: "Styling Cream Curl",
          description:
            "Crema modellante idratante per ricci definiti e morbidi.",
          image: "/styling.PNG",
        },
        {
          id: "crema-mani-liquirizia",
          name: "Crema Mani alla Liquirizia",
          description: "Idratazione intensa e azione uniformante.",
          image: "/crema-mani.PNG",
        },
        {
          id: "lozione-anticaduta",
          name: "Lozione Intensiva Anticaduta",
          description: "Azione stimolante con peptidi ed estratti vegetali.",
          image: "/lozione.PNG",
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
        },
        {
          id: "shampoo-emolliente",
          name: "Soothing Emollient Shampoo",
          description: "Gentle cleanser for sensitive scalp and fragile hair.",
          image: "/shampoo-emo.PNG",
        },
        {
          id: "shampoo-purificante-seboregolatore",
          name: "Purifying Sebum-Regulating Shampoo",
          description: "Rebalancing action for oily scalp and excess sebum.",
          image: "/shampoo-purificante.PNG",
        },
        {
          id: "shampoo-energizzante",
          name: "Energizing Stimulating Shampoo",
          description: "Rosemary and menthol for stronger, refreshed hair.",
          image: "/sh-energizzante-nuova.PNG",
        },
        {
          id: "shampoo-rigenerante-bergamotto",
          name: "Regenerating Bergamot Shampoo",
          description: "Softness, shine and nourishment for treated hair.",
          image: "/shampoo-ristrutturante.PNG",
        },
        {
          id: "maschera-riflessante-henne",
          name: "Reflective Henna Mask",
          description:
            "Nourishing mask that enhances natural and cosmetic reflections.",
          image: "/mask-hennè.PNG",
        },
        {
          id: "maschera-nutriente-oliva",
          name: "Nourishing Olive Mask",
          description: "Deep hydration and intense nourishment.",
          image: "/mask-nutri.PNG",
        },
        {
          id: "maschera-ristrutturante-bergamotto",
          name: "Restructuring Bergamot Mask",
          description: "Repairing treatment for damaged hair.",
          image: "/mask-ristrutturante.PNG",
        },
        {
          id: "styling-cream-curl",
          name: "Styling Cream Curl",
          description: "Hydrating curl-defining cream.",
          image: "/styling.PNG",
        },
        {
          id: "crema-mani-liquirizia",
          name: "Licorice Hand Cream",
          description: "Softening and brightening daily hand treatment.",
          image: "/crema-mani.PNG",
        },
        {
          id: "lozione-anticaduta",
          name: "Intensive Anti-Hair Loss Lotion",
          description: "Stimulating lotion with plant peptides.",
          image: "/lozione.PNG",
        },
      ],
    },
  };

  const t = translations[language];

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

  const shampooProducts = t.products.filter((p) =>
    p.id.startsWith("shampoo-")
  );
  const maskProducts = t.products.filter((p) =>
    p.id.startsWith("maschera-")
  );
  const stylingProducts = t.products.filter((p) =>
    p.id.startsWith("styling-")
  );
  const treatmentProducts = t.products.filter((p) =>
    ["crema", "lozione"].some((kw) => p.id.includes(kw))
  );

  const shampooRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const stylingRef = useRef<HTMLDivElement | null>(null);
  const treatmentRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "prev" | "next"
  ) => {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const handleProductClick = (id: string) => router.push(`/products/${id}`);

  // Animazione super semplice: niente transition, niente ease → nessun errore TS
  const fadeInitial = { opacity: 0, y: 20 };
  const fadeWhileInView = { opacity: 1, y: 0 };

  const renderCards = (products: SimpleProduct[]) =>
    products.map((product) => (
      <motion.div
        key={product.id}
        initial={fadeInitial}
        whileInView={fadeWhileInView}
        viewport={{ once: true }}
      >
        <Card
          className="cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 bg-card/80 border border-border/60 rounded-2xl"
          onClick={() => handleProductClick(product.id)}
        >
          <div className="relative w-full h-64 sm:h-72 md:h-80">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain rounded-t-2xl p-6"
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
      </motion.div>
    ));

  const renderCategory = (
    key: CategoryKey,
    label: string,
    products: SimpleProduct[],
    scrollRef: React.RefObject<HTMLDivElement>
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
            className={`text-2xl leading-none transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ⌄
          </span>
        </button>

        {isOpen && (
          <div className="mt-5 space-y-6">
            {/* Carosello mobile */}
            <div className="relative sm:hidden -mx-4">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-thin"
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[260px] max-w-[280px] snap-start"
                  >
                    {renderCards([product])}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollCarousel(scrollRef, "prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-background/70 border border-border/70 shadow-lg backdrop-blur-sm"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(scrollRef, "next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-background/70 border border-border/70 shadow-lg backdrop-blur-sm"
              >
                ›
              </button>
            </div>

            {/* Griglia desktop/tablet */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCards(products)}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

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
          {renderCategory(
            "shampoo",
            labels[language].shampoo,
            shampooProducts,
            shampooRef
          )}
          {renderCategory(
            "maschere",
            labels[language].maschere,
            maskProducts,
            maskRef
          )}
          {renderCategory(
            "styling",
            labels[language].styling,
            stylingProducts,
            stylingRef
          )}
          {renderCategory(
            "trattamenti",
            labels[language].trattamenti,
            treatmentProducts,
            treatmentRef
          )}
        </div>
      </div>
    </section>
  );
}
