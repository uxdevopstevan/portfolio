import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AgronomyEdgeDataViz from '../Projects/AgronomyEdgeDataViz'
import { applyTagHighlightsToHtml, CASE_STUDY_HTML_CLASS } from '../../lib/caseStudyHtml'
import { ProjectCaseStudy } from './ProjectCaseStudy'
import { ProjectChallengeBlock } from './ProjectChallengeBlock'
import { ProjectHighlightCards } from './ProjectHighlightCards'
import { ProjectMetaBar } from './ProjectMetaBar'
import { ProjectPillars } from './ProjectPillars'
import { ProjectScreenshotTabs } from './ProjectScreenshotTabs'
import { ProjectTakeawayBlock } from './ProjectTakeawayBlock'
import { ProjectLiveGateway } from './ProjectLiveGateway'
import { ProjectNav } from './ProjectNav'

function ProjectTags({ tags, activeTag, onTagPress }) {
  if (!tags?.length) return null

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full">
          <button
            type="button"
            onClick={() => onTagPress(tag)}
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
  )
}

export function ProjectDetail({ project, prevProject, nextProject }) {
  const navigate = useNavigate()
  const [activeTag, setActiveTag] = useState(null)

  const hasSections = Boolean(project.sections?.length)
  const detailImageSrc = project.modalImageSrc ?? project.imageSrc

  const renderDetailItem = useCallback(
    (item, key) => {
      if (typeof item === 'string') {
        return (
          <div
            key={key}
            className={CASE_STUDY_HTML_CLASS}
            dangerouslySetInnerHTML={{
              __html: applyTagHighlightsToHtml(item, activeTag, project.tagHighlights),
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [project.id])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft' && prevProject) navigate(`/projects/${prevProject.id}`)
      if (e.key === 'ArrowRight' && nextProject) navigate(`/projects/${nextProject.id}`)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [prevProject, nextProject, navigate])

  const handleTagPress = (tag) => {
    setActiveTag((current) => (current === tag ? null : tag))
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-9xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-500"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Home
          </Link>
          <h1 className="min-w-0 flex-1 truncate text-lg font-bold tracking-tight">{project.title}</h1>
        </div>
      </header>

      {hasSections ? (
        <div className="pb-8 pt-2">
          <ProjectCaseStudy
            sections={project.sections}
            tags={project.tags}
            meta={project.meta}
            activeTag={activeTag}
            onTagPress={handleTagPress}
            tagHighlights={project.tagHighlights}
            projectTitle={project.title}
          />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-9xl px-4 pb-8 sm:px-6">
          <div className="py-6 sm:py-8">
            <ProjectTags tags={project.tags} activeTag={activeTag} onTagPress={handleTagPress} />
          </div>

          <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
            <img
              src={detailImageSrc}
              alt={project.title}
              className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
            />
          </div>

          {project.liveGateway ? (
            <ProjectLiveGateway gateway={project.liveGateway} />
          ) : null}

          {project.meta?.length ? (
            <div className="mt-8">
              <ProjectMetaBar items={project.meta} />
            </div>
          ) : null}

          <div className="mt-8 space-y-8 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {project.detailParagraphs?.map((item, i) => (
              <div key={i} className="space-y-8">
                {renderDetailItem(item, i)}
                {i === 0 && project.highlightCards?.length ? (
                  <ProjectHighlightCards cards={project.highlightCards} />
                ) : null}
                {i === 0 && project.challengeBlock ? (
                  <ProjectChallengeBlock challenge={project.challengeBlock} />
                ) : null}
                {i === 0 && project.pillars?.items?.length ? (
                  <ProjectPillars heading={project.pillars.heading} items={project.pillars.items} />
                ) : null}
                {i === 1 && project.screenshotTabs?.tabs?.length ? (
                  <ProjectScreenshotTabs tabs={project.screenshotTabs.tabs} />
                ) : null}
              </div>
            ))}
            {project.takeawayBlock ? <ProjectTakeawayBlock block={project.takeawayBlock} /> : null}
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-9xl px-4 sm:px-6">
        <ProjectNav prevProject={prevProject} nextProject={nextProject} />
      </div>
    </div>
  )
}
