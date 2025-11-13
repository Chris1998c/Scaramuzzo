"use client";

import { useEffect, useState } from "react";
import About from "../components/About";

type Language = "it" | "en";

export default function AboutClient() {
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  return <About language={language} />;
}
