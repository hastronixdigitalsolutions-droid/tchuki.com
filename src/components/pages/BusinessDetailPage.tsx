import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  ExternalLink,
  Send,
  MessageSquare,
  Sprout,
  Terminal,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { PageBackdrop } from '../common/PageBackdrop';

interface BusinessDetailPageProps {
  businessSlug: string;
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const BusinessDetailPage: React.FC<BusinessDetailPageProps> = ({
  businessSlug,
  onNavigate,
}) => {
  const { businesses, services, products, projects, articles, submitInquiry } = useData();

  const business = businesses.find((b) => b.slug === businessSlug) || businesses[0];
  const isFarms = business?.slug.includes('farm');

  const bizServices = services.filter((s) => s.business_id === business?.id && s.status === 'published');
  const bizProducts = products.filter((p) => p.business_id === business?.id && p.publication_status === 'published');
  const bizProjects = projects.filter((p) => p.business_id === business?.id && p.publication_status === 'published');
  const bizArticles = articles.filter((a) => a.business_id === business?.id && a.publication_status === 'published');

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry_type: isFarms ? 'agricultural' : 'software',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry({
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      inquiry_type: formData.inquiry_type as any,
      business_id: business.id,
      message: formData.message,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiry_type: isFarms ? 'agricultural' : 'software',
        message: '',
      });
    }, 3000);
  };

  const faqs = isFarms
    ? [
        {
          q: 'What is BioKash Organic Fertilizer and how is it used?',
          a: 'BioKash is a 100% natural organic fertilizer formulated to rebuild depleted soil fertility, supply microbial activity, and provide sustained macro/micronutrients for all crops, including maize, horticulture, and legumes.',
        },
        {
          q: 'Do you offer delivery to farms and farmer cooperatives across Malawi?',
          a: 'Yes, we supply both smallholder packages (10kg, 25kg, 50kg) and bulk cooperative shipments with scheduled district transport across Lilongwe, Dedza, Kasungu, Mzimba, and southern regions.',
        },
        {
          q: 'Can Tchuki Farms design and install solar drip irrigation systems?',
          a: 'Yes, our agronomy and engineering teams provide site assessments, system design, equipment procurement, and field commissioning for water-efficient irrigation.',
        },
      ]
    : [
        {
          q: 'What technologies does Tchuki Digital specialize in?',
          a: 'We build modern web architectures using React, TypeScript, Node.js, and cloud backends, as well as native/cross-platform mobile apps, bespoke business ERPs, and automated AI workflow pipelines.',
        },
        {
          q: 'How does your software development engagement work?',
          a: 'We begin with a thorough technical discovery session to define exact requirements, followed by iterative milestone delivery, user testing, deployment, and ongoing SLA maintenance.',
        },
        {
          q: 'Do you also handle graphic design and corporate rebranding?',
          a: 'Yes, Tchuki Digital includes creative brand identity design, logo development, corporate style guides, and digital marketing campaigns.',
        },
      ];

  if (!business) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold text-white">Business Profile Not Found</h2>
        <button
          onClick={() => onNavigate('businesses')}
          className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
        >
          Return to Businesses Directory
        </button>
      </div>
    );
  }

  return (
    <div className="relative pt-24 pb-24 min-h-screen overflow-hidden">
      {/* Thematic Background Photography & Ambient Spotlight */}
      <PageBackdrop
        imageUrl={
          isFarms
            ? '/src/assets/images/tchuki_farms_seedlings_nursery_1792798452384.jpg'
            : '/src/assets/images/tchuki_digital_studio_1792796708817.jpg'
        }
        alt={`${business.name} Atmosphere`}
        lighting={isFarms ? 'emerald' : 'blue'}
        opacityClass="opacity-45 dark:opacity-35"
      />

      <div className="relative z-10">
        {/* Top Breadcrumb & Return Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <button
            onClick={() => onNavigate('businesses')}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Businesses</span>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">{business.name}</span>
          </button>
        </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="relative h-80 sm:h-96 w-full overflow-hidden">
            <img
              src={business.cover_image_url}
              alt={business.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />

            <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950/95 p-2 border border-slate-700/60 shadow-xl flex items-center justify-center shrink-0">
                    <img
                      src={business.logo_url}
                      alt={business.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-lg bg-slate-900/90 backdrop-blur-md text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 font-mono mb-1">
                      {isFarms ? <Sprout className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
                      <span>{business.category}</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
                      {business.name}
                    </h1>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-emerald-300 font-medium italic">
                  "{business.slogan}"
                </p>
              </div>

              {/* Direct Quick Contact */}
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={`https://wa.me/265986611989?text=Hello%20${encodeURIComponent(business.name)},%20I%20would%20like%20to%20inquire.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview & Core Scope */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold text-white font-heading">
              Overview & Operating Mandate
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {business.full_description}
            </p>

            {/* Key Capabilities */}
            <div className="pt-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Core Deliverables & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {business.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Business Card & Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white font-heading">
                Direct Contact & Inquiries
              </h3>

              <div className="space-y-3 text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono tabular-nums">{business.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span className="break-all">{business.email}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 block mb-2">
                  Parent Identity:
                </span>
                <span className="font-bold text-white">Tchuki Group</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Services List Under This Business */}
      {bizServices.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="mb-8">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
              Offerings
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
              Services by {business.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bizServices.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-2">
                    {srv.category}
                  </span>
                  <h3 className="text-base font-bold text-white font-heading mb-2">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {srv.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-emerald-400">
                  <span className="font-medium">Active Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products under this business (e.g. BioKash Organic Fertilizer) */}
      {bizProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="mb-8">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
              Products Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
              {business.name} Products
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bizProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row gap-6 items-center"
              >
                <div className="w-full sm:w-48 h-48 rounded-xl overflow-hidden bg-white shrink-0">
                  <img
                    src={prod.image_urls[0]}
                    alt={prod.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-mono text-emerald-400">
                    {prod.category}
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {prod.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    {prod.price ? (
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        {prod.price.toLocaleString()} {prod.currency}
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-400">Inquire for pricing</span>
                    )}
                    <button
                      onClick={() => {
                        const el = document.getElementById('inquiry-form-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
                    >
                      Inquire / Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Projects by this business */}
      {bizProjects.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="mb-8">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
              Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
              Projects & Case Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bizProjects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden space-y-4 p-6"
              >
                <div className="relative h-60 w-full rounded-xl overflow-hidden">
                  <img
                    src={proj.cover_image_url}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 text-[11px] font-mono text-emerald-400">
                    {proj.category}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-heading">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {proj.description}
                </p>

                {/* If Before / After exists, show interactive slider */}
                {proj.before_image_url && proj.after_image_url && (
                  <div className="pt-2">
                    <BeforeAfterSlider
                      beforeImage={proj.before_image_url}
                      afterImage={proj.after_image_url}
                      title="Transformation Comparison"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frequently Asked Questions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Common Inquiries About {business.name}
          </h2>

          <div className="space-y-4 pt-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-sm font-bold text-white font-heading mb-2">
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Contact & Inquiry Form */}
      <div id="inquiry-form-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
          <div className="mb-6">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Send Direct Message
            </div>
            <h3 className="text-2xl font-bold text-white font-heading mt-1">
              Contact {business.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Fill out this form to inquire directly about products, services, or collaboration.
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                Message Sent Successfully!
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you for contacting {business.name}. Our team will review your inquiry and follow up shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+265 999 000 000"
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Message / Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={`Describe your interest or request regarding ${business.name}...`}
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>Submit Inquiry to {business.name}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};
