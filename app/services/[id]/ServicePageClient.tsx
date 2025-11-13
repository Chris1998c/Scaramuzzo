"use client";

import { FC, useEffect, useState, useCallback } from "react";
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

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

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

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[50vh]">
        <Image
          src={service.image}
          alt={service.imageAlt || service.name}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center px-4">
            {service.name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <p className="text-lg mb-8 whitespace-pre-line">
          {service.detailedDescription}
        </p>
        <Button onClick={handleBackClick}>
          {language === "it" ? "Torna ai Servizi" : "Back to Services"}
        </Button>
      </div>
    </div>
  );
};

export default ServicePageClient;
