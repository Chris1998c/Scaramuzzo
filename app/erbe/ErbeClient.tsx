"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/components/site/LanguageProvider";
import { MessageCircle, Sparkles } from "lucide-react";
import ProductSection from "@/components/product/ProductSection";
import InfoCards from "@/components/product/InfoCards";
import QuizConfigurator from "./QuizConfigurator";


// Numero WhatsApp ufficiale (formato internazionale, solo cifre).
const WHATSAPP_NUMBER = "393470914731";

const copy = {
  it: {
    kicker: "Prodotti Personalizzati",
    heroTitle: "La tua routine capelli, su misura.",
    heroText:
      "Configura la tua routine in pochi passi con il Metodo Scaramuzzo, oppure parla direttamente con noi.",
    ctaStart: "Inizia il quiz",
    ctaTalk: "Parla con noi",
    pathKicker: "Due modi per iniziare",
    pathTitle: "Scegli il percorso più adatto a te",
    pathText:
      "Puoi configurare la tua routine in autonomia con il quiz, oppure affidarti a una consulenza personalizzata. In entrambi i casi partiamo dal tuo capello.",
    pathPoints: [
      { title: "Naturale", text: "Erbe botaniche, henné e formule rispettose della fibra." },
      { title: "Su misura", text: "Una routine costruita sul tuo capello, non standard." },
      { title: "Professionale", text: "La competenza dei saloni Scaramuzzo, vicina a te." },
    ],
    howKicker: "Come funziona",
    howTitle: "Quattro semplici passi",
    steps: [
      { n: "01", title: "Raccontaci", text: "Rispondi a 5 domande su capello, cute e obiettivo." },
      { n: "02", title: "Diagnosi", text: "Il motore Scaramuzzo elabora il tuo profilo." },
      { n: "03", title: "Routine", text: "Ricevi shampoo, maschera e trattamento su misura." },
      { n: "04", title: "Carrello", text: "Aggiungi tutto al carrello o invia la configurazione." },
    ],
    quizKicker: "Configuratore guidato",
    quizTitle: "Configura la tua routine",
    consultKicker: "Consulenza diretta",
    consultTitle: "Hai esigenze particolari?",
    consultText:
      "Parla con il Team Scaramuzzo e ricevi una consulenza professionale personalizzata per i tuoi capelli.",
    consultCta: "Scrivici su WhatsApp",
    bceKicker: "Esperienza professionale",
    bceTitle: "Scaramuzzo Botanical Color Experience",
    bceText:
      "Vuoi una valutazione approfondita del tuo profilo colore, dei capelli bianchi, della porosità e dello storico tecnico?",
    bceCta: "Inizia l’esperienza",
    finalTitle: "Pronto a iniziare il tuo percorso?",
    finalText: "Costruisci il tuo profilo e ricevi una routine pensata per te.",
    finalCta: "Inizia il quiz",
    waBase: "Ciao! Vorrei una consulenza per la mia routine capelli.",
  },
  en: {
    kicker: "Personalized Products",
    heroTitle: "Your hair routine, made to measure.",
    heroText:
      "Configure your routine in a few steps with the Scaramuzzo Method, or talk to us directly.",
    ctaStart: "Start the quiz",
    ctaTalk: "Talk to us",
    pathKicker: "Two ways to start",
    pathTitle: "Choose the path that suits you",
    pathText:
      "Configure your routine on your own with the quiz, or rely on a personalized consultation. Either way, we start from your hair.",
    pathPoints: [
      { title: "Natural", text: "Botanical herbs, henna and fiber-friendly formulas." },
      { title: "Tailored", text: "A routine built on your hair, never standard." },
      { title: "Professional", text: "The expertise of Scaramuzzo salons, close to you." },
    ],
    howKicker: "How it works",
    howTitle: "Four simple steps",
    steps: [
      { n: "01", title: "Tell us", text: "Answer 5 questions on hair, scalp and goal." },
      { n: "02", title: "Diagnosis", text: "The Scaramuzzo engine processes your profile." },
      { n: "03", title: "Routine", text: "Get a tailored shampoo, mask and treatment." },
      { n: "04", title: "Cart", text: "Add everything to cart or send your configuration." },
    ],
    quizKicker: "Guided configurator",
    quizTitle: "Configure your routine",
    consultKicker: "Direct consultation",
    consultTitle: "Have special needs?",
    consultText:
      "Talk with the Scaramuzzo team and receive a professional personalized consultation for your hair.",
    consultCta: "Message us on WhatsApp",
    bceKicker: "Professional experience",
    bceTitle: "Scaramuzzo Botanical Color Experience",
    bceText:
      "Want an in-depth assessment of your color profile, grey hair, porosity and technical history?",
    bceCta: "Start the experience",
    finalTitle: "Ready to start your journey?",
    finalText: "Build your profile and receive a routine designed for you.",
    finalCta: "Start the quiz",
    waBase: "Hi! I'd like a consultation for my hair routine.",
  },
} as const;

export default function ErbeClient() {
  const { language } = useLanguage();

  const t = copy[language];
  const waPlain = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t.waBase
  )}`;

  return (
    <div className="bg-background text-foreground">
      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <Image
          src="/ERBE.webp"
          alt="Prodotti Personalizzati Scaramuzzo"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/30" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            {t.kicker}
          </p>
          <h1 className="text-balance text-3xl font-bold leading-[1.12] drop-shadow-xl sm:text-4xl md:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 drop-shadow-md sm:text-lg">
            {t.heroText}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="#quiz"
              className="w-full rounded-full bg-white px-8 py-3.5 text-center text-base font-semibold text-black shadow-lg transition hover:bg-neutral-200 sm:w-auto"
            >
              {t.ctaStart}
            </Link>
            <a
              href={waPlain}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-white/70 px-8 py-3.5 text-center text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto"
            >
              {t.ctaTalk}
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4">
        {/* ===================== DUE PERCORSI ===================== */}
        <ProductSection
          kicker={t.pathKicker}
          title={t.pathTitle}
          className="!border-t-0"
        >
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.pathText}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {t.pathPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border/50 bg-card/50 p-6"
              >
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </ProductSection>

        {/* ===================== COME FUNZIONA ===================== */}
        <ProductSection kicker={t.howKicker} title={t.howTitle}>
          <InfoCards items={[...t.steps]} />
        </ProductSection>

        {/* ===================== PERCORSO A — QUIZ ===================== */}
        <ProductSection kicker={t.quizKicker} title={t.quizTitle}>
          <div id="quiz" className="scroll-mt-24">
            <div className="rounded-3xl border border-border/40 bg-card/30 p-6 sm:p-10">
              <QuizConfigurator
                language={language}
                whatsappNumber={WHATSAPP_NUMBER}
              />
            </div>
          </div>
        </ProductSection>

        {/* ===================== PERCORSO B — CONSULENZA ===================== */}
        <ProductSection kicker={t.consultKicker} title={t.consultTitle}>
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <Sparkles className="mt-1 h-6 w-6 shrink-0 text-accent" />
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                {t.consultText}
              </p>
            </div>
            <a
              href={waPlain}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" />
              {t.consultCta}
            </a>
          </div>
        </ProductSection>

        {/* ===================== BOTANICAL COLOR EXPERIENCE ===================== */}
        <ProductSection kicker={t.bceKicker} title={t.bceTitle}>
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <Sparkles className="mt-1 h-6 w-6 shrink-0 text-accent" />
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                {t.bceText}
              </p>
            </div>
            <Link
              href="/diagnosi-botanica"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
            >
              {t.bceCta}
            </Link>
          </div>
        </ProductSection>

        {/* ===================== CTA FINALE ===================== */}
        <section className="py-16 sm:py-20">
          <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 px-6 py-14 text-center shadow-lg sm:px-12">
            <h2 className="mx-auto max-w-2xl text-2xl font-bold sm:text-3xl">
              {t.finalTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.finalText}
            </p>
            <Link
              href="#quiz"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-md transition hover:bg-neutral-200"
            >
              {t.finalCta}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
