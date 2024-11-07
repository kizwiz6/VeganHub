import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7777/api',
  headers: {
    'Content-Type': 'application/json',
  },
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
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },

  async register(email: string, password: string, username: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/register', { email, password, username });
    return data;
  },

  async refreshToken(token: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/refresh', { token });
    return data;
  },

  async logout(token: string): Promise<void> {
    await api.post('/auth/logout', { token });
  },

  async verifySession(): Promise<AuthResponse> {
    const { data } = await api.get('/auth/session');
    return data;
  }
};

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = localStorage.getItem('refreshToken');
        if (!token) throw new Error('No refresh token');

        const response = await authApi.refreshToken(token);
        localStorage.setItem('token', response.token);

        originalRequest.headers.Authorization = `Bearer ${response.token}`;
        return api(originalRequest);
      } catch {
        // If refresh fails, logout user
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export { api };