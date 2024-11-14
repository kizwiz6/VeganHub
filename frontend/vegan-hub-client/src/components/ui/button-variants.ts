import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: [
          "bg-green-600 text-white hover:bg-green-700",
          "dark:bg-green-700 dark:hover:bg-green-600"
        ],
        destructive: [
          "bg-red-500 text-white hover:bg-red-600",
          "dark:bg-red-600 dark:hover:bg-red-500"
        ],
        outline: [
          "border border-green-600 text-green-600 hover:bg-green-50",
          "dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950"
        ],
        secondary: [
          "bg-green-100 text-green-900 hover:bg-green-200",
          "dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
        ],
        ghost: [
          "hover:bg-green-50 text-green-600",
          "dark:hover:bg-green-950 dark:text-green-500"
        ],
        link: [
          "text-green-600 underline-offset-4 hover:underline",
          "dark:text-green-500"
        ]
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)