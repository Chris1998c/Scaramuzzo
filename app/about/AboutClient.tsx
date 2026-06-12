"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/components/site/LanguageProvider";
import { MapPin } from "lucide-react";
import ProductSection from "@/components/product/ProductSection";
import InfoCards from "@/components/product/InfoCards";


const copy = {
  it: {
    heroKicker: "Scaramuzzo Hair Natural Beauty",
    heroTitle:
      "Oltre trent’anni di esperienza professionale nella bellezza dei capelli",
    heroSubtitle:
      "Scaramuzzo Hair Natural Beauty nasce dall’esperienza di Giuseppe Scaramuzzo e da una visione che unisce tecnica, consulenza personalizzata e ricerca botanica.",
    stats: [
      { value: "30+", label: "anni di esperienza" },
      { value: "4", label: "saloni professionali" },
      { value: "1993", label: "inizio del percorso" },
    ],
    giuseppeKicker: "Il fondatore",
    giuseppeTitle: "Giuseppe Scaramuzzo",
    giuseppeParagraphs: [
      "Giuseppe Scaramuzzo entra giovanissimo nel mondo dell’hairstyling. Dopo gli studi a Roma e le prime collaborazioni con professionisti italiani, nel 1993 inizia un percorso che segnerà profondamente il suo stile e la sua visione del mestiere.",
      "Anni di lavoro, formazione e crescita artistica lo portano a sviluppare un approccio sartoriale alla bellezza: ogni risultato nasce dallo studio della persona, non da uno schema standard.",
      "Nel 2013 trasforma questa esperienza in un progetto personale e apre il suo primo salone, dando vita al marchio Scaramuzzo Hair Natural Beauty: una crescita costante costruita sulla fiducia delle clienti, sulla qualità del servizio e su una forte identità legata alla natura e alla ricerca.",
    ],
    salonsKicker: "Presenza territoriale",
    salonsTitle: "I nostri saloni",
    salonsIntro:
      "Una realtà consolidata, presente in più città tra Calabria e Roma.",
    salons: [
      { city: "Corigliano-Rossano", address: "Via Nazionale 70" },
      { city: "Cosenza", address: "Via Monte San Michele 13/A" },
      { city: "Castrovillari", address: "Corso Giuseppe Garibaldi 13" },
      { city: "Roma", address: "Via del Pellegrino 101 — Centro Storico" },
    ],
    methodKicker: "Come lavoriamo",
    methodTitle: "Il Metodo Scaramuzzo",
    methodSubtitle:
      "Un percorso professionale che parte dall’ascolto e arriva a un risultato costruito su misura, in salone.",
    methodSteps: [
      { n: "01", title: "Ascolto", text: "Comprendiamo desideri, abitudini e stile di vita di ogni cliente." },
      { n: "02", title: "Diagnosi", text: "Analizziamo struttura del capello, cute e storico tecnico." },
      { n: "03", title: "Personalizzazione", text: "Costruiamo tecnica, colore e trattamento sulla singola persona." },
      { n: "04", title: "Risultato", text: "Un risultato armonioso, portabile e fedele alla tua naturalezza." },
    ],
    botanyKicker: "Ricerca",
    botanyTitle: "Ricerca botanica",
    botanyParagraphs: [
      "La nostra ricerca botanica nasce direttamente dall’esperienza maturata nei saloni: anni di lavoro sul capello reale, di osservazione e di confronto con le esigenze delle clienti.",
      "Da qui prendono forma le miscele riflessanti alle erbe, l’henné di qualità e i trattamenti naturali: i prodotti sono una conseguenza del metodo, non il punto di partenza.",
    ],
    ctaTitle: "Scopri il Metodo Scaramuzzo",
    ctaText:
      "Prenota una consulenza nei nostri saloni o inizia il tuo percorso personalizzato.",
    ctaPrimary: "Prenota una consulenza",
    ctaSecondary: "Prodotti Personalizzati",
  },
  en: {
    heroKicker: "Scaramuzzo Hair Natural Beauty",
    heroTitle: "Over thirty years of professional expertise in hair beauty",
    heroSubtitle:
      "Scaramuzzo Hair Natural Beauty was born from the experience of Giuseppe Scaramuzzo and a vision that combines technique, personalized consultation and botanical research.",
    stats: [
      { value: "30+", label: "years of experience" },
      { value: "4", label: "professional salons" },
      { value: "1993", label: "the journey begins" },
    ],
    giuseppeKicker: "The founder",
    giuseppeTitle: "Giuseppe Scaramuzzo",
    giuseppeParagraphs: [
      "Giuseppe Scaramuzzo entered the world of hairstyling at a very young age. After studying in Rome and his first collaborations with Italian professionals, in 1993 he began a journey that would deeply shape his style and his vision of the craft.",
      "Years of work, training and artistic growth led him to develop a tailor-made approach to beauty: every result starts from the study of the person, never from a standard scheme.",
      "In 2013 he turned this experience into a personal project and opened his first salon, creating the Scaramuzzo Hair Natural Beauty brand: a steady growth built on client trust, service quality and a strong identity rooted in nature and research.",
    ],
    salonsKicker: "Local presence",
    salonsTitle: "Our salons",
    salonsIntro:
      "An established reality, present in several cities across Calabria and Rome.",
    salons: [
      { city: "Corigliano-Rossano", address: "Via Nazionale 70" },
      { city: "Cosenza", address: "Via Monte San Michele 13/A" },
      { city: "Castrovillari", address: "Corso Giuseppe Garibaldi 13" },
      { city: "Rome", address: "Via del Pellegrino 101 — Historic Center" },
    ],
    methodKicker: "How we work",
    methodTitle: "The Scaramuzzo Method",
    methodSubtitle:
      "A professional journey that starts from listening and leads to a made-to-measure result, in the salon.",
    methodSteps: [
      { n: "01", title: "Listening", text: "We understand each client's wishes, habits and lifestyle." },
      { n: "02", title: "Diagnosis", text: "We analyse hair structure, scalp and technical history." },
      { n: "03", title: "Personalization", text: "We build technique, color and treatment around the individual." },
      { n: "04", title: "Result", text: "A harmonious, wearable result, true to your natural beauty." },
    ],
    botanyKicker: "Research",
    botanyTitle: "Botanical research",
    botanyParagraphs: [
      "Our botanical research comes directly from the experience gained in the salons: years of work on real hair, of observation and of dialogue with our clients' needs.",
      "From here come the herbal reflective blends, high-quality henna and natural treatments: the products are a consequence of the method, not the starting point.",
    ],
    ctaTitle: "Discover the Scaramuzzo Method",
    ctaText:
      "Book a consultation in our salons or start your personalized journey.",
    ctaPrimary: "Book a consultation",
    ctaSecondary: "Personalized Products",
  },
};

export default function AboutClient() {
  const { language } = useLanguage();

  const t = copy[language];

  return (
    <div className="bg-background text-foreground">
      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden">
        <Image
          src="/roma-salone-hero-wide.webp"
          alt="Scaramuzzo Hair Natural Beauty — Salone Roma"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/30" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            {t.heroKicker}
          </p>
          <h1 className="text-balance text-3xl font-bold leading-[1.14] drop-shadow-xl sm:text-4xl md:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 drop-shadow-md sm:text-lg">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4">
        {/* ===================== STATS ===================== */}
        <div className="grid grid-cols-3 gap-4 py-10 sm:gap-6">
          {t.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border/40 bg-card/40 px-4 py-6 text-center"
            >
              <p className="text-3xl font-bold text-accent sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ===================== GIUSEPPE SCARAMUZZO ===================== */}
        <ProductSection kicker={t.giuseppeKicker} title={t.giuseppeTitle}>
          <div className="max-w-3xl border-l-2 border-accent/40 pl-6 sm:pl-8">
            <div className="space-y-5">
              {t.giuseppeParagraphs.map((p, i) => (
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
          </div>
        </ProductSection>

        {/* ===================== I NOSTRI SALONI ===================== */}
        <ProductSection kicker={t.salonsKicker} title={t.salonsTitle}>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.salonsIntro}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.salons.map((s) => (
              <div
                key={s.city}
                className="rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
              >
                <MapPin className="h-5 w-5 text-accent" />
                <h3 className="mt-4 text-lg font-semibold">{s.city}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {s.address}
                </p>
              </div>
            ))}
          </div>
        </ProductSection>

        {/* ===================== IL METODO SCARAMUZZO ===================== */}
        <ProductSection kicker={t.methodKicker} title={t.methodTitle}>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.methodSubtitle}
          </p>
          <div className="mt-8">
            <InfoCards items={[...t.methodSteps]} />
          </div>
        </ProductSection>

        {/* ===================== RICERCA BOTANICA ===================== */}
        <ProductSection kicker={t.botanyKicker} title={t.botanyTitle}>
          <div className="max-w-3xl space-y-5">
            {t.botanyParagraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {p}
              </p>
            ))}
          </div>
        </ProductSection>

        {/* ===================== CTA FINALE ===================== */}
        <section className="py-16 sm:py-20">
          <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 px-6 py-14 text-center shadow-lg sm:px-12">
            <h2 className="mx-auto max-w-2xl text-2xl font-bold sm:text-3xl">
              {t.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.ctaText}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="w-full rounded-full bg-accent px-8 py-3.5 text-center text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90 sm:w-auto"
              >
                {t.ctaPrimary}
              </Link>
              <Link
                href="/erbe"
                className="w-full rounded-full border border-border/60 px-8 py-3.5 text-center text-base font-semibold transition hover:border-accent/50 hover:bg-card/60 sm:w-auto"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
