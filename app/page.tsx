'use client'

import { Moon, Sun, Languages, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Home from "@/app/components/Home"
import About from "@/app/components/About"
import Services from "@/app/components/Services"
import Products from "@/app/components/Products"
import Contact from "@/app/components/Contact"

export default function Component() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState<"it" | "en">("it")
  const [currentPage, setCurrentPage] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const translations = {
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
    },
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home language={language} />
      case 'about':
        return <About language={language} />
      case 'services':
        return <Services language={language} />
      case 'products':
        return <Products language={language} />
      case 'contact':
        return <Contact language={language} />
      default:
        return <Home language={language} />
    }
  }

  const NavItems = () => (
    <>
      <Button
        variant="ghost"
        onClick={() => setCurrentPage('home')}
        className="transition-colors hover:text-foreground/80 navbar-font"
      >
        {translations[language].home}
      </Button>
      <Button
        variant="ghost"
        onClick={() => setCurrentPage('about')}
        className="transition-colors hover:text-foreground/80 navbar-font"
      >
        {translations[language].about}
      </Button>
      <Button
        variant="ghost"
        onClick={() => setCurrentPage('services')}
        className="transition-colors hover:text-foreground/80 navbar-font"
      >
        {translations[language].services}
      </Button>
      <Button
        variant="ghost"
        onClick={() => setCurrentPage('products')}
        className="transition-colors hover:text-foreground/80 navbar-font"
      >
        {translations[language].products}
      </Button>
      <Button
        variant="ghost"
        onClick={() => setCurrentPage('contact')}
        className="transition-colors hover:text-foreground/80 navbar-font"
      >
        {translations[language].contact}
      </Button>
    </>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setCurrentPage('home')}>
            <Image
              src="/Scaramuzzo-Hair-Natural-Beauty-Video-01-Immagine-Sovrapposta-removebg-preview.png"
              alt="Scaramuzzo Logo"
              width={100}
              height={100}
              className="h-20 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <NavItems />
          </nav>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Languages className="h-4 w-4" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("it")}>Italiano</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col items-center space-y-2 p-4">
              <NavItems />
            </nav>
          </div>
        )}
      </header>
      <main>
        {renderPage()}
      </main>
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-8 text-center">
          <p>© 2024 Scaramuzzo Hair Natural Beauty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
