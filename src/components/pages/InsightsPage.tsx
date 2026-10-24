import React, { useState } from 'react';
import { Calendar, Clock, X, ArrowLeft, Share2, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Article } from '../../types';
import { PageBackdrop } from '../common/PageBackdrop';

interface InsightsPageProps {
  initialSlug?: string;
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ initialSlug, onNavigate }) => {
  const { articles, businesses } = useData();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => {
    if (initialSlug) {
      return articles.find((a) => a.slug === initialSlug) || null;
    }
    return null;
  });
  const [copied, setCopied] = useState(false);

  const published = articles.filter((a) => a.publication_status === 'published');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative pt-28 pb-24 min-h-screen overflow-hidden">
      {/* Thematic Background Photography & Warm Editorial Spotlight */}
      <PageBackdrop
        imageUrl="/assets/hero_tchuki_agricultural_tech_1792796707277.jpg"
        alt="Tchuki Insights and Editorial"
        lighting="warm"
        opacityClass="opacity-45 dark:opacity-35"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
            Tchuki Publication & Insights
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            News, Field Notes & Technical Perspectives
          </h1>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            Perspectives on regenerative agriculture, BioKash soil rehabilitation, enterprise digital transformation, and sustainable economic infrastructure in Malawi.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {published.map((art) => {
            const biz = businesses.find((b) => b.id === art.business_id);

            return (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group rounded-2xl bg-white/95 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between shadow-lg backdrop-blur-md"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={art.cover_image_url}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md text-[11px] font-mono text-emerald-400 font-semibold">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                      <span>
                        {new Date(art.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>·</span>
                      <span>{art.read_time}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400 transition-colors font-heading mb-2 line-clamp-2">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-200 dark:border-slate-800/60 mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="truncate">{art.author_name}</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold group-hover:underline">
                    Read Article →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto text-slate-900 dark:text-white">
            
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-6">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Insights</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedArticle.cover_image_url}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>{selectedArticle.category}</span>
                <span>·</span>
                <span>
                  {new Date(selectedArticle.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>·</span>
                <span>{selectedArticle.read_time}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
                {selectedArticle.title}
              </h2>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono pb-4 border-b border-slate-200 dark:border-slate-800">
                Authored by {selectedArticle.author_name}
              </div>

              {/* Rich Content Display */}
              <div className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed space-y-4 pt-4 whitespace-pre-line font-sans">
                {selectedArticle.content}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

