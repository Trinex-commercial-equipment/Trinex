import { createClient, SupabaseClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as any)?.env || {};
const supabaseUrl: string = metaEnv.VITE_SUPABASE_URL || '';
const supabaseAnonKey: string = metaEnv.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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

-- Enable RLS (Row Level Security) with public read access
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spare_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Active Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Spares" ON public.spares FOR SELECT USING (true);
CREATE POLICY "Public Insert Enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Service Requests" ON public.service_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Spare Requests" ON public.spare_requests FOR INSERT WITH CHECK (true);
`;
