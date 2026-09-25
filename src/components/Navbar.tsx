import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Clock, MapPin, Menu, X, ArrowRight, Wrench } from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'SERVICES', path: '/services' },
    { name: 'SPARES', path: '/spares' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Top Utility Notification Bar */}
      <div className="bg-trinex-dark border-b border-trinex-gold/20 text-xs py-2 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left info items */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 hover:text-trinex-gold transition-colors">
              <MapPin className="w-3.5 h-3.5 text-trinex-gold flex-shrink-0" />
              <span>Showroom: Ameerpet, Hyderabad</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-trinex-gold flex-shrink-0" />
              <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
            </div>
          </div>

          {/* Right contact shortcuts */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a 
              href="tel:9030847474" 
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-trinex-navy border border-trinex-gold/30 hover:border-trinex-gold text-slate-100 hover:text-trinex-gold transition-all"
            >
              <Phone className="w-3 h-3 text-trinex-gold" />
              <span>Sales: <strong className="text-white">9030847474</strong></span>
            </a>
            <a 
              href="tel:9030467676" 
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-trinex-navy border border-trinex-gold/30 hover:border-trinex-gold text-slate-100 hover:text-trinex-gold transition-all"
            >
              <Wrench className="w-3 h-3 text-trinex-gold" />
              <span>Service: <strong className="text-white">9030467676</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Sticky Navbar */}
      <nav 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-trinex-dark/98 backdrop-blur-md shadow-2xl border-b border-trinex-gold/30 py-2.5' 
            : 'bg-trinex-dark py-3.5 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Clean Official Logo Display without Duplicate Text */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img 
              src="/assets/logo/trinex_official_logo.png" 
              alt="Trinex Equipment Pvt Ltd" 
              className="h-10 sm:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 text-xs font-bold tracking-wider transition-all duration-200 relative ${
                    active 
                      ? 'text-trinex-gold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-trinex-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark font-extrabold text-xs px-5 py-2.5 rounded-sm uppercase tracking-wider shadow-lg hover:shadow-gold-glow transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="gold-gradient-bg text-trinex-dark font-extrabold text-xs px-3 py-1.5 rounded-sm uppercase tracking-wider"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-slate-300 hover:text-white hover:bg-trinex-navy border border-trinex-gold/20 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-trinex-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-trinex-navy/98 border-b border-trinex-gold/30 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn">
            <div className="flex flex-col space-y-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded text-sm font-bold tracking-widest transition-colors flex items-center justify-between ${
                    isActive(link.path)
                      ? 'bg-trinex-dark text-trinex-gold border-l-4 border-trinex-gold'
                      : 'text-slate-200 hover:bg-trinex-dark hover:text-trinex-gold'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
                <a 
                  href="tel:9030847474"
                  className="bg-trinex-dark py-2.5 px-3 rounded border border-trinex-gold/30 text-slate-200 flex flex-col items-center justify-center gap-1"
                >
                  <Phone className="w-4 h-4 text-trinex-gold" />
                  <span>Sales: 9030847474</span>
                </a>
                <a 
                  href="tel:9030467676"
                  className="bg-trinex-dark py-2.5 px-3 rounded border border-trinex-gold/30 text-slate-200 flex flex-col items-center justify-center gap-1"
                >
                  <Wrench className="w-4 h-4 text-trinex-gold" />
                  <span>Service: 9030467676</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full gold-gradient-bg text-trinex-dark font-extrabold text-xs py-3 rounded uppercase tracking-widest text-center shadow-lg"
              >
                Request Commercial Quote
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
