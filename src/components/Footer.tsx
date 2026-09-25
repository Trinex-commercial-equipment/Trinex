import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, ArrowUpRight, ShieldCheck, Wrench, PackageCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-trinex-dark text-slate-300 border-t-2 border-trinex-gold/40 relative pt-16 pb-8 overflow-hidden">
      {/* Background Decorative Metallic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-trinex-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-trinex-navy rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/logo/trinex_official_logo.png" 
                alt="Trinex Equipment Pvt Ltd" 
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-xs font-bold tracking-widest text-trinex-gold-light uppercase border-l-2 border-trinex-gold pl-3 py-1">
              QUALITY. RELIABILITY. PERFORMANCE.
            </p>

            <p className="text-xs leading-relaxed text-slate-400">
              Commercial kitchen equipment sales, technical service, and genuine spare parts support for restaurants, hotels, bakeries, cloud kitchens, and catering facilities across Telangana & Andhra Pradesh.
            </p>

            {/* Pillar badges */}
            <div className="flex items-center gap-2 pt-1 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-trinex-navy border border-trinex-gold/30 text-slate-200 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-trinex-gold" /> Sales
              </span>
              <span className="px-2.5 py-1 rounded bg-trinex-navy border border-trinex-gold/30 text-slate-200 font-semibold flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-trinex-gold" /> Service
              </span>
              <span className="px-2.5 py-1 rounded bg-trinex-navy border border-trinex-gold/30 text-slate-200 font-semibold flex items-center gap-1">
                <PackageCheck className="w-3.5 h-3.5 text-trinex-gold" /> Spares
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider text-white uppercase border-b border-trinex-gold/30 pb-2 inline-block">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/" className="text-slate-400 hover:text-trinex-gold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-gold/60" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-trinex-gold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-gold/60" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-trinex-gold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-gold/60" /> Equipment Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-trinex-gold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-gold/60" /> Technical Services
                </Link>
              </li>
              <li>
                <Link to="/spares" className="text-slate-400 hover:text-trinex-gold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-gold/60" /> Spare Parts Catalog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-trinex-gold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-gold/60" /> Contact & Showroom
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider text-white uppercase border-b border-trinex-gold/30 pb-2 inline-block">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <span className="text-[10px] uppercase font-bold text-trinex-gold tracking-widest block">Sales Helpline</span>
                <a href="tel:9030847474" className="text-sm font-extrabold text-white hover:text-trinex-gold flex items-center gap-2 transition-colors">
                  <Phone className="w-4 h-4 text-trinex-gold" />
                  <span>9030847474</span>
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase font-bold text-trinex-gold tracking-widest block">Service Support</span>
                <a href="tel:9030467676" className="text-sm font-extrabold text-white hover:text-trinex-gold flex items-center gap-2 transition-colors">
                  <Wrench className="w-4 h-4 text-trinex-gold" />
                  <span>9030467676</span>
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase font-bold text-trinex-gold tracking-widest block">Official Email</span>
                <a href="mailto:trinexequipment@gmail.com" className="text-xs font-semibold text-slate-300 hover:text-trinex-gold flex items-center gap-2 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-trinex-gold" />
                  <span>trinexequipment@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Showroom & Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider text-white uppercase border-b border-trinex-gold/30 pb-2 inline-block">
              Showroom Location
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-trinex-gold flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Ground Floor, Swathi Manors,<br />
                  Mythrivanam Road, Ameerpet,<br />
                  Hyderabad, Telangana - 500082
                </p>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-trinex-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Mon – Sat: 10:00 AM – 7:00 PM</p>
                  <p className="text-slate-400 text-[11px]">Sunday: Closed</p>
                </div>
              </div>

              {/* Social Channels (Official Only) */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-trinex-gold tracking-widest block mb-2">Connect With Us</span>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://www.instagram.com/trinexequipment" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-trinex-navy border border-trinex-gold/30 hover:border-trinex-gold text-slate-200 hover:text-trinex-gold transition-all flex items-center gap-1.5 text-xs font-semibold"
                    aria-label="Instagram @trinexequipment"
                  >
                    <Instagram className="w-4 h-4 text-trinex-gold" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                  <a 
                    href="https://www.youtube.com/@TRINEX-EQUIPMENT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-trinex-navy border border-trinex-gold/30 hover:border-trinex-gold text-slate-200 hover:text-trinex-gold transition-all flex items-center gap-1.5 text-xs font-semibold"
                    aria-label="YouTube @TRINEX-EQUIPMENT"
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>YouTube</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 Trinex Equipment Pvt Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors">Commercial Kitchen Solutions</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">Ameerpet, Hyderabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
