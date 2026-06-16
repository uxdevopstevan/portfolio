export function ProjectTakeawayBlock({ block }) {
  if (!block) return null

  const { label = 'THE TAKEAWAY', quote, intro, items = [] } = block

  return (
    <section
      aria-label="Project takeaway"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-forest dark:text-emerald-400">
          [ {label} ]
        </p>
      </div>

      <div className="space-y-6 px-6 py-8 sm:px-8 sm:py-10">
        {quote ? (
          <blockquote className="border-l-4 border-forest/30 pl-5 font-serif text-2xl font-bold italic leading-snug tracking-tight text-slate-900 dark:border-emerald-500/40 dark:text-slate-50 sm:text-3xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
        ) : null}

        {intro ? <p className="text-sm leading-relaxed text-slate-500 sm:text-base">{intro}</p> : null}

        {items.length ? (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.tag}
                className="flex flex-col gap-1 text-sm leading-relaxed text-slate-600 sm:flex-row sm:gap-3 sm:text-base dark:text-slate-400"
              >
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-forest dark:text-emerald-400 sm:text-xs">
                  [ {item.tag} ]
                </span>
                <span>{item.body}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
