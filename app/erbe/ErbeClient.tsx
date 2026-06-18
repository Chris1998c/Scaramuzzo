"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/components/site/LanguageProvider";
import { MessageCircle, Sparkles, Layers, Wind, Target, Check } from "lucide-react";
import ProductSection from "@/components/product/ProductSection";
import InfoCards from "@/components/product/InfoCards";
import QuizConfigurator from "./QuizConfigurator";


// Numero WhatsApp ufficiale (formato internazionale, solo cifre).
const WHATSAPP_NUMBER = "393895817411";

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
    trustKicker: "Perché personalizzare",
    trustTitle: "Perché una routine personalizzata?",
    trustText:
      "Ogni capello ha esigenze diverse: cute, fibra, stile di vita e obiettivo finale cambiano il modo in cui un prodotto dovrebbe essere scelto.",
    trustCards: [
      {
        icon: Layers,
        title: "Cute e lunghezze non hanno sempre lo stesso bisogno",
        text: "Una routine efficace distingue le zone del capello e le tratta in modo coerente con il profilo rilevato.",
      },
      {
        icon: Wind,
        title: "La profumazione deve accompagnare, non coprire",
        text: "Intensità e carattere olfattivo si scelgono sul gusto personale, senza sovrastare l’esperienza di cura.",
      },
      {
        icon: Target,
        title: "Il prodotto giusto nasce dal profilo, non dal caso",
        text: "Partiamo dalle tue risposte: se la routine pronta non è adatta, ti indirizziamo verso una valutazione su misura.",
      },
    ],
    quizKicker: "Configuratore guidato",
    quizTitle: "Configura la tua routine",
    quizMicrocopy:
      "Rispondi a poche domande: se la routine pronta non è adatta, ti proporremo una valutazione personalizzata.",
    processKicker: "Processo professionale",
    processTitle: "Cosa succede dopo il quiz?",
    processText:
      "Dopo l’invio, il team tecnico Scaramuzzo analizza il profilo dei tuoi capelli e valuta se consigliarti una routine pronta o una soluzione personalizzata preparata dal nostro laboratorio.",
    processSteps: [
      "Compili il profilo",
      "Il team Scaramuzzo valuta le tue esigenze",
      "Ricevi una routine o una proposta personalizzata",
      "Se necessario, vieni contattata su WhatsApp",
    ],
    consultBandTitle: "Una consulenza prima del prodotto",
    consultBandText:
      "Ogni capello è diverso. Per questo motivo il Team Scaramuzzo valuta il profilo prima di consigliare una routine pronta o una soluzione personalizzata.",
    consultBandPoints: [
      "Profilo capelli",
      "Valutazione professionale",
      "Routine consigliata",
    ],
    consultBandMicrocopy:
      "Non riceverai consigli generici. Ogni richiesta viene valutata dal Team Scaramuzzo.",
    labLink:
      "Formule e prodotti personalizzati nascono dal laboratorio cosmetico Scaramuzzo.",
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
    trustKicker: "Why personalize",
    trustTitle: "Why a personalized routine?",
    trustText:
      "Every head of hair has different needs: scalp, fiber, lifestyle and final goal all change how a product should be chosen.",
    trustCards: [
      {
        icon: Layers,
        title: "Scalp and lengths don't always need the same care",
        text: "An effective routine distinguishes hair zones and treats them in line with the profile detected.",
      },
      {
        icon: Wind,
        title: "Fragrance should accompany, not overpower",
        text: "Intensity and olfactory character are chosen to your taste, without overshadowing the care experience.",
      },
      {
        icon: Target,
        title: "The right product comes from your profile, not chance",
        text: "We start from your answers: if a ready-made routine isn't suitable, we guide you toward a tailored assessment.",
      },
    ],
    quizKicker: "Guided configurator",
    quizTitle: "Configure your routine",
    quizMicrocopy:
      "Answer a few questions: if a ready-made routine isn't right for you, we'll suggest a personalized assessment.",
    processKicker: "Professional process",
    processTitle: "What happens after the quiz?",
    processText:
      "After submission, the Scaramuzzo technical team reviews your hair profile and assesses whether to recommend a ready-made routine or a personalized solution prepared in our laboratory.",
    processSteps: [
      "You complete your profile",
      "The Scaramuzzo team evaluates your needs",
      "You receive a routine or a personalized proposal",
      "If needed, you are contacted on WhatsApp",
    ],
    consultBandTitle: "Consultation before the product",
    consultBandText:
      "Every head of hair is different. That is why the Scaramuzzo team evaluates your profile before recommending a ready-made routine or a personalized solution.",
    consultBandPoints: [
      "Hair profile",
      "Professional assessment",
      "Recommended routine",
    ],
    consultBandMicrocopy:
      "You will not receive generic advice. Every request is reviewed by the Scaramuzzo team.",
    labLink:
      "Formulas and personalized products come from the Scaramuzzo cosmetic laboratory.",
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

        {/* ===================== PERCHÉ PERSONALIZZARE ===================== */}
        <ProductSection kicker={t.trustKicker} title={t.trustTitle}>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.trustText}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {t.trustCards.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border/50 bg-background/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-5 text-base font-semibold leading-snug">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </ProductSection>

        {/* ===================== PERCORSO A — QUIZ ===================== */}
        <ProductSection kicker={t.quizKicker} title={t.quizTitle}>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t.quizMicrocopy}
          </p>

          <div className="mt-10 rounded-3xl border border-border/40 bg-background/30 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.processKicker}
            </p>
            <h3 className="mt-3 text-xl font-semibold sm:text-2xl">
              {t.processTitle}
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {t.processText}
            </p>
            <ol className="mt-8 space-y-0">
              {t.processSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 border-b border-border/30 py-4 last:border-0 last:pb-0 first:pt-0"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-xs font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-foreground/90">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-card to-card/40 p-6 sm:p-8">
            <h3 className="text-xl font-semibold sm:text-2xl">
              {t.consultBandTitle}
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.consultBandText}
            </p>
            <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {t.consultBandPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2.5 text-sm font-medium text-foreground/90"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border/30 pt-5 text-sm leading-relaxed text-muted-foreground">
              {t.consultBandMicrocopy}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.labLink}{" "}
              <Link
                href="/#laboratorio"
                className="font-medium text-accent transition hover:opacity-80"
              >
                {language === "it" ? "Scopri di più" : "Learn more"}
              </Link>
            </p>
          </div>

          <div id="quiz" className="mt-8 scroll-mt-24">
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
