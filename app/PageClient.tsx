"use client";

import HomeHero from "@/app/components/Home";
import About from "@/app/components/About";
import Contact from "@/app/contact/ContactClient"; // ✅ sta in app/contact
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Language = "it" | "en";

export default function PageClient() {
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <HomeHero language={language} />

      {/* Sezione breve Chi siamo + CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-bold">
            {language === "it"
              ? "Scaramuzzo Hair Natural Beauty"
              : "Scaramuzzo Hair Natural Beauty"}
          </h2>

          <p className="text-lg">
            {language === "it"
              ? "Un salone che unisce erbe botaniche, ricerca e tecnica per valorizzare la bellezza naturale dei capelli."
              : "A salon that combines botanical herbs, research and technique to enhance your hair’s natural beauty."}
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/services">
              <Button>
                {language === "it" ? "Scopri i Servizi" : "Discover Services"}
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">
                {language === "it" ? "Vedi Prodotti" : "View Products"}
              </Button>
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
