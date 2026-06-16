import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ProjectNav({ prevProject, nextProject }) {
  return (
    <nav
      className="border-t border-slate-200 py-4 dark:border-slate-800"
      aria-label="Project navigation"
    >
      <div className="flex flex-row gap-3">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.id}`}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500"
          >
            <ChevronLeft className="h-5 w-5 shrink-0" aria-hidden />
            <span className="min-w-0">
              <span className="block text-xs font-normal text-slate-500 dark:text-slate-500">Previous</span>
              <span className="block truncate">{prevProject.title}</span>
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextProject ? (
          <Link
            to={`/projects/${nextProject.id}`}
            className="flex min-w-0 flex-1 items-center justify-end gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-sm font-medium text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500"
          >
            <span className="min-w-0">
              <span className="block text-xs font-normal text-slate-500 dark:text-slate-500">Next</span>
              <span className="block truncate">{nextProject.title}</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0" aria-hidden />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  )
}
