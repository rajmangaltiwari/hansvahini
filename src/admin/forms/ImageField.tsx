'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Link2, Loader2, TriangleAlert, Upload, X } from 'lucide-react'
import { MAX_UPLOAD_MB, isPreviewUrl, releasePreview, uploadImage } from '@/src/admin/imageUpload'

/**
 * A URL field with two ways to fill it: paste a link, or pick a file.
 *
 * Both paths produce a plain string, so this is a drop-in replacement for
 * TextInput anywhere an image URL is stored — the record shape does not change
 * whether the image was linked or uploaded.
 */
export default function ImageField({
  id,
  value,
  onChange,
  placeholder = 'https://…',
  /** Groups uploads in storage — the destination or package slug. */
  folder = 'general',
}: {
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  folder?: string
}) {
  const [mode, setMode] = useState<'link' | 'upload'>('link')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [broken, setBroken] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  /** Replacing a value frees the preview it is replacing, so blobs do not pile up. */
  function commit(next: string) {
    if (value && value !== next) releasePreview(value)
    setBroken(false)
    onChange(next)
  }

  async function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return

    setBusy(true)
    setError(null)
    try {
      commit(await uploadImage(file, folder))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'That upload failed.')
    } finally {
      setBusy(false)
    }
  }

  const tabClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
      active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
    }`

  return (
    <div>
      {/* The toggle sits beside the input rather than above it, so the input keeps
          the same top edge as a plain TextInput in the neighbouring column. */}
      <div className="flex items-start gap-2">
        {/* Every button here is type="button" — inside a <form>, the default would submit it. */}
        <div
          className={`inline-flex gap-0.5 p-0.5 bg-gray-100 rounded-lg flex-shrink-0 ${
            mode === 'link' ? 'self-stretch items-center' : ''
          }`}
        >
          <button type="button" onClick={() => setMode('link')} className={tabClass(mode === 'link')}>
            <Link2 className="w-3 h-3" />
            Link
          </button>
          <button type="button" onClick={() => setMode('upload')} className={tabClass(mode === 'upload')}>
            <Upload className="w-3 h-3" />
            Upload
          </button>
        </div>

        {mode === 'link' ? (
          <input
            id={id}
            type="url"
            value={value}
            onChange={(e) => commit(e.target.value)}
            placeholder={placeholder}
            className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
          />
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
            className={`flex-1 min-w-0 border-2 border-dashed rounded-lg px-3 py-4 text-center transition-colors ${
              dragging ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
            }`}
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-800 disabled:opacity-60 transition-colors"
            >
              {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />}
              {busy ? 'Uploading…' : 'Choose image'}
            </button>
            <p className="mt-1.5 text-[11px] text-gray-400">or drop one here · up to {MAX_UPLOAD_MB} MB</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { handleFiles(e.target.files); e.target.value = '' }}
            />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 flex items-start gap-1.5 text-[11px] text-red-600">
          <TriangleAlert className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
          {error}
        </p>
      )}

      {value && (
        <div className="mt-2 flex items-center gap-2">
          <span className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
            {broken ? (
              <span className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400">
                ?
              </span>
            ) : (
              <img
                src={value}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setBroken(true)}
              />
            )}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-gray-400 truncate">
              {isPreviewUrl(value) ? 'Uploaded file' : value}
            </p>
            {broken && <p className="text-[11px] text-amber-600">That link did not load.</p>}
          </div>

          <button
            type="button"
            onClick={() => commit('')}
            className="p-1 rounded-lg text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
            aria-label="Remove this image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Until storage exists, an uploaded file lives only in this tab. Saying so
          here is cheaper than someone publishing a record full of blob: URLs. */}
      {isPreviewUrl(value) && (
        <p className="mt-1.5 flex items-start gap-1.5 text-[11px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-2 py-1.5">
          <TriangleAlert className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
          Preview only — uploads are not stored yet, so paste a link before publishing.
        </p>
      )}
    </div>
  )
}
