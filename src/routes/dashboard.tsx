import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Heart, MapPin, Package, RotateCcw, User } from "lucide-react";
import { inr, useCart } from "@/lib/cart";
import { useAppStore } from "@/lib/store";
import { Ornament } from "@/components/site/Ornament";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Your Sanctum — ARUMO" }] }),
  component: Dashboard,
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "returns", label: "Returns", icon: RotateCcw },
  { id: "notifications", label: "Notifications", icon: Bell },
] as const;

function Dashboard() {
  const products = useAppStore((s) => s.products);
  const orders = useAppStore((s) => s.orders);
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("profile");
  const wishlist = useCart((s) => s.wishlist);
  const wishItems = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <div className="eyebrow">Namaste, Devotee</div>
        <h1 className="mt-3 font-display text-5xl text-gold-gradient">Your Sanctum</h1>
        <Ornament className="my-6" />
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-sm glass-card p-3 h-fit">
          <div className="border-b border-[color:var(--gold)]/15 p-4">
            <div className="font-serif text-lg">Aravind R.</div>
            <div className="text-xs text-[color:var(--muted-foreground)]">aravind@arumo.in</div>
          </div>
          <nav className="mt-2 space-y-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors ${tab === t.id ? "bg-[color:var(--gold)]/10 text-[color:var(--gold)]" : "text-[color:var(--ivory)]/75 hover:bg-[color:var(--gold)]/5"}`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="rounded-sm glass-card p-8 min-h-[60vh]">
          {tab === "profile" && (
            <div>
              <h2 className="font-display text-2xl">Your Profile</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <F label="Full Name" value="Aravind R." />
                <F label="Email" value="aravind@arumo.in" />
                <F label="Phone" value="+91 98404 00000" />
                <F label="Date of Birth" value="14 Mar 1992" />
              </div>
              <button className="mt-8 rounded-sm bg-gold-gradient px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-[color:var(--ink)]">Save Changes</button>
            </div>
          )}
          {tab === "orders" && (
            <div>
              <h2 className="font-display text-2xl">Your Orders</h2>
              <div className="mt-6 space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="flex flex-wrap items-center gap-4 rounded-sm gold-border p-5">
                    <div className="flex-1">
                      <div className="font-medium">{o.id}</div>
                      <div className="text-xs text-[color:var(--muted-foreground)]">{o.date} · {o.itemsCount ?? (Array.isArray(o.items) ? o.items.length : 1)} item{(o.itemsCount ?? (Array.isArray(o.items) ? o.items.length : 1)) > 1 ? "s" : ""}</div>
                    </div>
                    <span className="rounded-sm bg-[color:var(--gold)]/10 px-3 py-1 text-xs text-[color:var(--gold)]">{o.status}</span>
                    <div className="font-display text-lg text-gold-gradient">{inr(o.total)}</div>
                    <button className="text-xs uppercase tracking-widest text-[color:var(--gold)] hover:underline">View</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "wishlist" && (
            <div>
              <h2 className="font-display text-2xl">Your Wishlist</h2>
              {wishItems.length === 0 ? (
                <p className="mt-6 font-serif italic text-[color:var(--muted-foreground)]">No offerings saved yet. <Link to="/shop" className="text-[color:var(--gold)] underline">Browse the shop</Link>.</p>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {wishItems.map((p) => (
                    <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="flex gap-4 rounded-sm gold-border p-3 hover:bg-[color:var(--gold)]/5">
                      <div className="h-20 w-20 overflow-hidden rounded-sm"><img src={p.image} alt="" className="h-full w-full object-cover" /></div>
                      <div>
                        <div className="font-serif text-lg">{p.name}</div>
                        <div className="mt-1 text-[color:var(--gold)]">{inr(p.price)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
          {tab === "addresses" && (
            <div>
              <h2 className="font-display text-2xl">Saved Addresses</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-sm gold-border p-5">
                  <div className="eyebrow text-[color:var(--gold)]">Default · Home</div>
                  <p className="mt-2 text-sm">Aravind R.<br/>12, Sannathi Street, Mylapore<br/>Chennai 600004, Tamil Nadu</p>
                </div>
                <button className="rounded-sm border border-dashed border-[color:var(--gold)]/40 p-5 text-sm uppercase tracking-widest text-[color:var(--gold)] hover:bg-[color:var(--gold)]/5">+ Add Address</button>
              </div>
            </div>
          )}
          {tab === "returns" && (
            <div>
              <h2 className="font-display text-2xl">Returns & Exchanges</h2>
              <p className="mt-3 font-serif italic text-[color:var(--muted-foreground)]">No active returns. Your blessings remain with you.</p>
            </div>
          )}
          {tab === "notifications" && (
            <div>
              <h2 className="font-display text-2xl">Notifications</h2>
              <div className="mt-6 space-y-3">
                {[
                  "Your order ARM-2401 has been energized at the temple.",
                  "New collection launched: Mahalakshmi Series — early access for devotees.",
                  "Diwali offering: Complimentary brass deepam on orders above ₹4,999.",
                ].map((n) => (
                  <div key={n} className="rounded-sm gold-border p-4 text-sm">{n}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function F({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input defaultValue={value} className="mt-2 w-full rounded-sm border border-[color:var(--gold)]/25 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]" />
    </label>
  );
}
