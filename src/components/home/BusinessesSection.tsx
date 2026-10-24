import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface BusinessesSectionProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const BusinessesSection: React.FC<BusinessesSectionProps> = ({ onNavigate }) => {
  const { businesses } = useData();

  return (
    <section id="businesses-section" className="py-24 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
              One Group. Multiple Businesses. One Vision.
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
              Our Core Businesses
            </h2>
          </div>

          <button
            onClick={() => onNavigate('businesses')}
            className="group flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors uppercase tracking-wider font-mono cursor-pointer"
          >
            <span>View All Businesses</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {businesses.map((biz) => {
            const isFarms = biz.slug.includes('farm');

            return (
              <div
                key={biz.id}
                onClick={() => onNavigate('business-detail', biz.slug)}
                className="group relative rounded-3xl bg-white/95 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-2xl shadow-lg flex flex-col cursor-pointer backdrop-blur-md"
              >
                {/* Visual Image Header */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={biz.cover_image_url}
                    alt={biz.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Top Category Text */}
                  <div className="absolute top-5 left-5 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-xs font-semibold text-slate-200 border border-slate-700/60 font-mono">
                    {biz.category}
                  </div>

                  {/* Slogan pill in bottom of image */}
                  <div className="absolute bottom-4 left-5 right-5 text-xs font-medium text-emerald-300 italic">
                    "{biz.slogan}"
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-950/95 p-1.5 border border-slate-200 dark:border-slate-700/60 shadow-md flex items-center justify-center shrink-0">
                          <img
                            src={biz.logo_url}
                            alt={biz.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {biz.name}
                        </h3>
                      </div>
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                          isFarms
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-6">
                      {biz.short_description}
                    </p>

                    {/* Features & Key Capabilities */}
                    <div className="space-y-2 mb-6 border-t border-slate-200 dark:border-slate-800/80 pt-4">
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                        Key Capabilities & Deliverables
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                        {biz.features.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isFarms ? 'text-emerald-600 dark:text-emerald-500' : 'text-blue-600 dark:text-blue-500'
                              }`}
                            />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {biz.phone}
                    </span>

                    <span
                      className={`text-xs font-semibold flex items-center gap-1 group-hover:underline ${
                        isFarms ? 'text-emerald-700 dark:text-emerald-400' : 'text-blue-700 dark:text-blue-400'
                      }`}
                    >
                      <span>Explore {biz.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

