import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Layers,
  ShoppingBag,
  Briefcase,
  FileText,
  Inbox,
  Settings,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

import { AdminOverview } from './AdminOverview';
import { AdminBusinesses } from './AdminBusinesses';
import { AdminServices } from './AdminServices';
import { AdminProducts } from './AdminProducts';
import { AdminProjects } from './AdminProjects';
import { AdminArticles } from './AdminArticles';
import { AdminInquiries } from './AdminInquiries';
import { AdminSettings } from './AdminSettings';
import { AdminMedia } from './AdminMedia';

interface AdminLayoutProps {
  onBackToPublic: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToPublic }) => {
  const { adminEmail, logout } = useAuth();
  const { inquiries } = useData();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'businesses', label: 'Businesses', icon: <Building2 className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Layers className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'articles', label: 'News & Insights', icon: <FileText className="w-4 h-4" /> },
    {
      id: 'inquiries',
      label: 'Inquiries',
      icon: <Inbox className="w-4 h-4" />,
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined,
    },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'settings', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleCreateTrigger = (type: string) => {
    switch (type) {
      case 'business':
        setActiveTab('businesses');
        break;
      case 'service':
        setActiveTab('services');
        break;
      case 'product':
        setActiveTab('products');
        break;
      case 'project':
        setActiveTab('projects');
        break;
      case 'article':
        setActiveTab('articles');
        break;
      default:
        setActiveTab('overview');
    }
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <AdminOverview
            onSelectTab={(tab) => setActiveTab(tab)}
            onOpenCreate={handleCreateTrigger}
          />
        );
      case 'businesses':
        return <AdminBusinesses />;
      case 'services':
        return <AdminServices />;
      case 'products':
        return <AdminProducts />;
      case 'projects':
        return <AdminProjects />;
      case 'articles':
        return <AdminArticles />;
      case 'inquiries':
        return <AdminInquiries />;
      case 'media':
        return <AdminMedia />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview onSelectTab={setActiveTab} onOpenCreate={handleCreateTrigger} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/aistudio/Tchuki_Group_Eco-Tech_Logo_b371a75d.png"
            alt="Tchuki Group"
            className="h-7 w-auto object-contain"
          />
          <span className="font-bold text-sm text-white font-heading">Tchuki Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between p-5 z-40 transition-transform duration-300 backdrop-blur-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800 mb-6">
            <img
              src="/assets/aistudio/Tchuki_Group_Eco-Tech_Logo_b371a75d.png"
              alt="Tchuki Group"
              className="h-9 w-auto object-contain shrink-0"
            />
            <div>
              <h2 className="text-sm font-extrabold text-white font-heading tracking-tight">
                TCHUKI GROUP
              </h2>
              <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase">
                Console v1.0
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-950 font-bold text-[10px] font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <button
            onClick={onBackToPublic}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>View Live Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-500 uppercase">
              Authenticated Admin
            </div>
            <div className="text-xs font-mono text-slate-200 truncate mt-0.5" title={adminEmail}>
              {adminEmail}
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              onBackToPublic();
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full">
        {/* Top Breadcrumb & Live Preview CTA */}
        <div className="hidden md:flex items-center justify-between pb-8 mb-4 border-b border-slate-900">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Administration</span>
            <span>/</span>
            <span className="text-emerald-400 capitalize">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPublic}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Preview Public Website</span>
            </button>
          </div>
        </div>

        {renderActiveContent()}
      </main>

    </div>
  );
};

