import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Lock, CheckCircle2, Send, Tag, Check, X } from "lucide-react";
import { toast } from "sonner";
import { inr, useCart } from "@/lib/cart";
import { useAppStore } from "@/lib/store";
import { Ornament } from "@/components/site/Ornament";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — ARUMO" }] }),
  component: Checkout,
});

function Checkout() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const couponCode = useCart((s) => s.couponCode);
  const applyCoupon = useCart((s) => s.applyCoupon);
  const removeCoupon = useCart((s) => s.removeCoupon);
  const discount = useCart((s) => s.discount());
  const addOrder = useAppStore((s) => s.addOrder);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount) + shipping;
  const [done, setDone] = useState(false);
  const [couponInput, setCouponInput] = useState(couponCode || "");

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

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-[#25D366]" />
        <h1 className="mt-6 font-display text-4xl text-gold-gradient">Blessing Order Sent to WhatsApp</h1>
        <Ornament className="my-6" />
        <p className="font-serif text-lg italic text-[color:var(--ivory)]/80">
          Your sacred offering details have been directly formatted and sent to our temple concierge via WhatsApp (+91 98404 00000). Our team will confirm dispatch details immediately.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/dashboard" className="rounded-sm bg-gold-gradient px-6 py-3 text-sm font-medium uppercase tracking-widest text-[color:var(--ink)]">View Orders</Link>
          <Link to="/shop" className="rounded-sm border border-[color:var(--gold)]/40 px-6 py-3 text-sm uppercase tracking-widest">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <div className="eyebrow">Final Step</div>
        <h1 className="mt-3 font-display text-5xl text-gold-gradient">Direct WhatsApp Checkout</h1>
        <Ornament className="my-6" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const fullName = (formData.get("fullName") as string) || "Devotee";
          const email = (formData.get("email") as string) || "";
          const phone = (formData.get("phone") as string) || "";
          const altPhone = (formData.get("altPhone") as string) || "";
          const address1 = (formData.get("address1") as string) || "";
          const address2 = (formData.get("address2") as string) || "";
          const city = (formData.get("city") as string) || "";
          const state = (formData.get("state") as string) || "";
          const pinCode = (formData.get("pinCode") as string) || "";
          const landmark = (formData.get("landmark") as string) || "";

          const fullAddress = `${address1}${address2 ? ", " + address2 : ""}, ${city}, ${state} - ${pinCode}${landmark ? " (Landmark: " + landmark + ")" : ""}`;
          const orderId = `ARM-${Math.floor(1000 + Math.random() * 9000)}`;

          const newOrder = {
            id: orderId,
            customerName: fullName,
            customerEmail: email || "whatsapp-order@arumo.in",
            date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            total,
            status: "Order Received",
            itemsCount: items.reduce((a, i) => a + i.qty, 0),
            items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
            shippingAddress: fullAddress,
          };
          addOrder(newOrder);

          // Build WhatsApp message
          let msg = `🙏 *OM NAMAH SHIVAYA* 🙏\n\n`;
          msg += `✨ *NEW SACRED OFFERING ORDER (${orderId})* ✨\n\n`;
          msg += `👤 *Devotee Details:*\n`;
          msg += `• *Name:* ${fullName}\n`;
          msg += `• *WhatsApp/Phone:* ${phone}\n`;
          if (altPhone) msg += `• *Alt Phone:* ${altPhone}\n`;
          if (email) msg += `• *Email:* ${email}\n`;
          msg += `• *Delivery Address:* ${fullAddress}\n\n`;
          msg += `🛍️ *Sacred Offerings Selected:*\n`;
          items.forEach((item, index) => {
            msg += `${index + 1}. *${item.name}* (Qty: ${item.qty}) - ${inr(item.price * item.qty)}\n`;
          });
          msg += `\n💰 *Subtotal:* ${inr(subtotal)}\n`;
          if (discount > 0) {
            msg += `🎁 *Discount (${couponCode}):* -${inr(discount)}\n`;
          }
          msg += `🚚 *Shipping:* ${shipping === 0 ? "FREE" : inr(shipping)}\n`;
          msg += `🌟 *Grand Total:* ${inr(total)}\n\n`;
          msg += `Please confirm my order booking and share dispatch blessings! 🙏`;

          const waUrl = `https://wa.me/919840400000?text=${encodeURIComponent(msg)}`;
          window.open(waUrl, "_blank");

          setDone(true);
          clear();
          window.scrollTo(0, 0);
        }}
        className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px]"
      >
        <div className="space-y-10">
          <Section title="Devotee Contact">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="fullName" required />
              <Field label="WhatsApp / Phone Number" name="phone" type="tel" required />
              <Field label="Email Address" name="email" type="email" />
              <Field label="Alternate Phone (optional)" name="altPhone" type="tel" />
            </div>
          </Section>

          <Section title="Sanctum Delivery Address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Address Line 1 (House/Flat No, Street)" name="address1" required className="sm:col-span-2" />
              <Field label="Address Line 2 (Area, Locality)" name="address2" className="sm:col-span-2" />
              <Field label="City" name="city" required />
              <Field label="State" name="state" required />
              <Field label="PIN Code" name="pinCode" required />
              <Field label="Landmark (optional)" name="landmark" />
            </div>
          </Section>

          <Section title="Order Confirmation Method">
            <div className="rounded-sm border border-[color:var(--gold)] bg-[color:var(--gold)]/10 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-md">
                <MessageCircle className="h-7 w-7 fill-current animate-pulse" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="font-display text-xl text-[color:var(--ivory)] font-semibold flex items-center gap-2.5">
                  Direct WhatsApp Booking
                  <span className="rounded-full bg-[#25D366]/20 px-3 py-0.5 text-[10px] font-bold text-[#25D366] uppercase tracking-wider">Instant Concierge</span>
                </div>
                <p className="text-xs text-[color:var(--muted-foreground)] leading-relaxed">
                  Razorpay, UPI & Card gateways have been temporarily disabled. When you click <strong>Order via WhatsApp</strong> below, your complete devotional list & delivery address will be directly sent to our temple concierge on WhatsApp (+91 98404 00000) for instant verification & blessed booking.
                </p>
              </div>
            </div>
          </Section>
        </div>

        <aside className="space-y-5 self-start rounded-sm glass-card p-7 lg:sticky lg:top-28 border border-[color:var(--gold)]/30">
          <h2 className="font-display text-2xl">Your Offering Summary</h2>
          <div className="space-y-3 max-h-72 overflow-auto pr-1">
            {items.length === 0 && <p className="text-sm text-[color:var(--muted-foreground)]">Your cart is empty.</p>}
            {items.map((i) => (
              <div key={i.id} className="flex gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-[color:var(--ink)]"><img src={i.image} alt="" className="h-full w-full object-cover" /></div>
                <div className="flex-1 text-sm">
                  <div className="line-clamp-1 font-medium text-[color:var(--ivory)]">{i.name}</div>
                  <div className="text-xs text-[color:var(--muted-foreground)]">Qty {i.qty} · {inr(i.price)}</div>
                </div>
                <div className="text-sm font-semibold text-[color:var(--gold)]">{inr(i.price * i.qty)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-[color:var(--gold)]/20 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[color:var(--muted-foreground)]">Subtotal</span><span>{inr(subtotal)}</span></div>
            {discount > 0 && (
              <div className="flex justify-between text-[color:var(--gold)]">
                <span>Discount ({couponCode})</span>
                <span>− {inr(discount)}</span>
              </div>
            )}
            <div className="flex justify-between"><span className="text-[color:var(--muted-foreground)]">Shipping</span><span>{shipping === 0 ? "Free" : inr(shipping)}</span></div>
            <div className="flex items-baseline justify-between border-t border-[color:var(--gold)]/20 pt-3">
              <span className="eyebrow">Total Blessing Amount</span>
              <span className="font-display text-2xl text-gold-gradient">{inr(total)}</span>
            </div>
          </div>

          {couponCode ? (
            <div className="rounded-sm border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 p-3 flex items-center justify-between gap-2 text-xs shadow-sm">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                <span className="font-medium text-[color:var(--ivory)]">Coupon <span className="text-[color:var(--gold)]">{couponCode}</span> applied!</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  removeCoupon();
                  setCouponInput("");
                  toast.success("Coupon removed.");
                }}
                className="p-1 text-[color:var(--muted-foreground)] hover:text-[color:var(--destructive)] transition-colors cursor-pointer"
                aria-label="Remove coupon"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleApplyCoupon();
                      }
                    }}
                    placeholder="Coupon code"
                    className="w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent py-2 pl-9 pr-2.5 text-xs outline-none focus:border-[color:var(--gold)] transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleApplyCoupon()}
                  className="rounded-sm border border-[color:var(--gold)]/40 px-3 text-[11px] font-medium uppercase tracking-widest hover:bg-[color:var(--gold)]/15 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              <p className="text-[11px] text-[color:var(--muted-foreground)]">
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
          <button
            type="submit"
            disabled={items.length === 0}
            className="w-full rounded-sm bg-[#25D366] hover:bg-[#20bd5a] transition-colors py-4 text-sm font-bold uppercase tracking-widest text-white shadow-xl flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" /> Place Order via WhatsApp
          </button>
          <p className="flex items-center justify-center gap-2 text-xs text-[color:var(--muted-foreground)]">
            <Lock className="h-3 w-3" /> Direct Devotonal Atelier Verification
          </p>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="eyebrow mb-5">{title}</div>
      {children}
    </section>
  );
}

function Field({ label, name, type = "text", required, className = "" }: { label: string; name?: string; type?: string; required?: boolean; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">{label}{required && <span className="text-[color:var(--gold)]"> *</span>}</span>
      <input name={name} type={type} required={required} className="w-full rounded-sm border border-[color:var(--gold)]/25 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[color:var(--gold)] transition-colors" />
    </label>
  );
}
