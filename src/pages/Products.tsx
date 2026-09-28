import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { productStore } from '../services/productStore';
import { Product, Category } from '../types/product';
import { ProductCard } from '../components/ProductCard';

interface ProductsProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onOpenQuoteModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'latest' | 'a-z'>('featured');

  useEffect(() => {
    const updateData = () => {
      setProducts(productStore.getAllProducts());
      setCategories(productStore.getCategories());
    };

    updateData();
    const unsubscribe = productStore.subscribe(updateData);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.categorySlug.toLowerCase() === selectedCategory.toLowerCase()
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
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-trinex-border pb-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-50 text-trinex-red text-xs font-bold uppercase tracking-wider">
            <span>Official Equipment Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-trinex-black uppercase tracking-tight">
            Commercial Kitchen Equipment
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Professional equipment solutions designed for demanding commercial kitchens. Backed by sales consultation, warranty, and authentic spare parts.
          </p>
        </div>
      </section>

      {/* Filter & Controls Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-trinex-light-gray p-4 rounded-xl border border-trinex-border">
          
          {/* Search bar inside catalogue */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, model, capacity..."
              className="w-full pl-10 pr-4 py-2.5 bg-white text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red text-trinex-black placeholder-gray-400"
            />
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-300 text-xs font-semibold rounded-lg px-3 py-2 text-trinex-black focus:outline-none focus:border-trinex-red"
            >
              <option value="featured">Featured Equipment</option>
              <option value="latest">Latest Models</option>
              <option value="a-z">Alphabetical (A - Z)</option>
            </select>
          </div>

        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-trinex-red text-white shadow-xs'
                : 'bg-trinex-light-gray hover:bg-gray-200 text-gray-700'
            }`}
          >
            All Equipment ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0 transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-trinex-red text-white shadow-xs'
                  : 'bg-trinex-light-gray hover:bg-gray-200 text-gray-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
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
          <div className="text-center py-20 bg-trinex-light-gray rounded-xl border border-dashed border-gray-300 p-8 space-y-3">
            <h3 className="text-base font-bold text-trinex-black">No Products Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              There are currently no products matching this filter or search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center px-4 py-2 rounded bg-trinex-black text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
