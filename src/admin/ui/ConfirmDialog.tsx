'use client'

import { useEffect, useRef } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'

/**
 * A small confirmation modal for destructive actions.
 *
 * Replaces window.confirm, which is unstyled, blocks the whole tab and cannot
 * show a pending state while the delete is in flight.
 *
 * Follows the same conventions as the leads drawer: a gray-900/50 backdrop that
 * closes on click, Escape to dismiss, and the page held still underneath.
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  busy = false,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  /** True while the action runs — both buttons lock so it cannot fire twice. */
  busy?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  // Escape dismisses, and the page behind does not scroll.
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !busy) onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, busy, onCancel])

  // Focus lands on Confirm so the dialog is operable from the keyboard.
  useEffect(() => {
    if (open) confirmRef.current?.focus()
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-gray-900/50"
        onClick={() => !busy && onCancel()}
        aria-label="Cancel"
        tabIndex={-1}
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="px-5 pt-5 pb-4 flex items-start gap-3">
          <span className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </span>
          <div className="min-w-0">
            <h2 id="confirm-title" className="text-sm font-bold text-gray-900">
              {title}
            </h2>
            <p id="confirm-message" className="mt-1 text-xs text-gray-500 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {busy ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
