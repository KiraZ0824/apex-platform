import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isAuditor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟检查本地存储
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string): Promise<boolean> => {
    setLoading(true);
    try {
      const userData = await api.login(username);
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';
  const isAuditor = user?.role === 'auditor' || user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, isAuditor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
