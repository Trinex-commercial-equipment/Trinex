import { SparePart, ProductSpec } from '../types/product';
import { getSupabase, logSupabaseError } from './supabaseClient';
import { SPARE_PARTS } from '../data/sparesData';
import { slugify } from './productStore';

export const getSpareSlug = (spare: { name: string; partNumber?: string; slug?: string; id?: string }): string => {
  if (spare.slug) return spare.slug;
  if (spare.name && spare.partNumber) {
    const combined = slugify(`${spare.name} ${spare.partNumber}`);
    if (combined) return combined;
  }
  if (spare.name) {
    const byName = slugify(spare.name);
    if (byName) return byName;
  }
  return spare.id || '';
};

export const INITIAL_SPARES: SparePart[] = SPARE_PARTS.map((item, idx) => {
  const name = item.partName || '';
  const partNumber = item.partCode || '';
  const autoSlug = slugify(`${name} ${partNumber}`) || slugify(name) || `sp-0${idx + 1}`;

  return {
    id: item.id || `sp-0${idx + 1}`,
    slug: autoSlug,
    name,
    partNumber,
    compatibleEquipment: Array.isArray(item.compatibility) ? item.compatibility.join(', ') : '',
    category: item.category,
    image: '/assets/images/cooking_range.jpg',
    shortDescription: item.description,
    specifications: Object.entries(item.specs || {}).map(([label, value]) => ({ label, value })),
    availability: item.inStock ? 'in_stock' : 'procurement',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
});

const mapRowToSpare = (row: any): SparePart => {
  const name = row.name || '';
  const partNumber = row.part_number || '';
  const autoSlug = slugify(`${name} ${partNumber}`) || slugify(name) || row.id;

  return {
    id: row.id,
    slug: row.slug || autoSlug,
    name,
    partNumber,
    compatibleEquipment: row.compatible_equipment || '',
    category: row.category || '',
    image: row.image || '',
    shortDescription: row.short_description || '',
    specifications: Array.isArray(row.specifications) ? row.specifications : [],
    availability: row.availability || 'in_stock',
    status: row.status || 'active',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const mapSpareToRow = (spare: Partial<SparePart>) => ({
  ...(spare.id !== undefined && { id: spare.id }),
  ...(spare.name !== undefined && { name: spare.name }),
  ...(spare.partNumber !== undefined && { part_number: spare.partNumber }),
  ...(spare.compatibleEquipment !== undefined && {
    compatible_equipment: spare.compatibleEquipment,
  }),
  ...(spare.category !== undefined && { category: spare.category }),
  ...(spare.image !== undefined && { image: spare.image }),
  ...(spare.shortDescription !== undefined && {
    short_description: spare.shortDescription,
  }),
  ...(spare.specifications !== undefined && {
    specifications: spare.specifications,
  }),
  ...(spare.availability !== undefined && {
    availability: spare.availability,
  }),
  ...(spare.status !== undefined && {
    status: spare.status,
  }),
  updated_at: new Date().toISOString(),
});

class SparesStoreService {
  private spares: SparePart[] = INITIAL_SPARES;
  private listeners: Array<() => void> = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private async init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    await this.fetchSpares();
    this.setupRealtimeSubscription();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (error) {
        console.error('SparesStore listener error:', error);
      }
    });
  }

  // ============================================================
  // SUPABASE READ & AUTO-SEED
  // ============================================================

  public async fetchSpares(): Promise<SparePart[]> {
    const supabase = getSupabase();
    if (!supabase) {
      console.warn('⚠️ [Supabase:SparesStore] Supabase is not configured.');
      return this.spares;
    }

    try {
      const { data, error } = await supabase
        .from('spares')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        const diagnosed = logSupabaseError('fetchSpares()', error);
        console.warn(`[Supabase:SparesStore] ${diagnosed.message} — ${diagnosed.actionableHint}`);
        return this.spares;
      }

      if (data && data.length > 0) {
        this.spares = data.map(mapRowToSpare);
        console.log(`✅ [Supabase:SparesStore] Loaded ${this.spares.length} spares from Supabase.`);
        this.notify();
      } else {
        console.log('[Supabase:SparesStore] "spares" table is empty. Seeding initial spares...');
        await this.seedSparesToSupabase();
      }

      return this.spares;
    } catch (error) {
      logSupabaseError('fetchSpares() exception', error);
      return this.spares;
    }
  }

  private async seedSparesToSupabase() {
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      const rows = INITIAL_SPARES.map((s) => ({
        ...mapSpareToRow(s),
        created_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from('spares').insert(rows);
      if (error) {
        logSupabaseError('seedSparesToSupabase()', error, rows);
      } else {
        console.log(`✅ [Supabase:SparesStore] Successfully seeded ${rows.length} spares into Supabase.`);
        this.spares = INITIAL_SPARES;
        this.notify();
      }
    } catch (e) {
      logSupabaseError('seedSparesToSupabase() exception', e);
    }
  }

  public async refresh(): Promise<void> {
    await this.fetchSpares();
  }

  // ============================================================
  // GETTERS
  // ============================================================

  public getAllSpares(includeInactive = false): SparePart[] {
    if (includeInactive) {
      return [...this.spares];
    }
    return this.spares.filter((spare) => spare.status === 'active');
  }

  public getSpareById(id: string): SparePart | undefined {
    return this.spares.find((spare) => spare.id === id);
  }

  public getSpareBySlug(searchSlug: string): SparePart | undefined {
    if (!searchSlug) return undefined;
    const cleanSearch = searchSlug.toLowerCase().trim();

    return this.spares.find((spare) => {
      // 1. Direct match on spare.slug
      if (spare.slug && spare.slug.toLowerCase() === cleanSearch) {
        return true;
      }

      // 2. Match on unified getSpareSlug(spare)
      const canonicalSlug = getSpareSlug(spare).toLowerCase();
      if (canonicalSlug && canonicalSlug === cleanSearch) {
        return true;
      }

      // 3. Match on slugify(name + " " + partNumber)
      const namePartSlug = slugify(`${spare.name || ''} ${spare.partNumber || ''}`).toLowerCase();
      if (namePartSlug && namePartSlug === cleanSearch) {
        return true;
      }

      // 4. Match on slugify(name)
      const nameSlug = slugify(spare.name || '').toLowerCase();
      if (nameSlug && nameSlug === cleanSearch) {
        return true;
      }

      // 5. Match on exact ID
      if (spare.id && spare.id.toLowerCase() === cleanSearch) {
        return true;
      }

      // 6. Match on partNumber (exact or slugified)
      if (spare.partNumber) {
        if (spare.partNumber.toLowerCase() === cleanSearch) return true;
        if (slugify(spare.partNumber).toLowerCase() === cleanSearch) return true;
      }

      // 7. Fallback: if searchSlug contains nameSlug or vice versa
      if (nameSlug && (cleanSearch.startsWith(nameSlug) || nameSlug.startsWith(cleanSearch))) {
        return true;
      }

      return false;
    });
  }

  // ============================================================
  // ADD
  // ============================================================

  public async addSpare(
    spareData: Omit<SparePart, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<SparePart> {
    const now = new Date().toISOString();
    const autoSlug = spareData.slug || slugify(`${spareData.name} ${spareData.partNumber || ''}`) || slugify(spareData.name);
    const newSpare: SparePart = {
      ...spareData,
      id: `spare-${Date.now()}`,
      slug: autoSlug,
      createdAt: now,
      updatedAt: now,
    };

    const supabase = getSupabase();
    if (supabase) {
      const row = {
        ...mapSpareToRow(newSpare),
        created_at: now,
        updated_at: now,
      };

      const { data, error } = await supabase
        .from('spares')
        .insert([row])
        .select()
        .single();

      if (error) {
        const diagnosed = logSupabaseError(`addSpare("${newSpare.name}")`, error, row);
        throw new Error(`${diagnosed.message} — ${diagnosed.actionableHint}`);
      }

      const saved = mapRowToSpare(data);
      this.spares.unshift(saved);
      this.notify();
      return saved;
    }

    this.spares.unshift(newSpare);
    this.notify();
    return newSpare;
  }

  // ============================================================
  // UPDATE
  // ============================================================

  public async updateSpare(
    id: string,
    updates: Partial<SparePart>
  ): Promise<SparePart | null> {
    const idx = this.spares.findIndex((spare) => spare.id === id);
    if (idx === -1) return null;

    const supabase = getSupabase();
    if (supabase) {
      const row = mapSpareToRow(updates);
      const { error } = await supabase
        .from('spares')
        .update(row)
        .eq('id', id);

      if (error) {
        const diagnosed = logSupabaseError(`updateSpare(ID: "${id}")`, error, row);
        throw new Error(`${diagnosed.message} — ${diagnosed.actionableHint}`);
      }
    }

    const updated: SparePart = {
      ...this.spares[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    if (updates.name || updates.partNumber) {
      updated.slug = updates.slug || slugify(`${updated.name} ${updated.partNumber || ''}`) || slugify(updated.name);
    }
    this.spares[idx] = updated;
    this.notify();
    return this.spares[idx];
  }

  // ============================================================
  // DELETE
  // ============================================================

  public async deleteSpare(id: string): Promise<boolean> {
    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase
        .from('spares')
        .delete()
        .eq('id', id);

      if (error) {
        const diagnosed = logSupabaseError(`deleteSpare(ID: "${id}")`, error);
        throw new Error(`${diagnosed.message} — ${diagnosed.actionableHint}`);
      }
    }

    const initialLength = this.spares.length;
    this.spares = this.spares.filter((spare) => spare.id !== id);
    if (this.spares.length !== initialLength) {
      this.notify();
      return true;
    }
    return false;
  }

  // ============================================================
  // REALTIME
  // ============================================================

  private setupRealtimeSubscription() {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      const channel = supabase
        .channel('trinex_spares_realtime')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'spares',
          },
          () => {
            console.log('⚡ [Supabase Realtime] Spare table changed. Refreshing...');
            this.fetchSpares();
          }
        )
        .subscribe();

      return channel;
    } catch (error) {
      console.warn('⚠️ [Supabase:SparesStore] Realtime subscription failed:', error);
    }
  }
}

export const sparesStore = new SparesStoreService();