import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/lib/api/auth';
import { FormField } from '@/components/ui/form-field';
import { PasswordResetForm } from '@/components/auth/PasswordResetForm';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password); 
      toast({
        title: "Success",
        description: "Successfully logged in",
      });
      navigate('/recipes');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (email: string) => {
    try {
      setIsLoading(true);
      await authApi.requestPasswordReset(email);
      toast({
        title: 'Password Reset',
        description: 'Check your email for reset instructions',
      });
      setShowResetForm(false);
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reset email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-green-600 hover:text-green-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {!showResetForm ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              label="Email"
              error={errors.email}
            >
              <Input
                {...register('email')}
                type="email"
                placeholder="Email address"
                error={errors.email}
                autoComplete="email"
              />
            </FormField>

            <FormField
              label="Password"
              error={errors.password}
            >
              <Input
                {...register('password')}
                type="password"
                placeholder="Password"
                error={errors.password}
                autoComplete="current-password"
              />
            </FormField>

            <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                {...register('rememberMe')}
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

              <button
                type="button"
                onClick={() => setShowResetForm(true)}
                className="text-sm text-green-600 hover:text-green-500"
              >
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        ) : (
          <PasswordResetForm
            onSubmit={handlePasswordReset}
            onCancel={() => setShowResetForm(false)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}