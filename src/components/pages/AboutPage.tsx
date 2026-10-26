import React from 'react';
import { ShieldCheck, Target, HeartHandshake, Sprout, Terminal, Globe, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PageBackdrop } from '../common/PageBackdrop';
import { getAssetUrl } from '../../utils/assets';

interface AboutPageProps {
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { settings, businesses } = useData();

  return (
    <div className="relative pt-28 pb-24 min-h-screen overflow-hidden">
      {/* Thematic Background Photography with Ambient Lighting */}
      <PageBackdrop
        imageUrl="/assets/hero_tchuki_agricultural_tech_1792796707277.jpg"
        alt="About Tchuki Corporate Ecosystem"
        lighting="hybrid"
        opacityClass="opacity-45 dark:opacity-35"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Hero */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
            About {settings.parent_brand}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            One Vision. Multiple Practical Opportunities.
          </h1>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            Tchuki is a diversified, forward-looking business group founded in Malawi. We unite agricultural production with modern digital engineering to build sustainable, high-impact enterprises.
          </p>
        </div>

        {/* Corporate Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
              Rooted in the Soil. Powered by Technology.
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              We reject the false divide between foundational real-economy production and cutting-edge digital execution. Emerging economies cannot thrive on pure digital services alone, nor can modern agriculture achieve food security without data systems, smart logistics, and scalable distribution.
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              Through Tchuki Farms, we restore soils and support growers with BioKash Organic inputs and climate-smart irrigation. Through Tchuki Digital, we equip institutions and businesses with software, AI workflows, and creative systems that streamline real-world commerce.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-emerald-700 dark:text-emerald-400">
              <span className="flex items-center gap-1.5 font-semibold">
                <Globe className="w-4 h-4" />
                <span>Malawi Headquarters</span>
              </span>
              <span>·</span>
              <span className="text-slate-600 dark:text-slate-400">Regional & Global Reach</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative">
              <img
                src={getAssetUrl('/assets/aistudio/Tchuki_Corporate_Ecosystem_UI_Montage_628ed48e.png')}
                alt="Tchuki Group Ecosystem Montage"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-700 text-xs text-slate-200">
                "Growing Ideas. Building Businesses. Creating Impact." — Tchuki Group Motto
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Bento Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-mono">
              Operating Principles
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-heading mt-1">
              What Drives Our Group
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 backdrop-blur-md shadow-xl shadow-slate-200/50 dark:shadow-none">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Practical Solutions</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                We develop products and software that solve concrete local bottlenecks rather than theoretical exercises. Every initiative must demonstrate measurable utility.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 backdrop-blur-md shadow-xl shadow-slate-200/50 dark:shadow-none">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-800/40 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Disciplined Execution</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Trust is built on consistency. We maintain verified standards across fertilizer testing, software quality assurance, and customer fulfillment.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 backdrop-blur-md shadow-xl shadow-slate-200/50 dark:shadow-none">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 border border-teal-300 dark:border-teal-800/40 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Long-Term Impact</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Whether rehabilitating depleted farming soils or automating business operations, our investments are designed to compound value over years.
              </p>
            </div>
          </div>
        </div>

        {/* Group Synergy Callout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                Explore Our Active Ventures
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Learn more about how Tchuki Farms and Tchuki Digital are leading innovation in their respective sectors.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('business-detail', 'tchuki-farms')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-all shadow-sm"
                >
                  <Sprout className="w-4 h-4" />
                  <span>Tchuki Farms Profile</span>
                </button>
                <button
                  onClick={() => onNavigate('business-detail', 'tchuki-digital')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer transition-all shadow-sm"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Tchuki Digital Profile</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-300 space-y-2 font-mono">
              <div className="text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                Corporate Inquiries
              </div>
              <div>Telephone: {settings.contact_phone}</div>
              <div>Email: {settings.contact_email}</div>
              <div className="pt-2 text-slate-500">
                Official registration & brand identity under TCHUKI GROUP.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
