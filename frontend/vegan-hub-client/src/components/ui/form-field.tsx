// src/components/ui/form-field.tsx
import React, { ReactNode } from "react";
import { FieldError, FieldErrors, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: FieldError | FieldErrors<FieldValues> | { message: string } | undefined;
  children: ReactNode;
  className?: string;
  helpText?: string;
  id: string;
  isValid?: boolean;
}

export function FormField({
  label,
  error,
  children,
  className,
  helpText,
  id,
}: FormFieldProps) {
  const getErrorMessage = (error: FormFieldProps["error"]): string | null => {
    if (!error) return null;

    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }

    if (typeof error === "object") {
      const firstError = Object.values(error)[0];
      if (firstError && "message" in firstError) {
        return firstError.message || null;
      }
    }

    return null;
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={id}
        className={cn(
          "block text-sm font-medium",
          error ? "text-red-500" : "text-gray-700 dark:text-gray-200",
         // isValid && "text-green-500" // Optional styling if isValid is true
        )}
      >
        {label}
      </label>
      <div className="relative">
        {React.cloneElement(children as React.ReactElement, { id })}
      </div>
      {error && (
        <p className="text-sm text-red-500">{getErrorMessage(error)}</p>
      )}
      {helpText && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
}
