import React, { useState, useEffect } from 'react';
import { 
  PackageCheck, 
  ShieldCheck, 
  Search, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Send, 
  Layers, 
  Wrench,
  Check
} from 'lucide-react';
import { sparesStore } from '../services/sparesStore';
import { enquiryStore } from '../services/enquiryStore';
import { SparePart } from '../types/product';
import { SpareCard } from '../components/SpareCard';

interface SparesProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const Spares: React.FC<SparesProps> = ({ onOpenQuoteModal }) => {
  const [spares, setSpares] = useState<SparePart[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    businessName: '',
    city: 'Hyderabad',
    equipmentBrand: '',
    equipmentModel: '',
    sparePartRequired: '',
    partNumber: '',
    additionalDetails: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const updateSpares = () => {
      setSpares(sparesStore.getAllSpares());
    };
    updateSpares();
    const unsub = sparesStore.subscribe(updateSpares);
    return () => unsub();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectSpareForEnquiry = (spare: SparePart) => {
    setFormData(prev => ({
      ...prev,
      sparePartRequired: spare.name,
      partNumber: spare.partNumber || '',
      equipmentBrand: 'Trinex / Compatible',
      equipmentModel: spare.compatibleEquipment || '',
    }));
    // Scroll to form smoothly
    const formEl = document.getElementById('spare-request-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    enquiryStore.addSpareRequest({
      name: formData.name,
      mobile: formData.mobile,
      businessName: formData.businessName,
      city: formData.city,
      equipmentBrand: formData.equipmentBrand,
      equipmentModel: formData.equipmentModel,
      sparePartRequired: formData.sparePartRequired,
      partNumber: formData.partNumber,
      additionalDetails: formData.additionalDetails,
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
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Spare Parts Division</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-trinex-black uppercase tracking-tight">
            Genuine & Compatible Spare Parts for Commercial Kitchen Equipment
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Trinex Equipment Pvt. Ltd., we understand that a single unavailable spare part can stop an entire kitchen operation. We supply genuine and compatible spare parts for both Indian-made and imported commercial kitchen equipment.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-bold">
            <a href="tel:9030467676" className="text-trinex-black hover:text-trinex-red flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-trinex-red" />
              <span>Parts Helpline: 9030467676</span>
            </a>
            <a href="mailto:trinexequipment@gmail.com" className="text-trinex-black hover:text-trinex-red flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-trinex-red" />
              <span>trinexequipment@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Categories We Supply Spares For & Why Choose Trinex */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
              Inventory Range
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-trinex-black uppercase tracking-tight">
              We Supply Spares For
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Commercial Induction Cooktops',
                'Imported Professional Cooking Equipment',
                'Ovens & Combi Ovens',
                'Fryers & Heating Elements',
                'Griddles & Hot Plates',
                'Food Preparation Equipment',
                'Tea & Coffee Equipment',
                'Kitchen Automation Equipment',
                'Other Commercial Kitchen Equipment'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-800">
                  <Check className="w-4 h-4 text-trinex-red flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 border border-trinex-border rounded-xl p-6 bg-trinex-light-gray space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
              Reliability Assurance
            </span>
            <h3 className="text-lg font-black text-trinex-black">
              Why Choose Trinex For Spares?
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="bg-white p-3.5 rounded-lg border border-gray-200">
                <strong className="text-trinex-black block text-sm mb-1">Indian & Imported Brands</strong>
                <p className="text-gray-600">Extensive procurement network for rare and imported commercial components.</p>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-gray-200">
                <strong className="text-trinex-black block text-sm mb-1">Correct Part Identification</strong>
                <p className="text-gray-600">Technical engineer validation to ensure exact wattage, dimensions, and electrical match.</p>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-gray-200">
                <strong className="text-trinex-black block text-sm mb-1">Fast Procurement</strong>
                <p className="text-gray-600">Minimized downtime with express dispatch across Telangana, AP & Bengaluru.</p>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-gray-200">
                <strong className="text-trinex-black block text-sm mb-1">Technical Support</strong>
                <p className="text-gray-600">Installation guidance and diagnosis support by our 15+ years experienced service crew.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Manageable Spares Inventory Display (Controlled via Admin) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-trinex-border pb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
              Catalog Items
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-trinex-black uppercase tracking-tight">
              Featured Replacement Spares
            </h2>
          </div>
          <span className="text-xs font-semibold text-gray-500">
            {spares.length} Item{spares.length !== 1 ? 's' : ''} Listed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spares.map((spare) => (
            <SpareCard
              key={spare.id}
              spare={spare}
              onOpenQuoteModal={onOpenQuoteModal}
              onSelectForEnquiry={handleSelectSpareForEnquiry}
            />
          ))}
        </div>
      </section>

      {/* Spare Request Form */}
      <section id="spare-request-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-trinex-border rounded-2xl p-6 sm:p-10 bg-trinex-light-gray shadow-card space-y-6">
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-trinex-red block">
              Direct Parts Enquiry
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-trinex-black">
              Request Spare Parts
            </h2>
            <p className="text-xs text-gray-600">
              Provide equipment brand, model, and required spare details for accurate identification.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4 bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-14 h-14 bg-red-50 text-trinex-red rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-trinex-black">
                Spare Request Submitted!
              </h4>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Our spare parts division has received your inquiry for <strong className="text-trinex-black">{formData.sparePartRequired}</strong>. We will confirm stock and pricing promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    mobile: '',
                    businessName: '',
                    city: 'Hyderabad',
                    equipmentBrand: '',
                    equipmentModel: '',
                    sparePartRequired: '',
                    partNumber: '',
                    additionalDetails: '',
                  });
                }}
                className="inline-flex px-4 py-2 rounded bg-trinex-black text-white text-xs font-bold"
              >
                Submit Another Spare Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 text-left">
              
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
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
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
                    title="10 digit phone number"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Restaurant / Hotel Name"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
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
                    placeholder="e.g. Hyderabad, Vijayawada"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Equipment Brand <span className="text-trinex-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="equipmentBrand"
                    required
                    value={formData.equipmentBrand}
                    onChange={handleChange}
                    placeholder="e.g. Trinex, Rational, Unox, Electrolux"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Equipment Model
                  </label>
                  <input
                    type="text"
                    name="equipmentModel"
                    value={formData.equipmentModel}
                    onChange={handleChange}
                    placeholder="e.g. 3.5 kW Flat Model, 10-tray combi"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Spare Part Required <span className="text-trinex-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="sparePartRequired"
                    required
                    value={formData.sparePartRequired}
                    onChange={handleChange}
                    placeholder="e.g. Ceramic glass plate, coil, thermostat"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Part Number (If known)
                  </label>
                  <input
                    type="text"
                    name="partNumber"
                    value={formData.partNumber}
                    onChange={handleChange}
                    placeholder="e.g. TRX-IND-GLS-35"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Additional Details / Photo Description
                </label>
                <textarea
                  name="additionalDetails"
                  rows={2}
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  placeholder="Include any dimensions, voltage specifications, or symptoms..."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-gray-300 focus:outline-none focus:border-trinex-red resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit Spare Request'}</span>
              </button>

              <div className="pt-2 text-center text-xs text-gray-500">
                Direct Parts Helpline: <a href="tel:9030467676" className="text-trinex-red font-bold hover:underline">9030467676</a> | Email: <a href="mailto:trinexequipment@gmail.com" className="text-trinex-black font-semibold">trinexequipment@gmail.com</a>
              </div>

            </form>
          )}

        </div>
      </section>

    </div>
  );
};
