import { useEffect } from 'react'

export interface ToastMessage {
  id: string
  text: string
  type?: 'info' | 'success' | 'amber'
}

interface ToastProps {
  toast: ToastMessage | null
  onDismiss: () => void
}

export function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(() => {
      onDismiss()
    }, 6000)

    function handleAnyKey() {
      onDismiss()
    }

    window.addEventListener('keydown', handleAnyKey)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleAnyKey)
    }
  }, [toast, onDismiss])

  if (!toast) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm p-4 bg-kabut-lembah/95 border-2 border-lentera rounded-panel shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 text-tulang select-none animate-bounce"
    >
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 bg-lentera rounded-full animate-ping" />
        <span className="font-pixel text-small text-tulang leading-snug">
          {toast.text}
        </span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="px-2 py-0.5 text-xs font-pixel text-embun hover:text-tulang border border-embun/30 hover:border-embun rounded-button transition-colors focus-visible:outline-2 focus-visible:outline-lentera"
        aria-label="Tutup notifikasi"
      >
        ×
      </button>
    </div>
  )
}
