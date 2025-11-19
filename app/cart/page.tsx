"use client";

import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.removeFromCart);
  const increase = useCartStore((s) => s.increaseQty);
  const decrease = useCartStore((s) => s.decreaseQty);

  const subtotal = useCartStore((s) => s.getSubtotal());
  const shipping = useCartStore((s) => s.getShipping());
  const total = useCartStore((s) => s.getTotal());

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-neutral-100">
      <h1 className="text-4xl font-bold mb-10">Il tuo carrello</h1>

      {items.length === 0 && (
        <div className="text-center py-28">
          <p className="text-neutral-400 text-lg mb-6">
            Il carrello è vuoto.
          </p>

          <button
            onClick={() => router.push("/products")}
            className="bg-white text-black px-7 py-3 rounded-xl font-medium hover:bg-neutral-200 transition"
          >
            Vai ai prodotti
          </button>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-12">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-6 items-start border-b border-neutral-800 pb-8"
            >
              <div className="relative w-28 h-28 bg-[#2a160c] rounded-xl border border-neutral-700 overflow-hidden flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-neutral-400 mt-1 text-lg">
                  € {item.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-4 mt-5">
                  <button
                    onClick={() => decrease(item.id)}
                    className="h-9 w-9 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition text-lg"
                  >
                    –
                  </button>

                  <span className="text-xl font-semibold">{item.qty}</span>

                  <button
                    onClick={() => increase(item.id)}
                    className="h-9 w-9 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => remove(item.id)}
                  className="text-red-400 text-sm mt-4 hover:underline"
                >
                  Rimuovi
                </button>
              </div>
            </div>
          ))}

          {/* SEZIONE TOTALE */}
          <div className="mt-10 border-t border-neutral-800 pt-8 space-y-4">

            <div className="flex justify-between text-lg font-medium text-neutral-300">
              <span>Subtotale:</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg font-medium text-neutral-300">
              <span>Spedizione:</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-400">Gratis</span>
                ) : (
                  `€ ${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-2xl font-bold mt-6">
              <span>Totale:</span>
              <span>€ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="
                w-full 
                py-4 
                rounded-xl 
                font-semibold 
                text-xl 
                border 
                border-[#d2a679] 
                bg-[#1a0f0a] 
                text-[#f1e4d0]
                shadow-[0_0_12px_rgba(210,166,121,0.25)]
                hover:shadow-[0_0_18px_rgba(210,166,121,0.45)]
                hover:bg-[#24140c]
                transition-all
              "
            >
              Procedi al pagamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
