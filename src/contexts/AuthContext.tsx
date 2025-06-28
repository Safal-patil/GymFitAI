import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from './NotificationContext';

interface User {
  id: string;
  _id?: string;
  email: string;
  workoutPhotos: string[];
  profile: {
    name?: string;
    gender?: 'male' | 'female' | 'other';
    age?: number;
    bodytype?: string;
    weightKg?: number;
    heightCm?: number;
    bodyfat?: number;
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
    currentStreak: number;
    workoutsCompleted: number;
    totalWorkouts: number;
  };
  strengthInfo: {
    maxPushups: number;
    maxPullups: number;
    maxSquats: number;
    maxBenchKg: number;
    maxSquatkg: number;
    maxDeadliftkg: number;
  };
  premiumExpiry: Date | null;
  tier: 'free' | 'premium';
  preferences: {
    goal?: string;
    daysPerWeek?: number;
    planStyle?: string;
    sessionDuration?: number;
    equipment?: string;
    limitations?: string;
    availableTime?: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  loginWithGoogle: (googleToken: string) => Promise<boolean>;
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  // Mock user for demo
  const mockUser: User = {
    id: '1',
    _id: '1',
    email: 'demo@fitai.com',
    workoutPhotos: [],
    profile: {
      name: 'Demo User',
      gender: 'male',
      age: 28,
      bodytype: 'Athletic',
      weightKg: 75,
      heightCm: 180,
      bodyfat: 12,
      experienceLevel: 'intermediate',
      currentStreak: 7,
      workoutsCompleted: 45,
      totalWorkouts: 50
    },
    strengthInfo: {
      maxPushups: 50,
      maxPullups: 15,
      maxSquats: 100,
      maxBenchKg: 80,
      maxSquatkg: 120,
      maxDeadliftkg: 140
    },
    premiumExpiry: new Date('2025-12-31'),
    tier: 'premium',
    preferences: {
      goal: 'Build Muscle',
      daysPerWeek: 5,
      planStyle: 'Push-Pull-Legs',
      sessionDuration: 60,
      equipment: 'Full Gym',
      limitations: 'None',
      availableTime: 'Evening'
    }
  };

  useEffect(() => {
    // Auto-login for demo
    const storedUser = localStorage.getItem('fitness-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Set mock user for demo
      setUser(mockUser);
      localStorage.setItem('fitness-user', JSON.stringify(mockUser));
    }
  }, []);

  const loginWithGoogle = async (googleToken: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock Google login
      setUser(mockUser);
      localStorage.setItem('fitness-user', JSON.stringify(mockUser));

      addNotification({
        type: 'success',
        title: 'Logged In with Google!',
        message: 'Welcome back!'
      });

      return true;
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Google Login Failed',
        message: error.message || 'Failed to log in with Google'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock login
      setUser(mockUser);
      localStorage.setItem('fitness-user', JSON.stringify(mockUser));
      
      addNotification({
        type: 'success',
        title: 'Welcome back!',
        message: 'You have successfully logged in.'
      });
      
      return true;
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: error.message || 'Invalid email or password'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock registration
      const newUser = { ...mockUser, email: userData.email, profile: { ...mockUser.profile, name: userData.name } };
      setUser(newUser);
      localStorage.setItem('fitness-user', JSON.stringify(newUser));
      
      addNotification({
        type: 'success',
        title: 'Account Created!',
        message: 'Welcome to FitAI! Your account has been created successfully.'
      });
      
      return true;
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Registration Failed',
        message: error.message || 'Failed to create account'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('fitness-user');
      
      addNotification({
        type: 'info',
        title: 'Logged Out',
        message: 'You have been successfully logged out.'
      });
      
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  const clearSession = () => {
    setUser(null);
    localStorage.removeItem('fitness-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      isLoading,
      clearSession,
      loginWithGoogle 
    }}>
      {children}
    </AuthContext.Provider>
  );
};