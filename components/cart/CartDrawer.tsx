"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, Plus, Minus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.removeFromCart);
  const increase = useCartStore((s) => s.increaseQty);
  const decrease = useCartStore((s) => s.decreaseQty);
 const getTotal = useCartStore((s) => s.getTotal);

  const router = useRouter();

  const goToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  const goToCartPage = () => {
    closeCart();
    router.push("/cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={closeCart}
          />

          {/* DRAWER */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="
              fixed top-0 right-0 
              h-full w-[90%] max-w-[420px] 
              bg-[#1b0d08] 
              z-[70] shadow-2xl border-l border-neutral-800 
              flex flex-col
            "
          >
            {/* HEADER */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
                Carrello
              </h2>
              <button
                onClick={closeCart}
                className="text-neutral-300 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-auto p-5 space-y-5">
              {items.length === 0 ? (
                <p className="text-neutral-400 text-center mt-10">
                  Il carrello è vuoto.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-neutral-800"
                  >
                    {/* IMAGE */}
                    <div className="relative w-20 h-20 bg-[#2a160c] rounded-lg border border-neutral-700 overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-neutral-100">
                        {item.name}
                      </h3>
                      <p className="text-neutral-300 text-sm">
                        € {item.price.toFixed(2)}
                      </p>

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => decrease(item.id)}
                          className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-700 transition"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="text-neutral-100 font-semibold">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => increase(item.id)}
                          className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-700 transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() => remove(item.id)}
                        className="text-red-400 text-xs mt-2 flex items-center gap-1 hover:underline"
                      >
                        <Trash size={12} /> Rimuovi
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div className="p-5 border-t border-neutral-800 space-y-4 bg-[#160a06]">
              {/* TOTAL */}
              <div className="flex justify-between text-lg font-semibold text-neutral-100">
                <span>Totale</span>
                € {getTotal().toFixed(2)}
              </div>

              {/* GO TO CART */}
              <button
                onClick={goToCartPage}
                className="
                  w-full border border-neutral-600 
                  text-neutral-100 py-2.5 rounded-lg
                  text-sm font-medium 
                  hover:bg-neutral-900 transition
                "
              >
                Vai al carrello
              </button>

              {/* CHECKOUT */}
              <button
                onClick={goToCheckout}
                className="
                  w-full bg-black text-white 
                  py-3 rounded-lg text-sm font-semibold 
                  hover:bg-neutral-900 transition
                "
              >
                Procedi al pagamento
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
