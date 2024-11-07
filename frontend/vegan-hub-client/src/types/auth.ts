export interface User {
    id: string;
    email: string;
    username: string;
    avatarUrl?: string;
    createdAt: string;
  }

  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }