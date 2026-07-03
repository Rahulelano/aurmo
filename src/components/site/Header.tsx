import { Link } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User, Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo (2).png";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";
import { Ornament } from "./Ornament";
const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Collections" },
  { to: "/admin", label: "Admin Panel" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[color:var(--gold)]/15 bg-[color:var(--background)]/75 backdrop-blur-xl">
        <div className="absolute inset-x-0 bottom-0 h-px ornament-divider" />
        <div className="mx-auto flex min-h-[6rem] py-2 max-w-7xl items-center px-6 relative">
          {/* Left Side: Hamburger Menu */}
          <div className="flex items-center gap-6">
            <button onClick={() => setOpen(true)} className="rounded p-2 text-[color:var(--ivory)]/80 hover:text-[color:var(--gold)] transition-colors -ml-2" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </button>
            <Link
              to="/admin"
              className="hidden md:inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)] hover:bg-gold-gradient hover:text-[color:var(--ink)] transition-all shadow-sm"
            >
              <Shield className="h-3.5 w-3.5" /> Admin Portal
            </Link>
          </div>

          {/* Center: Logo (Absolute Centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="flex items-center justify-center">
              <img src={logo} alt="Logo" width={120} height={120} className="h-24 w-auto object-contain" />
            </Link>
          </div>

          {/* Right Side: Icons */}
          <div className="ml-auto flex items-center gap-1">
            <button className="rounded p-2 text-[color:var(--ivory)]/80 hover:text-[color:var(--gold)]" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/dashboard" className="hidden sm:block rounded p-2 text-[color:var(--ivory)]/80 hover:text-[color:var(--gold)]" aria-label="Account">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/dashboard" className="hidden sm:block rounded p-2 text-[color:var(--ivory)]/80 hover:text-[color:var(--gold)]" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="relative rounded p-2 text-[color:var(--ivory)]/80 hover:text-[color:var(--gold)]" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-gold-gradient text-[10px] font-semibold text-[color:var(--ink)]">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Fullscreen Animated Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-[color:var(--ink)]/95 backdrop-blur-2xl"
          >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 min-h-[6rem]">
              <button
                onClick={() => setOpen(false)}
                className="rounded p-2 text-[color:var(--ivory)]/80 hover:text-[color:var(--gold)] transition-colors -ml-2"
                aria-label="Close menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-20">
              <Ornament className="mb-4" />
              {nav.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl sm:text-4xl tracking-widest text-[color:var(--ivory)] hover:text-[color:var(--gold)] transition-colors"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <Ornament className="mt-4" />
            </div>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8, duration: 1 }}
              className="py-8 text-center eyebrow text-[color:var(--gold)]/60"
            >
              DIVINE OUTPUT
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
