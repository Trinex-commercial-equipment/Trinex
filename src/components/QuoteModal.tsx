import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, MessageCircle, Send } from 'lucide-react';
import { enquiryStore } from '../services/enquiryStore';

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
    name: '',
    phone: '',
    company: '',
    city: 'Hyderabad',
    requirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        company: '',
        city: 'Hyderabad',
        requirements: productContext ? `Inquiry regarding: ${productContext}` : '',
      });
    }
  }, [isOpen, productContext]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Record into enquiry store
    enquiryStore.addEnquiry({
      name: formData.name,
      phone: formData.phone,
      company: formData.company,
      city: formData.city,
      productName: productContext || 'General Equipment Inquiry',
      message: formData.requirements,
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello Trinex Equipment,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nCompany: ${formData.company || 'N/A'}\nCity: ${formData.city}\nRequirements: ${formData.requirements || productContext || 'Request for quote'}\n\nPlease share official pricing and technical details.`
    );
    window.open(`https://wa.me/919030847474?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-lg rounded-lg shadow-2xl border border-trinex-border overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-trinex-black px-6 py-4 flex items-center justify-between text-white">
          <div>
            <span className="text-[10px] font-bold text-trinex-red uppercase tracking-wider block">
              Trinex Equipment Pvt Ltd
            </span>
            <h3 className="text-lg font-bold">Request Equipment Quote</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-red-50 text-trinex-red rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-trinex-black">
                Quote Request Received!
              </h4>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Thank you, <strong className="text-trinex-black">{formData.name}</strong>. Our sales team will contact you shortly with availability and pricing.
              </p>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant Follow-up on WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {productContext && (
                <div className="p-3 rounded bg-red-50 border border-red-100 text-xs">
                  <span className="font-bold text-trinex-red uppercase tracking-wider block mb-0.5">Selected Equipment</span>
                  <span className="font-bold text-trinex-black">{productContext}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Name <span className="text-trinex-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Mobile Number <span className="text-trinex-red">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone"
                    className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Business / Hotel Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Restaurant, Hotel, Cloud Kitchen"
                    className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Hyderabad, Secunderabad, etc."
                    className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Equipment Requirements / Message
                </label>
                <textarea
                  name="requirements"
                  rows={3}
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Tell us what equipment capacity or specifications you need..."
                  className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 py-3 px-4 rounded bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Submit Quote Request'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="w-full sm:w-auto py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <div className="pt-2 text-center text-xs text-gray-400">
                Direct Sales: <a href="tel:9030847474" className="text-trinex-red font-bold hover:underline">9030847474</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
