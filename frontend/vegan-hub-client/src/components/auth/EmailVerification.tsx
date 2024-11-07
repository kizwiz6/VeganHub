// components/auth/EmailVerification.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '@/lib/api/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setError('No verification token found');
        setVerifying(false);
        return;
      }

      try {
        await authApi.verifyEmail(token);
        toast({
          title: 'Email Verified',
          description: 'Your email has been successfully verified.',
        });
        navigate('/login');
      } catch (err) {
        setError('Email verification failed. Please try again.');
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate, toast]);

  if (verifying) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
        <div className="ml-2">Verifying your email...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => navigate('/login')}>
          Return to Login
        </Button>
      </div>
    );
  }

  return null;
}