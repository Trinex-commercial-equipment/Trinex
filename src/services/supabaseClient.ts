import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, Category, HeroSlide } from '../types/product';

export const sanitizeSupabaseUrl = (url: string): string => {
  return (url || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
};

// ===================================================
// SUPABASE CONFIGURATION
// ===================================================
// Configuration comes ONLY from Vite .env variables.
// No localStorage is used.
//
// .env:
// VITE_SUPABASE_URL=https://your-project.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key

let currentUrl = sanitizeSupabaseUrl(
  import.meta.env.VITE_SUPABASE_URL || ''
);

let currentAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
).trim();

export const getSupabaseConfig = () => ({
  url: currentUrl,
  anonKey: currentAnonKey,
  isConfigured: Boolean(currentUrl && currentAnonKey),
});

export let isSupabaseConfigured = Boolean(
  currentUrl && currentAnonKey
);

export let supabase: SupabaseClient | null =
  isSupabaseConfigured
    ? createClient(currentUrl, currentAnonKey)
    : null;

export const getSupabase = (): SupabaseClient | null => supabase;

// Kept for backwards compatibility with existing imports.
// It does NOT read from or write to localStorage.
// The initial configuration still always comes from .env.
export const setSupabaseConfig = (url: string, anonKey: string) => {
  currentUrl = sanitizeSupabaseUrl(url);
  currentAnonKey = anonKey.trim();

  isSupabaseConfigured = Boolean(currentUrl && currentAnonKey);

  supabase = isSupabaseConfigured
    ? createClient(currentUrl, currentAnonKey)
    : null;

  console.log('Supabase configuration updated:', {
    url: currentUrl,
    hasAnonKey: Boolean(currentAnonKey),
    isConfigured: isSupabaseConfigured,
  });

  return isSupabaseConfigured;
};

if (!currentUrl) {
  console.error(
    '❌ VITE_SUPABASE_URL is missing. Check your .env file.'
  );
}

if (!currentAnonKey) {
  console.error(
    '❌ VITE_SUPABASE_ANON_KEY is missing. Check your .env file.'
  );
}

console.log('Supabase initialization:', {
  url: currentUrl || '(missing)',
  hasAnonKey: Boolean(currentAnonKey),
  isConfigured: isSupabaseConfigured,
});

// ===================================================
// DIAGNOSTIC ERROR LOGGING & REPORTING
// Detects exact cause, failure codes, and provides actionable hints
// ===================================================

export interface SupabaseErrorInfo {
  code?: string;
  message: string;
  details?: string | null;
  hint?: string | null;
  actionableHint: string;
}

export function diagnoseSupabaseError(error: any): SupabaseErrorInfo {
  if (!error) {
    return {
      message: 'Unknown error occurred',
      actionableHint: 'Check network connectivity and browser console.',
    };
  }

  const code = String(error.code || error.status || '');
  const message = String(error.message || error.error_description || error);
  const details = error.details || null;
  const hint = error.hint || null;

  let actionableHint = 'Check the browser console and Supabase dashboard logs.';

  if (code === 'PGRST205' || message.includes('schema cache') || message.includes('Could not find the table')) {
    actionableHint = "Table does not exist in Supabase! Run the SQL schema script in your Supabase Dashboard SQL Editor (Admin -> Settings & Supabase tab -> Copy SQL).";
  } else if (code === '42501' || message.includes('row-level security') || message.includes('violates row-level security policy')) {
    actionableHint = 'Row-Level Security (RLS) policy rejection! Ensure you ran the RLS policies in the SQL schema (CREATE POLICY "Public Full Access..." FOR ALL USING (true)).';
  } else if (code === '23505' || message.includes('unique constraint') || message.includes('duplicate key')) {
    actionableHint = 'Duplicate record constraint violation. An item with this slug or ID already exists in Supabase.';
  } else if (code === 'PGRST125' || message.includes('Invalid path')) {
    actionableHint = 'Invalid Supabase REST URL. Ensure VITE_SUPABASE_URL does not have "/rest/v1" appended.';
  } else if (code === 'PGRST301' || message.includes('JWT') || message.includes('apikey') || message.includes('Invalid API key')) {
    actionableHint = 'Invalid or expired Supabase Anon Key. Verify VITE_SUPABASE_ANON_KEY from Supabase Project Settings -> API.';
  } else if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
    actionableHint = 'Network request failed. Verify your internet connection or check if your Supabase project is paused.';
  }

  return {
    code,
    message,
    details,
    hint,
    actionableHint,
  };
}

export function logSupabaseError(context: string, error: any, extraPayload?: any): SupabaseErrorInfo {
  const diagnosed = diagnoseSupabaseError(error);

  console.group(`❌ [Supabase Failure] ${context}`);
  console.error(`Message: ${diagnosed.message}`);
  if (diagnosed.code) console.error(`Code: ${diagnosed.code}`);
  if (diagnosed.details) console.warn(`Details:`, diagnosed.details);
  if (diagnosed.hint) console.info(`Hint:`, diagnosed.hint);
  console.warn(`👉 Action Required: ${diagnosed.actionableHint}`);
  if (extraPayload) console.debug('Payload Data:', extraPayload);
  console.groupEnd();

  return diagnosed;
}

// ===================================================
// DATA MAPPING UTILITIES
// Lossless bidirectional transformations matching frontend types
// ===================================================

export function mapRowToProduct(row: any): Product {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name || ''),
    shortDescription: String(row.short_description || ''),
    description: String(row.description || ''),
    category: String(row.category || ''),
    categorySlug: String(row.category_slug || ''),
    brand: String(row.brand || 'Trinex'),
    model: String(row.model || ''),
    images: Array.isArray(row.images) ? row.images : [],
    power: row.power || undefined,
    cookingType: row.cooking_type || undefined,
    cookingSurface: row.cooking_surface || undefined,
    installation: row.installation || undefined,
    application: row.application || undefined,
    warranty: row.warranty || undefined,
    idealFor: Array.isArray(row.ideal_for) ? row.ideal_for : [],
    features: Array.isArray(row.features) ? row.features : [],
    specifications: Array.isArray(row.specifications) ? row.specifications : [],
    dimensions: row.dimensions || undefined,
    weight: row.weight || undefined,
    material: row.material || undefined,
    voltage: row.voltage || undefined,
    frequency: row.frequency || undefined,
    phase: row.phase || undefined,
    capacity: row.capacity || undefined,
    fuelType: row.fuel_type || undefined,
    countryOfOrigin: row.country_of_origin || undefined,
    brochureUrl: row.brochure_url || undefined,
    availability: (row.availability as Product['availability']) || 'in_stock',
    featured: Boolean(row.featured),
    fastMoving: Boolean(row.fast_moving),
    status: (row.status as Product['status']) || 'active',
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

export function mapProductToRow(prod: Partial<Product>): Record<string, any> {
  const row: Record<string, any> = {};
  if (prod.id !== undefined) row.id = prod.id;
  if (prod.slug !== undefined) row.slug = prod.slug;
  if (prod.name !== undefined) row.name = prod.name;
  if (prod.shortDescription !== undefined) row.short_description = prod.shortDescription;
  if (prod.description !== undefined) row.description = prod.description;
  if (prod.category !== undefined) row.category = prod.category;
  if (prod.categorySlug !== undefined) row.category_slug = prod.categorySlug;
  if (prod.brand !== undefined) row.brand = prod.brand;
  if (prod.model !== undefined) row.model = prod.model;
  if (prod.images !== undefined) row.images = prod.images;
  if (prod.power !== undefined) row.power = prod.power;
  if (prod.cookingType !== undefined) row.cooking_type = prod.cookingType;
  if (prod.cookingSurface !== undefined) row.cooking_surface = prod.cookingSurface;
  if (prod.installation !== undefined) row.installation = prod.installation;
  if (prod.application !== undefined) row.application = prod.application;
  if (prod.warranty !== undefined) row.warranty = prod.warranty;
  if (prod.idealFor !== undefined) row.ideal_for = prod.idealFor;
  if (prod.features !== undefined) row.features = prod.features;
  if (prod.specifications !== undefined) row.specifications = prod.specifications;
  if (prod.dimensions !== undefined) row.dimensions = prod.dimensions;
  if (prod.weight !== undefined) row.weight = prod.weight;
  if (prod.material !== undefined) row.material = prod.material;
  if (prod.voltage !== undefined) row.voltage = prod.voltage;
  if (prod.frequency !== undefined) row.frequency = prod.frequency;
  if (prod.phase !== undefined) row.phase = prod.phase;
  if (prod.capacity !== undefined) row.capacity = prod.capacity;
  if (prod.fuelType !== undefined) row.fuel_type = prod.fuelType;
  if (prod.countryOfOrigin !== undefined) row.country_of_origin = prod.countryOfOrigin;
  if (prod.brochureUrl !== undefined) row.brochure_url = prod.brochureUrl;
  if (prod.availability !== undefined) row.availability = prod.availability;
  if (prod.featured !== undefined) row.featured = prod.featured;
  if (prod.fastMoving !== undefined) row.fast_moving = prod.fastMoving;
  if (prod.status !== undefined) row.status = prod.status;
  if (prod.createdAt !== undefined) row.created_at = prod.createdAt;
  if (prod.updatedAt !== undefined) row.updated_at = prod.updatedAt;
  return row;
}

export function mapRowToCategory(row: any): Category {
  return {
    id: String(row.id),
    name: String(row.name || ''),
    slug: String(row.slug || ''),
    description: String(row.description || ''),
    image: String(row.image || ''),
    displayOrder: row.display_order ?? 0,
  };
}

export function mapCategoryToRow(cat: Partial<Category>): Record<string, any> {
  const row: Record<string, any> = {};
  if (cat.id !== undefined) row.id = cat.id;
  if (cat.name !== undefined) row.name = cat.name;
  if (cat.slug !== undefined) row.slug = cat.slug;
  if (cat.description !== undefined) row.description = cat.description;
  if (cat.image !== undefined) row.image = cat.image;
  if (cat.displayOrder !== undefined) row.display_order = cat.displayOrder;
  return row;
}

export function mapRowToHeroSlide(row: any): HeroSlide {
  return {
    id: String(row.id),
    image: String(row.image || ''),
    title: String(row.title || ''),
    subtitle: String(row.subtitle || ''),
    link: String(row.link || '/products'),
    buttonText: String(row.button_text || 'Explore Range'),
    displayOrder: row.display_order ?? 0,
    status: (row.status as any) || 'active',
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export function mapHeroSlideToRow(slide: Partial<HeroSlide>): Record<string, any> {
  const row: Record<string, any> = {};
  if (slide.id !== undefined) row.id = slide.id;
  if (slide.image !== undefined) row.image = slide.image;
  if (slide.title !== undefined) row.title = slide.title;
  if (slide.subtitle !== undefined) row.subtitle = slide.subtitle;
  if (slide.link !== undefined) row.link = slide.link;
  if (slide.buttonText !== undefined) row.button_text = slide.buttonText;
  if (slide.displayOrder !== undefined) row.display_order = slide.displayOrder;
  if (slide.status !== undefined) row.status = slide.status;
  row.updated_at = new Date().toISOString();
  return row;
}

export const SUPABASE_SQL_SCHEMA = `-- ===================================================
-- TRINEX EQUIPMENT PVT LTD - SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor
-- ===================================================

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  brand TEXT DEFAULT 'Trinex',
  model TEXT,
  short_description TEXT,
  description TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  ideal_for JSONB DEFAULT '[]'::jsonb,
  power TEXT,
  voltage TEXT,
  frequency TEXT,
  phase TEXT,
  cooking_type TEXT,
  cooking_surface TEXT,
  installation TEXT,
  application TEXT,
  warranty TEXT,
  dimensions TEXT,
  weight TEXT,
  material TEXT,
  capacity TEXT,
  fuel_type TEXT,
  country_of_origin TEXT,
  brochure_url TEXT,
  availability TEXT DEFAULT 'in_stock',
  featured BOOLEAN DEFAULT false,
  fast_moving BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Spare Parts Table
CREATE TABLE IF NOT EXISTS public.spares (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  part_number TEXT NOT NULL,
  compatible_equipment TEXT,
  category TEXT,
  image TEXT,
  short_description TEXT,
  specifications JSONB DEFAULT '[]'::jsonb,
  availability TEXT DEFAULT 'in_stock',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  city TEXT,
  product_name TEXT,
  model TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Service Requests Table
CREATE TABLE IF NOT EXISTS public.service_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  business_name TEXT,
  city TEXT NOT NULL,
  service_required TEXT NOT NULL,
  equipment_brand_model TEXT,
  describe_issue TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Spare Requests Table
CREATE TABLE IF NOT EXISTS public.spare_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  business_name TEXT,
  city TEXT NOT NULL,
  equipment_brand TEXT NOT NULL,
  equipment_model TEXT,
  spare_part_required TEXT NOT NULL,
  part_number TEXT,
  additional_details TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Hero Slides Table (Syncs Homepage Image Slider across all devices)
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id TEXT PRIMARY KEY,
  image TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  link TEXT DEFAULT '/products',
  button_text TEXT DEFAULT 'Explore Range',
  display_order INT DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spare_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Clean up any existing policies
DROP POLICY IF EXISTS "Public Full Access Products" ON public.products;
DROP POLICY IF EXISTS "Public Read Active Products" ON public.products;
DROP POLICY IF EXISTS "Public Full Access Categories" ON public.categories;
DROP POLICY IF EXISTS "Public Read Categories" ON public.categories;
DROP POLICY IF EXISTS "Public Full Access Spares" ON public.spares;
DROP POLICY IF EXISTS "Public Read Spares" ON public.spares;
DROP POLICY IF EXISTS "Public Full Access Enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Public Insert Enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Public Full Access Service Requests" ON public.service_requests;
DROP POLICY IF EXISTS "Public Insert Service Requests" ON public.service_requests;
DROP POLICY IF EXISTS "Public Full Access Spare Requests" ON public.spare_requests;
DROP POLICY IF EXISTS "Public Insert Spare Requests" ON public.spare_requests;
DROP POLICY IF EXISTS "Public Full Access Hero Slides" ON public.hero_slides;

-- Enable Full Access Policies for anonymous / public client operations
CREATE POLICY "Public Full Access Products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Full Access Categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Full Access Spares" ON public.spares FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Full Access Enquiries" ON public.enquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Full Access Service Requests" ON public.service_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Full Access Spare Requests" ON public.spare_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Full Access Hero Slides" ON public.hero_slides FOR ALL USING (true) WITH CHECK (true);
`;
