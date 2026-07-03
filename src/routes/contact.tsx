import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/site/SocialIcons";
import { Ornament } from "@/components/site/Ornament";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ARUMO" },
      { name: "description", content: "Reach our devotional concierge — by phone, WhatsApp or email. The ARUMO atelier in Chennai welcomes you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <section className="border-b border-[color:var(--gold)]/15 bg-[color:var(--ink)]/40">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="eyebrow">Speak With Us</div>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl text-gold-gradient">The Threshold</h1>
          <Ornament className="my-6" />
          <p className="mx-auto max-w-xl font-serif italic text-lg text-[color:var(--ivory)]/75">
            Our devotional concierge responds within a single sunrise.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            {[
              { icon: MapPin, t: "The Atelier", d: "12, Sannathi Street, Mylapore\nChennai 600004, Tamil Nadu" },
              { icon: Phone, t: "By Telephone", d: "+91 98404 00000\nMon — Sat · 9 am to 8 pm IST" },
              { icon: Mail, t: "By Letter", d: "concierge@arumo.in\nReplies within one sunrise" },
              { icon: MessageCircle, t: "WhatsApp", d: "+91 98404 00000\nFor immediate blessings" },
            ].map((c) => (
              <div key={c.t} className="flex gap-4 rounded-sm glass-card p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-gold-gradient text-[color:var(--ink)]"><c.icon className="h-5 w-5" /></div>
                <div>
                  <div className="eyebrow">{c.t}</div>
                  <div className="mt-1.5 whitespace-pre-line text-sm text-[color:var(--ivory)]/85">{c.d}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <span className="eyebrow">Follow</span>
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-sm gold-border hover:bg-[color:var(--gold)]/10"><InstagramIcon className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-sm gold-border hover:bg-[color:var(--gold)]/10"><FacebookIcon className="h-4 w-4" /></a>
              <a href="#" aria-label="Youtube" className="grid h-10 w-10 place-items-center rounded-sm gold-border hover:bg-[color:var(--gold)]/10"><YoutubeIcon className="h-4 w-4" /></a>
              <a href="https://wa.me/919840400000" target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-2 rounded-sm bg-gold-gradient px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-[color:var(--ink)]">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5 rounded-sm glass-card p-8">
            <h2 className="font-display text-3xl">Send a Message</h2>
            <p className="text-sm text-[color:var(--muted-foreground)]">For custom orders, bulk gifting, or any sacred enquiry.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow">Name</span>
                <input required className="mt-2 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]" />
              </label>
              <label className="block">
                <span className="eyebrow">Email</span>
                <input type="email" required className="mt-2 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]" />
              </label>
            </div>
            <label className="block">
              <span className="eyebrow">Subject</span>
              <input className="mt-2 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]" />
            </label>
            <label className="block">
              <span className="eyebrow">Your Message</span>
              <textarea required rows={5} className="mt-2 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-4 py-3 text-sm outline-none focus:border-[color:var(--gold)]" />
            </label>
            <button className="inline-flex items-center gap-2 rounded-sm bg-gold-gradient px-6 py-3 text-sm font-medium uppercase tracking-widest text-[color:var(--ink)]">
              Send Message <Send className="h-4 w-4" />
            </button>
            {sent && <p className="font-serif italic text-[color:var(--gold)]">Your message has reached the sanctum. A reply will follow.</p>}
          </form>
        </div>

        <div className="mt-14 overflow-hidden rounded-sm gold-border">
          <iframe
            title="ARUMO Atelier Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=80.265%2C13.029%2C80.275%2C13.039&layer=mapnik"
            className="h-80 w-full grayscale opacity-90"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
