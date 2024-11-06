import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  error?: FieldError;
  children: ReactNode;
  className?: string;
  isValid?: boolean;
  helpText?: string;
}

export function FormField({
  label,
  error,
  children,
  className,
  isValid,
  helpText
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {children}
        {error ? (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
        ) : isValid ? (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
        ) : null}
      </div>
      {error ? (
        <p className="text-sm text-red-500">{error.message}</p>
      ) : helpText ? (
        <p className="text-sm text-gray-500">{helpText}</p>
      ) : null}
    </div>
  );
}