import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('tchuki_theme_mode');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('tchuki_theme_mode', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.className = 'bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-600 selection:text-white transition-colors duration-300';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-600 selection:text-white transition-colors duration-300';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
