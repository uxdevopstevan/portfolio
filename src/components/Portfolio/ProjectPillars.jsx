import { PillarCodePanel } from './PillarCodePanel'

const pillarThemes = {
  green: {
    accent: 'border-l-emerald-400',
    badge: 'bg-emerald-50 text-emerald-600',
    tag: 'bg-emerald-50 text-emerald-700',
  },
  blue: {
    accent: 'border-l-sky-400',
    badge: 'bg-sky-50 text-sky-600',
    tag: 'bg-sky-50 text-sky-700',
  },
  purple: {
    accent: 'border-l-violet-400',
    badge: 'bg-violet-50 text-violet-600',
    tag: 'bg-violet-50 text-violet-700',
  },
}

function PillarRow({ pillar }) {
  const theme = pillarThemes[pillar.theme] ?? pillarThemes.green

  return (
    <article
      className={[
        'grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10',
        'rounded-2xl border border-slate-200 border-l-[3px] bg-white p-6 shadow-md sm:p-8',
        theme.accent,
      ].join(' ')}
    >
      <div className="flex flex-col">
        <div
          className={[
            'inline-flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-semibold',
            theme.badge,
          ].join(' ')}
        >
          {pillar.number}
        </div>

        <h4 className="mt-5 font-serif text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
          {pillar.title}
        </h4>

        <p className="mt-4 text-base leading-relaxed text-slate-500">{pillar.body}</p>

        {pillar.tag ? (
          <p
            className={[
              'mt-6 inline-flex self-start rounded-full px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wide sm:text-xs',
              theme.tag,
            ].join(' ')}
          >
            {pillar.tag}
          </p>
        ) : null}
      </div>

      {pillar.codePreview ? <PillarCodePanel codePreview={pillar.codePreview} /> : null}
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

      <div className="space-y-8">
        {items.map((pillar) => (
          <PillarRow key={pillar.number ?? pillar.title} pillar={pillar} />
        ))}
      </div>
    </section>
  )
}
