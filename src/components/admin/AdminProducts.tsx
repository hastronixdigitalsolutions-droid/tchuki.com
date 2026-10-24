import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Eye, EyeOff, X, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';

export const AdminProducts: React.FC = () => {
  const { products, businesses, addProduct, updateProduct, deleteProduct } = useData();
  const [editingProd, setEditingProd] = useState<Partial<Product> | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProd) return;

    if (editingProd.id) {
      updateProduct(editingProd.id, editingProd);
    } else {
      addProduct({
        business_id: editingProd.business_id || businesses[0]?.id || 'tchuki-farms',
        name: editingProd.name || 'New Product',
        slug:
          editingProd.slug ||
          (editingProd.name || 'product').toLowerCase().replace(/[^a-z0-9]/g, '-'),
        description: editingProd.description || '',
        category: editingProd.category || 'Agribusiness Inputs',
        image_urls: editingProd.image_urls || [
          '/assets/biokash_50kg_bag.png',
        ],
        price: editingProd.price,
        currency: editingProd.currency || 'MWK',
        availability_status: (editingProd.availability_status as any) || 'in_stock',
        publication_status: (editingProd.publication_status as any) || 'published',
        features: editingProd.features || ['Organic', 'Eco-friendly', 'High Yield'],
      });
    }

    setEditingProd(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Products & Goods Catalog
          </h2>
          <p className="text-xs text-slate-400">
            Manage physical agricultural products such as BioKash Organic Fertilizer, seedlings, and farm inputs.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingProd({
              business_id: businesses[0]?.id || 'tchuki-farms',
              name: '',
              slug: '',
              description: '',
              category: 'Organic Soil Inputs',
              image_urls: ['/assets/biokash_50kg_bag.png'],
              price: 35000,
              currency: 'MWK',
              availability_status: 'in_stock',
              publication_status: 'published',
              features: ['Natural and Safe', 'Tested in Field Trials', '100% Organic'],
            })
          }
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((prod) => {
          const biz = businesses.find((b) => b.id === prod.business_id);

          return (
            <div
              key={prod.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-700 shrink-0">
                      <img
                        src={prod.image_urls[0]}
                        alt={prod.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-heading">
                        {prod.name}
                      </h3>
                      <span className="text-[11px] font-mono text-emerald-400">
                        {biz?.name} · {prod.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                      prod.publication_status === 'published'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {prod.publication_status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {prod.description}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">
                    {prod.price ? `${prod.price.toLocaleString()} ${prod.currency}` : 'Inquire for pricing'}
                  </span>
                  <span className="text-slate-400 capitalize">
                    Status: {prod.availability_status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() =>
                    updateProduct(prod.id, {
                      publication_status:
                        prod.publication_status === 'published' ? 'draft' : 'published',
                    })
                  }
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {prod.publication_status === 'published' ? (
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
                    onClick={() => setEditingProd(prod)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteProduct(prod.id)}
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

      {editingProd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProd(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-heading mb-4">
              {editingProd.id ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingProd.name || ''}
                  onChange={(e) => setEditingProd({ ...editingProd, name: e.target.value })}
                  placeholder="e.g. BioKash Organic Fertilizer"
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Associated Business
                  </label>
                  <select
                    value={editingProd.business_id || ''}
                    onChange={(e) =>
                      setEditingProd({ ...editingProd, business_id: e.target.value })
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
                    value={editingProd.category || ''}
                    onChange={(e) => setEditingProd({ ...editingProd, category: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Product Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProd.description || ''}
                  onChange={(e) =>
                    setEditingProd({ ...editingProd, description: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Price (Optional)
                  </label>
                  <input
                    type="number"
                    value={editingProd.price || ''}
                    onChange={(e) =>
                      setEditingProd({ ...editingProd, price: Number(e.target.value) })
                    }
                    placeholder="35000"
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Currency Code
                  </label>
                  <input
                    type="text"
                    value={editingProd.currency || 'MWK'}
                    onChange={(e) => setEditingProd({ ...editingProd, currency: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProd(null)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
