"use client"

import * as React from "react"
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react"

export type ToastType = "success" | "error" | "warning" | "info"

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  toast: {
    success: (message: string, duration?: number) => void
    error: (message: string, duration?: number) => void
    warning: (message: string, duration?: number) => void
    info: (message: string, duration?: number) => void
  }
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context.toast
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((message: string, type: ToastType, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type, duration }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = React.useMemo(
    () => ({
      success: (msg: string, dur?: number) => addToast(msg, "success", dur),
      error: (msg: string, dur?: number) => addToast(msg, "error", dur),
      warning: (msg: string, dur?: number) => addToast(msg, "warning", dur),
      info: (msg: string, dur?: number) => addToast(msg, "info", dur),
    }),
    [addToast]
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none sm:top-6 sm:right-6">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const rAF = requestAnimationFrame(() => {
      // Delay slightly to allow element to mount in DOM before transitioning
      setTimeout(() => setIsVisible(true), 10)
    })
    return () => cancelAnimationFrame(rAF)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  }

  const bgStyles = {
    success: "bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-500/20 text-emerald-900 dark:text-emerald-250",
    error: "bg-rose-50/90 dark:bg-rose-950/30 border-rose-500/20 text-rose-900 dark:text-rose-200",
    warning: "bg-amber-50/90 dark:bg-amber-950/30 border-amber-500/20 text-amber-900 dark:text-amber-200",
    info: "bg-blue-50/90 dark:bg-blue-950/30 border-blue-500/20 text-blue-900 dark:text-blue-200",
  }

  return (
    <div
      className={`
        pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md
        transition-all duration-300 transform ease-out
        ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}
        ${bgStyles[toast.type]}
      `}
      role="alert"
    >
      {icons[toast.type]}
      <p className="text-sm font-medium leading-relaxed flex-1">{toast.message}</p>
      <button
        onClick={handleClose}
        className="p-0.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-current/60 hover:text-current shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
