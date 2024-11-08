// src/pages/ResetPassword.tsx
import { PasswordResetForm } from '@/components/auth/PasswordResetForm';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/lib/api/auth';
import { useState } from 'react';

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleReset = async (email: string) => {
    try {
      setIsLoading(true);
      await authApi.requestPasswordReset(email);
      toast({
        title: 'Password Reset Email Sent',
        description: 'Check your email for reset instructions',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send reset email',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <PasswordResetForm
          onSubmit={handleReset}
          onCancel={() => window.history.back()}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}