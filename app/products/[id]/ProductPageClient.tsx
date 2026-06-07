"use client";

import { FC, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Product, productTranslations } from "../data";
import { useCartStore } from "@/lib/store/cartStore";
import ProductSection from "@/components/product/ProductSection";
import FeatureList from "@/components/product/FeatureList";
import Steps from "@/components/product/Steps";
import InfoCards from "@/components/product/InfoCards";
import Faq from "@/components/product/Faq";
import RelatedProducts from "@/components/product/RelatedProducts";

interface ProductPageClientProps {
  id: string;
}

type Lang = "it" | "en";
type Category = "shampoo" | "mask" | "styling" | "treatment" | "other";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Copy statico bilingue (le sezioni "audience", "metodo" e "faq" non sono nei dati prodotto)
const ui = {
  it: {
    detailsKicker: "Panoramica",
    detailsTitle: "Dettagli prodotto",
    benefitsKicker: "Perché sceglierlo",
    benefitsTitle: "Benefici principali",
    audienceKicker: "Adatto a te",
    audienceTitle: "Per chi è indicato",
    howToKicker: "Applicazione",
    howToTitle: "Come si usa",
    ingredientsKicker: "Formula",
    ingredientsTitle: "Ingredienti chiave",
    inciLabel: "INCI completo",
    methodKicker: "Il nostro approccio",
    methodTitle: "Il Metodo Scaramuzzo",
    faqKicker: "Domande frequenti",
    faqTitle: "FAQ",
    relatedKicker: "Continua la cura",
    relatedTitle: "Completa la tua routine",
    addToCart: "Aggiungi al carrello",
    added: "Aggiunto ✔",
    back: "Torna ai Prodotti",
    shipping: "Spedizione gratuita sopra 49€",
    audience: {
      shampoo:
        "Indicato per chi desidera una detersione delicata e una routine quotidiana professionale.",
      mask: "Pensata per chi vuole nutrire, ristrutturare e dare luce alle lunghezze.",
      styling:
        "Per chi cerca tenuta naturale e definizione, senza appesantire il capello.",
      treatment:
        "Per chi vuole un trattamento mirato e risultati visibili nel tempo.",
      other:
        "Pensato per chi cerca un prodotto professionale, naturale e rispettoso del capello.",
    },
    method: [
      { n: "01", title: "Diagnosi", text: "Analizziamo capello, cute e abitudini per capire il punto di partenza." },
      { n: "02", title: "Botanica", text: "Erbe riflessanti, henné e oli selezionati dal nostro laboratorio." },
      { n: "03", title: "Routine", text: "Prodotti professionali combinati in una routine su misura." },
      { n: "04", title: "Consulenza", text: "L’esperienza dei nostri saloni, vicina a te in ogni passo." },
    ],
    faq: [
      { q: "Posso usarlo frequentemente?", a: "Sì, la formula è pensata per un uso regolare nella tua routine. Segui le indicazioni d’uso per i migliori risultati." },
      { q: "È adatto a capelli trattati o sensibilizzati?", a: "Le nostre formule botaniche sono delicate e rispettano la fibra: pensate anche per capelli trattati." },
      { q: "Quando vedrò i primi risultati?", a: "Molti benefici sono percepibili fin dal primo utilizzo e migliorano con l’uso costante nel tempo." },
      { q: "Come si abbina agli altri prodotti?", a: "Fa parte del Metodo Scaramuzzo: puoi combinarlo con gli altri prodotti della linea per una routine completa." },
    ],
  },
  en: {
    detailsKicker: "Overview",
    detailsTitle: "Product details",
    benefitsKicker: "Why choose it",
    benefitsTitle: "Key benefits",
    audienceKicker: "Made for you",
    audienceTitle: "Who it's for",
    howToKicker: "Application",
    howToTitle: "How to use",
    ingredientsKicker: "Formula",
    ingredientsTitle: "Key ingredients",
    inciLabel: "Full INCI",
    methodKicker: "Our approach",
    methodTitle: "The Scaramuzzo Method",
    faqKicker: "Frequently asked",
    faqTitle: "FAQ",
    relatedKicker: "Keep up the care",
    relatedTitle: "Complete your routine",
    addToCart: "Add to cart",
    added: "Added ✔",
    back: "Back to Products",
    shipping: "Free shipping over €49",
    audience: {
      shampoo:
        "Ideal for those seeking gentle cleansing and a professional daily routine.",
      mask: "Designed for those who want to nourish, restructure and add shine to lengths.",
      styling:
        "For those looking for natural hold and definition, without weighing hair down.",
      treatment:
        "For those who want a targeted treatment with results that build over time.",
      other:
        "For those looking for a professional, natural product that respects the hair.",
    },
    method: [
      { n: "01", title: "Diagnosis", text: "We analyse hair, scalp and habits to understand your starting point." },
      { n: "02", title: "Botanicals", text: "Reflective herbs, henna and oils selected by our laboratory." },
      { n: "03", title: "Routine", text: "Professional products combined into a made-to-measure routine." },
      { n: "04", title: "Consultation", text: "The experience of our salons, close to you every step of the way." },
    ],
    faq: [
      { q: "Can I use it frequently?", a: "Yes, the formula is designed for regular use in your routine. Follow the usage instructions for best results." },
      { q: "Is it suitable for treated or sensitised hair?", a: "Our botanical formulas are gentle and respect the fiber: suitable for treated hair too." },
      { q: "When will I see the first results?", a: "Many benefits are noticeable from the first use and improve with consistent use over time." },
      { q: "How does it pair with other products?", a: "It's part of the Scaramuzzo Method: combine it with the rest of the line for a complete routine." },
    ],
  },
} as const;

const getCategory = (id: string): Category => {
  if (id.startsWith("shampoo")) return "shampoo";
  if (id.startsWith("maschera")) return "mask";
  if (id.startsWith("styling")) return "styling";
  if (["crema", "lozione"].some((k) => id.includes(k))) return "treatment";
  return "other";
};

// Trasforma una frase d'uso in passaggi numerati
const toSteps = (text: string): string[] =>
  text
    .split(/[,.]\s+/)
    .map((s) => s.trim().replace(/[.;]+$/, ""))
    .filter((s) => s.length > 1)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1));

const ProductPageClient: FC<ProductPageClientProps> = ({ id }) => {
  const router = useRouter();
  const [language, setLanguage] = useState<Lang>("it");
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);

  // Zustand → addItem
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);

  // LINGUA
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Lang | null;
    if (storedLanguage) setLanguage(storedLanguage);
  }, []);

  // CARICA PRODOTTO
  useEffect(() => {
    const result = productTranslations[language].products.find(
      (p) => p.id === id
    );
    setProduct(result || null);
  }, [id, language]);

  // BACK
  const handleBackClick = useCallback(() => {
    router.push("/products");
  }, [router]);

  // AGGIUNGI AL CARRELLO — VERSIONE ZUSTAND (logica invariata)
  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const t = ui[language];
  const category = getCategory(product.id);

  // CROSS-SELL: stessa categoria, poi completa con altri
  const all = productTranslations[language].products;
  const sameCategory = all.filter(
    (p) => p.id !== product.id && getCategory(p.id) === category
  );
  const others = all.filter(
    (p) => p.id !== product.id && getCategory(p.id) !== category
  );
  const related = [...sameCategory, ...others].slice(0, 3);

  const howToSteps = product.howToUse ? toSteps(product.howToUse) : [];

  return (
    <section className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* ===================== HERO ===================== */}
        <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
          {/* IMMAGINE */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            className="relative w-full md:sticky md:top-24"
          >
            <div className="group relative mx-auto aspect-[3/4] w-full max-w-xl overflow-hidden rounded-3xl border border-border/40 bg-secondary/10 shadow-lg">
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

          {/* TESTO */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {product.name}
            </h1>

            {product.heroTagline && (
              <p className="text-lg text-accent">{product.heroTagline}</p>
            )}

            <p className="text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* PREZZO */}
            <p className="text-3xl font-semibold">
              € {product.price.toFixed(2)}
            </p>

            {/* CTA */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full rounded-full bg-white py-4 text-lg font-semibold text-black transition hover:bg-neutral-200"
              >
                {added ? t.added : t.addToCart}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                {t.shipping}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ===================== DETTAGLI ===================== */}
        {product.detailedDescription && (
          <ProductSection kicker={t.detailsKicker} title={t.detailsTitle}>
            <p className="max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted-foreground">
              {product.detailedDescription}
            </p>
          </ProductSection>
        )}

        {/* ===================== BENEFICI ===================== */}
        {product.benefits?.length > 0 && (
          <ProductSection kicker={t.benefitsKicker} title={t.benefitsTitle}>
            <FeatureList items={product.benefits} />
          </ProductSection>
        )}

        {/* ===================== PER CHI È INDICATO ===================== */}
        <ProductSection kicker={t.audienceKicker} title={t.audienceTitle}>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.audience[category]}
          </p>
        </ProductSection>

        {/* ===================== COME SI USA ===================== */}
        {howToSteps.length > 0 && (
          <ProductSection kicker={t.howToKicker} title={t.howToTitle}>
            <div className="max-w-2xl">
              <Steps steps={howToSteps} />
            </div>
          </ProductSection>
        )}

        {/* ===================== INGREDIENTI CHIAVE ===================== */}
        {(product.keyActives || product.inci) && (
          <ProductSection
            kicker={t.ingredientsKicker}
            title={t.ingredientsTitle}
          >
            {product.keyActives && (
              <p className="max-w-3xl text-base leading-relaxed text-foreground/90">
                {product.keyActives}
              </p>
            )}

            {product.inci && (
              <details className="mt-5 max-w-3xl rounded-2xl border border-border/40 bg-card/40 p-5">
                <summary className="cursor-pointer text-sm font-semibold">
                  {t.inciLabel}
                </summary>
                <p className="mt-3 whitespace-pre-line font-mono text-xs leading-relaxed text-muted-foreground">
                  {product.inci}
                </p>
              </details>
            )}
          </ProductSection>
        )}

        {/* ===================== METODO SCARAMUZZO ===================== */}
        <ProductSection kicker={t.methodKicker} title={t.methodTitle}>
          <InfoCards items={[...t.method]} />
        </ProductSection>

        {/* ===================== FAQ ===================== */}
        <ProductSection kicker={t.faqKicker} title={t.faqTitle}>
          <div className="max-w-3xl">
            <Faq items={[...t.faq]} />
          </div>
        </ProductSection>

        {/* ===================== CROSS-SELL ===================== */}
        <ProductSection kicker={t.relatedKicker} title={t.relatedTitle}>
          <RelatedProducts products={related} />
        </ProductSection>

        {/* BACK */}
        <div className="border-t border-border/40 py-10">
          <Button
            onClick={handleBackClick}
            className="rounded-full bg-accent px-6 py-2 text-sm text-accent-foreground shadow-md hover:opacity-90"
          >
            {t.back}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductPageClient;
