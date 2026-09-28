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
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${centered ? 'text-center max-w-3xl mx-auto' : 'text-left'} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-50 border border-red-100 text-trinex-red text-xs font-black uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-trinex-red animate-pulse" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-trinex-black uppercase tracking-tight font-display">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
