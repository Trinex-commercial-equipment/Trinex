import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ShieldCheck, Award, Zap, Wrench, CheckCircle2, MapPin, Building2, Leaf } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-20 py-8">
      
      {/* Hero Banner */}
      <section className="bg-trinex-navy py-12 border-b border-trinex-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-trinex-dark border border-trinex-gold/30 text-trinex-gold text-xs font-bold uppercase tracking-widest">
            <span>Corporate Overview</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
            About Trinex Equipment
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            QUALITY • RELIABILITY • PERFORMANCE
          </p>
        </div>
      </section>

      {/* Main Corporate Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <SectionHeading
              centered={false}
              badge="Commercial Kitchen Engineering"
              title="Dependable Commercial Equipment Solutions"
            />

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              <strong className="text-white">Trinex Equipment Pvt Ltd.</strong> provides professional kitchen equipment solutions for commercial food-service environments. Our focus is on delivering dependable equipment solutions backed by responsive service and spare-parts support.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Operating out of Hyderabad, Telangana, we supply commercial induction cooking ranges, wok hobs, stock pot stoves, refrigeration units, food steamer cabinets, and stainless steel fabrications tailored to the operational demands of restaurants, cloud kitchens, hotels, bakeries, and food processing units.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-trinex-navy p-4 rounded border border-trinex-gold/20 text-center">
                <ShieldCheck className="w-6 h-6 text-trinex-gold mx-auto mb-2" />
                <h4 className="font-extrabold text-sm text-white">Sales</h4>
                <p className="text-[11px] text-slate-400">Commercial Equipment</p>
              </div>

              <div className="bg-trinex-navy p-4 rounded border border-trinex-gold/20 text-center">
                <Wrench className="w-6 h-6 text-trinex-gold mx-auto mb-2" />
                <h4 className="font-extrabold text-sm text-white">Service</h4>
                <p className="text-[11px] text-slate-400">Technical Support</p>
              </div>

              <div className="bg-trinex-navy p-4 rounded border border-trinex-gold/20 text-center">
                <Award className="w-6 h-6 text-trinex-gold mx-auto mb-2" />
                <h4 className="font-extrabold text-sm text-white">Spares</h4>
                <p className="text-[11px] text-slate-400">Replacement Parts</p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden border-2 border-trinex-gold/40 shadow-2xl bg-white">
              <img
                src="/assets/images/trinex_induction_banner.jpg"
                alt="Trinex Commercial Induction Equipment Range"
                className="w-full h-auto object-contain"
              />
              <div className="bg-trinex-dark p-4 border-t border-trinex-gold/30">
                <p className="text-xs font-bold text-trinex-gold">TRINEX EQUIPMENT PVT LTD</p>
                <p className="text-[11px] text-slate-300">Hyderabad Showroom & Technical Service Department</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Pillars */}
      <section className="bg-trinex-navy py-16 border-y border-trinex-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Brand Philosophy"
            title="The Three Brand Pillars"
            subtitle="Guiding every equipment solution we provide to the food-service industry."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            
            <div className="bg-trinex-dark p-8 rounded border border-slate-800 space-y-4 text-center hover:border-trinex-gold/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-trinex-gold/20 border border-trinex-gold text-trinex-gold flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white font-display">QUALITY</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We select equipment constructed from high-grade materials such as AISI 304 food-grade stainless steel to ensure hygiene, corrosion resistance, and thermal efficiency.
              </p>
            </div>

            <div className="bg-trinex-dark p-8 rounded border border-slate-800 space-y-4 text-center hover:border-trinex-gold/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-trinex-gold/20 border border-trinex-gold text-trinex-gold flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white font-display">RELIABILITY</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Commercial kitchens cannot afford equipment downtime during rush hours. Our equipment and after-sales service focus on consistent, dependable operation.
              </p>
            </div>

            <div className="bg-trinex-dark p-8 rounded border border-slate-800 space-y-4 text-center hover:border-trinex-gold/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-trinex-gold/20 border border-trinex-gold text-trinex-gold flex items-center justify-center mx-auto">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white font-display">PERFORMANCE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Designed to handle heavy workloads, high output demands, fast heating, and energy savings for professional culinary teams.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Sectors Served */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Target Sectors"
          title="Industries & Establishments Served"
          subtitle="Providing commercial kitchen infrastructure across food-service verticals."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
          {[
            'Hotels',
            'Restaurants',
            'Canteens',
            'Cloud Kitchens',
            'Food Processing Units',
            'Catering & Banquet Halls',
            'Bakeries & Confectioneries',
            'Central Production Kitchens'
          ].map((sector, i) => (
            <div key={i} className="bg-trinex-navy p-4 rounded border border-slate-800 flex items-center gap-3 text-xs font-bold text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-trinex-gold flex-shrink-0" />
              <span>{sector}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
