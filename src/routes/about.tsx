import { createFileRoute } from "@tanstack/react-router";
import { Ornament } from "@/components/site/Ornament";
import logo from "@/assets/logo (2).png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — ARUMO" },
      { name: "description", content: "ARUMO began as a vow. Read the story of how a small atelier became India's most reverent devotional house." },
    ],
  }),
  component: About,
});

const timeline = [
  { year: "2019", t: "A Vow at Sunrise", d: "Founder Aravind Mohan returns from Kashi with a simple promise — to make sacred objects worthy of the homes that receive them." },
  { year: "2020", t: "The First Atelier", d: "A workshop opens in Swamimalai, partnering with five generations of sthapati brass-casters." },
  { year: "2022", t: "ARUMO is Born", d: "The brand launches with seven offerings, each blessed at Brihadeeswara temple before dispatch." },
  { year: "2024", t: "The Eight Paths", d: "Eight curated collections, 60+ artisans, and a single quiet promise — divinity, undiluted." },
  { year: "2025", t: "Divine Output", d: "ARUMO opens its first flagship sanctum in Chennai, blending heritage craft with modern reverence." },
];

function About() {
  return (
    <div>
      <section className="relative border-b border-[color:var(--gold)]/15 bg-[color:var(--ink)]/40">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <img src={logo} alt="" width={160} height={160} className="mx-auto h-32 w-auto object-contain opacity-90" />
          <div className="eyebrow mt-6">Our Story</div>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl text-gold-gradient">A Quiet Devotion</h1>
          <Ornament className="my-8" />
          <p className="font-serif text-xl italic leading-relaxed text-[color:var(--ivory)]/85 sm:text-2xl">
            ARUMO began not as a business, but as a vow — that the objects which carry our prayers should be as luminous as the prayers themselves.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-16 md:grid-cols-3">
          {[
            { t: "Mission", d: "To restore reverence to the everyday ritual — by crafting devotional objects of heirloom quality, energized in temple, delivered with grace." },
            { t: "Vision", d: "A world where every Indian home holds at least one object that is not merely owned, but worshipped." },
            { t: "Philosophy", d: "Divinity is in the detail. The weight of the brass, the silk of the knot, the wisp of incense — all are prayer made tangible." },
          ].map((s) => (
            <div key={s.t}>
              <div className="eyebrow mb-3">{s.t}</div>
              <p className="font-serif text-lg leading-relaxed text-[color:var(--ivory)]/85">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[color:var(--gold)]/15 bg-[color:var(--ink)]/30">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="text-center">
            <div className="eyebrow">The Journey</div>
            <h2 className="mt-3 font-display text-4xl">A Lineage of Light</h2>
            <Ornament className="my-6" />
          </div>
          <div className="mt-14 relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[color:var(--gold)]/60 to-transparent md:left-1/2" />
            <ol className="space-y-12">
              {timeline.map((e, i) => (
                <li key={e.year} className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`md:text-${i % 2 ? "left" : "right"} pl-12 md:pl-0 ${i % 2 ? "md:pl-12" : "md:pr-12"}`}>
                    <div className="font-display text-4xl text-gold-gradient">{e.year}</div>
                    <h3 className="mt-1 font-serif text-2xl">{e.t}</h3>
                    <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{e.d}</p>
                  </div>
                  <span className="absolute left-2.5 top-3 grid h-4 w-4 place-items-center rounded-full bg-gold-gradient ring-4 ring-[color:var(--background)] md:left-1/2 md:-translate-x-1/2" />
                  <div />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="eyebrow">A Note from the Founder</div>
        <Ornament className="my-6" />
        <blockquote className="font-serif text-2xl italic leading-relaxed text-[color:var(--ivory)]/90">
          "Each piece that leaves our atelier carries a small portion of our team's quiet devotion. Light the lamp slowly. The blessing is in the slowness."
        </blockquote>
        <div className="mt-8">
          <div className="font-display text-lg text-[color:var(--gold)]">Aravind Mohan</div>
          <div className="eyebrow mt-1">Founder · ARUMO</div>
        </div>
      </section>
    </div>
  );
}
