import React, { useState } from 'react';
import { ArrowRight, Sprout, Terminal, Plus, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Business } from '../../types';

interface EcosystemSectionProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({ onNavigate }) => {
  const { businesses } = useData();
  const [activeBusiness, setActiveBusiness] = useState<Business | null>(businesses[0] || null);

  const farms = businesses.find(b => b.slug === 'tchuki-farms') || businesses[0];
  const digital = businesses.find(b => b.slug === 'tchuki-digital') || businesses[1];
  const otherBusinesses = businesses.filter(b => b.id !== farms?.id && b.id !== digital?.id);

  return (
    <section id="ecosystem-section" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>The Tchuki Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            One Brand. Multiple Businesses.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
            Tchuki acts as the foundational engine connecting high-impact real-world agriculture with cutting-edge software and digital execution.
          </p>
        </div>

        {/* Interactive Diagram Canvas */}
        <div className="relative max-w-5xl mx-auto p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl transition-colors">
          
          {/* Connecting SVG Curves */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none">
              {/* Center to Left (Farms) */}
              <path
                d="M 500 230 C 400 230, 300 200, 200 200"
                stroke={activeBusiness?.slug === farms?.slug ? '#10b981' : '#1e293b'}
                strokeWidth={activeBusiness?.slug === farms?.slug ? '3' : '1.5'}
                strokeDasharray={activeBusiness?.slug === farms?.slug ? 'none' : '4 4'}
                className="transition-all duration-300"
              />
              {/* Center to Right (Digital) */}
              <path
                d="M 500 230 C 600 230, 700 200, 800 200"
                stroke={activeBusiness?.slug === digital?.slug ? '#3b82f6' : '#1e293b'}
                strokeWidth={activeBusiness?.slug === digital?.slug ? '3' : '1.5'}
                strokeDasharray={activeBusiness?.slug === digital?.slug ? 'none' : '4 4'}
                className="transition-all duration-300"
              />
              {/* Center to Bottom nodes */}
              <path
                d="M 500 280 C 500 340, 260 380, 260 410"
                stroke="#1e293b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M 500 280 C 500 350, 500 380, 500 410"
                stroke="#1e293b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M 500 280 C 500 340, 740 380, 740 410"
                stroke="#1e293b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Primary Top Row Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center relative z-10">
            
            {/* Node 1: Tchuki Farms */}
            {farms && (
              <div
                onMouseEnter={() => setActiveBusiness(farms)}
                onClick={() => onNavigate('business-detail', farms.slug)}
                className={`p-6 rounded-2xl cursor-pointer text-left transition-all duration-300 border ${
                  activeBusiness?.slug === farms.slug
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-xl shadow-emerald-500/20 dark:shadow-emerald-950/50 scale-105'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-emerald-700/50 flex items-center justify-center shrink-0">
                    <img src="/assets/tchuki_farms_logo.jpg" alt="Tchuki Farms" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{farms.name}</h3>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">{farms.slogan}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  BioKash Organic Fertilizer (50KG), high-yield seedling nursery, and farmer training.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>Explore Farms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* Central Nucleus: TCHUKI */}
            <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border-2 border-emerald-500/60 shadow-2xl shadow-emerald-500/10 dark:shadow-emerald-950/60 relative group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-blue-600 p-[2px] mb-3 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-2xl bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-2">
                  <img
                    src="/assets/aistudio/Tchuki_Group_Eco-Tech_Logo_b371a75d.png"
                    alt="Tchuki Group"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-wider font-heading">
                TCHUKI
              </h3>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono mt-0.5 font-semibold">
                Parent Brand
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 text-center max-w-[180px]">
                One Unified Corporate Identity
              </p>
            </div>

            {/* Node 2: Tchuki Digital */}
            {digital && (
              <div
                onMouseEnter={() => setActiveBusiness(digital)}
                onClick={() => onNavigate('business-detail', digital.slug)}
                className={`p-6 rounded-2xl cursor-pointer text-left transition-all duration-300 border ${
                  activeBusiness?.slug === digital.slug
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 shadow-xl shadow-blue-500/20 dark:shadow-blue-950/50 scale-105'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-blue-500/60 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-24 h-11 rounded-xl bg-slate-950 p-1 border border-blue-700/50 flex items-center justify-center shrink-0">
                    <img src="/assets/tchuki_digital_logo.png" alt="Tchuki Digital" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{digital.name}</h3>
                    <span className="text-xs text-blue-700 dark:text-blue-400 font-semibold">{digital.slogan}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  Enterprise business portals, mobile apps, AI automation, and brand creative systems.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-400 font-semibold">
                  <span>Explore Digital</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

          </div>

          {/* Bottom Row: Additional / Future Businesses dynamically rendered */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 font-semibold">
              Expanding Ventures & Forthcoming Initiatives
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherBusinesses.map((biz) => (
                <div
                  key={biz.id}
                  onClick={() => onNavigate('business-detail', biz.slug)}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 cursor-pointer text-left transition-all"
                >
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">{biz.name}</h4>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400">{biz.category}</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">{biz.short_description}</p>
                </div>
              ))}

              {/* Standard Forthcoming Venture Nodes as shown in Montage */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-dashed border-slate-300 dark:border-slate-800 text-left">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-400 text-xs font-semibold">
                  <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                    <Plus className="w-3 h-3" />
                  </div>
                  <span>Agro-Logistics & Cold Storage</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Forthcoming Group Expansion</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-dashed border-slate-300 dark:border-slate-800 text-left">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-400 text-xs font-semibold">
                  <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                    <Plus className="w-3 h-3" />
                  </div>
                  <span>Renewable Energy for Ag</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Forthcoming Group Expansion</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-dashed border-slate-300 dark:border-slate-800 text-left">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-400 text-xs font-semibold">
                  <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                    <Plus className="w-3 h-3" />
                  </div>
                  <span>Ventures Incubator</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Forthcoming Group Expansion</span>
              </div>
            </div>
          </div>

          {/* Active Business Inspector Drawer / Callout */}
          {activeBusiness && (
            <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-heading">{activeBusiness.name}</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{activeBusiness.slogan}</p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('business-detail', activeBusiness.slug)}
                className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>View Full Business Profile</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </button>
            </div>
          )}

        </div>

        {/* Action Button */}
        <div className="mt-10">
          <button
            onClick={() => onNavigate('businesses')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
          >
            <span>Explore All Group Businesses</span>
            <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </button>
        </div>

      </div>
    </section>
  );
};

