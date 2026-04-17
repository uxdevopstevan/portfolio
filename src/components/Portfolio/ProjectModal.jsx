import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import AgronomyEdgeDataViz from '../AgronomyDataViz/AgronomyEdgeDataViz'

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
  const textRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [expandedFooter, setExpandedFooter] = useState(null)
  const [activeTag, setActiveTag] = useState(null)
  const [lightboxSrc, setLightboxSrc] = useState(null)

  const isOpen = activeIndex != null && projects[activeIndex]
  const project = isOpen ? projects[activeIndex] : null
  const len = projects.length
  const prevIndex = len ? (activeIndex - 1 + len) % len : null
  const nextIndex = len ? (activeIndex + 1) % len : null
  const prevProject = prevIndex != null ? projects[prevIndex] : null
  const nextProject = nextIndex != null ? projects[nextIndex] : null

  const renderDetailItem = useCallback(
    (item, key) => {
      if (typeof item === 'string') {
        return (
          <div
            key={key}
            className="detail-paragraphs-html [&_a]:text-blue-600 [&_a]:underline [&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0 [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:tracking-tight [&_h2]:text-slate-900 [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-slate-800 [&_li]:mt-1 [&_mark]:rounded [&_mark]:bg-amber-200/60 [&_mark]:px-0.5 [&_mark]:py-0.5 [&_mark]:text-slate-900 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:m-0 [&_p+p]:mt-4 [&_strong]:font-semibold [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 dark:[&_h2]:text-slate-50 dark:[&_h3]:text-slate-100 dark:[&_mark]:bg-amber-300/40 dark:[&_mark]:text-amber-50"
            dangerouslySetInnerHTML={{
              __html:
                typeof document === 'undefined' || !activeTag || !project?.tagHighlights?.[activeTag]
                  ? item
                  : (() => {
                      const phrases = project.tagHighlights[activeTag]
                      const container = document.createElement('div')
                      container.innerHTML = item
                      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
                      const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                      let node
                      while ((node = walker.nextNode())) {
                        const value = node.nodeValue
                        if (!value || !value.trim()) continue
                        let replaced = value
                        phrases.forEach((phrase) => {
                          if (!phrase) return
                          const re = new RegExp(`(${escapeRegExp(phrase)})`, 'gi')
                          replaced = replaced.replace(re, '<mark>$1</mark>')
                        })
                        if (replaced !== value) {
                          const span = document.createElement('span')
                          span.innerHTML = replaced
                          node.parentNode.replaceChild(span, node)
                        }
                      }
                      return container.innerHTML
                    })(),
            }}
          />
        )
      }

      if (item && typeof item === 'object' && item.type === 'component') {
        if (item.name === 'AgronomyEdgeDataViz') {
          return (
            <div key={key} className="my-4">
              <AgronomyEdgeDataViz />
            </div>
          )
        }
      }

      return null
    },
    [activeTag, project],
  )

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

  useEffect(() => {
    if (!lightboxSrc) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setLightboxSrc(null)
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [lightboxSrc])

  useEffect(() => {
    if (!activeTag) return
    if (typeof document === 'undefined') return
    const root = textRef.current
    if (!root) return
    const firstMark = root.querySelector('mark')
    if (!firstMark) return
    try {
      firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } catch {
      // ignore scroll errors
    }
  }, [activeTag])

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
        className="absolute inset-0 z-0 bg-slate-950/80 backdrop-blur-sm"
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
            className="shrink-0 cursor-pointer rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500"
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setLightboxSrc(project.imageSrc)
                      }}
                      className="absolute right-2 top-2 z-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-white/50 bg-slate-950/45 p-2 text-white shadow-sm backdrop-blur transition hover:bg-slate-950/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:right-3 lg:top-3"
                      aria-label="View image fullscreen"
                    >
                      <Maximize2 className="h-4 w-4" aria-hidden />
                    </button>
                    <HoverZoomImage key={project.id} src={project.imageSrc} alt={project.title} />
                  </div>
                </div>
              ) : (
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxSrc(project.imageSrc)
                    }}
                    className="absolute right-2 top-2 z-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-white/50 bg-slate-950/45 p-2 text-white shadow-sm backdrop-blur transition hover:bg-slate-950/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="View image fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" aria-hidden />
                  </button>
                  <MobileZoomPanImage key={project.id} src={project.imageSrc} alt={project.title} />
                </div>
              )}
            </div>
            <div className="flex w-full flex-1 flex-col gap-4 p-6 sm:p-8 lg:min-h-0 lg:w-1/2 lg:overflow-y-auto lg:overscroll-contain">
              {project.tags?.length ? (
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
                        aria-pressed={activeTag === tag}
                        className={[
                          'inline-flex cursor-pointer items-center rounded-full border px-3 py-1 text-xs font-medium transition',
                          activeTag === tag
                            ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-blue-400 dark:hover:text-blue-200',
                        ].join(' ')}
                      >
                        {tag}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div
                ref={textRef}
                className="space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-400"
              >
                {project.detailParagraphs.map((item, i) => renderDetailItem(item, i))}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/50 sm:px-6">
          <div className="flex flex-row gap-3 sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goPrev}
              onPointerDown={() => setExpandedFooter('prev')}
              onPointerUp={() => setExpandedFooter(null)}
              onPointerCancel={() => setExpandedFooter(null)}
              onPointerLeave={() => setExpandedFooter(null)}
              className="flex min-w-0 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500"
              style={{
                flexBasis: expandedFooter === 'next' ? '40%' : expandedFooter === 'prev' ? '60%' : '50%',
                transition: 'flex-basis 180ms ease-out',
              }}
            >
              <ChevronLeft className="h-5 w-5 shrink-0" aria-hidden />
              <span className="min-w-0">
                <span className="block text-xs font-normal text-slate-500 dark:text-slate-500">Previous</span>
                <span
                  className={[
                    'block',
                    expandedFooter === 'prev' ? '' : 'truncate',
                  ].join(' ')}
                >
                  {prevProject?.title ?? '—'}
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={goNext}
              onPointerDown={() => setExpandedFooter('next')}
              onPointerUp={() => setExpandedFooter(null)}
              onPointerCancel={() => setExpandedFooter(null)}
              onPointerLeave={() => setExpandedFooter(null)}
              className="flex min-w-0 cursor-pointer items-center justify-end gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-sm font-medium text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500"
              style={{
                flexBasis: expandedFooter === 'prev' ? '40%' : expandedFooter === 'next' ? '60%' : '50%',
                transition: 'flex-basis 180ms ease-out',
              }}
            >
              <span className="min-w-0">
                <span className="block text-xs font-normal text-slate-500 dark:text-slate-500">Next</span>
                <span
                  className={[
                    'block',
                    expandedFooter === 'next' ? '' : 'truncate',
                  ].join(' ')}
                >
                  {nextProject?.title ?? '—'}
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {lightboxSrc ? (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image fullscreen"
        >
          <div className="flex shrink-0 justify-end">
            <button
              type="button"
              onClick={() => setLightboxSrc(null)}
              className="cursor-pointer rounded-full border border-white/30 bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Close fullscreen image"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <button
            type="button"
            className="relative mt-2 flex min-h-0 flex-1 cursor-zoom-out items-center justify-center"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close fullscreen image"
          >
            <img
              src={lightboxSrc}
              alt={project.title}
              className="max-h-full max-w-full select-none object-contain"
              draggable={false}
            />
          </button>
        </div>
      ) : null}
    </div>
  )
}
