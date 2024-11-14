// src/components/ui/form-field.tsx
import { ReactNode } from 'react';
import { FieldError, FieldErrors, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  error?: FieldError | FieldErrors<FieldValues> | { message: string } | undefined;
  children: ReactNode;
  className?: string;
  helpText?: string;
  isValid?: boolean;
}

export function FormField({
  label,
  error,
  children,
  className,
  helpText
}: FormFieldProps) {
  const getErrorMessage = (error: FormFieldProps['error']): string | null => {
    if (!error) return null;

    // If it's a FieldError object with message
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }

    // If it's a FieldErrors object
    if (typeof error === 'object') {
      const firstError = Object.values(error)[0];
      if (firstError && 'message' in firstError) {
        return firstError.message || null;
      }
    }

    return null;
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <div className="relative">
        {children}
      </div>
      {error && getErrorMessage(error) ? (
        <p className="text-sm text-red-500">{getErrorMessage(error)}</p>
      ) : helpText ? (
        <p className="text-sm text-gray-500 dark:text-gray-300">{helpText}</p>
      ) : null}
    </div>
  );
}