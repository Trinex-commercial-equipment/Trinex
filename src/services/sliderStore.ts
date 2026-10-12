import { HeroSlide } from '../types/product';
import {
  getSupabase,
  mapRowToHeroSlide,
  mapHeroSlideToRow,
  logSupabaseError,
} from './supabaseClient';

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
  private isLoadedFromRemote = false;

  constructor() {
    this.init();
    // Fetch from Supabase as soon as client is ready
    this.fetchFromSupabase();
    this.setupRealtimeSubscription();
  }

  private init() {
    try {
      const stored = localStorage.getItem(SLIDER_STORAGE_KEY);
      if (stored) {
        this.slides = JSON.parse(stored);
      } else {
        this.slides = INITIAL_SLIDES;
        this.saveToStorage();
      }
    } catch (e) {
      console.warn('LocalStorage unavailable for slider, using defaults', e);
      this.slides = INITIAL_SLIDES;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(SLIDER_STORAGE_KEY, JSON.stringify(this.slides));
    } catch (e) {
      console.error('Failed to save slides to localStorage', e);
    }
    this.notify();
  }

  public async fetchFromSupabase(): Promise<void> {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        // Table might not exist yet if user hasn't run SQL script
        logSupabaseError('fetchFromSupabase()', error);
        return;
      }

      if (data && data.length > 0) {
        this.slides = data.map(mapRowToHeroSlide);
        this.isLoadedFromRemote = true;
        this.saveToStorage();
      } else {
        // Seed slides into Supabase. If user already added slides locally, upload those so they are preserved in the cloud!
        console.log('Seeding hero slides into Supabase cloud...');
        const slidesToUpload = (this.slides && this.slides.length > 0) ? this.slides : INITIAL_SLIDES;
        const rows = slidesToUpload.map(mapHeroSlideToRow);
        await supabase.from('hero_slides').insert(rows);
        this.isLoadedFromRemote = true;
      }
    } catch (err) {
      console.warn('Could not sync hero slides with Supabase:', err);
    }
  }

  private setupRealtimeSubscription() {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      supabase
        .channel('public:hero_slides')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'hero_slides' },
          () => {
            console.log('⚡ Hero slides updated in Supabase, refreshing...');
            this.fetchFromSupabase();
          }
        )
        .subscribe();
    } catch (e) {
      console.warn('Realtime subscription for hero_slides failed', e);
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

  public async addSlide(slideData: Omit<HeroSlide, 'id' | 'createdAt'>): Promise<HeroSlide> {
    const newSlide: HeroSlide = {
      ...slideData,
      id: `slide-${Date.now()}`,
      displayOrder: slideData.displayOrder || this.slides.length + 1,
      createdAt: new Date().toISOString(),
    };

    // Save locally immediately
    this.slides.push(newSlide);
    this.saveToStorage();

    // Sync to Supabase
    const supabase = getSupabase();
    if (supabase) {
      try {
        const row = mapHeroSlideToRow(newSlide);
        const { error } = await supabase.from('hero_slides').insert([row]);
        if (error) {
          logSupabaseError('addSlide()', error);
        } else {
          console.log(`✅ Slide "${newSlide.title || newSlide.id}" saved to Supabase!`);
        }
      } catch (err) {
        console.error('Failed to sync new slide to Supabase', err);
      }
    }

    return newSlide;
  }

  public async updateSlide(id: string, updates: Partial<HeroSlide>): Promise<HeroSlide | null> {
    const idx = this.slides.findIndex((s) => s.id === id);
    if (idx === -1) return null;

    this.slides[idx] = { ...this.slides[idx], ...updates };
    this.saveToStorage();

    // Sync to Supabase
    const supabase = getSupabase();
    if (supabase) {
      try {
        const row = mapHeroSlideToRow(updates);
        const { error } = await supabase.from('hero_slides').update(row).eq('id', id);
        if (error) {
          logSupabaseError(`updateSlide(${id})`, error);
        }
      } catch (err) {
        console.error('Failed to update slide in Supabase', err);
      }
    }

    return this.slides[idx];
  }

  public async deleteSlide(id: string): Promise<boolean> {
    const initialLen = this.slides.length;
    this.slides = this.slides.filter((s) => s.id !== id);

    if (this.slides.length !== initialLen) {
      this.saveToStorage();

      // Sync to Supabase
      const supabase = getSupabase();
      if (supabase) {
        try {
          const { error } = await supabase.from('hero_slides').delete().eq('id', id);
          if (error) {
            logSupabaseError(`deleteSlide(${id})`, error);
          }
        } catch (err) {
          console.error('Failed to delete slide in Supabase', err);
        }
      }
      return true;
    }

    return false;
  }

  public async resetToDefault() {
    this.slides = INITIAL_SLIDES;
    this.saveToStorage();

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('hero_slides').delete().neq('id', '___empty___');
        const rows = INITIAL_SLIDES.map(mapHeroSlideToRow);
        await supabase.from('hero_slides').insert(rows);
      } catch (err) {
        console.error('Failed to reset slides in Supabase', err);
      }
    }
  }

  public async refresh() {
    await this.fetchFromSupabase();
  }
}

export const sliderStore = new SliderStoreService();
