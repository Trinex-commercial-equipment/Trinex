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
      console.error('Failed to save enquiries to localStorage', err);
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

  // ============================================================
  // SUPABASE CLOUD SYNC FOR ALL THREE REQUEST TYPES
  // ============================================================

  public async fetchFromSupabase(): Promise<void> {
    const supabase = getSupabase();
    if (!supabase) return;

    // 1. Fetch Enquiries from public.enquiries (and quotes)
    try {
      const { data: enqData, error: enqError } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (enqError) {
        logSupabaseError('fetchEnquiries()', enqError);
      } else if (enqData && enqData.length > 0) {
        this.enquiries = enqData.map((row: any) => ({
          id: row.id,
          name: row.name,
          phone: row.phone,
          company: row.company || '',
          city: row.city || 'Hyderabad',
          productName: row.product_name || 'General Equipment Inquiry',
          model: row.model || '',
          message: row.message || '',
          status: (row.status as EnquiryStatus) || 'new',
          createdAt: row.created_at || new Date().toISOString(),
        }));
        this.save();
      } else if (this.enquiries.length > 0) {
        // Upload local offline enquiries to Supabase
        for (const item of this.enquiries) {
          await this.syncEnquiryToSupabase(item);
        }
      }
    } catch (err) {
      console.warn('Could not fetch enquiries from Supabase:', err);
    }

    // 2. Fetch Service Requests from public.service_requests
    try {
      const { data: srvData, error: srvError } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (srvError) {
        logSupabaseError('fetchServiceRequests()', srvError);
      } else if (srvData && srvData.length > 0) {
        this.serviceRequests = srvData.map((row: any) => ({
          id: row.id,
          name: row.name,
          mobile: row.mobile,
          businessName: row.business_name || '',
          city: row.city || 'Hyderabad',
          serviceRequired: row.service_required || 'Repair',
          equipmentBrandModel: row.equipment_brand_model || '',
          describeIssue: row.describe_issue || '',
          status: (row.status as EnquiryStatus) || 'new',
          createdAt: row.created_at || new Date().toISOString(),
        }));
        this.save();
      } else if (this.serviceRequests.length > 0) {
        // Upload local offline service requests to Supabase
        for (const item of this.serviceRequests) {
          await this.syncServiceRequestToSupabase(item);
        }
      }
    } catch (err) {
      console.warn('Could not fetch service requests from Supabase:', err);
    }

    // 3. Fetch Spare Requests from public.spare_requests
    try {
      const { data: sprData, error: sprError } = await supabase
        .from('spare_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (sprError) {
        logSupabaseError('fetchSpareRequests()', sprError);
      } else if (sprData && sprData.length > 0) {
        this.spareRequests = sprData.map((row: any) => ({
          id: row.id,
          name: row.name,
          mobile: row.mobile,
          businessName: row.business_name || '',
          city: row.city || 'Hyderabad',
          equipmentBrand: row.equipment_brand || 'Trinex',
          equipmentModel: row.equipment_model || '',
          sparePartRequired: row.spare_part_required || 'Spare Part',
          partNumber: row.part_number || '',
          additionalDetails: row.additional_details || '',
          status: (row.status as EnquiryStatus) || 'new',
          createdAt: row.created_at || new Date().toISOString(),
        }));
        this.save();
      } else if (this.spareRequests.length > 0) {
        // Upload local offline spare requests to Supabase
        for (const item of this.spareRequests) {
          await this.syncSpareRequestToSupabase(item);
        }
      }
    } catch (err) {
      console.warn('Could not fetch spare requests from Supabase:', err);
    }
  }

  private setupRealtimeSubscription() {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      supabase
        .channel('public:enquiry_suite_realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'enquiries' }, () => {
          console.log('⚡ Enquiries table changed in Supabase. Refreshing...');
          this.fetchFromSupabase();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'service_requests' }, () => {
          console.log('⚡ Service requests table changed in Supabase. Refreshing...');
          this.fetchFromSupabase();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'spare_requests' }, () => {
          console.log('⚡ Spare requests table changed in Supabase. Refreshing...');
          this.fetchFromSupabase();
        })
        .subscribe();
    } catch (err) {
      console.warn('Realtime enquiry subscription error:', err);
    }
  }

  // ----------------------------------------------------
  // Sync Helpers
  // ----------------------------------------------------
  private async syncEnquiryToSupabase(item: ProductEnquiry) {
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      const row = {
        id: item.id,
        name: item.name,
        phone: item.phone,
        company: item.company || '',
        city: item.city || 'Hyderabad',
        product_name: item.productName || '',
        model: item.model || '',
        message: item.message || '',
        status: item.status || 'new',
        created_at: item.createdAt || new Date().toISOString(),
      };
      await supabase.from('enquiries').upsert(row, { onConflict: 'id' });
    } catch (e) {
      console.error('Failed to sync enquiry to Supabase', e);
    }
  }

  private async syncServiceRequestToSupabase(item: ServiceRequest) {
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      const row = {
        id: item.id,
        name: item.name,
        mobile: item.mobile,
        business_name: item.businessName || '',
        city: item.city || 'Hyderabad',
        service_required: item.serviceRequired || 'Repair',
        equipment_brand_model: item.equipmentBrandModel || '',
        describe_issue: item.describeIssue || '',
        status: item.status || 'new',
        created_at: item.createdAt || new Date().toISOString(),
      };
      await supabase.from('service_requests').upsert(row, { onConflict: 'id' });
    } catch (e) {
      console.error('Failed to sync service request to Supabase', e);
    }
  }

  private async syncSpareRequestToSupabase(item: SpareRequest) {
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      const row = {
        id: item.id,
        name: item.name,
        mobile: item.mobile,
        business_name: item.businessName || '',
        city: item.city || 'Hyderabad',
        equipment_brand: item.equipmentBrand || 'Trinex',
        equipment_model: item.equipmentModel || '',
        spare_part_required: item.sparePartRequired || 'Spare Part',
        part_number: item.partNumber || '',
        additional_details: item.additionalDetails || '',
        status: item.status || 'new',
        created_at: item.createdAt || new Date().toISOString(),
      };
      await supabase.from('spare_requests').upsert(row, { onConflict: 'id' });
    } catch (e) {
      console.error('Failed to sync spare request to Supabase', e);
    }
  }

  // ============================================================
  // PUBLIC CRUD METHODS
  // ============================================================

  // --- Quote / Product Enquiries ---
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
    this.syncEnquiryToSupabase(item);
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
          await supabase.from('enquiries').update({ status }).eq('id', id);
        } catch (e) {
          console.error('Failed to update enquiry status in Supabase:', e);
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
        await supabase.from('enquiries').delete().eq('id', id);
      } catch (e) {
        console.error('Failed to delete enquiry from Supabase:', e);
      }
    }
  }

  // --- Service Requests ---
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
    this.syncServiceRequestToSupabase(item);
    return item;
  }

  public async updateServiceRequestStatus(id: string, status: EnquiryStatus) {
    const item = this.serviceRequests.find((s) => s.id === id);
    if (item) {
      item.status = status;
      this.save();
      const supabase = getSupabase();
      if (supabase) {
        try {
          await supabase.from('service_requests').update({ status }).eq('id', id);
        } catch (e) {
          console.error('Failed to update service request status in Supabase:', e);
        }
      }
    }
  }

  public async deleteServiceRequest(id: string) {
    this.serviceRequests = this.serviceRequests.filter((s) => s.id !== id);
    this.save();
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('service_requests').delete().eq('id', id);
      } catch (e) {
        console.error('Failed to delete service request from Supabase:', e);
      }
    }
  }

  // --- Spare Requests ---
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
    this.syncSpareRequestToSupabase(item);
    return item;
  }

  public async updateSpareRequestStatus(id: string, status: EnquiryStatus) {
    const item = this.spareRequests.find((s) => s.id === id);
    if (item) {
      item.status = status;
      this.save();
      const supabase = getSupabase();
      if (supabase) {
        try {
          await supabase.from('spare_requests').update({ status }).eq('id', id);
        } catch (e) {
          console.error('Failed to update spare request status in Supabase:', e);
        }
      }
    }
  }

  public async deleteSpareRequest(id: string) {
    this.spareRequests = this.spareRequests.filter((s) => s.id !== id);
    this.save();
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('spare_requests').delete().eq('id', id);
      } catch (e) {
        console.error('Failed to delete spare request from Supabase:', e);
      }
    }
  }

  public async refresh() {
    await this.fetchFromSupabase();
  }
}

export const enquiryStore = new EnquiryStoreService();
