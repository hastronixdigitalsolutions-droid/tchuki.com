import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Project } from '../../types';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { PageBackdrop } from '../common/PageBackdrop';

interface ProjectsPageProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { projects, businesses } = useData();
  const [activeFilter, setActiveFilter] = useState<'all' | 'farms' | 'digital'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    if (activeFilter === 'farms') return p.business_id.includes('farm');
    if (activeFilter === 'digital') return p.business_id.includes('digital');
    return true;
  });

  return (
    <div className="relative pt-28 pb-24 min-h-screen overflow-hidden">
      {/* Thematic Background Photography & Ambient Emerald Spotlight */}
      <PageBackdrop
        imageUrl="/assets/tchuki_farms_field_1792796708179.jpg"
        alt="Tchuki Execution & Projects"
        lighting="emerald"
        opacityClass="opacity-45 dark:opacity-35"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
              Proven Execution
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
              Projects & Impact Portfolio
            </h1>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              Real initiatives engineered across Malawian agribusiness acreage and custom digital software architectures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs shrink-0 shadow-sm backdrop-blur-md">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Initiatives
            </button>
            <button
              onClick={() => setActiveFilter('farms')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeFilter === 'farms'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tchuki Farms
            </button>
            <button
              onClick={() => setActiveFilter('digital')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeFilter === 'digital'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tchuki Digital
            </button>
          </div>
        </div>

        {/* Featured Transformation Showcase with Slider */}
        <div className="mb-16 p-8 rounded-3xl bg-white/95 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-semibold">
              Interactive Case Study
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mt-1">
              Tchuki Farms: Smart Drip Irrigation Transformation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              Compare baseline traditional flood farming with precision solar drip irrigation installations delivering +45% water efficiency and reliable dry-season harvest stability.
            </p>
          </div>

          <BeforeAfterSlider
            beforeImage="/assets/hero_tchuki_agricultural_tech_1792796707277.jpg"
            afterImage="/assets/tchuki_farms_field_1792796708179.jpg"
            beforeLabel="Pre-Irrigation Unregulated Yields"
            afterLabel="Commissioned Precision Drip Infrastructure"
          />
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((proj) => {
            const biz = businesses.find((b) => b.id === proj.business_id);

            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group rounded-2xl bg-white/95 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between shadow-lg backdrop-blur-md"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={proj.cover_image_url}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md text-[11px] font-mono font-semibold text-emerald-400">
                      {biz?.name}
                    </div>
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-slate-950/80 text-[11px] font-mono text-slate-200 capitalize">
                      {proj.project_status}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                      {proj.category}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400 transition-colors font-heading mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-3">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  {proj.metrics && proj.metrics.length > 0 && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                        {proj.metrics[0].value}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {proj.metrics[0].label}
                      </span>
                    </div>
                  )}
                  
                  <div className="mt-3 flex items-center justify-end text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                    <span>Inspect Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-900 dark:text-white">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1 font-semibold">
              {businesses.find((b) => b.id === selectedProject.business_id)?.name} · {selectedProject.category}
            </span>

            <h3 className="text-2xl font-bold font-heading mb-3 text-slate-900 dark:text-white">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-sans">
              {selectedProject.description}
            </p>

            {selectedProject.metrics && (
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                {selectedProject.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400 font-heading">{m.value}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onNavigate('contact');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs cursor-pointer shadow-sm"
              >
                Discuss Similar Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

