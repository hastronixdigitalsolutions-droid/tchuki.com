import React, { useState } from 'react';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Project } from '../../types';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';

interface ProjectsSectionProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  const { projects, businesses } = useData();
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const publishedProjects = projects.filter((p) => p.publication_status === 'published');
  const filteredProjects =
    filter === 'all'
      ? publishedProjects
      : publishedProjects.filter((p) => p.business_id === filter);

  return (
    <section id="projects-section" className="py-24 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
              Our Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
              Featured Projects & Impact
            </h2>
          </div>

          {/* Interactive Filter Control */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('tchuki-farms')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'tchuki-farms'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tchuki Farms
            </button>
            <button
              onClick={() => setFilter('tchuki-digital')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'tchuki-digital'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tchuki Digital
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const biz = businesses.find((b) => b.id === project.business_id);
            const isFarms = project.business_id.includes('farm');

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md cursor-pointer flex flex-col backdrop-blur-md"
              >
                {/* Cover Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.cover_image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-emerald-400 font-mono">
                    {biz?.name || 'Tchuki'}
                  </div>

                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-heading mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics preview if any */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center gap-4 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                          {project.metrics[0].value}
                        </span>{' '}
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                          {project.metrics[0].label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-left max-h-[90vh] overflow-y-auto text-slate-900 dark:text-white">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Business kicker */}
            <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1 font-semibold">
              {businesses.find((b) => b.id === selectedProject.business_id)?.name} · {selectedProject.category}
            </div>

            <h3 className="text-2xl font-bold font-heading mb-3 text-slate-900 dark:text-white">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-sans">
              {selectedProject.description}
            </p>

            {/* Before / After comparison slider if both images exist */}
            {selectedProject.before_image_url && selectedProject.after_image_url && (
              <div className="mb-6">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono mb-2">
                  Interactive Transformation Comparison
                </div>
                <BeforeAfterSlider
                  beforeImage={selectedProject.before_image_url}
                  afterImage={selectedProject.after_image_url}
                  beforeLabel="Initial Baseline / Challenge"
                  afterLabel="Engineered Outcome / Tchuki"
                />
              </div>
            )}

            {/* Metrics */}
            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400 font-heading tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Gallery Thumbnails */}
            {selectedProject.gallery_urls && selectedProject.gallery_urls.length > 0 && (
              <div className="space-y-2 mb-6">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Project Gallery
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {selectedProject.gallery_urls.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`Gallery preview ${idx + 1}`}
                      className="h-24 w-full object-contain rounded-xl border border-slate-200 dark:border-slate-800 bg-white"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onNavigate('contact');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Discuss Similar Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

