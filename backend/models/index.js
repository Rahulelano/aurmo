import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number },
  image: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  rating: { type: Number, default: 4.9 },
  reviews: { type: Number, default: 12 },
  badge: { type: String },
  short: { type: String },
  description: { type: String },
  benefits: [{ type: String }],
  specs: [{ label: String, value: String }]
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  desc: { type: String },
  image: { type: String }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String },
  date: { type: String },
  total: { type: Number, required: true },
  status: { type: String, default: "Order Received" },
  itemsCount: { type: Number, default: 1 },
  items: [{ id: String, name: String, price: Number, qty: Number }],
  shippingAddress: { type: String }
}, { timestamps: true });

const customerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  ordersCount: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  joinedDate: { type: String },
  status: { type: String, enum: ["Active", "VIP", "New"], default: "Active" }
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: "Sanctuary Admin" }
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
