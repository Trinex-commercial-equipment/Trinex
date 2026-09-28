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
      this.notify();
      return updated;
    } else {
      this.categories[idx] = { ...this.categories[idx], ...updates };
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
