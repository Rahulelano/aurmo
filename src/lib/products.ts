import ganesha from "@/assets/product-ganesha.jpg";
import lamp from "@/assets/product-lamp.jpg";
import rudraksha from "@/assets/product-rudraksha.jpg";
import incense from "@/assets/product-incense.jpg";
import thali from "@/assets/product-thali.jpg";
import mandir from "@/assets/product-mandir.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  short: string;
  description: string;
  benefits: string[];
  specs: { label: string; value: string }[];
};

export const categories = [
  { slug: "pooja-essentials", name: "Pooja Essentials", desc: "Daily rituals, perfected.", image: thali },
  { slug: "brass-idols", name: "Brass Idols", desc: "Hand-cast deities of heirloom quality.", image: ganesha },
  { slug: "spiritual-gifts", name: "Spiritual Gifts", desc: "Curated blessings for every occasion.", image: rudraksha },
  { slug: "temple-decor", name: "Temple Decor", desc: "Sanctify every corner of your home.", image: mandir },
  { slug: "incense", name: "Incense & Fragrances", desc: "Aromas drawn from sacred groves.", image: incense },
  { slug: "rudraksha", name: "Rudraksha Collection", desc: "Authentic, energized, certified.", image: rudraksha },
  { slug: "sacred-lamps", name: "Sacred Lamps", desc: "Light that has been blessed.", image: lamp },
  { slug: "accessories", name: "Divine Accessories", desc: "Refined details for devout living.", image: thali },
];

export const products: Product[] = [
  {
    id: "ganesha-vighnaharta",
    name: "Vighnaharta Brass Ganesha",
    price: 4499, mrp: 5999, image: ganesha, category: "brass-idols",
    rating: 4.9, reviews: 248, badge: "Bestseller",
    short: "Hand-finished brass idol with antique patina.",
    description: "A meticulously hand-cast brass Ganesha idol, finished by South Indian sthapatis using techniques passed down five generations. Each piece is energized through a brief Pran Pratishtha before dispatch.",
    benefits: ["Removes obstacles from new ventures", "Invites prosperity & wisdom", "Energized before dispatch", "Heirloom-quality casting"],
    specs: [
      { label: "Material", value: "Solid Brass, antique gold finish" },
      { label: "Height", value: "9 inches" },
      { label: "Weight", value: "1.8 kg" },
      { label: "Origin", value: "Swamimalai, Tamil Nadu" },
    ],
  },
  {
    id: "kamakshi-deepam",
    name: "Kamakshi Brass Deepam",
    price: 1899, mrp: 2499, image: lamp, category: "sacred-lamps",
    rating: 4.8, reviews: 412, badge: "New",
    short: "Classic single-wick brass lamp for daily aarti.",
    description: "A traditional brass deepam with ornamental scrollwork, designed to burn pure cotton wicks soaked in sesame or castor oil. Its silhouette is drawn from the Kamakshi temple lamps of Kanchipuram.",
    benefits: ["Daily aarti & sandhya vandanam", "Pure brass construction", "Symbol of inner light", "Easy to clean & maintain"],
    specs: [
      { label: "Material", value: "Bell metal brass" },
      { label: "Height", value: "6 inches" },
      { label: "Burn time", value: "~3 hours per fill" },
      { label: "Origin", value: "Kanchipuram, Tamil Nadu" },
    ],
  },
  {
    id: "rudraksha-108",
    name: "5 Mukhi Rudraksha Mala — 108 Beads",
    price: 2299, image: rudraksha, category: "rudraksha",
    rating: 4.9, reviews: 893, badge: "Energized",
    short: "Lab-certified 5-mukhi beads, hand-knotted on silk.",
    description: "A 108-bead japa mala of certified Nepali 5-mukhi rudraksha, hand-knotted on natural silk with a guru bead and tassel. Comes with an authenticity card and a Rudrabhishek-energized pouch.",
    benefits: ["Calms the mind during japa", "Balances the heart chakra", "Lab-certified authenticity", "Suitable for all sadhakas"],
    specs: [
      { label: "Beads", value: "108 + 1 guru" },
      { label: "Bead size", value: "7–8 mm" },
      { label: "Origin", value: "Nepal Himalaya" },
      { label: "Certification", value: "Govt-approved lab" },
    ],
  },
  {
    id: "agarwood-incense",
    name: "Agarwood Temple Incense",
    price: 899, mrp: 1199, image: incense, category: "incense",
    rating: 4.7, reviews: 156,
    short: "Slow-burning sticks rolled with pure oud resin.",
    description: "Hand-rolled incense sticks blending wild-harvested agarwood, sandalwood and a whisper of frankincense — the same recipe burned at heritage Shaivite temples in coastal Karnataka.",
    benefits: ["Deepens meditation", "Purifies indoor air", "Charcoal-free clean burn", "No synthetic fragrance"],
    specs: [
      { label: "Sticks", value: "40 per box" },
      { label: "Burn time", value: "~45 min per stick" },
      { label: "Base", value: "Bamboo, masala-rolled" },
    ],
  },
  {
    id: "panchapatra-thali",
    name: "Panchapatra Pooja Thali",
    price: 2799, image: thali, category: "pooja-essentials",
    rating: 4.8, reviews: 327,
    short: "Complete brass thali set, ready for daily worship.",
    description: "A complete pooja thali in lustrous brass, including kumkum holder, akshata bowl, small deepam and a delicately fluted bell. Engraved with traditional kolam motifs along the rim.",
    benefits: ["Everything needed for daily pooja", "Hand-engraved kolam motifs", "Tarnish-resistant lacquer", "Gift-ready presentation"],
    specs: [
      { label: "Diameter", value: "9 inches" },
      { label: "Includes", value: "Thali, 3 katoris, deepam, bell" },
      { label: "Material", value: "Brass with lacquer" },
    ],
  },
  {
    id: "rosewood-mandir",
    name: "Rosewood Carved Home Mandir",
    price: 28499, mrp: 34999, image: mandir, category: "temple-decor",
    rating: 5.0, reviews: 64, badge: "Atelier",
    short: "Heirloom-grade rosewood mandir with gold leaf.",
    description: "A floor-standing home temple hand-carved from seasoned Indian rosewood, accented with 22kt gold-leaf gilding. Backlit niche with concealed warm LED. Made-to-order, dispatched in 4–6 weeks.",
    benefits: ["Heirloom craftsmanship", "Concealed warm LED", "22kt gold leaf detailing", "White-glove installation"],
    specs: [
      { label: "Height", value: "5 feet" },
      { label: "Wood", value: "Indian rosewood (sheesham)" },
      { label: "Finish", value: "Beeswax + 22kt gold leaf" },
      { label: "Lead time", value: "4–6 weeks" },
    ],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const byCategory = (slug: string) => products.filter((p) => p.category === slug);
