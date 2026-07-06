export function ProjectHighlightCards({ cards }) {
  if (!cards?.length) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-2xl bg-forest p-6 shadow-md sm:p-7"
        >
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-cream/80">
            {card.title}
          </h4>
          {card.headline ? (
            <>
              <p className="mt-4 font-serif text-2xl font-normal leading-snug tracking-tight text-white sm:text-3xl">
                {card.headline}
              </p>
              {card.body ? (
                <p className="mt-3 text-sm leading-relaxed text-cream/85 sm:text-base">
                  {card.body}
                </p>
              ) : null}
            </>
          ) : (
            <p className="mt-4 font-serif text-2xl font-normal leading-snug tracking-tight text-white sm:text-3xl">
              {card.body}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}
