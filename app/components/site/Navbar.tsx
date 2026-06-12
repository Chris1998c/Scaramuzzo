"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, Languages, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/app/components/site/LanguageProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 🔥 NUOVO CARRELLO
import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";

const navItems = [
  { href: "/", key: "home", label: { it: "Home", en: "Home" } },
  {
    href: "/products",
    key: "products",
    label: { it: "Prodotti", en: "Products" },
  },
  {
    href: "/erbe",
    key: "custom",
    label: { it: "Prodotti Personalizzati", en: "Personalized Products" },
  },
  {
    href: "/services",
    key: "services",
    label: { it: "Servizi", en: "Services" },
  },
  { href: "/about", key: "about", label: { it: "Chi Siamo", en: "About Us" } },
  {
    href: "/contact",
    key: "contact",
    label: { it: "Contatti", en: "Contact" },
  },
];

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Carica tema (lo script pre-paint nel layout ha già applicato la classe).
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme) setTheme(storedTheme);
  }, []);

  // Applica tema
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {/* 🔥 Carrello montato a livello navbar per essere globale */}
      <CartDrawer />

      <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-[#2b1409]/90 backdrop-blur-xl shadow-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          {/* LOGO */}
          <Link
            href="/"
            aria-label="Scaramuzzo — Home"
            className="flex items-center gap-3"
          >
            <div className="relative h-12 w-24 shrink-0 sm:h-14 sm:w-28">
              <Image
                src="/scaramuzzo-hair-natural-beauty-video-01-immagine-sovrapposta-removebg-preview.webp"
                alt="Scaramuzzo Hair Natural Beauty"
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-contain object-left"
                priority
              />
            </div>
            <span className="hidden text-lg font-semibold tracking-wide text-neutral-100 sm:inline-block">
              Scaramuzzo
            </span>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => (
              <Button
                key={item.key}
                asChild
                variant="ghost"
                className="font-medium text-sm lg:text-base text-neutral-200 hover:text-white hover:bg-white/5 transition px-2.5 lg:px-3"
              >
                <Link href={item.href}>{item.label[language]}</Link>
              </Button>
            ))}
          </nav>

          {/* ICONS */}
          <div className="flex items-center gap-3">
            {/* CARRELLO */}
            <CartButton />

            {/* LANGUAGE */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Cambia lingua">
                  <Languages className="h-5 w-5 text-neutral-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("it")}>
                  Italiano
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* TEMA */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Cambia tema">
                  <Sun className="h-5 w-5 text-neutral-100 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 text-neutral-100 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* MOBILE MENU */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-neutral-100" />
              ) : (
                <Menu className="h-6 w-6 text-neutral-100" />
              )}
            </Button>
          </div>
        </div>

        {/* NAV MOBILE */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col items-center bg-[#2b1409]/95 backdrop-blur-xl p-4 space-y-3 border-t border-neutral-800">
            {/* Carrello mobile */}
            <CartButton />

            {navItems.map((item) => (
              <Button
                key={item.key}
                asChild
                variant="ghost"
                className="w-full justify-center py-2 font-semibold text-lg text-neutral-100 hover:text-white hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href={item.href}>{item.label[language]}</Link>
              </Button>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
