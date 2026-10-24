import React from 'react';
import { ArrowUpRight, Phone, Mail, MessageSquare, Shield, Globe } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface FooterProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, businesses } = useData();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-emerald-950/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-900">
          
          {/* Brand Column (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Tchuki_Group_Eco-Tech_Logo_b371a75d.png"
                alt="Tchuki Group"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <span className="text-xl font-extrabold text-white font-heading tracking-tight block">
                  TCHUKI
                </span>
                <span className="text-xs text-emerald-400 font-medium">Group of Companies</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {settings.footer_text}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400/90 pt-2 font-mono">
              <Globe className="w-4 h-4 shrink-0" />
              <span>{settings.primary_market}</span>
            </div>
          </div>

          {/* Our Businesses (Col 6-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase font-heading">
              Our Businesses
            </h3>
            <ul className="space-y-2 text-sm">
              {businesses.map((biz) => (
                <li key={biz.id}>
                  <button
                    onClick={() => {
                      onNavigate('business-detail', biz.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span>{biz.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <span className="text-xs text-slate-400 block -mt-0.5">
                    {biz.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (Col 9-10) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase font-heading">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Tchuki
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Products & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Featured Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('insights')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  News & Insights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details (Col 11-12) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase font-heading">
              Verified Contact
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href={`tel:${settings.contact_phone}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors group"
              >
                <Phone className="w-4 h-4 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-mono tabular-nums">{settings.contact_phone}</span>
              </a>

              <a
                href={`mailto:${settings.contact_email}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors break-all group"
              >
                <Mail className="w-4 h-4 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span>{settings.contact_email}</span>
              </a>

              <a
                href={`https://wa.me/265986611989?text=Hello%20Tchuki%20Group`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-800/40 text-emerald-400 hover:bg-emerald-900/60 transition-colors text-xs font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Available</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {settings.parent_brand}. All rights reserved. Registered domain:{' '}
            <span className="text-slate-300 font-medium font-mono">{settings.official_domain}</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy & Consent
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-slate-300 transition-colors"
            >
              Partnership Terms
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Management</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

