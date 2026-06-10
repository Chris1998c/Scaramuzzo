"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HomeProps {
  language: "it" | "en";
}

const Home: FC<HomeProps> = ({ language }) => {
  const t = {
    it: {
      kicker: "Hair Natural Beauty · dal 1993",
      title:
        "Oltre trent’anni di esperienza professionale nella bellezza dei capelli",
      subtitle:
        "Scaramuzzo Hair Natural Beauty unisce esperienza di salone, consulenza personalizzata, ricerca botanica e prodotti professionali per creare percorsi realmente su misura.",
      ctaPrimary: "Scopri il Metodo Scaramuzzo",
      ctaSecondary: "Prodotti Personalizzati",
    },
    en: {
      kicker: "Hair Natural Beauty · since 1993",
      title: "Over thirty years of professional expertise in hair beauty",
      subtitle:
        "Scaramuzzo Hair Natural Beauty combines salon experience, personalized consultation, botanical research and professional products to create truly made-to-measure journeys.",
      ctaPrimary: "Discover the Scaramuzzo Method",
      ctaSecondary: "Personalized Products",
    },
  }[language];

  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-14 md:py-24">
        {/* TESTO */}
        <div className="order-2 md:order-1">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.kicker}
          </p>
          <h1 className="text-balance text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="#metodo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
            >
              {t.ctaPrimary}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/erbe"
              className="inline-flex items-center justify-center rounded-full border border-border/60 px-7 py-3.5 text-base font-semibold transition hover:border-accent/50 hover:bg-card/60"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* IMMAGINE EDITORIALE */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-border/40 shadow-2xl">
            <Image
              src="/TaglioNew.webp"
              alt="Scaramuzzo Hair Natural Beauty — esperienza di salone e Metodo Scaramuzzo"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 480px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
