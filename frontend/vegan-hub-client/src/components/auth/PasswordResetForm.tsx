// components/auth/PasswordResetForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const resetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ResetForm = z.infer<typeof resetSchema>;

interface PasswordResetFormProps {
  onSubmit: (email: string) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export function PasswordResetForm({ onSubmit, onCancel, isLoading }: PasswordResetFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  const handleReset = async (data: ResetForm) => {
    await onSubmit(data.email);
  };

  return (
    <form onSubmit={handleSubmit(handleReset)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <Input
        {...register('email')}
        type="email"
        placeholder="Email address"
        error={errors.email}
      />

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
            type="submit"
            disabled={isLoading}
            >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
      </div>
    </form>
  );
}