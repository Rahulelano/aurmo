import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { Ornament } from "@/components/site/Ornament";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — ARUMO | Luxury Devotional Products" },
      { name: "description", content: "Browse ARUMO's complete collection of brass idols, sacred lamps, rudraksha malas, pooja thalis, incense and temple decor." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const products = useAppStore((s) => s.products);
  const categories = useAppStore((s) => s.categories);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(35000);

  const filtered = useMemo(() => {
    let r = products.filter((p) =>
      (cat === "all" || p.category === cat) &&
      p.price <= maxPrice &&
      (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [products, q, cat, sort, maxPrice]);

  return (
    <div>
      <section className="border-b border-[color:var(--gold)]/15 bg-[color:var(--ink)]/40">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="eyebrow">The Marketplace</div>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl text-gold-gradient">The Sanctum</h1>
          <Ornament className="my-6" />
          <p className="mx-auto max-w-xl font-serif italic text-lg text-[color:var(--ivory)]/75">
            Every offering, gathered in one sacred place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-8">
            <div>
              <div className="eyebrow mb-3">Search</div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                <input
                  value={q} onChange={(e) => setQ(e.target.value)}
                  placeholder="Search offerings..."
                  className="w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[color:var(--gold)]"
                />
              </div>
            </div>
            <div>
              <div className="eyebrow mb-3">Collections</div>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <button onClick={() => setCat("all")} className={`w-full text-left py-1.5 transition-colors ${cat === "all" ? "text-[color:var(--gold)]" : "text-[color:var(--ivory)]/75 hover:text-[color:var(--gold)]"}`}>All ({products.length})</button>
                </li>
                {categories.map((c) => {
                  const n = products.filter((p) => p.category === c.slug).length;
                  if (!n) return null;
                  return (
                    <li key={c.slug}>
                      <button onClick={() => setCat(c.slug)} className={`w-full text-left py-1.5 transition-colors ${cat === c.slug ? "text-[color:var(--gold)]" : "text-[color:var(--ivory)]/75 hover:text-[color:var(--gold)]"}`}>{c.name} ({n})</button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-3">Max Price · ₹{maxPrice.toLocaleString("en-IN")}</div>
              <input type="range" min={500} max={35000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-[color:var(--gold)]" />
            </div>
          </aside>

          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--gold)]/15 pb-5">
              <div className="text-sm text-[color:var(--muted-foreground)]">{filtered.length} sacred offering{filtered.length !== 1 ? "s" : ""}</div>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-sm border border-[color:var(--gold)]/30 bg-[color:var(--card)] px-3 py-2 text-sm outline-none">
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            {filtered.length === 0 ? (
              <p className="py-20 text-center font-serif italic text-[color:var(--muted-foreground)]">No offerings match your search. Try widening the filters.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
