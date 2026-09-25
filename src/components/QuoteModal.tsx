import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, PhoneCall, Building2, User, Mail, MessageSquare } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productContext?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  productContext,
}) => {
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

  useEffect(() => {
    if (productContext) {
      setFormData(prev => ({
        ...prev,
        message: `I am interested in receiving technical details and commercial pricing for: ${productContext}.`
      }));
    }
  }, [productContext]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company / Restaurant name is required';
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
    // Simulate professional B2B form submission dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-trinex-dark border border-trinex-gold/40 rounded-sm shadow-card-dark w-full max-w-xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full gold-gradient-bg" />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-trinex-gold text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Trinex Commercial B2B Inquiry</span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
              {productContext ? `Quote for: ${productContext}` : 'Request a Commercial Quote'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-trinex-gold hover:bg-trinex-navy rounded transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-trinex-gold/20 border-2 border-trinex-gold text-trinex-gold rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-white">Requirement Received!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for contacting <strong className="text-trinex-gold">Trinex Equipment Pvt Ltd</strong>. Our commercial sales engineering team will review your specifications and get in touch via <strong className="text-white">{formData.preferredContact}</strong> shortly.
              </p>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-4 text-xs">
                <span className="text-slate-400">Sales Helpline: 9030847474</span>
                <span>•</span>
                <span className="text-slate-400">Service: 9030467676</span>
              </div>
              <button
                onClick={handleReset}
                className="mt-6 gold-gradient-bg text-trinex-dark font-extrabold text-xs px-8 py-3 rounded uppercase tracking-wider shadow-lg"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Row 1: Full Name & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                    Full Name <span className="text-trinex-gold">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 bg-trinex-navy border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold ${
                        errors.fullName ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-400 text-[10px] mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                    Company / Restaurant <span className="text-trinex-gold">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Royal Kitchens & Cafe"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 bg-trinex-navy border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold ${
                        errors.companyName ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.companyName && <p className="text-red-400 text-[10px] mt-1">{errors.companyName}</p>}
                </div>
              </div>

              {/* Row 2: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                    Phone Number <span className="text-trinex-gold">*</span>
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 bg-trinex-navy border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold ${
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
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 bg-trinex-navy border rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold ${
                        errors.email ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Row 3: Requirement Type & Preferred Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                    Requirement Category
                  </label>
                  <select
                    value={formData.requirementType}
                    onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-trinex-navy border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-trinex-gold"
                  >
                    <option value="Sales Inquiry">Equipment Sales Purchase</option>
                    <option value="Service & Repairs">Technical Service & Repair</option>
                    <option value="Spare Parts">Spare Parts Order</option>
                    <option value="Complete Kitchen Setup">Turnkey Commercial Kitchen Setup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                    Preferred Contact Method
                  </label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    className="w-full px-3 py-2.5 bg-trinex-navy border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-trinex-gold"
                  >
                    <option value="Call">Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                  Requirement Details / Message
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <textarea
                    rows={3}
                    placeholder="Describe your kitchen equipment requirement, capacity needed, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-trinex-navy border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-trinex-gold"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gold-gradient-bg hover:gold-gradient-bg-hover text-trinex-dark font-extrabold text-sm py-3.5 rounded uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Processing Submission...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Requirement Quote</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
