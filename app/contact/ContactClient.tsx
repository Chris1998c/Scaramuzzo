"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/app/components/site/LanguageProvider";
import ProductSection from "@/components/product/ProductSection";
import { ArrowRight, MapPin } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const copy = {
  it: {
    pageKicker: "Contatti",
    pageTitle: "Siamo vicine a te",
    pageIntro:
      "Scrivici per informazioni, appuntamenti o consulenze. Il team Scaramuzzo risponde con la stessa cura che riserviamo ai capelli in salone.",
    salonsKicker: "Presenza territoriale",
    salonsTitle: "I nostri saloni",
    salonsText:
      "Da oltre 30 anni accompagniamo le clienti attraverso percorsi personalizzati, consulenze professionali e ricerca botanica.",
    contactUs: "Contattaci",
    salons: [
      {
        city: "Roma",
        region: "Centro Storico",
        text: "Consulenze, colore botanico e routine personalizzate nel cuore della città.",
      },
      {
        city: "Cosenza",
        region: "Calabria",
        text: "Percorsi su misura, trattamenti professionali e accompagnamento continuo.",
      },
      {
        city: "Corigliano-Rossano",
        region: "Calabria",
        text: "La radice calabrese della nostra storia: metodo, esperienza e ricerca botanica.",
      },
      {
        city: "Castrovillari",
        region: "Calabria",
        text: "Un punto di riferimento per chi cerca cura personalizzata e naturalezza.",
      },
    ],
    consultKicker: "Consulenza",
    consultTitle: "Hai bisogno di una consulenza?",
    consultText:
      "Il team Scaramuzzo può aiutarti a individuare il percorso più adatto ai tuoi capelli.",
    ctaBce: "Diagnosi Botanica",
    ctaErbe: "Prodotti Personalizzati",
    formKicker: "Scrivici",
    formTitle: "Contattaci",
    name: "Nome",
    email: "Email",
    message: "Messaggio",
    send: "Invia",
    sending: "Inviando...",
    success: "Messaggio inviato con successo!",
    error: "Errore durante l'invio.",
  },
  en: {
    pageKicker: "Contact",
    pageTitle: "We're close to you",
    pageIntro:
      "Write to us for information, appointments or consultations. The Scaramuzzo team responds with the same care we give to hair in the salon.",
    salonsKicker: "Local presence",
    salonsTitle: "Our salons",
    salonsText:
      "For over 30 years we have guided clients through personalized journeys, professional consultations and botanical research.",
    contactUs: "Contact us",
    salons: [
      {
        city: "Rome",
        region: "Historic Center",
        text: "Consultations, botanical color and personalized routines in the heart of the city.",
      },
      {
        city: "Cosenza",
        region: "Calabria",
        text: "Made-to-measure journeys, professional treatments and ongoing support.",
      },
      {
        city: "Corigliano-Rossano",
        region: "Calabria",
        text: "The Calabrian roots of our story: method, experience and botanical research.",
      },
      {
        city: "Castrovillari",
        region: "Calabria",
        text: "A reference point for those seeking personalized, natural care.",
      },
    ],
    consultKicker: "Consultation",
    consultTitle: "Need a consultation?",
    consultText:
      "The Scaramuzzo team can help you find the journey best suited to your hair.",
    ctaBce: "Botanical Diagnosis",
    ctaErbe: "Personalized Products",
    formKicker: "Write to us",
    formTitle: "Contact us",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "Error while sending.",
  },
} as const;

export default function ContactClient() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot anti-bot
  const [status, setStatus] = useState<Status>("idle");

  const t = copy[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
        setWebsite("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* INTRO */}
      <section className="border-b border-border/40 bg-card/20 py-16 sm:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            {t.pageKicker}
          </p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.pageIntro}
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4">
        {/* SALONI */}
        <ProductSection
          kicker={t.salonsKicker}
          title={t.salonsTitle}
          className="!border-t-0"
        >
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.salonsText}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {t.salons.map((salon) => (
              <div
                key={salon.city}
                className="group flex flex-col rounded-2xl border border-border/50 bg-card/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
              >
                <MapPin className="h-5 w-5 text-accent" />
                <h3 className="mt-4 text-xl font-semibold">{salon.city}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {salon.region}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {salon.text}
                </p>
                <a
                  href="#contact-form"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:opacity-80"
                >
                  {t.contactUs}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            ))}
          </div>
        </ProductSection>

        {/* CONSULENZA */}
        <ProductSection kicker={t.consultKicker} title={t.consultTitle}>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.consultText}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/diagnosi-botanica"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
            >
              {t.ctaBce}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/erbe"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 px-7 py-3.5 text-base font-semibold transition hover:border-accent/50 hover:bg-card/60"
            >
              {t.ctaErbe}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </ProductSection>

        {/* FORM */}
        <ProductSection kicker={t.formKicker} title={t.formTitle}>
          <div
            id="contact-form"
            className="mx-auto max-w-lg scroll-mt-24 rounded-3xl border border-border/40 bg-card/40 p-6 shadow-lg sm:p-8"
          >
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
              aria-label={t.formTitle}
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground"
                >
                  {t.name}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-xl border-border/50 bg-background/60"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  {t.email}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl border-border/50 bg-background/60"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground"
                >
                  {t.message}
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder={t.message}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="rounded-xl border-border/50 bg-background/60"
                />
              </div>

              {/* HONEYPOT ANTI-BOT */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "-9999px",
                }}
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full rounded-full py-3">
                {status === "sending" ? t.sending : t.send}
              </Button>

              {status === "sent" && (
                <p className="text-center text-sm text-green-500">{t.success}</p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-500">{t.error}</p>
              )}
            </form>
          </div>
        </ProductSection>
      </div>
    </div>
  );
}
