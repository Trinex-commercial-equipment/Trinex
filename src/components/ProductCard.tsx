import React from 'react';
import { ProductItem } from '../data/equipmentData';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  onRequestPrice: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onRequestPrice }) => {
  return (
    <div className="bg-trinex-navy border border-trinex-gold/30 hover:border-trinex-gold rounded-sm overflow-hidden shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1">
      
      {/* Product Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-950 p-4 flex items-center justify-center border-b border-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-xl"
          loading="lazy"
        />
        
        {/* Category Tag Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-trinex-dark/95 text-trinex-gold text-[10px] font-extrabold uppercase tracking-widest border border-trinex-gold/40 rounded-xs shadow">
            {product.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-wider rounded shadow">
            CE / RoHS
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-trinex-gold transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Technical Specifications Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11px] bg-trinex-dark/90 p-3 rounded border border-slate-800">
          {product.specs.slice(0, 4).map((spec, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">{spec.label}</span>
              <span className="font-bold text-slate-100 truncate">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div className="text-[11px] font-bold text-trinex-gold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Smart Cooking</span>
          </div>

          <button
            onClick={() => onRequestPrice(product.name)}
            className="gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark text-xs font-extrabold px-4 py-2 rounded-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow"
          >
            <span>Request Price</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
