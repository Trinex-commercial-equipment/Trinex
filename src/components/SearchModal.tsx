import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, MessageCircle, Package, Wrench } from 'lucide-react';
import { productStore } from '../services/productStore';
import { sparesStore, getSpareSlug } from '../services/sparesStore';
import { Product, SparePart } from '../types/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (productContext?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'products' | 'spares'>('all');
  const [productResults, setProductResults] = useState<Product[]>([]);
  const [spareResults, setSpareResults] = useState<SparePart[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setQuery('');
      setFilterType('all');
      setProductResults(productStore.getAllProducts());
      setSpareResults(sparesStore.getAllSpares());
    }
  }, [isOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setProductResults(productStore.getAllProducts());
      setSpareResults(sparesStore.getAllSpares());
    } else {
      setProductResults(productStore.searchProducts(val));
      setSpareResults(sparesStore.searchSpares(val));
    }
  };

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/products/${slug}`);
  };

  const handleSelectSpare = (spare: SparePart) => {
    onClose();
    navigate(`/spares/${getSpareSlug(spare) || spare.id}`);
  };

  const handleWhatsAppProduct = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onClose();
    const message = encodeURIComponent(
      `Hello Trinex Equipment,\nI am interested in:\nProduct: ${product.name}\nModel: ${product.model || 'Standard'}\n\nPlease share the commercial price, availability and technical specifications.`
    );
    window.open(`https://wa.me/919030847474?text=${message}`, '_blank');
  };

  const handleWhatsAppSpare = (e: React.MouseEvent, spare: SparePart) => {
    e.stopPropagation();
    onClose();
    const message = encodeURIComponent(
      `Hello Trinex Equipment Spares,\nI am inquiring about spare part:\nName: ${spare.name}\nPart No: ${spare.partNumber || 'N/A'}\nCompatible with: ${spare.compatibleEquipment || 'Kitchen Equipment'}\n\nPlease confirm availability and dispatch pricing.`
    );
    window.open(`https://wa.me/919030467676?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  const totalResults = productResults.length + spareResults.length;
  const showProducts = filterType === 'all' || filterType === 'products';
  const showSpares = filterType === 'all' || filterType === 'spares';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-14 sm:pt-20 px-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-slate-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b-2 border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-trinex-red flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search equipment, models, or spare parts (e.g. coil, glass, 3.5 kW, range)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-trinex-black placeholder-gray-500 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setProductResults(productStore.getAllProducts());
                setSpareResults(sparesStore.getAllSpares());
              }}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter Badges */}
        <div className="px-4 py-2 bg-white border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              filterType === 'all'
                ? 'bg-trinex-black text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Results ({totalResults})
          </button>
          <button
            onClick={() => setFilterType('products')}
            className={`px-3 py-1 rounded-full font-bold flex items-center gap-1.5 transition-all ${
              filterType === 'products'
                ? 'bg-trinex-red text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Equipment ({productResults.length})</span>
          </button>
          <button
            onClick={() => setFilterType('spares')}
            className={`px-3 py-1 rounded-full font-bold flex items-center gap-1.5 transition-all ${
              filterType === 'spares'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Spare Parts ({spareResults.length})</span>
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {totalResults > 0 ? (
            <>
              {/* Commercial Equipment Products */}
              {showProducts && productResults.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                    <span className="flex items-center gap-1.5 text-trinex-red">
                      <Package className="w-3.5 h-3.5" />
                      <span>Commercial Equipment ({productResults.length})</span>
                    </span>
                  </div>

                  {productResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl border-2 border-slate-200 hover:border-trinex-red bg-white hover:bg-slate-50/50 shadow-xs transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-lg bg-slate-50 border-2 border-slate-200 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <img
                            src={product.images[0] || '/assets/images/countertop_induction_hob.png'}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/images/countertop_induction_hob.png';
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold text-trinex-red uppercase tracking-wider bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                              {product.category}
                            </span>
                            {product.model && (
                              <span className="text-xs text-slate-500 font-medium">Model: {product.model}</span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-trinex-black group-hover:text-trinex-red transition-colors mt-0.5">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-md">
                            {product.shortDescription || product.power || 'Heavy duty commercial kitchen unit'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                        <button
                          onClick={(e) => handleWhatsAppProduct(e, product)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                          title="Get Price Quote on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Quote</span>
                        </button>
                        <button
                          onClick={() => handleSelectProduct(product.slug)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-trinex-black hover:bg-trinex-red text-white transition-colors"
                        >
                          <span>View</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Spare Parts Section */}
              {showSpares && spareResults.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                    <span className="flex items-center gap-1.5 text-amber-700">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Spare Parts ({spareResults.length})</span>
                    </span>
                  </div>

                  {spareResults.map((spare) => (
                    <div
                      key={spare.id}
                      onClick={() => handleSelectSpare(spare)}
                      className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl border-2 border-amber-200/80 hover:border-amber-500 bg-amber-50/20 hover:bg-amber-50/60 shadow-xs transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-lg bg-white border-2 border-amber-200 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <img
                            src={spare.image || '/assets/images/cooking_range.jpg'}
                            alt={spare.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/images/cooking_range.jpg';
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">
                              Spare Part
                            </span>
                            {spare.partNumber && (
                              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                Part #{spare.partNumber}
                              </span>
                            )}
                            <span className="text-xs text-slate-500">{spare.category}</span>
                          </div>
                          <h4 className="text-sm font-bold text-trinex-black group-hover:text-amber-800 transition-colors mt-0.5">
                            {spare.name}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-md">
                            {spare.compatibleEquipment ? `Compatible: ${spare.compatibleEquipment}` : spare.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                        <button
                          onClick={(e) => handleWhatsAppSpare(e, spare)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                          title="Ask for Spare on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>
                        <button
                          onClick={() => handleSelectSpare(spare)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-trinex-black hover:bg-amber-700 text-white transition-colors"
                        >
                          <span>Part Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <Search className="w-8 h-8 text-gray-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold text-trinex-black">No matching equipment or spares found.</p>
              <p className="text-xs text-gray-500 mt-1">
                Try searching for "induction", "coil", "glass", "burner", "sensor" or "range"
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t-2 border-slate-200 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2">
          <span>Looking for customized machinery or spare parts?</span>
          <div className="flex items-center gap-4">
            <a
              href="tel:9030847474"
              className="font-bold text-trinex-red hover:underline flex items-center gap-1"
            >
              Sales: 9030847474
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="tel:9030467676"
              className="font-bold text-amber-700 hover:underline flex items-center gap-1"
            >
              Service: 9030467676
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
