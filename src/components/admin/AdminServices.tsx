import React, { useState } from 'react';
import { Plus, Edit3, Trash2, CheckCircle2, Star, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { BusinessService } from '../../types';

export const AdminServices: React.FC = () => {
  const { services, businesses, addService, updateService, deleteService } = useData();
  const [editingService, setEditingService] = useState<Partial<BusinessService> | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (editingService.id) {
      updateService(editingService.id, editingService);
    } else {
      addService({
        business_id: editingService.business_id || businesses[0]?.id || 'tchuki-digital',
        name: editingService.name || 'New Service',
        slug:
          editingService.slug ||
          (editingService.name || 'service').toLowerCase().replace(/[^a-z0-9]/g, '-'),
        description: editingService.description || '',
        category: editingService.category || 'Solutions',
        icon_name: editingService.icon_name || 'Code2',
        status: (editingService.status as any) || 'published',
        display_order: editingService.display_order || services.length + 1,
        featured_on_home: editingService.featured_on_home ?? true,
      });
    }

    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Services & Solutions Management
          </h2>
          <p className="text-xs text-slate-400">
            Configure services offered by Tchuki Digital, Tchuki Farms, or custom entities. Toggle which appear featured on the homepage.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingService({
              business_id: businesses[0]?.id || 'tchuki-digital',
              name: '',
              slug: '',
              description: '',
              category: 'Digital Innovation',
              icon_name: 'Code2',
              status: 'published',
              display_order: services.length + 1,
              featured_on_home: true,
            })
          }
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((srv) => {
          const biz = businesses.find((b) => b.id === srv.business_id);

          return (
            <div
              key={srv.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-emerald-400 font-semibold">{biz?.name}</span>
                  <span className="text-slate-400">{srv.category}</span>
                </div>

                <h3 className="text-base font-bold text-white font-heading mb-1.5">
                  {srv.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {srv.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() =>
                    updateService(srv.id, {
                      featured_on_home: !srv.featured_on_home,
                    })
                  }
                  className={`text-[11px] font-mono flex items-center gap-1 cursor-pointer ${
                    srv.featured_on_home ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Toggle Homepage Showcase"
                >
                  <Star className="w-3.5 h-3.5" fill={srv.featured_on_home ? '#f59e0b' : 'none'} />
                  <span>{srv.featured_on_home ? 'Featured' : 'Standard'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingService(srv)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteService(srv.id)}
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

      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 text-left">
            <button
              onClick={() => setEditingService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-heading mb-4">
              {editingService.id ? 'Edit Service' : 'Create New Service'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Associated Business *
                </label>
                <select
                  value={editingService.business_id || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, business_id: e.target.value })
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
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.name || ''}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  placeholder="e.g. AI Automation & Workflow Pipelines"
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
                    value={editingService.category || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, category: e.target.value })
                    }
                    placeholder="Engineering / Growth"
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Icon Symbol
                  </label>
                  <select
                    value={editingService.icon_name || 'Code2'}
                    onChange={(e) =>
                      setEditingService({ ...editingService, icon_name: e.target.value })
                    }
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Code2">Code2 (Software)</option>
                    <option value="Monitor">Monitor (Web)</option>
                    <option value="Smartphone">Smartphone (Mobile)</option>
                    <option value="Cpu">Cpu (AI / Tech)</option>
                    <option value="Palette">Palette (Design)</option>
                    <option value="Megaphone">Megaphone (Marketing)</option>
                    <option value="Sprout">Sprout (Agriculture)</option>
                    <option value="Droplets">Droplets (Irrigation)</option>
                    <option value="GraduationCap">GraduationCap (Training)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Service Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  placeholder="Detail what is included in this service..."
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
                <input
                  type="checkbox"
                  id="featured_on_home"
                  checked={editingService.featured_on_home ?? true}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      featured_on_home: e.target.checked,
                    })
                  }
                  className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="featured_on_home">
                  Feature on Tchuki Homepage Services Grid
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

