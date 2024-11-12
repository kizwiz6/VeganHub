import axios, { AxiosError } from 'axios';
import type { User } from '@/types/auth';
import type { ProfileFormData } from '@/types/profile';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7777/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    emailVerified?: boolean;
  };
  token: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export const authApi = {
  // Enhanced login with remember me
  async login({ email, password, rememberMe = false }: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('Attempting login...');
      const { data } = await api.post('/auth/login', { email, password, rememberMe });
      console.log('Login successful');

      // Store tokens based on remember me preference
      if (rememberMe && data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('token', data.token);  // Store token in localStorage as well
      } else if (data.refreshToken) {
        sessionStorage.setItem('refreshToken', data.refreshToken);
        sessionStorage.setItem('token', data.token);  // Store token in sessionStorage
      }

      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw this.handleError(error);
    }
  },

  // Enhanced register with email verification
  async register({ email, password, username }: RegisterRequest): Promise<AuthResponse> {
    try {
      console.log('Attempting registration...');
      const { data } = await api.post('/auth/register', { email, password, username });
      console.log('Registration successful, verification email sent');
      return data;
    } catch (error) {
      console.error('Registration failed:', error);
      if (axios.isAxiosError(error)) {
          if (error.code === 'ERR_NETWORK') {
              throw new Error('Cannot connect to server. Please check if the API is running.');
          }
          if (error.response) {
              throw new Error(error.response.data.message || 'Registration failed');
          }
      }
      throw new Error('An unexpected error occurred');
  }
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    try {
      console.log('Requesting password reset...');
      await api.post('/auth/password/reset-request', { email });
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Password reset request failed:', error);
      throw this.handleError(error);
    }
  },

  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      console.log('Resetting password...');
      await api.post('/auth/password/reset', { token, newPassword });
      console.log('Password reset successful');
    } catch (error) {
      console.error('Password reset failed:', error);
      throw this.handleError(error);
    }
  },

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    try {
      console.log('Verifying email...');
      await api.post('/auth/email/verify', { token });
      console.log('Email verified successfully');
    } catch (error) {
      console.error('Email verification failed:', error);
      throw this.handleError(error);
    }
  },

  // Resend verification email
  async resendVerificationEmail(email: string): Promise<void> {
    try {
      console.log('Resending verification email...');
      await api.post('/auth/email/resend', { email });
      console.log('Verification email sent');
    } catch (error) {
      console.error('Failed to resend verification email:', error);
      throw this.handleError(error);
    }
  },

  async refreshToken(token: string): Promise<AuthResponse> {
    try {
      console.log('Refreshing token...');
      const { data } = await api.post('/auth/refresh', { token });
      console.log('Token refresh successful');
      return data;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw this.handleError(error);
    }
  },

  async logout(token: string): Promise<void> {
    try {
      console.log('Logging out...');
      await api.post('/auth/logout', { token });
      // Clear both storage types
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refreshToken');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear tokens even if the request fails
      localStorage.clear();
      sessionStorage.clear();
    }
  },

  async verifySession(): Promise<AuthResponse> {
    try {
      console.log('Verifying session...');
      // Check both storage types for token
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const { data } = await api.get('/auth/session');
      console.log('Session verification successful');
      return data;
    } catch (error) {
      console.error('Session verification failed:', error);
      throw this.handleError(error);
    }
  },


  async updateProfile(data: ProfileFormData): Promise<{ user: User }> {
    try {
      console.log('Updating profile...');
      const { data: response } = await api.patch<{ user: User }>('/auth/profile', data);
      console.log('Profile updated successfully');
      return { user: response.user };
    } catch (error) {
      console.error('Profile update failed:', error);
      throw this.handleError(error);
    }
  },


  async updateAvatar(formData: FormData): Promise<{ user: User }> {
    try {
      console.log('Uploading avatar...');
      const { data } = await api.post<{ user: User }>('/auth/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Avatar upload response data:', data);
      return data;
    } catch (error) {
      console.error('Avatar upload failed:', error);
      throw this.handleError(error);
    }
  },

  // Enhanced error handler
  handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string; errors?: Record<string, string[]> }> ;
      if (axiosError.response?.data?.errors) {
        // Join all error messages
        const messages = Object.values(axiosError.response.data.errors).flat();
        return new Error(messages.join('. '));
      }
      if (axiosError.response?.data?.message) {
        return new Error(axiosError.response.data.message);
      }
      if (axiosError.message) {
        return new Error(axiosError.message);
      }
    }
    return new Error('An unexpected error occurred');
  }
};

// Enhanced request interceptor
api.interceptors.request.use((config) => {
  // Check both storage types for token
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
  return config;
});

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('Attempting to refresh token after 401 error');

      try {
        // Check both storage types for refresh token
        const token = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
        if (!token) throw new Error('No refresh token');

        const response = await authApi.refreshToken(token);

        // Store new token in the same storage type as the refresh token
        if (localStorage.getItem('refreshToken')) {
          localStorage.setItem('token', response.token);
        } else {
          sessionStorage.setItem('token', response.token);
        }

        originalRequest.headers.Authorization = `Bearer ${response.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login?session=expired';
      }
    }

    return Promise.reject(error);
  }
);

export { api };
