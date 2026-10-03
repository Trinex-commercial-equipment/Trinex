import { HeroSlide } from '../types/product';

export const INITIAL_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: '/assets/images/trinex_induction_banner.jpg',
    title: 'Commercial Induction Equipment Showcase',
    subtitle: 'Smart Cooking • Better Business • High Thermal Efficiency',
    link: '/products?category=commercial-induction',
    buttonText: 'Explore Induction Range',
    displayOrder: 1,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'slide-2',
    image: '/assets/images/category_induction.jpg',
    title: 'Countertop Induction Hobs & Wok Ranges',
    subtitle: 'High Output Flame-Free Heating for Commercial Kitchens',
    link: '/products',
    buttonText: 'View Equipment',
    displayOrder: 2,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'slide-3',
    image: '/assets/images/category_cooking.jpg',
    title: 'Heavy Duty Commercial Cooking Ranges',
    subtitle: 'Engineered for High-Volume Restaurants & Hotels',
    link: '/products?category=cooking-equipment',
    buttonText: 'View Cooking Equipment',
    displayOrder: 3,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'slide-4',
    image: '/assets/images/category_refrigeration.jpg',
    title: 'Commercial Refrigeration & Cold Storage',
    subtitle: 'Reach-In Chillers, Vertical Freezers & Prep Counters',
    link: '/products?category=commercial-refrigeration',
    buttonText: 'Browse Refrigeration',
    displayOrder: 4,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const SLIDER_STORAGE_KEY = 'trinex_hero_slides_v2';

class SliderStoreService {
  private slides: HeroSlide[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const stored = localStorage.getItem(SLIDER_STORAGE_KEY);
      if (stored) {
        this.slides = JSON.parse(stored);
      } else {
        this.slides = INITIAL_SLIDES;
        this.save();
      }
    } catch (e) {
      console.warn('LocalStorage unavailable for slider, using defaults', e);
      this.slides = INITIAL_SLIDES;
    }
  }

  private save() {
    try {
      localStorage.setItem(SLIDER_STORAGE_KEY, JSON.stringify(this.slides));
    } catch (e) {
      console.error('Failed to save slides to localStorage', e);
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
        console.error('Slider listener error', e);
      }
    });
  }

  public getSlides(includeDrafts = false): HeroSlide[] {
    const list = includeDrafts ? [...this.slides] : this.slides.filter((s) => s.status === 'active');
    return list.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  }

  public getSlideById(id: string): HeroSlide | undefined {
    return this.slides.find((s) => s.id === id);
  }

  public addSlide(slideData: Omit<HeroSlide, 'id' | 'createdAt'>): HeroSlide {
    const newSlide: HeroSlide = {
      ...slideData,
      id: `slide-${Date.now()}`,
      displayOrder: slideData.displayOrder || this.slides.length + 1,
      createdAt: new Date().toISOString(),
    };
    this.slides.push(newSlide);
    this.save();
    return newSlide;
  }

  public updateSlide(id: string, updates: Partial<HeroSlide>): HeroSlide | null {
    const idx = this.slides.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.slides[idx] = { ...this.slides[idx], ...updates };
    this.save();
    return this.slides[idx];
  }

  public deleteSlide(id: string): boolean {
    const initialLen = this.slides.length;
    this.slides = this.slides.filter((s) => s.id !== id);
    if (this.slides.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  public resetToDefault() {
    this.slides = INITIAL_SLIDES;
    this.save();
  }
}

export const sliderStore = new SliderStoreService();
