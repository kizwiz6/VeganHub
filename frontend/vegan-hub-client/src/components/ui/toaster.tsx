import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, ...props }) {
        return (
          <Toast key={id} {...props}>
            {title && <div className="font-semibold">{title}</div>}
            {description && <div className="text-sm">{description}</div>}
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}