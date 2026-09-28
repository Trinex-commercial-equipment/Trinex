import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, MessageCircle } from 'lucide-react';
import { productStore } from '../services/productStore';
import { Product } from '../types/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (productContext?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onOpenQuoteModal }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setQuery('');
      setResults(productStore.getAllProducts());
    }
  }, [isOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setResults(productStore.getAllProducts());
    } else {
      setResults(productStore.searchProducts(val));
    }
  };

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/products/${slug}`);
  };

  const handleWhatsAppQuote = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onClose();
    const message = encodeURIComponent(
      `Hello Trinex Equipment,\nI am interested in:\nProduct: ${product.name}\nModel: ${product.model}\n\nPlease share the price, availability and technical details.`
    );
    window.open(`https://wa.me/919030847474?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-lg shadow-2xl border border-trinex-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-trinex-border flex items-center gap-3 bg-trinex-light-gray">
          <Search className="w-5 h-5 text-trinex-red flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search by product name, model (e.g. 3.5 kW), category, or keyword..."
            className="flex-1 bg-transparent text-sm sm:text-base text-trinex-black placeholder-gray-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setResults(productStore.getAllProducts());
              }}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-gray-100">
          {results.length > 0 ? (
            <div className="space-y-3">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                {query.trim() ? `Search Results (${results.length})` : 'All Available Products'}
              </div>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-md bg-white border border-gray-200 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.images[0] || '/assets/images/countertop_induction_hob.png'}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-trinex-red uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Model: {product.model}</span>
                      </div>
                      <h4 className="text-sm font-bold text-trinex-black group-hover:text-trinex-red transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1 max-w-md">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                    <button
                      onClick={(e) => handleWhatsAppQuote(e, product)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                      title="Get Quote on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleSelectProduct(product.slug)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-trinex-black hover:bg-trinex-red text-white transition-colors"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <Search className="w-8 h-8 text-gray-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold text-trinex-black">No products found.</p>
              <p className="text-xs text-gray-500 mt-1">
                Try searching for "induction", "cooktop", or "3.5 kW"
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-gray-50 border-t border-trinex-border flex items-center justify-between text-xs text-gray-500">
          <span>Need specialized equipment assistance?</span>
          <a
            href="tel:9030847474"
            className="font-bold text-trinex-red hover:underline flex items-center gap-1"
          >
            Call Sales: 9030847474
          </a>
        </div>
      </div>
    </div>
  );
};
