import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ChevronDown, X, Check } from 'lucide-react';
import { productStore } from '../services/productStore';
import { Product, Category } from '../types/product';
import { ProductCard } from '../components/ProductCard';

interface ProductsProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onOpenQuoteModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Multi-select categories array
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const catParam = searchParams.get('category');
    if (!catParam || catParam === 'all') return [];
    return catParam.split(',').filter(Boolean);
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'latest' | 'a-z'>('featured');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Subscribe to product store
  useEffect(() => {
    const updateData = () => {
      setProducts(productStore.getAllProducts());
      setCategories(productStore.getCategories());
    };

    updateData();
    const unsubscribe = productStore.subscribe(updateData);
    return () => unsubscribe();
  }, []);

  // Sync with searchParams
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (!catParam || catParam === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(catParam.split(',').filter(Boolean));
    }
  }, [searchParams]);

  const updateCategoryParams = (cats: string[]) => {
    const newParams = new URLSearchParams(searchParams);
    if (cats.length === 0 || cats.length === categories.length) {
      newParams.delete('category');
    } else {
      newParams.set('category', cats.join(','));
    }
    setSearchParams(newParams);
  };

  const toggleCategory = (slug: string) => {
    let updated: string[];
    if (selectedCategories.includes(slug)) {
      updated = selectedCategories.filter((c) => c !== slug);
    } else {
      updated = [...selectedCategories, slug];
    }
    setSelectedCategories(updated);
    updateCategoryParams(updated);
  };

  const selectAllCategories = () => {
    setSelectedCategories([]);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    setSearchParams(newParams);
  };

  const clearCategories = () => {
    setSelectedCategories([]);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    setSearchParams(newParams);
  };

  const getCategoryCount = (slug: string) => {
    return products.filter((p) => p.categorySlug.toLowerCase() === slug.toLowerCase()).length;
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Multi-select category filter
    if (selectedCategories.length > 0 && selectedCategories.length < categories.length) {
      result = result.filter((p) =>
        selectedCategories.some((slug) => slug.toLowerCase() === p.categorySlug.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const inName = p.name.toLowerCase().includes(q);
        const inModel = p.model.toLowerCase().includes(q);
        const inCategory = p.category.toLowerCase().includes(q);
        const inDesc = p.shortDescription.toLowerCase().includes(q);
        const inPower = p.power?.toLowerCase().includes(q) || false;
        return inName || inModel || inCategory || inDesc || inPower;
      });
    }

    // Sort
    if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'a-z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategories, categories.length, searchQuery, sortBy]);

  // Dropdown title label
  const dropdownLabel = useMemo(() => {
    if (selectedCategories.length === 0 || selectedCategories.length === categories.length) {
      return `All Equipment (${products.length})`;
    }
    if (selectedCategories.length === 1) {
      const cat = categories.find((c) => c.slug === selectedCategories[0]);
      return cat ? cat.name : '1 Equipment Type';
    }
    return `${selectedCategories.length} Types Selected`;
  }, [selectedCategories, categories, products.length]);

  return (
    <div className="bg-white min-h-screen py-6 sm:py-8 space-y-6">
      
      {/* 1. Page Header (Centered, Balanced & Professional) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-5 text-center flex flex-col items-center">
          <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
            Official Equipment Catalogue
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight leading-tight">
            Commercial Kitchen Equipment
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl mx-auto leading-relaxed">
            Professional equipment solutions designed for demanding commercial kitchens. Backed by sales consultation, warranty, and authentic spare parts.
          </p>
        </div>
      </section>

      {/* 2. Filter & Controls Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="bg-slate-50/80 p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by equipment, model, capacity..."
              className="w-full pl-10 pr-12 py-2.5 bg-white text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-trinex-red focus:outline-none text-slate-900 placeholder-slate-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Equipment Multi-Select Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`inline-flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-lg border text-xs sm:text-sm font-bold transition-all shadow-2xs ${
                  selectedCategories.length > 0 && selectedCategories.length < categories.length
                    ? 'bg-red-50 border-red-300 text-trinex-red'
                    : 'bg-white border-slate-300 hover:border-slate-400 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-trinex-red flex-shrink-0" />
                  <span>{dropdownLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 ml-1">
                  {selectedCategories.length > 0 && selectedCategories.length < categories.length && (
                    <span className="w-5 h-5 rounded-full bg-trinex-red text-white text-[10px] font-black flex items-center justify-center">
                      {selectedCategories.length}
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Multi-Select Dropdown Popup */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  {/* Header / Select All & Clear */}
                  <div className="flex items-center justify-between px-2.5 py-2 border-b border-slate-100 text-xs font-bold">
                    <span className="text-slate-500 uppercase tracking-wider text-[10px]">Select Equipment</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={selectAllCategories}
                        className="text-trinex-red hover:underline text-[11px]"
                      >
                        All
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={clearCategories}
                        className="text-slate-500 hover:text-slate-800 text-[11px]"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* List of Equipment Types with Checkboxes */}
                  <div className="max-h-64 overflow-y-auto py-1 space-y-0.5">
                    {categories.map((cat) => {
                      const isChecked = selectedCategories.includes(cat.slug);
                      const count = getCategoryCount(cat.slug);
                      return (
                        <label
                          key={cat.id}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-xs transition-colors ${
                            isChecked
                              ? 'bg-red-50/80 text-slate-900 font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleCategory(cat.slug)}
                              className="w-4 h-4 rounded border-slate-300 text-trinex-red focus:ring-trinex-red accent-trinex-red cursor-pointer"
                            />
                            <span>{cat.name}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {count}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Close button */}
                  <div className="pt-2 border-t border-slate-100 px-1">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold uppercase tracking-wider text-center hover:bg-slate-800 transition-colors"
                    >
                      Done ({filteredAndSortedProducts.length} Equipment)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-3 py-2 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Equipment</option>
                <option value="latest">Latest Models</option>
                <option value="a-z">Alphabetical (A - Z)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Selected Equipment Chips (Removable tags) */}
        {selectedCategories.length > 0 && selectedCategories.length < categories.length && (
          <div className="flex flex-wrap items-center gap-2 pt-1 px-1">
            <span className="text-xs font-bold text-slate-500">Selected Equipment:</span>
            {selectedCategories.map((slug) => {
              const cat = categories.find((c) => c.slug === slug);
              return (
                <button
                  key={slug}
                  onClick={() => toggleCategory(slug)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 hover:bg-red-100 text-trinex-red text-xs font-bold border border-red-200 shadow-2xs transition-all group"
                  title="Click to remove"
                >
                  <span>{cat ? cat.name : slug}</span>
                  <X className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </button>
              );
            })}
            <button
              onClick={clearCategories}
              className="text-xs font-bold text-slate-500 hover:text-trinex-red underline ml-1"
            >
              Reset to All
            </button>
          </div>
        )}
      </section>

      {/* 3. Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenQuoteModal={onOpenQuoteModal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
            <h3 className="text-base font-bold text-slate-900">No Equipment Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are currently no products matching this filter combination or search query.
            </p>
            <button
              onClick={() => {
                clearCategories();
                setSearchQuery('');
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
