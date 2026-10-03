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
import { sliderStore } from '../services/sliderStore';
import { Product, Category, HeroSlide } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { ImageSlider } from '../components/ImageSlider';

interface HomeProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenQuoteModal }) => {
  const [fastMovingProducts, setFastMovingProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [slides, setSlides] = useState<HeroSlide[]>([]);

  useEffect(() => {
    const updateData = () => {
      setFastMovingProducts(productStore.getFastMovingProducts().slice(0, 4));
      setFeaturedProducts(productStore.getFeaturedProducts().slice(0, 6));
      setCategories(productStore.getCategories());
      setSlides(sliderStore.getSlides());
    };

    updateData();
    const unsubProd = productStore.subscribe(updateData);
    const unsubSlider = sliderStore.subscribe(updateData);
    return () => {
      unsubProd();
      unsubSlider();
    };
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
    <div className="space-y-8 sm:space-y-12 lg:space-y-14 bg-white">
      
      {/* ==================================================
          1. HERO SECTION:
             - MOBILE VIEW: Direct Image Slider ONLY (NO TEXT MATTER)
             - DESKTOP VIEW: Left Matter + Right Image Slider Showcase
          ================================================== */}
      <section className="relative bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200/80 overflow-hidden lg:min-h-[calc(100vh-125px)] lg:flex lg:flex-col lg:justify-center">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-slate-900/5 rounded-full blur-3xl pointer-events-none" />

        {/* 1A. MOBILE VIEW ONLY: Direct Image Slider (NO TEXT MATTER) */}
        <div className="block lg:hidden px-3 pt-2 pb-4 relative z-10 space-y-2.5">
          <div className="w-full">
            <ImageSlider
              slides={slides}
              className="w-full aspect-[16/10] sm:aspect-[16/9] min-h-[200px]"
            />
          </div>

          {/* Quick Mobile Action Bar */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/products"
              className="py-2.5 px-3 rounded-lg bg-slate-900 text-white font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleHeroWhatsApp}
              className="py-2.5 px-3 rounded-lg bg-emerald-600 text-white font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Quote</span>
            </button>
          </div>
        </div>

        {/* 1B. DESKTOP / WEBSITE VIEW: Fills Viewport Height Cleanly With Elegant Spacing */}
        <div className="hidden lg:block w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Subheading, CTAs & Value Strip */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              
              {/* Badge */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-trinex-red animate-pulse" />
                  <span className="text-[11px] font-black tracking-widest text-slate-800 uppercase">
                    SALES • SERVICE • SPARES
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-900 uppercase tracking-tight leading-[1.12] font-display mb-4">
                Professional <br />
                <span className="text-trinex-red">Kitchen Equipment</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal mb-7">
                Reliable commercial kitchen solutions backed by Sales, Service & Spares. Delivering high-efficiency induction systems, heavy-duty cooking ranges, and commercial food machinery across Hyderabad and regional kitchens.
              </p>

              {/* Harmonious CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-7">
                <Link
                  to="/products"
                  className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center gap-2 group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={handleHeroWhatsApp}
                  className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Get Quote on WhatsApp</span>
                </button>
              </div>

              {/* Integrated Feature Bar */}
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="flex items-center gap-2.5 px-1 py-0.5">
                    <Zap className="w-4 h-4 text-trinex-red flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900 leading-tight">Fast Heating</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">Thermal response</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 px-1 py-0.5">
                    <Leaf className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900 leading-tight">Energy Efficient</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">&gt;90% transfer</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 px-1 py-0.5">
                    <ShieldCheck className="w-4 h-4 text-trinex-gold flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900 leading-tight">Heavy Duty</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">Commercial grade</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 px-1 py-0.5">
                    <Wrench className="w-4 h-4 text-trinex-red flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900 leading-tight">Service Backed</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">Hyderabad hub</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase with Interactive ImageSlider */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-card p-3 sm:p-3.5 group">
                <ImageSlider
                  slides={slides}
                  className="w-full aspect-[16/10] sm:aspect-[16/9] min-h-[280px]"
                />
                <div className="pt-3 px-1.5 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                    High Efficiency • Commercial Kitchen Equipment
                  </span>
                  <Link to="/products" className="font-bold text-trinex-red hover:underline flex items-center gap-1 text-[11px] sm:text-xs">
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2 sm:pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
                High Demand
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Fast-Moving Commercial Equipment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Popular commercial kitchen machines ready for immediate delivery and installation.
              </p>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1 self-start sm:self-auto flex-shrink-0"
            >
              <span>Explore All Equipment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fastMovingProducts.map((product) => (
              <ProductCard key={product.id} product={product} onOpenQuoteModal={onOpenQuoteModal} />
            ))}
          </div>
        </section>
      )}

      {/* ==================================================
          3. PRODUCT CATEGORIES (MANAGEABLE VIA ADMIN)
          ================================================== */}
      <section className="bg-slate-50/80 py-14 sm:py-18 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
                Equipment Categories
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Commercial Kitchen Equipment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Complete equipment solutions structured for modern commercial kitchens.
              </p>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1 self-start sm:self-auto flex-shrink-0"
            >
              <span>Explore All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between h-full"
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
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed min-h-[34px]">
                      {cat.description || 'Heavy-duty commercial kitchen equipment.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 mt-auto flex items-center justify-between text-xs font-bold text-trinex-red group-hover:underline border-t border-slate-50">
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Recommended For Commercial Kitchens
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Precision-engineered kitchen machinery trusted by restaurants, hotels, and cloud kitchens.
              </p>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1 self-start sm:self-auto flex-shrink-0"
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
              <span className="text-xs font-black uppercase tracking-widest text-trinex-gold block mb-1">
                Next-Gen Kitchen Technology
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
              The Trinex Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
              Why Commercial Kitchens Trust Trinex
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Backed by over 15 years of technical industry experience servicing commercial food establishments.
            </p>
          </div>
          <Link
            to="/about"
            className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1 self-start sm:self-auto flex-shrink-0"
          >
            <span>Learn More About Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-card transition-shadow flex flex-col justify-between h-full space-y-3">
            <div>
              <ShieldCheck className="w-8 h-8 text-trinex-red mb-3" />
              <h3 className="text-base font-bold text-slate-900">Commercial Durability</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Constructed from heavy-duty AISI food-grade stainless steel and industrial components designed for demanding kitchen use.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-card transition-shadow flex flex-col justify-between h-full space-y-3">
            <div>
              <Zap className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="text-base font-bold text-slate-900">High Efficiency</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Instant heating response with advanced power modulation, minimizing energy waste and optimizing preparation speed.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-card transition-shadow flex flex-col justify-between h-full space-y-3">
            <div>
              <Wrench className="w-8 h-8 text-trinex-red mb-3" />
              <h3 className="text-base font-bold text-slate-900">Technical Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Experienced technical engineers delivering prompt installation, maintenance, and emergency breakdown support.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-card transition-shadow flex flex-col justify-between h-full space-y-3">
            <div>
              <PackageCheck className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="text-base font-bold text-slate-900">Genuine Spares</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Ready stock of critical spare parts for both domestic and imported commercial kitchen equipment to prevent downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. SALES • SERVICE • SPARES PILLARS SECTION
          ================================================== */}
      <section className="bg-slate-50/80 py-14 sm:py-18 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
                Core Pillars
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Sales • Service • Spares
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                End-to-end commercial kitchen solutions from equipment purchase to long-term lifecycle support.
              </p>
            </div>
            <Link
              to="/services"
              className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1 self-start sm:self-auto flex-shrink-0"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sales Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between h-full hover:shadow-card transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-red-50 text-trinex-red flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Equipment Sales</h3>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[44px]">
                  Consultation and supply of commercial induction, heavy cooking ranges, refrigeration, and food preparation machinery.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-4">
                <a href="tel:9030847474" className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Sales Helpline: 9030847474</span>
                </a>
              </div>
            </div>

            {/* Service Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between h-full hover:shadow-card transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-slate-800 flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-trinex-navy" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Technical Service</h3>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[44px]">
                  15+ years experience servicing Indian and imported commercial kitchen equipment with prompt on-site repairs.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-4">
                <Link to="/services" className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1">
                  <span>Service Request Form &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Spares Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between h-full hover:shadow-card transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <PackageCheck className="w-6 h-6 text-trinex-gold" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Genuine Spares</h3>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[44px]">
                  Procurement and supply of critical replacement parts, induction coils, glass plates, thermostat controls, and elements.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-4">
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
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
              Commercial Kitchen Support
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Experiencing Equipment Breakdowns or Need Spares?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Our service engineering team covers Telangana, Andhra Pradesh, and the Bengaluru region. Contact our technical helpline for immediate assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
            <Link
              to="/services"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors"
            >
              Request Service
            </Link>
            <Link
              to="/spares"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider text-center transition-colors"
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
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
              Ameerpet Showroom
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
              Ready to Upgrade Your Commercial Kitchen?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Visit our Ameerpet showroom to inspect equipment or speak directly with our commercial specialists.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:9030847474"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
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
