import React from 'react';
import { ArrowUpRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PageBackdrop } from '../common/PageBackdrop';

interface BusinessesPageProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const BusinessesPage: React.FC<BusinessesPageProps> = ({ onNavigate }) => {
  const { businesses } = useData();

  return (
    <div className="relative pt-28 pb-24 min-h-screen overflow-hidden">
      {/* Thematic Background Photography with Emerald & Tech Lighting */}
      <PageBackdrop
        imageUrl="/assets/tchuki_farms_seedlings_nursery_1792798452384.jpg"
        alt="Tchuki Business Operations"
        lighting="emerald"
        opacityClass="opacity-45 dark:opacity-35"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
            Group Architecture
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            Our Business Ventures
          </h1>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            Tchuki brings together complementary business entities under one unified corporate umbrella, empowering farmers, advancing digital solutions, and building sustainable commercial infrastructure.
          </p>
        </div>

        {/* Dynamic Business List */}
        <div className="space-y-12">
          {businesses.map((biz) => {
            const isFarms = biz.slug.includes('farm');

            return (
              <div
                key={biz.id}
                className="rounded-3xl bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-0 transition-colors"
              >
                {/* Visual Column (Col 1-5) */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-900">
                  <img
                    src={biz.cover_image_url}
                    alt={biz.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/60" />
                  
                  <div className="absolute top-5 left-5 px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-xs font-mono font-semibold text-emerald-400 border border-slate-700/60">
                    {biz.category}
                  </div>
                </div>

                {/* Content Column (Col 6-12) */}
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-950/95 p-1.5 border border-slate-200 dark:border-slate-700/60 shadow-lg flex items-center justify-center shrink-0">
                          <img
                            src={biz.logo_url}
                            alt={biz.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
                            {biz.name}
                          </h2>
                          <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium italic mt-0.5">
                            "{biz.slogan}"
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onNavigate('business-detail', biz.slug);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`p-3 rounded-xl transition-all cursor-pointer shadow-sm ${
                          isFarms
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-600 hover:text-white dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white'
                        }`}
                        aria-label={`Open ${biz.name} profile`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {biz.full_description}
                    </p>

                    {/* Features list */}
                    <div className="pt-3">
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono mb-2">
                        Core Capabilities
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                        {biz.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isFarms ? 'text-emerald-600 dark:text-emerald-500' : 'text-blue-600 dark:text-blue-500'
                              }`}
                            />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{biz.phone}</span>
                      </span>
                      <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{biz.email}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate('business-detail', biz.slug);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Explore Dedicated Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

