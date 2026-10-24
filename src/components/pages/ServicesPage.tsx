import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Sprout, Terminal, CheckCircle2, MessageSquare } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PageBackdrop } from '../common/PageBackdrop';

interface ServicesPageProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { services, products, businesses } = useData();
  const [activeTab, setActiveTab] = useState<'all' | 'services' | 'products'>('all');
  const [selectedBusiness, setSelectedBusiness] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter((s) => {
    const matchesBiz = selectedBusiness === 'all' || s.business_id === selectedBusiness;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBiz && matchesSearch && s.status === 'published';
  });

  const filteredProducts = products.filter((p) => {
    const matchesBiz = selectedBusiness === 'all' || p.business_id === selectedBusiness;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBiz && matchesSearch && p.publication_status === 'published';
  });

  return (
    <div className="relative pt-28 pb-24 min-h-screen overflow-hidden">
      {/* Thematic Background Photography & Ambient Blue Spotlight */}
      <PageBackdrop
        imageUrl="/src/assets/images/tchuki_digital_studio_1792796708817.jpg"
        alt="Tchuki Digital & Agricultural Services"
        lighting="blue"
        opacityClass="opacity-45 dark:opacity-35"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
            Directory & Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            Products & Services
          </h1>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            Search and explore all verified solutions offered across Tchuki Farms and Tchuki Digital. Inquire directly for commercial procurement and custom engineering.
          </p>
        </div>

        {/* Search & Filters Controls */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, services, keywords..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none placeholder:text-slate-400 shadow-inner"
            />
          </div>

          {/* Business & Tab Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Tab switch */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Services ({filteredServices.length})
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Products ({filteredProducts.length})
              </button>
            </div>

            {/* Business selector */}
            <select
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
              className="text-xs py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">All Businesses</option>
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Products Section if visible */}
        {(activeTab === 'all' || activeTab === 'products') && filteredProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Agribusiness Products</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProducts.map((prod) => {
                const biz = businesses.find((b) => b.id === prod.business_id);
                return (
                  <div
                    key={prod.id}
                    className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-6 items-center shadow-xl backdrop-blur-md"
                  >
                    <div className="w-full sm:w-44 h-44 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-200 dark:border-slate-800">
                      <img
                        src={prod.image_urls[0]}
                        alt={prod.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                        <span>{biz?.name}</span>
                        <span>{prod.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{prod.name}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-sans">
                        {prod.description}
                      </p>
                      
                      {prod.features && (
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pt-1">
                          {prod.features.slice(0, 2).map((f, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <span className="truncate">{f}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between">
                        {prod.price ? (
                          <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                            {prod.price.toLocaleString()} {prod.currency}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Inquire for pricing</span>
                        )}

                        <button
                          onClick={() => onNavigate('contact')}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-all shadow-sm"
                        >
                          Inquire
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Services Section if visible */}
        {(activeTab === 'all' || activeTab === 'services') && filteredServices.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Services & Capabilities</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((srv) => {
                const biz = businesses.find((b) => b.id === srv.business_id);
                const isFarmService = srv.business_id === 'tchuki-farms';
                return (
                  <div
                    key={srv.id}
                    className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-xl backdrop-blur-md overflow-hidden"
                  >
                    {isFarmService && srv.image_url && (
                      <div className="h-44 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                        <img
                          src={srv.image_url}
                          alt={srv.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    )}

                    <div className="p-6 flex-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-3">
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{biz?.name}</span>
                        <span>{srv.category}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2">
                        {srv.name}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-4">
                        {srv.description}
                      </p>

                      <div className="flex items-center gap-2 mb-4 text-xs text-slate-700 dark:text-slate-300">
                        <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                        <span>{isFarmService ? 'Contact us for availability and guidance' : 'Planning, delivery, and ongoing support'}</span>
                      </div>
                    </div>

                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 text-[11px]">Service inquiry</span>
                      <button
                        onClick={() => onNavigate('contact')}
                        className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        <span>Contact Tchuki</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && filteredServices.length === 0 && (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 text-sm">
            No products or services found matching your criteria.
          </div>
        )}

      </div>
    </div>
  );
};
