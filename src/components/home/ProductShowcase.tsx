import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Leaf, Sparkles, Send, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { getAssetUrl } from '../../utils/assets';

interface ProductShowcaseProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onNavigate }) => {
  const { products, submitInquiry } = useData();
  const [showcaseTab, setShowcaseTab] = useState<'livestock' | 'biokash'>('livestock');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 'Livestock Inquiry (Cattle, Goats, Sheep, Pigs, Chickens)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const biokash = products.find((p) => p.slug === 'biokash-organic-fertilizer') || products[0];
  const livestock = products.find((p) => p.slug === 'tchuki-farms-trusted-livestock-suppliers') || products[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry({
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      inquiry_type: showcaseTab === 'livestock' ? 'livestock' : 'product',
      business_id: 'tchuki-farms',
      message: `${showcaseTab === 'livestock' ? 'Livestock Supply Inquiry' : 'BioKash Organic Fertilizer Order'}. Requested Item: ${formData.quantity}. Notes: ${formData.message}`,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryModalOpen(false);
    }, 2500);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 relative border-t border-slate-200 dark:border-slate-900 overflow-hidden transition-colors duration-300">
      {/* Background soft glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Flagship Category Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <button
              onClick={() => {
                setShowcaseTab('livestock');
                setFormData((prev) => ({ ...prev, quantity: 'Livestock Inquiry (Cattle, Goats, Sheep, Pigs, Chickens)' }));
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                showcaseTab === 'livestock'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🐄🐐 Livestock Suppliers 🐔🐖</span>
            </button>
            <button
              onClick={() => {
                setShowcaseTab('biokash');
                setFormData((prev) => ({ ...prev, quantity: '20 Bags (50kg)' }));
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                showcaseTab === 'biokash'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🌱 BioKash Fertilizer (50KG)</span>
            </button>
          </div>
        </div>

        {showcaseTab === 'livestock' ? (
          /* LIVESTOCK SHOWCASE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-300">
            {/* Left Column: Livestock Information */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <img
                  src={getAssetUrl('/assets/tchuki_farms_logo.jpg')}
                  alt="Tchuki Farms Logo"
                  className="h-10 w-auto object-contain"
                />
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
                  Tchuki Farms · Nationwide Livestock Suppliers
                </div>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
                  YOUR TRUSTED{' '}
                  <span className="text-emerald-600 dark:text-emerald-400">LIVESTOCK SUPPLIERS!</span>
                </h2>
                <div className="text-lg text-emerald-800 dark:text-emerald-300 font-medium mt-1 font-serif italic">
                  Growing Agriculture. Empowering Farmers. Building a Better Future.
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-xl">
                Looking for quality livestock for your farm or livestock business? <strong>Tchuki Farms is here to help!</strong> We connect farmers with quality livestock to support farming, business growth, and food production across Malawi.
              </p>

              {/* Livestock Varieties Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-xl pt-1">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2.5">
                  <span className="text-xl">🐄</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Cattle</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Dairy & beef breeds</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2.5">
                  <span className="text-xl">🐐</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Goats</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Boer & hardy breeds</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2.5">
                  <span className="text-xl">🐑</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Sheep</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Pasture-adapted stock</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2.5">
                  <span className="text-xl">🐖</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Pigs</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Breeding & growers</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 sm:col-span-2 flex items-center gap-2.5">
                  <span className="text-xl">🐔</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Chickens & Poultry</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Broilers, layers & free-range</p>
                  </div>
                </div>
              </div>

              {/* Core Benefits */}
              <div className="space-y-2 pt-2 max-w-xl text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Supporting farmers and livestock businesses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Helping you find livestock to meet your farming needs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Promoting livestock farming as a source of income and food security</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-950/20 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <span>Inquire & Order Livestock</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="https://wa.me/265986611989?text=Hello%20Tchuki%20Farms,%20I%20am%20inquiring%20about%20livestock%20supplies%20(Cattle,%20Goats,%20Sheep,%20Pigs,%20Chickens)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <span>📱 Call/WhatsApp: +265 986 611 989</span>
                </a>

                <button
                  onClick={() => onNavigate('business-detail', 'tchuki-farms')}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Explore Tchuki Farms
                </button>
              </div>

              {/* Hashtags Strip */}
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2 flex flex-wrap gap-2">
                <span>#TchukiFarms</span>
                <span>#LivestockFarming</span>
                <span>#MalawiAgriculture</span>
                <span>#PoultryFarming</span>
                <span>#LivestockSuppliers</span>
                <span>#Agribusiness</span>
              </div>
            </div>

            {/* Right Column: Livestock Visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-slate-200 dark:border-emerald-900/40 bg-slate-950 shadow-2xl shadow-slate-200/50 dark:shadow-emerald-950/40 group">
                <img
                  src={getAssetUrl('/assets/tchuki-farms-livestock.jpg')}
                  alt="Tchuki Farms Livestock (Cattle, Goats, Sheep, Poultry)"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Tag 1 */}
                <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-xs font-bold text-emerald-400 shadow-lg">
                  🐄 Cattle · Goats · Sheep · Pigs · Poultry
                </div>

                {/* Floating Tag 2 */}
                <div className="absolute top-1/2 -translate-y-1/2 right-6 px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-teal-500/40 text-xs font-bold text-teal-300 shadow-lg">
                  🌱 Income & Food Security
                </div>

                {/* Floating Tag 3 */}
                <div className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-xs font-bold text-emerald-400 shadow-lg">
                  🚚 Sourced & Delivered Across Malawi
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* BIOKASH SHOWCASE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-300">
            {/* Left Column: Product Information (Col 1-7) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <img
                  src={getAssetUrl('/assets/tchuki_farms_logo.jpg')}
                  alt="Tchuki Farms Logo"
                  className="h-10 w-auto object-contain"
                />
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
                  Flagship Agribusiness Product · 50KG Heavy Duty Sack
                </div>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
                  BIOKASH{' '}
                  <span className="text-emerald-600 dark:text-emerald-400">Organic Fertilizer</span>
                </h2>
                <div className="text-lg text-emerald-800 dark:text-emerald-300 font-medium mt-1 font-serif italic">
                  Cultivating Crops, Cultivating Wealth · 100% Natural
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-xl">
                Produced and packed by Tchuki Farms (P.O. Box 361 Chileka, Blantyre). Engineered to restore natural soil microbiome, root moisture, and crop yield across maize, vegetables, cereals, and legumes.
              </p>

              {/* Feature Bullets / Verified Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-xl">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-heading">100% Natural Formula</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">For all crops. Chemical-free organic nutrient blend.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-heading">50KG When Packed</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">Heavy-duty woven bag with moisture seal. Store in cool dry place.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-heading">Direct Farmer Hotline</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">0881871063 / 0988811989 / tchukifarms@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-heading">Chileka, Blantyre Facility</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">Bulk delivery to cooperatives across all districts.</p>
                  </div>
                </div>
              </div>

              {/* Price & CTA Strip */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-950/20 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <span>Inquire & Order BioKash</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onNavigate('business-detail', 'tchuki-farms')}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Explore Tchuki Farms
                </button>
              </div>

            </div>

            {/* Right Column: High-Impact Product Visual (Col 8-12) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-slate-200 dark:border-emerald-900/40 bg-white shadow-2xl shadow-slate-200/50 dark:shadow-emerald-950/40 group">
                <img
                  src={getAssetUrl(biokash.image_urls[0] || '/assets/biokash_50kg_bag.png')}
                  alt="BioKash Organic Fertilizer"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Tag 1: Organic Fertilizer */}
                <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-xs font-bold text-emerald-400 shadow-lg">
                  🌱 100% Organic Fertilizer
                </div>

                {/* Floating Tag 2: Soil Health */}
                <div className="absolute top-1/2 -translate-y-1/2 right-6 px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-teal-500/40 text-xs font-bold text-teal-300 shadow-lg">
                  🌿 Soil Health & Microbiome
                </div>

                {/* Floating Tag 3: Crop Growth */}
                <div className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-xs font-bold text-emerald-400 shadow-lg">
                  📈 Accelerates Crop Yields
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Product Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left text-slate-900 dark:text-white">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-semibold">
                Direct Inquiry · Tchuki Farms
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mt-1">
                {showcaseTab === 'livestock' ? 'Inquire & Order Quality Livestock' : 'Order BioKash Organic Fertilizer'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {showcaseTab === 'livestock'
                  ? 'Submit your livestock requirements (Cattle, Goats, Sheep, Pigs, Poultry). Our farming team will get in touch with availability and delivery.'
                  : 'Submit your order or inquiry details. Our agribusiness team will reach out with pricing, pickup, or delivery schedules.'}
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-500/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  Inquiry Received Successfully!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
                  {showcaseTab === 'livestock'
                    ? 'Thank you. Your request for Tchuki Farms livestock has been submitted directly to our agribusiness dispatch team.'
                    : 'Thank you. Your request for BioKash Organic Fertilizer has been submitted directly to our administrative dispatch team.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kondwani Phiri"
                    className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:outline-none text-slate-900 dark:text-white shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="farmer@example.com"
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:outline-none text-slate-900 dark:text-white shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+265 999 000 000"
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:outline-none text-slate-900 dark:text-white shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {showcaseTab === 'livestock' ? 'Livestock Required' : 'Estimated Quantity'}
                  </label>
                  {showcaseTab === 'livestock' ? (
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:outline-none text-slate-900 dark:text-white"
                    >
                      <option value="Cattle 🐄 (Dairy or Beef)">Cattle 🐄 (Dairy or Beef)</option>
                      <option value="Goats 🐐 (Boer or Indigenous)">Goats 🐐 (Boer or Indigenous)</option>
                      <option value="Sheep 🐑 (Pasture-adapted)">Sheep 🐑 (Pasture-adapted)</option>
                      <option value="Pigs 🐖 (Breeding or Growers)">Pigs 🐖 (Breeding or Growers)</option>
                      <option value="Chickens & Poultry 🐔 (Layers, Broilers, Free-range)">Chickens & Poultry 🐔 (Layers, Broilers, Free-range)</option>
                      <option value="Mixed Livestock Order">Mixed Livestock Order</option>
                    </select>
                  ) : (
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:outline-none text-slate-900 dark:text-white"
                    >
                      <option value="5 Bags (Trial)">5 Bags (Trial / Small Plot)</option>
                      <option value="20 Bags (50kg)">20 Bags (50kg) - Smallholder</option>
                      <option value="50 Bags (50kg)">50 Bags (50kg) - Commercial Farm</option>
                      <option value="100+ Bags (Bulk)">100+ Bags (Bulk / Cooperative)</option>
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Delivery District or Farm Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={showcaseTab === 'livestock' ? 'Specify breed preference, quantities, and delivery district in Malawi...' : 'Specify delivery location (e.g. Lilongwe, Dedza, Kasungu) or crop type...'}
                    className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:outline-none text-slate-900 dark:text-white resize-none shadow-inner"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <span>{showcaseTab === 'livestock' ? 'Submit Livestock Inquiry' : 'Submit BioKash Order'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
