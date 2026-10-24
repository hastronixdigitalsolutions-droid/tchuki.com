import React, { useState } from 'react';
import {
  Code2,
  Monitor,
  Smartphone,
  Cpu,
  Palette,
  Megaphone,
  Sprout,
  Droplets,
  GraduationCap,
  ArrowRight,
  ArrowUpRight,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { BusinessService } from '../../types';

interface ServicesSectionProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const { services, businesses } = useData();
  const [selectedService, setSelectedService] = useState<BusinessService | null>(null);

  const featuredServices = services.filter((s) => s.featured_on_home && s.status === 'published');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="w-6 h-6" />;
      case 'Monitor':
        return <Monitor className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Palette':
        return <Palette className="w-6 h-6" />;
      case 'Megaphone':
        return <Megaphone className="w-6 h-6" />;
      case 'Sprout':
        return <Sprout className="w-6 h-6" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      default:
        return <Code2 className="w-6 h-6" />;
    }
  };

  return (
    <section id="services-section" className="py-24 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
              What We Offer
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
              Our Core Services & Solutions
            </h2>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="group flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors uppercase tracking-wider font-mono cursor-pointer"
          >
            <span>View All Services Directory</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => {
            const isDigital = service.business_id.includes('digital');

            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative p-7 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md flex flex-col justify-between cursor-pointer backdrop-blur-md overflow-hidden"
              >
                <div>
                  {!isDigital && service.image_url && (
                    <div className="-mx-7 -mt-7 mb-5 h-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                      <img
                        src={service.image_url}
                        alt={service.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  )}

                  {/* Icon Lockup */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                      isDigital
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:border dark:border-blue-800/40 dark:text-blue-400'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:border dark:border-emerald-800/40 dark:text-emerald-400'
                    }`}
                  >
                    {getIcon(service.icon_name)}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-heading mb-2">
                    {service.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-900 dark:text-white">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:border dark:border-emerald-700/50 flex items-center justify-center dark:text-emerald-400 shadow-sm">
                {getIcon(selectedService.icon_name)}
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-semibold">
                  {selectedService.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  {selectedService.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-sans">
              {selectedService.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 mb-6 space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono">
                Delivered under
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {businesses.find((b) => b.id === selectedService.business_id)?.name || 'Tchuki Group'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Custom proposal and milestone-based project management</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  onNavigate('contact');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
