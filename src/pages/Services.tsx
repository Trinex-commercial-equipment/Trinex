import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { useNavigate } from 'react-router-dom';
import { Phone, Wrench, ShieldCheck, PackageCheck, Clock, CheckCircle2, ShieldAlert, Zap } from 'lucide-react';

interface ServicesProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-8">
      
      {/* Page Header */}
      <section className="bg-trinex-navy py-12 border-b border-trinex-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-trinex-dark border border-trinex-gold/30 text-trinex-gold text-xs font-bold uppercase tracking-widest">
            <span>360° Technical Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
            Commercial Kitchen Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            Complete kitchen equipment support covering sales, technical service maintenance, and genuine spare parts.
          </p>
        </div>
      </section>

      {/* Main 3 Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Integrated Support"
          title="Complete Kitchen Equipment Support"
          subtitle="Three core service wings designed to keep your commercial kitchen operating without interruption."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          
          <ServiceCard
            number="01"
            title="SALES"
            subtitle="Professional Equipment Solutions"
            description="Consultative equipment supply for commercial kitchens. We evaluate your menu, output volume, and spatial layout to recommend optimal heavy-duty cooking range, refrigeration, bakery, and prep machinery."
            ctaText="Talk to Sales"
            phone="9030847474"
            icon="sales"
          />

          <ServiceCard
            number="02"
            title="SERVICE"
            subtitle="Reliable Maintenance & Technical Support"
            description="Dependable technical service and maintenance support for kitchen machinery. Our experienced technicians assist with equipment installation, routine servicing, and rapid breakdown troubleshooting."
            ctaText="Contact Service"
            phone="9030467676"
            icon="service"
          />

          <ServiceCard
            number="03"
            title="SPARES"
            subtitle="Spare Parts Support for Performance"
            description="Comprehensive spare parts assistance to support machine performance. We supply genuine burner jets, thermostat sensors, compressors, door gaskets, heating elements, and motor impellers."
            ctaText="Enquire for Spares"
            icon="spares"
            onAction={() => navigate('/spares')}
          />

        </div>
      </section>

      {/* Detailed Technical Service Breakdown */}
      <section className="bg-trinex-navy py-16 border-y border-trinex-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-left">
              <SectionHeading
                centered={false}
                badge="Preventive Maintenance"
                title="Service Engineering & Maintenance Focus"
              />

              <p className="text-sm text-slate-300 leading-relaxed">
                Commercial food-service equipment operates under harsh conditions of heat, moisture, and continuous daily use. Our dedicated service wing ensures your equipment maintains optimal performance.
              </p>

              <div className="space-y-3">
                {[
                  "On-Demand Emergency Repairs: Rapid response for gas leakages, heating element failures, and refrigeration pull-down issues.",
                  "Routine Preventive Servicing: Descaling combi steamers, burner nozzle cleaning, compressor coil wash, and gas pressure check.",
                  "Installation & Setup Assistance: Professional positioning, gas line connection checks, and electrical load alignment.",
                  "Original Replacement Spares: Direct access to genuine components to protect machine warranties and reliability."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-trinex-dark p-3.5 rounded border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-trinex-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="tel:9030467676"
                  className="gold-gradient-bg text-trinex-dark font-extrabold text-xs px-6 py-3 rounded uppercase tracking-wider flex items-center gap-2 shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Service: 9030467676</span>
                </a>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-trinex-dark border-2 border-trinex-gold/30 p-8 rounded-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-12 h-12 rounded bg-trinex-gold/20 border border-trinex-gold text-trinex-gold flex items-center justify-center">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Technical Support Line</h3>
                  <p className="text-xs text-trinex-gold font-bold">Service Helpline: 9030467676</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Service Hours</span>
                  <span className="font-bold text-white">Mon – Sat: 10:00 AM – 7:00 PM</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Primary Coverage Area</span>
                  <span className="font-bold text-white">Hyderabad & Secunderabad</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Regional Support</span>
                  <span className="font-bold text-white">Telangana & Andhra Pradesh</span>
                </div>
              </div>

              <button
                onClick={() => onOpenQuoteModal("Commercial Service & Repair Request")}
                className="w-full bg-trinex-navy hover:bg-slate-800 text-slate-100 font-extrabold text-xs py-3 rounded border border-trinex-gold/40 hover:border-trinex-gold uppercase tracking-wider transition-colors"
              >
                Schedule Service Inspection
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
