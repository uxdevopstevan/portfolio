const pillarThemes = {
  green: {
    archBorder: 'border-t-emerald-400',
    badge: 'bg-emerald-50 text-emerald-600',
    tag: 'bg-emerald-50 text-emerald-700',
  },
  blue: {
    archBorder: 'border-t-sky-400',
    badge: 'bg-sky-50 text-sky-600',
    tag: 'bg-sky-50 text-sky-700',
  },
  purple: {
    archBorder: 'border-t-violet-400',
    badge: 'bg-violet-50 text-violet-600',
    tag: 'bg-violet-50 text-violet-700',
  },
}

function PillarCard({ pillar }) {
  const theme = pillarThemes[pillar.theme] ?? pillarThemes.green

  return (
    <article
      className={[
        'relative flex h-full flex-col rounded-b-2xl rounded-t-[2.75rem] border border-slate-200 bg-white px-6 pb-6 pt-12 shadow-md sm:rounded-t-[3.25rem] sm:px-7 sm:pb-7 sm:pt-14',
        'border-t-[3px]',
        theme.archBorder,
      ].join(' ')}
    >
      <div
        className={[
          'absolute left-1/2 top-5 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full font-mono text-xs font-semibold sm:top-6 sm:h-10 sm:w-10 sm:text-sm',
          theme.badge,
        ].join(' ')}
      >
        {pillar.number}
      </div>

      <h4 className="mt-4 text-center font-serif text-lg font-bold leading-snug text-slate-900 sm:mt-5 sm:text-xl">
        {pillar.title}
      </h4>

      <p className="mt-4 flex-1 text-center text-md leading-relaxed text-slate-500">{pillar.body}</p>

      {pillar.tag ? (
        <p
          className={[
            'mt-6 text-center font-mono text-[10px] font-medium uppercase tracking-wide sm:text-[12px]',
            'rounded-full px-3 py-2',
            theme.tag,
          ].join(' ')}
        >
          {pillar.tag}
        </p>
      ) : null}
    </article>
  )
}

export function ProjectPillars({ heading, items }) {
  if (!items?.length) return null

  return (
    <section aria-labelledby="project-pillars-heading">
      {heading ? (
        <h3
          id="project-pillars-heading"
          className="mb-8 font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl"
        >
          {heading}
        </h3>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
        {items.map((pillar) => (
          <PillarCard key={pillar.number ?? pillar.title} pillar={pillar} />
        ))}
      </div>
    </section>
  )
}
