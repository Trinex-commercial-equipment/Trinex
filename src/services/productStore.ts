import { Product, Category } from '../types/product';
import {
  getSupabase,
  isSupabaseConfigured,
  mapRowToProduct,
  mapProductToRow,
  mapRowToCategory,
  mapCategoryToRow,
  logSupabaseError
} from './supabaseClient';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-induction',
    name: 'Commercial Induction',
    slug: 'commercial-induction',
    description: 'Energy-efficient, fast-heating induction cooktops, wok stoves, and countertop hobs for modern kitchens.',
    image: '/assets/images/category_induction.jpg',
    displayOrder: 1,
  },
  {
    id: 'cat-cooking',
    name: 'Cooking Equipment',
    slug: 'cooking-equipment',
    description: 'Heavy-duty commercial cooking ranges, Chinese wok stations, and stock pot stoves.',
    image: '/assets/images/category_cooking.jpg',
    displayOrder: 2,
  },
  {
    id: 'cat-refrigeration',
    name: 'Commercial Refrigeration',
    slug: 'commercial-refrigeration',
    description: 'Reach-in commercial chillers, upright vertical freezers, and cold line storage.',
    image: '/assets/images/category_refrigeration.jpg',
    displayOrder: 3,
  },
  {
    id: 'cat-food-prep',
    name: 'Food Preparation',
    slug: 'food-prep',
    description: 'Dough kneaders, vegetable cutters, planetary mixers, and high-efficiency prep machinery.',
    image: '/assets/images/category_food_prep.jpg',
    displayOrder: 4,
  },
  {
    id: 'cat-holding-steamer',
    name: 'Holding & Steamer Cabinets',
    slug: 'holding-steamer',
    description: 'Commercial food warmers, electric rice steamers, and temperature-controlled holding units.',
    image: '/assets/images/category_holding_steamer.jpg',
    displayOrder: 5,
  },
  {
    id: 'cat-stainless-steel',
    name: 'Stainless Steel Equipment',
    slug: 'stainless-steel',
    description: 'AISI 304 food-grade stainless steel custom prep tables, sink units, and commercial exhaust systems.',
    image: '/assets/images/category_cooking.jpg',
    displayOrder: 6,
  },
  {
    id: 'cat-bakery',
    name: 'Bakery Equipment',
    slug: 'bakery-equipment',
    description: 'Deck ovens, rotary ovens, proofing cabinets, and commercial bakery machinery.',
    image: '/assets/images/category_food_prep.jpg',
    displayOrder: 7,
  },
  {
    id: 'cat-kitchen-automation',
    name: 'Kitchen Automation',
    slug: 'kitchen-automation',
    description: 'Automated cooking systems, robotic stir-fryers, and programmable smart kitchen appliances.',
    image: '/assets/images/category_induction.jpg',
    displayOrder: 8,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-demo-1',
    slug: 'commercial-induction-cooktop-35kw-flat-model',
    name: 'Commercial Induction Cooktop',
    brand: 'Trinex',
    model: '3.5 kW Flat Model',
    category: 'Commercial Induction',
    categorySlug: 'commercial-induction',
    shortDescription: 'Heavy-duty 3.5 kW countertop commercial induction cooktop engineered for fast, energy-efficient, and continuous commercial kitchen operation.',
    description: 'Engineered specifically for demanding commercial kitchens, the Trinex 3.5 kW Flat Model Commercial Induction Cooktop delivers instant, flame-free heat directly to the cookware. Built with a heavy-duty food-grade stainless steel body and high-temperature thermal shock resistant microcrystalline glass plate, it ensures rapid thermal response and significant reduction in kitchen ambient heat. Featuring 360° rotary control with a crisp digital power level display, it provides chefs with instantaneous heat precision while consuming significantly less energy compared to traditional LPG burners.',
    images: [
      '/assets/images/countertop_induction_hob.png',
      '/assets/images/trinex_induction_banner.jpg',
      '/assets/images/category_induction.jpg'
    ],
    power: '3.5 kW single phase',
    cookingType: 'Induction',
    cookingSurface: 'Flat',
    installation: 'Countertop',
    application: 'Commercial Kitchen',
    warranty: '1 Year',
    idealFor: [
      'Restaurants',
      'Hotels',
      'Catering',
      'Cloud Kitchens',
      'Canteens',
      'Cafeterias',
      'Food Courts',
      'Bakeries',
      'Institutional Kitchens'
    ],
    features: [
      'Instant high-efficiency heating with >90% energy transfer to cookware',
      'Heavy-duty commercial grade AISI stainless steel chassis and reinforced casing',
      'Impact-resistant microcrystalline flat ceramic glass cooking surface',
      'Smooth rotary power control knob with multi-level precision heating settings',
      'Flame-free operation reducing ambient kitchen temperature and HVAC cooling load',
      'Dual high-flow cooling fans for continuous commercial heavy-duty duty cycle',
      'Built-in safety protections: Overheat cut-off, dry-boil detection, and voltage fluctuation protection'
    ],
    specifications: [
      { label: 'Brand', value: 'Trinex' },
      { label: 'Product', value: 'Commercial Induction Cooktop' },
      { label: 'Model', value: '3.5 kW Flat Model' },
      { label: 'Power', value: '3.5 kW single phase' },
      { label: 'Voltage / Frequency', value: '220V - 240V / 50-60 Hz' },
      { label: 'Cooking Type', value: 'Induction' },
      { label: 'Cooking Surface', value: 'Flat High-Strength Ceramic Glass' },
      { label: 'Installation', value: 'Countertop' },
      { label: 'Application', value: 'Commercial Kitchen' },
      { label: 'Housing Material', value: 'High-Gauge Commercial Stainless Steel' },
      { label: 'Warranty', value: '1 Year Standard Commercial Warranty' }
    ],
    dimensions: '350 x 420 x 100 mm',
    voltage: '220V - 240V',
    phase: 'Single Phase',
    availability: 'in_stock',
    featured: true,
    fastMoving: true,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-demo-2',
    slug: 'commercial-reach-in-refrigerator-double-door',
    name: 'Commercial Reach-In Refrigerator',
    brand: 'Trinex',
    model: 'Double Door Chiller (1000L)',
    category: 'Commercial Refrigeration',
    categorySlug: 'commercial-refrigeration',
    shortDescription: 'Heavy-duty 1000 Litre upright commercial vertical chiller with digital temperature controller and ventilated forced-air cooling.',
    description: 'Designed for high-demand restaurant kitchens and central food production facilities, the Trinex Double Door Commercial Reach-In Refrigerator provides rapid temperature pull-down and uniform cooling across all shelves. Built with premium AISI 304 food-grade stainless steel interior and exterior, high-density cyclopentane insulation, and an energy-efficient tropicalized hermetic compressor capable of operating reliably in ambient temperatures up to 43°C.',
    images: [
      '/assets/images/commercial_refrigerator.jpg',
      '/assets/images/category_refrigeration.jpg'
    ],
    power: '650 W',
    cookingType: 'Refrigeration',
    cookingSurface: 'Vertical Chiller',
    installation: 'Floor Standing with Castors',
    application: 'Commercial Food Storage',
    warranty: '1 Year Comprehensive + 4 Years Compressor',
    idealFor: [
      'Restaurants',
      'Hotels',
      'Cloud Kitchens',
      'Food Courts',
      'Cafeterias',
      'Bakeries'
    ],
    features: [
      'Ventilated dynamic refrigeration system ensuring uniform air distribution',
      'Full AISI 304 food-grade stainless steel interior and exterior construction',
      'Digital electronic thermostat with automatic electric defrost cycles',
      'Self-closing doors with 90° stay-open feature and magnetic door gaskets',
      'Heavy-duty adjustable PVC-coated wire shelves with high weight capacity',
      'Heavy-duty lockable swivel castors for easy kitchen mobility and cleaning'
    ],
    specifications: [
      { label: 'Brand', value: 'Trinex' },
      { label: 'Product', value: 'Commercial Reach-In Refrigerator' },
      { label: 'Model', value: 'Double Door Chiller (1000L)' },
      { label: 'Capacity', value: '1000 Litres' },
      { label: 'Temperature Range', value: '+1°C to +8°C' },
      { label: 'Cooling Type', value: 'Ventilated Air Circulation' },
      { label: 'Voltage', value: '220V - 240V / 50 Hz' },
      { label: 'Refrigerant', value: 'Eco-Friendly R290' },
      { label: 'Dimensions', value: '1220 x 760 x 1980 mm' },
      { label: 'Warranty', value: '1 Year + 4 Years Compressor' }
    ],
    dimensions: '1220 x 760 x 1980 mm',
    voltage: '220V - 240V',
    phase: 'Single Phase',
    availability: 'in_stock',
    featured: true,
    fastMoving: true,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-demo-3',
    slug: 'heavy-duty-commercial-cooking-range-4-burner',
    name: 'Heavy-Duty Commercial Cooking Range',
    brand: 'Trinex',
    model: '4-Burner Range with Oven',
    category: 'Cooking Equipment',
    categorySlug: 'cooking-equipment',
    shortDescription: 'Industrial heavy-duty 4-burner commercial cooking range with high-output cast iron burners and integrated GN 2/1 static oven.',
    description: 'The Trinex 4-Burner Commercial Cooking Range is built for rigorous, high-volume kitchen operations. Constructed from heavy-gauge stainless steel with heavy-duty cast iron pan supports, it provides unmatched stability for large stock pots and woks. Features individual pilot flames, flame failure safety valves, and an insulated bottom static oven that accommodates standard full-size GN pans.',
    images: [
      '/assets/images/cooking_range.jpg',
      '/assets/images/category_cooking.jpg'
    ],
    power: '28 kW Total Thermal Output',
    cookingType: 'Gas Cooking Range',
    cookingSurface: 'Cast Iron Heavy Trivets',
    installation: 'Floor Standing',
    application: 'Commercial Kitchens & Restaurants',
    warranty: '1 Year Commercial Warranty',
    idealFor: [
      'Restaurants',
      'Hotels',
      'Catering',
      'Canteens',
      'Institutional Kitchens'
    ],
    features: [
      'High-efficiency brass flame spreaders with heavy cast iron pan supports',
      'Flame failure safety thermocouple protection on every burner',
      'Ergonomic cool-touch industrial control knobs with precision flame modulation',
      'Full pull-out stainless steel crumb and grease collection trays for easy cleaning',
      'Heavy-duty insulated static oven base with thermostatic control up to 300°C',
      'Height adjustable stainless steel heavy-duty bullet feet'
    ],
    specifications: [
      { label: 'Brand', value: 'Trinex' },
      { label: 'Product', value: 'Heavy Duty Cooking Range' },
      { label: 'Model', value: '4-Burner with Oven' },
      { label: 'Burners', value: '4 High Power Cast Iron Burners' },
      { label: 'Gas Type', value: 'LPG / Natural Gas' },
      { label: 'Total Output', value: '28 kW' },
      { label: 'Oven Capacity', value: 'Fits GN 2/1 Sheet Pans' },
      { label: 'Dimensions', value: '800 x 900 x 850 mm' },
      { label: 'Body Material', value: 'Heavy Duty AISI Stainless Steel' },
      { label: 'Warranty', value: '1 Year Commercial Warranty' }
    ],
    dimensions: '800 x 900 x 850 mm',
    voltage: 'Non-Electric / Gas Fired',
    phase: 'Gas',
    availability: 'in_stock',
    featured: true,
    fastMoving: true,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-demo-4',
    slug: 'commercial-chinese-wok-station-single-burner',
    name: 'Commercial Chinese Wok Station',
    brand: 'Trinex',
    model: 'Turbo Jet Single Wok Range',
    category: 'Cooking Equipment',
    categorySlug: 'cooking-equipment',
    shortDescription: 'High-intensity turbo jet Chinese wok station with integrated air blower and stainless steel water-cooled backsplash.',
    description: 'Engineered specifically for Asian and Indo-Chinese cuisine demanding ultra-fast stir frying and extreme heat. The Trinex Single Burner Chinese Wok Station features an ultra-powerful turbo jet burner with forced-draft air blower, water deck cooling system to prevent chef fatigue and kitchen heat build-up, and an integrated rear swivel water faucet for rapid cooking.',
    images: [
      '/assets/images/chinese_wok_station.png',
      '/assets/images/category_cooking.jpg'
    ],
    power: '32 kW Jet Burner + 250W Blower',
    cookingType: 'Turbo Jet Stir Fry',
    cookingSurface: 'Cast Iron Wok Ring',
    installation: 'Floor Standing',
    application: 'Indo-Chinese & Asian Kitchens',
    warranty: '1 Year Commercial Warranty',
    idealFor: [
      'Asian Restaurants',
      'Cloud Kitchens',
      'Food Courts',
      'Hotels',
      'Catering'
    ],
    features: [
      'Ultra-high output turbo jet burner for high heat stir-fry wok cooking',
      'Continuous running water cooling system over top plate to keep station cool',
      'Built-in knee-operated water control valve and swivel cooking faucet',
      'Integrated rear grease drainage channel with removable waste strainer',
      'Heavy-duty cast iron wok ring supporting standard 14" to 22" commercial woks',
      'Safety flame failure protection and pilot flame ignition system'
    ],
    specifications: [
      { label: 'Brand', value: 'Trinex' },
      { label: 'Product', value: 'Commercial Chinese Wok Station' },
      { label: 'Model', value: 'Turbo Jet Single Wok Range' },
      { label: 'Burner Type', value: 'Turbo Jet with Electric Blower' },
      { label: 'Wok Ring Size', value: '16 Inch Heavy Cast Iron' },
      { label: 'Gas Type', value: 'LPG / PNG' },
      { label: 'Dimensions', value: '900 x 1050 x 850 mm' },
      { label: 'Construction', value: 'AISI 304 High Gauge Stainless Steel' },
      { label: 'Warranty', value: '1 Year Commercial Warranty' }
    ],
    dimensions: '900 x 1050 x 850 mm',
    voltage: '220V (for air blower) + Gas',
    phase: 'Single Phase',
    availability: 'in_stock',
    featured: true,
    fastMoving: true,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-demo-5',
    slug: 'commercial-planetary-food-mixer-20-litre',
    name: 'Commercial Planetary Food Mixer',
    brand: 'Trinex',
    model: '20 Litre Heavy Duty Mixer',
    category: 'Food Preparation',
    categorySlug: 'food-prep',
    shortDescription: 'Industrial 20L planetary food mixer with 3 interchangeable attachments (dough hook, flat beater, wire whip) and 3-speed gear drive.',
    description: 'A versatile workhorse for commercial bakeries, pastry kitchens, and restaurant prep stations. The Trinex 20L Planetary Mixer features high-torque gear-driven transmission with three fixed speed settings, allowing effortless mixing of dense yeast doughs, cake batters, whipped cream, and culinary sauces.',
    images: [
      '/assets/images/category_food_prep.jpg'
    ],
    power: '1.1 kW',
    cookingType: 'Food Preparation',
    cookingSurface: '20 Litre Stainless Bowl',
    installation: 'Floor / Countertop',
    application: 'Commercial Bakeries & Kitchens',
    warranty: '1 Year Commercial Warranty',
    idealFor: [
      'Bakeries',
      'Pastry Kitchens',
      'Restaurants',
      'Hotels',
      'Cafes'
    ],
    features: [
      'Hardened steel precision gear-driven transmission for maximum torque and durability',
      'Includes 3 heavy-duty attachments: Spiral Dough Hook, Flat Beater, Wire Whip',
      'AISI 304 food-grade stainless steel 20-litre bowl with safety wire guard',
      'Micro-switch safety interlock preventing operation when bowl is lowered or guard is open',
      'Three mechanical mixing speeds: 105 / 180 / 408 RPM',
      'Heavy cast iron base with vibration absorbing rubber feet'
    ],
    specifications: [
      { label: 'Brand', value: 'Trinex' },
      { label: 'Product', value: 'Planetary Food Mixer' },
      { label: 'Model', value: '20 Litre Heavy Duty Mixer' },
      { label: 'Bowl Capacity', value: '20 Litres' },
      { label: 'Max Flour Capacity', value: '5 kg dry flour' },
      { label: 'Power', value: '1.1 kW' },
      { label: 'Speeds', value: '3 Speeds (105 / 180 / 408 RPM)' },
      { label: 'Dimensions', value: '520 x 420 x 760 mm' },
      { label: 'Weight', value: '68 kg' },
      { label: 'Warranty', value: '1 Year Commercial Warranty' }
    ],
    dimensions: '520 x 420 x 760 mm',
    voltage: '220V - 240V',
    phase: 'Single Phase',
    availability: 'in_stock',
    featured: true,
    fastMoving: false,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-demo-6',
    slug: 'commercial-food-holding-steamer-cabinet',
    name: 'Commercial Food Holding & Steamer Cabinet',
    brand: 'Trinex',
    model: '12 Tray Insulated Steamer Cabinet',
    category: 'Holding & Steamer Cabinets',
    categorySlug: 'holding-steamer',
    shortDescription: 'High-capacity 12-tray electric commercial rice steamer and temperature-controlled holding cabinet with automated water feed.',
    description: 'Engineered for high-volume banquets, canteens, and catering operations. The Trinex 12-Tray Steamer Cabinet prepares up to 50 kg of rice, idlis, momos, or steamed vegetables in a single batch, and doubles as an insulated hot food holding cabinet to maintain food safety temperatures prior to service.',
    images: [
      '/assets/images/steamer_cabinet.png',
      '/assets/images/category_holding_steamer.jpg'
    ],
    power: '12 kW Three Phase',
    cookingType: 'Steam Cooking & Holding',
    cookingSurface: '12 GN 1/1 Trays',
    installation: 'Floor Standing with Castors',
    application: 'Banquets, Canteens & Catering',
    warranty: '1 Year Commercial Warranty',
    idealFor: [
      'Catering Operations',
      'Canteens',
      'Hotels',
      'Institutional Kitchens',
      'Cloud Kitchens'
    ],
    features: [
      'High-capacity 12-tray stainless steel chamber accommodating standard GN 1/1 pans',
      'Automated water refill inlet with low-water safety heating element cut-off',
      'High-density insulated double-skin stainless steel walls for optimal heat retention',
      'Pressure relief safety valve and heavy silicone door sealing gasket',
      'Digital thermostatic temperature control with holding mode',
      'Heavy-duty lockable door latches and stainless steel ball valve drain'
    ],
    specifications: [
      { label: 'Brand', value: 'Trinex' },
      { label: 'Product', value: 'Commercial Food Steamer Cabinet' },
      { label: 'Model', value: '12 Tray Insulated Steamer' },
      { label: 'Capacity', value: '12 Trays (Approx. 48-50 kg Rice)' },
      { label: 'Power', value: '12 kW 3-Phase' },
      { label: 'Voltage', value: '380V - 415V' },
      { label: 'Dimensions', value: '700 x 650 x 1650 mm' },
      { label: 'Body Material', value: 'AISI 304 Food Grade Stainless Steel' },
      { label: 'Warranty', value: '1 Year Commercial Warranty' }
    ],
    dimensions: '700 x 650 x 1650 mm',
    voltage: '380V - 415V',
    phase: 'Three Phase',
    availability: 'in_stock',
    featured: true,
    fastMoving: false,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

class ProductStoreService {
  private products: Product[] = INITIAL_PRODUCTS;
  private categories: Category[] = INITIAL_CATEGORIES;
  private listeners: Array<() => void> = [];
  private isInitialized = false;
  private realtimeChannel: any = null;

  constructor() {
    this.cleanupLegacyStorage();
    this.init();
  }

  /**
   * Cleans up legacy local storage keys so old browser data is not used
   */
  private cleanupLegacyStorage() {
    try {
      localStorage.removeItem('trinex_products_v3');
      localStorage.removeItem('trinex_categories_v3');
    } catch {
      // Ignore if localStorage unavailable
    }
  }

  /**
   * Initialize directly from Supabase and subscribe to realtime events
   */
  private async init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    await Promise.all([
      this.fetchCategories(),
      this.fetchProducts(),
    ]);

    this.setupRealtimeSubscription();
  }

  /**
   * Sets up Supabase Realtime so multi-tab or external DB changes sync live
   */
  private setupRealtimeSubscription() {
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      if (this.realtimeChannel) {
        supabase.removeChannel(this.realtimeChannel);
      }

      this.realtimeChannel = supabase
        .channel('trinex_products_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'products' },
          () => {
            console.log('⚡ [Supabase Realtime] Detected change in "products" table, refreshing...');
            this.fetchProducts();
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'categories' },
          () => {
            console.log('⚡ [Supabase Realtime] Detected change in "categories" table, refreshing...');
            this.fetchCategories();
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('🔌 [Supabase Realtime] Subscribed to live product/category updates.');
          }
        });
    } catch (err) {
      console.warn('Realtime subscription not supported or failed to connect:', err);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        console.error('Store listener error', e);
      }
    });
  }

  // ====================================================
  // SUPABASE DIRECT READ & SEED METHODS
  // ====================================================

  public async fetchCategories(): Promise<Category[]> {
    const supabase = getSupabase();
    if (!supabase) {
      return this.categories;
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        const diagnosed = logSupabaseError('fetchCategories()', error);
        console.warn(`[Supabase Store] Using default categories cache (${diagnosed.actionableHint})`);
        return this.categories;
      }

      if (data && data.length > 0) {
        this.categories = data.map(mapRowToCategory);
        console.log(`✅ [Supabase:ProductStore] Loaded ${data.length} categories from Supabase.`);
        this.notify();
      } else if (data && data.length === 0) {
        console.log('[Supabase:ProductStore] "categories" table is empty. Seeding initial categories...');
        await this.seedCategoriesToSupabase();
      }
    } catch (err) {
      logSupabaseError('fetchCategories() exception', err);
    }

    return this.categories;
  }

  private async seedCategoriesToSupabase() {
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      const rows = INITIAL_CATEGORIES.map(mapCategoryToRow);
      const { error } = await supabase.from('categories').insert(rows);
      if (error) {
        logSupabaseError('seedCategoriesToSupabase()', error, rows);
      } else {
        console.log(`✅ [Supabase:ProductStore] Seeded ${rows.length} default categories into Supabase.`);
        const { data } = await supabase
          .from('categories')
          .select('*')
          .order('display_order', { ascending: true });
        if (data) {
          this.categories = data.map(mapRowToCategory);
          this.notify();
        }
      }
    } catch (e) {
      logSupabaseError('seedCategoriesToSupabase() exception', e);
    }
  }

  public async fetchProducts(): Promise<Product[]> {
    const supabase = getSupabase();
    if (!supabase) {
      return this.products;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        const diagnosed = logSupabaseError('fetchProducts()', error);
        console.warn(`[Supabase Store] Using default products cache (${diagnosed.actionableHint})`);
        return this.products;
      }

      if (data && data.length > 0) {
        this.products = data.map(mapRowToProduct);
        console.log(`✅ [Supabase:ProductStore] Loaded ${data.length} products from Supabase.`);
        this.notify();
      } else if (data && data.length === 0) {
        console.log('[Supabase:ProductStore] "products" table is empty. Seeding initial demo product...');
        await this.seedProductsToSupabase();
      }
    } catch (err) {
      logSupabaseError('fetchProducts() exception', err);
    }

    return this.products;
  }

  private async seedProductsToSupabase() {
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      const rows = INITIAL_PRODUCTS.map(mapProductToRow);
      const { error } = await supabase.from('products').insert(rows);
      if (error) {
        logSupabaseError('seedProductsToSupabase()', error, rows);
      } else {
        console.log(`✅ [Supabase:ProductStore] Seeded demo product into Supabase.`);
        const { data } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) {
          this.products = data.map(mapRowToProduct);
          this.notify();
        }
      }
    } catch (e) {
      logSupabaseError('seedProductsToSupabase() exception', e);
    }
  }

  public async refresh(): Promise<void> {
    await Promise.all([this.fetchCategories(), this.fetchProducts()]);
  }

  // ====================================================
  // CATEGORIES CRUD (DIRECT TO SUPABASE)
  // ====================================================

  public getCategories(): Category[] {
    return [...this.categories].sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  }

  public getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find((c) => c.slug === slug);
  }

  public async addCategory(cat: Omit<Category, 'id'>): Promise<Category> {
    const newCategory: Category = {
      ...cat,
      id: `cat-${Date.now()}`,
      slug: cat.slug || slugify(cat.name),
    };

    const supabase = getSupabase();
    if (supabase) {
      const row = mapCategoryToRow(newCategory);
      const { data, error } = await supabase.from('categories').insert([row]).select().single();
      if (error) {
        const diagnosed = logSupabaseError(`addCategory("${newCategory.name}")`, error, row);
        throw new Error(`${diagnosed.message} — ${diagnosed.actionableHint}`);
      }
      const saved = mapRowToCategory(data);
      console.log(`✅ [Supabase:ProductStore] Successfully created category "${saved.name}" (ID: ${saved.id}) in Supabase.`);
      this.categories.push(saved);
      this.notify();
      return saved;
    } else {
      this.categories.push(newCategory);
      this.notify();
      return newCategory;
    }
  }

  public async updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
    const idx = this.categories.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    const oldCategory = this.categories[idx];
    const oldSlug = oldCategory.slug;
    const oldName = oldCategory.name;

    const supabase = getSupabase();
    if (supabase) {
      const row = mapCategoryToRow(updates);
      const { data, error } = await supabase
        .from('categories')
        .update(row)
        .eq('id', id)
        .select()
        .single();
      if (error) {
        const diagnosed = logSupabaseError(`updateCategory(ID: "${id}")`, error, row);
        throw new Error(`${diagnosed.message} — ${diagnosed.actionableHint}`);
      }
      const updated = mapRowToCategory(data);
      console.log(`✅ [Supabase:ProductStore] Successfully updated category "${updated.name}" (ID: ${id}) in Supabase.`);
      this.categories[idx] = updated;

      // If category name or slug changed, cascade to existing products in memory and in Supabase
      const newSlug = updated.slug;
      const newName = updated.name;
      if (newSlug !== oldSlug || newName !== oldName) {
        const affectedProducts = this.products.filter(
          (p) => p.categorySlug.toLowerCase() === oldSlug.toLowerCase() || p.category.toLowerCase() === oldName.toLowerCase()
        );
        for (const prod of affectedProducts) {
          prod.category = newName;
          prod.categorySlug = newSlug;
          try {
            await supabase.from('products').update({
              category: newName,
              category_slug: newSlug,
            }).eq('id', prod.id);
          } catch (e) {
            console.warn(`[Supabase Store] Failed cascading category update to product "${prod.id}":`, e);
          }
        }
      }

      this.notify();
      return updated;
    } else {
      const updated = { ...this.categories[idx], ...updates };
      this.categories[idx] = updated;

      const newSlug = updated.slug;
      const newName = updated.name;
      if (newSlug !== oldSlug || newName !== oldName) {
        this.products.forEach((prod) => {
          if (prod.categorySlug.toLowerCase() === oldSlug.toLowerCase() || prod.category.toLowerCase() === oldName.toLowerCase()) {
            prod.category = newName;
            prod.categorySlug = newSlug;
          }
        });
      }

      this.notify();
      return this.categories[idx];
    }
  }

  public async deleteCategory(id: string): Promise<boolean> {
    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) {
        const diagnosed = logSupabaseError(`deleteCategory(ID: "${id}")`, error);
        throw new Error(`${diagnosed.message} — ${diagnosed.actionableHint}`);
      }
      console.log(`✅ [Supabase:ProductStore] Successfully deleted category (ID: ${id}) from Supabase.`);
    }

    const initialLen = this.categories.length;
    this.categories = this.categories.filter((c) => c.id !== id);
    if (this.categories.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  // ====================================================
  // PRODUCTS CRUD (DIRECT TO SUPABASE)
  // ====================================================

  public getAllProducts(includeDrafts = false): Product[] {
    if (includeDrafts) return [...this.products];
    return this.products.filter((p) => p.status === 'active');
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  public getFastMovingProducts(): Product[] {
    return this.products.filter((p) => p.status === 'active' && p.fastMoving);
  }

  public getFeaturedProducts(): Product[] {
    return this.products.filter((p) => p.status === 'active' && p.featured);
  }

  public getProductsByCategory(categorySlug: string): Product[] {
    return this.products.filter(
      (p) => p.status === 'active' && p.categorySlug.toLowerCase() === categorySlug.toLowerCase()
    );
  }

  public async addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const autoSlug = productData.slug ? slugify(productData.slug) : slugify(`${productData.name} ${productData.model}`);
    
    // Ensure slug uniqueness
    let finalSlug = autoSlug;
    let counter = 1;
    while (this.products.some((p) => p.slug === finalSlug)) {
      finalSlug = `${autoSlug}-${counter++}`;
    }

    const now = new Date().toISOString();
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug: finalSlug,
      createdAt: now,
      updatedAt: now,
    };

    const supabase = getSupabase();
    if (supabase) {
      const row = mapProductToRow(newProduct);
      console.log(`📤 [Supabase:ProductStore] Sending INSERT for product "${newProduct.name}"...`, row);

      const { data, error } = await supabase.from('products').insert([row]).select().single();
      if (error) {
        const diagnosed = logSupabaseError(`addProduct("${newProduct.name}")`, error, row);
        throw new Error(`${diagnosed.message} — ${diagnosed.actionableHint}`);
      }

      const saved = mapRowToProduct(data);
      console.log(`✅ [Supabase:ProductStore] Successfully inserted product "${saved.name}" (ID: ${saved.id}) in Supabase.`);
      this.products.unshift(saved);
      this.notify();
      return saved;
    } else {
      console.log(supabase)
      console.warn('⚠️ [Supabase:ProductStore] Supabase is not configured. Saving in-memory only.');
      this.products.unshift(newProduct);

      this.notify();
      return newProduct;
    }
  }

  public async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    if (updates.name && !updates.slug) {
      updates.slug = slugify(`${updates.name} ${updates.model || ''}`);
    }

    updates.updatedAt = new Date().toISOString();

    const supabase = getSupabase();
    if (supabase) {
      const row = mapProductToRow(updates);
      console.log(`📤 [Supabase:ProductStore] Sending UPDATE for product (ID: ${id})...`, row);

      const { data, error } = await supabase
        .from('products')
        .update(row)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        const diagnosed = logSupabaseError(`updateProduct(ID: "${id}")`, error, row);
        throw new Error(`${diagnosed.message} — ${diagnosed.actionableHint}`);
      }

      const updated = mapRowToProduct(data);
      console.log(`✅ [Supabase:ProductStore] Successfully updated product "${updated.name}" (ID: ${id}) in Supabase.`);
      this.products[idx] = updated;
      this.notify();
      return updated;
    } else {
      console.warn('⚠️ [Supabase:ProductStore] Supabase is not configured. Updating in-memory only.');
      this.products[idx] = {
        ...this.products[idx],
        ...updates,
      };
      this.notify();
      return this.products[idx];
    }
  }

  public async deleteProduct(id: string): Promise<boolean> {
    const supabase = getSupabase();
    if (supabase) {
      console.log(`📤 [Supabase:ProductStore] Sending DELETE for product (ID: ${id})...`);
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        const diagnosed = logSupabaseError(`deleteProduct(ID: "${id}")`, error);
        throw new Error(`${diagnosed.message} — ${diagnosed.actionableHint}`);
      }
      console.log(`✅ [Supabase:ProductStore] Successfully deleted product (ID: ${id}) from Supabase.`);
    }

    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    if (this.products.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  public async resetToDefault(): Promise<void> {
    const supabase = getSupabase();
    if (supabase) {
      try {
        console.log('📤 [Supabase:ProductStore] Resetting products catalog in Supabase...');
        await supabase.from('products').delete().neq('id', '___empty___');
        const rows = INITIAL_PRODUCTS.map(mapProductToRow);
        await supabase.from('products').insert(rows);
        console.log('✅ [Supabase:ProductStore] Catalog reset completed in Supabase.');
      } catch (err) {
        logSupabaseError('resetToDefault()', err);
      }
    }

    this.categories = INITIAL_CATEGORIES;
    this.products = INITIAL_PRODUCTS;
    this.notify();
  }

  // Product Search
  public searchProducts(query: string): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return this.products.filter((p) => {
      if (p.status !== 'active') return false;

      const inName = p.name.toLowerCase().includes(q);
      const inModel = p.model.toLowerCase().includes(q);
      const inCategory = p.category.toLowerCase().includes(q);
      const inShortDesc = p.shortDescription.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inPower = p.power?.toLowerCase().includes(q) || false;
      const inFeatures = p.features.some((f) => f.toLowerCase().includes(q));
      const inSpecs = p.specifications.some(
        (s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
      );

      return inName || inModel || inCategory || inShortDesc || inDesc || inPower || inFeatures || inSpecs;
    });
  }
}

export const productStore = new ProductStoreService();
