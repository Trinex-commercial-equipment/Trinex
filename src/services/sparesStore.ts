import { SparePart } from '../types/product';
import { slugify } from './productStore';

export const INITIAL_SPARES: SparePart[] = [
  {
    id: 'spare-demo-1',
    slug: 'commercial-induction-ceramic-glass-top-plate',
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
  },
  {
    id: 'spare-demo-2',
    slug: 'commercial-brass-burner-assembly',
    name: 'High-Output Commercial Brass Burner Assembly',
    partNumber: 'TX-SP-BRN-304',
    compatibleEquipment: 'Commercial Gas Cooking Ranges & Chinese Wok Stations',
    category: 'Cooking Spares',
    image: '/assets/images/cooking_range.jpg',
    shortDescription: 'Heavy cast brass burner head with precision drilled gas ports for maximum heat distribution and thermal stability.',
    specifications: [
      { label: 'Material', value: 'Heavy Cast Brass & Cast Iron' },
      { label: 'Gas Rating', value: '30,000 BTU / hr' },
      { label: 'Nozzle Diameter', value: '1.8 mm' },
      { label: 'Applications', value: 'Gas Ranges, Wok Stations, Stock Pot Stoves' }
    ],
    availability: 'in_stock',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'spare-demo-3',
    slug: 'digital-temperature-controller',
    name: 'Digital Micro-Processor Temperature Controller',
    partNumber: 'TX-SP-TC-900',
    compatibleEquipment: 'Commercial Chillers, Freezers & Proofing Cabinets',
    category: 'Electrical & Electronics',
    image: '/assets/images/digital_induction_cooker.png',
    shortDescription: 'High-precision digital thermostat controller with dual LED display, NTC/PTC sensor probe input, and alarm buzzer output.',
    specifications: [
      { label: 'Temp Range', value: '-50°C to +99°C' },
      { label: 'Voltage', value: '220V AC ± 10%' },
      { label: 'Sensor Included', value: '2m NTC Thermistor Probe' },
      { label: 'Display', value: 'Dual LED 7-Segment Display' }
    ],
    availability: 'in_stock',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'spare-demo-4',
    slug: 'commercial-refrigeration-compressor',
    name: 'Commercial Refrigeration Hermetic Compressor',
    partNumber: 'TX-SP-CMP-R290',
    compatibleEquipment: 'Reach-In Chillers, Under-Counter Counters & Display Coolers',
    category: 'Refrigeration Spares',
    image: '/assets/images/commercial_refrigerator.jpg',
    shortDescription: 'Hermetic reciprocating compressor engineered specifically for high-ambient commercial kitchen environments.',
    specifications: [
      { label: 'Displacement', value: '14.3 cc' },
      { label: 'Refrigerant', value: 'R290 Eco Gas' },
      { label: 'Power Rating', value: '1/2 HP' },
      { label: 'Voltage', value: '220V - 240V / 50Hz' }
    ],
    availability: 'in_stock',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'spare-demo-5',
    slug: 'electric-heating-element-3kw',
    name: 'AISI 304 Stainless Steel Electric Heating Element',
    partNumber: 'TX-SP-HTR-3KW',
    compatibleEquipment: 'Commercial Deep Fryers, Bain-Maries & Steamer Cabinets',
    category: 'Electrical & Heating',
    image: '/assets/images/steamer_cabinet.png',
    shortDescription: 'Incoloy 800 / SS 304 tubular heating element engineered for continuous duty in deep fryers and water bain-maries.',
    specifications: [
      { label: 'Wattage', value: '3000W / 4500W Options' },
      { label: 'Voltage', value: '230V Single Phase / 415V 3-Phase' },
      { label: 'Sheath Material', value: 'AISI 304 Food Grade Stainless Steel' },
      { label: 'Terminal Type', value: 'M4 Threaded Screw Terminals' }
    ],
    availability: 'in_stock',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'spare-demo-6',
    slug: 'food-grade-silicone-door-gasket-seal',
    name: 'Food-Grade Silicone Magnetic Door Gasket Seal',
    partNumber: 'TX-SP-GSK-CUSTOM',
    compatibleEquipment: 'Vertical Chillers, Reach-In Freezers & Holding Cabinets',
    category: 'Refrigeration & Oven Seals',
    image: '/assets/images/holding_cabinet.png',
    shortDescription: 'Press-fit high-elasticity magnetic gasket frame resistant to culinary oils, grease, and extreme thermal variation.',
    specifications: [
      { label: 'Material', value: 'Sanitary Grade Mold-Resistant PVC/Silicone' },
      { label: 'Profile Type', value: 'Dart Push-In Profile' },
      { label: 'Custom Sizing', value: 'Precision cut per door frame specification' }
    ],
    availability: 'in_stock',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const SPARES_STORAGE_KEY = 'trinex_spares_v4';

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

  public getSpareBySlug(slug: string): SparePart | undefined {
    const query = slug.toLowerCase().trim();
    return this.spares.find((s) => {
      const sSlug = (s.slug || slugify(s.name) || s.partNumber || s.id).toLowerCase();
      const sPart = (s.partNumber || '').toLowerCase();
      return (
        sSlug === query ||
        s.id.toLowerCase() === query ||
        sPart === query ||
        slugify(s.name) === query
      );
    });
  }

  public getSparesByCategory(category: string): SparePart[] {
    return this.spares.filter(
      (s) => s.status === 'active' && s.category.toLowerCase() === category.toLowerCase()
    );
  }

  public addSpare(spareData: Omit<SparePart, 'id' | 'createdAt' | 'updatedAt'>): SparePart {
    const generatedSlug = spareData.slug
      ? slugify(spareData.slug)
      : slugify(`${spareData.name} ${spareData.partNumber}`);

    const newSpare: SparePart = {
      ...spareData,
      id: `spare-${Date.now()}`,
      slug: generatedSlug,
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

    const current = this.spares[idx];
    const updatedSlug = updates.slug
      ? slugify(updates.slug)
      : updates.name || updates.partNumber
      ? slugify(`${updates.name || current.name} ${updates.partNumber || current.partNumber}`)
      : current.slug;

    this.spares[idx] = {
      ...current,
      ...updates,
      slug: updatedSlug,
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
