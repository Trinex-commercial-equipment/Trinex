import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Quick B2B Inquiry Button */}
      <a
        href="https://wa.me/919030847474?text=Hello%20Trinex%20Equipment,%20I%20am%20interested%20in%20commercial%20kitchen%20equipment."
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group border-2 border-white/20"
        title="Quick WhatsApp B2B Enquiry"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-15 bg-trinex-dark text-slate-100 text-xs font-bold px-3 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-trinex-gold/30 pointer-events-none">
          WhatsApp B2B Chat
        </span>
      </a>

      {/* Direct Call Sales Button */}
      <a
        href="tel:9030847474"
        className="w-13 h-13 rounded-full gold-gradient-bg text-trinex-dark shadow-gold-glow flex items-center justify-center transition-all duration-300 hover:scale-110 group border-2 border-trinex-dark"
        title="Call Sales Helpline: 9030847474"
        aria-label="Call Sales Helpline"
      >
        <Phone className="w-6 h-6 stroke-[2.5]" />
        <span className="absolute right-15 bg-trinex-dark text-trinex-gold text-xs font-bold px-3 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-trinex-gold/30 pointer-events-none">
          Call Sales: 9030847474
        </span>
      </a>
    </div>
  );
};
