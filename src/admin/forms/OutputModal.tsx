'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, X } from 'lucide-react'

/**
 * There is no database yet, so "create" ends here: the form hands back an object
 * shaped exactly like the entries in src/data/*.ts, ready to paste into the
 * array. Replace this with a POST when the backend lands.
 */
export default function OutputModal({
  title,
  targetFile,
  payload,
  onClose,
}: {
  title: string
  targetFile: string
  payload: unknown
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const json = JSON.stringify(payload, null, 2)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  // Reset the confirmation tick a couple of seconds after a copy.
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(json)
      setCopied(true)
    } catch {
      // Clipboard access can be blocked — the textarea below is still selectable.
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button className="absolute inset-0 bg-gray-900/60" onClick={onClose} aria-label="Close preview" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden"
      >
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <p className="mt-0.5 text-xs text-gray-400">
              Paste this into the array in <span className="font-medium text-gray-600">{targetFile}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5">
          <pre className="text-[11px] leading-relaxed text-gray-700 bg-gray-50 rounded-xl p-4 overflow-x-auto">
            {json}
          </pre>
        </div>

        <div className="flex items-center gap-2 px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={copy}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy JSON'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
