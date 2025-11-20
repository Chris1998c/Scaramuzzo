"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;

  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;

  getSubtotal: () => number;
  getShipping: () => number;
  getTotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // ➕ AGGIUNGI AL CARRELLO
      addToCart: (item) => {
        const items = get().items;
        const existing = items.find((i) => i.id === item.id);

        const updated = existing
          ? items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + 1 } : i
            )
          : [...items, { ...item, qty: 1 }];

        set({ items: updated, isOpen: true });
      },

      // 🗑 RIMUOVI
      removeFromCart: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

      // ➕ +1
      increaseQty: (id) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        }),

      // ➖ -1
      decreaseQty: (id) =>
        set({
          items: get().items
            .map((i) =>
              i.id === id ? { ...i, qty: i.qty - 1 } : i
            )
            .filter((i) => i.qty > 0),
        }),

      clearCart: () => set({ items: [] }),

      // 📌 SUBTOTALE
      getSubtotal: () =>
        get().items.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        ),

      // 📌 SPEDIZIONE: 7€ sotto 49€, gratis sopra
      getShipping: () => {
        const subtotal = get().items.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        );

        return subtotal >= 49 ? 0 : 7;
      },

      // 📌 TOTALE FINALE
      getTotal: () => {
        const subtotal = get().items.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        );
        const shipping = subtotal >= 49 ? 0 : 7;

        return subtotal + shipping;
      },
    }),
    {
      name: "scaramuzzo-cart",
    }
  )
);
