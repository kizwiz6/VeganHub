import * as React from "react"
import { cn } from "@/lib/utils"
import { FieldError } from "react-hook-form"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2",
            "text-sm ring-offset-white file:border-0 file:bg-transparent",
            "text-gray-900 dark:text-gray-100",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
            "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "border-gray-200 dark:border-gray-700",
            "dark:bg-gray-800",
            "dark:placeholder-gray-400 dark:focus-visible:ring-green-500",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error.message}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }