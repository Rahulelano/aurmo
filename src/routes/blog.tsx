import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Ornament } from "@/components/site/Ornament";
import hero from "@/assets/hero-temple.jpg";
import incense from "@/assets/product-incense.jpg";
import lamp from "@/assets/product-lamp.jpg";
import thali from "@/assets/product-thali.jpg";
import rudraksha from "@/assets/product-rudraksha.jpg";
import mandir from "@/assets/product-mandir.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — ARUMO" },
      { name: "description", content: "Reflections on spiritual lifestyle, temple traditions, pooja guides, festivals and divine wisdom from the ARUMO journal." },
    ],
  }),
  component: Blog,
});

const posts = [
  { slug: "1", title: "How to set up your first home mandir", cat: "Pooja Guides", read: "8 min", img: mandir, excerpt: "From orientation to the very first lamp — a practical, reverent guide to creating sacred space at home." },
  { slug: "2", title: "The five sacred mukhis and what they offer", cat: "Divine Wisdom", read: "6 min", img: rudraksha, excerpt: "An accessible primer on rudraksha varieties — their meanings, their wearers, and how to choose with intention." },
  { slug: "3", title: "Diwali, beyond the lights", cat: "Festival", read: "5 min", img: lamp, excerpt: "What the deepam quietly teaches us, long after the festival has ended." },
  { slug: "4", title: "Choosing your daily incense", cat: "Spiritual Lifestyle", read: "4 min", img: incense, excerpt: "A short guide to selecting incense that supports your particular sadhana." },
  { slug: "5", title: "The morning thali ritual", cat: "Temple Traditions", read: "7 min", img: thali, excerpt: "How South Indian households still begin the day with a few sacred minutes around the brass thali." },
] as const;

const featured = { slug: "f", title: "The art of being a devotee in modern times", cat: "Editor's Letter", read: "10 min", img: hero, excerpt: "Devotion is not a museum object. It is a daily, demanding, joyful practice — and our homes can be the first temple." };

function Blog() {
  return (
    <div>
      <section className="border-b border-[color:var(--gold)]/15 bg-[color:var(--ink)]/40">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="eyebrow">The Journal</div>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl text-gold-gradient">Letters from the Sanctum</h1>
          <Ornament className="my-6" />
          <p className="mx-auto max-w-xl font-serif italic text-lg text-[color:var(--ivory)]/75">
            Reflections, rituals, and recipes for a life lived close to the divine.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <article className="group grid gap-8 overflow-hidden rounded-sm glass-card lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <img src={featured.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center p-10">
            <div className="eyebrow text-[color:var(--gold)]">{featured.cat} · {featured.read}</div>
            <h2 className="mt-3 font-display text-4xl text-[color:var(--ivory)] group-hover:text-[color:var(--gold)] transition-colors">{featured.title}</h2>
            <p className="mt-4 font-serif text-lg italic text-[color:var(--ivory)]/80">{featured.excerpt}</p>
            <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[color:var(--gold)] hover:gap-3 transition-all w-fit">
              Read essay <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="group flex flex-col overflow-hidden rounded-sm glass-card transition-all hover:divine-glow">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-4 top-4 rounded-sm bg-[color:var(--ink)]/70 px-2.5 py-1 text-[10px] uppercase tracking-widest backdrop-blur">{p.cat}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">{p.read} read</div>
                <h3 className="mt-2 font-serif text-xl text-[color:var(--ivory)] group-hover:text-[color:var(--gold)] transition-colors">{p.title}</h3>
                <p className="mt-3 text-sm text-[color:var(--muted-foreground)] flex-1">{p.excerpt}</p>
                <Link to="/blog" className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[color:var(--gold)]">
                  Continue reading <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
