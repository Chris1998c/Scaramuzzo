"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  language: "it" | "en";
}

const Home: FC<HomeProps> = ({ language }) => {
  const translations = {
    it: {
      kicker: "Hair Natural Beauty",
      hero: "Prodotti botanici professionali per capelli, creati dal Metodo Scaramuzzo.",
      description:
        "Routine naturali, erbe riflessanti e trattamenti pensati per valorizzare ogni capello con l’esperienza dei nostri saloni.",
      ctaPrimary: "Scopri i prodotti",
      ctaSecondary: "Crea la tua routine",
    },
    en: {
      kicker: "Hair Natural Beauty",
      hero: "Professional botanical haircare, crafted by the Scaramuzzo Method.",
      description:
        "Natural routines, reflective herbs and treatments designed to enhance every hair type, backed by the experience of our salons.",
      ctaPrimary: "Discover the products",
      ctaSecondary: "Build your routine",
    },
  };

  const t = translations[language];

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      {/* IMMAGINE */}
      <Image
        src="/roma-salone-hero-wide.webp"
        alt="Scaramuzzo Hair Natural Beauty"
        fill
        priority
        sizes="100vw"
        className="object-cover brightness-[0.45]"
      />

      {/* OVERLAY per leggibilità + fusione con la pagina */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-black/30" />

      {/* CONTENUTO */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
          {t.kicker}
        </p>

        <h1 className="text-balance text-3xl font-bold leading-[1.12] drop-shadow-xl sm:text-4xl md:text-5xl lg:text-6xl">
          {t.hero}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 drop-shadow-md sm:text-lg">
          {t.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/products"
            className="w-full rounded-full bg-white px-8 py-3.5 text-center text-base font-semibold text-black shadow-lg transition hover:bg-neutral-200 sm:w-auto"
          >
            {t.ctaPrimary}
          </Link>

          <Link
            href="/erbe"
            className="w-full rounded-full border border-white/70 px-8 py-3.5 text-center text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
