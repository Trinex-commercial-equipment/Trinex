import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle, 
  ArrowLeft,
  Share2,
  PackageCheck,
  Wrench,
  Check,
  Send,
  Layers,
  Sparkles,
  Truck
} from 'lucide-react';
import { sparesStore } from '../services/sparesStore';
import { enquiryStore } from '../services/enquiryStore';
import { SparePart } from '../types/product';
import { SpareCard } from '../components/SpareCard';

interface SpareDetailProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const SpareDetail: React.FC<SpareDetailProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [spare, setSpare] = useState<SparePart | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  // Embedded enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    businessName: '',
    city: 'Hyderabad',
    additionalDetails: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const updateSpareData = () => {
      if (slug) {
        const s = sparesStore.getSpareBySlug(slug);
        setSpare(s);

        if (s) {
          document.title = `${s.name} (${s.partNumber || 'Spare Part'}) | Trinex Equipment Spares`;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute(
              'content',
              s.shortDescription || `Genuine and compatible commercial kitchen spare part: ${s.name}.`
            );
          }
        }
      }
    };

    updateSpareData();
    window.scrollTo(0, 0);

    const unsubscribe = sparesStore.subscribe(updateSpareData);
    return () => unsubscribe();
  }, [slug]);

  if (!spare) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-trinex-red flex items-center justify-center mx-auto">
          <PackageCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-trinex-black">Spare Part Not Found</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          The spare part you are looking for may have been updated or moved. You can browse our full replacement spares catalogue below.
        </p>
        <div className="pt-4">
          <Link
            to="/spares"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-trinex-red text-white font-bold text-sm shadow-sm hover:bg-trinex-red-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Spares Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  const imageSrc = spare.image || '/assets/images/countertop_induction_hob.png';

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hello Trinex Equipment Spares Division,\nI need quotation & availability for:\nSpare: ${spare.name}\nPart No: ${spare.partNumber || 'N/A'}\nCompatible Equipment: ${spare.compatibleEquipment || 'N/A'}\n\nPlease share price, delivery timeline and technical compatibility.`
    );
    window.open(`https://wa.me/919030467676?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: spare.name,
        text: spare.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    enquiryStore.addSpareRequest({
      name: formData.name,
      mobile: formData.mobile,
      businessName: formData.businessName,
      city: formData.city,
      equipmentBrand: 'Trinex / Compatible',
      equipmentModel: spare.compatibleEquipment || '',
      sparePartRequired: spare.name,
      partNumber: spare.partNumber || '',
      additionalDetails: formData.additionalDetails,
    });

    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 400);
  };

  // Related spares from the same category or overall catalogue
  const relatedSpares = sparesStore
    .getAllSpares()
    .filter((s) => s.id !== spare.id)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* Breadcrumb Navigation */}
      <div className="bg-trinex-light-gray border-b border-trinex-border py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center flex-wrap text-xs text-gray-500 gap-1.5">
          <Link to="/" className="hover:text-trinex-red transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/spares" className="hover:text-trinex-red transition-colors">Spares Catalogue</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-600 font-semibold">{spare.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-trinex-black font-semibold truncate max-w-xs">{spare.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Top Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Stage */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl border border-trinex-border bg-slate-50 p-8 flex items-center justify-center min-h-[340px] sm:min-h-[440px] overflow-hidden group shadow-xs">
              <img
                src={imageSrc}
                alt={spare.name}
                className="max-h-[360px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/countertop_induction_hob.png';
                }}
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-emerald-700 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                <span>Genuine & Compatible Spare</span>
              </div>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-sm border border-gray-200 transition-colors"
                title="Share spare link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copied && (
                <span className="absolute top-14 right-4 bg-trinex-black text-white text-[10px] font-bold px-2 py-1 rounded shadow">
                  Link copied!
                </span>
              )}
            </div>

            {/* Quick Assurance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-trinex-red mb-1" />
                <span className="font-bold text-trinex-black">Tested Quality</span>
                <span className="text-[10px] text-gray-500">Commercial Spec</span>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
                <Wrench className="w-4 h-4 text-trinex-red mb-1" />
                <span className="font-bold text-trinex-black">Expert Guidance</span>
                <span className="text-[10px] text-gray-500">Installation Help</span>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
                <Truck className="w-4 h-4 text-trinex-red mb-1" />
                <span className="font-bold text-trinex-black">Fast Dispatch</span>
                <span className="text-[10px] text-gray-500">Express Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Part Details & Action CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider text-trinex-red bg-red-50 border border-red-100 px-3 py-1 rounded">
                  {spare.category}
                </span>
                {spare.partNumber && (
                  <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded border border-slate-200">
                    Part No: {spare.partNumber}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-trinex-black tracking-tight leading-tight">
                {spare.name}
              </h1>

              {spare.compatibleEquipment && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3.5 flex items-start gap-2.5 text-xs">
                  <Wrench className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Compatible Commercial Equipment:</strong>
                    <span>{spare.compatibleEquipment}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {spare.shortDescription}
            </p>

            {/* CTAs Box */}
            <div className="p-5 rounded-xl bg-gray-50 border border-trinex-border space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-600 pb-1">
                <span className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock & Ready for Dispatch
                </span>
                <span>Express Hyderabad Delivery</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-sm hover:shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  <span>GET QUOTE ON WHATSAPP</span>
                </button>

                <a
                  href="tel:9030467676"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-sm hover:shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 text-trinex-red flex-shrink-0" />
                  <span>CALL PARTS HELPLINE</span>
                </a>
              </div>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(`${spare.name} (Part No: ${spare.partNumber || 'N/A'})`)}
                  className="text-xs font-bold text-trinex-red hover:underline"
                >
                  Submit online enquiry request &rarr;
                </button>
              </div>
            </div>

            {/* Technical Specifications */}
            {spare.specifications && spare.specifications.length > 0 && (
              <div className="border border-trinex-border rounded-xl p-5 bg-white space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-2">
                  Part Technical Specifications
                </h3>

                <div className="divide-y divide-gray-100 text-xs">
                  {spare.specifications.map((spec, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between">
                      <span className="text-gray-500 font-medium">{spec.label}</span>
                      <span className="font-bold text-trinex-black text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Technical Validation & Replacement Guide */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-trinex-red text-white">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Correct Part Identification & Verification Support
              </h3>
              <p className="text-xs text-slate-500">
                Not sure if this part matches your exact commercial unit? We can help verify.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Before ordering replacement components, our senior service technicians can verify your machine's nameplate, serial number, wattage rating, and mechanical dimensions to prevent costly returns or downtime. WhatsApp photos of your damaged part or existing equipment tag to{' '}
            <a href="tel:9030467676" className="font-bold text-trinex-red hover:underline">
              9030467676
            </a>{' '}
            for instant engineer validation.
          </p>
        </section>

        {/* Embedded Fast Spare Request Form */}
        <section className="bg-white border border-trinex-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-xs font-black uppercase tracking-wider text-trinex-red block">
              Direct Parts Order
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-trinex-black">
              Request Price & Availability for {spare.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Submit your contact details and our spares desk will send pricing, delivery timelines, and tax invoice options within 30 minutes.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-emerald-900">
                Parts Enquiry Registered Successfully!
              </h4>
              <p className="text-xs text-emerald-700">
                Our spares specialist is reviewing the specification for Part No. {spare.partNumber || spare.name} and will contact you shortly on WhatsApp / Phone.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Restaurant / Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad Cloud Kitchens"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Delivery City</label>
                <input
                  type="text"
                  placeholder="Hyderabad, Bengaluru, Vijayawada..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">Quantity or Specific Notes</label>
                <textarea
                  rows={2}
                  placeholder="Specify quantity required, urgent delivery requirement, or machine serial numbers..."
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-trinex-red resize-none"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Registering...' : 'Request Quotation & Stock Availability'}</span>
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Related Spares Carousel / Grid */}
        {relatedSpares.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-trinex-red block">
                  Catalogue Explorer
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-trinex-black">
                  Other Commercial Equipment Spares
                </h3>
              </div>
              <Link
                to="/spares"
                className="text-xs font-bold text-trinex-red hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Catalogue</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedSpares.map((rel) => (
                <SpareCard
                  key={rel.id}
                  spare={rel}
                  onOpenQuoteModal={onOpenQuoteModal}
                  onSelectForEnquiry={() => {
                    navigate(`/spares/${rel.slug || rel.partNumber || rel.id}`);
                  }}
                />
              ))}
            </div>
          </section>
        )}

      </div>

    </div>
  );
};
