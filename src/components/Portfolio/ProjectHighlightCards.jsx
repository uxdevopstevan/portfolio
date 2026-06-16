export function ProjectHighlightCards({ cards }) {
  if (!cards?.length) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
        >
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-slate-100">
            {card.title}
          </h4>
          <p className="mt-3 font-serif text-xl font-normal leading-snug tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
            {card.body}
          </p>
        </article>
      ))}
    </div>
  )
}
