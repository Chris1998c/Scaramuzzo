"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { startStripeCheckout } from "@/lib/checkout";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.getTotal());

  const handlePay = () => {
    if (items.length === 0) return;
    startStripeCheckout(items);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-neutral-100">
      <h1 className="text-4xl font-bold mb-12">Riepilogo ordine</h1>

      {/* SE VUOTO */}
      {items.length === 0 && (
        <div className="text-center py-24">
          <p className="text-lg text-neutral-400 mb-6">
            Il carrello è vuoto.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="bg-white text-black px-7 py-3 rounded-xl font-medium hover:bg-neutral-200 transition"
          >
            Torna ai prodotti
          </button>
        </div>
      )}

      {/* LISTA PRODOTTI */}
      {items.length > 0 && (
        <div className="space-y-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 border-b border-neutral-800 pb-6"
            >
              <div className="relative w-24 h-24 bg-[#2a160c] rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-neutral-400">Quantità: {item.qty}</p>
              </div>

              <p className="text-lg font-semibold">
                € {(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}

          {/* TOTALE */}
          <div className="pt-10 border-t border-neutral-800">
            <div className="flex justify-between text-2xl font-semibold mb-8">
              <span>Totale</span>
              <span>€ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePay}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold text-xl hover:bg-neutral-900 transition"
            >
              Paga ora
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
