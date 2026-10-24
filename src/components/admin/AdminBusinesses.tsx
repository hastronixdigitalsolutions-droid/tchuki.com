import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Eye, EyeOff, Check, X, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Business } from '../../types';

export const AdminBusinesses: React.FC = () => {
  const { businesses, addBusiness, updateBusiness, deleteBusiness } = useData();

  const [editingBiz, setEditingBiz] = useState<Partial<Business> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBiz) return;

    if (editingBiz.id) {
      updateBusiness(editingBiz.id, editingBiz);
    } else {
      addBusiness({
        name: editingBiz.name || 'New Business Venture',
        slug:
          editingBiz.slug ||
          (editingBiz.name || 'venture').toLowerCase().replace(/[^a-z0-9]/g, '-'),
        slogan: editingBiz.slogan || '',
        category: editingBiz.category || 'Agribusiness & Technology',
        short_description: editingBiz.short_description || '',
        full_description: editingBiz.full_description || '',
        logo_url: editingBiz.logo_url || '/assets/aistudio/Tchuki_Group_Eco-Tech_Logo_b371a75d.png',
        cover_image_url:
          editingBiz.cover_image_url || '/src/assets/images/tchuki_farms_field_1792796708179.jpg',
        brand_color: editingBiz.brand_color || '#10b981',
        email: editingBiz.email || 'tchukimediahouse@gmail.com',
        phone: editingBiz.phone || '+265 986 611 989',
        display_order: editingBiz.display_order || businesses.length + 1,
        status: (editingBiz.status as any) || 'published',
        features: editingBiz.features || ['Innovation', 'Sustainability', 'Scale'],
      });
    }

    setEditingBiz(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Business Management
          </h2>
          <p className="text-xs text-slate-400">
            Add, edit, or archive subsidiaries under the Tchuki parent umbrella. Changes reflect immediately across the public site and interactive ecosystem.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingBiz({
              name: '',
              slug: '',
              slogan: '',
              category: '',
              short_description: '',
              full_description: '',
              brand_color: '#10b981',
              email: 'tchukimediahouse@gmail.com',
              phone: '+265 986 611 989',
              status: 'published',
              features: ['Quality Service', 'Client Partnership', 'Community Impact'],
            })
          }
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Business</span>
        </button>
      </div>

      {/* Businesses Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {businesses.map((biz) => (
          <div
            key={biz.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0"
                    style={{ borderColor: biz.brand_color }}
                  >
                    <img
                      src={biz.logo_url || biz.cover_image_url}
                      alt={biz.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">
                      {biz.name}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400">
                      {biz.category}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                    biz.status === 'published'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {biz.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {biz.short_description}
              </p>

              <div className="mt-3 text-[11px] text-slate-400 space-y-1 font-mono">
                <div>Slug: /{biz.slug}</div>
                <div>Phone: {biz.phone}</div>
                <div>Email: {biz.email}</div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() =>
                  updateBusiness(biz.id, {
                    status: biz.status === 'published' ? 'draft' : 'published',
                  })
                }
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {biz.status === 'published' ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-500" />
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
                  onClick={() => setEditingBiz(biz)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  title="Edit Business"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(biz.id)}
                  className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors"
                  title="Safe Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingBiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto text-left">
            <button
              onClick={() => setEditingBiz(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-heading mb-4">
              {editingBiz.id ? 'Edit Business Details' : 'Create New Business Venture'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingBiz.name || ''}
                  onChange={(e) => setEditingBiz({ ...editingBiz, name: e.target.value })}
                  placeholder="e.g. Tchuki Logistics"
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Slug / URL Key *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBiz.slug || ''}
                    onChange={(e) => setEditingBiz({ ...editingBiz, slug: e.target.value })}
                    placeholder="tchuki-logistics"
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBiz.category || ''}
                    onChange={(e) => setEditingBiz({ ...editingBiz, category: e.target.value })}
                    placeholder="Cold Storage & Freight"
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Official Slogan
                </label>
                <input
                  type="text"
                  value={editingBiz.slogan || ''}
                  onChange={(e) => setEditingBiz({ ...editingBiz, slogan: e.target.value })}
                  placeholder="Delivering Agricultural Quality Everywhere"
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none italic"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Description (Card Summary) *
                </label>
                <input
                  type="text"
                  required
                  value={editingBiz.short_description || ''}
                  onChange={(e) =>
                    setEditingBiz({ ...editingBiz, short_description: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Description & Scope *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingBiz.full_description || ''}
                  onChange={(e) =>
                    setEditingBiz({ ...editingBiz, full_description: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Direct Telephone
                  </label>
                  <input
                    type="text"
                    value={editingBiz.phone || ''}
                    onChange={(e) => setEditingBiz({ ...editingBiz, phone: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={editingBiz.email || ''}
                    onChange={(e) => setEditingBiz({ ...editingBiz, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBiz(null)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  Save Business Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Safe Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-red-900/50 rounded-3xl max-w-md w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950 text-red-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              Confirm Safe Delete
            </h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to remove this business record? All associated public displays will update immediately.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteBusiness(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
