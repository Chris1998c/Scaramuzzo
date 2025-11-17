import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guida alle miscele vegetali | Scaramuzzo",
  description: "Istruzioni per utilizzare le miscele vegetali Scaramuzzo per la cura dei capelli.",
}

export default function ErbePage() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-base leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">Guida all’uso delle miscele vegetali</h1>
      <p>
        Le miscele vegetali Scaramuzzo vanno preparate con acqua calda (60–70°C) fino a ottenere una crema morbida. Applicare sui capelli puliti e tamponati, dalle radici alle punte.
      </p>
      <p className="mt-4">
        ⏱ <strong>Tempo di posa:</strong> da 5 a 30 minuti in base alla tonalità.
        Dopo la posa, risciacquare con shampoo delicato e applicare conditioner.
      </p>
      <a
        href="/Spiegazione erbe.pdf"
        className="inline-block mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        target="_blank"
      >
        📄 Scarica la guida in PDF
      </a>
    </div>
  );
}
