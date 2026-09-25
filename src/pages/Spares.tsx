import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { SPARE_PARTS, SparePart } from '../data/sparesData';
import { Search, PackageCheck, Wrench, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SparesProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Spares: React.FC<SparesProps> = ({ onOpenQuoteModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = Array.from(new Set(SPARE_PARTS.map((item) => item.category)));

  const filteredSpares = SPARE_PARTS.filter((part) => {
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      part.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.partCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-12 py-8">
      
      {/* Header Banner */}
      <section className="bg-trinex-navy py-12 border-b border-trinex-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-trinex-dark border border-trinex-gold/30 text-trinex-gold text-xs font-bold uppercase tracking-widest">
            <PackageCheck className="w-4 h-4" />
            <span>Spare Parts Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
            Commercial Spare Parts
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            Genuine replacement parts and components to maintain long-term commercial kitchen performance.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Category Filter */}
        <div className="bg-trinex-navy border border-trinex-gold/20 p-4 sm:p-6 rounded-sm space-y-4 mb-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by part code or name (e.g., TX-SP-BRN-304)..."
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
              Showing <span className="text-trinex-gold font-bold">{filteredSpares.length}</span> Replacement Spare Parts
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all ${
                selectedCategory === 'all'
                  ? 'gold-gradient-bg text-trinex-dark'
                  : 'bg-trinex-dark text-slate-300 border border-slate-800 hover:border-trinex-gold'
              }`}
            >
              All Spare Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all ${
                  selectedCategory === cat
                    ? 'gold-gradient-bg text-trinex-dark'
                    : 'bg-trinex-dark text-slate-300 border border-slate-800 hover:border-trinex-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Spares Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpares.map((part) => (
            <div key={part.id} className="bg-trinex-navy border border-trinex-gold/20 hover:border-trinex-gold rounded p-6 flex flex-col justify-between space-y-4 shadow transition-all group">
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-bold text-trinex-gold uppercase tracking-wider bg-trinex-dark px-2.5 py-1 rounded border border-trinex-gold/20">
                    {part.category}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    CODE: {part.partCode}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white mt-3 group-hover:text-trinex-gold transition-colors">
                  {part.partName}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {part.description}
                </p>

                {/* Compatibility Badges */}
                <div className="mt-3 pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Compatible Equipment:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {part.compatibility.map((comp, idx) => (
                      <span key={idx} className="text-[10px] bg-trinex-dark text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical specs table */}
                <div className="mt-3 bg-trinex-dark/80 p-2.5 rounded border border-slate-800 space-y-1 text-[11px]">
                  {Object.entries(part.specs).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">{k}:</span>
                      <span className="text-slate-200 font-bold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Available Support</span>
                </div>

                <button
                  onClick={() => onOpenQuoteModal(`Spare Part: ${part.partName} (${part.partCode})`)}
                  className="gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark text-xs font-extrabold px-4 py-2 rounded-xs uppercase tracking-wider transition-all flex items-center gap-1 shadow"
                >
                  <span>Enquire for Spares</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
