import { Product, Category } from '../types/product';

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

// EXACTLY ONE realistic demo product as specified in Rule 30
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

const PRODUCTS_STORAGE_KEY = 'trinex_products_v3';
const CATEGORIES_STORAGE_KEY = 'trinex_categories_v3';

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
  private products: Product[] = [];
  private categories: Category[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (storedCategories) {
        this.categories = JSON.parse(storedCategories);
      } else {
        this.categories = INITIAL_CATEGORIES;
        this.saveCategories();
      }

      const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (storedProducts) {
        this.products = JSON.parse(storedProducts);
      } else {
        this.products = INITIAL_PRODUCTS;
        this.saveProducts();
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or corrupt, using memory store', e);
      this.categories = INITIAL_CATEGORIES;
      this.products = INITIAL_PRODUCTS;
    }
  }

  private saveProducts() {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(this.products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
    this.notify();
  }

  private saveCategories() {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(this.categories));
    } catch (e) {
      console.error('Failed to save categories to localStorage', e);
    }
    this.notify();
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

  // Categories CRUD
  public getCategories(): Category[] {
    return [...this.categories].sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  }

  public getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find((c) => c.slug === slug);
  }

  public addCategory(cat: Omit<Category, 'id'>): Category {
    const newCategory: Category = {
      ...cat,
      id: `cat-${Date.now()}`,
      slug: cat.slug || slugify(cat.name),
    };
    this.categories.push(newCategory);
    this.saveCategories();
    return newCategory;
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | null {
    const idx = this.categories.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.categories[idx] = { ...this.categories[idx], ...updates };
    this.saveCategories();
    return this.categories[idx];
  }

  public deleteCategory(id: string): boolean {
    const initialLen = this.categories.length;
    this.categories = this.categories.filter((c) => c.id !== id);
    if (this.categories.length !== initialLen) {
      this.saveCategories();
      return true;
    }
    return false;
  }

  // Products CRUD
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

  public addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const autoSlug = productData.slug ? slugify(productData.slug) : slugify(`${productData.name} ${productData.model}`);
    
    // Ensure slug uniqueness
    let finalSlug = autoSlug;
    let counter = 1;
    while (this.products.some((p) => p.slug === finalSlug)) {
      finalSlug = `${autoSlug}-${counter++}`;
    }

    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug: finalSlug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.products.unshift(newProduct);
    this.saveProducts();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    if (updates.name && !updates.slug) {
      updates.slug = slugify(`${updates.name} ${updates.model || ''}`);
    }

    this.products[idx] = {
      ...this.products[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveProducts();
    return this.products[idx];
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    if (this.products.length !== initialLen) {
      this.saveProducts();
      return true;
    }
    return false;
  }

  public resetToDefault() {
    this.categories = INITIAL_CATEGORIES;
    this.products = INITIAL_PRODUCTS;
    this.saveCategories();
    this.saveProducts();
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
