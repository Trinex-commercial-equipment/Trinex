import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Trinex Equipment, I would like to inquire about commercial kitchen equipment and pricing.'
    );
    window.open(`https://wa.me/919030847474?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 sm:hidden shadow-lg">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        <a
          href="tel:9030847474"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
        >
          <Phone className="w-4 h-4 text-trinex-red" />
          <span>Call Now</span>
        </a>

        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
