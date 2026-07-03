import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Package,
  FolderTree,
  Users,
  ShoppingBag,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Check,
  RotateCcw,
  DollarSign,
  Calendar,
  Filter,
  ShieldAlert,
  Lock,
  LogOut,
  Upload,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useAppStore, type Product, type Category, type Order, type Customer } from "@/lib/store";
import { inr } from "@/lib/cart";
import { api } from "@/lib/api";
import { Ornament } from "@/components/site/Ornament";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Sanctum Admin Portal — ARUMO" }] }),
  component: AdminPortal,
});

type TabId = "overview" | "products" | "categories" | "orders" | "customers";

function AdminPortal() {
  const [tab, setTab] = useState<TabId>("overview");
  const [token, setToken] = useState<string | null>(() => (typeof window !== "undefined" ? localStorage.getItem("arumo_admin_token") : null));
  const [email, setEmail] = useState("admin@arumo.in");
  const [password, setPassword] = useState("admin123");
  const [loginErr, setLoginErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Store actions and data
  const products = useAppStore((s) => s.products);
  const categories = useAppStore((s) => s.categories);
  const orders = useAppStore((s) => s.orders);
  const customers = useAppStore((s) => s.customers);
  const resetToDefaults = useAppStore((s) => s.resetToDefaults);

  // Stats calculation
  const totalRevenue = useMemo(() => orders.reduce((acc, o) => acc + (o.status !== "Cancelled" ? o.total : 0), 0), [orders]);
  const activeOrdersCount = useMemo(() => orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length, [orders]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginErr("");
    const res = await api.login(email, password);
    setLoggingIn(false);
    if (res && res.token) {
      localStorage.setItem("arumo_admin_token", res.token);
      setToken(res.token);
    } else {
      setLoginErr("Invalid Admin Credentials. Please use default: admin@arumo.in / admin123");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("arumo_admin_token");
    setToken(null);
  };

  if (!token) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center px-4 py-12 bg-[color:var(--background)]">
        <div className="w-full max-w-md rounded-sm glass-card border border-[color:var(--gold)]/30 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[color:var(--gold)]/10 blur-3xl pointer-events-none" />
          
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-sm bg-gold-gradient text-[color:var(--ink)] shadow-md">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="mt-6 font-display text-3xl text-gold-gradient">Sanctuary Threshold</h1>
            <p className="mt-1 font-serif text-sm italic text-[color:var(--ivory)]/70">Master Admin Portal Verification</p>
            <Ornament className="my-5" />
          </div>

          <div className="mb-6 rounded-sm bg-[color:var(--gold)]/10 border border-[color:var(--gold)]/25 p-3 text-xs text-[color:var(--gold)] text-center">
            <strong>MongoDB Atlas Seeded Demo Account:</strong>
            <div className="mt-1 font-mono text-[11px] text-[color:var(--ivory)]">Email: admin@arumo.in | Pass: admin123</div>
          </div>

          {loginErr && (
            <div className="mb-4 rounded-sm bg-red-950/60 border border-red-500/40 p-3 text-xs text-red-300 text-center">
              {loginErr}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Admin Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]"
                placeholder="admin@arumo.in"
              />
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full mt-2 rounded-sm bg-gold-gradient py-3 text-xs font-bold uppercase tracking-widest text-[color:var(--ink)] shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loggingIn ? "Verifying Divine Threshold..." : "Enter Sanctum Portal"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Chart data
  const revenueChartData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 61000 },
    { month: "Apr", revenue: 48000 },
    { month: "May", revenue: 78000 },
    { month: "Jun", revenue: totalRevenue > 80000 ? totalRevenue : 94000 },
  ];

  const categoryChartData = categories.map((c) => ({
    name: c.name.split(" ")[0],
    count: products.filter((p) => p.category === c.slug).length,
  }));

  return (
    <div className="min-h-screen bg-[color:var(--background)] pb-20">
      {/* Top Banner */}
      <div className="border-b border-[color:var(--gold)]/20 bg-[color:var(--ink)]/80 backdrop-blur-md sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-sm bg-gold-gradient text-[color:var(--ink)] font-display font-bold">
              A
            </span>
            <div>
              <h1 className="font-display text-xl text-gold-gradient tracking-wide">ARUMO Sanctuary Admin</h1>
              <p className="text-xs text-[color:var(--muted-foreground)]">Connected to MongoDB Atlas Cloud</p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <TabButton id="overview" label="Analytics" icon={BarChart3} active={tab === "overview"} onClick={() => setTab("overview")} />
            <TabButton id="products" label={`Offerings (${products.length})`} icon={Package} active={tab === "products"} onClick={() => setTab("products")} />
            <TabButton id="categories" label={`Collections (${categories.length})`} icon={FolderTree} active={tab === "categories"} onClick={() => setTab("categories")} />
            <TabButton id="orders" label={`Orders (${orders.length})`} icon={ShoppingBag} active={tab === "orders"} onClick={() => setTab("orders")} />
            <TabButton id="customers" label={`Devotees (${customers.length})`} icon={Users} active={tab === "customers"} onClick={() => setTab("customers")} />
            
            <button
              onClick={handleLogout}
              className="ml-2 flex items-center gap-1.5 rounded-sm border border-red-500/30 bg-red-950/20 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition-all"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-10">
        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div className="space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl text-[color:var(--ivory)]">Sanctuary Overview</h2>
                <p className="text-sm text-[color:var(--muted-foreground)]">Real-time performance metrics across all devotional categories.</p>
              </div>
              <button
                onClick={() => {
                  if (confirm("Reset all store data to original divine seed defaults?")) resetToDefaults();
                }}
                className="flex items-center gap-2 rounded-sm border border-[color:var(--gold)]/30 px-4 py-2 text-xs uppercase tracking-widest text-[color:var(--gold)] hover:bg-[color:var(--gold)]/10 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Demo Seed Data
              </button>
            </div>

            {/* KPI Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard title="Total Sacred Revenue" value={inr(totalRevenue)} icon={DollarSign} sub="+18.4% from last month" />
              <KpiCard title="Total Devotees" value={customers.length.toString()} icon={Users} sub="Active spiritual seekers" />
              <KpiCard title="Sacred Offerings" value={products.length.toString()} icon={Package} sub={`${categories.length} Collections available`} />
              <KpiCard title="Orders In Progress" value={activeOrdersCount.toString()} icon={ShoppingBag} sub={`${orders.length} total completed orders`} />
            </div>

            {/* Charts Section */}
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-sm glass-card p-6 border border-[color:var(--gold)]/20">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl text-[color:var(--ivory)]">Revenue Progression (INR)</h3>
                    <p className="text-xs text-[color:var(--muted-foreground)]">Monthly devotional sales trends</p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-[color:var(--gold)]" />
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueChartData}>
                      <defs>
                        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#a19d94" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#a19d94" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#0B0B0B", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "4px" }}
                        labelStyle={{ color: "#D4AF37", fontWeight: "bold" }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#goldGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-sm glass-card p-6 border border-[color:var(--gold)]/20">
                <h3 className="font-serif text-xl text-[color:var(--ivory)] mb-1">Offerings per Collection</h3>
                <p className="text-xs text-[color:var(--muted-foreground)] mb-6">Distribution across categories</p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryChartData}>
                      <XAxis dataKey="name" stroke="#a19d94" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#a19d94" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#0B0B0B", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "4px" }} />
                      <Bar dataKey="count" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {tab === "products" && <ProductsManager />}

        {/* CATEGORIES TAB */}
        {tab === "categories" && <CategoriesManager />}

        {/* ORDERS TAB */}
        {tab === "orders" && <OrdersManager />}

        {/* CUSTOMERS TAB */}
        {tab === "customers" && <CustomersManager />}
      </div>
    </div>
  );
}

function TabButton({ id, label, icon: Icon, active, onClick }: { id: string; label: string; icon: any; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-sm px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all whitespace-nowrap ${
        active ? "bg-gold-gradient text-[color:var(--ink)] shadow-md" : "text-[color:var(--ivory)]/75 hover:bg-[color:var(--gold)]/10 hover:text-[color:var(--gold)]"
      }`}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

function KpiCard({ title, value, icon: Icon, sub }: { title: string; value: string; icon: any; sub: string }) {
  return (
    <div className="rounded-sm glass-card p-6 border border-[color:var(--gold)]/20 hover:border-[color:var(--gold)]/50 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">{title}</span>
        <div className="grid h-8 w-8 place-items-center rounded-sm bg-[color:var(--gold)]/10 text-[color:var(--gold)]">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 font-display text-3xl text-gold-gradient font-bold">{value}</div>
      <div className="mt-1 text-xs text-[color:var(--gold-soft)]/70">{sub}</div>
    </div>
  );
}

/* ==================== PRODUCTS MANAGER ==================== */
function ProductsManager() {
  const products = useAppStore((s) => s.products);
  const categories = useAppStore((s) => s.categories);
  const addProduct = useAppStore((s) => s.addProduct);
  const updateProduct = useAppStore((s) => s.updateProduct);
  const deleteProduct = useAppStore((s) => s.deleteProduct);

  const [q, setQ] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingImg, setUploadingImg] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !editingProduct) return;
    setUploadingImg(true);
    const res = await api.uploadImages(files);
    setUploadingImg(false);
    if (res && res.imageUrls && res.imageUrls.length > 0) {
      const currentImages = editingProduct.images || [editingProduct.image].filter(Boolean);
      const updatedImages = Array.from(new Set([...currentImages, ...res.imageUrls]));
      setEditingProduct({
        ...editingProduct,
        image: updatedImages[0] || editingProduct.image,
        images: updatedImages,
      });
    } else {
      alert("Failed to upload image. Make sure the backend server is active.");
    }
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchQ = p.name.toLowerCase().includes(q.toLowerCase()) || p.short.toLowerCase().includes(q.toLowerCase());
      const matchCat = filterCat === "all" || p.category === filterCat;
      return matchQ && matchCat;
    });
  }, [products, q, filterCat]);

  const handleOpenNew = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      name: "",
      price: 2499,
      mrp: 3299,
      image: categories[0]?.image || "",
      category: categories[0]?.slug || "pooja-essentials",
      rating: 4.9,
      reviews: 42,
      badge: "New",
      short: "",
      description: "",
      benefits: ["Energized before dispatch", "Pure solid casting"],
      specs: [{ label: "Material", value: "Pure Brass" }],
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct({ ...p });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-[color:var(--ivory)]">Sacred Offerings Management</h2>
          <p className="text-sm text-[color:var(--muted-foreground)]">Create, modify, or retire divine products from the catalog.</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 rounded-sm bg-gold-gradient px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--ink)] shadow-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> Add New Offering
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-sm glass-card p-4 border border-[color:var(--gold)]/20">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search offerings by name or description..."
            className="w-full rounded-sm border border-[color:var(--gold)]/25 bg-transparent py-2 pl-9 pr-4 text-sm outline-none focus:border-[color:var(--gold)]"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="rounded-sm border border-[color:var(--gold)]/25 bg-[color:var(--card)] px-3 py-2 text-sm outline-none"
        >
          <option value="all">All Collections ({products.length})</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-sm border border-[color:var(--gold)]/20 glass-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[color:var(--gold)]/20 bg-[color:var(--gold)]/5 text-xs uppercase tracking-widest text-[color:var(--gold)]">
            <tr>
              <th className="p-4">Offering</th>
              <th className="p-4">Collection</th>
              <th className="p-4">Price / MRP</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Badge</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--gold)]/10">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-[color:var(--gold)]/5 transition-colors">
                <td className="p-4 flex items-center gap-4">
                  <img src={p.image} alt="" className="h-12 w-12 rounded-sm object-cover border border-[color:var(--gold)]/30" />
                  <div>
                    <div className="font-serif text-base font-semibold text-[color:var(--ivory)]">{p.name}</div>
                    <div className="text-xs text-[color:var(--muted-foreground)] line-clamp-1 max-w-xs">{p.short}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="rounded-sm bg-[color:var(--gold)]/10 px-2.5 py-1 text-xs text-[color:var(--gold)]">
                    {categories.find((c) => c.slug === p.category)?.name || p.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-display text-gold-gradient font-semibold">{inr(p.price)}</div>
                  {p.mrp && <div className="text-xs text-[color:var(--muted-foreground)] line-through">{inr(p.mrp)}</div>}
                </td>
                <td className="p-4">
                  ⭐ {p.rating} ({p.reviews})
                </td>
                <td className="p-4">
                  {p.badge ? <span className="rounded-sm bg-gold-gradient px-2 py-0.5 text-[10px] uppercase font-bold text-[color:var(--ink)]">{p.badge}</span> : <span className="text-xs text-neutral-500">—</span>}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(p)} className="p-2 text-[color:var(--ivory)]/70 hover:text-[color:var(--gold)]" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove "${p.name}" from catalog?`)) deleteProduct(p.id);
                    }}
                    className="p-2 text-[color:var(--ivory)]/70 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Edit Modal */}
      {modalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--ink)]/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-sm glass-card border border-[color:var(--gold)]/30 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[color:var(--gold)]/20 pb-4">
              <h3 className="font-display text-2xl text-gold-gradient">
                {products.some((p) => p.id === editingProduct.id) ? "Edit Sacred Offering" : "Add New Offering"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (products.some((p) => p.id === editingProduct.id)) {
                  updateProduct(editingProduct.id, editingProduct);
                } else {
                  addProduct(editingProduct);
                }
                setModalOpen(false);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Offering Name</span>
                  <input
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                  />
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Collection / Category</span>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-[color:var(--card)] px-3 py-2 text-sm outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Selling Price (₹)</span>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: +e.target.value })}
                    className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                  />
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">MRP (₹)</span>
                  <input
                    type="number"
                    value={editingProduct.mrp || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, mrp: +e.target.value })}
                    className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                  />
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Badge (Optional)</span>
                  <input
                    placeholder="e.g. Bestseller, New"
                    value={editingProduct.badge || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                  />
                </label>
              </div>

              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Offering Gallery Images (Upload multiple files or paste URL)</span>
                
                {/* File upload drag & drop box */}
                <div className="relative border-2 border-dashed border-[color:var(--gold)]/40 hover:border-[color:var(--gold)] rounded-sm p-5 text-center bg-[color:var(--gold)]/5 transition-all cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    disabled={uploadingImg}
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--gold)]/20 text-[color:var(--gold)]">
                      <Upload className="h-5 w-5 animate-pulse" />
                    </div>
                    <div className="text-xs font-semibold text-[color:var(--ivory)]">
                      {uploadingImg ? "Uploading Sacred Images to Server..." : "Click or Drag & Drop Images Here"}
                    </div>
                    <div className="text-[10px] text-[color:var(--muted-foreground)]">Supports PNG, JPG, WEBP (Multiple selection supported)</div>
                  </div>
                </div>

                {/* Thumbnails preview */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {(editingProduct.images && editingProduct.images.length > 0
                    ? editingProduct.images
                    : [editingProduct.image].filter(Boolean)
                  ).map((imgUrl, idx) => (
                    <div key={idx} className="relative group rounded-sm overflow-hidden border border-[color:var(--gold)]/30 h-16 w-16 bg-black/40">
                      <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute bottom-0 left-0 right-0 bg-gold-gradient text-[8px] font-bold text-[color:var(--ink)] text-center py-0.5">Primary</span>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          const current = editingProduct.images || [editingProduct.image].filter(Boolean);
                          const updated = current.filter((_, i) => i !== idx);
                          setEditingProduct({
                            ...editingProduct,
                            image: updated[0] || "",
                            images: updated,
                          });
                        }}
                        className="absolute top-0 right-0 bg-red-600 text-white p-0.5 rounded-bl-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove Image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Optional manual fallback URL */}
                <input
                  placeholder="Or paste direct primary Image URL here..."
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: e.target.value,
                      images: Array.from(new Set([e.target.value, ...(editingProduct.images || [])])).filter(Boolean),
                    })
                  }
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/20 bg-transparent px-3 py-1.5 text-xs text-[color:var(--muted-foreground)] outline-none focus:border-[color:var(--gold)]"
                />
              </div>

              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Short Summary</span>
                <input
                  required
                  value={editingProduct.short}
                  onChange={(e) => setEditingProduct({ ...editingProduct, short: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Full Devotional Description</span>
                <textarea
                  rows={3}
                  required
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Spiritual Benefits (Comma separated)</span>
                <input
                  value={editingProduct.benefits.join(", ")}
                  onChange={(e) => setEditingProduct({ ...editingProduct, benefits: e.target.value.split(",").map((x) => x.trim()) })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                />
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-[color:var(--gold)]/20">
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-sm px-4 py-2 text-xs uppercase tracking-widest border border-[color:var(--gold)]/30">
                  Cancel
                </button>
                <button type="submit" className="rounded-sm bg-gold-gradient px-6 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--ink)]">
                  Save Offering
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== CATEGORIES MANAGER ==================== */
function CategoriesManager() {
  const categories = useAppStore((s) => s.categories);
  const addCategory = useAppStore((s) => s.addCategory);
  const updateCategory = useAppStore((s) => s.updateCategory);
  const deleteCategory = useAppStore((s) => s.deleteCategory);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [uploadingImg, setUploadingImg] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !editingCat) return;
    setUploadingImg(true);
    const res = await api.uploadImages(files);
    setUploadingImg(false);
    if (res && res.imageUrls && res.imageUrls.length > 0) {
      setEditingCat({
        ...editingCat,
        image: res.imageUrls[0] || editingCat.image,
      });
    } else {
      alert("Failed to upload image. Make sure the backend server is active.");
    }
  };

  const handleOpenNew = () => {
    setEditingCat({
      slug: `col-${Date.now()}`,
      name: "",
      desc: "",
      image: categories[0]?.image || "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCat({ ...c });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-[color:var(--ivory)]">Collections Management</h2>
          <p className="text-sm text-[color:var(--muted-foreground)]">Organize divine offerings into meaningful devotional paths.</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 rounded-sm bg-gold-gradient px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--ink)] shadow-lg"
        >
          <Plus className="h-4 w-4" /> Add Collection
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.slug} className="rounded-sm glass-card border border-[color:var(--gold)]/20 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-40 w-full overflow-hidden relative">
                <img src={c.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)] via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 font-display text-xl text-[color:var(--ivory)]">{c.name}</span>
              </div>
              <div className="p-4 text-sm text-[color:var(--muted-foreground)]">{c.desc}</div>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-[color:var(--gold)]/10 bg-[color:var(--gold)]/5">
              <span className="text-xs text-[color:var(--gold)]">Slug: {c.slug}</span>
              <div className="space-x-2">
                <button onClick={() => handleOpenEdit(c)} className="p-1.5 text-[color:var(--ivory)]/70 hover:text-[color:var(--gold)]">
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete collection "${c.name}"?`)) deleteCategory(c.slug);
                  }}
                  className="p-1.5 text-[color:var(--ivory)]/70 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && editingCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--ink)]/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-sm glass-card border border-[color:var(--gold)]/30 p-6 space-y-6">
            <h3 className="font-display text-2xl text-gold-gradient">
              {categories.some((c) => c.slug === editingCat.slug) ? "Edit Collection" : "Add New Collection"}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (categories.some((c) => c.slug === editingCat.slug)) {
                  updateCategory(editingCat.slug, editingCat);
                } else {
                  addCategory(editingCat);
                }
                setModalOpen(false);
              }}
              className="space-y-4"
            >
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Collection Title</span>
                <input
                  required
                  value={editingCat.name}
                  onChange={(e) => setEditingCat({ ...editingCat, name: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Slug Identifier</span>
                <input
                  required
                  value={editingCat.slug}
                  onChange={(e) => setEditingCat({ ...editingCat, slug: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Spiritual Description</span>
                <input
                  required
                  value={editingCat.desc}
                  onChange={(e) => setEditingCat({ ...editingCat, desc: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none"
                />
              </label>

              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Collection Cover Image (Upload or paste URL)</span>
                
                <div className="relative border-2 border-dashed border-[color:var(--gold)]/40 hover:border-[color:var(--gold)] rounded-sm p-4 text-center bg-[color:var(--gold)]/5 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    disabled={uploadingImg}
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--gold)]/20 text-[color:var(--gold)]">
                      <Upload className="h-4 w-4 animate-pulse" />
                    </div>
                    <div className="text-xs font-semibold text-[color:var(--ivory)]">
                      {uploadingImg ? "Uploading Image to Server..." : "Click or Drag & Drop Image Here"}
                    </div>
                  </div>
                </div>

                {editingCat.image && (
                  <div className="relative rounded-sm overflow-hidden border border-[color:var(--gold)]/30 h-24 w-full max-w-[160px] bg-black/40">
                    <img src={editingCat.image} alt="" className="h-full w-full object-cover" />
                  </div>
                )}

                <input
                  required
                  placeholder="Or paste direct Image URL here..."
                  value={editingCat.image}
                  onChange={(e) => setEditingCat({ ...editingCat, image: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-sm px-4 py-2 text-xs uppercase tracking-widest border border-[color:var(--gold)]/30">
                  Cancel
                </button>
                <button type="submit" className="rounded-sm bg-gold-gradient px-6 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--ink)]">
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== ORDERS MANAGER ==================== */
function OrdersManager() {
  const orders = useAppStore((s) => s.orders);
  const updateOrderStatus = useAppStore((s) => s.updateOrderStatus);
  const deleteOrder = useAppStore((s) => s.deleteOrder);

  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const statusOptions = [
    "Order Received",
    "Energized · In transit",
    "Atelier · In craftsmanship",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-[color:var(--ivory)]">Customer Orders Fulfillment</h2>
          <p className="text-sm text-[color:var(--muted-foreground)]">Track temple blessing and delivery status for devotee orders.</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-sm border border-[color:var(--gold)]/25 bg-[color:var(--card)] px-3 py-2 text-sm outline-none"
        >
          <option value="all">All Statuses ({orders.length})</option>
          {statusOptions.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-sm border border-[color:var(--gold)]/20 glass-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[color:var(--gold)]/20 bg-[color:var(--gold)]/5 text-xs uppercase tracking-widest text-[color:var(--gold)]">
            <tr>
              <th className="p-4">Order Ref</th>
              <th className="p-4">Devotee details</th>
              <th className="p-4">Date</th>
              <th className="p-4">Items Summary</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Fulfillment Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--gold)]/10">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-[color:var(--gold)]/5 transition-colors">
                <td className="p-4 font-mono font-bold text-[color:var(--gold)]">{o.id}</td>
                <td className="p-4">
                  <div className="font-serif text-base text-[color:var(--ivory)]">{o.customerName}</div>
                  <div className="text-xs text-[color:var(--muted-foreground)]">{o.customerEmail}</div>
                  {o.shippingAddress && <div className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1 max-w-xs">{o.shippingAddress}</div>}
                </td>
                <td className="p-4 text-xs text-[color:var(--muted-foreground)]">{o.date}</td>
                <td className="p-4">
                  <div className="text-xs">{o.itemsCount} sacred offering{o.itemsCount > 1 ? "s" : ""}</div>
                  {o.items?.map((i, idx) => (
                    <div key={idx} className="text-[11px] text-[color:var(--gold-soft)]/70">
                      • {i.qty}x {i.name}
                    </div>
                  ))}
                </td>
                <td className="p-4 font-display text-gold-gradient font-bold">{inr(o.total)}</td>
                <td className="p-4">
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    className="rounded-sm border border-[color:var(--gold)]/30 bg-[color:var(--ink)] px-2.5 py-1 text-xs text-[color:var(--gold)] outline-none"
                  >
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => {
                      if (confirm(`Remove order ${o.id}?`)) deleteOrder(o.id);
                    }}
                    className="p-2 text-neutral-500 hover:text-red-400"
                    title="Delete Order"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ==================== CUSTOMERS MANAGER ==================== */
function CustomersManager() {
  const customers = useAppStore((s) => s.customers);
  const addCustomer = useAppStore((s) => s.addCustomer);
  const updateCustomer = useAppStore((s) => s.updateCustomer);
  const deleteCustomer = useAppStore((s) => s.deleteCustomer);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCust, setEditingCust] = useState<Customer | null>(null);

  const handleOpenNew = () => {
    setEditingCust({
      id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
      name: "",
      email: "",
      phone: "",
      ordersCount: 0,
      totalSpent: 0,
      joinedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Active",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Customer) => {
    setEditingCust({ ...c });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-[color:var(--ivory)]">Devotees & Community</h2>
          <p className="text-sm text-[color:var(--muted-foreground)]">Manage registered spiritual seekers and VIP devotees.</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 rounded-sm bg-gold-gradient px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--ink)] shadow-lg"
        >
          <Plus className="h-4 w-4" /> Add Devotee
        </button>
      </div>

      <div className="overflow-x-auto rounded-sm border border-[color:var(--gold)]/20 glass-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[color:var(--gold)]/20 bg-[color:var(--gold)]/5 text-xs uppercase tracking-widest text-[color:var(--gold)]">
            <tr>
              <th className="p-4">Devotee ID</th>
              <th className="p-4">Name & Contact</th>
              <th className="p-4">Status</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Total Offering Value</th>
              <th className="p-4">Joined Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--gold)]/10">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-[color:var(--gold)]/5 transition-colors">
                <td className="p-4 font-mono text-[color:var(--gold)]">{c.id}</td>
                <td className="p-4">
                  <div className="font-serif text-base text-[color:var(--ivory)]">{c.name}</div>
                  <div className="text-xs text-[color:var(--muted-foreground)]">{c.email} · {c.phone}</div>
                </td>
                <td className="p-4">
                  <span
                    className={`rounded-sm px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                      c.status === "VIP"
                        ? "bg-gold-gradient text-[color:var(--ink)] font-bold"
                        : c.status === "New"
                        ? "bg-blue-900/40 text-blue-300 border border-blue-500/30"
                        : "bg-[color:var(--gold)]/10 text-[color:var(--gold)]"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-4">{c.ordersCount} orders</td>
                <td className="p-4 font-display text-gold-gradient">{inr(c.totalSpent)}</td>
                <td className="p-4 text-xs text-[color:var(--muted-foreground)]">{c.joinedDate}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(c)} className="p-1.5 text-[color:var(--ivory)]/70 hover:text-[color:var(--gold)]">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove devotee record for ${c.name}?`)) deleteCustomer(c.id);
                    }}
                    className="p-1.5 text-[color:var(--ivory)]/70 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && editingCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--ink)]/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-sm glass-card border border-[color:var(--gold)]/30 p-6 space-y-6">
            <h3 className="font-display text-2xl text-gold-gradient">
              {customers.some((c) => c.id === editingCust.id) ? "Edit Devotee Profile" : "Register New Devotee"}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (customers.some((c) => c.id === editingCust.id)) {
                  updateCustomer(editingCust.id, editingCust);
                } else {
                  addCustomer(editingCust);
                }
                setModalOpen(false);
              }}
              className="space-y-4"
            >
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Devotee Name</span>
                <input
                  required
                  value={editingCust.name}
                  onChange={(e) => setEditingCust({ ...editingCust, name: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Email Address</span>
                <input
                  type="email"
                  required
                  value={editingCust.email}
                  onChange={(e) => setEditingCust({ ...editingCust, email: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Phone Number</span>
                <input
                  required
                  value={editingCust.phone}
                  onChange={(e) => setEditingCust({ ...editingCust, phone: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Spiritual Tier</span>
                <select
                  value={editingCust.status}
                  onChange={(e) => setEditingCust({ ...editingCust, status: e.target.value as any })}
                  className="mt-1 w-full rounded-sm border border-[color:var(--gold)]/30 bg-[color:var(--card)] px-3 py-2 text-sm outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="VIP">VIP</option>
                  <option value="New">New</option>
                </select>
              </label>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-sm px-4 py-2 text-xs uppercase tracking-widest border border-[color:var(--gold)]/30">
                  Cancel
                </button>
                <button type="submit" className="rounded-sm bg-gold-gradient px-6 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--ink)]">
                  Save Devotee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
