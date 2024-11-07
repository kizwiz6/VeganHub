import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  error?: FieldError;
  children: ReactNode;
  className?: string;
  helpText?: string;
}

export function FormField({
  label,
  error,
  children,
  className,
  helpText
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {children}
      </div>
      {error ? (
        <p className="text-sm text-red-500">{error.message}</p>
      ) : helpText ? (
        <p className="text-sm text-gray-500">{helpText}</p>
      ) : null}
    </div>
  );
}