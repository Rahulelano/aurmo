import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";
import { connectDB, resetMongoSeed } from "./db.js";
import { Product, Category, Order, Customer, Admin } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 9211;
const JWT_SECRET = process.env.JWT_SECRET || "arumo_divine_secret_key_2026";

// Ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `prod-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB Atlas
connectDB();

/* ==================== IMAGE UPLOAD API ==================== */
app.post("/api/upload", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No image files uploaded" });
    }
    const imageUrls = req.files.map((f) => `/uploads/${f.filename}`);
    res.status(201).json({ imageUrls });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload image files" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "ARUMO Divine Aura Emporium MongoDB Backend API", timestamp: new Date() });
});

/* ==================== AUTHENTICATION API ==================== */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (!admin) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email, name: admin.name }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      admin: { email: admin.email, name: admin.name },
      message: "Welcome to ARUMO Sanctuary Admin Portal",
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal server error during authentication" });
  }
});

// Full state endpoint (useful for initial hydration)
app.get("/api/state", async (req, res) => {
  try {
    const [products, categories, orders, customers] = await Promise.all([
      Product.find().lean(),
      Category.find().lean(),
      Order.find().sort({ createdAt: -1 }).lean(),
      Customer.find().lean(),
    ]);
    res.json({ products, categories, orders, customers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset database to defaults
app.post("/api/reset", async (req, res) => {
  try {
    const result = await resetMongoSeed();
    const [products, categories, orders, customers] = await Promise.all([
      Product.find().lean(),
      Category.find().lean(),
      Order.find().lean(),
      Customer.find().lean(),
    ]);
    res.json({ message: result.message, db: { products, categories, orders, customers } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==================== PRODUCTS API ==================== */
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }).lean();
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = await Product.create({
      id: req.body.id || `prod-${Date.now()}`,
      ...req.body,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==================== CATEGORIES API ==================== */
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/categories", async (req, res) => {
  try {
    const newCat = await Category.create({
      slug: req.body.slug || `col-${Date.now()}`,
      name: req.body.name || "New Collection",
      desc: req.body.desc || "",
      image: req.body.image || "",
    });
    res.status(201).json(newCat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/categories/:slug", async (req, res) => {
  try {
    const updated = await Category.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Category not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/categories/:slug", async (req, res) => {
  try {
    await Category.findOneAndDelete({ slug: req.params.slug });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==================== ORDERS API ==================== */
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = await Order.create({
      id: req.body.id || `ARM-${Math.floor(1000 + Math.random() * 9000)}`,
      ...req.body,
    });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/orders/:id/status", async (req, res) => {
  try {
    const updated = await Order.findOneAndUpdate({ id: req.params.id }, { status: req.body.status }, { new: true });
    if (!updated) return res.status(404).json({ error: "Order not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  try {
    await Order.findOneAndDelete({ id: req.params.id });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==================== CUSTOMERS API ==================== */
app.get("/api/customers", async (req, res) => {
  try {
    const customers = await Customer.find().lean();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/customers", async (req, res) => {
  try {
    const newCust = await Customer.create({
      id: req.body.id || `CUST-${Math.floor(100 + Math.random() * 900)}`,
      ...req.body,
    });
    res.status(201).json(newCust);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/customers/:id", async (req, res) => {
  try {
    const updated = await Customer.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Customer not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/customers/:id", async (req, res) => {
  try {
    await Customer.findOneAndDelete({ id: req.params.id });
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==================== ANALYTICS API ==================== */
app.get("/api/analytics", async (req, res) => {
  try {
    const [orders, customersCount, productsCount, categoriesCount] = await Promise.all([
      Order.find().lean(),
      Customer.countDocuments(),
      Product.countDocuments(),
      Category.countDocuments(),
    ]);

    const totalRevenue = orders.reduce((acc, o) => acc + (o.status !== "Cancelled" ? o.total : 0), 0);
    const activeOrdersCount = orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length;

    res.json({
      totalRevenue,
      totalDevotees: customersCount,
      totalOfferings: productsCount,
      totalCollections: categoriesCount,
      activeOrdersCount,
      totalOrdersCount: orders.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✨ ARUMO MongoDB Atlas Backend REST API Server active on http://localhost:${PORT}`);
});
