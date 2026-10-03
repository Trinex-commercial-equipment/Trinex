import { ProductEnquiry, ServiceRequest, SpareRequest, EnquiryStatus } from '../types/product';
import { getSupabase, logSupabaseError } from './supabaseClient';

const ENQUIRIES_KEY = 'trinex_enquiries_v3';
const SERVICES_KEY = 'trinex_service_requests_v3';
const SPARE_REQUESTS_KEY = 'trinex_spare_requests_v3';

class EnquiryStoreService {
  private enquiries: ProductEnquiry[] = [];
  private serviceRequests: ServiceRequest[] = [];
  private spareRequests: SpareRequest[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.init();
    this.fetchFromSupabase();
    this.setupRealtimeSubscription();
  }

  private init() {
    try {
      const e = localStorage.getItem(ENQUIRIES_KEY);
      if (e) this.enquiries = JSON.parse(e);

      const s = localStorage.getItem(SERVICES_KEY);
      if (s) this.serviceRequests = JSON.parse(s);

      const sp = localStorage.getItem(SPARE_REQUESTS_KEY);
      if (sp) this.spareRequests = JSON.parse(sp);
    } catch (err) {
      console.warn('Enquiries localStorage error', err);
    }
  }

  private save() {
    try {
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(this.enquiries));
      localStorage.setItem(SERVICES_KEY, JSON.stringify(this.serviceRequests));
      localStorage.setItem(SPARE_REQUESTS_KEY, JSON.stringify(this.spareRequests));
    } catch (err) {
      console.error('Failed to save enquiries', err);
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
    this.listeners.forEach((l) => l());
  }

  // ==========================================
  // SUPABASE CLOUD SYNC FOR QUOTES / ENQUIRIES
  // ==========================================

  public async fetchFromSupabase(): Promise<void> {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        logSupabaseError('fetchQuotesFromSupabase()', error);
        return;
      }

      if (data && data.length > 0) {
        this.enquiries = data.map((row: any) => ({
          id: row.id,
          name: row.customer_name || 'Anonymous',
          phone: row.phone || '',
          company: row.company || '',
          city: row.notes?.match(/City:\s*([^\n,)]+)/)?.[1] || 'Hyderabad',
          productName: Array.isArray(row.products) && row.products[0]?.name ? row.products[0].name : 'General Equipment Inquiry',
          message: row.notes || '',
          status: (row.status as EnquiryStatus) || 'new',
          createdAt: row.created_at || new Date().toISOString(),
        }));
        this.save();
      } else if (this.enquiries.length > 0) {
        // If Supabase table is empty but we have local enquiries, sync them up!
        console.log('Syncing local enquiries to Supabase quotes table...');
        for (const enq of this.enquiries) {
          await this.insertToSupabase(enq);
        }
      }
    } catch (err) {
      console.warn('Could not fetch quotes from Supabase:', err);
    }
  }

  private setupRealtimeSubscription() {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      supabase
        .channel('public:quotes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'quotes' },
          () => {
            console.log('⚡ Quotes updated in Supabase, refreshing...');
            this.fetchFromSupabase();
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('Realtime quotes subscription error:', err);
    }
  }

  private async insertToSupabase(item: ProductEnquiry) {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      const emailMatch = item.message?.match(/Email:\s*([^\s)]+)/i);
      const email = emailMatch ? emailMatch[1] : '';

      const row = {
        id: item.id,
        customer_name: item.name,
        email: email || `${item.phone.replace(/\D/g, '')}@lead.trinex.in`,
        phone: item.phone,
        company: item.company || '',
        products: item.productName ? [{ name: item.productName, model: item.model || '' }] : [],
        status: item.status || 'pending',
        notes: item.message || '',
        created_at: item.createdAt || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('quotes').upsert(row, { onConflict: 'id' });
      if (error) {
        logSupabaseError('insertToSupabase(quotes)', error, row);
      } else {
        console.log('✅ Quote successfully synced to Supabase cloud!');
      }
    } catch (e) {
      console.error('Supabase quote insertion error:', e);
    }
  }

  // Quote Enquiries
  public getEnquiries(): ProductEnquiry[] {
    return [...this.enquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addEnquiry(data: Omit<ProductEnquiry, 'id' | 'status' | 'createdAt'>): ProductEnquiry {
    const item: ProductEnquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    this.enquiries.unshift(item);
    this.save();

    // Async push to Supabase
    this.insertToSupabase(item);

    return item;
  }

  public async updateEnquiryStatus(id: string, status: EnquiryStatus) {
    const item = this.enquiries.find((e) => e.id === id);
    if (item) {
      item.status = status;
      this.save();

      const supabase = getSupabase();
      if (supabase) {
        try {
          await supabase.from('quotes').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
        } catch (e) {
          console.error('Failed to update quote status in Supabase:', e);
        }
      }
    }
  }

  public async deleteEnquiry(id: string) {
    this.enquiries = this.enquiries.filter((e) => e.id !== id);
    this.save();

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('quotes').delete().eq('id', id);
      } catch (e) {
        console.error('Failed to delete quote in Supabase:', e);
      }
    }
  }

  // Service Requests
  public getServiceRequests(): ServiceRequest[] {
    return [...this.serviceRequests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addServiceRequest(data: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>): ServiceRequest {
    const item: ServiceRequest = {
      ...data,
      id: `srv-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    this.serviceRequests.unshift(item);
    this.save();
    return item;
  }

  public updateServiceRequestStatus(id: string, status: EnquiryStatus) {
    const item = this.serviceRequests.find((s) => s.id === id);
    if (item) {
      item.status = status;
      this.save();
    }
  }

  public deleteServiceRequest(id: string) {
    this.serviceRequests = this.serviceRequests.filter((s) => s.id !== id);
    this.save();
  }

  // Spare Requests
  public getSpareRequests(): SpareRequest[] {
    return [...this.spareRequests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addSpareRequest(data: Omit<SpareRequest, 'id' | 'status' | 'createdAt'>): SpareRequest {
    const item: SpareRequest = {
      ...data,
      id: `spr-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    this.spareRequests.unshift(item);
    this.save();
    return item;
  }

  public updateSpareRequestStatus(id: string, status: EnquiryStatus) {
    const item = this.spareRequests.find((s) => s.id === id);
    if (item) {
      item.status = status;
      this.save();
    }
  }

  public deleteSpareRequest(id: string) {
    this.spareRequests = this.spareRequests.filter((s) => s.id !== id);
    this.save();
  }

  public async refresh() {
    await this.fetchFromSupabase();
  }
}

export const enquiryStore = new EnquiryStoreService();
