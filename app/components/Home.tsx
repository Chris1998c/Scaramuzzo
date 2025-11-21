"use client";

import { FC } from "react";
import Image from "next/image";

interface HomeProps {
  language: "it" | "en";
}

const Home: FC<HomeProps> = ({ language }) => {
  const translations = {
    it: {
      hero: "Il tuo stile, naturalmente perfetto",
      description: "Trasformiamo i tuoi capelli con cura naturale.",
    },
    en: {
      hero: "Your style, naturally perfect",
      description: "We transform your hair with natural care.",
    },
  };

  return (
    <section className="relative h-[60vh] md:h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/roma-salone-hero-wide.webp"
        alt="Scaramuzzo Salon"
        fill
        className="object-cover brightness-[0.35]"
        priority
      />

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-bold text-4xl md:text-6xl mb-4 drop-shadow-xl">
          {translations[language].hero}
        </h1>
        <p className="text-lg md:text-2xl opacity-90 drop-shadow-xl">
          {translations[language].description}
        </p>
      </div>
    </section>
  );
};

export default Home;
