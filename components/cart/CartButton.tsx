"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);

  const count = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <motion.button
      onClick={openCart}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 text-white shadow-lg hover:bg-neutral-800 transition"
    >
      <ShoppingCart size={20} />

      {count > 0 && (
        <span
          className="
            absolute -top-1 -right-1 
            bg-red-500 text-white text-[10px] 
            w-5 h-5 rounded-full 
            flex items-center justify-center 
            font-semibold shadow-md
          "
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}
