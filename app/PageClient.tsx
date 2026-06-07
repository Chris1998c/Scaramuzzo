"use client";

import HomeHero from "@/app/components/Home";
import About from "@/app/components/About";
import Contact from "@/app/contact/ContactClient"; // ✅ sta in app/contact
import { useEffect, useState } from "react";
import Link from "next/link";
import { Leaf, UserCheck, ShieldCheck, Truck } from "lucide-react";

type Language = "it" | "en";

const copy = {
  it: {
    trust: [
      { icon: Leaf, label: "Uso professionale in salone" },
      { icon: UserCheck, label: "Consulenza personalizzata" },
      { icon: ShieldCheck, label: "Pagamenti sicuri" },
      { icon: Truck, label: "Spedizione gratuita sopra 49€" },
    ],
    method: {
      kicker: "Il nostro approccio",
      title: "Il Metodo Scaramuzzo",
      subtitle:
        "Un percorso preciso che unisce tecnica di salone, botanica e cura su misura.",
      steps: [
        {
          n: "01",
          title: "Diagnosi",
          text: "Analizziamo capello, cute e abitudini per capire il punto di partenza.",
        },
        {
          n: "02",
          title: "Botanica",
          text: "Erbe riflessanti, henné e oli selezionati dal nostro laboratorio.",
        },
        {
          n: "03",
          title: "Routine",
          text: "Prodotti professionali combinati in una routine su misura.",
        },
        {
          n: "04",
          title: "Consulenza",
          text: "L’esperienza dei nostri saloni, vicina a te in ogni passo.",
        },
      ],
    },
    teaser: {
      title: "Non sai quale prodotto scegliere?",
      text: "Rispondi a poche domande e scopri la routine più adatta ai tuoi capelli.",
      cta: "Inizia il percorso",
    },
  },
  en: {
    trust: [
      { icon: Leaf, label: "Professional salon use" },
      { icon: UserCheck, label: "Personalized consultation" },
      { icon: ShieldCheck, label: "Secure payments" },
      { icon: Truck, label: "Free shipping over €49" },
    ],
    method: {
      kicker: "Our approach",
      title: "The Scaramuzzo Method",
      subtitle:
        "A precise journey blending salon technique, botanicals and tailored care.",
      steps: [
        {
          n: "01",
          title: "Diagnosis",
          text: "We analyse hair, scalp and habits to understand your starting point.",
        },
        {
          n: "02",
          title: "Botanicals",
          text: "Reflective herbs, henna and oils selected by our laboratory.",
        },
        {
          n: "03",
          title: "Routine",
          text: "Professional products combined into a made-to-measure routine.",
        },
        {
          n: "04",
          title: "Consultation",
          text: "The experience of our salons, close to you every step of the way.",
        },
      ],
    },
    teaser: {
      title: "Not sure which product to choose?",
      text: "Answer a few questions and discover the routine best suited to your hair.",
      cta: "Start the journey",
    },
  },
};

export default function PageClient() {
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  const t = copy[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <HomeHero language={language} />

      {/* TRUST STRIP */}
      <section className="border-y border-border/40 bg-card/40">
        <div className="container mx-auto px-4 py-6">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
            {t.trust.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-3 text-center"
              >
                <Icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium text-muted-foreground">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* METODO SCARAMUZZO */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.method.kicker}
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">{t.method.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t.method.subtitle}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.method.steps.map((step) => (
              <div
                key={step.n}
                className="group rounded-2xl border border-border/50 bg-card/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
              >
                <span className="text-sm font-semibold tracking-widest text-accent">
                  {step.n}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEASER PRODOTTI PERSONALIZZATI */}
      <section className="pb-20 sm:pb-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 px-6 py-14 text-center shadow-lg sm:px-12">
            <h2 className="mx-auto max-w-2xl text-2xl font-bold sm:text-3xl">
              {t.teaser.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.teaser.text}
            </p>
            <Link
              href="/erbe"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
            >
              {t.teaser.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* About prende la lingua come prop */}
      <About language={language} />

      {/* Contact usa già il suo stato interno, quindi NIENTE props */}
      <Contact />
    </div>
  );
}
