import React, { useState } from 'react';
import { Save, Check, Lock, Key, Shield, RefreshCw } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetToDefaults } = useData();
  const { adminEmail, changePassword } = useAuth();

  const [form, setForm] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password change state
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    const res = await changePassword(currentPwd, newPwd);
    if (res.success) {
      setPwdMsg({ text: 'Admin password successfully updated and encrypted.', isError: false });
      setCurrentPwd('');
      setNewPwd('');
    } else {
      setPwdMsg({ text: res.error || 'Failed to update password.', isError: true });
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white font-heading">
          Global Website & Brand Settings
        </h2>
        <p className="text-xs text-slate-400">
          Update corporate parameters, verified contact phone & WhatsApp, hero slogans, and administration password.
        </p>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl">
        <h3 className="text-base font-bold text-white font-heading border-b border-slate-800 pb-3">
          Identity & Primary Contact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Site Brand Name
            </label>
            <input
              type="text"
              value={form.site_name}
              onChange={(e) => setForm({ ...form, site_name: e.target.value })}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Parent Brand Title
            </label>
            <input
              type="text"
              value={form.parent_brand}
              onChange={(e) => setForm({ ...form, parent_brand: e.target.value })}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Corporate Slogan
          </label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none italic"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Verified Contact Telephone
            </label>
            <input
              type="text"
              value={form.contact_phone}
              onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Verified WhatsApp Number
            </label>
            <input
              type="text"
              value={form.whatsapp_number}
              onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Official Email
            </label>
            <input
              type="email"
              value={form.contact_email}
              onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading">
            Homepage Hero Controls
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Main Headline
            </label>
            <input
              type="text"
              value={form.hero_headline}
              onChange={(e) => setForm({ ...form, hero_headline: e.target.value })}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Supporting Narrative
            </label>
            <textarea
              rows={2}
              value={form.hero_supporting_text}
              onChange={(e) => setForm({ ...form, hero_supporting_text: e.target.value })}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary CTA Button Label
              </label>
              <input
                type="text"
                value={form.hero_primary_cta}
                onChange={(e) => setForm({ ...form, hero_primary_cta: e.target.value })}
                className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Secondary CTA Button Label
              </label>
              <input
                type="text"
                value={form.hero_secondary_cta}
                onChange={(e) => setForm({ ...form, hero_secondary_cta: e.target.value })}
                className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading">
            Tchuki at a Glance Stats
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 font-mono mb-1">
                Businesses Count
              </label>
              <input
                type="text"
                value={form.stat_counters.businesses}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stat_counters: { ...form.stat_counters, businesses: e.target.value },
                  })
                }
                className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-mono mb-1">
                Industries Count
              </label>
              <input
                type="text"
                value={form.stat_counters.industries}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stat_counters: { ...form.stat_counters, industries: e.target.value },
                  })
                }
                className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-mono mb-1">
                Projects Count
              </label>
              <input
                type="text"
                value={form.stat_counters.projects}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stat_counters: { ...form.stat_counters, projects: e.target.value },
                  })
                }
                className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-mono mb-1">
                Commitment Metric
              </label>
              <input
                type="text"
                value={form.stat_counters.commitment}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stat_counters: { ...form.stat_counters, commitment: e.target.value },
                  })
                }
                className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Settings updated and deployed live!</span>
            </span>
          )}
          <button
            type="submit"
            className="ml-auto flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Global Settings</span>
          </button>
        </div>
      </form>

      {/* Admin Password & Security Settings */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span>Administrator Security & Password</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono space-y-1">
          <div>Authorized Account: <span className="text-emerald-400 font-bold">{adminEmail}</span></div>
          <div>Role: Super Administrator</div>
        </div>

        {pwdMsg && (
          <div
            className={`p-3 rounded-xl text-xs ${
              pwdMsg.isError
                ? 'bg-red-950/60 text-red-200 border border-red-800'
                : 'bg-emerald-950/60 text-emerald-200 border border-emerald-800'
            }`}
          >
            {pwdMsg.text}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
              placeholder="Enter existing password..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              New Administrator Password
            </label>
            <input
              type="password"
              required
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
              placeholder="At least 6 characters..."
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Update Admin Password</span>
          </button>
        </form>

        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Need to restore default demo content?</span>
          <button
            onClick={() => {
              if (confirm('Reset all site data back to initial authentic specification values?')) {
                resetToDefaults();
                setForm({ ...settings });
                alert('Database reset to defaults.');
              }
            }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

    </div>
  );
};

