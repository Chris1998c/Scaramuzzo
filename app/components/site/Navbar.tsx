"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, Languages, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = "it" | "en";

const navItems = [
  { href: "/", key: "home", label: { it: "Home", en: "Home" } },
  { href: "/about", key: "about", label: { it: "Chi Siamo", en: "About Us" } },
  { href: "/services", key: "services", label: { it: "Servizi", en: "Services" } },
  { href: "/products", key: "products", label: { it: "Prodotti", en: "Products" } },
  { href: "/erbe", key: "erbe", label: { it: "Erbe", en: "Herbs" } },
  { href: "/contact", key: "contact", label: { it: "Contatti", en: "Contact" } },
];

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<Language>("it");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Carica tema + lingua da localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const storedLang = localStorage.getItem("language") as Language | null;

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
    if (storedLang === "it" || storedLang === "en") {
      setLanguage(storedLang);
    }
  }, []);

  // Applica tema al <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Salva lingua
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Scaramuzzo-Hair-Natural-Beauty-Video-01-Immagine-Sovrapposta-removebg-preview.png"
            alt="Scaramuzzo Logo"
            width={80}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        {/* NAVBAR DESKTOP */}
        <nav className="hidden md:flex items-center space-x-4 text-base">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}>
              <Button variant="ghost" className="font-semibold text-lg">
                {item.label[language]}
              </Button>
            </Link>
          ))}
        </nav>

        {/* ICONS + MENU MOBILE */}
        <div className="flex items-center gap-2">
          {/* Lingua */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
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

          {/* Tema */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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

          {/* Menu Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* NAVBAR MOBILE */}
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col items-center bg-background/95 backdrop-blur-md p-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button
                variant="ghost"
                className="w-full justify-center py-2 font-semibold text-lg"
              >
                {item.label[language]}
              </Button>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
