import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, Tag, ArrowRight, Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { inr, useCart } from "@/lib/cart";
import { Ornament } from "@/components/site/Ornament";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — ARUMO" }] }),
  component: Cart,
});

function Cart() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const couponCode = useCart((s) => s.couponCode);
  const applyCoupon = useCart((s) => s.applyCoupon);
  const removeCoupon = useCart((s) => s.removeCoupon);
  const discount = useCart((s) => s.discount());
  const [couponInput, setCouponInput] = useState(couponCode || "");
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount) + shipping;

  const handleApplyCoupon = (codeToApply?: string) => {
    const targetCode = codeToApply ?? couponInput;
    if (!targetCode.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }
    const res = applyCoupon(targetCode);
    if (res.success) {
      toast.success(res.message);
      setCouponInput(targetCode.trim().toUpperCase());
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <div className="eyebrow">Your Offering Basket</div>
        <h1 className="mt-3 font-display text-5xl text-gold-gradient">The Cart</h1>
        <Ornament className="my-6" />
      </div>

      {items.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md rounded-sm glass-card p-12 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-[color:var(--gold)]/60" />
          <p className="mt-5 font-serif text-xl italic">Your basket awaits its first offering.</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-sm bg-gold-gradient px-6 py-3 text-sm font-medium uppercase tracking-widest text-[color:var(--ink)]">
            Begin browsing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {items.map((i) => (
              <div key={i.id} className="flex gap-5 rounded-sm glass-card p-4">
                <Link to="/product/$id" params={{ id: i.id }} className="block h-28 w-28 shrink-0 overflow-hidden rounded-sm bg-[color:var(--ink)]">
                  <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to="/product/$id" params={{ id: i.id }} className="font-serif text-lg hover:text-[color:var(--gold)]">{i.name}</Link>
                      <div className="mt-1 text-sm text-[color:var(--muted-foreground)]">{inr(i.price)} each</div>
                    </div>
                    <button onClick={() => remove(i.id)} className="text-[color:var(--muted-foreground)] hover:text-[color:var(--destructive)]" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center rounded-sm border border-[color:var(--gold)]/30">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="grid h-9 w-9 place-items-center hover:text-[color:var(--gold)]"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="grid h-9 w-9 place-items-center hover:text-[color:var(--gold)]"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <div className="font-display text-lg text-gold-gradient">{inr(i.price * i.qty)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-5 self-start rounded-sm glass-card p-7">
            <h2 className="font-display text-2xl text-[color:var(--ivory)]">Summary</h2>
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={inr(subtotal)} />
              {discount > 0 && <Row label="Discount" value={`− ${inr(discount)}`} accent />}
              <Row label="Shipping" value={shipping === 0 ? "Free" : inr(shipping)} />
            </div>
            <div className="border-t border-[color:var(--gold)]/15 pt-4 flex items-baseline justify-between">
              <span className="eyebrow">Total</span>
              <span className="font-display text-2xl text-gold-gradient">{inr(total)}</span>
            </div>

            {couponCode ? (
              <div className="rounded-sm border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 p-3 flex items-center justify-between gap-2 text-sm shadow-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[color:var(--gold)]" />
                  <span className="font-medium text-[color:var(--ivory)]">Coupon <span className="text-[color:var(--gold)]">{couponCode}</span> applied!</span>
                </div>
                <button
                  onClick={() => {
                    removeCoupon();
                    setCouponInput("");
                    toast.success("Coupon removed.");
                  }}
                  className="p-1 text-[color:var(--muted-foreground)] hover:text-[color:var(--destructive)] transition-colors cursor-pointer"
                  aria-label="Remove coupon"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      placeholder="Coupon code"
                      className="w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[color:var(--gold)] transition-colors"
                    />
                  </div>
                  <button
                    onClick={() => handleApplyCoupon()}
                    className="rounded-sm border border-[color:var(--gold)]/40 px-4 text-xs font-medium uppercase tracking-widest hover:bg-[color:var(--gold)]/15 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-[color:var(--muted-foreground)]">
                  Try{" "}
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon("DIVINE10")}
                    className="font-medium text-[color:var(--gold)] underline hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    DIVINE10
                  </button>{" "}
                  for 10% off.
                </p>
              </div>
            )}

            <Link to="/checkout" className="block w-full rounded-sm bg-gold-gradient py-3.5 text-center text-sm font-medium uppercase tracking-widest text-[color:var(--ink)] hover:opacity-90">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="block text-center text-xs uppercase tracking-widest text-[color:var(--muted-foreground)] hover:text-[color:var(--gold)]">Continue browsing</Link>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-[color:var(--muted-foreground)]">{label}</span>
      <span className={accent ? "text-[color:var(--gold)]" : ""}>{value}</span>
    </div>
  );
}
