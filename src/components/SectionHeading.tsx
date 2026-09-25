import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${centered ? 'text-center max-w-3xl mx-auto' : 'text-left'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-sm text-xs font-extrabold uppercase tracking-widest ${
          light 
            ? 'bg-trinex-gold/20 text-trinex-gold border border-trinex-gold/30' 
            : 'gold-badge'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-trinex-gold animate-pulse"></span>
          {badge}
        </div>
      )}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
        light ? 'text-trinex-dark' : 'text-white'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm sm:text-base leading-relaxed ${
          light ? 'text-slate-600' : 'text-slate-400'
        }`}>
          {subtitle}
        </p>
      )}
      <div className={`pt-2 flex items-center gap-1.5 ${centered ? 'justify-center' : 'justify-start'}`}>
        <span className="h-0.5 w-12 bg-trinex-gold"></span>
        <span className="h-1.5 w-1.5 rounded-full bg-trinex-gold"></span>
        <span className="h-0.5 w-6 bg-trinex-gold/40"></span>
      </div>
    </div>
  );
};
