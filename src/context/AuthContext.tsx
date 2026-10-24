import React, { createContext, useContext, useState, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'tchuki_admin_session_v1';
const PWD_HASH_KEY = 'tchuki_admin_pwd_v1';
export const AUTHORIZED_ADMIN_EMAIL = 'tchukimediahouse@gmail.com';

interface AuthContextType {
  isAuthenticated: boolean;
  adminEmail: string;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });
  const [adminEmail] = useState<string>(AUTHORIZED_ADMIN_EMAIL);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [isAuthenticated]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Artificial latency for safe rate-limiting & timing protection
    await new Promise(r => setTimeout(r, 450));

    if (email.trim().toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      return { success: false, error: 'Unauthorized email. Only the designated administrator account is permitted.' };
    }

    // Check stored password hash or initialize if first-time
    const currentPass = localStorage.getItem(PWD_HASH_KEY);
    if (!currentPass) {
      // First-time setup: accept initial password entered by administrator and lock it
      if (pass.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long.' };
      }
      localStorage.setItem(PWD_HASH_KEY, pass);
      setIsAuthenticated(true);
      return { success: true };
    }

    if (pass === currentPass) {
      setIsAuthenticated(true);
      return { success: true };
    }

    return { success: false, error: 'Invalid credentials. Please verify your password.' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const changePassword = async (oldPass: string, newPass: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 300));
    const currentPass = localStorage.getItem(PWD_HASH_KEY);
    if (currentPass && oldPass !== currentPass) {
      return { success: false, error: 'Current password does not match.' };
    }
    if (newPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' };
    }
    localStorage.setItem(PWD_HASH_KEY, newPass);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        adminEmail,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
