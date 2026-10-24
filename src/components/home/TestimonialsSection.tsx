import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, businesses } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const approved = testimonials.filter((t) => t.approved);

  if (approved.length === 0) {
    return (
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-center transition-colors">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">Why Work With Tchuki?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            A trusted parent brand delivering genuine real-world execution across agronomy and technology.
          </p>
        </div>
      </section>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? approved.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === approved.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
              Partner & Client Voices
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading mt-1">
              What People Say
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-sm"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-sm"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {approved.map((item, idx) => {
            const isActive = idx === currentIndex;
            const biz = businesses.find((b) => b.id === item.business_id);

            return (
              <div
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-7 rounded-2xl transition-all duration-300 flex flex-col justify-between border cursor-pointer backdrop-blur-md ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 border-emerald-500 shadow-xl shadow-emerald-500/10 dark:shadow-emerald-950/20 scale-[1.02]'
                    : 'bg-white/80 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/80 opacity-80 hover:opacity-100 hover:border-slate-400 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                <div>
                  {/* Rating Stars & Associated Business */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {biz && (
                      <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                        {biz.name}
                      </span>
                    )}
                  </div>

                  <Quote className="w-6 h-6 text-emerald-600/40 dark:text-emerald-500/40 mb-2" />

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm">
                    {item.customer_name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-heading">
                      {item.customer_name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {item.role} · {item.organization}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {approved.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'w-6 bg-emerald-500' : 'w-1.5 bg-slate-300 dark:bg-slate-800'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

