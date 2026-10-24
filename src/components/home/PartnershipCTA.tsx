import React from 'react';
import { ArrowRight, MessageSquare, Handshake } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface PartnershipCTAProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const PartnershipCTA: React.FC<PartnershipCTAProps> = ({ onNavigate }) => {
  const { settings } = useData();

  return (
    <section className="py-24 bg-emerald-50/50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950 relative border-t border-slate-200 dark:border-slate-900 overflow-hidden transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono mb-6">
          <Handshake className="w-4 h-4" />
          <span>Strategic Collaboration</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading max-w-2xl mx-auto">
          Let's Build Something That Matters.
        </h2>

        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-xl mx-auto mt-4 mb-8">
          Whether you are a commercial producer seeking BioKash Organic inputs, an enterprise in need of scalable software engineering, or a potential strategic partner, we invite you to start a direct conversation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-xl shadow-emerald-950/20 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <span>Contact Tchuki Team</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={`https://wa.me/265986611989?text=Hello%20Tchuki%20Group,%20we%20are%20interested%20in%20exploring%20partnership%20opportunities.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-medium text-sm transition-all cursor-pointer shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Explore Partnership via WhatsApp</span>
          </a>
        </div>

        <div className="mt-8 text-xs text-slate-500 dark:text-slate-400 font-mono">
          Verified Direct Contact: {settings.contact_phone} · {settings.contact_email}
        </div>

      </div>
    </section>
  );
};

