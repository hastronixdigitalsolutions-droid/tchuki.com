import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Shield, Phone, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, detailSlug?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isAuthenticated } = useAuth();
  const { settings } = useData();
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'About', view: 'about' },
    { label: 'Our Businesses', view: 'businesses' },
    { label: 'Services', view: 'services' },
    { label: 'Projects', view: 'projects' },
    { label: 'News & Insights', view: 'insights' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleLinkClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? isDark
              ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3'
              : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-md py-3 text-slate-900'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar 3-Zone Contract */}
          <div className="flex items-center justify-between gap-8">
            
            {/* Zone 1: Single text/logo Brand lockup */}
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none shrink-0"
              aria-label="Tchuki Group Home"
            >
              <img
                src="/assets/aistudio/Tchuki_Group_Eco-Tech_Logo_b371a75d.png"
                alt="Tchuki Group Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className={`text-xl font-extrabold tracking-tight font-heading ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  TCHUKI
                </span>
                <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-bold tracking-wider uppercase -mt-1">
                  Group
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links (single line, no wrapping) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={link.view}
                    onClick={() => handleLinkClick(link.view)}
                    className={`relative py-1 whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-emerald-500 dark:text-emerald-400 font-semibold'
                        : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-950 font-medium'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action + Theme Toggle + Admin portal button */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              
              {/* Dark / Normal (Light) Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                  isDark
                    ? 'border-slate-800 text-amber-300 hover:text-amber-200 bg-slate-900/60 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 shadow-sm'
                }`}
                title={isDark ? 'Switch to Normal Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
                )}
              </button>

              <button
                onClick={() => handleLinkClick(isAuthenticated ? 'admin' : 'admin-login')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  isAuthenticated
                    ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50'
                    : isDark
                    ? 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 bg-slate-900/40'
                    : 'border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 bg-white shadow-sm'
                }`}
                title={isAuthenticated ? 'Open Admin Dashboard' : 'Authorized Admin Login'}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{isAuthenticated ? 'Admin Panel' : 'Admin'}</span>
              </button>

              <button
                onClick={() => handleLinkClick('contact')}
                className="group flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm shadow-emerald-900/40 transition-all duration-200 hover:shadow-emerald-600/30 whitespace-nowrap cursor-pointer active:scale-95"
              >
                <span>Work With Us</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Mobile Actions: Theme Toggle & Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg border transition-colors ${
                  isDark
                    ? 'border-slate-800 text-amber-300 bg-slate-900'
                    : 'border-slate-200 text-slate-700 bg-white shadow-sm'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleLinkClick(isAuthenticated ? 'admin' : 'admin-login')}
                className={`p-2 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}
                aria-label="Admin"
              >
                <Shield className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg border ${
                  isDark
                    ? 'text-slate-300 hover:text-white bg-slate-900/60 border-slate-800'
                    : 'text-slate-700 hover:text-slate-950 bg-white border-slate-200 shadow-sm'
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden px-6 py-6 mt-3 border-b backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 ${
            isDark
              ? 'bg-slate-950/95 border-slate-800 text-white'
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
          }`}>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={link.view}
                    onClick={() => handleLinkClick(link.view)}
                    className={`text-left py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-950/40 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold'
                        : isDark
                        ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md"
                >
                  <span>Work With Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-1">
                  <span>{settings.contact_phone}</span>
                  <a
                    href={`tel:${settings.contact_phone}`}
                    className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400 hover:underline"
                  >
                    <Phone className="w-3 h-3" /> Call Tchuki
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
