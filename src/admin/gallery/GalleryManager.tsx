'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Check, CheckCircle2, FolderInput, ImagePlus, Pencil, Search, Trash2, TriangleAlert, Upload, X,
} from 'lucide-react'
import { mediaImages, formatDate, type MediaImage } from '@/src/admin/data/adminData'
import { destinations } from '@/src/data/destinations'

/** Album ids are destination slugs, plus a catch-all for brand assets. */
const albumOptions = [
  ...destinations.map((d) => ({ id: d.slug, label: d.name })),
  { id: 'general', label: 'General' },
]

const filterAlbums = [{ id: 'all', label: 'All photos' }, ...albumOptions]

function albumLabel(id: string) {
  return albumOptions.find((a) => a.id === id)?.label ?? id
}

const labelClass = 'block text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-1'

/** A file chosen in the form but not yet saved into the library. */
type PendingFile = {
  id: number
  url: string
  fileName: string
  size: string
}

export default function GalleryManager() {
  /** Seeded from the dummy library, then owned here so photos can be captioned and re-filed. */
  const [library, setLibrary] = useState<MediaImage[]>(mediaImages)
  const [album, setAlbum] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<number[]>([])
  const [dragging, setDragging] = useState(false)
  const [saved, setSaved] = useState(0)

  // Upload form. Chosen files wait in `pending` until Save commits them to the library.
  const [pending, setPending] = useState<PendingFile[]>([])
  const [uploadCaption, setUploadCaption] = useState('')
  const [uploadAlbum, setUploadAlbum] = useState(destinations[0].slug)

  // Card editing — one card at a time, and only once you ask for it.
  const [editingId, setEditingId] = useState<number | null>(null)
  const [draftCaption, setDraftCaption] = useState('')
  const [draftAlbum, setDraftAlbum] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  /** Only URLs this component minted may be revoked — the seeded ones are plain links. */
  const objectUrls = useRef<string[]>([])

  useEffect(() => {
    const urls = objectUrls.current
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return library.filter((image) => {
      if (album !== 'all' && image.album !== album) return false
      if (!q) return true
      return `${image.caption} ${image.fileName ?? ''} ${albumLabel(image.album)}`.toLowerCase().includes(q)
    })
  }, [library, album, query])

  // A photo with no caption still publishes — it just publishes blank. Worth flagging.
  const uncaptioned = library.filter((image) => !image.caption.trim()).length

  /** Choosing files only stages them — nothing reaches the library until Save. */
  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return

    const images = Array.from(files).filter((file) => file.type.startsWith('image/'))
    if (images.length === 0) return

    const picked = images.map((file, i) => {
      const url = URL.createObjectURL(file)
      objectUrls.current.push(url)

      return {
        id: Date.now() + i,
        url,
        fileName: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      }
    })

    setPending((prev) => [...prev, ...picked])
    setSaved(0)
  }

  function dropPending(id: number) {
    setPending((prev) => {
      const target = prev.find((file) => file.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((file) => file.id !== id)
    })
  }

  function clearPending() {
    pending.forEach((file) => URL.revokeObjectURL(file.url))
    setPending([])
  }

  /** Commits the staged files into the library under the chosen caption and destination. */
  function savePending() {
    if (pending.length === 0) return

    const caption = uploadCaption.trim()

    const added: MediaImage[] = pending.map((file, i) => ({
      id: file.id,
      url: file.url,
      // One caption across a multi-file batch would read as duplicates, so number them.
      caption: caption && pending.length > 1 ? `${caption} ${i + 1}` : caption,
      album: uploadAlbum,
      size: file.size,
      dimensions: 'Pending',
      uploadedAt: new Date().toISOString().slice(0, 10),
      fileName: file.fileName,
    }))

    setLibrary((prev) => [...added, ...prev])
    setPending([])
    setUploadCaption('')
    setSaved(added.length)
  }

  function startEditing(image: MediaImage) {
    setEditingId(image.id)
    setDraftCaption(image.caption)
    setDraftAlbum(image.album)
  }

  function saveEdit() {
    if (editingId === null) return
    setLibrary((prev) =>
      prev.map((image) =>
        image.id === editingId ? { ...image, caption: draftCaption.trim(), album: draftAlbum } : image
      )
    )
    setEditingId(null)
  }

  /** Bulk re-file, used by the selection bar. */
  function moveTo(ids: number[], target: string) {
    setLibrary((prev) => prev.map((image) => (ids.includes(image.id) ? { ...image, album: target } : image)))
  }

  function removeSelected() {
    setLibrary((prev) => prev.filter((image) => !selected.includes(image.id)))
    setSelected([])
  }

  function toggle(id: number) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const fieldClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-300 bg-white focus:outline-none focus:border-gray-400 transition-colors'

  return (
    <>
      {/* Upload form — caption and destination are chosen here, before the files are picked */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        className={`bg-white border-2 border-dashed rounded-2xl px-6 py-9 transition-colors ${
          dragging ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
        }`}
      >
        <div className="text-center">
          <span className="inline-flex w-12 h-12 rounded-2xl bg-gray-900 items-center justify-center mb-3">
            <Upload className="w-5 h-5 text-white" />
          </span>
          <p className="text-sm font-semibold text-gray-900">Drop photos here to add them</p>
          <p className="mt-1 text-xs text-gray-400">
            JPG, PNG or WebP up to 10 MB each · landscape crops work best on the site
          </p>
        </div>

        <div className="mt-6 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-[1fr_14rem_auto] gap-3 items-end">
          <div>
            <label htmlFor="upload-caption" className={labelClass}>Caption</label>
            <input
              id="upload-caption"
              type="text"
              value={uploadCaption}
              onChange={(e) => setUploadCaption(e.target.value)}
              placeholder="Pangong Tso at first light"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="upload-album" className={labelClass}>Save to</label>
            <select
              id="upload-album"
              value={uploadAlbum}
              onChange={(e) => setUploadAlbum(e.target.value)}
              className={fieldClass}
            >
              {albumOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            <ImagePlus className="w-4 h-4" />
            Browse files
          </button>
        </div>

        <p className="mt-2 max-w-3xl mx-auto text-[11px] text-gray-400">
          The caption is the line shown over the photo on the destination page. Choose several files at once and
          they are numbered from this caption.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => { addFiles(e.target.files); e.target.value = '' }}
        />

        {/* Staged files — chosen but not yet in the library */}
        {pending.length > 0 && (
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                Ready to save ({pending.length})
              </p>
              <button
                onClick={clearPending}
                className="text-[11px] font-semibold text-gray-400 hover:text-gray-900 transition-colors"
              >
                Clear all
              </button>
            </div>

            <ul className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {pending.map((file) => (
                <li key={file.id} className="relative flex-shrink-0">
                  <span className="block w-24 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={file.url} alt={file.fileName} className="w-full h-full object-cover" />
                  </span>
                  <button
                    onClick={() => dropPending(file.id)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                    aria-label={`Remove ${file.fileName}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <span className="block mt-1 w-24 text-[10px] text-gray-400 truncate">{file.fileName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Save bar — nothing enters the library until this is pressed */}
        <div className="mt-5 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={savePending}
            disabled={pending.length === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Check className="w-4 h-4" />
            {pending.length === 0
              ? 'Save'
              : `Save ${pending.length} photo${pending.length > 1 ? 's' : ''} to ${albumLabel(uploadAlbum)}`}
          </button>

          {pending.length === 0 && saved === 0 && (
            <p className="text-[11px] text-gray-400">Choose photos above, then save them to the library.</p>
          )}

          {saved > 0 && (
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {saved} photo{saved > 1 ? 's' : ''} saved to {albumLabel(uploadAlbum)}
            </p>
          )}
        </div>
      </div>

      {/* Album filter + search */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 my-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {filterAlbums.map((a) => {
            const active = album === a.id
            return (
              <button
                key={a.id}
                onClick={() => {
                  setAlbum(a.id)
                  // Viewing one destination makes it the obvious upload target too.
                  if (a.id !== 'all') setUploadAlbum(a.id)
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
                }`}
              >
                {a.label}
              </button>
            )
          })}
        </div>

        <div className="relative lg:ml-auto lg:w-72">
          <Search className="w-4 h-4 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search captions…"
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
      </div>

      {uncaptioned > 0 && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-800 rounded-xl px-4 py-2.5 mb-4">
          <TriangleAlert className="w-4 h-4 flex-shrink-0" />
          <p className="text-xs">
            {uncaptioned} photo{uncaptioned > 1 ? 's have' : ' has'} no caption — an empty one publishes blank
            on the destination page.
          </p>
        </div>
      )}

      {/* Selection bar — only present while something is selected */}
      {selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 bg-gray-900 text-white rounded-xl px-4 py-2.5 mb-4">
          <p className="text-xs font-medium">{selected.length} selected</p>

          <div className="flex items-center gap-2 ml-auto">
            <label htmlFor="move-to" className="inline-flex items-center gap-1.5 text-xs text-gray-300">
              <FolderInput className="w-3.5 h-3.5" />
              Move to
            </label>
            <select
              id="move-to"
              value=""
              onChange={(e) => {
                if (!e.target.value) return
                moveTo(selected, e.target.value)
                setSelected([])
              }}
              className="bg-white/10 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white/50 transition-colors"
            >
              <option value="" className="text-gray-900">Choose destination…</option>
              {albumOptions.map((option) => (
                <option key={option.id} value={option.id} className="text-gray-900">{option.label}</option>
              ))}
            </select>

            <button
              onClick={removeSelected}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-300 hover:text-red-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
            <button
              onClick={() => setSelected([])}
              className="p-1 rounded-md text-gray-400 hover:text-white transition-colors"
              aria-label="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((image) => {
          const isSelected = selected.includes(image.id)
          const isEditing = editingId === image.id
          const needsCaption = !image.caption.trim()
          const label = image.caption.trim() || image.fileName || 'Untitled photo'

          return (
            <figure
              key={image.id}
              className={`group bg-white border rounded-2xl overflow-hidden shadow-sm transition-colors ${
                isSelected
                  ? 'border-gray-900'
                  : needsCaption
                    ? 'border-amber-200'
                    : 'border-gray-100 hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => toggle(image.id)}
                className="relative block w-full aspect-[4/3] bg-gray-100 text-left"
                aria-pressed={isSelected}
                aria-label={`Select ${label}`}
              >
                <img src={image.url} alt={label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <span
                  className={`absolute inset-0 transition-colors ${
                    isSelected ? 'bg-gray-900/30' : 'bg-gray-900/0 group-hover:bg-gray-900/20'
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-2.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-gray-900 border-gray-900'
                      : 'bg-white/80 border-white opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </span>

                {/* How the caption reads on the destination page, over the same gradient */}
                <span className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="block text-[11px] font-medium text-white truncate">
                    {image.caption.trim() || 'No caption yet'}
                  </span>
                </span>
              </button>

              <figcaption className="p-3">
                {isEditing ? (
                  <div className="space-y-2">
                    <div>
                      <label htmlFor={`caption-${image.id}`} className={labelClass}>Caption</label>
                      <input
                        id={`caption-${image.id}`}
                        type="text"
                        value={draftCaption}
                        onChange={(e) => setDraftCaption(e.target.value)}
                        placeholder="Pangong Tso at first light"
                        className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor={`album-${image.id}`} className={labelClass}>Destination</label>
                      <select
                        id={`album-${image.id}`}
                        value={draftAlbum}
                        onChange={(e) => setDraftAlbum(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 transition-colors"
                      >
                        {albumOptions.map((option) => (
                          <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5 pt-0.5">
                      <button
                        onClick={saveEdit}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-900 text-white text-[11px] font-semibold px-2 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-xs font-medium truncate ${
                          needsCaption ? 'text-amber-600 italic' : 'text-gray-900'
                        }`}
                      >
                        {image.caption.trim() || 'No caption yet'}
                      </p>
                      <button
                        onClick={() => startEditing(image)}
                        className="p-1 -mt-0.5 -mr-1 rounded-lg text-gray-300 hover:text-gray-900 hover:bg-gray-100 transition-colors flex-shrink-0"
                        aria-label={`Edit ${label}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="mt-0.5 text-[11px] text-gray-500">{albumLabel(image.album)}</p>
                    <p className="text-[11px] text-gray-300 truncate">
                      {image.size} · {image.dimensions} · {formatDate(image.uploadedAt)}
                    </p>
                  </>
                )}
              </figcaption>
            </figure>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-14 text-center">
          <p className="text-sm font-medium text-gray-900">Nothing in this album yet</p>
          <p className="mt-1 text-xs text-gray-400">
            Pick {album === 'all' ? 'a destination' : albumLabel(album)} above and drop photos in to start filling it.
          </p>
        </div>
      )}
    </>
  )
}
