import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { ServiceCard } from '../components/ServiceCard';
import { GoogleMap } from '../components/GoogleMap';
import { PRODUCT_CATEGORIES, FEATURED_PRODUCTS } from '../data/equipmentData';
import { 
  ShieldCheck, 
  Wrench, 
  PackageCheck, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  Thermometer, 
  Leaf, 
  Award
} from 'lucide-react';

interface HomeProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredProducts = activeTab === 'all' 
    ? FEATURED_PRODUCTS 
    : FEATURED_PRODUCTS.filter(p => p.categorySlug === activeTab);

  return (
    <div className="space-y-12 sm:space-y-20 lg:space-y-24">
      
      {/* ==================================================
          1. HERO SECTION WITH OFFICIAL TRINEX BANNER
          ================================================== */}
      <section className="relative pt-6 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24 bg-trinex-dark border-b border-trinex-gold/20 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-trinex-navy/40 pointer-events-none rounded-l-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xs bg-trinex-navy border border-trinex-gold/40 text-trinex-gold font-extrabold text-[10px] sm:text-xs tracking-widest uppercase shadow">
                <span className="w-2 h-2 rounded-full bg-trinex-gold animate-ping" />
                <span>SALES • SERVICE • SPARES</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.1] font-display">
                ENGINEERING <br />
                <span className="gold-gradient-text">BETTER COMMERCIAL</span> <br />
                KITCHENS
              </h1>

              <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                Professional kitchen equipment solutions backed by quality, reliability and dependable service. Supplying high-efficiency induction equipment, heavy-duty ranges, and commercial machinery across Hyderabad & Telangana.
              </p>

              {/* Induction Highlights Badges */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] sm:text-xs font-bold text-slate-200">
                <div className="flex items-center gap-2 bg-trinex-navy p-2 sm:p-2.5 rounded border border-trinex-gold/20">
                  <Zap className="w-4 h-4 text-trinex-gold flex-shrink-0" />
                  <span>Fast Heating</span>
                </div>
                <div className="flex items-center gap-2 bg-trinex-navy p-2 sm:p-2.5 rounded border border-trinex-gold/20">
                  <Leaf className="w-4 h-4 text-trinex-gold flex-shrink-0" />
                  <span>Energy Efficient</span>
                </div>
                <div className="flex items-center gap-2 bg-trinex-navy p-2 sm:p-2.5 rounded border border-trinex-gold/20">
                  <ShieldCheck className="w-4 h-4 text-trinex-gold flex-shrink-0" />
                  <span>Safe & Reliable</span>
                </div>
                <div className="flex items-center gap-2 bg-trinex-navy p-2 sm:p-2.5 rounded border border-trinex-gold/20">
                  <Thermometer className="w-4 h-4 text-trinex-gold flex-shrink-0" />
                  <span>Precise Temperature</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  to="/products"
                  className="gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark font-extrabold text-xs sm:text-sm px-6 py-3.5 sm:px-7 sm:py-4 rounded-xs uppercase tracking-widest shadow-gold-glow transition-all text-center flex items-center justify-center gap-2 group"
                >
                  <span>Explore Equipment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => onOpenQuoteModal()}
                  className="bg-trinex-navy hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 sm:px-7 sm:py-4 rounded-xs uppercase tracking-widest border border-trinex-gold/40 hover:border-trinex-gold transition-all text-center flex items-center justify-center gap-2 shadow"
                >
                  <span>Get a Quote</span>
                </button>
              </div>

            </div>

            {/* Right Column: Official Trinex Equipment Banner Display */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-sm overflow-hidden border-2 border-trinex-gold/40 shadow-card-dark bg-white group relative">
                <img
                  src="/assets/images/trinex_induction_banner.jpg"
                  alt="Trinex Commercial Induction Equipment Showcase"
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-102"
                />
                <div className="bg-trinex-navy px-3 py-2.5 sm:px-4 sm:py-3 border-t border-trinex-gold/30 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-bold text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SMART COOKING • BETTER BUSINESS</span>
                  </div>
                  <span className="text-trinex-gold uppercase tracking-wider">CE • GS • RoHS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. OFFICIAL BRANDING & VALUE PROPOSITION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-trinex-navy border-2 border-trinex-gold/30 rounded-sm p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
              <span className="px-3 py-1 rounded bg-trinex-dark border border-trinex-gold/30 text-trinex-gold text-[10px] sm:text-xs font-bold uppercase tracking-widest inline-block">
                Professional B2B Equipment
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white font-display">
                Cook Smarter with Trinex!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Trinex Equipment Pvt Ltd supplies commercial induction hobs, wok ranges, stock pot stoves, holding cabinets, and custom stainless steel kitchen infrastructure for high-demand commercial environments.
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                <div className="bg-trinex-dark p-2.5 sm:p-3 rounded border border-slate-800 text-center">
                  <span className="text-base sm:text-lg font-black text-trinex-gold block">Fast</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Heating Speed</span>
                </div>
                <div className="bg-trinex-dark p-2.5 sm:p-3 rounded border border-slate-800 text-center">
                  <span className="text-base sm:text-lg font-black text-trinex-gold block">Energy</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Efficient System</span>
                </div>
                <div className="bg-trinex-dark p-2.5 sm:p-3 rounded border border-slate-800 text-center">
                  <span className="text-base sm:text-lg font-black text-trinex-gold block">Precise</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Temp Regulation</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded border border-trinex-gold/30 overflow-hidden shadow">
                <img 
                  src="/assets/logo/trinex_card_banner.jpg" 
                  alt="Trinex Official Equipment & Showroom Card" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ==================================================
          3. TRUST / VALUE SECTION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Core Brand Pillars"
          title="Built for Professional Kitchens"
          subtitle="Engineered to meet the rigorous operational standards of high-volume food service environments."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
          
          <div className="bg-trinex-navy border border-trinex-gold/20 hover:border-trinex-gold p-5 sm:p-6 rounded-sm space-y-3 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-trinex-dark border border-trinex-gold/30 flex items-center justify-center text-trinex-gold">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white uppercase font-display">QUALITY</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reliable equipment designed for demanding commercial environments using food-grade materials.
            </p>
          </div>

          <div className="bg-trinex-navy border border-trinex-gold/20 hover:border-trinex-gold p-5 sm:p-6 rounded-sm space-y-3 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-trinex-dark border border-trinex-gold/30 flex items-center justify-center text-trinex-gold">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white uppercase font-display">RELIABILITY</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Solutions focused on consistent performance, heavy-duty durability, and long-term business use.
            </p>
          </div>

          <div className="bg-trinex-navy border border-trinex-gold/20 hover:border-trinex-gold p-5 sm:p-6 rounded-sm space-y-3 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-trinex-dark border border-trinex-gold/30 flex items-center justify-center text-trinex-gold">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white uppercase font-display">PERFORMANCE</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Equipment selected to support efficient, rapid, high-volume professional kitchen operations.
            </p>
          </div>

          <div className="bg-trinex-navy border border-trinex-gold/20 hover:border-trinex-gold p-5 sm:p-6 rounded-sm space-y-3 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-trinex-dark border border-trinex-gold/30 flex items-center justify-center text-trinex-gold">
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white uppercase font-display">SERVICE SUPPORT</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dedicated service engineers and genuine spare-parts support to minimize kitchen downtime.
            </p>
          </div>

        </div>
      </section>

      {/* ==================================================
          4. PRODUCT CATEGORIES SHOWCASE
          ================================================== */}
      <section className="bg-trinex-light-bg py-12 sm:py-16 lg:py-20 border-y border-slate-200 text-trinex-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            light={true}
            badge="Equipment Categories"
            title="Commercial Kitchen Equipment"
            subtitle="Complete equipment solutions structured for modern commercial kitchens."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            {PRODUCT_CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className="bg-white border border-slate-300 rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Category Image Frame: 100% full view of banner image with top-right model count */}
                  <div className="relative bg-slate-950 p-2 border-b border-slate-200 flex items-center justify-center min-h-[200px] sm:min-h-[220px]">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-auto max-h-56 sm:max-h-60 object-contain group-hover:scale-102 transition-transform duration-300 shadow-sm"
                    />
                    
                    {/* Top Right Model Count Badge */}
                    <div className="absolute top-3 right-3 bg-trinex-dark/95 text-trinex-gold text-[10px] font-extrabold px-2.5 py-1 rounded border border-trinex-gold/30 shadow">
                      {cat.itemCount}+ Models
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-extrabold text-base sm:text-lg text-trinex-dark group-hover:text-trinex-gold-dark transition-colors font-display">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => navigate(`/products?category=${cat.slug}`)}
                    className="w-full bg-slate-900 hover:bg-trinex-gold text-white hover:text-trinex-dark text-xs font-bold py-2.5 sm:py-3 rounded-xs transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider shadow"
                  >
                    <span>View Equipment Category</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          5. FEATURED EQUIPMENT SHOWCASE
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <SectionHeading
            centered={false}
            badge="Official Range"
            title="Featured Equipment Solutions"
            subtitle="Explore high-demand commercial induction hobs, wok ranges, and holding cabinets."
          />

          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xs uppercase transition-all ${
                activeTab === 'all'
                  ? 'gold-gradient-bg text-trinex-dark font-extrabold'
                  : 'bg-trinex-navy text-slate-300 border border-slate-800 hover:border-trinex-gold'
              }`}
            >
              All Models
            </button>
            <button
              onClick={() => setActiveTab('induction')}
              className={`px-4 py-2 rounded-xs uppercase transition-all ${
                activeTab === 'induction'
                  ? 'gold-gradient-bg text-trinex-dark font-extrabold'
                  : 'bg-trinex-navy text-slate-300 border border-slate-800 hover:border-trinex-gold'
              }`}
            >
              Induction Range
            </button>
            <button
              onClick={() => setActiveTab('holding-steamer')}
              className={`px-4 py-2 rounded-xs uppercase transition-all ${
                activeTab === 'holding-steamer'
                  ? 'gold-gradient-bg text-trinex-dark font-extrabold'
                  : 'bg-trinex-navy text-slate-300 border border-slate-800 hover:border-trinex-gold'
              }`}
            >
              Steamer Cabinets
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRequestPrice={(pName) => onOpenQuoteModal(pName)}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark font-extrabold text-xs px-7 py-3.5 sm:px-8 sm:py-3.5 rounded-xs uppercase tracking-widest shadow-lg transition-all"
          >
            <span>View Complete Product Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ==================================================
          6. SERVICES SUMMARY SECTION
          ================================================== */}
      <section className="bg-trinex-navy py-12 sm:py-16 lg:py-20 border-y border-trinex-gold/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="360° Support"
            title="Complete Kitchen Equipment Support"
            subtitle="Integrated commercial equipment sales, technical service engineering, and genuine spare parts support."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            
            <ServiceCard
              number="01"
              title="SALES"
              subtitle="Professional Equipment Solutions"
              description="Wide range of heavy-duty induction hobs, cooking ranges, refrigeration, and food steamer cabinets for commercial kitchens."
              ctaText="Talk to Sales"
              phone="9030847474"
              icon="sales"
            />

            <ServiceCard
              number="02"
              title="SERVICE"
              subtitle="Technical Maintenance & Repairs"
              description="Reliable preventive maintenance, troubleshooting, and repair service by trained technical equipment technicians."
              ctaText="Contact Service"
              phone="9030467676"
              icon="service"
            />

            <ServiceCard
              number="03"
              title="SPARES"
              subtitle="Genuine Spare Parts Assistance"
              description="Replacement spare parts support including burner jets, thermostat sensors, compressors, door gaskets, and solenoids."
              ctaText="Enquire for Spares"
              icon="spares"
              onAction={() => navigate('/spares')}
            />

          </div>
        </div>
      </section>

      {/* ==================================================
          7. SHOWROOM & GOOGLE MAP SECTION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <SectionHeading
          badge="Physical Location"
          title="Visit Our Hyderabad Showroom"
          subtitle="Inspect commercial kitchen equipment solutions in person at our Ameerpet showroom."
        />

        <div className="mt-8 sm:mt-10">
          <GoogleMap />
        </div>
      </section>

    </div>
  );
};
