// Frontend API wrapper for ARUMO Backend REST API

const BASE_URL = "/api";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("arumo_admin_token") : null;
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options?.headers || {}),
      },
      ...options,
    });
    if (!res.ok) {
      console.warn(`API error on ${endpoint}: ${res.status} ${res.statusText}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`Network error reaching API ${endpoint}:`, err);
    return null;
  }
}

export const api = {
  // Upload
  uploadImages: async (files: FileList | File[]) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("arumo_admin_token") : null;
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("images", file));
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) return null;
      return (await res.json()) as { imageUrls: string[] };
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  },

  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; admin: { email: string; name: string }; message?: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Health
  checkHealth: () => request<{ status: string }>("/health"),

  // Products
  getProducts: () => request<any[]>("/products"),
  createProduct: (data: any) => request<any>("/products", { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (id: string, data: any) => request<any>(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProduct: (id: string) => request<any>(`/products/${id}`, { method: "DELETE" }),

  // Categories
  getCategories: () => request<any[]>("/categories"),
  createCategory: (data: any) => request<any>("/categories", { method: "POST", body: JSON.stringify(data) }),
  updateCategory: (slug: string, data: any) => request<any>(`/categories/${slug}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCategory: (slug: string) => request<any>(`/categories/${slug}`, { method: "DELETE" }),

  // Orders
  getOrders: () => request<any[]>("/orders"),
  createOrder: (data: any) => request<any>("/orders", { method: "POST", body: JSON.stringify(data) }),
  updateOrderStatus: (id: string, status: string) => request<any>(`/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
  deleteOrder: (id: string) => request<any>(`/orders/${id}`, { method: "DELETE" }),

  // Customers
  getCustomers: () => request<any[]>("/customers"),
  createCustomer: (data: any) => request<any>("/customers", { method: "POST", body: JSON.stringify(data) }),
  updateCustomer: (id: string, data: any) => request<any>(`/customers/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCustomer: (id: string) => request<any>(`/customers/${id}`, { method: "DELETE" }),

  // Full state & Reset
  getState: () => request<any>("/state"),
  resetDatabase: () => request<any>("/reset", { method: "POST" }),
};
