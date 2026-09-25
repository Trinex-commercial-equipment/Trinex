import React from 'react';
import { Phone, Wrench, ShieldCheck, PackageCheck, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  phone?: string;
  icon: 'sales' | 'service' | 'spares';
  onAction?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  number,
  title,
  subtitle,
  description,
  ctaText,
  phone,
  icon,
  onAction,
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'sales':
        return <ShieldCheck className="w-8 h-8 text-trinex-gold" />;
      case 'service':
        return <Wrench className="w-8 h-8 text-trinex-gold" />;
      case 'spares':
        return <PackageCheck className="w-8 h-8 text-trinex-gold" />;
    }
  };

  return (
    <div className="bg-trinex-navy border border-trinex-gold/30 hover:border-trinex-gold rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:shadow-gold-glow">
      {/* Background Big Number watermark */}
      <span className="absolute -right-2 -bottom-6 font-display font-black text-8xl text-slate-800/40 select-none group-hover:text-trinex-gold/10 transition-colors pointer-events-none">
        {number}
      </span>

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded bg-trinex-dark border border-trinex-gold/40 flex items-center justify-center shadow-inner">
            {renderIcon()}
          </div>
          <span className="text-xs font-black tracking-widest text-trinex-gold uppercase bg-trinex-dark px-3 py-1 rounded border border-trinex-gold/20">
            SERVICE {number}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-trinex-gold transition-colors font-display">
            {title}
          </h3>
          <p className="text-xs font-bold text-trinex-gold uppercase tracking-wider mt-1">
            {subtitle}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
          {description}
        </p>
      </div>

      {/* Footer Action */}
      <div className="pt-6 mt-6 border-t border-slate-800 relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {phone ? (
          <a
            href={`tel:${phone}`}
            className="gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark font-extrabold text-xs px-5 py-3 rounded-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
          >
            <Phone className="w-4 h-4" />
            <span>{ctaText}: {phone}</span>
          </a>
        ) : (
          <button
            onClick={onAction}
            className="gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark font-extrabold text-xs px-5 py-3 rounded-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
