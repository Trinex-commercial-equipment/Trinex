import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, ArrowUpRight, ShieldCheck, Wrench, PackageCheck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-trinex-black text-gray-300 border-t-4 border-trinex-red relative pt-12 pb-16 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-gray-800">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white/95 hover:bg-white p-3 rounded-xl shadow-xs transition-all group">
              <img 
                src="/assets/logo/trinex_official_logo.png" 
                alt="Trinex Equipment Pvt Ltd" 
                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
            </Link>

            <p className="text-xs font-black tracking-widest text-trinex-red uppercase border-l-2 border-trinex-red pl-2.5 py-0.5">
              QUALITY. RELIABILITY. PERFORMANCE.
            </p>

            <p className="text-xs leading-relaxed text-gray-400">
              Commercial kitchen equipment sales, technical service, and genuine spare parts support for restaurants, hotels, bakeries, cloud kitchens, and catering facilities across Telangana & Andhra Pradesh.
            </p>

            {/* Pillar badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-gray-900 border border-gray-800 text-gray-200 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-trinex-red" /> Sales
              </span>
              <span className="px-2.5 py-1 rounded bg-gray-900 border border-gray-800 text-gray-200 font-semibold flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-trinex-red" /> Service
              </span>
              <span className="px-2.5 py-1 rounded bg-gray-900 border border-gray-800 text-gray-200 font-semibold flex items-center gap-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-trinex-red" /> Spares
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black tracking-wider text-white uppercase border-b border-gray-800 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-red" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-red" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-red" /> Products Catalogue
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-red" /> Technical Services
                </Link>
              </li>
              <li>
                <Link to="/spares" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-red" /> Spare Parts
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-trinex-red" /> Contact & Showroom
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-black tracking-wider text-white uppercase border-b border-gray-800 pb-2 inline-block">
              Helplines
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Sales Inquiries</span>
                <a href="tel:9030847474" className="text-sm font-black text-white hover:text-trinex-red flex items-center gap-2 transition-colors">
                  <Phone className="w-4 h-4 text-trinex-red" />
                  <span>9030847474</span>
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Technical Service & Spares</span>
                <a href="tel:9030467676" className="text-sm font-black text-white hover:text-trinex-red flex items-center gap-2 transition-colors">
                  <Wrench className="w-4 h-4 text-trinex-red" />
                  <span>9030467676</span>
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Official Email</span>
                <a href="mailto:trinexequipment@gmail.com" className="text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-trinex-red" />
                  <span>trinexequipment@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Showroom & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-black tracking-wider text-white uppercase border-b border-gray-800 pb-2 inline-block">
              Showroom Location
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-trinex-red flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Ground Floor, Swathi Manors,<br />
                  Mythrivanam Road, Ameerpet,<br />
                  Hyderabad, Telangana - 500082
                </p>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-trinex-red flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Mon – Sat: 10:00 AM – 7:00 PM</p>
                  <p className="text-gray-400 text-[11px]">Sunday: Closed</p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-2">Official Channels</span>
                <div className="flex items-center gap-2">
                  <a 
                    href="https://www.instagram.com/trinexequipment" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-gray-900 border border-gray-800 hover:border-trinex-red text-gray-200 hover:text-trinex-red transition-all flex items-center gap-1 text-xs"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5 text-trinex-red" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                  <a 
                    href="https://www.youtube.com/@TRINEX-EQUIPMENT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-gray-900 border border-gray-800 hover:border-trinex-red text-gray-200 hover:text-trinex-red transition-all flex items-center gap-1 text-xs"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-500" />
                    <span>YouTube</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-medium">
          <p>© 2026 TRINEX EQUIPMENT PVT LTD. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Ameerpet, Hyderabad</span>
            <span>•</span>
            <Link to="/admin" className="hover:text-gray-300 flex items-center gap-1 text-[11px]">
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
