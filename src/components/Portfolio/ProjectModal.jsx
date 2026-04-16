import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

function MobileZoomPanImage({ src, alt }) {
  const containerRef = useRef(null)
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, startTx: 0, startTy: 0 })
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  const clampTranslate = useCallback((next) => {
    const el = containerRef.current
    if (!el) return next
    const w = el.clientWidth
    const h = el.clientHeight
    const maxX = Math.max(0, (w * (scale - 1)) / 2)
    const maxY = Math.max(0, (h * (scale - 1)) / 2)
    return {
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y)),
    }
  }, [scale])

  useEffect(() => {
    if (scale <= 1) setTranslate({ x: 0, y: 0 })
    else setTranslate((t) => clampTranslate(t))
  }, [scale, clampTranslate])

  const onPointerDown = (e) => {
    if (scale <= 1) return
    dragRef.current.isDragging = true
    dragRef.current.startX = e.clientX
    dragRef.current.startY = e.clientY
    dragRef.current.startTx = translate.x
    dragRef.current.startTy = translate.y
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!dragRef.current.isDragging) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setTranslate(clampTranslate({ x: dragRef.current.startTx + dx, y: dragRef.current.startTy + dy }))
  }

  const onPointerUp = (e) => {
    dragRef.current.isDragging = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 lg:aspect-auto lg:h-full"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ touchAction: scale > 1 ? 'none' : 'pan-y' }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="max-h-full max-w-full select-none object-contain object-center"
            style={{
              transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
              transformOrigin: 'center',
              transition: dragRef.current.isDragging ? 'none' : 'transform 120ms ease-out',
              cursor: scale > 1 ? 'grab' : 'default',
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 lg:hidden">
        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Zoom</label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="w-full"
          aria-label="Zoom image"
        />
        <button
          type="button"
          onClick={() => setScale(1)}
          className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

function HoverZoomImage({ src, alt }) {
  const imgRef = useRef(null)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const onMove = useCallback(
    (e) => {
      if (reduceMotion) return
      const r = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      if (Number.isFinite(x) && Number.isFinite(y)) {
        setOrigin({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) })
      }
    },
    [reduceMotion],
  )

  return (
    <div
      className={['group relative inline-block max-h-full max-w-full', reduceMotion ? '' : 'cursor-zoom-in'].join(' ')}
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setIsHovering(false)
        setOrigin({ x: 50, y: 50 })
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        className={[
          'block max-h-full max-w-full select-none object-contain object-center',
          reduceMotion ? '' : 'transition-transform duration-200 ease-out',
          reduceMotion ? '' : 'group-hover:scale-[1.9]',
          'pointer-events-none',
        ].join(' ')}
        style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}
      />
      {!reduceMotion ? (
        <div
          className={[
            'pointer-events-none absolute bottom-3 left-3 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-medium text-white shadow-sm',
            isHovering ? 'opacity-0' : 'opacity-100',
            'transition-opacity duration-200',
          ].join(' ')}
          aria-hidden
        >
          Hover to zoom
        </div>
      ) : null}
    </div>
  )
}

export function ProjectModal({ projects, activeIndex, onClose, onNavigate }) {
  const titleId = useId()
  const closeRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  const isOpen = activeIndex != null && projects[activeIndex]
  const project = isOpen ? projects[activeIndex] : null
  const len = projects.length
  const prevIndex = len ? (activeIndex - 1 + len) % len : null
  const nextIndex = len ? (activeIndex + 1) % len : null
  const prevProject = prevIndex != null ? projects[prevIndex] : null
  const nextProject = nextIndex != null ? projects[nextIndex] : null

  const goPrev = useCallback(() => {
    if (prevIndex == null) return
    onNavigate(prevIndex)
  }, [onNavigate, prevIndex])

  const goNext = useCallback(() => {
    if (nextIndex == null) return
    onNavigate(nextIndex)
  }, [onNavigate, nextIndex])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, goPrev, goNext])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  if (!isOpen || !project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        aria-label="Close project details"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full min-h-0 w-full max-h-[100dvh] max-w-6xl flex-col overflow-hidden rounded-none border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:my-auto sm:max-h-[calc(100dvh-2rem)] sm:rounded-2xl">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800 sm:px-6">
          <h2 id={titleId} className="min-w-0 truncate text-lg font-bold tracking-tight">
            {project.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain lg:flex-row lg:overflow-hidden">
            <div className="w-full shrink-0 lg:flex lg:w-1/2 lg:min-h-0 lg:self-stretch">
              {isDesktop ? (
                <div className="relative flex w-full items-center justify-center bg-slate-100 px-0 py-0 dark:bg-slate-800 sm:px-0 sm:py-0 lg:px-4 lg:py-8">
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-none lg:rounded-xl">
                    <HoverZoomImage key={project.id} src={project.imageSrc} alt={project.title} />
                  </div>
                </div>
              ) : (
                <MobileZoomPanImage key={project.id} src={project.imageSrc} alt={project.title} />
              )}
            </div>
            <div className="flex w-full flex-1 flex-col gap-4 p-6 sm:p-8 lg:min-h-0 lg:w-1/2 lg:overflow-y-auto lg:overscroll-contain">
              {project.tags?.length ? (
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {project.detailParagraphs.map((fragment, i) => (
                  <div
                    key={i}
                    className="detail-paragraphs-html [&_a]:text-blue-600 [&_a]:underline [&>h3:first-child]:mt-0 [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-slate-800 [&_li]:mt-1 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:m-0 [&_p+p]:mt-4 [&_strong]:font-semibold [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 dark:[&_h3]:text-slate-100"
                    dangerouslySetInnerHTML={{ __html: fragment }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/50 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goPrev}
              className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500"
            >
              <ChevronLeft className="h-5 w-5 shrink-0" aria-hidden />
              <span className="min-w-0">
                <span className="block text-xs font-normal text-slate-500 dark:text-slate-500">Previous</span>
                <span className="block truncate">{prevProject?.title ?? '—'}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex min-w-0 flex-1 items-center justify-end gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-sm font-medium text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500"
            >
              <span className="min-w-0">
                <span className="block text-xs font-normal text-slate-500 dark:text-slate-500">Next</span>
                <span className="block truncate">{nextProject?.title ?? '—'}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
