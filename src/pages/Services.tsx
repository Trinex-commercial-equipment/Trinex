import React, { useState } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone, 
  AlertCircle, 
  Check, 
  Send 
} from 'lucide-react';
import { enquiryStore } from '../services/enquiryStore';

interface ServicesProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuoteModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    businessName: '',
    city: 'Hyderabad',
    serviceRequired: 'Repair' as 'Installation' | 'Repair' | 'Preventive Maintenance' | 'Spare Parts' | 'Other',
    equipmentBrandModel: '',
    describeIssue: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    enquiryStore.addServiceRequest({
      name: formData.name,
      mobile: formData.mobile,
      businessName: formData.businessName,
      city: formData.city,
      serviceRequired: formData.serviceRequired,
      equipmentBrandModel: formData.equipmentBrandModel,
      describeIssue: formData.describeIssue,
    });

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="bg-white min-h-screen py-10 space-y-16">
      
      {/* Hero Section */}
      <section className="bg-trinex-light-gray border-b border-trinex-border py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-trinex-border shadow-xs text-trinex-red text-xs font-black uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Core Technical Pillar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-trinex-black uppercase tracking-tight">
            Professional Kitchen Equipment Service
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Trinex Equipment Pvt. Ltd., service is one of our three core pillars. With 15 years of experience in the professional kitchen equipment industry, we provide reliable installation, repair, and spare parts support to keep your kitchen running without interruptions.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs font-bold">
            <span className="text-gray-500">Service Helpline:</span>
            <a href="tel:9030467676" className="text-trinex-red hover:underline flex items-center gap-1.5 text-sm font-black">
              <Phone className="w-4 h-4" />
              <span>9030467676</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content & Service Request Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Service Details & Coverage */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Service Expertise */}
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
                Technical Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-trinex-black uppercase tracking-tight">
                Our Service Expertise
              </h2>
              <ul className="space-y-3 pt-2">
                {[
                  '15+ years of experience in professional kitchen equipment service.',
                  'Specialized in servicing imported commercial cooking equipment.',
                  'Spare parts procurement for imported kitchen equipment.',
                  'Installation and commissioning of commercial kitchen equipment.',
                  'Preventive maintenance and breakdown repairs.',
                  'Support for restaurants, hotels, cloud kitchens, catering units, and food courts.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-trinex-red flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Coverage */}
            <div className="border border-trinex-border rounded-xl p-6 bg-trinex-light-gray space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-trinex-black flex items-center gap-2">
                <MapPin className="w-4 h-4 text-trinex-red" />
                <span>Service Coverage Regions</span>
              </h3>
              <p className="text-xs text-gray-600">
                We provide on-site technical maintenance and emergency breakdown dispatch across:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-white p-3 rounded-lg border border-gray-200 text-center font-bold text-xs text-trinex-black">
                  Telangana
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 text-center font-bold text-xs text-trinex-black">
                  Andhra Pradesh
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 text-center font-bold text-xs text-trinex-black">
                  Bengaluru Region
                </div>
              </div>
            </div>

            {/* Dedicated Service Team */}
            <div className="border border-trinex-border rounded-xl p-6 bg-white space-y-3 shadow-subtle">
              <h3 className="text-sm font-black uppercase tracking-wider text-trinex-black flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-trinex-red" />
                <span>Dedicated Technical Service Team</span>
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-trinex-red flex-shrink-0" />
                  <span>Quick response and dedicated technical support</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-trinex-red flex-shrink-0" />
                  <span>Genuine and compatible spare parts</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-trinex-red flex-shrink-0" />
                  <span>Long-term after-sales support</span>
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Service Request Form */}
          <div className="lg:col-span-5">
            <div className="border border-trinex-border rounded-2xl p-6 sm:p-8 bg-white shadow-card space-y-6 sticky top-24">
              
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-trinex-red block mb-1">
                  Online Booking
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-trinex-black">
                  Request Service
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Submit your technical service ticket or call our service helpline directly.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-red-50 text-trinex-red rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-trinex-black">
                    Service Request Registered!
                  </h4>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto">
                    Our technical service coordinator will contact you at <strong className="text-trinex-black">{formData.mobile}</strong> to schedule an engineer visit.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        mobile: '',
                        businessName: '',
                        city: 'Hyderabad',
                        serviceRequired: 'Repair',
                        equipmentBrandModel: '',
                        describeIssue: '',
                      });
                    }}
                    className="inline-flex px-4 py-2 rounded bg-trinex-black text-white text-xs font-bold"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Name <span className="text-trinex-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Contact person name"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Number <span className="text-trinex-red">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      pattern="[0-9]{10}"
                      title="10 digit mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Business Name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Restaurant / Hotel"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        City <span className="text-trinex-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Hyderabad"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Service Required <span className="text-trinex-red">*</span>
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red bg-white"
                    >
                      <option value="Repair">Repair / Breakdown</option>
                      <option value="Installation">Installation & Commissioning</option>
                      <option value="Preventive Maintenance">Preventive Maintenance</option>
                      <option value="Spare Parts">Spare Parts Replacement</option>
                      <option value="Other">Other Technical Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Equipment Brand / Model
                    </label>
                    <input
                      type="text"
                      name="equipmentBrandModel"
                      value={formData.equipmentBrandModel}
                      onChange={handleChange}
                      placeholder="e.g. Trinex 3.5kW Cooktop, Rational Oven, etc."
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Describe the Issue
                    </label>
                    <textarea
                      name="describeIssue"
                      rows={3}
                      value={formData.describeIssue}
                      onChange={handleChange}
                      placeholder="Explain error codes, abnormal sounds, heating failure, etc."
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting...' : 'Submit Service Request'}</span>
                  </button>

                  <div className="pt-2 text-center text-xs text-gray-500">
                    Emergency Breakdown? Call <a href="tel:9030467676" className="text-trinex-red font-bold hover:underline">9030467676</a>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
