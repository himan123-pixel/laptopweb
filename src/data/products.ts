export type CategoryId = "ultrabook" | "workstation" | "gaming" | "desktop";

export interface Finish {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  series: string;
  category: CategoryId;
  tagline: string;
  description: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  stock: number;
  badge?: string;
  leadTime: string;
  finishes: Finish[];
  chips: [string, string, string];
  specs: { label: string; value: string }[];
  highlights: string[];
  image: string;
}

export const CATEGORIES: { id: CategoryId; label: string; blurb: string }[] = [
  { id: "ultrabook", label: "Ultrabooks", blurb: "Featherweight, all-day cells" },
  { id: "workstation", label: "Workstations", blurb: "ISV-certified muscle" },
  { id: "gaming", label: "Gaming", blurb: "High refresh, low noise" },
  { id: "desktop", label: "Desktops", blurb: "Bench-built towers & minis" },
];

export const categoryLabel = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export const FREE_SHIPPING_THRESHOLD = 1500;
export const FLAT_SHIPPING = 24;
export const TAX_RATE = 0.075;

export const formatPrice = (n: number) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

export const formatPriceExact = (n: number) =>
  "$" +
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const TICKER_ITEMS = [
  "Free shipping over $1,500",
  "48-hour burn-in on every unit",
  "5-year care plan included",
  "Oiled aluminium, never painted",
  "Trade-ins welcome",
  "Bench slots: 4 remaining this week",
  "Soldered nothing — serviceable everything",
];

export const PRODUCTS: Product[] = [
  {
    id: "aeris-14",
    name: "Aeris 14",
    series: "Series VII · Ultrabook",
    category: "ultrabook",
    tagline: "A 14-inch OLED that weighs less than your notebook.",
    description:
      "Milled from a single billet of sandstone-toned aluminium, the Aeris 14 disappears into a tote and refuses to die before dinner. The 2.8K OLED is calibrated on our bench to Delta-E < 1, and the fans only wake up when you ask them to.",
    price: 1449,
    compareAt: 1599,
    rating: 4.9,
    reviews: 214,
    stock: 12,
    badge: "Bench favourite",
    leadTime: "Ships in 3–5 days",
    finishes: [
      { name: "Sandstone", hex: "#c9b296" },
      { name: "Graphite", hex: "#4a443c" },
      { name: "Moss", hex: "#57603f" },
    ],
    chips: ["Core Ultra 7", "32 GB", "2.8K OLED"],
    specs: [
      { label: "Processor", value: "Intel Core Ultra 7 258V" },
      { label: "Memory", value: "32 GB LPDDR5x-8533" },
      { label: "Storage", value: "1 TB NVMe Gen 4" },
      { label: "Display", value: "14″ 2.8K OLED · 120 Hz · 500 nit" },
      { label: "Graphics", value: "Intel Arc 140V" },
      { label: "Battery", value: "72 Wh · up to 21 h" },
      { label: "Weight", value: "1.12 kg" },
    ],
    highlights: [
      "CNC-milled unibody, oiled by hand",
      "0 dB at idle — genuinely fanless-feeling",
      "Bench-calibrated OLED, Delta-E < 1",
      "Two Gen-4 slots, both user-swappable",
    ],
    image:
      "https://image.qwenlm.ai/generated-images/a6be0a86-c2a4-44d2-a561-98f923453b25/_result.png",
  },
  {
    id: "forge-16",
    name: "Forge 16 Pro",
    series: "Series IV · Mobile Workstation",
    category: "workstation",
    tagline: "Certified muscle for renders that run overnight.",
    description:
      "The Forge is the machine our customers' customers never see — the one doing the FEA pass, the colour grade, the 40-layer assembly rebuild. ECC memory, an Ada-generation GPU, and a vapour chamber tuned for sustained loads rather than benchmark sprints.",
    price: 2899,
    rating: 4.8,
    reviews: 96,
    stock: 7,
    badge: "ISV certified",
    leadTime: "Built to order · 10 days",
    finishes: [
      { name: "Graphite", hex: "#45403a" },
      { name: "Ore", hex: "#6b573f" },
    ],
    chips: ["Core Ultra 9", "64 GB ECC", "RTX Ada"],
    specs: [
      { label: "Processor", value: "Intel Core Ultra 9 285HX · 24 cores" },
      { label: "Memory", value: "64 GB DDR5 ECC · 5600" },
      { label: "Storage", value: "2 TB NVMe Gen 4 · RAID-ready" },
      { label: "Display", value: "16″ UHD+ IPS · 600 nit · 100% DCI-P3" },
      { label: "Graphics", value: "NVIDIA RTX 5000 Ada · 16 GB" },
      { label: "Battery", value: "99 Wh · 140 W GaN charger" },
      { label: "Weight", value: "2.38 kg" },
    ],
    highlights: [
      "ISV-certified for SolidWorks, Maya & Resolve",
      "ECC memory guards long unattended renders",
      "Sustained 145 W without throttling",
      "Triple-storage bay with tool-free doors",
    ],
    image:
      "https://image.qwenlm.ai/generated-images/4cb93bac-ff74-483b-8430-af0353a0a250/_result.png",
  },
  {
    id: "ember-gt16",
    name: "Ember GT16",
    series: "Series III · Gaming",
    category: "gaming",
    tagline: "240 Hz, vapour-chamber cooled, whisper-quiet at 60.",
    description:
      "We tuned the Ember the way we tune everything: quiet first, fast always. A full-power 5070 Ti sits under a copper vapour chamber with fan curves drawn by ear, not by spreadsheet. The copper backlight is the only light show it needs.",
    price: 2199,
    compareAt: 2399,
    rating: 4.7,
    reviews: 342,
    stock: 3,
    badge: "Low stock",
    leadTime: "Ships in 2–4 days",
    finishes: [
      { name: "Charcoal", hex: "#33302c" },
      { name: "Copperline Edition", hex: "#b0662f" },
    ],
    chips: ["Ryzen 9", "240 Hz mini-LED", "RTX 5070 Ti"],
    specs: [
      { label: "Processor", value: "AMD Ryzen 9 9955HX · 16 cores" },
      { label: "Memory", value: "32 GB DDR5-5600 · expandable to 96 GB" },
      { label: "Storage", value: "2 TB NVMe Gen 4 + free M.2 bay" },
      { label: "Display", value: "16″ QHD mini-LED · 240 Hz · 1100 nit" },
      { label: "Graphics", value: "NVIDIA RTX 5070 Ti · 140 W TGP" },
      { label: "Cooling", value: "Copper vapour chamber · 38 dB max" },
      { label: "Weight", value: "2.1 kg" },
    ],
    highlights: [
      "Fan curves tuned by ear on the bench",
      "Full-power GPU — no silent-mode haircut",
      "Per-key copper backlight, no rainbow default",
      "Mux switch + advanced Optimus",
    ],
    image:
      "https://image.qwenlm.ai/generated-images/123a318f-6e90-4805-92d7-11f572af8bda/_result.png",
  },
  {
    id: "hearth-mini",
    name: "Hearth Mini",
    series: "Series II · Compact Desktop",
    category: "desktop",
    tagline: "A 3-litre PC that lives on a shelf and stays silent.",
    description:
      "The Hearth is our love letter to the small desk. A 3.1-litre cream shell with a walnut lid, it runs a full desktop chip at 19 dBA — quieter than the room it sits in. Perfect as a studio brain, a media machine, or somebody's first real computer.",
    price: 899,
    rating: 4.9,
    reviews: 158,
    stock: 20,
    badge: "Silent build",
    leadTime: "Ships in 2–3 days",
    finishes: [
      { name: "Cream / Walnut", hex: "#c9b296" },
      { name: "Graphite / Oak", hex: "#4a443c" },
    ],
    chips: ["Ryzen 7", "3.1 L chassis", "19 dBA"],
    specs: [
      { label: "Processor", value: "AMD Ryzen 7 8845HS · 8 cores" },
      { label: "Memory", value: "32 GB DDR5-5600 SODIMM" },
      { label: "Storage", value: "1 TB NVMe Gen 4" },
      { label: "Graphics", value: "Radeon 780M · drives 3× 4K displays" },
      { label: "Chassis", value: "3.1 L aluminium + walnut lid" },
      { label: "Noise", value: "19 dBA under sustained load" },
      { label: "Footprint", value: "155 × 155 × 130 mm" },
    ],
    highlights: [
      "Smaller than a hardback novel, nearly",
      "Tool-free lid — upgrades take minutes",
      "Zero-RPM mode at desk workload",
      "VESA-mountable behind a monitor",
    ],
    image:
      "https://image.qwenlm.ai/generated-images/58f869f6-69ad-455b-a39f-88e922d1c590/_result.png",
  },
  {
    id: "monolith",
    name: "Monolith Tower",
    series: "Series V · Flagship Desktop",
    category: "desktop",
    tagline: "Our flagship. Built like furniture, cooled like a kiln.",
    description:
      "One Monolith leaves the bench each week. Bronze-anodised aluminium, a hand-brazed cooling loop option, and cable runs combed until they look drawn on. Every unit ships with its burn-in report, signed by the technician who built it.",
    price: 3499,
    rating: 5.0,
    reviews: 41,
    stock: 4,
    badge: "Flagship",
    leadTime: "Built to order · 2 weeks",
    finishes: [
      { name: "Bronze", hex: "#8c5a2b" },
      { name: "Obsidian", hex: "#2e2b28" },
    ],
    chips: ["Ryzen 9 9950X", "RTX 5090", "Custom loop"],
    specs: [
      { label: "Processor", value: "AMD Ryzen 9 9950X · delidded & tuned" },
      { label: "Memory", value: "64 GB DDR5-6000 CL30" },
      { label: "Storage", value: "4 TB NVMe Gen 5 + 8 TB HDD vault" },
      { label: "Graphics", value: "NVIDIA RTX 5090 · 32 GB" },
      { label: "Cooling", value: "Hand-brazed loop · 280 + 360 rads" },
      { label: "Chassis", value: "42 L bronze-anodised aluminium" },
      { label: "Acoustics", value: "26 dBA gaming · 31 dBA full load" },
    ],
    highlights: [
      "Signed burn-in report in every box",
      "Loop pressure-tested for 72 hours",
      "Dust filters on magnetic bronze rails",
      "10-year chassis guarantee",
    ],
    image:
      "https://image.qwenlm.ai/generated-images/b8cf14f7-29ae-48c0-819b-52e8ef71e4f7/_result.png",
  },
  {
    id: "drift-13",
    name: "Drift 13",
    series: "Series II · Convertible",
    category: "ultrabook",
    tagline: "Fanless, flippable, and stubborn about battery life.",
    description:
      "A 13-inch 2-in-1 with no moving parts at all — the Drift is sealed, silent, and runs two full days of note-taking on a charge. The moss shell is wrapped in a warm fabric texture that gets better looking the more you carry it.",
    price: 1099,
    rating: 4.6,
    reviews: 187,
    stock: 15,
    badge: "New arrival",
    leadTime: "Ships in 3–5 days",
    finishes: [
      { name: "Moss", hex: "#57603f" },
      { name: "Sand", hex: "#cbb79a" },
      { name: "Slate", hex: "#5a5f66" },
    ],
    chips: ["Fanless", "990 g", "2-day battery"],
    specs: [
      { label: "Processor", value: "Intel Core Ultra 5 226V · fanless" },
      { label: "Memory", value: "16 GB LPDDR5x on package" },
      { label: "Storage", value: "512 GB NVMe Gen 4" },
      { label: "Display", value: "13.3″ 3:2 touch · 4096-pressure stylus" },
      { label: "Battery", value: "63 Wh · up to 24 h video" },
      { label: "Build", value: "Fabric-textured shell · IP52" },
      { label: "Weight", value: "990 g" },
    ],
    highlights: [
      "Zero fans, zero vents, zero noise",
      "Stylus garaged in the hinge",
      "360° hinge rated for 40,000 flips",
      "Two-day real-world battery",
    ],
    image:
      "https://image.qwenlm.ai/generated-images/542ef6b4-4500-41e9-8df5-d797a5821a55/_result.png",
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
