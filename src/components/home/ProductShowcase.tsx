import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Leaf, Sparkles, Send, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface ProductShowcaseProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onNavigate }) => {
  const { products, submitInquiry } = useData();
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '20 Bags (50kg)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const biokash = products.find((p) => p.slug === 'biokash-organic-fertilizer') || products[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry({
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      inquiry_type: 'product',
      business_id: 'tchuki-farms',
      message: `Product Order/Inquiry for BioKash Organic Fertilizer. Requested volume: ${formData.quantity}. Notes: ${formData.message}`,
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Product Information (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <img
                src="/assets/tchuki_farms_logo.jpg"
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
            
            {/* Visual Container */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-slate-200 dark:border-emerald-900/40 bg-white shadow-2xl shadow-slate-200/50 dark:shadow-emerald-950/40 group">
              <img
                src={biokash.image_urls[0] || '/assets/biokash_50kg_bag.png'}
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
                Order BioKash Organic Fertilizer
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Submit your order or inquiry details. Our agribusiness team will reach out with pricing, pickup, or delivery schedules.
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
                  Thank you. Your request for BioKash Organic Fertilizer has been submitted directly to our administrative dispatch team.
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
                    Estimated Quantity
                  </label>
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
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Delivery District or Farm Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify delivery location (e.g. Lilongwe, Dedza, Kasungu) or crop type..."
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
                    <span>Submit BioKash Order</span>
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
