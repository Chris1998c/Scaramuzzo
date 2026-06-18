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
      pathsKicker: "Scegli il tuo percorso",
      pathQuiz: "Prodotti Personalizzati",
      pathQuizHint: "Quiz e routine su misura",
      pathBce: "Botanical Color Experience",
      pathBceHint: "Valutazione colore professionale",
    },
    en: {
      kicker: "Hair Natural Beauty · since 1993",
      title: "Over thirty years of professional expertise in hair beauty",
      subtitle:
        "Scaramuzzo Hair Natural Beauty combines salon experience, personalized consultation, botanical research and professional products to create truly made-to-measure journeys.",
      ctaPrimary: "Discover the Scaramuzzo Method",
      ctaSecondary: "Personalized Products",
      pathsKicker: "Choose your journey",
      pathQuiz: "Personalized Products",
      pathQuizHint: "Quiz and made-to-measure routine",
      pathBce: "Botanical Color Experience",
      pathBceHint: "Professional color assessment",
    },
  }[language];

  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="container mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-14 md:py-24">
        {/* TESTO — primo su mobile per CTAs above the fold */}
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.kicker}
          </p>
          <h1 className="text-balance text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            {t.subtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">
            <Link
              href="#metodo"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
            >
              {t.ctaPrimary}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/erbe"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border/60 px-7 py-3.5 text-base font-semibold transition hover:border-accent/50 hover:bg-card/60 md:inline-flex"
            >
              {t.ctaSecondary}
            </Link>
          </div>

          {/* Scelta percorso — visibile subito su mobile */}
          <div className="mt-8 md:hidden">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {t.pathsKicker}
            </p>
            <div className="grid grid-cols-1 gap-3">
              <Link
                href="/erbe"
                className="flex items-center justify-between gap-3 rounded-2xl border border-accent/30 bg-card/60 px-5 py-4 shadow-sm transition active:scale-[0.99]"
              >
                <div>
                  <p className="font-semibold">{t.pathQuiz}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {t.pathQuizHint}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-accent" />
              </Link>
              <Link
                href="/diagnosi-botanica"
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/50 bg-background/40 px-5 py-4 transition active:scale-[0.99]"
              >
                <div>
                  <p className="font-semibold">{t.pathBce}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {t.pathBceHint}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-accent" />
              </Link>
            </div>
          </div>
        </div>

        {/* IMMAGINE EDITORIALE */}
        <div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-border/40 shadow-2xl max-md:max-h-[52vh] max-md:aspect-[3/4]">
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
