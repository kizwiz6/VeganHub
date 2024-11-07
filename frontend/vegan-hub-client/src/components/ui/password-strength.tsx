import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = () => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  };

  const strength = calculateStrength();
  const percentage = (strength / 5) * 100;

  const getStrengthText = () => {
    if (strength === 0) return { text: 'Very Weak', color: 'text-red-500' };
    if (strength === 1) return { text: 'Weak', color: 'text-orange-500' };
    if (strength === 2) return { text: 'Fair', color: 'text-yellow-500' };
    if (strength === 3) return { text: 'Good', color: 'text-blue-500' };
    if (strength === 4) return { text: 'Strong', color: 'text-green-500' };
    return { text: 'Very Strong', color: 'text-green-700' };
  };

  const strengthInfo = getStrengthText();

  return (
    <div className="space-y-2">
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-300",
            strength <= 1 && "bg-red-500",
            strength === 2 && "bg-orange-500",
            strength === 3 && "bg-yellow-500",
            strength === 4 && "bg-green-500",
            strength === 5 && "bg-green-700"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={cn("text-xs font-medium", strengthInfo.color)}>
        {strengthInfo.text}
      </div>
    </div>
  );
}