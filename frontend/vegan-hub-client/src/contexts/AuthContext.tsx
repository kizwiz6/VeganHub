import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    const user = localStorage.getItem('user');
    if (user) {
      setState({
        user: JSON.parse(user),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: '1',
        email,
        username: email.split('@')[0],
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      toast({
        title: 'Welcome back!',
        description: 'Successfully logged in.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid credentials.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      // Mock registration - replace with actual API call
      const mockUser = {
        id: Date.now().toString(),
        email,
        username,
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      toast({
        title: 'Welcome!',
        description: 'Account created successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not create account.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast({
      title: 'Logged out',
      description: 'Successfully logged out.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}