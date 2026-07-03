import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, ShoppingBag, Sparkles, Star, Truck, Shield } from "lucide-react";
import { useState } from "react";
import { getProductFromStore, useAppStore } from "@/lib/store";
import { inr, useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { Ornament } from "@/components/site/Ornament";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProductFromStore(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.name} — ARUMO` },
            { name: "description", content: loaderData.short },
            { property: "og:title", content: `${loaderData.name} — ARUMO` },
            { property: "og:description", content: loaderData.short },
            { property: "og:image", content: loaderData.image },
          ],
        }
      : {},
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Offering not found</h1>
      <Link to="/shop" className="mt-6 inline-block rounded-sm bg-gold-gradient px-6 py-3 text-sm text-[color:var(--ink)]">Back to Shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const loadedP = Route.useLoaderData();
  const allProducts = useAppStore((s) => s.products);
  const p = allProducts.find((x) => x.id === loadedP.id) || loadedP;
  const [qty, setQty] = useState(1);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const add = useCart((s) => s.add);
  const toggleWish = useCart((s) => s.toggleWish);
  const wished = useCart((s) => s.wishlist.includes(p.id));
  const related = allProducts.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  const galleryImages = p.images && p.images.length > 0 ? p.images : [p.image];
  const displayImage = galleryImages[selectedImgIndex] || p.image;

  return (
    <div>
      <div className="border-b border-[color:var(--gold)]/15 bg-[color:var(--ink)]/30">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">
          <Link to="/" className="hover:text-[color:var(--gold)]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-[color:var(--gold)]">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-[color:var(--ivory)]">{p.name}</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="group relative aspect-square overflow-hidden rounded-sm gold-border bg-[color:var(--ink)]">
            <img src={displayImage} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-sm bg-[color:var(--ink)]/70 px-3 py-1.5 text-xs backdrop-blur">
              <Sparkles className="h-3 w-3 text-[color:var(--gold)]" /> Energized · Hover to zoom
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                onClick={() => setSelectedImgIndex(i)}
                className={`aspect-square overflow-hidden rounded-sm border cursor-pointer transition-all ${
                  selectedImgIndex === i
                    ? "border-[color:var(--gold)] scale-105 shadow-md opacity-100"
                    : "border-[color:var(--gold)]/20 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          {p.badge && <span className="inline-block rounded-sm bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--ink)]">{p.badge}</span>}
          <h1 className="mt-4 font-display text-4xl text-[color:var(--ivory)] sm:text-5xl">{p.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex gap-0.5 text-[color:var(--gold)]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" fill={i < Math.round(p.rating) ? "currentColor" : "none"} />)}
            </div>
            <span className="text-[color:var(--muted-foreground)]">{p.rating} · {p.reviews} reviews</span>
          </div>
          <p className="mt-6 font-serif text-lg italic text-[color:var(--ivory)]/85">{p.short}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl text-gold-gradient">{inr(p.price)}</span>
            {p.mrp && (
              <>
                <span className="text-base text-[color:var(--muted-foreground)] line-through">{inr(p.mrp)}</span>
                <span className="rounded-sm bg-[color:var(--maroon)]/40 px-2 py-0.5 text-xs text-[color:var(--ivory)]">Save {Math.round(((p.mrp - p.price) / p.mrp) * 100)}%</span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-[color:var(--muted-foreground)]">Inclusive of all taxes. Free shipping above ₹999.</p>

          <p className="mt-8 leading-relaxed text-[color:var(--ivory)]/85">{p.description}</p>

          <div className="mt-8">
            <h3 className="eyebrow mb-3">Spiritual Benefits</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {p.benefits.map((b: string) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span className="text-[color:var(--ivory)]/85">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 sticky bottom-4 z-30 flex flex-col gap-4 rounded-sm glass-card p-5 sm:flex-row sm:items-center">
            <div className="inline-flex items-center rounded-sm border border-[color:var(--gold)]/30">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center hover:text-[color:var(--gold)]"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center hover:text-[color:var(--gold)]"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => add(p, qty)} className="flex-1 inline-flex items-center justify-center gap-2 rounded-sm bg-gold-gradient px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-[color:var(--ink)] hover:opacity-90">
              <ShoppingBag className="h-4 w-4" /> Add to Cart · {inr(p.price * qty)}
            </button>
            <button onClick={() => toggleWish(p.id)} className={`grid h-12 w-12 place-items-center rounded-sm border border-[color:var(--gold)]/30 hover:text-[color:var(--gold)] ${wished ? "text-[color:var(--gold)] bg-[color:var(--gold)]/10" : ""}`} aria-label="Wishlist">
              <Heart className="h-5 w-5" fill={wished ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-sm gold-border p-4">
              <Truck className="h-5 w-5 text-[color:var(--gold)]" />
              <div><div className="font-medium">White-glove delivery</div><div className="text-xs text-[color:var(--muted-foreground)]">3–6 business days · insured</div></div>
            </div>
            <div className="flex items-center gap-3 rounded-sm gold-border p-4">
              <Shield className="h-5 w-5 text-[color:var(--gold)]" />
              <div><div className="font-medium">7-day sacred return</div><div className="text-xs text-[color:var(--muted-foreground)]">Easy returns, no questions</div></div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="eyebrow mb-4">Specifications</h3>
            <dl className="divide-y divide-[color:var(--gold)]/15 rounded-sm gold-border">
              {p.specs.map((s: {label:string;value:string}) => (
                <div key={s.label} className="flex justify-between px-5 py-3 text-sm">
                  <dt className="text-[color:var(--muted-foreground)]">{s.label}</dt>
                  <dd className="text-[color:var(--ivory)]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-[color:var(--gold)]/15 bg-[color:var(--ink)]/30">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="text-center">
              <div className="eyebrow">Curated For You</div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">You may also love</h2>
              <Ornament className="my-6" />
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => <ProductCard key={r.id} product={r} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
