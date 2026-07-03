import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Product, Category, Order, Customer, Admin } from "./models/index.js";
import { readDatabase } from "./dataStore.js"; // Use our seed data from dataStore

const ATLAS_URI = process.env.MONGODB_URI || "mongodb+srv://aruma:ImkPq0ivbcxeDo94@cluster0.p1mnjnn.mongodb.net/arumo?retryWrites=true&w=majority&appName=Cluster0";

export async function connectDB() {
  try {
    await mongoose.connect(ATLAS_URI);
    console.log("🌟 Connected to MongoDB Atlas Cloud Database (arumo)");
    await seedIfEmpty();
  } catch (err) {
    console.error("❌ MongoDB Atlas Connection Error:", err.message);
  }
}

async function seedIfEmpty() {
  try {
    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      console.log("🌱 Seeding initial products, categories, orders, customers...");
      const seed = readDatabase();
      
      if (seed.products?.length) await Product.insertMany(seed.products);
      if (seed.categories?.length) await Category.insertMany(seed.categories);
      if (seed.orders?.length) await Order.insertMany(seed.orders);
      if (seed.customers?.length) await Customer.insertMany(seed.customers);
      console.log("✅ Catalog seeded successfully into MongoDB Atlas!");
    }

    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await Admin.create({
        email: "admin@arumo.in",
        password: hashedPassword,
        name: "Sanctuary Master Admin"
      });
      console.log("👑 Default Admin Account created in MongoDB Atlas! (email: admin@arumo.in, pass: admin123)");
    }
  } catch (err) {
    console.error("Error seeding MongoDB:", err);
  }
}

export async function resetMongoSeed() {
  const seed = readDatabase();
  await Product.deleteMany({});
  await Category.deleteMany({});
  await Order.deleteMany({});
  await Customer.deleteMany({});

  if (seed.products?.length) await Product.insertMany(seed.products);
  if (seed.categories?.length) await Category.insertMany(seed.categories);
  if (seed.orders?.length) await Order.insertMany(seed.orders);
  if (seed.customers?.length) await Customer.insertMany(seed.customers);
  return { message: "MongoDB reset to divine seed defaults" };
}
