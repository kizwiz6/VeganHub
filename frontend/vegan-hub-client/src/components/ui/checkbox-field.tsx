import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface CheckboxFieldProps {
  label: ReactNode;
  error?: FieldError;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name: string;
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
        <CheckboxPrimitive.Root
          id={name}
          checked={checked}
          onCheckedChange={onCheckedChange}
          name={name}
          disabled={disabled}
          required={required}
          className="peer h-4 w-4 shrink-0 rounded-sm border border-gray-200 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
            <Check className="h-4 w-4" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
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
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}