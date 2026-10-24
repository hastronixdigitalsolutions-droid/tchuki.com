import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Sprout, Terminal, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PageBackdrop } from '../common/PageBackdrop';

interface HeroSectionProps {
  onNavigate: (view: string, detailSlug?: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onScrollToSection }) => {
  const { settings, businesses } = useData();
  const [tiltFarm, setTiltFarm] = useState({ x: 0, y: 0 });
  const [tiltDigital, setTiltDigital] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleCardMouseLeave = (
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    setTilt({ x: 0, y: 0 });
  };

  const farms = businesses.find(b => b.slug === 'tchuki-farms') || businesses[0];
  const digital = businesses.find(b => b.slug === 'tchuki-digital') || businesses[1];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Cinematic Imagery with Increased Capacity & Radiant Lighting */}
      <PageBackdrop
        imageUrl="/src/assets/images/hero_tchuki_agricultural_tech_1792796707277.jpg"
        alt="Tchuki Agriculture and Technology landscape"
        lighting="hybrid"
        opacityClass="opacity-50 dark:opacity-45"
        scrimStrength="soft"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Value Proposition Column (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{settings.parent_brand} Group of Companies</span>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span className="text-slate-600 dark:text-slate-400">Malawi & International</span>
            </div>

            {/* Cinematic Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08] text-balance font-heading">
              Growing Ideas.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 dark:from-emerald-400 dark:to-teal-200">
                Building Businesses.
              </span>{' '}
              Creating Impact.
            </h1>

            {/* Concrete Value Description */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-2xl font-sans">
              {settings.hero_supporting_text}
            </p>

            {/* CTAs with Directional Micro-Interactions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onScrollToSection('businesses-section')}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-950/20 hover:shadow-emerald-600/30 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>{settings.hero_primary_cta}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/90 hover:bg-slate-100 text-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-slate-200 font-medium text-sm border border-slate-300 dark:border-slate-700/80 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap backdrop-blur-sm"
              >
                <span>{settings.hero_secondary_cta}</span>
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>

            {/* Authentic Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-300/80 dark:border-slate-800/80 max-w-lg">
              <div>
                <span className="block text-2xl font-extrabold text-slate-900 dark:text-white font-heading tabular-nums">
                  {settings.stat_counters.businesses}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Core Businesses</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-heading tabular-nums">
                  {settings.stat_counters.projects}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Delivered Projects</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-teal-600 dark:text-teal-300 font-heading tabular-nums">
                  {settings.stat_counters.commitment}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Sustainable Focus</span>
              </div>
            </div>

          </div>

          {/* Floating Business Cards Showcase (Col 8-12) */}
          <div className="lg:col-span-5 relative flex flex-col gap-5 sm:gap-6">
            
            {/* Animated Connection Lines overlay */}
            <div className="absolute -left-6 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-emerald-500/0 via-emerald-500/40 to-blue-500/0 hidden lg:block rounded-full" />

            {/* Card 1: Tchuki Farms */}
            {farms && (
              <div
                onMouseMove={(e) => handleCardMouseMove(e, setTiltFarm)}
                onMouseLeave={() => handleCardMouseLeave(setTiltFarm)}
                style={{
                  transform: `perspective(1000px) rotateX(${tiltFarm.y}deg) rotateY(${tiltFarm.x}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={() => onNavigate('business-detail', farms.slug)}
                className="group relative p-6 rounded-2xl bg-white/95 dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-950/90 border border-slate-200 dark:border-emerald-900/50 hover:border-emerald-500 shadow-xl shadow-slate-200/60 dark:shadow-black/40 hover:shadow-emerald-950/30 backdrop-blur-md cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-950 p-1.5 border border-slate-200 dark:border-emerald-700/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                      <img src="/assets/tchuki_farms_logo.jpg" alt="Tchuki Farms" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 transition-colors font-heading">
                        {farms.name}
                      </h3>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        {farms.slogan}
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {farms.short_description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-mono text-emerald-700 dark:text-emerald-400/90 font-medium">BioKash (50KG) · Seedlings Nursery · Irrigation</span>
                  <span className="text-slate-700 dark:text-slate-300 group-hover:underline font-medium">Explore Farms →</span>
                </div>
              </div>
            )}

            {/* Card 2: Tchuki Digital */}
            {digital && (
              <div
                onMouseMove={(e) => handleCardMouseMove(e, setTiltDigital)}
                onMouseLeave={() => handleCardMouseLeave(setTiltDigital)}
                style={{
                  transform: `perspective(1000px) rotateX(${tiltDigital.y}deg) rotateY(${tiltDigital.x}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={() => onNavigate('business-detail', digital.slug)}
                className="group relative p-6 rounded-2xl bg-white/95 dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-950/90 border border-slate-200 dark:border-blue-900/50 hover:border-blue-500 shadow-xl shadow-slate-200/60 dark:shadow-black/40 hover:shadow-blue-950/30 backdrop-blur-md cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-12 rounded-xl bg-slate-950 p-1 border border-blue-700/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                      <img src="/assets/tchuki_digital_logo.png" alt="Tchuki Digital" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors font-heading">
                        {digital.name}
                      </h3>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        {digital.slogan}
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {digital.short_description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-mono text-blue-700 dark:text-blue-400/90 font-medium">Custom Apps · ERPs · Web · Branding</span>
                  <span className="text-slate-700 dark:text-slate-300 group-hover:underline font-medium">Explore Digital →</span>
                </div>
              </div>
            )}

            {/* Ecosystem Teaser banner */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>One unified ecosystem designed for sustainable African enterprise growth.</span>
            </div>

          </div>

        </div>

        {/* Scroll discovery indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => onScrollToSection('ecosystem-section')}
            className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors group cursor-pointer"
          >
            <span className="tracking-widest uppercase font-mono text-[10px]">Scroll to explore ecosystem</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
