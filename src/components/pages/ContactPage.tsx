import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Globe, Building } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PageBackdrop } from '../common/PageBackdrop';

export const ContactPage: React.FC = () => {
  const { settings, businesses, submitInquiry } = useData();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    inquiry_type: 'general' as const,
    business_id: '',
    message: '',
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitInquiry({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization || undefined,
        inquiry_type: formData.inquiry_type,
        business_id: formData.business_id || undefined,
        message: formData.message,
      });

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        organization: '',
        inquiry_type: 'general',
        business_id: '',
        message: '',
        consent: true,
      });
    }, 400);
  };

  return (
    <div className="relative pt-28 pb-24 min-h-screen overflow-hidden">
      {/* Thematic Background Photography & Ambient Hybrid Spotlight */}
      <PageBackdrop
        imageUrl="/src/assets/images/tchuki_digital_studio_1792796708817.jpg"
        alt="Contact Tchuki Group"
        lighting="hybrid"
        opacityClass="opacity-45 dark:opacity-35"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            Start a Conversation With Tchuki
          </h1>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            Have a commercial agribusiness inquiry, require custom software or mobile development, or wish to explore a group partnership? Reach out to our executive and management teams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Verified Contact Info (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white/95 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                Verified Communication Channels
              </h2>

              <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider block text-[10px]">
                      Direct Telephone & Voice
                    </span>
                    <a
                      href={`tel:${settings.contact_phone}`}
                      className="text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-mono text-sm font-semibold transition-colors mt-0.5 block tabular-nums"
                    >
                      {settings.contact_phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider block text-[10px]">
                      Corporate Management Email
                    </span>
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-mono text-sm font-semibold transition-colors mt-0.5 block break-all"
                    >
                      {settings.contact_email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider block text-[10px]">
                      Instant WhatsApp Desk
                    </span>
                    <a
                      href={`https://wa.me/265986611989?text=Hello%20Tchuki%20Group`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-mono text-xs font-semibold mt-0.5 inline-flex items-center gap-1"
                    >
                      <span>+265 986 611 989 (Open WhatsApp)</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider block text-[10px]">
                      Operating Headquarters
                    </span>
                    <span className="text-slate-900 dark:text-white font-medium text-xs mt-0.5 block">
                      Malawi (Available for regional & international deployments)
                    </span>
                  </div>
                </div>
              </div>

              {/* Data & Privacy notice */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  All submitted inquiries are securely routed to our management inbox and recorded inside our administration tracking database.
                </span>
              </div>
            </div>

          </div>

          {/* Inquiry Form (Col 6-12) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md">
              
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                Official Inquiry Form
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-sans">
                Please complete the details below. Required fields are marked with an asterisk (*).
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-500/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                    Inquiry Successfully Received
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Tchuki Group. A record has been created in our management system. Our team will review your specifications and contact you promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white text-xs font-semibold cursor-pointer shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  
                  {/* Full Name & Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="e.g. Kondwani Phiri"
                        className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Organization / Enterprise (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Company or Cooperative name"
                        className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+265 999 000 000"
                        className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type & Business Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Inquiry Nature / Subject *
                      </label>
                      <select
                        value={formData.inquiry_type}
                        onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value as any })}
                        className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="general">General Inquiries</option>
                        <option value="product">BioKash Fertilizer / Seedling Order</option>
                        <option value="software">Software, Web & App Development</option>
                        <option value="agricultural">Agricultural Advisory & Irrigation</option>
                        <option value="marketing">Brand Identity & Digital Marketing</option>
                        <option value="partnership">Strategic Partnership / Supplier</option>
                        <option value="other">Other Business Matters</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Target Business Entity
                      </label>
                      <select
                        value={formData.business_id}
                        onChange={(e) => setFormData({ ...formData, business_id: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="">Tchuki Group (Parent Brand)</option>
                        {businesses.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Detailed Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Detailed Requirements / Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify project details, volumes, deadlines, or partnership proposals..."
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none resize-none shadow-inner"
                    />
                  </div>

                  {/* Privacy / Consent checkbox */}
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      required
                      className="rounded border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="consent">
                      I agree to the processing of this information for the purpose of responding to my business inquiry.
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs shadow-xl shadow-emerald-950/20 transition-all cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Transmitting...' : 'Submit Official Inquiry'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
