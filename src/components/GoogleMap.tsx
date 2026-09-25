import React from 'react';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

export const GoogleMap: React.FC = () => {
  const address = "Ground Floor, Swathi Manors, Mythrivanam Road, Ameerpet, Hyderabad, Telangana - 500082";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Trinex Equipment Pvt Ltd Swathi Manors Mythrivanam Road Ameerpet Hyderabad")}`;

  return (
    <div className="bg-trinex-navy border border-trinex-gold/30 rounded-sm overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        
        {/* Left Information Panel */}
        <div className="p-6 sm:p-8 bg-trinex-dark flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-trinex-gold/20 text-trinex-gold text-[10px] font-extrabold uppercase tracking-widest border border-trinex-gold/30 mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Visit Our Showroom</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              Hyderabad Equipment Showroom
            </h3>
            
            <div className="mt-4 space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-trinex-gold flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {address}
                </p>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Clock className="w-4 h-4 text-trinex-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-white">Monday – Saturday: 10:00 AM – 7:00 PM</p>
                  <p className="text-slate-400">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Phone className="w-4 h-4 text-trinex-gold flex-shrink-0" />
                <span className="font-bold text-white">Sales: 9030847474 | Service: 9030467676</span>
              </div>
            </div>
          </div>

          {/* Directions CTA button */}
          <div className="pt-4 border-t border-slate-800">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark font-extrabold text-xs py-3 rounded uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>

        {/* Right Map Embed / Viewer */}
        <div className="lg:col-span-2 relative min-h-[350px] bg-slate-900">
          <iframe
            title="Trinex Equipment Showroom Location Map"
            src="https://maps.google.com/maps?q=Mythrivanam%20Road%20Ameerpet%20Hyderabad%20500082&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full min-h-[350px] border-0 filter grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            loading="lazy"
            allowFullScreen
          />
          <div className="absolute top-4 right-4 bg-trinex-dark/90 text-trinex-gold border border-trinex-gold/40 px-3 py-1.5 rounded text-xs font-bold shadow-lg pointer-events-none">
            Ameerpet Showroom
          </div>
        </div>

      </div>
    </div>
  );
};
