import AgronomyEdgeDataViz from '../Projects/AgronomyEdgeDataViz'
import { applyTagHighlightsToHtml, CASE_STUDY_HTML_CLASS } from '../../lib/caseStudyHtml'
import { ProjectMetaBar } from './ProjectMetaBar'

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
        'group absolute right-4 top-4 z-30 flex h-9 max-w-[2.25rem] items-center overflow-hidden rounded-full border border-white/30 bg-slate-950/85 py-0 pl-2 pr-2 shadow-lg backdrop-blur-md transition-[max-width,box-shadow] duration-300 ease-out',
        'hover:max-w-[min(16rem,calc(100%-1rem))] hover:border-white/45 hover:pr-2.5 hover:shadow-xl',
        'focus-visible:max-w-[min(16rem,calc(100%-1rem))] focus-visible:border-white/45 focus-visible:pr-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
        'motion-reduce:transition-none sm:h-10 sm:max-w-10 sm:pl-2.5 sm:hover:pr-3 sm:focus-visible:pr-3',
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

function SectionMedia({ media, title }) {
  if (media.type === 'image') {
    return (
      <div className={`relative w-full ${COMPONENT_MEDIA_SURFACE}`}>
        <img
          src={media.src}
          alt={media.alt || title}
          draggable={false}
          className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
        />
      </div>
    )
  }

  if (media.type === 'component' && media.name === 'AgronomyEdgeDataViz') {
    return (
      <div className={`relative w-full ${COMPONENT_MEDIA_SURFACE}`}>
        <ComponentGitHubFab href={media.git} />
        <div className="flex aspect-[16/9] items-center justify-center p-4 sm:aspect-[21/9]">
          <AgronomyEdgeDataViz />
        </div>
      </div>
    )
  }

  return null
}

export function ProjectCaseStudy({
  sections,
  tags = [],
  meta = [],
  activeTag,
  onTagPress,
  tagHighlights,
  projectTitle,
}) {
  const proseClass = `${CASE_STUDY_HTML_CLASS} space-y-4`

  return (
    <div className="mx-auto w-full max-w-9xl px-4 sm:px-6">
      {tags.length ? (
        <div className="py-6 sm:py-8">
          <ul className="flex flex-wrap gap-2">
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
        </div>
      ) : null}

      {meta.length ? (
        <div className="pb-6 sm:pb-8">
          <ProjectMetaBar items={meta} />
        </div>
      ) : null}

      <div className="flex flex-col gap-8 pb-4">
        {sections.map((section) => (
          <section
            key={section.id}
            data-section-id={section.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <SectionMedia media={section.media} title={projectTitle} />

            <div className="px-5 py-6 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:px-8 sm:py-8">
              <div
                className={proseClass}
                dangerouslySetInnerHTML={{
                  __html: applyTagHighlightsToHtml(section.content, activeTag, tagHighlights),
                }}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
