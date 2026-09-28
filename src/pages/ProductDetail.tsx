import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle, 
  Building2, 
  ArrowLeft,
  Share2,
  Package,
  Wrench,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import { productStore } from '../services/productStore';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailProps {
  onOpenQuoteModal: (productContext?: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateProductData = () => {
      if (slug) {
        const p = productStore.getProductBySlug(slug);
        setProduct(p);

        // Dynamic SEO Title and Meta Description
        if (p) {
          document.title = `${p.name} ${p.model || ''} | Trinex Equipment Pvt Ltd`;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute('content', p.shortDescription || `Commercial ${p.name} from Trinex Equipment.`);
          }
        }
      }
    };

    updateProductData();
    setActiveImageIndex(0);
    window.scrollTo(0, 0);

    const unsubscribe = productStore.subscribe(updateProductData);
    return () => unsubscribe();
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-trinex-black">Product Not Found</h2>
        <p className="text-gray-500 text-sm">
          The requested product may have been moved or updated.
        </p>
        <div className="pt-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-trinex-red text-white font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Equipment Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  const primaryImage = product.images?.[activeImageIndex] || product.images?.[0] || '/assets/images/countertop_induction_hob.png';

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hello Trinex Equipment, I am interested in the following product:\n\nProduct: ${product.name}\nModel: ${product.model || 'Standard'}\nCategory: ${product.category}\n\nPlease share pricing and availability.`
    );
    window.open(`https://wa.me/919030847474?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Related products from same category
  const relatedProducts = productStore
    .getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* Breadcrumb Navigation */}
      <div className="bg-trinex-light-gray border-b border-trinex-border py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center flex-wrap text-xs text-gray-500 gap-1.5">
          <Link to="/" className="hover:text-trinex-red transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/products" className="hover:text-trinex-red transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to={`/products?category=${product.categorySlug}`} className="hover:text-trinex-red transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-trinex-black font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Top Product Overview Grid (Gallery + Information) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative rounded-xl border border-trinex-border bg-trinex-light-gray p-6 flex items-center justify-center min-h-[340px] sm:min-h-[440px] overflow-hidden group">
              <img
                src={primaryImage}
                alt={product.name}
                className="max-h-[380px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {product.fastMoving && (
                <div className="absolute top-4 left-4 bg-trinex-red text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                  Fast Moving
                </div>
              )}

              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-sm border border-gray-200 transition-colors"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copied && (
                <span className="absolute top-14 right-4 bg-trinex-black text-white text-[10px] font-bold px-2 py-1 rounded shadow">
                  Link copied!
                </span>
              )}
            </div>

            {/* Thumbnail Strip (if multiple images) */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg border-2 p-1.5 bg-white flex items-center justify-center flex-shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-trinex-red shadow-sm'
                        : 'border-trinex-border hover:border-gray-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} - view ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Assurance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-trinex-red mb-1" />
                <span className="font-bold text-trinex-black">Genuine Trinex</span>
                <span className="text-[10px] text-gray-500">Commercial Grade</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
                <Wrench className="w-4 h-4 text-trinex-red mb-1" />
                <span className="font-bold text-trinex-black">15+ Yrs Service</span>
                <span className="text-[10px] text-gray-500">Spares & Repair</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
                <Zap className="w-4 h-4 text-trinex-red mb-1" />
                <span className="font-bold text-trinex-black">Energy Efficient</span>
                <span className="text-[10px] text-gray-500">Fast Heat Transfer</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Primary CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category & Brand Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-trinex-red bg-red-50 border border-red-100 px-3 py-1 rounded">
                  {product.category}
                </span>
                <span className="text-xs font-bold text-gray-500">
                  Brand: <strong className="text-trinex-black">{product.brand || 'Trinex'}</strong>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-trinex-black tracking-tight leading-tight">
                {product.name}
              </h1>

              {product.model && (
                <div className="inline-flex items-center gap-2 text-xs font-semibold bg-gray-100 px-3 py-1 rounded text-trinex-gray">
                  <span>Model:</span>
                  <span className="font-bold text-trinex-black">{product.model}</span>
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Primary Action Buttons (WhatsApp & Call) */}
            <div className="p-5 rounded-xl bg-gray-50 border border-trinex-border space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-600 pb-1">
                <span className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Commercial Orders
                </span>
                <span>Hyderabad Showroom Dispatch</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-sm hover:shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  <span>GET QUOTE ON WHATSAPP</span>
                </button>

                <a
                  href="tel:9030847474"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-sm hover:shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 text-trinex-red flex-shrink-0" />
                  <span>CALL SALES NOW</span>
                </a>
              </div>

              <div className="pt-1 text-center">
                <button
                  onClick={() => onOpenQuoteModal(`${product.name} (${product.model})`)}
                  className="text-xs font-bold text-trinex-red hover:underline"
                >
                  Or submit an online quote request form &rarr;
                </button>
              </div>
            </div>

            {/* Key Core Details Grid */}
            <div className="border border-trinex-border rounded-xl p-5 bg-white space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-2">
                Quick Equipment Specifications
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {product.power && (
                  <div>
                    <span className="text-gray-400 block text-[11px]">Power</span>
                    <span className="font-bold text-trinex-black">{product.power}</span>
                  </div>
                )}
                {product.cookingType && (
                  <div>
                    <span className="text-gray-400 block text-[11px]">Cooking Type</span>
                    <span className="font-bold text-trinex-black">{product.cookingType}</span>
                  </div>
                )}
                {product.cookingSurface && (
                  <div>
                    <span className="text-gray-400 block text-[11px]">Surface</span>
                    <span className="font-bold text-trinex-black">{product.cookingSurface}</span>
                  </div>
                )}
                {product.installation && (
                  <div>
                    <span className="text-gray-400 block text-[11px]">Installation</span>
                    <span className="font-bold text-trinex-black">{product.installation}</span>
                  </div>
                )}
                {product.application && (
                  <div>
                    <span className="text-gray-400 block text-[11px]">Application</span>
                    <span className="font-bold text-trinex-black">{product.application}</span>
                  </div>
                )}
                {product.warranty && (
                  <div>
                    <span className="text-gray-400 block text-[11px]">Warranty</span>
                    <span className="font-bold text-trinex-black">{product.warranty}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Ideal For Tags */}
            {product.idealFor && product.idealFor.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-gray-500 block">
                  Ideal Commercial Applications
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.idealFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-trinex-black text-xs font-semibold transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Detailed Sections: Features, Full Description & Tech Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
          
          {/* Left Column: Full Description & Key Features */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Description Block */}
            <div className="border border-trinex-border rounded-xl p-6 bg-white space-y-4 shadow-subtle">
              <h2 className="text-base font-black uppercase tracking-wider text-trinex-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Layers className="w-5 h-5 text-trinex-red" />
                <span>Product Description</span>
              </h2>
              <div className="prose prose-sm text-gray-600 leading-relaxed space-y-3 font-normal">
                {product.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Key Features Block */}
            {product.features && product.features.length > 0 && (
              <div className="border border-trinex-border rounded-xl p-6 bg-white space-y-4 shadow-subtle">
                <h2 className="text-base font-black uppercase tracking-wider text-trinex-black flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Sparkles className="w-5 h-5 text-trinex-red" />
                  <span>Key Features & Engineering Highlights</span>
                </h2>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-trinex-red flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Column: Full Technical Specifications Table */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-trinex-border rounded-xl p-6 bg-white shadow-subtle space-y-4">
              <h2 className="text-base font-black uppercase tracking-wider text-trinex-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Wrench className="w-5 h-5 text-trinex-red" />
                <span>Technical Specifications</span>
              </h2>

              <div className="divide-y divide-gray-100 text-xs sm:text-sm">
                {/* Dynamically display specs */}
                {product.specifications && product.specifications.length > 0 ? (
                  product.specifications.map((spec, idx) => (
                    <div key={idx} className="py-2.5 flex items-start justify-between gap-4">
                      <span className="text-gray-500 font-medium">{spec.label}</span>
                      <span className="text-trinex-black font-bold text-right">{spec.value}</span>
                    </div>
                  ))
                ) : null}

                {/* Optional extra fields if specified */}
                {product.voltage && (
                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <span className="text-gray-500 font-medium">Voltage</span>
                    <span className="text-trinex-black font-bold text-right">{product.voltage}</span>
                  </div>
                )}
                {product.phase && (
                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <span className="text-gray-500 font-medium">Phase</span>
                    <span className="text-trinex-black font-bold text-right">{product.phase}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <span className="text-gray-500 font-medium">Dimensions</span>
                    <span className="text-trinex-black font-bold text-right">{product.dimensions}</span>
                  </div>
                )}
                {product.material && (
                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <span className="text-gray-500 font-medium">Body Material</span>
                    <span className="text-trinex-black font-bold text-right">{product.material}</span>
                  </div>
                )}
                {product.countryOfOrigin && (
                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <span className="text-gray-500 font-medium">Country of Origin</span>
                    <span className="text-trinex-black font-bold text-right">{product.countryOfOrigin}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Helpline Box */}
            <div className="border border-trinex-red/20 bg-red-50/50 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-trinex-red">
                Need Customized Sizing or Installation?
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our technical team provides on-site commercial kitchen sizing, electrical load assessments, and installation support across Telangana and Andhra Pradesh.
              </p>
              <div className="pt-1 flex items-center justify-between text-xs font-bold">
                <a href="tel:9030847474" className="text-trinex-black hover:text-trinex-red flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-trinex-red" />
                  <span>Sales: 9030847474</span>
                </a>
                <a href="tel:9030467676" className="text-trinex-black hover:text-trinex-red flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-trinex-red" />
                  <span>Service: 9030467676</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Large Quote CTA Section */}
        <section className="bg-trinex-black text-white rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-trinex-red uppercase tracking-widest block">
              Trinex Equipment Pvt Ltd
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              Interested in this equipment?
            </h2>
            <p className="text-sm text-gray-400">
              Get an instant quotation, commercial bulk discount, or arrange a demonstration at our Ameerpet showroom.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleWhatsAppQuote}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>GET QUOTE ON WHATSAPP</span>
            </button>

            <a
              href="tel:9030847474"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-trinex-red hover:bg-trinex-red-dark text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>CALL SALES (9030847474)</span>
            </a>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-trinex-border pb-3">
              <h3 className="text-lg sm:text-xl font-black text-trinex-black uppercase tracking-tight">
                Related Equipment
              </h3>
              <Link to="/products" className="text-xs font-bold text-trinex-red hover:underline">
                View All &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onOpenQuoteModal={onOpenQuoteModal} />
              ))}
            </div>
          </section>
        )}

      </div>

    </div>
  );
};
