import { apiClient, retryRequest, ApiResponse } from './api';

// Auth Types
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    profile?: any;
    tier: 'free' | 'premium';
  };
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: string;
  email: string;
  profile?: {
    name?: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    weightKg?: number;
    heightCm?: number;
    bodyfat?: number;
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  };
  tier: 'free' | 'premium';
  premiumExpiry?: string;
}

class AuthService {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await retryRequest(() => 
        apiClient.post<ApiResponse<AuthResponse>>('/user/login', credentials)
      );
      
      // Store tokens
      localStorage.setItem('fitness-access-token', response.accessToken);
      localStorage.setItem('fitness-refresh-token', response.refreshToken);
      localStorage.setItem('fitness-user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Register user
  async register(userData: RegisterRequest): Promise<User> {
    try {
      const response = await retryRequest(() => 
        apiClient.post<ApiResponse<User>>('/user/register', userData)
      );
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post('/user/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('fitness-access-token');
      localStorage.removeItem('fitness-refresh-token');
      localStorage.removeItem('fitness-user');
      localStorage.removeItem('fitness-user-stats');
      localStorage.removeItem('fitness-workouts');
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      const response = await retryRequest(() => 
        apiClient.get<ApiResponse<User>>('/user/current-user')
      );
      
      // Update stored user data
      localStorage.setItem('fitness-user', JSON.stringify(response));
      
      return response;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(profileData: any): Promise<User> {
    try {
      const formData = new FormData();
      
      if (profileData.profile) {
        formData.append('profile', JSON.stringify(profileData.profile));
      }
      
      if (profileData.preferences) {
        formData.append('preferences', JSON.stringify(profileData.preferences));
      }
      
      if (profileData.avatar) {
        formData.append('avatar', profileData.avatar);
      }

      const response = await retryRequest(() => 
        apiClient.post<ApiResponse<User>>('/user/updateprofile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
      
      // Update stored user data
      localStorage.setItem('fitness-user', JSON.stringify(response));
      
      return response;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      await retryRequest(() => 
        apiClient.post<ApiResponse<void>>('/user/change-password', {
          oldPassword,
          newPassword
        })
      );
    } catch (error) {
      console.error('Password change failed:', error);
      throw error;
    }
  }

  // Add device token for push notifications
  async addDeviceToken(token: string): Promise<void> {
    try {
      await retryRequest(() => 
        apiClient.post<ApiResponse<void>>('/user/adddevicetoken', { token })
      );
    } catch (error) {
      console.error('Failed to add device token:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {

    return !!localStorage.getItem('fitness-access-token');
  }

  // Get stored user data
  getStoredUser(): User | null {
    const userData = localStorage.getItem('fitness-user');
    return userData ? JSON.parse(userData) : null;
  }

  // authService.ts
 loginWithGoogle = async (googleToken: string) => {
  const response = await apiClient.post('/auth/google', {
    token: googleToken,
  });

  const { accessToken, refreshToken, user } = response.data.data;

  localStorage.setItem('fitness-access-token', accessToken);
  localStorage.setItem('fitness-refresh-token', refreshToken);
  localStorage.setItem('fitness-user', JSON.stringify(user));

  return { user };
};

}

export const authService = new AuthService();
export type { LoginRequest, RegisterRequest, AuthResponse, User };