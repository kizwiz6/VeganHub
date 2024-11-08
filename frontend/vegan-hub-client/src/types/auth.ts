export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  avatar?: string;
  createdAt: string;
  emailVerified?: boolean;
  bio?: string;
  recipesCount?: number;
  followersCount?: number;
  followingCount?: number;
  favourites?: string[];
  dietary?: {
    preferences?: string[];
    allergies?: string[];
  };
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthResponse {
  user: User;
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

export interface ResetPasswordRequest {
  email: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface NewPasswordRequest {
  token: string;
  password: string;
}