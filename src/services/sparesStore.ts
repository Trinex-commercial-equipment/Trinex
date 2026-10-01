import { SparePart, ProductSpec } from '../types/product';
import { getSupabase, logSupabaseError } from './supabaseClient';

const mapRowToSpare = (row: any): SparePart => ({
  id: row.id,
  name: row.name,
  partNumber: row.part_number || '',
  compatibleEquipment: row.compatible_equipment || '',
  category: row.category || '',
  image: row.image || '',
  shortDescription: row.short_description || '',
  specifications: Array.isArray(row.specifications)
    ? row.specifications
    : [],
  availability: row.availability || 'in_stock',
  status: row.status || 'active',
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

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
  private spares: SparePart[] = [];
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
      this.listeners = this.listeners.filter(
        (item) => item !== listener
      );
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
  // SUPABASE READ
  // ============================================================

  public async fetchSpares(): Promise<SparePart[]> {
    const supabase = getSupabase();

    if (!supabase) {
      console.warn(
        '⚠️ [Supabase:SparesStore] Supabase is not configured.'
      );

      return this.spares;
    }

    try {
      const { data, error } = await supabase
        .from('spares')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        const diagnosed = logSupabaseError(
          'fetchSpares()',
          error
        );

        console.warn(
          `[Supabase:SparesStore] ${diagnosed.message} — ${diagnosed.actionableHint}`
        );

        return this.spares;
      }

      this.spares = (data || []).map(mapRowToSpare);

      console.log(
        `✅ [Supabase:SparesStore] Loaded ${this.spares.length} spares from Supabase.`
      );

      this.notify();

      return this.spares;
    } catch (error) {
      logSupabaseError(
        'fetchSpares() exception',
        error
      );

      return this.spares;
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

    return this.spares.filter(
      (spare) => spare.status === 'active'
    );
  }

  public getSpareById(id: string): SparePart | undefined {
    return this.spares.find((spare) => spare.id === id);
  }
public getSpareBySlug(
  slug: string
): SparePart | undefined {
  return this.spares.find((spare) => {
    const spareSlug = spare.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return spareSlug === slug;
  });
}
  // ============================================================
  // ADD
  // ============================================================

public async addSpare(
  spareData: Omit<
    SparePart,
    'id' | 'createdAt' | 'updatedAt'
  >
): Promise<SparePart> {
  const now = new Date().toISOString();

  const newSpare: SparePart = {
    ...spareData,
    id: `spare-${Date.now()}`,
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

      console.log(
        ` [Supabase:SparesStore] Sending INSERT for spare "${newSpare.name}"...`,
        row
      );

      const { data, error } = await supabase
        .from('spares')
        .insert([row])
        .select()
        .single();

      if (error) {
        const diagnosed = logSupabaseError(
          `addSpare("${newSpare.name}")`,
          error,
          row
        );

        throw new Error(
          `${diagnosed.message} — ${diagnosed.actionableHint}`
        );
      }

      const saved = mapRowToSpare(data);

      console.log(
        `✅ [Supabase:SparesStore] Successfully inserted spare "${saved.name}" (${saved.id}).`
      );

      this.spares.unshift(saved);
      this.notify();

      return saved;
    }

    console.warn(
      '⚠️ [Supabase:SparesStore] Supabase is not configured. Saving in memory only.'
    );

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

    const idx = this.spares.findIndex(
      (spare) => spare.id === id
    );

    if (idx === -1) {
      return null;
    }

    const supabase = getSupabase();

    if (supabase) {
      const row = mapSpareToRow(updates);

      console.log(
        `📤 [Supabase:SparesStore] Sending UPDATE for spare (${id})...`,
        row
      );

      const { data, error } = await supabase
        .from('spares')
        .update(row)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        const diagnosed = logSupabaseError(
          `updateSpare(ID: "${id}")`,
          error,
          row
        );

        throw new Error(
          `${diagnosed.message} — ${diagnosed.actionableHint}`
        );
      }

      const updated = mapRowToSpare(data);

      console.log(
        `✅ [Supabase:SparesStore] Successfully updated spare "${updated.name}".`
      );

      this.spares[idx] = updated;
      this.notify();

      return updated;
    }

    this.spares[idx] = {
      ...this.spares[idx],
      ...updates,
    };

    this.notify();

    return this.spares[idx];
  }

  // ============================================================
  // DELETE
  // ============================================================

  public async deleteSpare(id: string): Promise<boolean> {
    const supabase = getSupabase();

    if (supabase) {
      console.log(
        `📤 [Supabase:SparesStore] Sending DELETE for spare (${id})...`
      );

      const { error } = await supabase
        .from('spares')
        .delete()
        .eq('id', id);

      if (error) {
        const diagnosed = logSupabaseError(
          `deleteSpare(ID: "${id}")`,
          error
        );

        throw new Error(
          `${diagnosed.message} — ${diagnosed.actionableHint}`
        );
      }

      console.log(
        `✅ [Supabase:SparesStore] Successfully deleted spare (${id}).`
      );
    }

    const initialLength = this.spares.length;

    this.spares = this.spares.filter(
      (spare) => spare.id !== id
    );

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

    if (!supabase) {
      return;
    }

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
            console.log(
              '⚡ [Supabase Realtime] Spare table changed. Refreshing...'
            );

            this.fetchSpares();
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log(
              '🔌 [Supabase Realtime] Subscribed to spares.'
            );
          }
        });

      return channel;
    } catch (error) {
      console.warn(
        '⚠️ [Supabase:SparesStore] Realtime subscription failed:',
        error
      );
    }
  }
}

export const sparesStore = new SparesStoreService();