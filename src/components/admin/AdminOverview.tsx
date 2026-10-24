import React from 'react';
import {
  Building2,
  Layers,
  ShoppingBag,
  Briefcase,
  FileText,
  Inbox,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminOverviewProps {
  onSelectTab: (tab: string) => void;
  onOpenCreate: (type: 'business' | 'service' | 'product' | 'project' | 'article') => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onSelectTab, onOpenCreate }) => {
  const { businesses, services, products, projects, articles, inquiries } = useData();

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;
  const draftArticles = articles.filter((a) => a.publication_status === 'draft').length;

  const cards = [
    {
      label: 'Active Businesses',
      value: businesses.length,
      icon: <Building2 className="w-5 h-5 text-emerald-400" />,
      tab: 'businesses',
      color: 'border-emerald-500/30 bg-emerald-950/20',
    },
    {
      label: 'Services Offered',
      value: services.length,
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      tab: 'services',
      color: 'border-blue-500/30 bg-blue-950/20',
    },
    {
      label: 'Products Catalog',
      value: products.length,
      icon: <ShoppingBag className="w-5 h-5 text-teal-400" />,
      tab: 'products',
      color: 'border-teal-500/30 bg-teal-950/20',
    },
    {
      label: 'Delivered Projects',
      value: projects.length,
      icon: <Briefcase className="w-5 h-5 text-indigo-400" />,
      tab: 'projects',
      color: 'border-indigo-500/30 bg-indigo-950/20',
    },
    {
      label: 'Published Articles',
      value: articles.length,
      icon: <FileText className="w-5 h-5 text-amber-400" />,
      tab: 'articles',
      color: 'border-amber-500/30 bg-amber-950/20',
    },
    {
      label: 'Inbound Inquiries',
      value: inquiries.length,
      extra: newInquiriesCount > 0 ? `${newInquiriesCount} new` : undefined,
      icon: <Inbox className="w-5 h-5 text-emerald-400" />,
      tab: 'inquiries',
      color: 'border-emerald-500/30 bg-emerald-950/20',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
            Authorized Console · Tchuki Group
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Welcome back, Administrator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Manage all public web assets, ventures, products, and incoming customer inquiries from one synchronized portal. No manual code changes required.
          </p>
        </div>

        {/* Quick Add Action Dropdown */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpenCreate('business')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Business</span>
          </button>
          <button
            onClick={() => onOpenCreate('service')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </button>
          <button
            onClick={() => onOpenCreate('product')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Metrics Counters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((c, i) => (
          <div
            key={i}
            onClick={() => onSelectTab(c.tab)}
            className={`p-5 rounded-2xl border ${c.color} hover:border-slate-600 transition-all cursor-pointer flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-slate-900/80">{c.icon}</div>
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-heading tabular-nums">
                {c.value}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
                {c.label}
              </div>
              {c.extra && (
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-semibold">
                  {c.extra}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Split: Recent Inquiries & Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries (Col 1-7) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <Inbox className="w-4 h-4 text-emerald-400" />
              <span>Recent Inquiries</span>
            </h3>
            <button
              onClick={() => onSelectTab('inquiries')}
              className="text-xs font-semibold text-emerald-400 hover:underline"
            >
              View All ({inquiries.length})
            </button>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => (
              <div
                key={inq.id}
                onClick={() => onSelectTab('inquiries')}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors cursor-pointer flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-heading">
                      {inq.full_name}
                    </span>
                    {inq.organization && (
                      <span className="text-[11px] text-slate-400 font-sans">
                        · {inq.organization}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1 font-sans">
                    {inq.message}
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                    {new Date(inq.created_at).toLocaleDateString()} · {inq.phone}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold shrink-0 uppercase ${
                    inq.status === 'new'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                      : inq.status === 'in_progress'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800/50'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {inq.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Content Updates (Col 8-12) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Live Website Content</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Database Sync Active</span>
          </div>

          <div className="space-y-3">
            {articles.slice(0, 3).map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectTab('articles')}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span className="text-emerald-400">{art.category}</span>
                  <span>{art.read_time}</span>
                </div>
                <h4 className="text-xs font-bold text-white font-heading line-clamp-1">
                  {art.title}
                </h4>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 space-y-1.5 font-mono">
              <div className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">
                Platform Health
              </div>
              <div>Parent Brand: Tchuki Group</div>
              <div>Admin: tchukimediahouse@gmail.com</div>
              <div>Malawi & International Deployments Active</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

