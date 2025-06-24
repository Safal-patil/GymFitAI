import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'platinum';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<boolean>;
  isLoading: boolean;
  clearSession: () => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem('fitness-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      plan: 'free',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    };
    
    setUser(mockUser);
    localStorage.setItem('fitness-user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name,
      plan: 'free',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    };
    
    setUser(mockUser);
    localStorage.setItem('fitness-user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: User = {
      id: '1',
      email: 'user@gmail.com',
      name: 'Fitness User',
      plan: 'free',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    };
    
    setUser(mockUser);
    localStorage.setItem('fitness-user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const clearSession = () => {
    setUser(null);
    localStorage.removeItem('fitness-user');
    localStorage.removeItem('fitness-user-stats');
    localStorage.removeItem('fitness-workouts');
    // Clear any other session data
    sessionStorage.clear();
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call to invalidate session on server
      await new Promise(resolve => setTimeout(resolve, 500));
      
      clearSession();
      
      // Navigate to landing page after logout
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear session even if server call fails
      clearSession();
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loginWithGoogle,
      isLoading,
      clearSession
    }}>
      {children}
    </AuthContext.Provider>
  );
};