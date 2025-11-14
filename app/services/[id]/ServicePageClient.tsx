"use client";

import { FC, useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Service, serviceTranslations } from "@/app/services/data";

interface Props {
  id: string;
}

type Language = "it" | "en";

const ServicePageClient: FC<Props> = ({ id }) => {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("it");
  const [service, setService] = useState<Service | null>(null);

  // Leggo la lingua da localStorage
  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  // Recupero il servizio dalla traduzione corretta
  useEffect(() => {
    let current = serviceTranslations[language].services.find(
      (s) => s.id === id
    );

    if (!current) {
      const otherLang: Language = language === "it" ? "en" : "it";
      const inOther = serviceTranslations[otherLang].services.find(
        (s) => s.id === id
      );
      if (inOther) {
        current = serviceTranslations[language].services.find(
          (s) => s.alias === inOther.id
        );
      }
    }

    setService(current || null);
  }, [id, language]);

  const handleBackClick = useCallback(() => {
    router.push("/services");
  }, [router]);

  // Parsing smart della descrizione: intro + eventuali bullet ("- xxx")
  const { intro, bulletItems, extraParagraphs } = useMemo(() => {
    if (!service?.detailedDescription) {
      return { intro: "", bulletItems: [] as string[], extraParagraphs: [] as string[] };
    }

    const lines = service.detailedDescription.split("\n").filter((l) => l.trim().length > 0);

    if (lines.length === 0) {
      return { intro: "", bulletItems: [], extraParagraphs: [] };
    }

    const introLine = lines[0];
    const bullets: string[] = [];
    const extras: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("- ")) {
        bullets.push(line.replace(/^-+\s*/, ""));
      } else {
        extras.push(line);
      }
    }

    return { intro: introLine, bulletItems: bullets, extraParagraphs: extras };
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  const isItalian = language === "it";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <div className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt || service.name}
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="mb-3 inline-flex items-center rounded-full border border-white/30 bg-black/30 px-4 py-1 text-xs sm:text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm">
            {isItalian ? "Servizio Scaramuzzo" : "Scaramuzzo Service"}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3">
            {service.name}
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-white/80">
            {service.description}
          </p>
        </div>
      </div>

      {/* CONTENUTO */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-6xl">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] lg:items-start">
          {/* TESTO PRINCIPALE */}
          <div>
            {intro && (
              <p className="text-base sm:text-lg leading-relaxed mb-6">
                {intro}
              </p>
            )}

            {/* Se ci sono trattamenti/punti elenco li trasformo in card moderne */}
            {bulletItems.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  {isItalian
                    ? "Cosa possiamo fare per i tuoi capelli"
                    : "What we can do for your hair"}
                </h2>
                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                  {bulletItems.map((item, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-2xl border bg-card/70 p-4 sm:p-5 shadow-sm backdrop-blur-sm"
                    >
                      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Eventuali paragrafi extra */}
            {extraParagraphs.length > 0 && (
              <div className="space-y-4">
                {extraParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* CTA mobile */}
            <div className="mt-8 lg:hidden">
              <Button onClick={handleBackClick} className="w-full sm:w-auto">
                {isItalian ? "Torna ai Servizi" : "Back to Services"}
              </Button>
            </div>
          </div>

          {/* LATO DESTRO: CARD RIASSUNTIVA / VISUALE */}
          <aside className="space-y-4 lg:space-y-5">
            <div className="overflow-hidden rounded-3xl border bg-card/80 shadow-sm backdrop-blur-sm">
              <div className="relative h-44 sm:h-52">
                <Image
                  src={service.image}
                  alt={service.imageAlt || service.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">
                  {isItalian ? "Per chi è ideale" : "Who it’s for"}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {isItalian
                    ? "Un servizio pensato per chi cerca cura, stile e risultati duraturi, rispettando sempre la salute dei capelli e della cute."
                    : "A service designed for those seeking care, style and long-lasting results, always respecting hair and scalp health."}
                </p>

                <div className="grid grid-cols-1 gap-3 text-sm sm:text-xs">
                  <div className="rounded-2xl border bg-background/60 px-3 py-2">
                    <p className="font-medium">
                      {isItalian ? "Approccio" : "Approach"}
                    </p>
                    <p className="text-muted-foreground">
                      {isItalian
                        ? "Consulenza personalizzata, diagnosi visiva e ascolto delle tue esigenze."
                        : "Personal consultation, visual diagnosis and focus on your needs."}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-background/60 px-3 py-2">
                    <p className="font-medium">
                      {isItalian ? "Obiettivo" : "Goal"}
                    </p>
                    <p className="text-muted-foreground">
                      {isItalian
                        ? "Equilibrio tra estetica, benessere e rispetto della struttura del capello."
                        : "Balance between aesthetics, well-being and respect for hair structure."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA desktop */}
            <div className="hidden lg:block">
              <Button
                onClick={handleBackClick}
                variant="outline"
                className="w-full"
              >
                {isItalian ? "Torna ai Servizi" : "Back to Services"}
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ServicePageClient;
