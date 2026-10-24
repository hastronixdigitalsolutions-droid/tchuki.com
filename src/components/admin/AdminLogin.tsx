import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth, AUTHORIZED_ADMIN_EMAIL } from '../../context/AuthContext';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToPublic }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      onSuccess();
    } else {
      setError(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={onBackToPublic}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-blue-600 p-[2px] shadow-2xl">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-white font-heading tracking-tight">
          Tchuki Administration
        </h2>
        <p className="mt-2 text-xs text-slate-400 font-mono">
          One Authorized Administrator · Complete Control
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/60 text-xs text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                Authorized Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
                  placeholder="tchukimediahouse@gmail.com"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Sole authorized initial account: <span className="text-emerald-400 font-mono">tchukimediahouse@gmail.com</span>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Enter administrator password..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-emerald-950/60 transition-all cursor-pointer"
              >
                <span>{isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <span className="text-[11px] text-slate-500">
              Encrypted session security · Protected management endpoints
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
