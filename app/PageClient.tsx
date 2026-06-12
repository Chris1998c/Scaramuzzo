"use client";

import HomeHero from "@/app/components/Home";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/components/site/LanguageProvider";
import { Store, CalendarDays, UserCheck, Leaf, MapPin, ArrowRight } from "lucide-react";
import InfoCards from "@/components/product/InfoCards";

const copy = {
  it: {
    trust: [
      { icon: Store, label: "4 saloni professionali" },
      { icon: CalendarDays, label: "Dal 1993" },
      { icon: UserCheck, label: "Consulenza personalizzata" },
      { icon: Leaf, label: "Ricerca botanica" },
    ],
    founder: {
      kicker: "Il fondatore",
      title: "Giuseppe Scaramuzzo",
      paragraphs: [
        "Dal 1993 Giuseppe Scaramuzzo costruisce un approccio sartoriale alla bellezza dei capelli: ogni risultato nasce dallo studio della persona, mai da uno schema standard.",
        "Da questa esperienza nasce un metodo riconoscibile, fatto di ascolto, tecnica e attenzione alla naturalezza, oggi alla base di tutti i nostri saloni.",
      ],
      cta: "La nostra storia",
    },
    method: {
      kicker: "Come lavoriamo",
      title: "Il Metodo Scaramuzzo",
      subtitle:
        "Un percorso professionale che parte dall’ascolto del capello e arriva a un risultato costruito su misura.",
      steps: [
        { n: "01", title: "Diagnosi", text: "Analizziamo struttura del capello, cute e storico tecnico." },
        { n: "02", title: "Personalizzazione", text: "Costruiamo tecnica, colore e trattamento sulla singola persona." },
        { n: "03", title: "Botanica", text: "Erbe riflessanti, henné e attivi naturali dalla nostra ricerca." },
        { n: "04", title: "Risultato", text: "Un risultato armonioso, portabile e fedele alla tua naturalezza." },
      ],
    },
    salons: {
      kicker: "Presenza territoriale",
      title: "I nostri saloni",
      subtitle: "Una realtà consolidata, presente in più città tra Calabria e Roma.",
      list: [
        { city: "Roma", region: "Centro Storico" },
        { city: "Corigliano-Rossano", region: "Calabria" },
        { city: "Cosenza", region: "Calabria" },
        { city: "Castrovillari", region: "Calabria" },
      ],
    },
    botany: {
      kicker: "Ricerca",
      title: "Ricerca botanica",
      paragraphs: [
        "La nostra ricerca botanica nasce dall’esperienza maturata nei saloni: anni di lavoro sul capello reale e di confronto con le esigenze delle clienti.",
        "I prodotti sono il risultato della ricerca e dell’esperienza professionale: una conseguenza del metodo, non il punto di partenza.",
      ],
    },
    paths: {
      kicker: "Due percorsi",
      title: "Da dove vuoi iniziare?",
      items: [
        {
          title: "Prodotti Personalizzati",
          text: "Routine professionali costruite sulle esigenze dei tuoi capelli.",
          href: "/erbe",
          cta: "Scopri",
        },
        {
          title: "Botanical Color Experience",
          text: "Valutazione professionale del profilo colore, dei capelli bianchi e dello storico tecnico.",
          href: "/diagnosi-botanica",
          cta: "Inizia l’esperienza",
        },
      ],
    },
    final: {
      title: "Scopri il tuo percorso Scaramuzzo",
      text: "Routine su misura o valutazione professionale del colore: scegli il punto di partenza.",
      primary: "Prodotti Personalizzati",
      secondary: "Botanical Color Experience",
    },
  },
  en: {
    trust: [
      { icon: Store, label: "4 professional salons" },
      { icon: CalendarDays, label: "Since 1993" },
      { icon: UserCheck, label: "Personalized consultation" },
      { icon: Leaf, label: "Botanical research" },
    ],
    founder: {
      kicker: "The founder",
      title: "Giuseppe Scaramuzzo",
      paragraphs: [
        "Since 1993 Giuseppe Scaramuzzo has built a tailor-made approach to hair beauty: every result starts from the study of the person, never from a standard scheme.",
        "From this experience comes a recognizable method, made of listening, technique and attention to natural beauty, today at the heart of all our salons.",
      ],
      cta: "Our story",
    },
    method: {
      kicker: "How we work",
      title: "The Scaramuzzo Method",
      subtitle:
        "A professional journey that starts from listening to the hair and leads to a made-to-measure result.",
      steps: [
        { n: "01", title: "Diagnosis", text: "We analyse hair structure, scalp and technical history." },
        { n: "02", title: "Personalization", text: "We build technique, color and treatment around the individual." },
        { n: "03", title: "Botanicals", text: "Reflective herbs, henna and natural actives from our research." },
        { n: "04", title: "Result", text: "A harmonious, wearable result, true to your natural beauty." },
      ],
    },
    salons: {
      kicker: "Local presence",
      title: "Our salons",
      subtitle: "An established reality, present in several cities across Calabria and Rome.",
      list: [
        { city: "Rome", region: "Historic Center" },
        { city: "Corigliano-Rossano", region: "Calabria" },
        { city: "Cosenza", region: "Calabria" },
        { city: "Castrovillari", region: "Calabria" },
      ],
    },
    botany: {
      kicker: "Research",
      title: "Botanical research",
      paragraphs: [
        "Our botanical research comes from the experience gained in the salons: years of work on real hair and dialogue with our clients' needs.",
        "The products are the result of research and professional experience: a consequence of the method, not the starting point.",
      ],
    },
    paths: {
      kicker: "Two journeys",
      title: "Where do you want to start?",
      items: [
        {
          title: "Personalized Products",
          text: "Professional routines built around your hair's needs.",
          href: "/erbe",
          cta: "Discover",
        },
        {
          title: "Botanical Color Experience",
          text: "Professional assessment of your color profile, grey hair and technical history.",
          href: "/diagnosi-botanica",
          cta: "Start the experience",
        },
      ],
    },
    final: {
      title: "Discover your Scaramuzzo journey",
      text: "Made-to-measure routines or a professional color assessment: choose your starting point.",
      primary: "Personalized Products",
      secondary: "Botanical Color Experience",
    },
  },
};

export default function PageClient() {
  const { language } = useLanguage();

  const t = copy[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. HERO */}
      <HomeHero language={language} />

      {/* 2. TRUST SECTION */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="container mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {t.trust.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/30 px-5 py-5"
              >
                <Icon className="h-6 w-6 shrink-0 text-accent" />
                <span className="text-sm font-medium leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GIUSEPPE SCARAMUZZO */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.founder.kicker}
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">{t.founder.title}</h2>
          <div className="mt-6 space-y-5 border-l-2 border-accent/40 pl-6 sm:pl-8">
            {t.founder.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  i === 0
                    ? "text-lg text-foreground/90"
                    : "text-base text-muted-foreground"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:opacity-80"
          >
            {t.founder.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 4. IL METODO SCARAMUZZO */}
      <section id="metodo" className="scroll-mt-24 border-y border-border/40 bg-card/20 py-20 sm:py-24">
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
          <div className="mt-14">
            <InfoCards items={[...t.method.steps]} />
          </div>
        </div>
      </section>

      {/* 5. I NOSTRI SALONI */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.salons.kicker}
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">{t.salons.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t.salons.subtitle}
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.salons.list.map((s) => (
              <div
                key={s.city}
                className="group rounded-2xl border border-border/50 bg-card/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
              >
                <MapPin className="h-5 w-5 text-accent" />
                <h3 className="mt-4 text-xl font-semibold">{s.city}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.region}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RICERCA BOTANICA */}
      <section className="border-y border-border/40 bg-card/20 py-20 sm:py-24">
        <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border/40 shadow-xl">
            <Image
              src="/ERBE.webp"
              alt="Ricerca botanica Scaramuzzo — erbe, polveri vegetali e preparazione in laboratorio"
              fill
              sizes="(max-width: 768px) 90vw, 560px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.botany.kicker}
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">{t.botany.title}</h2>
            <div className="mt-6 space-y-5">
              {t.botany.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. DUE PERCORSI PRINCIPALI */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.paths.kicker}
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">{t.paths.title}</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {t.paths.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col justify-between rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-10"
              >
                <div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-accent">
                  {item.cta}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA FINALE */}
      <section className="pb-20 sm:pb-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 px-6 py-14 text-center shadow-lg sm:px-12">
            <h2 className="mx-auto max-w-2xl text-2xl font-bold sm:text-3xl">
              {t.final.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.final.text}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/erbe"
                className="w-full rounded-full bg-accent px-8 py-3.5 text-center text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90 sm:w-auto"
              >
                {t.final.primary}
              </Link>
              <Link
                href="/diagnosi-botanica"
                className="w-full rounded-full border border-border/60 px-8 py-3.5 text-center text-base font-semibold transition hover:border-accent/50 hover:bg-card/60 sm:w-auto"
              >
                {t.final.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
