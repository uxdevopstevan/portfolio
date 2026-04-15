export function PortfolioGrid({ projects, onOpenProject }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <article
          key={project.id}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <button
            type="button"
            onClick={() => onOpenProject(index)}
            className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={project.imageSrc}
                alt=""
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <span className="sr-only">Open {project.title}</span>
            </div>
            <div className="p-4">
              <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-slate-100">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{project.shortDescription}</p>
            </div>
          </button>
        </article>
      ))}
    </div>
  )
}
