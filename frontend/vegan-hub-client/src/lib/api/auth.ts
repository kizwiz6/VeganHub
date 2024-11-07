import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7777/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent hanging requests
  timeout: 10000,
});

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
  };
  token: string;
}

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('Attempting login...');
      const { data } = await api.post('/auth/login', { email, password });
      console.log('Login successful');
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw this.handleError(error);
    }
  },

  async register(email: string, password: string, username: string): Promise<AuthResponse> {
    try {
      console.log('Attempting registration...');
      const { data } = await api.post('/auth/register', { email, password, username });
      console.log('Registration successful');
      return data;
    } catch (error) {
      console.error('Registration failed:', error);
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
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      // Don't throw on logout error, just log it
    }
  },

  async verifySession(): Promise<AuthResponse> {
    try {
      console.log('Verifying session...');
      const token = localStorage.getItem('token');
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

  // Helper method to handle errors
  handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
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

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
  return config;
});

// Interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('Attempting to refresh token after 401 error');

      try {
        const token = localStorage.getItem('refreshToken');
        if (!token) throw new Error('No refresh token');

        const response = await authApi.refreshToken(token);
        localStorage.setItem('token', response.token);

        originalRequest.headers.Authorization = `Bearer ${response.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export { api };