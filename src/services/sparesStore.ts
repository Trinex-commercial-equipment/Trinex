import { SparePart } from '../types/product';

export const INITIAL_SPARES: SparePart[] = [
  {
    id: 'spare-demo-1',
    name: 'Commercial Induction Ceramic Glass Top Plate',
    partNumber: 'TRX-IND-GLS-35',
    compatibleEquipment: 'Commercial Induction Cooktop 3.5 kW & 5 kW Flat Models',
    category: 'Commercial Induction',
    image: '/assets/images/countertop_induction_hob.png',
    shortDescription: 'High-temperature thermal shock resistant replacement microcrystalline ceramic glass plate with high mechanical load bearing capacity.',
    specifications: [
      { label: 'Surface Material', value: 'High-Grade Microcrystalline Glass' },
      { label: 'Thermal Resistance', value: 'Up to 800°C' },
      { label: 'Compatibility', value: 'Trinex 3.5kW / 5kW Flat Models' },
      { label: 'Origin', value: 'Original Commercial Grade' }
    ],
    availability: 'in_stock',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const SPARES_STORAGE_KEY = 'trinex_spares_v3';

class SparesStoreService {
  private spares: SparePart[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const stored = localStorage.getItem(SPARES_STORAGE_KEY);
      if (stored) {
        this.spares = JSON.parse(stored);
      } else {
        this.spares = INITIAL_SPARES;
        this.save();
      }
    } catch (e) {
      console.warn('LocalStorage unavailable for spares, using default', e);
      this.spares = INITIAL_SPARES;
    }
  }

  private save() {
    try {
      localStorage.setItem(SPARES_STORAGE_KEY, JSON.stringify(this.spares));
    } catch (e) {
      console.error('Failed to save spares', e);
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
        console.error('Spares listener error', e);
      }
    });
  }

  public getAllSpares(includeDrafts = false): SparePart[] {
    if (includeDrafts) return [...this.spares];
    return this.spares.filter((s) => s.status === 'active');
  }

  public getSpareById(id: string): SparePart | undefined {
    return this.spares.find((s) => s.id === id);
  }

  public addSpare(spareData: Omit<SparePart, 'id' | 'createdAt' | 'updatedAt'>): SparePart {
    const newSpare: SparePart = {
      ...spareData,
      id: `spare-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.spares.unshift(newSpare);
    this.save();
    return newSpare;
  }

  public updateSpare(id: string, updates: Partial<SparePart>): SparePart | null {
    const idx = this.spares.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.spares[idx] = {
      ...this.spares[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.spares[idx];
  }

  public deleteSpare(id: string): boolean {
    const initialLen = this.spares.length;
    this.spares = this.spares.filter((s) => s.id !== id);
    if (this.spares.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }
}

export const sparesStore = new SparesStoreService();
