import { Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./SocialIcons";
import logo from "@/assets/logo (2).png";
import { Ornament } from "./Ornament";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[color:var(--gold)]/15 bg-[color:var(--ink)]/60">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <Ornament className="mb-10" />
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <img src={logo} alt="Logo" width={160} height={160} className="h-28 w-auto object-contain" />
            <p className="mt-5 max-w-sm font-serif text-lg italic text-[color:var(--ivory)]/75">
              "May every flame you light find its way home."
            </p>
            <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">
              ARUMO crafts heirloom devotional objects for the modern Indian home — energized, certified, and shipped with reverence.
            </p>
          </div>
          <FooterCol title="Shop" links={[["/shop","All Products"],["/categories","Collections"],["/shop","Bestsellers"],["/shop","New Arrivals"]]} />
          <FooterCol title="Atelier" links={[["/about","Our Story"],["/blog","Journal"],["/contact","Contact"],["/dashboard","Account"]]} />
          <FooterCol title="Service" links={[["/contact","Shipping"],["/contact","Returns"],["/contact","Gifting"],["/contact","Custom Orders"]]} />
        </div>

        <div className="mt-14 grid gap-6 rounded-sm gold-border p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="eyebrow">Receive Divine Updates</div>
            <h3 className="mt-2 font-display text-2xl text-gold-gradient">Letters from the temple</h3>
            <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">New collections, festival rituals, and quiet reflections — never more than twice a month.</p>
          </div>
          <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-4 py-3 text-sm outline-none focus:border-[color:var(--gold)]"
            />
            <button className="inline-flex items-center gap-2 rounded-sm bg-gold-gradient px-5 py-3 text-sm font-medium text-[color:var(--ink)] hover:opacity-90">
              Subscribe <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[color:var(--gold)]/15 pt-8 text-sm text-[color:var(--muted-foreground)] md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} ARUMO · Divine Output. Crafted in Bharat.</div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-[color:var(--gold)]"><InstagramIcon className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-[color:var(--gold)]"><FacebookIcon className="h-4 w-4" /></a>
            <a href="#" aria-label="Youtube" className="hover:text-[color:var(--gold)]"><YoutubeIcon className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="eyebrow mb-4">{title}</div>
      <ul className="space-y-3 text-sm">
        {links.map(([to, label]) => (
          <li key={label}>
            <Link to={to} className="text-[color:var(--ivory)]/75 hover:text-[color:var(--gold)]">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
