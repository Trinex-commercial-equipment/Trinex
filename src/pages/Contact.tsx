import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { GoogleMap } from '../components/GoogleMap';
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, Send, CheckCircle2, ShieldCheck, Wrench, Building2, User, PhoneCall, MessageSquare, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    requirementType: 'Sales Inquiry',
    preferredContact: 'Call',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company / Establishment name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="space-y-16 py-8">
      
      {/* Header Banner */}
      <section className="bg-trinex-navy py-12 border-b border-trinex-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-trinex-dark border border-trinex-gold/30 text-trinex-gold text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-4 h-4" />
            <span>Showroom & Corporate Contact</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
            Let's Build Your Professional Kitchen
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            Reach out to our sales engineering team or visit our equipment showroom in Ameerpet, Hyderabad.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info Cards & Quote Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold text-trinex-gold uppercase tracking-widest bg-trinex-navy px-3 py-1 rounded border border-trinex-gold/30">
                Direct Touchpoints
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                Get in Touch With Us
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect with our sales specialists, technical service department, or spare parts desk.
              </p>
            </div>

            {/* Contact Blocks */}
            <div className="space-y-4 text-xs">
              
              {/* Sales Card */}
              <div className="bg-trinex-navy border border-trinex-gold/30 p-5 rounded-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-trinex-dark border border-trinex-gold/40 flex items-center justify-center text-trinex-gold flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-trinex-gold uppercase tracking-widest block">Equipment Sales Helpline</span>
                  <a href="tel:9030847474" className="text-xl font-black text-white hover:text-trinex-gold transition-colors block mt-0.5 font-display">
                    9030847474
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">For quotes, equipment sizing, and commercial inquiries.</p>
                </div>
              </div>

              {/* Service Card */}
              <div className="bg-trinex-navy border border-trinex-gold/30 p-5 rounded-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-trinex-dark border border-trinex-gold/40 flex items-center justify-center text-trinex-gold flex-shrink-0">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-trinex-gold uppercase tracking-widest block">Technical Service Support</span>
                  <a href="tel:9030467676" className="text-xl font-black text-white hover:text-trinex-gold transition-colors block mt-0.5 font-display">
                    9030467676
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">For equipment maintenance, service calls, and repairs.</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-trinex-navy border border-trinex-gold/20 p-5 rounded-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-trinex-dark border border-trinex-gold/30 flex items-center justify-center text-trinex-gold flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-trinex-gold uppercase tracking-widest block">Official Email</span>
                  <a href="mailto:trinexequipment@gmail.com" className="text-sm font-bold text-white hover:text-trinex-gold transition-colors block mt-0.5">
                    trinexequipment@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">Send floor plans, RFP documents, or tender inquiries.</p>
                </div>
              </div>

              {/* Showroom Address */}
              <div className="bg-trinex-navy border border-trinex-gold/20 p-5 rounded-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-trinex-dark border border-trinex-gold/30 flex items-center justify-center text-trinex-gold flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-trinex-gold uppercase tracking-widest block">Showroom Address</span>
                  <p className="text-xs font-bold text-white leading-relaxed mt-1">
                    Ground Floor, Swathi Manors,<br />
                    Mythrivanam Road, Ameerpet,<br />
                    Hyderabad, Telangana - 500082
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-trinex-navy border border-trinex-gold/20 p-5 rounded-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-trinex-dark border border-trinex-gold/30 flex items-center justify-center text-trinex-gold flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-trinex-gold uppercase tracking-widest block">Business Operating Hours</span>
                  <p className="text-xs font-bold text-white mt-1">Monday – Saturday: 10:00 AM – 7:00 PM</p>
                  <p className="text-xs text-slate-400">Sunday: Closed</p>
                </div>
              </div>

            </div>

            {/* Social Accounts */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-trinex-gold tracking-widest block mb-3">Official Social Media</span>
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="https://www.instagram.com/trinexequipment" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded bg-trinex-navy border border-trinex-gold/30 hover:border-trinex-gold text-slate-200 hover:text-trinex-gold transition-all flex items-center justify-between text-xs font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-trinex-gold" />
                    <span>Instagram</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>

                <a 
                  href="https://www.youtube.com/@TRINEX-EQUIPMENT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded bg-trinex-navy border border-trinex-gold/30 hover:border-trinex-gold text-slate-200 hover:text-trinex-gold transition-all flex items-center justify-between text-xs font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>YouTube</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quote / Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-trinex-navy border-2 border-trinex-gold/40 rounded-sm p-6 sm:p-8 shadow-card-dark relative overflow-hidden">
              <div className="h-1.5 w-full gold-gradient-bg absolute top-0 left-0" />

              <div className="mb-6 space-y-1">
                <span className="text-[10px] font-extrabold text-trinex-gold uppercase tracking-widest">
                  Direct B2B Communication
                </span>
                <h3 className="text-2xl font-black text-white font-display">
                  Commercial Equipment Inquiry Form
                </h3>
                <p className="text-xs text-slate-300">
                  Submit your commercial kitchen requirement details for rapid price quotes and technical consultation.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-trinex-gold/20 border-2 border-trinex-gold text-trinex-gold rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-white font-display">Inquiry Received</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you <strong className="text-white">{formData.fullName}</strong>. Your requirement for <strong className="text-trinex-gold">{formData.companyName}</strong> has been logged. Our commercial team will contact you via <strong className="text-white">{formData.preferredContact}</strong>.
                  </p>
                  <div className="pt-4 text-xs text-slate-400">
                    Need immediate assistance? Call Sales: <strong className="text-trinex-gold font-bold">9030847474</strong>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        phone: '',
                        email: '',
                        requirementType: 'Sales Inquiry',
                        preferredContact: 'Call',
                        message: '',
                      });
                    }}
                    className="mt-6 gold-gradient-bg text-trinex-dark font-extrabold text-xs px-8 py-3 rounded uppercase tracking-wider shadow"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                        Full Name <span className="text-trinex-gold">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="e.g. Ramesh Reddy"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full pl-9 pr-3 py-2.5 bg-trinex-dark border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold ${
                            errors.fullName ? 'border-red-500' : 'border-slate-700'
                          }`}
                        />
                      </div>
                      {errors.fullName && <p className="text-red-400 text-[10px] mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                        Company / Establishment <span className="text-trinex-gold">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="e.g. Grand Palace Caterers"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className={`w-full pl-9 pr-3 py-2.5 bg-trinex-dark border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold ${
                            errors.companyName ? 'border-red-500' : 'border-slate-700'
                          }`}
                        />
                      </div>
                      {errors.companyName && <p className="text-red-400 text-[10px] mt-1">{errors.companyName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                        Phone Number <span className="text-trinex-gold">*</span>
                      </label>
                      <div className="relative">
                        <PhoneCall className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="tel"
                          placeholder="e.g. 9030847474"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full pl-9 pr-3 py-2.5 bg-trinex-dark border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold ${
                            errors.phone ? 'border-red-500' : 'border-slate-700'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                        Email Address <span className="text-trinex-gold">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="email"
                          placeholder="name@restaurant.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full pl-9 pr-3 py-2.5 bg-trinex-dark border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold ${
                            errors.email ? 'border-red-500' : 'border-slate-700'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                        Requirement Type
                      </label>
                      <select
                        value={formData.requirementType}
                        onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
                        className="w-full px-3 py-2.5 bg-trinex-dark border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-trinex-gold"
                      >
                        <option value="Sales Inquiry">Equipment Purchase / Pricing Quote</option>
                        <option value="Service & Repairs">Technical Service / Machine Repair</option>
                        <option value="Spare Parts">Spare Parts Requirement</option>
                        <option value="Complete Setup">Turnkey Commercial Kitchen Setup</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                        Preferred Contact Method
                      </label>
                      <select
                        value={formData.preferredContact}
                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                        className="w-full px-3 py-2.5 bg-trinex-dark border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-trinex-gold"
                      >
                        <option value="Call">Phone Call</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Email">Email</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                      Requirement Details & Equipment List
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <textarea
                        rows={4}
                        placeholder="Detail your kitchen equipment requirements, expected meal capacity, or technical questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-trinex-dark border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark font-extrabold text-sm py-3.5 rounded uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-4"
                  >
                    {loading ? (
                      <span>Processing Submission...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Request a Quote</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Showroom Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <GoogleMap />
      </section>

    </div>
  );
};
