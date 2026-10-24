import React from 'react';
import { useData } from '../../context/DataContext';

export const GlanceStatsSection: React.FC = () => {
  const { settings } = useData();

  if (!settings.show_verified_stats) return null;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Tchuki at a Glance</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {/* Stat 1 */}
          <div className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 transition-colors shadow-sm">
            <span className="block text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tabular-nums mb-2">
              {settings.stat_counters.businesses}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono font-medium">
              Core Businesses
            </span>
          </div>

          {/* Stat 2 */}
          <div className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 transition-colors shadow-sm">
            <span className="block text-4xl sm:text-5xl font-extrabold text-emerald-700 dark:text-emerald-400 font-heading tabular-nums mb-2">
              {settings.stat_counters.industries}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono font-medium">
              Key Industries
            </span>
          </div>

          {/* Stat 3 */}
          <div className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 transition-colors shadow-sm">
            <span className="block text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tabular-nums mb-2">
              {settings.stat_counters.projects}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono font-medium">
              Projects & Portfolios
            </span>
          </div>

          {/* Stat 4 */}
          <div className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 transition-colors shadow-sm">
            <span className="block text-4xl sm:text-5xl font-extrabold text-teal-700 dark:text-teal-300 font-heading tabular-nums mb-2">
              {settings.stat_counters.commitment}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono font-medium">
              Commitment to Quality
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

