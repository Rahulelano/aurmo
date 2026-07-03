import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

const defaultSeedData = {
  products: [
    {
      id: "ganesha-vighnaharta",
      name: "Vighnaharta Brass Ganesha",
      price: 4499, mrp: 5999, image: "/assets/product-ganesha.jpg", category: "brass-idols",
      rating: 4.9, reviews: 248, badge: "Bestseller",
      short: "Hand-finished brass idol with antique patina.",
      description: "A meticulously hand-cast brass Ganesha idol, finished by South Indian sthapatis using techniques passed down five generations. Each piece is energized through a brief Pran Pratishtha before dispatch.",
      benefits: ["Removes obstacles from new ventures", "Invites prosperity & wisdom", "Energized before dispatch", "Heirloom-quality casting"],
      specs: [
        { label: "Material", value: "Solid Brass, antique gold finish" },
        { label: "Height", value: "9 inches" },
        { label: "Weight", value: "1.8 kg" },
        { label: "Origin", value: "Swamimalai, Tamil Nadu" }
      ]
    },
    {
      id: "kamakshi-deepam",
      name: "Kamakshi Brass Deepam",
      price: 1899, mrp: 2499, image: "/assets/product-lamp.jpg", category: "sacred-lamps",
      rating: 4.8, reviews: 412, badge: "New",
      short: "Classic single-wick brass lamp for daily aarti.",
      description: "A traditional brass deepam with ornamental scrollwork, designed to burn pure cotton wicks soaked in sesame or castor oil. Its silhouette is drawn from the Kamakshi temple lamps of Kanchipuram.",
      benefits: ["Daily aarti & sandhya vandanam", "Pure brass construction", "Symbol of inner light", "Easy to clean & maintain"],
      specs: [
        { label: "Material", value: "Bell metal brass" },
        { label: "Height", value: "6 inches" },
        { label: "Burn time", value: "~3 hours per fill" },
        { label: "Origin", value: "Kanchipuram, Tamil Nadu" }
      ]
    },
    {
      id: "rudraksha-108",
      name: "5 Mukhi Rudraksha Mala — 108 Beads",
      price: 2299, image: "/assets/product-rudraksha.jpg", category: "rudraksha",
      rating: 4.9, reviews: 893, badge: "Energized",
      short: "Lab-certified 5-mukhi beads, hand-knotted on silk.",
      description: "A 108-bead japa mala of certified Nepali 5-mukhi rudraksha, hand-knotted on natural silk with a guru bead and tassel. Comes with an authenticity card and a Rudrabhishek-energized pouch.",
      benefits: ["Calms the mind during japa", "Balances the heart chakra", "Lab-certified authenticity", "Suitable for all sadhakas"],
      specs: [
        { label: "Beads", value: "108 + 1 guru" },
        { label: "Bead size", value: "7–8 mm" },
        { label: "Origin", value: "Nepal Himalaya" },
        { label: "Certification", value: "Govt-approved lab" }
      ]
    },
    {
      id: "agarwood-incense",
      name: "Agarwood Temple Incense",
      price: 899, mrp: 1199, image: "/assets/product-incense.jpg", category: "incense",
      rating: 4.7, reviews: 156,
      short: "Slow-burning sticks rolled with pure oud resin.",
      description: "Hand-rolled incense sticks blending wild-harvested agarwood, sandalwood and a whisper of frankincense — the same recipe burned at heritage Shaivite temples in coastal Karnataka.",
      benefits: ["Deepens meditation", "Purifies indoor air", "Charcoal-free clean burn", "No synthetic fragrance"],
      specs: [
        { label: "Sticks", value: "40 per box" },
        { label: "Burn time", value: "~45 min per stick" },
        { label: "Base", value: "Bamboo, masala-rolled" }
      ]
    },
    {
      id: "panchapatra-thali",
      name: "Panchapatra Pooja Thali",
      price: 2799, image: "/assets/product-thali.jpg", category: "pooja-essentials",
      rating: 4.8, reviews: 327,
      short: "Complete brass thali set, ready for daily worship.",
      description: "A complete pooja thali in lustrous brass, including kumkum holder, akshata bowl, small deepam and a delicately fluted bell. Engraved with traditional kolam motifs along the rim.",
      benefits: ["Everything needed for daily pooja", "Hand-engraved kolam motifs", "Tarnish-resistant lacquer", "Gift-ready presentation"],
      specs: [
        { label: "Diameter", value: "9 inches" },
        { label: "Includes", value: "Thali, 3 katoris, deepam, bell" },
        { label: "Material", value: "Brass with lacquer" }
      ]
    },
    {
      id: "rosewood-mandir",
      name: "Rosewood Carved Home Mandir",
      price: 28499, mrp: 34999, image: "/assets/product-mandir.jpg", category: "temple-decor",
      rating: 5.0, reviews: 64, badge: "Atelier",
      short: "Heirloom-grade rosewood mandir with gold leaf.",
      description: "A floor-standing home temple hand-carved from seasoned Indian rosewood, accented with 22kt gold-leaf gilding. Backlit niche with concealed warm LED. Made-to-order, dispatched in 4–6 weeks.",
      benefits: ["Heirloom craftsmanship", "Concealed warm LED", "22kt gold leaf detailing", "White-glove installation"],
      specs: [
        { label: "Height", value: "5 feet" },
        { label: "Wood", value: "Indian rosewood (sheesham)" },
        { label: "Finish", value: "Beeswax + 22kt gold leaf" },
        { label: "Lead time", value: "4–6 weeks" }
      ]
    }
  ],
  categories: [
    { slug: "pooja-essentials", name: "Pooja Essentials", desc: "Daily rituals, perfected.", image: "/assets/product-thali.jpg" },
    { slug: "brass-idols", name: "Brass Idols", desc: "Hand-cast deities of heirloom quality.", image: "/assets/product-ganesha.jpg" },
    { slug: "spiritual-gifts", name: "Spiritual Gifts", desc: "Curated blessings for every occasion.", image: "/assets/product-rudraksha.jpg" },
    { slug: "temple-decor", name: "Temple Decor", desc: "Sanctify every corner of your home.", image: "/assets/product-mandir.jpg" },
    { slug: "incense", name: "Incense & Fragrances", desc: "Aromas drawn from sacred groves.", image: "/assets/product-incense.jpg" },
    { slug: "rudraksha", name: "Rudraksha Collection", desc: "Authentic, energized, certified.", image: "/assets/product-rudraksha.jpg" },
    { slug: "sacred-lamps", name: "Sacred Lamps", desc: "Light that has been blessed.", image: "/assets/product-lamp.jpg" },
    { slug: "accessories", name: "Divine Accessories", desc: "Refined details for devout living.", image: "/assets/product-thali.jpg" }
  ],
  orders: [
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
        { id: "kamakshi-deepam", name: "Kamakshi Brass Deepam", price: 1899, qty: 1 }
      ],
      shippingAddress: "12, Sannathi Street, Mylapore, Chennai 600004"
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
        { id: "rudraksha-108", name: "5 Mukhi Rudraksha Mala — 108 Beads", price: 2299, qty: 1 }
      ],
      shippingAddress: "45, West Masi Street, Madurai 625001"
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
        { id: "rosewood-mandir", name: "Rosewood Carved Home Mandir", price: 28499, qty: 1 }
      ],
      shippingAddress: "8, Poes Garden, Chennai 600086"
    }
  ],
  customers: [
    { id: "CUST-101", name: "Aravind R.", email: "aravind@arumo.in", phone: "+91 98404 00000", ordersCount: 5, totalSpent: 42500, joinedDate: "14 Jan 2025", status: "VIP" },
    { id: "CUST-102", name: "Lakshmi Narayanan", email: "lakshmi@gmail.com", phone: "+91 94432 11223", ordersCount: 2, totalSpent: 4598, joinedDate: "10 Mar 2026", status: "Active" },
    { id: "CUST-103", name: "Vikram Sundar", email: "vikram.s@outlook.com", phone: "+91 98840 55667", ordersCount: 1, totalSpent: 28499, joinedDate: "01 May 2026", status: "New" },
    { id: "CUST-104", name: "Divya Krishnan", email: "divya.k@yahoo.in", phone: "+91 97890 33445", ordersCount: 3, totalSpent: 8900, joinedDate: "18 Feb 2026", status: "Active" }
  ]
};

export function readDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    writeDatabase(defaultSeedData);
    return defaultSeedData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file, returning defaults:", err);
    return defaultSeedData;
  }
}

export function writeDatabase(data) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function resetDatabase() {
  writeDatabase(defaultSeedData);
  return defaultSeedData;
}
