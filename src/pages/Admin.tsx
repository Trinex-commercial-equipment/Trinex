import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  Package, 
  Wrench, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Image as ImageIcon,
  Copy,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  Eye,
  Check,
  X
} from 'lucide-react';
import { productStore, slugify } from '../services/productStore';
import { sparesStore } from '../services/sparesStore';
import { enquiryStore } from '../services/enquiryStore';
import { Product, Category, SparePart, ProductSpec, EnquiryStatus } from '../types/product';
import { SUPABASE_SQL_SCHEMA, isSupabaseConfigured } from '../services/supabaseClient';

const AVAILABLE_SAMPLE_IMAGES = [
  '/assets/images/countertop_induction_hob.png',
  '/assets/images/trinex_induction_banner.jpg',
  '/assets/images/chinese_wok_station.png',
  '/assets/images/cooking_range.jpg',
  '/assets/images/commercial_refrigerator.jpg',
  '/assets/images/digital_induction_cooker.png',
  '/assets/images/double_burner_range.png',
  '/assets/images/holding_cabinet.png',
  '/assets/images/induction_wok_cooker.png',
  '/assets/images/steamer_cabinet.png',
  '/assets/images/stock_pot_stove.png',
  '/assets/images/undercounter_stock_stove.png',
  '/assets/images/category_induction.jpg',
  '/assets/images/category_cooking.jpg',
  '/assets/images/category_refrigeration.jpg',
  '/assets/images/category_food_prep.jpg',
  '/assets/images/category_holding_steamer.jpg'
];

const IDEAL_FOR_OPTIONS = [
  'Restaurants',
  'Hotels',
  'Catering',
  'Cloud Kitchens',
  'Canteens',
  'Cafeterias',
  'Food Courts',
  'Bakeries',
  'Institutional Kitchens'
];

export const Admin: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('trinex_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'categories' | 'spares' | 'enquiries' | 'services' | 'spare_requests' | 'settings'
  >('dashboard');

  // Live Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [spares, setSpares] = useState<SparePart[]>([]);
  const [enquiries, setEnquiries] = useState(enquiryStore.getEnquiries());
  const [serviceRequests, setServiceRequests] = useState(enquiryStore.getServiceRequests());
  const [spareRequests, setSpareRequests] = useState(enquiryStore.getSpareRequests());

  // Search filter for products table
  const [productSearch, setProductSearch] = useState('');

  // Product Editor Modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<{
    name: string;
    slug: string;
    brand: string;
    model: string;
    category: string;
    categorySlug: string;
    shortDescription: string;
    description: string;
    images: string[];
    power: string;
    voltage: string;
    phase: string;
    cookingType: string;
    cookingSurface: string;
    installation: string;
    application: string;
    warranty: string;
    dimensions: string;
    material: string;
    countryOfOrigin: string;
    availability: 'in_stock' | 'made_to_order' | 'contact_for_lead_time';
    featured: boolean;
    fastMoving: boolean;
    status: 'active' | 'draft';
    idealFor: string[];
    features: string[];
    specifications: ProductSpec[];
  }>({
    name: '',
    slug: '',
    brand: 'Trinex',
    model: '',
    category: 'Commercial Induction',
    categorySlug: 'commercial-induction',
    shortDescription: '',
    description: '',
    images: ['/assets/images/countertop_induction_hob.png'],
    power: '',
    voltage: '220V - 240V',
    phase: 'Single Phase',
    cookingType: 'Induction',
    cookingSurface: 'Flat',
    installation: 'Countertop',
    application: 'Commercial Kitchen',
    warranty: '1 Year',
    dimensions: '',
    material: 'Stainless Steel',
    countryOfOrigin: 'India',
    availability: 'in_stock',
    featured: false,
    fastMoving: false,
    status: 'active',
    idealFor: ['Restaurants', 'Hotels', 'Cloud Kitchens'],
    features: ['Commercial heavy duty construction', 'Fast heating and energy saving'],
    specifications: [
      { label: 'Brand', value: 'Trinex' },
      { label: 'Installation', value: 'Countertop' }
    ]
  });

  // Category Editor Modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: '/assets/images/category_induction.jpg',
  });

  // Spare Part Editor Modal
  const [spareModalOpen, setSpareModalOpen] = useState(false);
  const [editingSpareId, setEditingSpareId] = useState<string | null>(null);
  const [spareForm, setSpareForm] = useState<{
    name: string;
    partNumber: string;
    compatibleEquipment: string;
    category: string;
    image: string;
    shortDescription: string;
    specifications: ProductSpec[];
  }>({
    name: '',
    partNumber: '',
    compatibleEquipment: '',
    category: 'Commercial Induction',
    image: '/assets/images/countertop_induction_hob.png',
    shortDescription: '',
    specifications: [{ label: 'Material', value: 'Ceramic Glass' }]
  });

  const [copiedSchema, setCopiedSchema] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Sync data from stores
  const refreshAllData = () => {
    setProducts(productStore.getAllProducts(true));
    setCategories(productStore.getCategories());
    setSpares(sparesStore.getAllSpares(true));
    setEnquiries(enquiryStore.getEnquiries());
    setServiceRequests(enquiryStore.getServiceRequests());
    setSpareRequests(enquiryStore.getSpareRequests());
  };

  useEffect(() => {
    refreshAllData();
    const unsubProd = productStore.subscribe(refreshAllData);
    const unsubSpares = sparesStore.subscribe(refreshAllData);
    const unsubEnq = enquiryStore.subscribe(refreshAllData);
    return () => {
      unsubProd();
      unsubSpares();
      unsubEnq();
    };
  }, []);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'trinex@2025' || password === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('trinex_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect admin password. (Default is trinex@2025)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('trinex_admin_auth');
  };

  // ----------------------------------------------------
  // Product Operations
  // ----------------------------------------------------
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      slug: '',
      brand: 'Trinex',
      model: '',
      category: categories[0]?.name || 'Commercial Induction',
      categorySlug: categories[0]?.slug || 'commercial-induction',
      shortDescription: '',
      description: '',
      images: ['/assets/images/countertop_induction_hob.png'],
      power: '3.5 kW single phase',
      voltage: '220V - 240V',
      phase: 'Single Phase',
      cookingType: 'Induction',
      cookingSurface: 'Flat',
      installation: 'Countertop',
      application: 'Commercial Kitchen',
      warranty: '1 Year',
      dimensions: '',
      material: 'Stainless Steel',
      countryOfOrigin: 'India',
      availability: 'in_stock',
      featured: false,
      fastMoving: false,
      status: 'active',
      idealFor: ['Restaurants', 'Hotels', 'Cloud Kitchens', 'Catering'],
      features: [
        'High thermal efficiency with instant heating',
        'Heavy-duty food-grade stainless steel construction',
        'Thermal shock resistant ceramic glass cooking surface'
      ],
      specifications: [
        { label: 'Brand', value: 'Trinex' },
        { label: 'Power', value: '3.5 kW single phase' },
        { label: 'Cooking Type', value: 'Induction' },
        { label: 'Warranty', value: '1 Year' }
      ]
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      slug: prod.slug,
      brand: prod.brand || 'Trinex',
      model: prod.model || '',
      category: prod.category,
      categorySlug: prod.categorySlug,
      shortDescription: prod.shortDescription,
      description: prod.description,
      images: prod.images && prod.images.length > 0 ? prod.images : ['/assets/images/countertop_induction_hob.png'],
      power: prod.power || '',
      voltage: prod.voltage || '',
      phase: prod.phase || '',
      cookingType: prod.cookingType || '',
      cookingSurface: prod.cookingSurface || '',
      installation: prod.installation || '',
      application: prod.application || '',
      warranty: prod.warranty || '',
      dimensions: prod.dimensions || '',
      material: prod.material || '',
      countryOfOrigin: prod.countryOfOrigin || '',
      availability: prod.availability || 'in_stock',
      featured: prod.featured || false,
      fastMoving: prod.fastMoving || false,
      status: prod.status || 'active',
      idealFor: prod.idealFor || [],
      features: prod.features || [],
      specifications: prod.specifications || []
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      alert('Product name is required');
      return;
    }

    if (editingProductId) {
      productStore.updateProduct(editingProductId, {
        ...productForm,
        slug: productForm.slug ? slugify(productForm.slug) : slugify(`${productForm.name} ${productForm.model}`),
      });
      showNotification(`Product "${productForm.name}" updated successfully!`);
    } else {
      productStore.addProduct({
        ...productForm,
        slug: productForm.slug ? slugify(productForm.slug) : slugify(`${productForm.name} ${productForm.model}`),
      });
      showNotification(`Product "${productForm.name}" created and published!`);
    }

    setProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      productStore.deleteProduct(id);
      showNotification(`Product "${name}" deleted.`);
    }
  };

  const handleToggleFastMoving = (prod: Product) => {
    productStore.updateProduct(prod.id, { fastMoving: !prod.fastMoving });
    showNotification(`Toggled Fast Moving for ${prod.name}`);
  };

  const handleToggleFeatured = (prod: Product) => {
    productStore.updateProduct(prod.id, { featured: !prod.featured });
    showNotification(`Toggled Featured for ${prod.name}`);
  };

  const handleToggleStatus = (prod: Product) => {
    const newStatus = prod.status === 'active' ? 'draft' : 'active';
    productStore.updateProduct(prod.id, { status: newStatus });
    showNotification(`Status updated to ${newStatus}`);
  };

  // Image Upload handler (Base64 file reader)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProductForm((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // ----------------------------------------------------
  // Category Operations
  // ----------------------------------------------------
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) return;

    productStore.addCategory({
      name: categoryForm.name,
      slug: categoryForm.slug ? slugify(categoryForm.slug) : slugify(categoryForm.name),
      description: categoryForm.description,
      image: categoryForm.image,
    });

    setCategoryModalOpen(false);
    showNotification(`Category "${categoryForm.name}" created!`);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      productStore.deleteCategory(id);
      showNotification(`Category "${name}" deleted.`);
    }
  };

  // ----------------------------------------------------
  // Spare Operations
  // ----------------------------------------------------
  const handleOpenAddSpare = () => {
    setEditingSpareId(null);
    setSpareForm({
      name: '',
      partNumber: '',
      compatibleEquipment: '',
      category: 'Commercial Induction',
      image: '/assets/images/countertop_induction_hob.png',
      shortDescription: '',
      specifications: [{ label: 'Material', value: 'Ceramic Glass' }]
    });
    setSpareModalOpen(true);
  };

  const handleSaveSpare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spareForm.name.trim()) return;

    if (editingSpareId) {
      sparesStore.updateSpare(editingSpareId, spareForm);
      showNotification(`Spare part "${spareForm.name}" updated!`);
    } else {
      sparesStore.addSpare({
        ...spareForm,
        availability: 'in_stock',
        status: 'active',
      });
      showNotification(`Spare part "${spareForm.name}" added to catalogue!`);
    }
    setSpareModalOpen(false);
  };

  const handleDeleteSpare = (id: string, name: string) => {
    if (window.confirm(`Delete spare part "${name}"?`)) {
      sparesStore.deleteSpare(id);
      showNotification(`Spare part "${name}" deleted.`);
    }
  };

  // ----------------------------------------------------
  // Render Login Gate
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-trinex-light-gray">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-card border border-trinex-border p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-trinex-red flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-trinex-black">
              Trinex Admin Portal
            </h2>
            <p className="text-xs text-gray-500">
              Authorized equipment catalog management & inquiries
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: trinex@2025)"
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
              />
            </div>

            {authError && (
              <p className="text-xs font-semibold text-trinex-red">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Dashboard</span>
            </button>

            <div className="pt-2 text-center text-xs text-gray-400">
              Commercial Kitchen Equipment Management System
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Filtered Products for Table
  const displayProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.model.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-trinex-black text-white px-4 py-3 rounded-lg shadow-xl border border-gray-700 flex items-center gap-2 text-xs font-bold animate-in fade-in duration-150">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <div className="bg-trinex-black text-white px-4 sm:px-8 py-4 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/assets/logo/trinex_official_logo.png" alt="Trinex" className="h-7 w-auto bg-white p-1 rounded" />
          <div>
            <h1 className="text-sm font-black tracking-wide text-white uppercase">
              Management Portal
            </h1>
            <span className="text-[10px] text-gray-400 block">TRINEX EQUIPMENT PVT LTD</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open('/', '_blank')}
            className="text-xs font-bold text-gray-300 hover:text-white px-3 py-1.5 rounded bg-gray-900 border border-gray-800 flex items-center gap-1.5"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleLogout}
            className="text-xs font-bold text-trinex-red hover:text-red-400 px-3 py-1.5 rounded bg-gray-900 border border-gray-800 flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="bg-white border-b border-trinex-border px-4 sm:px-8 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 sm:gap-4 py-2 min-w-max">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Layers },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
            { id: 'spares', label: `Spares (${spares.length})`, icon: Wrench },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
            { id: 'services', label: `Service Requests (${serviceRequests.length})`, icon: Wrench },
            { id: 'spare_requests', label: `Spare Requests (${spareRequests.length})`, icon: Package },
            { id: 'settings', label: 'Settings & Supabase', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  active
                    ? 'bg-trinex-red text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* ====================================================
            1. DASHBOARD OVERVIEW TAB
            ==================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-trinex-border shadow-xs">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Total Products
                </span>
                <span className="text-3xl font-black text-trinex-black mt-1 block">
                  {products.length}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                  {products.filter((p) => p.status === 'active').length} Active in Catalogue
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-trinex-border shadow-xs">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Fast-Moving Hero
                </span>
                <span className="text-3xl font-black text-trinex-red mt-1 block">
                  {products.filter((p) => p.fastMoving).length}
                </span>
                <span className="text-[10px] text-gray-500 font-semibold mt-1 block">
                  Showing in Hero Section
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-trinex-border shadow-xs">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Categories
                </span>
                <span className="text-3xl font-black text-trinex-black mt-1 block">
                  {categories.length}
                </span>
                <span className="text-[10px] text-gray-500 font-semibold mt-1 block">
                  Equipment Segments
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-trinex-border shadow-xs">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Total Inquiries
                </span>
                <span className="text-3xl font-black text-trinex-black mt-1 block">
                  {enquiries.length + serviceRequests.length + spareRequests.length}
                </span>
                <span className="text-[10px] text-trinex-red font-semibold mt-1 block">
                  Quotes & Service Tickets
                </span>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white p-6 rounded-xl border border-trinex-border shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-trinex-black uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2.5 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>

                <button
                  onClick={handleOpenAddSpare}
                  className="px-4 py-2.5 rounded-lg bg-trinex-black hover:bg-gray-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Spare Part</span>
                </button>

                <button
                  onClick={() => setCategoryModalOpen(true)}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-trinex-black font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Category</span>
                </button>
              </div>
            </div>

            {/* Recent Product Enquiries */}
            <div className="bg-white p-6 rounded-xl border border-trinex-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-trinex-black uppercase tracking-wider">
                  Recent Product Quote Inquiries
                </h3>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs font-bold text-trinex-red hover:underline"
                >
                  View All &rarr;
                </button>
              </div>

              {enquiries.length > 0 ? (
                <div className="divide-y divide-gray-100 text-xs">
                  {enquiries.slice(0, 5).map((enq) => (
                    <div key={enq.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <strong className="text-trinex-black">{enq.name}</strong>
                        <span className="text-gray-400 mx-2">|</span>
                        <a href={`tel:${enq.phone}`} className="font-bold text-trinex-red hover:underline">
                          {enq.phone}
                        </a>
                        <p className="text-gray-500 mt-0.5">{enq.productName || 'General Inquiry'}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-50 text-trinex-red">
                        {enq.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 py-4">No enquiries yet.</p>
              )}
            </div>
          </div>
        )}

        {/* ====================================================
            2. PRODUCTS TAB (FULL CRUD)
            ==================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-trinex-border shadow-xs">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter products by name or model..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Product</span>
                </button>
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-xl border border-trinex-border shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 text-gray-600 uppercase font-black tracking-wider text-[10px] border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Model</th>
                      <th className="py-3 px-4 text-center">Fast Moving</th>
                      <th className="py-3 px-4 text-center">Featured</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {displayProducts.length > 0 ? (
                      displayProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="w-12 h-12 rounded bg-gray-50 border border-gray-200 p-1 flex items-center justify-center overflow-hidden">
                              <img
                                src={p.images?.[0] || '/assets/images/countertop_induction_hob.png'}
                                alt={p.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4 font-bold text-trinex-black">
                            {p.name}
                            <div className="text-[10px] text-gray-400 font-mono mt-0.5">/{p.slug}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold text-gray-700">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-600">
                            {p.model || '—'}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleToggleFastMoving(p)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.fastMoving
                                  ? 'bg-red-50 text-trinex-red border border-red-200'
                                  : 'bg-gray-100 text-gray-400'
                              }`}
                            >
                              {p.fastMoving ? 'Yes' : 'No'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleToggleFeatured(p)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.featured
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-gray-100 text-gray-400'
                              }`}
                            >
                              {p.featured ? 'Yes' : 'No'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleToggleStatus(p)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                p.status === 'active'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {p.status}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <a
                              href={`/products/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-gray-500 hover:text-trinex-black inline-block"
                              title="View Live Product Page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-blue-600 hover:text-blue-800"
                              title="Edit Product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 text-trinex-red hover:text-red-800"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-500">
                          No products found. Click "+ Add Product" to add your first commercial item.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            3. CATEGORIES TAB
            ==================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-trinex-border shadow-xs">
              <div>
                <h3 className="text-sm font-bold text-trinex-black uppercase tracking-wider">
                  Equipment Categories ({categories.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Manage commercial segments displayed across homepage & catalogue.
                </p>
              </div>
              <button
                onClick={() => setCategoryModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-xl border border-trinex-border p-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="h-32 rounded-lg overflow-hidden bg-gray-100 mb-3 relative">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-trinex-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        /{cat.slug}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-trinex-black">{cat.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-3">
                    <span className="text-[11px] font-semibold text-gray-500">
                      {products.filter((p) => p.categorySlug === cat.slug).length} Products Assigned
                    </span>
                    <button
                      onClick={() => handleDeleteCategory(cat.id, cat.name)}
                      className="text-trinex-red hover:text-red-800 p-1 text-xs font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            4. SPARES TAB
            ==================================================== */}
        {activeTab === 'spares' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-trinex-border shadow-xs">
              <div>
                <h3 className="text-sm font-bold text-trinex-black uppercase tracking-wider">
                  Spare Parts Catalogue ({spares.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Manage replacement parts displayed on /spares.
                </p>
              </div>
              <button
                onClick={handleOpenAddSpare}
                className="px-4 py-2 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Spare Part</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {spares.map((spare) => (
                <div key={spare.id} className="bg-white rounded-xl border border-trinex-border p-4 flex flex-col justify-between shadow-xs space-y-3">
                  <div>
                    <div className="h-32 bg-trinex-light-gray rounded-lg p-2 flex items-center justify-center mb-2">
                      <img src={spare.image} alt={spare.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="text-[10px] font-bold text-trinex-red uppercase tracking-wider">
                      {spare.category}
                    </span>
                    <h4 className="font-bold text-sm text-trinex-black">{spare.name}</h4>
                    <p className="text-xs text-gray-500 font-mono">Part No: {spare.partNumber}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{spare.shortDescription}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">In Stock</span>
                    <button
                      onClick={() => handleDeleteSpare(spare.id, spare.name)}
                      className="text-xs font-bold text-trinex-red hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            5. ENQUIRIES TAB
            ==================================================== */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-xl border border-trinex-border p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-trinex-black uppercase tracking-wider">
              Product Quote Enquiries ({enquiries.length})
            </h3>
            {enquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 uppercase text-gray-600 font-bold text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Phone</th>
                      <th className="py-2.5 px-3">Company</th>
                      <th className="py-2.5 px-3">Product Context</th>
                      <th className="py-2.5 px-3">Message</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {enquiries.map((e) => (
                      <tr key={e.id}>
                        <td className="py-2.5 px-3 text-gray-400 whitespace-nowrap">
                          {new Date(e.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-trinex-black">{e.name}</td>
                        <td className="py-2.5 px-3">
                          <a href={`tel:${e.phone}`} className="text-trinex-red font-bold hover:underline">
                            {e.phone}
                          </a>
                        </td>
                        <td className="py-2.5 px-3 text-gray-600">{e.company || '—'}</td>
                        <td className="py-2.5 px-3 font-semibold text-gray-800">{e.productName || 'General'}</td>
                        <td className="py-2.5 px-3 text-gray-600 max-w-xs truncate">{e.message || '—'}</td>
                        <td className="py-2.5 px-3">
                          <select
                            value={e.status}
                            onChange={(evt) => enquiryStore.updateEnquiryStatus(e.id, evt.target.value as EnquiryStatus)}
                            className="bg-gray-100 font-bold text-[10px] rounded px-2 py-1 text-gray-800"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-gray-500 py-6 text-center">No quote enquiries registered yet.</p>
            )}
          </div>
        )}

        {/* ====================================================
            6. SERVICE REQUESTS TAB
            ==================================================== */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-xl border border-trinex-border p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-trinex-black uppercase tracking-wider">
              Technical Service Requests ({serviceRequests.length})
            </h3>
            {serviceRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 uppercase text-gray-600 font-bold text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Contact</th>
                      <th className="py-2.5 px-3">Mobile</th>
                      <th className="py-2.5 px-3">City</th>
                      <th className="py-2.5 px-3">Service Type</th>
                      <th className="py-2.5 px-3">Brand / Model</th>
                      <th className="py-2.5 px-3">Issue Details</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {serviceRequests.map((s) => (
                      <tr key={s.id}>
                        <td className="py-2.5 px-3 text-gray-400 whitespace-nowrap">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-trinex-black">{s.name}</td>
                        <td className="py-2.5 px-3">
                          <a href={`tel:${s.mobile}`} className="text-trinex-red font-bold hover:underline">
                            {s.mobile}
                          </a>
                        </td>
                        <td className="py-2.5 px-3 text-gray-600">{s.city}</td>
                        <td className="py-2.5 px-3 font-bold text-trinex-red">{s.serviceRequired}</td>
                        <td className="py-2.5 px-3 text-gray-800">{s.equipmentBrandModel || '—'}</td>
                        <td className="py-2.5 px-3 text-gray-600 max-w-xs truncate">{s.describeIssue || '—'}</td>
                        <td className="py-2.5 px-3">
                          <select
                            value={s.status}
                            onChange={(evt) => enquiryStore.updateServiceRequestStatus(s.id, evt.target.value as EnquiryStatus)}
                            className="bg-gray-100 font-bold text-[10px] rounded px-2 py-1 text-gray-800"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-gray-500 py-6 text-center">No service requests submitted yet.</p>
            )}
          </div>
        )}

        {/* ====================================================
            7. SPARE REQUESTS TAB
            ==================================================== */}
        {activeTab === 'spare_requests' && (
          <div className="bg-white rounded-xl border border-trinex-border p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-trinex-black uppercase tracking-wider">
              Spare Parts Requests ({spareRequests.length})
            </h3>
            {spareRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 uppercase text-gray-600 font-bold text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Contact</th>
                      <th className="py-2.5 px-3">Mobile</th>
                      <th className="py-2.5 px-3">Brand</th>
                      <th className="py-2.5 px-3">Spare Required</th>
                      <th className="py-2.5 px-3">Part No</th>
                      <th className="py-2.5 px-3">Details</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {spareRequests.map((sp) => (
                      <tr key={sp.id}>
                        <td className="py-2.5 px-3 text-gray-400 whitespace-nowrap">
                          {new Date(sp.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-trinex-black">{sp.name}</td>
                        <td className="py-2.5 px-3">
                          <a href={`tel:${sp.mobile}`} className="text-trinex-red font-bold hover:underline">
                            {sp.mobile}
                          </a>
                        </td>
                        <td className="py-2.5 px-3 text-gray-800">{sp.equipmentBrand}</td>
                        <td className="py-2.5 px-3 font-bold text-trinex-black">{sp.sparePartRequired}</td>
                        <td className="py-2.5 px-3 font-mono text-gray-600">{sp.partNumber || '—'}</td>
                        <td className="py-2.5 px-3 text-gray-500 max-w-xs truncate">{sp.additionalDetails || '—'}</td>
                        <td className="py-2.5 px-3">
                          <select
                            value={sp.status}
                            onChange={(evt) => enquiryStore.updateSpareRequestStatus(sp.id, evt.target.value as EnquiryStatus)}
                            className="bg-gray-100 font-bold text-[10px] rounded px-2 py-1 text-gray-800"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-gray-500 py-6 text-center">No spare parts requests yet.</p>
            )}
          </div>
        )}

        {/* ====================================================
            8. SETTINGS & SUPABASE TAB
            ==================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-trinex-border p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-trinex-black uppercase tracking-wider">
                Database & Persistence Status
              </h3>
              
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-trinex-black block">Active Persistent Storage</span>
                  <span className="text-xs text-gray-600">Local Browser Store + Supabase Bridge Ready</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
                  {isSupabaseConfigured ? 'Connected to Remote Supabase' : 'Persistent Local Store Active'}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700 block">Supabase SQL Schema (One-Click Setup)</span>
                <p className="text-xs text-gray-500">
                  When you are ready to connect remote Supabase, paste this SQL script in your Supabase SQL Editor:
                </p>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs font-mono max-h-56 overflow-y-auto">
                    {SUPABASE_SQL_SCHEMA}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                      setCopiedSchema(true);
                      setTimeout(() => setCopiedSchema(false), 2000);
                    }}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSchema ? 'Copied!' : 'Copy SQL Script'}</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    if (window.confirm('Reset catalog back to initial single demo product? Any added products will be replaced.')) {
                      productStore.resetToDefault();
                      showNotification('Reset to default single demo product completed.');
                    }
                  }}
                  className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold"
                >
                  Reset To Single Demo Product
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ====================================================
          PRODUCT MODAL (ADD / EDIT)
          ==================================================== */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-trinex-border overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-trinex-black px-6 py-4 flex items-center justify-between text-white flex-shrink-0">
              <div>
                <span className="text-[10px] font-bold text-trinex-red uppercase tracking-wider block">
                  Product Management
                </span>
                <h3 className="text-lg font-bold">
                  {editingProductId ? `Edit Product: ${productForm.name}` : '+ Add New Product'}
                </h3>
              </div>
              <button
                onClick={() => setProductModalOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Form */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto flex-1 space-y-6 text-left">
              
              {/* Basic Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1">
                  1. Basic Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Product Name <span className="text-trinex-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setProductForm((prev) => ({
                          ...prev,
                          name,
                          slug: prev.slug || slugify(`${name} ${prev.model}`),
                        }));
                      }}
                      placeholder="e.g. Commercial Induction Cooktop"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Model / Specification Name
                    </label>
                    <input
                      type="text"
                      value={productForm.model}
                      onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                      placeholder="e.g. 3.5 kW Flat Model"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Category <span className="text-trinex-red">*</span>
                    </label>
                    <select
                      value={productForm.categorySlug}
                      onChange={(e) => {
                        const slug = e.target.value;
                        const cat = categories.find((c) => c.slug === slug);
                        setProductForm({
                          ...productForm,
                          categorySlug: slug,
                          category: cat ? cat.name : slug,
                        });
                      }}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      SEO URL Slug
                    </label>
                    <input
                      type="text"
                      value={productForm.slug}
                      onChange={(e) => setProductForm({ ...productForm, slug: slugify(e.target.value) })}
                      placeholder="auto-generated-slug"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 font-mono text-gray-600 focus:outline-none focus:border-trinex-red"
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1">
                  2. Product Descriptions
                </h4>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Short Description (Shown on cards & preview)
                  </label>
                  <textarea
                    rows={2}
                    value={productForm.shortDescription}
                    onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                    placeholder="Brief 1-2 sentence overview of the equipment..."
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Description (Shown on dedicated product page)
                  </label>
                  <textarea
                    rows={4}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Comprehensive product writeup, engineering details, material specs..."
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">
                    3. Product Images (Multiple Images Supported)
                  </h4>
                  <label className="cursor-pointer text-xs font-bold text-trinex-red hover:underline flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Local File</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {productForm.images.map((img, idx) => (
                    <div key={idx} className="relative group border border-gray-200 rounded-lg p-2 bg-gray-50 flex flex-col items-center">
                      <img src={img} alt="Product view" className="h-20 w-auto object-contain mb-1" />
                      <span className="text-[10px] text-gray-400">Image {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setProductForm({
                            ...productForm,
                            images: productForm.images.filter((_, i) => i !== idx),
                          });
                        }}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Quick Add from Available Catalog Images */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-gray-500 block mb-1">
                    Quick Pick from Local Assets:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {AVAILABLE_SAMPLE_IMAGES.slice(0, 10).map((sample, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          if (!productForm.images.includes(sample)) {
                            setProductForm({
                              ...productForm,
                              images: [...productForm.images, sample],
                            });
                          }
                        }}
                        className="w-14 h-14 rounded border border-gray-300 p-1 flex-shrink-0 bg-white hover:border-trinex-red"
                        title="Click to add to product images"
                      >
                        <img src={sample} alt="Sample" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1">
                  4. Core Technical Specifications
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Power</label>
                    <input
                      type="text"
                      value={productForm.power}
                      onChange={(e) => setProductForm({ ...productForm, power: e.target.value })}
                      placeholder="e.g. 3.5 kW"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Cooking Type</label>
                    <input
                      type="text"
                      value={productForm.cookingType}
                      onChange={(e) => setProductForm({ ...productForm, cookingType: e.target.value })}
                      placeholder="e.g. Induction"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Cooking Surface</label>
                    <input
                      type="text"
                      value={productForm.cookingSurface}
                      onChange={(e) => setProductForm({ ...productForm, cookingSurface: e.target.value })}
                      placeholder="e.g. Flat Glass"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Installation</label>
                    <input
                      type="text"
                      value={productForm.installation}
                      onChange={(e) => setProductForm({ ...productForm, installation: e.target.value })}
                      placeholder="e.g. Countertop"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Warranty</label>
                    <input
                      type="text"
                      value={productForm.warranty}
                      onChange={(e) => setProductForm({ ...productForm, warranty: e.target.value })}
                      placeholder="e.g. 1 Year"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Voltage</label>
                    <input
                      type="text"
                      value={productForm.voltage}
                      onChange={(e) => setProductForm({ ...productForm, voltage: e.target.value })}
                      placeholder="220V - 240V"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Dimensions</label>
                    <input
                      type="text"
                      value={productForm.dimensions}
                      onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                      placeholder="e.g. 350 x 420 x 100 mm"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Body Material</label>
                    <input
                      type="text"
                      value={productForm.material}
                      onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                      placeholder="e.g. Stainless Steel"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300"
                    />
                  </div>
                </div>

                {/* Custom Specification Rows */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700">Custom Specification Rows</span>
                    <button
                      type="button"
                      onClick={() => {
                        setProductForm({
                          ...productForm,
                          specifications: [...productForm.specifications, { label: '', value: '' }],
                        });
                      }}
                      className="text-xs font-bold text-trinex-red hover:underline"
                    >
                      + Add Custom Spec
                    </button>
                  </div>

                  {productForm.specifications.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Spec Name (e.g. Body Material)"
                        value={spec.label}
                        onChange={(e) => {
                          const updated = [...productForm.specifications];
                          updated[i].label = e.target.value;
                          setProductForm({ ...productForm, specifications: updated });
                        }}
                        className="flex-1 px-2.5 py-1.5 text-xs rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. Stainless Steel)"
                        value={spec.value}
                        onChange={(e) => {
                          const updated = [...productForm.specifications];
                          updated[i].value = e.target.value;
                          setProductForm({ ...productForm, specifications: updated });
                        }}
                        className="flex-1 px-2.5 py-1.5 text-xs rounded border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setProductForm({
                            ...productForm,
                            specifications: productForm.specifications.filter((_, idx) => idx !== i),
                          });
                        }}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">
                    5. Key Features Highlights
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setProductForm({
                        ...productForm,
                        features: [...productForm.features, ''],
                      });
                    }}
                    className="text-xs font-bold text-trinex-red hover:underline"
                  >
                    + Add Feature
                  </button>
                </div>

                {productForm.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Feature bullet point..."
                      value={feat}
                      onChange={(e) => {
                        const updated = [...productForm.features];
                        updated[i] = e.target.value;
                        setProductForm({ ...productForm, features: updated });
                      }}
                      className="flex-1 px-3 py-2 text-xs rounded border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProductForm({
                          ...productForm,
                          features: productForm.features.filter((_, idx) => idx !== i),
                        });
                      }}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Ideal For Checkboxes */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1">
                  6. Ideal For Commercial Applications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {IDEAL_FOR_OPTIONS.map((item) => {
                    const isChecked = productForm.idealFor.includes(item);
                    return (
                      <label key={item} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProductForm({ ...productForm, idealFor: [...productForm.idealFor, item] });
                            } else {
                              setProductForm({ ...productForm, idealFor: productForm.idealFor.filter((x) => x !== item) });
                            }
                          }}
                          className="rounded text-trinex-red focus:ring-trinex-red"
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Toggles: Featured, Fast Moving, Status */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-xs font-bold text-trinex-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.fastMoving}
                    onChange={(e) => setProductForm({ ...productForm, fastMoving: e.target.checked })}
                    className="w-4 h-4 rounded text-trinex-red focus:ring-trinex-red"
                  />
                  <span>Mark as Fast Moving (Display on Hero)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-trinex-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-trinex-red focus:ring-trinex-red"
                  />
                  <span>Mark as Featured Equipment</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-trinex-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.status === 'active'}
                    onChange={(e) => setProductForm({ ...productForm, status: e.target.checked ? 'active' : 'draft' })}
                    className="w-4 h-4 rounded text-trinex-red focus:ring-trinex-red"
                  />
                  <span>Publish Active to Website</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Save & Publish Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ====================================================
          CATEGORY MODAL
          ==================================================== */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-trinex-border p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-bold text-base text-trinex-black">+ Add Category</h3>
              <button onClick={() => setCategoryModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. Commercial Induction"
                  className="w-full px-3 py-2 text-xs rounded border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category Description</label>
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Summary of equipment in this category..."
                  className="w-full px-3 py-2 text-xs rounded border border-gray-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Banner Image Path</label>
                <input
                  type="text"
                  value={categoryForm.image}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  placeholder="/assets/images/category_induction.jpg"
                  className="w-full px-3 py-2 text-xs rounded border border-gray-300 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-bold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-trinex-red text-white text-xs font-bold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================
          SPARE PART MODAL
          ==================================================== */}
      {spareModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-trinex-border p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-bold text-base text-trinex-black">
                {editingSpareId ? 'Edit Spare Part' : '+ Add Spare Part'}
              </h3>
              <button onClick={() => setSpareModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSaveSpare} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Spare Part Name *</label>
                <input
                  type="text"
                  required
                  value={spareForm.name}
                  onChange={(e) => setSpareForm({ ...spareForm, name: e.target.value })}
                  placeholder="e.g. Induction Ceramic Glass Plate"
                  className="w-full px-3 py-2 text-xs rounded border border-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Part Number</label>
                  <input
                    type="text"
                    value={spareForm.partNumber}
                    onChange={(e) => setSpareForm({ ...spareForm, partNumber: e.target.value })}
                    placeholder="TRX-IND-GLS-35"
                    className="w-full px-3 py-2 text-xs rounded border border-gray-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={spareForm.category}
                    onChange={(e) => setSpareForm({ ...spareForm, category: e.target.value })}
                    placeholder="Commercial Induction"
                    className="w-full px-3 py-2 text-xs rounded border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Compatible Equipment</label>
                <input
                  type="text"
                  value={spareForm.compatibleEquipment}
                  onChange={(e) => setSpareForm({ ...spareForm, compatibleEquipment: e.target.value })}
                  placeholder="Trinex 3.5kW and 5kW Flat Models"
                  className="w-full px-3 py-2 text-xs rounded border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={spareForm.shortDescription}
                  onChange={(e) => setSpareForm({ ...spareForm, shortDescription: e.target.value })}
                  placeholder="Thermal shock resistant microcrystalline glass..."
                  className="w-full px-3 py-2 text-xs rounded border border-gray-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Image Path</label>
                <input
                  type="text"
                  value={spareForm.image}
                  onChange={(e) => setSpareForm({ ...spareForm, image: e.target.value })}
                  placeholder="/assets/images/countertop_induction_hob.png"
                  className="w-full px-3 py-2 text-xs rounded border border-gray-300 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSpareModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-bold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-trinex-red text-white text-xs font-bold"
                >
                  Save Spare Part
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
