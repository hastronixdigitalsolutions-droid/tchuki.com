import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Project } from '../../types';

export const AdminProjects: React.FC = () => {
  const { projects, businesses, addProject, updateProject, deleteProject } = useData();
  const [editingProj, setEditingProj] = useState<Partial<Project> | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProj) return;

    if (editingProj.id) {
      updateProject(editingProj.id, editingProj);
    } else {
      addProject({
        business_id: editingProj.business_id || businesses[0]?.id || 'tchuki-farms',
        title: editingProj.title || 'New Initiative',
        slug:
          editingProj.slug ||
          (editingProj.title || 'project').toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category: editingProj.category || 'Engineering',
        description: editingProj.description || '',
        cover_image_url:
          editingProj.cover_image_url || '/assets/tchuki_farms_field_1792796708179.jpg',
        before_image_url: editingProj.before_image_url,
        after_image_url: editingProj.after_image_url,
        gallery_urls: editingProj.gallery_urls || [],
        project_status: (editingProj.project_status as any) || 'completed',
        publication_status: (editingProj.publication_status as any) || 'published',
        metrics: editingProj.metrics || [{ label: 'Impact Factor', value: '100%' }],
      });
    }

    setEditingProj(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Projects & Portfolio Management
          </h2>
          <p className="text-xs text-slate-400">
            Publish verified case studies, before/after comparisons, and field trials across agriculture and technology.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingProj({
              business_id: businesses[0]?.id || 'tchuki-farms',
              title: '',
              slug: '',
              category: 'Sustainable Agronomy',
              description: '',
              cover_image_url: '/assets/tchuki_farms_field_1792796708179.jpg',
              project_status: 'completed',
              publication_status: 'published',
              metrics: [{ label: 'Performance Gain', value: '+35%' }],
            })
          }
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => {
          const biz = businesses.find((b) => b.id === proj.business_id);

          return (
            <div
              key={proj.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400">
                      {biz?.name} · {proj.category}
                    </span>
                    <h3 className="text-base font-bold text-white font-heading mt-0.5">
                      {proj.title}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                      proj.publication_status === 'published'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {proj.publication_status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {proj.description}
                </p>

                <div className="mt-3 text-xs text-slate-400 font-mono">
                  Status: <span className="text-slate-200 capitalize">{proj.project_status}</span>
                  {proj.before_image_url && proj.after_image_url && (
                    <span className="ml-3 text-emerald-400">· Interactive Slider Active</span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() =>
                    updateProject(proj.id, {
                      publication_status:
                        proj.publication_status === 'published' ? 'draft' : 'published',
                    })
                  }
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {proj.publication_status === 'published' ? (
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

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingProj(proj)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {editingProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProj(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-heading mb-4">
              {editingProj.id ? 'Edit Project' : 'Create Project'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProj.title || ''}
                  onChange={(e) => setEditingProj({ ...editingProj, title: e.target.value })}
                  placeholder="e.g. Smart Irrigation Expansion"
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Related Business
                  </label>
                  <select
                    value={editingProj.business_id || ''}
                    onChange={(e) =>
                      setEditingProj({ ...editingProj, business_id: e.target.value })
                    }
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    {businesses.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editingProj.category || ''}
                    onChange={(e) => setEditingProj({ ...editingProj, category: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProj.description || ''}
                  onChange={(e) =>
                    setEditingProj({ ...editingProj, description: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Before Image URL (Optional Slider)
                  </label>
                  <input
                    type="text"
                    value={editingProj.before_image_url || ''}
                    onChange={(e) =>
                      setEditingProj({ ...editingProj, before_image_url: e.target.value })
                    }
                    placeholder="/assets/..."
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    After Image URL (Optional Slider)
                  </label>
                  <input
                    type="text"
                    value={editingProj.after_image_url || ''}
                    onChange={(e) =>
                      setEditingProj({ ...editingProj, after_image_url: e.target.value })
                    }
                    placeholder="/assets/..."
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProj(null)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

