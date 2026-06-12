"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Language = "it" | "en";

const STORAGE_KEY = "language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: unknown): value is Language {
  return value === "it" || value === "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSR e primo render lato client partono da "it" per coerenza con
  // l'attributo lang dell'<html> ed evitare mismatch di hydration.
  const [language, setLanguageState] = useState<Language>("it");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isLanguage(stored)) setLanguageState(stored);
    } catch {
      /* localStorage non disponibile */
    }

    // Sincronizza tra tab/finestre diverse.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && isLanguage(e.newValue)) {
        setLanguageState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage non disponibile */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback difensivo: evita crash se usato fuori dal provider.
    return { language: "it", setLanguage: () => {} };
  }
  return ctx;
}
