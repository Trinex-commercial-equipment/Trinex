import React from 'react';
import { ShieldCheck, Award, Zap, Wrench, CheckCircle2, MapPin, Building2, Leaf } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-8 sm:py-12 space-y-16">
      
      {/* Hero Banner */}
      <section className="bg-trinex-light-gray border-b border-trinex-border py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-trinex-border shadow-xs text-trinex-red text-xs font-black uppercase tracking-wider">
            <span>Corporate Heritage</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-trinex-black uppercase tracking-tight">
            15 Years of Experience. <br className="hidden sm:inline" />
            <span className="text-trinex-red">Built for the Future of Smart Commercial Kitchens.</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
            QUALITY • RELIABILITY • PERFORMANCE
          </p>
        </div>
      </section>

      {/* Main Corporate Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
                Commercial Kitchen Engineering
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-trinex-black uppercase tracking-tight">
                Dependable Commercial Equipment Solutions
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              At <strong className="text-trinex-black">Trinex Equipment Pvt. Ltd.</strong>, our journey began over 15 years ago in the professional kitchen equipment service industry.
            </p>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              For more than a decade, we have worked closely with restaurants, hotels, cloud kitchens, catering businesses, canteens, tea stalls, and food service establishments. Our experience has given us valuable hands-on knowledge in servicing, maintaining and understanding commercial kitchen operations.
            </p>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Operating out of our showroom and technical hub in Ameerpet, Hyderabad, we supply commercial induction cooking ranges, wok hobs, stock pot stoves, refrigeration units, food steamer cabinets, and stainless steel fabrications tailored to the operational demands of commercial kitchens across Telangana, Andhra Pradesh, and Bengaluru.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-trinex-light-gray p-4 rounded-xl border border-trinex-border text-center">
                <ShieldCheck className="w-6 h-6 text-trinex-red mx-auto mb-2" />
                <h4 className="font-bold text-sm text-trinex-black">Sales</h4>
                <p className="text-[11px] text-gray-500">Commercial Equipment</p>
              </div>

              <div className="bg-trinex-light-gray p-4 rounded-xl border border-trinex-border text-center">
                <Wrench className="w-6 h-6 text-trinex-red mx-auto mb-2" />
                <h4 className="font-bold text-sm text-trinex-black">Service</h4>
                <p className="text-[11px] text-gray-500">Technical Support</p>
              </div>

              <div className="bg-trinex-light-gray p-4 rounded-xl border border-trinex-border text-center">
                <Award className="w-6 h-6 text-trinex-red mx-auto mb-2" />
                <h4 className="font-bold text-sm text-trinex-black">Spares</h4>
                <p className="text-[11px] text-gray-500">Replacement Parts</p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-trinex-border shadow-card bg-white p-3">
              <img
                src="/assets/images/trinex_induction_banner.jpg"
                alt="Trinex Commercial Induction Equipment Range"
                className="w-full h-auto object-contain rounded-xl"
              />
              <div className="p-4 bg-trinex-light-gray rounded-lg mt-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-black text-trinex-black">TRINEX EQUIPMENT PVT LTD</p>
                  <p className="text-[11px] text-gray-500">Showroom: Swathi Manors, Mythrivanam Road, Ameerpet</p>
                </div>
                <span className="font-bold text-trinex-red">Hyderabad</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Pillars */}
      <section className="bg-trinex-light-gray py-12 sm:py-16 border-t border-trinex-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
              Core Principles
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-trinex-black uppercase tracking-tight">
              Quality. Reliability. Performance.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-trinex-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-trinex-red flex items-center justify-center font-bold text-base">
                01
              </div>
              <h4 className="text-lg font-bold text-trinex-black">Quality Engineering</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Heavy gauge food-grade stainless steel fabrication, premium ceramic glass tops, and high duty-cycle commercial components engineered to withstand busy kitchen environments.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-trinex-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-trinex-red flex items-center justify-center font-bold text-base">
                02
              </div>
              <h4 className="text-lg font-bold text-trinex-black">Operational Reliability</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Equipment designed to deliver predictable, continuous heat and throughput during peak restaurant service hours without nuisance trip-offs or thermal degradation.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-trinex-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-trinex-red flex items-center justify-center font-bold text-base">
                03
              </div>
              <h4 className="text-lg font-bold text-trinex-black">High Performance</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Rapid thermal transfer with instant power modulation, enabling faster ticket execution while consuming less fuel and energy than conventional LPG burners.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
