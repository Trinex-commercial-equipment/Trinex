import { ProductEnquiry, ServiceRequest, SpareRequest, EnquiryStatus } from '../types/product';

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
    return item;
  }

  public updateEnquiryStatus(id: string, status: EnquiryStatus) {
    const item = this.enquiries.find((e) => e.id === id);
    if (item) {
      item.status = status;
      this.save();
    }
  }

  public deleteEnquiry(id: string) {
    this.enquiries = this.enquiries.filter((e) => e.id !== id);
    this.save();
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
}

export const enquiryStore = new EnquiryStoreService();
