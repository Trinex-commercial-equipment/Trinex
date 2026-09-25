import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { FEATURED_PRODUCTS, PRODUCT_CATEGORIES } from '../data/equipmentData';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ProductsProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onOpenQuoteModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.categorySlug === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 sm:space-y-12 py-6 sm:py-8">
      
      {/* Page Header */}
      <section className="bg-trinex-navy py-8 sm:py-12 border-b border-trinex-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-trinex-dark border border-trinex-gold/30 text-trinex-gold text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <span>Equipment Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-display">
            Commercial Kitchen Equipment
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            Heavy-duty, high-performance equipment solutions engineered for commercial kitchens.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Category Filter Control Bar */}
        <div className="bg-trinex-navy border border-trinex-gold/20 p-4 sm:p-6 rounded-sm space-y-4 mb-8 sm:mb-10 shadow-lg">
          
          {/* Top Row: Search Input */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search equipment by name or spec..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-trinex-dark border border-slate-700 rounded text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-slate-400 font-semibold">
              Showing <span className="text-trinex-gold font-bold">{filteredProducts.length}</span> Equipment Models
            </div>
          </div>

          {/* Bottom Row: Category Pill Buttons */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded text-[11px] sm:text-xs font-extrabold uppercase transition-all ${
                selectedCategory === 'all'
                  ? 'gold-gradient-bg text-trinex-dark shadow'
                  : 'bg-trinex-dark text-slate-300 border border-slate-800 hover:border-trinex-gold'
              }`}
            >
              All Categories
            </button>

            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded text-[11px] sm:text-xs font-extrabold uppercase transition-all ${
                  selectedCategory === cat.slug
                    ? 'gold-gradient-bg text-trinex-dark shadow'
                    : 'bg-trinex-dark text-slate-300 border border-slate-800 hover:border-trinex-gold'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Product Grid Display */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onRequestPrice={(pName) => onOpenQuoteModal(pName)}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 sm:py-16 text-center bg-trinex-navy/40 border border-slate-800 rounded p-6 sm:p-8 space-y-4">
            <SlidersHorizontal className="w-10 h-10 sm:w-12 sm:h-12 text-slate-500 mx-auto" />
            <h3 className="text-base sm:text-lg font-bold text-white">No Equipment Models Match Your Search</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              We carry a complete inventory of commercial kitchen equipment beyond what is listed. Please contact our sales team directly or clear filters to view all models.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="gold-gradient-bg text-trinex-dark text-xs font-bold px-6 py-2.5 rounded uppercase"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Commercial Customization Banner */}
        <div className="mt-12 sm:mt-16 bg-trinex-navy border-2 border-trinex-gold/30 rounded p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-trinex-gold bg-trinex-dark px-3 py-1 rounded border border-trinex-gold/30">
              Custom Stainless Steel Fabrication
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              Need Custom Kitchen Equipment Dimensions?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We provide custom stainless steel work tables, sink units, exhaust hood systems, and storage racks built according to your kitchen floorplan.
            </p>
          </div>

          <button
            onClick={() => onOpenQuoteModal("Custom Stainless Steel Kitchen Fabrication")}
            className="w-full sm:w-auto gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark font-extrabold text-xs px-6 py-3.5 rounded uppercase tracking-wider shadow-lg flex-shrink-0 text-center"
          >
            Request Custom Fabrication Quote
          </button>
        </div>

      </section>

    </div>
  );
};
