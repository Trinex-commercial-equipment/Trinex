import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onOpenQuoteModal?: (productContext?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuoteModal }) => {
  const primaryImage = product.images?.[0] || '/assets/images/countertop_induction_hob.png';

  const handleWhatsAppQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Trinex Equipment,\nI am interested in:\nProduct: ${product.name}\nModel: ${product.model}\n\nPlease share the price, availability and details.`
    );
    window.open(`https://wa.me/919030847474?text=${text}`, '_blank');
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-card-hover transition-all duration-300 flex flex-col h-full overflow-hidden">
      
      {/* Product Image Container */}
      <Link 
        to={`/products/${product.slug}`} 
        className="relative block w-full pt-[75%] bg-slate-50 overflow-hidden cursor-pointer border-b border-slate-100"
      >
        <img
          src={primaryImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Availability / Tag Badge */}
        {product.fastMoving && (
          <span className="absolute top-3 left-3 bg-trinex-red text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow-xs">
            Fast Moving
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          
          {/* Category */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-trinex-red font-bold uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            {product.brand && (
              <span className="text-slate-400 font-medium text-[11px]">
                {product.brand}
              </span>
            )}
          </div>

          {/* Product Name */}
          <Link to={`/products/${product.slug}`} className="block group-hover:text-trinex-red transition-colors">
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug line-clamp-2 min-h-[44px]">
              {product.name}
            </h3>
          </Link>

          {/* Model */}
          <div className="min-h-[26px]">
            {product.model ? (
              <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded">
                Model: <span className="text-slate-900 font-bold">{product.model}</span>
              </span>
            ) : (
              <span className="inline-block text-transparent text-xs select-none">
                Model: None
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed min-h-[34px]">
            {product.shortDescription || 'Commercial grade heavy-duty kitchen equipment.'}
          </p>
        </div>

        {/* Buttons / CTAs */}
        <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-slate-100">
          <Link
            to={`/products/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleWhatsAppQuote}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all"
            title="Get Quote on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">WhatsApp</span>
          </button>
        </div>

      </div>

    </div>
  );
};
