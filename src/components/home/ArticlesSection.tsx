import React from 'react';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface ArticlesSectionProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ onNavigate }) => {
  const { articles } = useData();

  const publishedArticles = articles
    .filter((a) => a.publication_status === 'published')
    .slice(0, 3);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
              Knowledge & Updates
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
              News & Insights
            </h2>
          </div>

          <button
            onClick={() => onNavigate('insights')}
            className="group flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors uppercase tracking-wider font-mono cursor-pointer"
          >
            <span>All Articles & News</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate('insights', article.slug)}
              className="group rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md cursor-pointer flex flex-col justify-between backdrop-blur-md"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-emerald-400 font-mono">
                    {article.category}
                  </div>
                </div>

                <div className="p-6">
                  {/* Clean unboxed metadata with separators (no pill cliches) */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      {new Date(article.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      {article.read_time}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400 transition-colors font-heading mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/60 mt-4">
                <span className="truncate">{article.author_name}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold group-hover:underline flex items-center gap-1">
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
