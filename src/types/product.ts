export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  categorySlug: string;
  brand: string;
  model: string;
  images: string[];
  
  // Specific Core Equipment Fields
  power?: string;
  cookingType?: string;
  cookingSurface?: string;
  installation?: string;
  application?: string;
  warranty?: string;
  
  // Audiences & Lists
  idealFor: string[];
  features: string[];
  specifications: ProductSpec[];
  
  // Optional extra fields
  dimensions?: string;
  weight?: string;
  material?: string;
  voltage?: string;
  frequency?: string;
  phase?: string;
  capacity?: string;
  fuelType?: string;
  countryOfOrigin?: string;
  brochureUrl?: string;
  
  // Management & Flags
  availability: 'in_stock' | 'made_to_order' | 'contact_for_lead_time';
  featured: boolean;
  fastMoving: boolean;
  status: 'active' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayOrder?: number;
}

export interface SparePart {
  id: string;
  name: string;
  partNumber: string;
  compatibleEquipment: string;
  category: string;
  image: string;
  shortDescription: string;
  specifications: ProductSpec[];
  availability: 'in_stock' | 'procurement' | 'contact';
  status: 'active' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed';

export interface ProductEnquiry {
  id: string;
  name: string;
  phone: string;
  company?: string;
  city?: string;
  productName?: string;
  model?: string;
  message?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface ServiceRequest {
  id: string;
  name: string;
  mobile: string;
  businessName?: string;
  city: string;
  serviceRequired: 'Installation' | 'Repair' | 'Preventive Maintenance' | 'Spare Parts' | 'Other';
  equipmentBrandModel?: string;
  describeIssue?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface SpareRequest {
  id: string;
  name: string;
  mobile: string;
  businessName?: string;
  city: string;
  equipmentBrand: string;
  equipmentModel?: string;
  sparePartRequired: string;
  partNumber?: string;
  additionalDetails?: string;
  status: EnquiryStatus;
  createdAt: string;
}
