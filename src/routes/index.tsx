import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Flame, Package, Shield, Sparkles, Truck } from "lucide-react";
import heroImg from "@/assets/hero-temple.jpg";
import { useAppStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { GoldParticles } from "@/components/site/GoldParticles";
import { Ornament } from "@/components/site/Ornament";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARUMO — Divine Output | Premium Devotional & Spiritual Store" },
      { name: "description", content: "Bring divine blessings home with ARUMO's luxury spiritual & devotional products — brass idols, sacred lamps, rudraksha, and temple decor." },
      { property: "og:title", content: "ARUMO — Divine Output" },
      { property: "og:description", content: "Premium spiritual & devotional products crafted for every sacred moment." },
    ],
  }),
  component: Home,
});

function Home() {
  const categories = useAppStore((s) => s.categories);
  const products = useAppStore((s) => s.products);
  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--background)]/40 via-[color:var(--background)]/55 to-[color:var(--background)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)]" />
        </div>
        <GoldParticles count={26} />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-6 py-32 text-center">
          <div className="eyebrow mb-6 text-[color:var(--gold-soft)]">EST. IN DEVOTION · MMXXV</div>
          <h1 className="max-w-4xl font-display text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">
            <span className="block text-[color:var(--ivory)]">Bring Divine</span>
            <span className="block text-gold-gradient">Blessings Home</span>
          </h1>
          <Ornament className="my-8" />
          <p className="max-w-2xl font-serif text-xl italic text-[color:var(--ivory)]/85 sm:text-2xl">
            Premium spiritual & devotional products, crafted by hand for every sacred moment of your home.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link to="/shop" className="group inline-flex items-center gap-2 rounded-sm bg-gold-gradient px-8 py-4 text-sm font-medium uppercase tracking-widest text-[color:var(--ink)] animate-pulse-glow">
              Shop Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/categories" className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--gold)]/50 px-8 py-4 text-sm font-medium uppercase tracking-widest text-[color:var(--ivory)] hover:bg-[color:var(--gold)]/10">
              Explore Collections
            </Link>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-widest text-[color:var(--ivory)]/60">
            <span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Energized before dispatch</span>
            <span className="flex items-center gap-2"><Award className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Hand-crafted in Bharat</span>
            <span className="flex items-center gap-2"><Package className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Temple-blessed packaging</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="text-center">
          <div className="eyebrow">The Atelier</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Featured Collections</h2>
          <Ornament className="my-6" />
          <p className="mx-auto max-w-xl font-serif italic text-lg text-[color:var(--ivory)]/75">
            Eight worlds of devotion, each curated for the discerning householder.
          </p>
        </div>
        <div className="mt-16 relative px-0 md:px-12">
          <Carousel
            opts={{ align: "start", dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-5">
              {categories.map((c, i) => (
                <CarouselItem key={c.slug} className="pl-5 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Link
                    to="/categories"
                    className="group relative block overflow-hidden rounded-sm p-8 transition-all hover:divine-glow border border-[color:var(--gold)]/20"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="absolute inset-0">
                      <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)] via-[color:var(--ink)]/60 to-[color:var(--ink)]/30 group-hover:via-[color:var(--ink)]/40 transition-colors" />
                    </div>
                    <div className="relative flex h-[16rem] flex-col justify-between z-10">
                      <span className="font-display text-3xl text-[color:var(--gold)]/60 group-hover:text-[color:var(--gold)] transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-2xl text-[color:var(--ivory)] group-hover:text-[color:var(--gold)] transition-colors">{c.name}</h3>
                        <p className="mt-1 text-sm text-[color:var(--ivory)]/70">{c.desc}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[color:var(--gold)] opacity-0 transition-opacity group-hover:opacity-100">
                          Explore <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="flex left-2 md:-left-12 border-[color:var(--gold)]/30 bg-[color:var(--ink)]/50 backdrop-blur-md text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] z-20" />
            <CarouselNext className="flex right-2 md:-right-12 border-[color:var(--gold)]/30 bg-[color:var(--ink)]/50 backdrop-blur-md text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] z-20" />
          </Carousel>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="border-t border-[color:var(--gold)]/15 bg-[color:var(--ink)]/30">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="eyebrow">Most Cherished</div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">Bestsellers</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[color:var(--gold)] hover:gap-3 transition-all">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="text-center">
          <div className="eyebrow">The ARUMO Promise</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Why Choose ARUMO</h2>
          <Ornament className="my-6" />
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Shield, t: "Authentic", d: "Every piece sourced from heritage workshops with documented lineage." },
            { icon: Sparkles, t: "Energized", d: "Items are blessed at temple before dispatch — never just packaged." },
            { icon: Award, t: "Heirloom Quality", d: "Crafted to be passed down generations, not replaced seasonally." },
            { icon: Truck, t: "White-Glove Delivery", d: "Insured, tracked, and gift-ready packaging on every order." },
            { icon: Flame, t: "Sacred Service", d: "A dedicated devotional concierge for every order, every question." },
          ].map((f) => (
            <div key={f.t} className="rounded-sm glass-card p-7 text-center transition-all hover:divine-glow">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-[color:var(--ink)]">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-xl text-[color:var(--ivory)]">{f.t}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVINE QUOTE */}
      <section className="relative overflow-hidden border-y border-[color:var(--gold)]/15 bg-[color:var(--ink)]/60 py-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 animate-ray-spin"
               style={{ background: "conic-gradient(from 0deg, transparent, color-mix(in oklab, var(--gold) 25%, transparent), transparent, color-mix(in oklab, var(--gold) 25%, transparent), transparent)" }} />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <svg className="mx-auto h-10 w-10 text-[color:var(--gold)]" viewBox="0 0 24 24" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"/></svg>
          <blockquote className="mt-6 font-serif text-3xl italic leading-relaxed text-[color:var(--ivory)] sm:text-4xl">
            "When the lamp is lit with devotion, the entire home becomes a temple."
          </blockquote>
          <div className="mt-6 eyebrow">— Sacred Tamil Proverb</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="text-center">
          <div className="eyebrow">From Our Devotees</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Whispered Blessings</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { q: "The Ganesha idol arrived as if carried from the temple itself — wrapped in silk, with a hand-written blessing. Heirloom in every sense.", n: "Lakshmi Iyer", c: "Chennai" },
            { q: "Our home mandir from ARUMO has become the soul of our living room. Visitors stop and bow without being asked.", n: "Rohan Mehta", c: "Mumbai" },
            { q: "I gifted the rudraksha mala to my mother on her 60th. She wept. That is the only review I can offer.", n: "Priya Anand", c: "Bengaluru" },
          ].map((t) => (
            <figure key={t.n} className="rounded-sm glass-card p-8">
              <div className="flex gap-0.5 text-[color:var(--gold)]">
                {Array.from({ length: 5 }).map((_, i) => <span key={i}>★</span>)}
              </div>
              <blockquote className="mt-4 font-serif text-lg italic leading-relaxed text-[color:var(--ivory)]/90">"{t.q}"</blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-medium text-[color:var(--gold)]">{t.n}</div>
                <div className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">{t.c}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
