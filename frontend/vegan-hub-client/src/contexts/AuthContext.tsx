import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/lib/api/auth';
import type { User, AuthContextType } from '@/types/auth';
import type { ProfileFormData } from '@/types/profile';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthError = {
  message: string;
  errors?: Record<string, string[]>;
};

const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionCheckInterval, setSessionCheckInterval] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Session verification
  const verifySession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const response = await authApi.verifySession();
      setUser(response.user);
      setIsLoading(false);
    } catch (error) {
      console.error('Session verification failed:', error);
      handleAuthError(error as AuthError);
      await logout();
      setIsLoading(false);
    }
  };

  // Set up session checking
  useEffect(() => {
    let interval: number | null = null;

    const initAuth = async () => {
      try {
        await verifySession();
        interval = window.setInterval(verifySession, SESSION_CHECK_INTERVAL);
        setSessionCheckInterval(interval);
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setIsLoading(false); // Ensure loading state is cleared on error
      }
    };

    initAuth();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        console.warn('Auth loading timed out');
      }
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timeout);
  }, [isLoading]);

  const handleAuthError = (error: AuthError) => {
    const errorMessage = error.errors 
      ? Object.values(error.errors).flat().join('. ')
      : error.message || 'An error occurred';

    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login({ email, password });

      // Store token and set user state
      localStorage.setItem('token', response.token);
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);  // Ensure refresh token is stored
      }
      setUser(response.user);

      toast({
        title: "Success",
        description: "Successfully logged in",
      });

      navigate('/recipes');
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.register({ email, password, username });

      // Store token and set user state
      localStorage.setItem('token', response.token);
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);  // Ensure refresh token is stored
      }
      setUser(response.user);

      toast({
        title: "Success",
        description: "Account created successfully",
      });

      navigate('/recipes');
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await authApi.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setUser(null);

      if (sessionCheckInterval) {
        clearInterval(sessionCheckInterval);
      }

      toast({
        title: "Success",
        description: "Successfully logged out",
      });

      navigate('/login');
    }
  };

  // Function to update user profile
  const updateProfile = async (data: ProfileFormData) => {
    try {
      console.log('Current user before update:', user);
      const response = await authApi.updateProfile(data);
      console.log('Update response:', response);

      // Make sure we're updating the full user object
      setUser(prev => ({
        ...prev,
        ...response.user,
        avatar: response.user.avatar
      }));

      console.log('Updated user state:', user);
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          {/* loading spinner component */}
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
