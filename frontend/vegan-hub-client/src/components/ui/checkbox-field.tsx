// components/ui/checkbox-field.tsx
import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Checkbox } from './checkbox';

interface CheckboxFieldProps {
  label: ReactNode;
  error?: FieldError;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
}

export function CheckboxField({
  label,
  error,
  className,
  checked,
  onCheckedChange,
  name,
  disabled,
  required
}: CheckboxFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          name={name}
          disabled={disabled}
          required={required}
        />
        <label
          htmlFor={name}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            error && "text-red-500"
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}