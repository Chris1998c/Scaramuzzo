"use client";

import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-[#1b0d08] border border-neutral-800 rounded-3xl shadow-2xl p-8 text-center space-y-6">

        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <XCircle className="h-10 w-10 text-red-400" />
          </div>
        </div>

        <h1 className="text-3xl font-semibold">Pagamento annullato</h1>

        <p className="text-neutral-300 text-sm md:text-base">
          Nessun addebito è stato effettuato. Puoi rivedere il tuo carrello o riprovare il pagamento quando vuoi.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center">
          <button
            onClick={() => router.push("/cart")}
            className="flex-1 bg-white text-black py-3 rounded-xl font-medium hover:bg-neutral-200 transition"
          >
            Torna al carrello
          </button>

          <button
            onClick={() => router.push("/products")}
            className="flex-1 border border-neutral-600 py-3 rounded-xl font-medium text-neutral-100 hover:bg-neutral-900 transition"
          >
            Vai ai prodotti
          </button>
        </div>

      </div>
    </div>
  );
}
