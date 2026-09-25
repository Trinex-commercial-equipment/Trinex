export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  specs: ProductSpec[];
  applications: string[];
  isFeatured?: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "induction",
    name: "Induction Cooking Equipment",
    slug: "induction",
    description: "Fast heating, energy-saving commercial induction hobs, wok ranges, and stock pot stoves.",
    image: "/assets/images/category_induction.jpg",
    itemCount: 12
  },
  {
    id: "cooking",
    name: "Heavy Duty Cooking Equipment",
    slug: "cooking",
    description: "Commercial cooking ranges, stock pot stoves, Chinese wok ranges, and food steamer cabinets.",
    image: "/assets/images/category_cooking.jpg",
    itemCount: 14
  },
  {
    id: "refrigeration",
    name: "Commercial Refrigeration",
    slug: "refrigeration",
    description: "Reach-in chillers, vertical stainless steel freezers, and cold holding cabinets.",
    image: "/assets/images/category_refrigeration.jpg",
    itemCount: 10
  },
  {
    id: "food-prep",
    name: "Food Preparation Machinery",
    slug: "food-prep",
    description: "Commercial food cutters, spiral dough kneaders, mixers, and holding cabinets.",
    image: "/assets/images/category_food_prep.jpg",
    itemCount: 9
  },
  {
    id: "holding-steamer",
    name: "Holding & Steamer Cabinets",
    slug: "holding-steamer",
    description: "Upright glass door food warmers, rice steamers, and temperature-controlled holding cabinets.",
    image: "/assets/images/category_holding_steamer.jpg",
    itemCount: 8
  },
  {
    id: "stainless-steel",
    name: "Stainless Steel Equipment",
    slug: "stainless-steel",
    description: "Custom heavy-gauge AISI 304 stainless steel worktables, sink units, and commercial hoods.",
    image: "/assets/images/category_cooking.jpg",
    itemCount: 16
  }
];

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: "prod-ind-1",
    name: "Countertop Commercial Induction Hob",
    category: "Induction Cooking Equipment",
    categorySlug: "induction",
    shortDescription: "High-output single induction cooktop featuring digital temperature control knob, fast heating, and energy-saving technology.",
    fullDescription: "Engineered for high-efficiency commercial cooking. Delivers instant flame-free heating with precise temperature regulation. Constructed with thick stainless steel body and high-strength black ceramic glass top.",
    image: "/assets/images/countertop_induction_hob.png",
    specs: [
      { label: "Heating Speed", value: "Fast Thermal Response" },
      { label: "Control", value: "Digital LED + Rotary Knob" },
      { label: "Material", value: "Heavy-Duty Stainless Steel" },
      { label: "Certifications", value: "CE, GS, RoHS Certified" },
      { label: "Efficiency", value: "Energy Saving (>90%)" }
    ],
    applications: ["Hotels", "Restaurants", "Cloud Kitchens", "Canteens"],
    isFeatured: true
  },
  {
    id: "prod-ind-2",
    name: "Concave Commercial Induction Wok Stove",
    category: "Induction Cooking Equipment",
    categorySlug: "induction",
    shortDescription: "Concave ceramic glass induction wok range with stainless steel wok pan, built for intense stir-frying and rapid heating.",
    fullDescription: "Specially contoured induction wok hob designed for Asian stir-fry, Chinese cooking, and sauce preparation. Delivers intense focused heat directly to the wok base.",
    image: "/assets/images/induction_wok_cooker.png",
    specs: [
      { label: "Wok Type", value: "Concave Ceramic Bowl" },
      { label: "Power Output", value: "Commercial High Power" },
      { label: "Safety", value: "Overheat & Auto-Shutoff" },
      { label: "Body", value: "AISI 304 Stainless Steel" },
      { label: "Pan Included", value: "Heavy Duty Wok Pan" }
    ],
    applications: ["Restaurants", "Hotels", "Food Courts", "Catering"],
    isFeatured: true
  },
  {
    id: "prod-ind-3",
    name: "Heavy-Duty Stock Pot Induction Range",
    category: "Induction Cooking Equipment",
    categorySlug: "induction",
    shortDescription: "Heavy-gauge low-height induction stock pot stove engineered for boiling large soup pots and heavy vessel cooking.",
    fullDescription: "Built to support heavy pots weighing up to 100+ kg. Features reinforced stainless steel body, multi-stage power levels, and precise temperature sensors for prolonged simmer or fast boil.",
    image: "/assets/images/stock_pot_stove.png",
    specs: [
      { label: "Weight Support", value: "Heavy Duty Vessel Load" },
      { label: "Structure", value: "Reinforced Low-Height Frame" },
      { label: "Control", value: "Slide Switch + Digital Display" },
      { label: "Safety", value: "Flame-Free Operation" },
      { label: "Certifications", value: "CE, GS, RoHS Approved" }
    ],
    applications: ["Canteens", "Central Kitchens", "Hotels", "Food Processing"],
    isFeatured: true
  },
  {
    id: "prod-ind-4",
    name: "Digital Precision Induction Cooker",
    category: "Induction Cooking Equipment",
    categorySlug: "induction",
    shortDescription: "Compact countertop commercial induction hob with multi-power digital display, ideal for live cooking stations and buffets.",
    fullDescription: "High-precision commercial cooktop suitable for front-of-house live cooking, banquets, and commercial line cooking.",
    image: "/assets/images/digital_induction_cooker.png",
    specs: [
      { label: "Surface", value: "Micro-Crystalline Glass" },
      { label: "Power Settings", value: "Multi-Level Digital Control" },
      { label: "Protection", value: "Safe & Reliable Sensors" },
      { label: "Application", value: "Buffets & Live Counter" },
      { label: "Certifications", value: "CE / RoHS Certified" }
    ],
    applications: ["Hotels", "Buffets", "Live Counters", "Restaurants"],
    isFeatured: true
  },
  {
    id: "prod-ind-5",
    name: "Under-Counter Stock Pot Induction Stove",
    category: "Heavy Duty Cooking Equipment",
    categorySlug: "cooking",
    shortDescription: "Floor-standing commercial induction stock pot burner with stainless steel storage cabinet base.",
    fullDescription: "Combines high-power induction stock pot heating with a spacious bottom storage cabinet for heavy pots and kitchen utensils.",
    image: "/assets/images/undercounter_stock_stove.png",
    specs: [
      { label: "Configuration", value: "Floor Standing + Cabinet" },
      { label: "Capacity", value: "High Volume Stock Pot" },
      { label: "Base", value: "SS Door Storage Cabinet" },
      { label: "Control", value: "Waterproof Rotary Controller" },
      { label: "Certifications", value: "CE, GS Certified" }
    ],
    applications: ["Canteens", "Catering Units", "Restaurants", "Hotels"],
    isFeatured: true
  },
  {
    id: "prod-ind-6",
    name: "Double Burner Commercial Induction Range",
    category: "Heavy Duty Cooking Equipment",
    categorySlug: "cooking",
    shortDescription: "Dual-zone commercial induction cooking range with bottom storage doors and independent zone controls.",
    fullDescription: "Heavy-duty double burner induction stove allowing simultaneous cooking at different power settings. Features enclosed stainless steel cabinet base.",
    image: "/assets/images/double_burner_range.png",
    specs: [
      { label: "Burners", value: "2 Independent Induction Zones" },
      { label: "Cabinet", value: "Enclosed Double Door SS" },
      { label: "Display", value: "Dual Digital Power Windows" },
      { label: "Heating", value: "Energy Efficient Induction" },
      { label: "Certifications", value: "CE, GS, RoHS Approved" }
    ],
    applications: ["Restaurants", "Cloud Kitchens", "Hotels", "Canteens"],
    isFeatured: true
  },
  {
    id: "prod-ind-7",
    name: "Glass Door Food Steamer & Warmer Cabinet",
    category: "Holding & Steamer Cabinets",
    categorySlug: "holding-steamer",
    shortDescription: "Commercial vertical food steamer cabinet with clear glass door, multi-tray rack system, and steam generation.",
    fullDescription: "High-capacity upright food steamer for rice, momos, dim sum, and vegetable steaming. Features double-pane tempered glass door and interior lighting.",
    image: "/assets/images/steamer_cabinet.png",
    specs: [
      { label: "Door Type", value: "Tempered Glass View Door" },
      { label: "Trays", value: "Multi-Layer Stainless Racks" },
      { label: "Steam Control", value: "Automatic Water Filling" },
      { label: "Mobility", value: "Castor Wheels Included" },
      { label: "Certifications", value: "CE / RoHS Certified" }
    ],
    applications: ["Hotels", "Canteens", "Dim Sum Bars", "Cloud Kitchens"],
    isFeatured: true
  },
  {
    id: "prod-ind-8",
    name: "Upright Insulated Stainless Holding Cabinet",
    category: "Holding & Steamer Cabinets",
    categorySlug: "holding-steamer",
    shortDescription: "Insulated vertical stainless steel food warming and holding cabinet with precise digital thermostat control.",
    fullDescription: "Maintains cooked food at safe serving temperatures for banquets, hospitals, and high-volume catering service.",
    image: "/assets/images/holding_cabinet.png",
    specs: [
      { label: "Door", value: "Solid Insulated SS Door" },
      { label: "Temperature", value: "Digital Precision Control" },
      { label: "Insulation", value: "High-Density Polyurethane" },
      { label: "Base", value: "Heavy-Duty Lockable Castors" },
      { label: "Certifications", value: "CE Approved" }
    ],
    applications: ["Banquets", "Catering Halls", "Hospitals", "Hotels"],
    isFeatured: true
  },
  {
    id: "prod-ind-9",
    name: "Chinese Wok Induction Station",
    category: "Induction Cooking Equipment",
    categorySlug: "induction",
    shortDescription: "Single large Chinese wok induction station with built-in water faucet, splashback guard, and high-power induction coil.",
    fullDescription: "Heavy-duty chef wok station designed for high-speed Asian cooking. Includes integrated water tap and drainage trough.",
    image: "/assets/images/chinese_wok_station.png",
    specs: [
      { label: "Station Type", value: "High-Power Chinese Wok Range" },
      { label: "Water System", value: "Built-in Faucet & Drain" },
      { label: "Splashback", value: "High SS Rear Guard" },
      { label: "Control", value: "Knee / Foot / Lever Switch" },
      { label: "Certifications", value: "CE, GS, RoHS Certified" }
    ],
    applications: ["Chinese Restaurants", "Hotels", "Asian Eateries", "Food Courts"],
    isFeatured: true
  }
];
