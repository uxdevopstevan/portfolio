import { Link } from 'react-router-dom'

export function PortfolioGrid({ projects }) {
  return (
    <div className="flex flex-col gap-6">
      {projects.map((project) => (
        <article
          key={project.id}
          className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition hover:border-forest/40 hover:shadow-md"
        >
          <Link
            to={`/projects/${project.id}`}
            className="group flex cursor-pointer flex-row items-stretch text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <div className="w-[38%] shrink-0 overflow-hidden bg-forest-light sm:w-64 lg:w-80">
              <img
                src={project.imageSrc}
                alt=""
                className="h-full min-h-[8rem] w-full object-cover transition duration-300 group-hover:scale-[1.03] sm:min-h-[10rem]"
              />
              <span className="sr-only">View {project.title}</span>
            </div>
            <div className="flex flex-1 flex-col justify-center px-5 py-5 sm:px-8 sm:py-6">
              <h3 className="font-serif text-xl font-bold leading-tight text-ink sm:text-2xl">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60 sm:text-base">{project.shortDescription}</p>
              {project.tags?.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <span className="inline-flex items-center rounded-md border border-ink/10 bg-cream px-2.5 py-1 text-xs font-medium text-ink/70">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
