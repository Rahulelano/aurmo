import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts, categories as initialCategories, type Product } from "./products";
import { api } from "./api";

export type Category = {
  slug: string;
  name: string;
  desc: string;
  image: string;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  date: string;
  total: number;
  status: string;
  itemsCount: number;
  items: { id: string; name: string; price: number; qty: number }[];
  shippingAddress?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: "Active" | "VIP" | "New";
};

const defaultOrders: Order[] = [
  {
    id: "ARM-2401",
    customerName: "Aravind R.",
    customerEmail: "aravind@arumo.in",
    customerPhone: "+91 98404 00000",
    date: "12 Jun 2026",
    total: 6398,
    status: "Energized · In transit",
    itemsCount: 2,
    items: [
      { id: "ganesha-vighnaharta", name: "Vighnaharta Brass Ganesha", price: 4499, qty: 1 },
      { id: "kamakshi-deepam", name: "Kamakshi Brass Deepam", price: 1899, qty: 1 },
    ],
    shippingAddress: "12, Sannathi Street, Mylapore, Chennai 600004",
  },
  {
    id: "ARM-2389",
    customerName: "Lakshmi Narayanan",
    customerEmail: "lakshmi@gmail.com",
    customerPhone: "+91 94432 11223",
    date: "28 May 2026",
    total: 2299,
    status: "Delivered",
    itemsCount: 1,
    items: [
      { id: "rudraksha-108", name: "5 Mukhi Rudraksha Mala — 108 Beads", price: 2299, qty: 1 },
    ],
    shippingAddress: "45, West Masi Street, Madurai 625001",
  },
  {
    id: "ARM-2371",
    customerName: "Vikram Sundar",
    customerEmail: "vikram.s@outlook.com",
    customerPhone: "+91 98840 55667",
    date: "11 May 2026",
    total: 28499,
    status: "Atelier · In craftsmanship",
    itemsCount: 1,
    items: [
      { id: "rosewood-mandir", name: "Rosewood Carved Home Mandir", price: 28499, qty: 1 },
    ],
    shippingAddress: "8, Poes Garden, Chennai 600086",
  },
];

const defaultCustomers: Customer[] = [
  {
    id: "CUST-101",
    name: "Aravind R.",
    email: "aravind@arumo.in",
    phone: "+91 98404 00000",
    ordersCount: 5,
    totalSpent: 42500,
    joinedDate: "14 Jan 2025",
    status: "VIP",
  },
  {
    id: "CUST-102",
    name: "Lakshmi Narayanan",
    email: "lakshmi@gmail.com",
    phone: "+91 94432 11223",
    ordersCount: 2,
    totalSpent: 4598,
    joinedDate: "10 Mar 2026",
    status: "Active",
  },
  {
    id: "CUST-103",
    name: "Vikram Sundar",
    email: "vikram.s@outlook.com",
    phone: "+91 98840 55667",
    ordersCount: 1,
    totalSpent: 28499,
    joinedDate: "01 May 2026",
    status: "New",
  },
  {
    id: "CUST-104",
    name: "Divya Krishnan",
    email: "divya.k@yahoo.in",
    phone: "+91 97890 33445",
    ordersCount: 3,
    totalSpent: 8900,
    joinedDate: "18 Feb 2026",
    status: "Active",
  },
];

type AppState = {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];

  // Server sync
  syncFromServer: () => Promise<void>;

  // Products CRUD
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Categories CRUD
  addCategory: (category: Category) => void;
  updateCategory: (slug: string, updated: Partial<Category>) => void;
  deleteCategory: (slug: string) => void;

  // Orders CRUD
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: string) => void;
  deleteOrder: (id: string) => void;

  // Customers CRUD
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, updated: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Reset to seed
  resetToDefaults: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      products: initialProducts,
      categories: initialCategories,
      orders: defaultOrders,
      customers: defaultCustomers,

      syncFromServer: async () => {
        const state = await api.getState();
        if (state) {
          set({
            products: state.products || initialProducts,
            categories: state.categories || initialCategories,
            orders: state.orders || defaultOrders,
            customers: state.customers || defaultCustomers,
          });
        }
      },

      addProduct: (p) => {
        set((state) => ({ products: [p, ...state.products] }));
        api.createProduct(p);
      },

      updateProduct: (id, updated) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        }));
        api.updateProduct(id, updated);
      },

      deleteProduct: (id) => {
        set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
        api.deleteProduct(id);
      },

      addCategory: (c) => {
        set((state) => ({ categories: [...state.categories, c] }));
        api.createCategory(c);
      },

      updateCategory: (slug, updated) => {
        set((state) => ({
          categories: state.categories.map((c) => (c.slug === slug ? { ...c, ...updated } : c)),
        }));
        api.updateCategory(slug, updated);
      },

      deleteCategory: (slug) => {
        set((state) => ({ categories: state.categories.filter((c) => c.slug !== slug) }));
        api.deleteCategory(slug);
      },

      addOrder: (o) => {
        set((state) => ({ orders: [o, ...state.orders] }));
        api.createOrder(o);
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        }));
        api.updateOrderStatus(id, status);
      },

      deleteOrder: (id) => {
        set((state) => ({ orders: state.orders.filter((o) => o.id !== id) }));
        api.deleteOrder(id);
      },

      addCustomer: (c) => {
        set((state) => ({ customers: [c, ...state.customers] }));
        api.createCustomer(c);
      },

      updateCustomer: (id, updated) => {
        set((state) => ({
          customers: state.customers.map((c) => (c.id === id ? { ...c, ...updated } : c)),
        }));
        api.updateCustomer(id, updated);
      },

      deleteCustomer: (id) => {
        set((state) => ({ customers: state.customers.filter((c) => c.id !== id) }));
        api.deleteCustomer(id);
      },

      resetToDefaults: () => {
        set({
          products: initialProducts,
          categories: initialCategories,
          orders: defaultOrders,
          customers: defaultCustomers,
        });
        api.resetDatabase();
      },
    }),
    {
      name: "arumo-app-store",
    }
  )
);

export const getProductFromStore = (id: string) => {
  return useAppStore.getState().products.find((p) => p.id === id);
};
