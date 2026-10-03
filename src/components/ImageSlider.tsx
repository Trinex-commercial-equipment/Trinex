import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from '../types/product';

interface ImageSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
  className?: string;
  showCaptions?: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  slides,
  autoPlayInterval = 4500,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const navigate = useNavigate();

  // Reset index if slides change
  useEffect(() => {
    if (currentIndex >= slides.length) {
      setCurrentIndex(0);
    }
  }, [slides, currentIndex]);

  // Autoplay timer
  useEffect(() => {
    if (!slides || slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides, autoPlayInterval, isPaused]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left -> next slide
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev slide
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = slides[currentIndex];

  const handleSlideClick = (slide: HeroSlide) => {
    if (slide.link) {
      if (slide.link.startsWith('http')) {
        window.open(slide.link, '_blank');
      } else {
        navigate(slide.link);
      }
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden select-none group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-card bg-slate-950 flex items-center justify-center">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              onClick={() => handleSlideClick(slide)}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out cursor-pointer flex items-center justify-center bg-slate-950 ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Background Image - 100% full view with NO cutting/cropping */}
              <img
                src={slide.image}
                alt={slide.title || `Trinex equipment banner ${index + 1}`}
                className="w-full h-full object-contain object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Prev & Next Arrow Controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-xs border border-white/20 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 shadow-md"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-xs border border-white/20 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 shadow-md"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Dots Pagination Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2">
            {slides.map((_, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all rounded-full ${
                    active
                      ? 'w-6 sm:w-8 h-2 bg-trinex-red shadow-sm'
                      : 'w-2 h-2 bg-white/60 hover:bg-white'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
