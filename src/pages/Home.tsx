import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Wrench, 
  PackageCheck, 
  Zap, 
  Leaf, 
  Award, 
  Thermometer, 
  CheckCircle2, 
  Phone,
  Flame,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { productStore } from '../services/productStore';
import { Product, Category } from '../types/product';
import { ProductCard } from '../components/ProductCard';

interface HomeProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenQuoteModal }) => {
  const [fastMovingProducts, setFastMovingProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const updateData = () => {
      setFastMovingProducts(productStore.getFastMovingProducts().slice(0, 4));
      setFeaturedProducts(productStore.getFeaturedProducts().slice(0, 6));
      setCategories(productStore.getCategories());
    };

    updateData();
    const unsubscribe = productStore.subscribe(updateData);
    return () => unsubscribe();
  }, []);

  const handleHeroWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Trinex Equipment, I am looking for commercial kitchen equipment for my food business. Please share catalogues and pricing.'
    );
    window.open(`https://wa.me/919030847474?text=${text}`, '_blank');
  };

  const handleFastMovingWhatsApp = (product: Product) => {
    const text = encodeURIComponent(
      `Hello Trinex Equipment,\nI am interested in:\nProduct: ${product.name}\nModel: ${product.model}\n\nPlease share the price and availability.`
    );
    window.open(`https://wa.me/919030847474?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-14 sm:space-y-20 bg-white">
      
      {/* ==================================================
          1. HERO SECTION (PRODUCT-FIRST, PRESTIGIOUS B2B)
          ================================================== */}
      <section className="relative bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200/80 py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-slate-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-trinex-red animate-pulse" />
                <span className="text-[11px] font-black tracking-widest text-slate-800 uppercase">
                  SALES • SERVICE • SPARES
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-slate-900 uppercase tracking-tight leading-[1.08] font-display">
                Professional <br />
                <span className="text-trinex-red">Kitchen Equipment</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                Reliable commercial kitchen solutions backed by Sales, Service & Spares. Delivering high-efficiency induction systems, heavy-duty cooking ranges, and commercial food machinery across Hyderabad and regional kitchens.
              </p>

              {/* Harmonious CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/products"
                  className="px-7 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center gap-2 group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={handleHeroWhatsApp}
                  className="px-7 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Get Quote on WhatsApp</span>
                </button>
              </div>

              {/* Integrated Feature Bar */}
              <div className="pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="flex items-center gap-2 px-1">
                    <Zap className="w-4 h-4 text-trinex-red flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900">Fast Heating</span>
                      <span className="block text-[10px] text-slate-500">Thermal response</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <Leaf className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900">Energy Efficient</span>
                      <span className="block text-[10px] text-slate-500">&gt;90% transfer</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <ShieldCheck className="w-4 h-4 text-trinex-gold flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900">Heavy Duty</span>
                      <span className="block text-[10px] text-slate-500">Commercial grade</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <Wrench className="w-4 h-4 text-trinex-red flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900">Service Backed</span>
                      <span className="block text-[10px] text-slate-500">Hyderabad hub</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-card p-3 sm:p-4 group">
                <div className="relative rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-3 border border-slate-100">
                  <img
                    src="/assets/images/trinex_induction_banner.jpg"
                    alt="Trinex Commercial Induction Equipment Showcase"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                    Commercial Induction Range
                  </div>
                </div>

                <div className="pt-3 px-1 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    High Efficiency • Flame-Free Precision
                  </span>
                  <Link to="/products" className="font-bold text-trinex-red hover:underline flex items-center gap-1">
                    <span>View Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. FAST-MOVING PRODUCTS (DYNAMIC 2-4 PRODUCTS)
          ================================================== */}
      {fastMovingProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
                High Demand
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                Fast-Moving Commercial Equipment
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore All Equipment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fastMovingProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between p-4 group"
              >
                <div>
                  <Link 
                    to={`/products/${product.slug}`}
                    className="block w-full pt-[75%] relative bg-slate-50 rounded-lg overflow-hidden mb-3 border border-slate-100"
                  >
                    <img
                      src={product.images[0] || '/assets/images/countertop_induction_hob.png'}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-trinex-red text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                      Fast Moving
                    </span>
                  </Link>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-trinex-red uppercase tracking-wider">
                      {product.category}
                    </span>
                    <Link to={`/products/${product.slug}`} className="block">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-trinex-red transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    {product.model && (
                      <p className="text-xs text-slate-500 font-medium">
                        Model: <span className="text-slate-900 font-semibold">{product.model}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => handleFastMovingWhatsApp(product)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Get Quote on WhatsApp</span>
                  </button>

                  <Link
                    to={`/products/${product.slug}`}
                    className="w-full flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================================================
          3. PRODUCT CATEGORIES (MANAGEABLE VIA ADMIN)
          ================================================== */}
      <section className="bg-slate-50/80 py-14 sm:py-18 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
              Equipment Categories
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              Commercial Kitchen Equipment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Complete equipment solutions structured for modern commercial kitchens.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-44 bg-slate-100 overflow-hidden relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 text-white text-xs font-bold uppercase tracking-wider">
                      {cat.name}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-xs font-bold text-trinex-red group-hover:underline">
                  <span>Browse Products</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          4. FEATURED PRODUCTS
          ================================================== */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
                Featured Equipment
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                Recommended For Commercial Kitchens
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onOpenQuoteModal={onOpenQuoteModal} />
            ))}
          </div>
        </section>
      )}

      {/* ==================================================
          5. INTRODUCING TRINEX COMMERCIAL INDUCTION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 overflow-hidden relative shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-trinex-gold uppercase tracking-widest block">
                Next-Gen Kitchen Technology
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Introducing Trinex Commercial Induction Equipment
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Engineered for maximum reliability, durability, and energy efficiency. Trinex commercial induction cooktops deliver fast heating, significantly lower ambient heat generation, and simple intuitive operation for high-volume commercial kitchens.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                  <Zap className="w-4 h-4 text-trinex-gold mb-1" />
                  <span className="font-bold block text-white">Fast Heating</span>
                  <span className="text-[10px] text-slate-400">Instant heat delivery</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                  <Leaf className="w-4 h-4 text-emerald-400 mb-1" />
                  <span className="font-bold block text-white">Energy Efficient</span>
                  <span className="text-[10px] text-slate-400">Direct magnetic transfer</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                  <Thermometer className="w-4 h-4 text-amber-400 mb-1" />
                  <span className="font-bold block text-white">Lower Ambient Heat</span>
                  <span className="text-[10px] text-slate-400">Cooler kitchen comfort</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/products?category=commercial-induction"
                  className="px-6 py-3 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Induction Range</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleHeroWhatsApp}
                  className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden bg-white p-4 shadow-lg border border-slate-700/60">
                <img
                  src="/assets/images/countertop_induction_hob.png"
                  alt="Trinex Commercial Induction Cooktop"
                  className="w-full h-auto object-contain max-h-[300px] mx-auto"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          6. WHY TRINEX (QUALITY • RELIABILITY • PERFORMANCE)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
            The Trinex Commitment
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            Why Commercial Kitchens Trust Trinex
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Backed by over 15 years of technical industry experience servicing commercial food establishments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-card transition-shadow space-y-3">
            <ShieldCheck className="w-8 h-8 text-trinex-red" />
            <h3 className="text-base font-bold text-slate-900">Commercial Durability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Constructed from heavy-duty AISI food-grade stainless steel and industrial components designed for demanding kitchen use.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-card transition-shadow space-y-3">
            <Zap className="w-8 h-8 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">High Efficiency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant heating response with advanced power modulation, minimizing energy waste and optimizing preparation speed.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-card transition-shadow space-y-3">
            <Wrench className="w-8 h-8 text-trinex-red" />
            <h3 className="text-base font-bold text-slate-900">Technical Service</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Experienced technical engineers delivering prompt installation, maintenance, and emergency breakdown support.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-card transition-shadow space-y-3">
            <PackageCheck className="w-8 h-8 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Genuine Spares</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ready stock of critical spare parts for both domestic and imported commercial kitchen equipment to prevent downtime.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors"
          >
            <span>Learn More About Trinex</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ==================================================
          7. SALES • SERVICE • SPARES PILLARS SECTION
          ================================================== */}
      <section className="bg-slate-50/80 py-14 sm:py-18 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
              Core Pillars
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              Sales • Service • Spares
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              End-to-end commercial kitchen solutions from equipment purchase to long-term lifecycle support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sales Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-red-50 text-trinex-red flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Equipment Sales</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consultation and supply of commercial induction, heavy cooking ranges, refrigeration, and food preparation machinery.
              </p>
              <div className="pt-2">
                <a href="tel:9030847474" className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Sales Helpline: 9030847474</span>
                </a>
              </div>
            </div>

            {/* Service Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-slate-800 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-trinex-navy" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Technical Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                15+ years experience servicing Indian and imported commercial kitchen equipment with prompt on-site repairs.
              </p>
              <div className="pt-2">
                <Link to="/services" className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1">
                  <span>Service Request Form &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Spares Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <PackageCheck className="w-6 h-6 text-trinex-gold" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Genuine Spares</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Procurement and supply of critical replacement parts, induction coils, glass plates, thermostat controls, and elements.
              </p>
              <div className="pt-2">
                <Link to="/spares" className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1">
                  <span>Browse Spare Parts &rarr;</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          8. SERVICE / SPARES CTA
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-trinex-red uppercase tracking-wider block">
              Commercial Kitchen Support
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Experiencing Equipment Breakdowns or Need Spares?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Our service engineering team covers Telangana, Andhra Pradesh, and the Bengaluru region. Contact our technical helpline for immediate assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/services"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider text-center"
            >
              Request Service
            </Link>
            <Link
              to="/spares"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider text-center"
            >
              Request Spare Part
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. CONTACT / QUOTE CTA
          ================================================== */}
      <section className="bg-slate-50/80 py-14 sm:py-18 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
              Ameerpet Showroom
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              Ready to Upgrade Your Commercial Kitchen?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Visit our Ameerpet showroom to inspect equipment or speak directly with our commercial specialists.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:9030847474"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-trinex-red" />
              <span>Call Sales: 9030847474</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              Request Online Quote
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
