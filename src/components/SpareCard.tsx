import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SparePart } from '../types/product';
import { slugify } from '../services/productStore';
import { getSpareSlug } from '../services/sparesStore';

interface SpareCardProps {
  spare: SparePart;
  onSelectForEnquiry?: (spare: SparePart) => void;
  onOpenQuoteModal?: (productContext?: string) => void;
}

export const SpareCard: React.FC<SpareCardProps> = ({
  spare,
  onSelectForEnquiry
}) => {
  const spareSlug = spare.slug || getSpareSlug(spare) || spare.partNumber || spare.id;
  const imageSrc = spare.image || '/assets/images/countertop_induction_hob.png';

  return (
    <div className="bg-white rounded-xl border border-trinex-border p-5 flex flex-col justify-between hover:shadow-card transition-shadow space-y-4">
      <div>
        <Link
          to={`/spares/${spareSlug}`}
          className="h-44 w-full bg-trinex-light-gray rounded-lg p-3 flex items-center justify-center mb-3 block overflow-hidden group cursor-pointer"
        >
          <img
            src={imageSrc}
            alt={spare.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/images/countertop_induction_hob.png';
            }}
          />
        </Link>

        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-trinex-red uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded">
            {spare.category}
          </span>
          <Link
            to={`/spares/${spareSlug}`}
            className="block hover:text-trinex-red transition-colors"
          >
            <h3 className="text-base font-bold text-trinex-black leading-snug">
              {spare.name}
            </h3>
          </Link>
          {spare.partNumber && (
            <p className="text-xs text-gray-500">
              Part No: <span className="font-mono font-bold text-trinex-black">{spare.partNumber}</span>
            </p>
          )}
          {spare.compatibleEquipment && (
            <p className="text-xs text-gray-600">
              Compatible: <span className="font-medium text-gray-800">{spare.compatibleEquipment}</span>
            </p>
          )}
          <p className="text-xs text-gray-500 line-clamp-2 pt-1">
            {spare.shortDescription}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
        <Link
          to={`/spares/${spareSlug}`}
          className="py-2.5 px-3 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider transition-colors text-center inline-flex items-center justify-center gap-1"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          type="button"
          onClick={() => onSelectForEnquiry && onSelectForEnquiry(spare)}
          className="py-2.5 px-3 rounded bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors text-center"
        >
          Request This Spare
        </button>
      </div>
    </div>
  );
};
