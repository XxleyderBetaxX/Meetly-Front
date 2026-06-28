import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginCredentials, AuthContextType } from '../types/auth';
import { authService } from '../services/auth';
import { tokenStorage, isTokenExpired } from '../utils/token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser]       = useState<User | null>(null);
  const [token, setToken]     = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = tokenStorage.getToken();
    const storedUser  = tokenStorage.getUser();

    if (storedToken && storedUser) {
      if (isTokenExpired(storedToken)) {
        tokenStorage.clear();
      } else {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch {
          tokenStorage.clear();
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      tokenStorage.setToken(response.token);
      tokenStorage.setUser(JSON.stringify(response.user));
      setToken(response.token);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    tokenStorage.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, token,
      isAuthenticated: !!token && !!user,
      login, logout, isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};