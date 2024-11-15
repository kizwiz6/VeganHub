import { Button } from '@/components/ui/button';
import { Chrome, Facebook } from 'lucide-react';

interface SocialLoginProps {
  onSocialLogin: (provider: 'google' | 'facebook') => Promise<void>;
  isLoading?: boolean;
}

export function SocialLogin({ onSocialLogin, isLoading }: SocialLoginProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          disabled={isLoading}
          onClick={() => onSocialLogin('google')}
          className="w-full"
        >
          <Chrome className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          disabled={isLoading}
          onClick={() => onSocialLogin('facebook')}
          className="w-full"
        >
          <Facebook className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}