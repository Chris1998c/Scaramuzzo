"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "it" | "en";

export default function Footer() {
  const year = new Date().getFullYear();
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") setLanguage(stored);
  }, []);

  const t = {
    it: {
      brand: "Scaramuzzo Hair Natural Beauty",
      description:
        "Bellezza naturale, botanica e ricerca professionale nei nostri saloni in Calabria e Roma.",
      salons: "I nostri saloni",
      links: "Link utili",
      services: "Servizi",
      products: "Prodotti",
      herbs: "Erbe & Botanica",
      contact: "Contatti",
      openingHoursRoma:
        "Orari: chiuso mercoledì e domenica · lun-mar-gio-ven-sab 10:00-20:00",
      openingHoursCorigliano:
        "Orari: chiuso lunedì e domenica · mar-mer-gio-ven-sab 9:00-19:00",
      openingHoursCosenza:
        "Orari: chiuso domenica e martedì · lun-mer-gio-ven-sab 9:00-19:00",
      openingHoursCastrovillari:
        "Orari: chiuso domenica e martedì · lun-mer-gio-ven-sab 9:00-19:00",
      allRights: "Tutti i diritti riservati.",
      instagram: "Instagram",
    },

    en: {
      brand: "Scaramuzzo Hair Natural Beauty",
      description:
        "Natural beauty, botanical care and professional research across our salons in Calabria and Rome.",
      salons: "Our salons",
      links: "Useful links",
      services: "Services",
      products: "Products",
      herbs: "Herbs & Botanicals",
      contact: "Contact",
      openingHoursRoma:
        "Hours: closed Wednesday & Sunday · Mon-Tue-Thu-Fri-Sat 10:00-20:00",
      openingHoursCorigliano:
        "Hours: closed Monday & Sunday · Tue-Wed-Thu-Fri-Sat 9:00-19:00",
      openingHoursCosenza:
        "Hours: closed Sunday & Tuesday · Mon-Wed-Thu-Fri-Sat 9:00-19:00",
      openingHoursCastrovillari:
        "Hours: closed Sunday & Tuesday · Mon-Wed-Thu-Fri-Sat 9:00-19:00",
      allRights: "All rights reserved.",
      instagram: "Instagram",
    },
  }[language];

  return (
    <footer className="bg-background border-t py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* COLONNA 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.brand}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* COLONNA 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.salons}</h4>

            <ul className="space-y-6 text-sm">
              <li>
                <p className="font-medium">Roma – Centro Storico</p>
                <p className="text-muted-foreground">
                  Via del Pellegrino 101, 00186 Roma
                </p>
                <p className="text-muted-foreground">
                  Tel:{" "}
                  <a href="tel:+390669318238" className="underline">
                    06 693 18238
                  </a>
                </p>
                <p className="text-muted-foreground">{t.openingHoursRoma}</p>
              </li>

              <li>
                <p className="font-medium">Corigliano-Rossano</p>
                <p className="text-muted-foreground">
                  Via Nazionale 70, 87064 CS
                </p>
                <p className="text-muted-foreground">
                  Tel:{" "}
                  <a href="tel:+390983889488" className="underline">
                    0983 889 488
                  </a>
                </p>
                <p className="text-muted-foreground">
                  {t.openingHoursCorigliano}
                </p>
              </li>

              <li>
                <p className="font-medium">Cosenza</p>
                <p className="text-muted-foreground">
                  Via Monte San Michele 13/A, 87100 CS
                </p>
                <p className="text-muted-foreground">
                  Tel:{" "}
                  <a href="tel:+39098474525" className="underline">
                    0984 745 25
                  </a>
                </p>
                <p className="text-muted-foreground">{t.openingHoursCosenza}</p>
              </li>

              <li>
                <p className="font-medium">Castrovillari</p>
                <p className="text-muted-foreground">
                  Corso Giuseppe Garibaldi 13, 87012 CS
                </p>
                <p className="text-muted-foreground">
                  Tel:{" "}
                  <a href="tel:+39098127228" className="underline">
                    0981 27228
                  </a>
                </p>
                <p className="text-muted-foreground">
                  {t.openingHoursCastrovillari}
                </p>
              </li>
            </ul>
          </div>

          {/* COLONNA 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.links}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:underline">
                  {t.services}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:underline">
                  {t.products}
                </Link>
              </li>
              <li>
                <Link href="/erbe" className="hover:underline">
                  {t.herbs}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  {t.contact}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/scaramuzzohairnaturalbeauty/"
                  target="_blank"
                  className="hover:underline"
                >
                  {t.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {year} Scaramuzzo Hair Natural Beauty — {t.allRights}
        </div>
      </div>
    </footer>
  );
}
