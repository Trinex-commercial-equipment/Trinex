import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Search, Menu, X, MessageCircle, MapPin, Clock, Wrench } from 'lucide-react';
import { SearchModal } from './SearchModal';

interface NavbarProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Spares', path: '/spares' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleWhatsAppGeneral = () => {
    const text = encodeURIComponent(
      'Hello Trinex Equipment, I am looking for commercial kitchen equipment solutions. Please share product catalogues and pricing.'
    );
    window.open(`https://wa.me/919030847474?text=${text}`, '_blank');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-200">
        
        {/* Top Micro Bar (Deep Corporate Slate Navy) */}
        <div className="bg-[#0B1320] text-slate-300 text-[11px] py-1.5 px-4 hidden md:block border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-trinex-gold flex-shrink-0" />
                <span>Showroom: Ameerpet, Hyderabad</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
              </span>
            </div>

            <div className="flex items-center gap-5 font-semibold">
              <a
                href="tel:9030847474"
                className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
              >
                <Phone className="w-3 h-3 text-trinex-gold" />
                <span>Sales:</span>
                <span className="text-white font-bold">9030847474</span>
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="tel:9030467676"
                className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
              >
                <Wrench className="w-3 h-3 text-trinex-gold" />
                <span>Service:</span>
                <span className="text-white font-bold">9030467676</span>
              </a>
            </div>
          </div>
        </div>

        {/* Primary Navbar */}
        <nav
          className={`w-full bg-white transition-all duration-200 border-b ${
            isScrolled
              ? 'py-2 shadow-card border-slate-200'
              : 'py-2.5 sm:py-3 border-slate-200'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 group py-0.5">
              <img
                src="/assets/logo/trinex_official_logo.png"
                alt="Trinex Equipment Pvt Ltd"
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-bold tracking-tight transition-colors duration-150 py-1 relative ${
                      active
                        ? 'text-trinex-navy font-black'
                        : 'text-slate-600 hover:text-trinex-navy'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-trinex-red rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Icon Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-slate-600 hover:text-trinex-navy hover:bg-slate-100 transition-colors"
                title="Search products"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Call Now */}
              <a
                href="tel:9030847474"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-trinex-red" />
                <span>Call Sales</span>
              </a>

              {/* Get Quote */}
              <button
                onClick={() => onOpenQuoteModal()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-trinex-red hover:bg-trinex-red-dark text-white shadow-sm transition-all"
              >
                <span>Get Quote</span>
              </button>
            </div>

            {/* Mobile Header Right Icons */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-slate-700 hover:text-trinex-red"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={handleWhatsAppGeneral}
                className="p-2 text-emerald-600 hover:text-emerald-700"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-800 hover:text-trinex-red focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150">
              <div className="divide-y divide-slate-100">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 text-base font-bold ${
                        active ? 'text-trinex-red' : 'text-slate-800 hover:text-trinex-red'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="pt-3 space-y-2.5">
                <a
                  href="tel:9030847474"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm bg-slate-100 text-slate-900 border border-slate-200"
                >
                  <Phone className="w-4 h-4 text-trinex-red" />
                  <span>Call Sales: 9030847474</span>
                </a>

                <button
                  onClick={handleWhatsAppGeneral}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get Quote on WhatsApp</span>
                </button>
              </div>

              <div className="pt-2 text-center text-xs text-slate-500">
                <p>Commercial Kitchen Equipment Sales • Service • Spares</p>
                <p className="font-semibold text-slate-800 mt-0.5">Showroom: Ameerpet, Hyderabad</p>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </>
  );
};
