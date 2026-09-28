import React, { useState } from 'react';
import { GoogleMap } from '../components/GoogleMap';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Youtube, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench, 
  ArrowUpRight,
  MessageCircle 
} from 'lucide-react';
import { enquiryStore } from '../services/enquiryStore';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    requirementType: 'Sales Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    enquiryStore.addEnquiry({
      name: formData.fullName,
      phone: formData.phone,
      company: formData.companyName,
      city: 'Hyderabad',
      productName: formData.requirementType,
      message: `${formData.requirementType}: ${formData.message} (Email: ${formData.email})`,
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      'Hello Trinex Equipment, I would like to get in touch regarding commercial kitchen equipment solutions.'
    );
    window.open(`https://wa.me/919030847474?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-trinex-light-gray border-b border-trinex-border py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-trinex-border shadow-xs text-trinex-red text-xs font-black uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Showroom & Corporate Contact</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-trinex-black uppercase tracking-tight">
            Connect With Trinex Equipment
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
            QUALITY • RELIABILITY • PERFORMANCE
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Helplines & Location */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
                Direct Contact
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-trinex-black uppercase tracking-tight">
                Our Showroom & Hub
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Visit our equipment demonstration showroom in Ameerpet to inspect operational commercial induction units and heavy-duty cooking equipment.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Address Box */}
              <div className="p-4 rounded-xl border border-trinex-border bg-trinex-light-gray space-y-2">
                <div className="flex items-center gap-2 text-trinex-red font-bold uppercase tracking-wider text-[11px]">
                  <MapPin className="w-4 h-4" />
                  <span>Showroom Address</span>
                </div>
                <p className="text-sm font-semibold text-trinex-black leading-relaxed">
                  Ground Floor, Swathi Manors,<br />
                  Mythrivanam Road, Ameerpet,<br />
                  Hyderabad, Telangana - 500082
                </p>
              </div>

              {/* Hours Box */}
              <div className="p-4 rounded-xl border border-trinex-border bg-trinex-light-gray space-y-2">
                <div className="flex items-center gap-2 text-trinex-red font-bold uppercase tracking-wider text-[11px]">
                  <Clock className="w-4 h-4" />
                  <span>Business Working Hours</span>
                </div>
                <p className="text-sm font-bold text-trinex-black">
                  Monday – Saturday: 10:00 AM – 7:00 PM
                </p>
                <p className="text-gray-500">Sunday: Closed</p>
              </div>

              {/* Helplines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-trinex-border bg-white shadow-subtle space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Sales Inquiries</span>
                  <a href="tel:9030847474" className="text-sm font-black text-trinex-black hover:text-trinex-red flex items-center gap-1.5 transition-colors">
                    <Phone className="w-4 h-4 text-trinex-red" />
                    <span>9030847474</span>
                  </a>
                </div>

                <div className="p-4 rounded-xl border border-trinex-border bg-white shadow-subtle space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Service & Spares</span>
                  <a href="tel:9030467676" className="text-sm font-black text-trinex-black hover:text-trinex-red flex items-center gap-1.5 transition-colors">
                    <Wrench className="w-4 h-4 text-trinex-red" />
                    <span>9030467676</span>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-trinex-border bg-white shadow-subtle space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Official Email</span>
                <a href="mailto:trinexequipment@gmail.com" className="text-xs font-bold text-trinex-black hover:text-trinex-red flex items-center gap-2">
                  <Mail className="w-4 h-4 text-trinex-red" />
                  <span>trinexequipment@gmail.com</span>
                </a>
              </div>

              {/* Quick WhatsApp Action */}
              <button
                onClick={handleWhatsAppChat}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </button>

            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="border border-trinex-border rounded-2xl p-6 sm:p-10 bg-white shadow-card space-y-6">
              
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
                  Inquiry Form
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-trinex-black">
                  Send a Message to Trinex
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  We respond promptly with commercial pricing, catalog specification sheets, and project consultation.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-red-50 text-trinex-red rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-trinex-black">
                    Inquiry Received!
                  </h4>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    Thank you, <strong className="text-trinex-black">{formData.fullName}</strong>. Our team will contact you at {formData.phone} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        phone: '',
                        email: '',
                        requirementType: 'Sales Inquiry',
                        message: '',
                      });
                    }}
                    className="inline-flex px-4 py-2 rounded bg-trinex-black text-white text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Name <span className="text-trinex-red">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Mobile Number <span className="text-trinex-red">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        title="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Company / Restaurant Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Royal Kitchens, Cloud Foods"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@business.com"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Inquiry Nature
                    </label>
                    <select
                      value={formData.requirementType}
                      onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red bg-white"
                    >
                      <option value="Sales Inquiry">Commercial Equipment Sales</option>
                      <option value="Induction Inquiry">Commercial Induction Solutions</option>
                      <option value="Service Inquiry">Equipment Service & Repair</option>
                      <option value="Spares Inquiry">Spare Parts Procurement</option>
                      <option value="Turnkey Project">New Kitchen Setup / Commercial Planning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Message / Equipment Specifications
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify requirements, kitchen size, or models of interest..."
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting...' : 'Send Inquiry Message'}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* Google Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-trinex-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="bg-trinex-light-gray p-4 border-b border-trinex-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-trinex-red" />
              <span className="text-xs font-bold text-trinex-black">
                Ameerpet Showroom Location Map
              </span>
            </div>
            <a
              href="https://maps.google.com/?q=Ground+Floor+Swathi+Manors+Mythrivanam+Road+Ameerpet+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-trinex-red hover:underline flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <GoogleMap />
        </div>
      </section>

    </div>
  );
};
