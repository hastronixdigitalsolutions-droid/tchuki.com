import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Eye, EyeOff, X, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Article } from '../../types';

export const AdminArticles: React.FC = () => {
  const { articles, businesses, addArticle, updateArticle, deleteArticle } = useData();
  const [editingArt, setEditingArt] = useState<Partial<Article> | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArt) return;

    if (editingArt.id) {
      updateArticle(editingArt.id, editingArt);
    } else {
      addArticle({
        business_id: editingArt.business_id || undefined,
        title: editingArt.title || 'New Insight Article',
        slug:
          editingArt.slug ||
          (editingArt.title || 'article').toLowerCase().replace(/[^a-z0-9]/g, '-'),
        excerpt: editingArt.excerpt || '',
        content: editingArt.content || '',
        cover_image_url:
          editingArt.cover_image_url ||
          '/assets/hero_tchuki_agricultural_tech_1792796707277.jpg',
        category: editingArt.category || 'Strategic Perspective',
        author_name: editingArt.author_name || 'Tchuki Executive Team',
        read_time: editingArt.read_time || '4 min read',
        publication_status: (editingArt.publication_status as any) || 'published',
        featured: editingArt.featured ?? false,
        published_at: new Date().toISOString(),
      });
    }

    setEditingArt(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            News & Insights Management
          </h2>
          <p className="text-xs text-slate-400">
            Publish educational articles, company announcements, agronomy research, and technical guides.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingArt({
              title: '',
              slug: '',
              category: 'Agronomy Innovation',
              excerpt: '',
              content: '',
              cover_image_url: '/assets/hero_tchuki_agricultural_tech_1792796707277.jpg',
              author_name: 'Tchuki Team',
              read_time: '4 min read',
              publication_status: 'published',
              featured: false,
            })
          }
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

      <div className="space-y-4">
        {articles.map((art) => {
          const biz = businesses.find((b) => b.id === art.business_id);

          return (
            <div
              key={art.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0">
                  <img
                    src={art.cover_image_url}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono mb-1">
                    <span className="text-emerald-400">{art.category}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{art.read_time}</span>
                    {biz && (
                      <>
                        <span className="text-slate-600">·</span>
                        <span className="text-blue-400">{biz.name}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white font-heading">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <button
                  onClick={() =>
                    updateArticle(art.id, {
                      publication_status:
                        art.publication_status === 'published' ? 'draft' : 'published',
                    })
                  }
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {art.publication_status === 'published' ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Unpublish</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Publish</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setEditingArt(art)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteArticle(art.id)}
                  className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editingArt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingArt(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-heading mb-4">
              {editingArt.id ? 'Edit Article' : 'Write New Article'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingArt.title || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, title: e.target.value })}
                  placeholder="e.g. Accelerating Crop Vitality With BioKash"
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editingArt.category || ''}
                    onChange={(e) =>
                      setEditingArt({ ...editingArt, category: e.target.value })
                    }
                    placeholder="AgriTech / Software"
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Author Attribution
                  </label>
                  <input
                    type="text"
                    value={editingArt.author_name || ''}
                    onChange={(e) =>
                      setEditingArt({ ...editingArt, author_name: e.target.value })
                    }
                    placeholder="Tchuki Agronomy Team"
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Excerpt (Brief Summary) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingArt.excerpt || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, excerpt: e.target.value })}
                  placeholder="Short introductory summary for card preview..."
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Rich Content (Prose & Paragraphs) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={editingArt.content || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, content: e.target.value })}
                  placeholder="Write full article body text..."
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none font-sans"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingArt(null)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

