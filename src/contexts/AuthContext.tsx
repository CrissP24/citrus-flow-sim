import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser } from '@/utils/dataManager';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay sesión guardada
    const savedAuth = localStorage.getItem('citriflow-auth');
    if (savedAuth) {
      const { user: savedUser, timestamp } = JSON.parse(savedAuth);
      // Validar que la sesión no tenga más de 24 horas
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
        setUser(savedUser);
      } else {
        localStorage.removeItem('citriflow-auth');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (authenticateUser(username, password)) {
      setIsAuthenticated(true);
      setUser(username);
      
      // Guardar sesión en localStorage
      localStorage.setItem('citriflow-auth', JSON.stringify({
        user: username,
        timestamp: Date.now()
      }));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('citriflow-auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};