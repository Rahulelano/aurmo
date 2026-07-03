import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = { id: string; name: string; price: number; image: string; qty: number };

type CartState = {
  items: CartItem[];
  wishlist: string[];
  couponCode: string | null;
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  count: () => number;
  subtotal: () => number;
  discount: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      couponCode: null,
      add: (p, qty = 1) =>
        set((s) => {
          const ex = s.items.find((i) => i.id === p.id);
          if (ex) return { items: s.items.map((i) => (i.id === p.id ? { ...i, qty: i.qty + qty } : i)) };
          return { items: [...s.items, { id: p.id, name: p.name, price: p.price, image: p.image, qty }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)) })),
      clear: () => set({ items: [], couponCode: null }),
      toggleWish: (id) =>
        set((s) => ({
          wishlist: s.wishlist.includes(id) ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id],
        })),
      applyCoupon: (code) => {
        const clean = code.trim().toUpperCase();
        if (clean === "DIVINE10") {
          set({ couponCode: clean });
          return { success: true, message: "Sacred coupon DIVINE10 applied! 10% discount applied to your offering." };
        }
        return { success: false, message: "Invalid coupon code. Try DIVINE10 for 10% off." };
      },
      removeCoupon: () => set({ couponCode: null }),
      count: () => get().items.reduce((a, i) => a + i.qty, 0),
      subtotal: () => get().items.reduce((a, i) => a + i.qty * i.price, 0),
      discount: () => {
        const sub = get().subtotal();
        if (sub === 0) return 0;
        if (get().couponCode === "DIVINE10") {
          return Math.round(sub * 0.1);
        }
        return 0;
      },
    }),
    { name: "arumo-cart" },
  ),
);

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
