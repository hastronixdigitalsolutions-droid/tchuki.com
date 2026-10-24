import React, { useState } from 'react';
import { Image, Copy, Check, Filter, Upload, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminMedia: React.FC = () => {
  const { media } = useData();
  const [filter, setFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = filter === 'all' ? media : media.filter((m) => m.category === filter);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Media Library & Assets
          </h2>
          <p className="text-xs text-slate-400">
            High-resolution photography, brand marks, and product packshots organized by sector.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'all' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({media.length})
          </button>
          <button
            onClick={() => setFilter('farming')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'farming' ? 'bg-emerald-950 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Farming
          </button>
          <button
            onClick={() => setFilter('digital')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'digital' ? 'bg-blue-950 text-blue-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Digital
          </button>
          <button
            onClick={() => setFilter('products')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'products' ? 'bg-teal-950 text-teal-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Products
          </button>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-semibold text-emerald-400 uppercase">
                  {item.category}
                </span>
              </div>

              <h4 className="text-xs font-bold text-white font-heading truncate">
                {item.name}
              </h4>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Size: {item.size} · Uploaded: {item.uploaded_at}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 truncate max-w-[150px]">
                {item.url}
              </span>

              <button
                onClick={() => handleCopyUrl(item.id, item.url)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                title="Copy Image Path"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Path</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
