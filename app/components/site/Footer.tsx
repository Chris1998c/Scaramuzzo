"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Scaramuzzo Hair Natural Beauty
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bellezza naturale, botanica e ricerca professionale nei nostri
              saloni in Calabria e Roma.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">I nostri saloni</h4>

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
                <p className="text-muted-foreground">
                  Orari: chiuso mercoledì e domenica · lun-mar-gio-gio-ven-sab
                  10:00-20:00
                </p>
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
                  Orari: chiuso lunedì e domenica · mar-mer-gio-ven-sab
                  9:00-19:00
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
                <p className="text-muted-foreground">
                  Orari: chiuso domenica e martedì · lun-mer-gio-ven-sab
                  9:00-19:00
                </p>
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
                  Orari: chiuso domenica e martedì · lun-mer-gio-ven-sab
                  9:00-19:00
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Link utili</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:underline">
                  Servizi
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:underline">
                  Prodotti
                </Link>
              </li>
              <li>
                <Link href="/erbe" className="hover:underline">
                  Erbe & Botanica
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contatti
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/scaramuzzo.hair"
                  target="_blank"
                  className="hover:underline"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {year} Scaramuzzo Hair Natural Beauty — Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
