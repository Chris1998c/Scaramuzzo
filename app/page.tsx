'use client'

import { useState, useEffect } from "react"
import { Moon, Sun, Languages, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Language = 'it' | 'en'
type PageKey = 'home' | 'about' | 'services' | 'products' | 'contact'

const translations: Record<Language, Record<PageKey, string>> = {
  it: {
    home: "Home",
    about: "Chi Siamo",
    services: "Servizi",
    products: "Prodotti",
    contact: "Contatti",
  },
  en: {
    home: "Home",
    about: "About Us",
    services: "Services",
    products: "Products",
    contact: "Contact",
  }
}

export default function Page() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState<Language>("it")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])
  const homeTranslations = {
    it: {
      hero: "Il tuo stile, naturalmente perfetto",
      description: "Trasformiamo i tuoi capelli con cura naturale",
    },
    en: {
      hero: "Your style, naturally perfect",
      description: "We transform your hair with natural care",
    },
  }

  const NavItems = () => (
    <>
      {(Object.keys(translations[language]) as PageKey[]).map((key) => {
        const path = key === 'home' ? '/' : `/${key}`
        return (
          <Button
            key={key}
            variant="ghost"
            asChild
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all hover:text-primary font-semibold text-lg ${pathname === path ? "text-primary" : ""}`}
          >
            <Link href={path}>{translations[language][key]}</Link>
          </Button>
        )
      })}
    </>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ✅ HEADER - NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <Link href="/">
            <Image
              src="/Scaramuzzo-Hair-Natural-Beauty-Video-01-Immagine-Sovrapposta-removebg-preview.png"
              alt="Scaramuzzo Logo"
              width={80}
              height={50}
              className="object-contain"
              priority
            />
          </Link>

          {/* NAVBAR - DESKTOP */}
          <nav className="hidden md:flex items-center space-x-6 text-base">
            <NavItems />
          </nav>

          {/* ICONS & MENU MOBILE */}
          <div className="flex items-center space-x-2">
            {/* Lingua */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("it")}>Italiano</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tema */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menu Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* NAVBAR MOBILE */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col items-center bg-background/95 backdrop-blur-md p-4">
            <NavItems />
          </nav>
        )}
      </header>

      {/* ✅ CONTENUTO PRINCIPALE */}
      <main className="py-8">
        <section className="relative h-[60vh] md:h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/roma-salone-hero-wide.jpg"
            fill
            alt="Salone Roma"
            style={{ objectFit: 'cover' }}
            className="brightness-[0.4]"
            priority
          />

          <div className="container mx-auto px-4 text-center text-white z-10">
            <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
              {homeTranslations[language].hero}
            </h1>
            <p className="text-lg md:text-2xl lg:text-3xl">
              {homeTranslations[language].description}
            </p>
          </div>
        </section>
      </main>

      {/* ✅ FOOTER */}
      <footer className="border-t bg-background/90 backdrop-blur-md text-center p-6 text-sm">
        <p>© 2024 Scaramuzzo Hair Natural Beauty. All rights reserved.</p>
      </footer>
    </div>
  )
}
