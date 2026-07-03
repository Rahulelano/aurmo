import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Ornament } from "@/components/site/Ornament";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Collections — ARUMO" },
      { name: "description", content: "Explore ARUMO's devotional collections — each crafted with reverence." },
    ],
  }),
  component: Categories,
});

function Categories() {
  const categories = useAppStore((s) => s.categories);
  const products = useAppStore((s) => s.products);
  return (
    <div>
      <section className="border-b border-[color:var(--gold)]/15 bg-[color:var(--ink)]/40">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="eyebrow">The Eight Paths</div>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl text-gold-gradient">Our Collections</h1>
          <Ornament className="my-6" />
          <p className="mx-auto max-w-xl font-serif italic text-lg text-[color:var(--ivory)]/75">
            Each collection is a doorway. Step through the one that calls to you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 space-y-20">
        {categories.map((c, i) => {
          const items = products.filter((p) => p.category === c.slug);
          return (
            <section key={c.slug} className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <div className="eyebrow text-[color:var(--gold)]">Collection {String(i + 1).padStart(2, "0")}</div>
                <h2 className="mt-3 font-display text-4xl text-[color:var(--ivory)]">{c.name}</h2>
                <p className="mt-3 font-serif text-lg italic text-[color:var(--ivory)]/75">{c.desc}</p>
                <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{items.length} offering{items.length !== 1 ? "s" : ""}</p>
                <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[color:var(--gold)] hover:gap-3 transition-all">
                  Browse all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              {items.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {items.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              ) : (
                <div className="rounded-sm gold-border p-12 text-center">
                  <p className="font-serif italic text-[color:var(--muted-foreground)]">New offerings being prepared with care. Returning soon.</p>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
