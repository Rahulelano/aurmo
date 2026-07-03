import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { inr, useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const toggleWish = useCart((s) => s.toggleWish);
  const wished = useCart((s) => s.wishlist.includes(product.id));
  return (
    <div className="group relative overflow-hidden rounded-sm glass-card transition-all duration-500 hover:divine-glow">
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--ink)]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)]/90 via-transparent to-transparent" />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-sm bg-gold-gradient px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--ink)]">
              {product.badge}
            </span>
          )}
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={(e) => { e.preventDefault(); toggleWish(product.id); }}
              className={`grid h-9 w-9 place-items-center rounded-full glass-card hover:text-[color:var(--gold)] ${wished ? "text-[color:var(--gold)]" : ""}`}
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" fill={wished ? "currentColor" : "none"} />
            </button>
            <span className="grid h-9 w-9 place-items-center rounded-full glass-card">
              <Eye className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
      <div className="space-y-2 p-5">
        <div className="flex items-center gap-1.5 text-[color:var(--gold)]">
          <Star className="h-3.5 w-3.5" fill="currentColor" />
          <span className="text-xs text-[color:var(--ivory)]/70">{product.rating} · {product.reviews} reviews</span>
        </div>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-serif text-xl leading-snug text-[color:var(--ivory)] group-hover:text-[color:var(--gold)] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-[color:var(--muted-foreground)] line-clamp-1">{product.short}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg text-gold-gradient">{inr(product.price)}</span>
            {product.mrp && <span className="text-xs text-[color:var(--muted-foreground)] line-through">{inr(product.mrp)}</span>}
          </div>
          <button
            onClick={() => add(product)}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--gold)]/40 px-3 py-1.5 text-xs uppercase tracking-wider hover:bg-gold-gradient hover:text-[color:var(--ink)] hover:border-transparent transition-all"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
