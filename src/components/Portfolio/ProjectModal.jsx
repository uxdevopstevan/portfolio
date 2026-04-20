import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import AgronomyEdgeDataViz from '../Projects/AgronomyEdgeDataViz'
import { applyTagHighlightsToHtml, CASE_STUDY_HTML_CLASS } from '../../lib/caseStudyHtml'
import { HoverZoomImage, MobileZoomPanImage } from './ProjectMedia'
import { ProjectCaseStudy } from './ProjectCaseStudy'

export function ProjectModal({ projects, activeIndex, onClose, onNavigate }) {
  const titleId = useId()
  const closeRef = useRef(null)
  const textRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )
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
            className={CASE_STUDY_HTML_CLASS}
            dangerouslySetInnerHTML={{
              __html: applyTagHighlightsToHtml(item, activeTag, project?.tagHighlights),
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
    const scrollY = window.scrollY
    const html = document.documentElement
    const prevHtmlOverflow = html.style.overflow
    const prevBodyPosition = document.body.style.position
    const prevBodyTop = document.body.style.top
    const prevBodyLeft = document.body.style.left
    const prevBodyRight = document.body.style.right
    const prevBodyWidth = document.body.style.width
    const prevBodyOverflow = document.body.style.overflow

    html.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prevHtmlOverflow
      document.body.style.position = prevBodyPosition
      document.body.style.top = prevBodyTop
      document.body.style.left = prevBodyLeft
      document.body.style.right = prevBodyRight
      document.body.style.width = prevBodyWidth
      document.body.style.overflow = prevBodyOverflow
      window.scrollTo(0, scrollY)
    }
  }, [isOpen, onClose, goPrev, goNext])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
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

  // Note: tag highlights remain, but we intentionally do not auto-scroll to <mark>.

  if (!isOpen || !project) return null

  const detailImageSrc = project.modalImageSrc ?? project.imageSrc
  const hasSections = Boolean(project.sections?.length)

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-[100dvh] items-stretch justify-center overscroll-none p-0 sm:p-4"
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

      <div className="relative z-10 flex h-[100dvh] max-h-[100dvh] min-h-0 w-full max-w-6xl flex-col overflow-hidden rounded-none border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:my-auto sm:rounded-2xl">
        <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
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

        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          {hasSections ? (
            <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
              <ProjectCaseStudy
                key={project.id}
                ref={textRef}
                sections={project.sections}
                tags={project.tags}
                activeTag={activeTag}
                onTagPress={(tag) => setActiveTag((current) => (current === tag ? null : tag))}
                tagHighlights={project.tagHighlights}
                projectTitle={project.title}
                onOpenLightbox={setLightboxSrc}
              />
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain lg:flex-row lg:overflow-hidden">
              <div className="w-full shrink-0 lg:flex lg:h-full lg:min-h-0 lg:w-1/2 lg:flex-col lg:self-stretch">
                {isDesktop ? (
                  <div className="relative flex min-h-0 w-full flex-1 flex-col bg-slate-100 px-0 py-0 dark:bg-slate-800 sm:px-0 sm:py-0 lg:min-h-0 lg:px-4 lg:py-4">
                    <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-none lg:rounded-xl">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setLightboxSrc(detailImageSrc)
                        }}
                        className="absolute right-2 top-2 z-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-white/50 bg-slate-950/45 p-2 text-white shadow-sm backdrop-blur transition hover:bg-slate-950/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:right-3 lg:top-3"
                        aria-label="View image fullscreen"
                      >
                        <Maximize2 className="h-4 w-4" aria-hidden />
                      </button>
                      <HoverZoomImage
                        key={`${project.id}-${detailImageSrc}`}
                        src={detailImageSrc}
                        alt={project.title}
                        fillHeight
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setLightboxSrc(detailImageSrc)
                      }}
                      className="absolute right-2 top-2 z-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-white/50 bg-slate-950/45 p-2 text-white shadow-sm backdrop-blur transition hover:bg-slate-950/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      aria-label="View image fullscreen"
                    >
                      <Maximize2 className="h-4 w-4" aria-hidden />
                    </button>
                    <MobileZoomPanImage key={`${project.id}-${detailImageSrc}`} src={detailImageSrc} alt={project.title} />
                  </div>
                )}
              </div>
              <div className="flex w-full flex-1 flex-col gap-4 p-6 sm:p-8 lg:min-h-0 lg:w-1/2 lg:overflow-y-auto lg:overscroll-contain">
                {project.tags?.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full">
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
                  {project.detailParagraphs?.map((item, i) => renderDetailItem(item, i))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-slate-800 dark:bg-slate-950/50 sm:px-6 sm:pb-3">
          <div className="flex flex-row gap-3 sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goPrev}
              className="flex min-w-0 flex-1 cursor-pointer touch-manipulation select-none items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500"
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
              className="flex min-w-0 flex-1 cursor-pointer touch-manipulation select-none items-center justify-end gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-sm font-medium text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500"
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
