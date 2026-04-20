import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Code, Maximize2 } from 'lucide-react'
import AgronomyEdgeDataViz from '../Projects/AgronomyEdgeDataViz'
import { HoverZoomImage } from './ProjectMedia'
import {
  applyTagHighlightsToHtml,
  CASE_STUDY_HTML_CLASS,
  splitSectionLeadForMobile,
} from '../../lib/caseStudyHtml'

/** Fills the absolutely positioned sticky slot behind embedded components. */
const COMPONENT_MEDIA_SURFACE = 'bg-slate-100 dark:bg-slate-800'

function GitHubMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 98 96" aria-hidden>
      <path
        fill="currentColor"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.229-5.378-22.229-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a47.13 47.13 0 0 1 12.214-1.304c4.125 0 8.33.571 12.213 1.304 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.325 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      />
    </svg>
  )
}

function ComponentGitHubFab({ href }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'group absolute right-2 top-2 z-30 flex h-9 max-w-[2.25rem] items-center overflow-hidden rounded-full border border-white/30 bg-slate-950/85 py-0 pl-2 pr-2 shadow-lg backdrop-blur-md transition-[max-width,box-shadow] duration-300 ease-out',
        'hover:max-w-[min(16rem,calc(100%-1rem))] hover:border-white/45 hover:pr-2.5 hover:shadow-xl',
        'focus-visible:max-w-[min(16rem,calc(100%-1rem))] focus-visible:border-white/45 focus-visible:pr-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
        'motion-reduce:transition-none sm:right-3 sm:top-3 sm:h-10 sm:max-w-10 sm:pl-2.5 sm:hover:pr-3 sm:focus-visible:pr-3',
      ].join(' ')}
      aria-label="View the code on GitHub"
    >
      <GitHubMark className="size-[1.125rem] shrink-0 text-white sm:size-5" />
      <span
        className={[
          'ml-0 max-w-0 overflow-hidden whitespace-nowrap text-left text-[11px] font-medium leading-tight text-white opacity-0 transition-[max-width,opacity,margin] duration-300 ease-out',
          'group-hover:ml-2 group-hover:max-w-[11rem] group-hover:opacity-100',
          'group-focus-visible:ml-2 group-focus-visible:max-w-[11rem] group-focus-visible:opacity-100',
          'motion-reduce:transition-none',
        ].join(' ')}
      >
        View the code on GitHub
      </span>
    </a>
  )
}

function renderInlineMedia(media, title) {
  if (media.type === 'image') {
    return (
      <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
        <img src={media.src} alt={media.alt || title} className="h-auto w-full object-cover" draggable={false} />
      </div>
    )
  }
  if (media.type === 'component' && media.name === 'AgronomyEdgeDataViz') {
    return (
      <div className={`relative mb-4 overflow-hidden rounded-xl ${COMPONENT_MEDIA_SURFACE}`}>
        <ComponentGitHubFab href={media.git} />
        <div className="p-2">
          <AgronomyEdgeDataViz />
        </div>
      </div>
    )
  }
  return null
}

/** `stage`: desktop left column — object-contain + padding; `zoom`: hover-zoom fillHeight */
function StickyMediaLayer({ media, isActive, title, layout = 'zoom' }) {
  const base =
    'absolute inset-0 transition-opacity duration-500 ease-in-out motion-reduce:transition-none'
  const vis = isActive ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
  const stage = layout === 'stage'

  if (media.type === 'image') {
    return (
      <div className={`${base} ${vis}`} aria-hidden={!isActive}>
        {stage ? (
          <img
            src={media.src}
            alt={media.alt || title}
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-contain p-6"
          />
        ) : (
          <HoverZoomImage src={media.src} alt={media.alt || title} fillHeight />
        )}
      </div>
    )
  }
  if (media.type === 'component' && media.name === 'AgronomyEdgeDataViz') {
    const pad = stage ? 'p-6' : 'p-2'
    return (
      <div className={`${base} ${vis} ${pad} ${COMPONENT_MEDIA_SURFACE}`} aria-hidden={!isActive}>
        <div className="relative mx-auto flex h-full min-h-0 max-h-full w-full max-w-[560px] items-center justify-center">
          <ComponentGitHubFab href={media.git} />
          <AgronomyEdgeDataViz />
        </div>
      </div>
    )
  }
  return null
}

export const ProjectCaseStudy = forwardRef(function ProjectCaseStudy(
  {
    sections,
    tags = [],
    activeTag,
    onTagPress,
    tagHighlights,
    projectTitle,
    onOpenLightbox,
  },
  forwardedRef,
) {
  const scrollRef = useRef(null)
  const observerRef = useRef(null)
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? null)

  const setScrollRef = useCallback(
    (node) => {
      scrollRef.current = node
      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
      } else if (forwardedRef && typeof forwardedRef === 'object') {
        forwardedRef.current = node
      }
    },
    [forwardedRef],
  )

  const activeSection = sections.find((s) => s.id === activeSectionId)
  const activeMedia = activeSection?.media
  const canLightbox = activeMedia?.type === 'image' && typeof onOpenLightbox === 'function'

  const scrollSectionIntoView = useCallback((sectionId) => {
    const root = scrollRef.current
    if (!root) return
    const el = root.querySelector(`[data-section-id="${CSS.escape(sectionId)}"]`)
    if (!el) return
    try {
      const rootRect = root.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const nextTop =
        root.scrollTop + (elRect.top - rootRect.top) - root.clientHeight / 2 + elRect.height / 2
      root.scrollTo({ top: Math.max(0, nextTop), behavior: 'smooth' })
    } catch {
      // ignore scroll errors
    }
  }, [])

  useEffect(() => {
    const root = scrollRef.current
    if (!root || !sections.length) return undefined

    const setup = () => {
      observerRef.current?.disconnect()
      const obs = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting && e.intersectionRatio > 0)
          if (!visible.length) return
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          const id = visible[0].target.getAttribute('data-section-id')
          if (id) setActiveSectionId(id)
        },
        { root, rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
      )
      sections.forEach((s) => {
        const el = root.querySelector(`[data-section-id="${CSS.escape(s.id)}"]`)
        if (el) obs.observe(el)
      })
      observerRef.current = obs
    }

    const id = requestAnimationFrame(setup)
    return () => {
      cancelAnimationFrame(id)
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [sections])

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col lg:flex-row lg:gap-8 lg:overflow-hidden">
      {/* lg+: left media column stretches to full height */}
      <div className="hidden lg:flex lg:w-1/2 flex-col min-h-0 shrink-0 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 overflow-hidden">
        <div className="relative min-h-0 w-full flex-1 overflow-hidden p-6">
          {canLightbox ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onOpenLightbox(activeMedia.src)
              }}
              className="absolute right-6 top-6 z-20 inline-flex cursor-pointer items-center justify-center rounded-full border border-white/50 bg-slate-950/45 p-2 text-white shadow-sm backdrop-blur transition hover:bg-slate-950/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="View image fullscreen"
            >
              <Maximize2 className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
          {sections.map((s) => (
            <StickyMediaLayer
              key={s.id}
              layout="stage"
              media={s.media}
              isActive={s.id === activeSectionId}
              title={projectTitle}
            />
          ))}
        </div>
        <div
          className="flex w-full shrink-0 items-center gap-3 overflow-x-auto border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          role="navigation"
          aria-label="Jump to case study section"
        >
          {sections.map((s, index) => {
            const isActive = s.id === activeSectionId
            const media = s.media
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollSectionIntoView(s.id)}
                aria-label={`Go to section ${index + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  'relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-slate-200/90 transition-[opacity,box-shadow] dark:border-slate-600/90',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900',
                  isActive
                    ? 'opacity-100 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900'
                    : 'opacity-50 hover:opacity-90',
                  'motion-reduce:transition-none',
                ].join(' ')}
              >
                {media.type === 'image' ? (
                  <img src={media.src} alt="" draggable={false} className="h-full w-full object-cover" />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center ${COMPONENT_MEDIA_SURFACE}`}
                    aria-hidden
                  >
                    <Code className="h-6 w-6 text-slate-600 dark:text-slate-300" strokeWidth={1.75} />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Scrollable column */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
        <div
          ref={setScrollRef}
          className="h-full w-full overflow-y-auto overscroll-contain px-6 py-4 sm:px-8 sm:py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {tags.length ? (
            <ul className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <li key={tag} className="rounded-full">
                  <button
                    type="button"
                    onClick={() => onTagPress?.(tag)}
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

          <div className="space-y-10 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {sections.map((s) => {
              const { lead, rest } = splitSectionLeadForMobile(s.content)
              const proseClass = `${CASE_STUDY_HTML_CLASS} space-y-4`
              return (
                <section key={s.id} data-section-id={s.id} className="scroll-mt-6">
                  {/* Mobile: title + lead copy → media → remaining copy */}
                  <div className="space-y-4 lg:hidden">
                    {lead ? (
                      <div
                        className={proseClass}
                        dangerouslySetInnerHTML={{
                          __html: applyTagHighlightsToHtml(lead, activeTag, tagHighlights),
                        }}
                      />
                    ) : null}
                    {renderInlineMedia(s.media, projectTitle)}
                    {rest ? (
                      <div
                        className={proseClass}
                        dangerouslySetInnerHTML={{
                          __html: applyTagHighlightsToHtml(rest, activeTag, tagHighlights),
                        }}
                      />
                    ) : null}
                  </div>
                  {/* Desktop: full copy in one block (media stays in sticky column) */}
                  <div
                    className={`hidden lg:block ${proseClass}`}
                    dangerouslySetInnerHTML={{
                      __html: applyTagHighlightsToHtml(s.content, activeTag, tagHighlights),
                    }}
                  />
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
})
