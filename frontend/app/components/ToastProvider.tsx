'use client';

import * as Toast from '@radix-ui/react-toast'
import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastMessage {
  id: string
  title: string
  description?: string
  type: ToastType
}

interface ToastContext {
  toast: (title: string, type?: ToastType, description?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const toast = (title: string, type: ToastType = 'info', description?: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    setMessages((prev) => [...prev, { id, title, description, type }])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
    }, 5000)
  }

  const removeToast = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
   error : <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        {messages.map((msg) => (
          <Toast.Root
            key={msg.id}
            className="neo-card p-4 mb-2 flex items-start justify-between gap-4 animate-fade-in"
            onOpenChange={() => removeToast(msg.id)}
          >
            <div className="flex items-start gap-3">
              {icons[msg.type]}
              <div>
                <Toast.Title className="font-semibold text-foreground">
                  {msg.title}
                </Toast.Title>
                {msg.description && (
                  <Toast.Description className="text-sm text-foreground/70 mt-1">
                    {msg.description}
                  </Toast.Description>
                )}
              </div>
            </div>
            <Toast.Close className="p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0">
              <X className="w-4 h-4" />
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-96 max-w-[90vw] z-50" />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}
