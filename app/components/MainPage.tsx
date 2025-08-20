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
import Home from "@/app/components/Home"
import About from "@/app/components/About"
import Services from "@/app/components/Services"
import Products from "@/app/components/Products"
import Contact from "@/app/components/Contact"

export default function MainPage() {
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

  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState<Language>("it")
  const [currentPage, setCurrentPage] = useState<PageKey>("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const navigateTo = localStorage.getItem('navigateTo') as PageKey | null
    if (navigateTo) {
      setCurrentPage(navigateTo)
      localStorage.removeItem('navigateTo')
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home language={language} />
      case 'about': return <About language={language} />
      case 'services': return <Services language={language} />
      case 'products': return <Products language={language} />
      case 'contact': return <Contact language={language} />
      default: return <Home language={language} />
    }
  }

  const NavItems = () => (
    <>
      {(Object.keys(translations[language]) as PageKey[]).map((key) => (
        <Button
          key={key}
          variant="ghost"
          onClick={() => {
            setCurrentPage(key)
            setIsMenuOpen(false)
          }}
          className={`transition-all hover:text-primary font-semibold text-lg ${currentPage === key ? "text-primary" : ""}`}
        >
          {translations[language][key]}
        </Button>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER - NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <Link href="/" onClick={() => setCurrentPage('home')}>
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

      {/* CONTENUTO PRINCIPALE */}
      <main className="py-8">
        {renderPage()}
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-background/90 backdrop-blur-md text-center p-6 text-sm">
        <p>© 2024 Scaramuzzo Hair Natural Beauty. All rights reserved.</p>
      </footer>
    </div>
  )
}
