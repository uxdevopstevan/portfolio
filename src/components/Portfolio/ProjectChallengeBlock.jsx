export function ProjectChallengeBlock({ challenge }) {
  if (!challenge) return null

  const {
    eyebrow,
    title,
    intro,
    listHeading,
    bullets = [],
    painPointLabel,
    quote,
    quoteAttribution,
    footerLabel,
  } = challenge

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800">
      <div className="flex flex-col lg:flex-row">
        <div className="px-6 py-8 sm:px-8 sm:py-10 lg:w-[58%] lg:px-10 lg:py-12">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">{eyebrow}</p>
          ) : null}
          <h3 className="mt-4 font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            {title}
          </h3>
          {intro ? <p className="mt-5 text-sm leading-relaxed text-slate-500 sm:text-base">{intro}</p> : null}
          {listHeading || bullets.length ? (
            <>
              <hr className="my-6 border-slate-200 dark:border-slate-700" />
              {listHeading ? (
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  {listHeading}
                </p>
              ) : null}
              {bullets.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-500 sm:text-base">
                  {bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : null}
        </div>

        <div className="flex min-h-[18rem] flex-col justify-between bg-[#1a1c1e] px-6 py-8 sm:px-8 sm:py-10 lg:w-[42%] lg:px-10 lg:py-12">
          {painPointLabel ? (
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">{painPointLabel}</p>
          ) : (
            <span />
          )}

          {quote ? (
            <div className="relative my-6 rounded-xl bg-[#fff9c4] px-6 py-6 shadow-md sm:my-8 sm:px-7 sm:py-7">
              <span
                className="absolute right-5 top-4 font-serif text-3xl leading-none text-amber-400"
                aria-hidden
              >
                &rdquo;
              </span>
              <blockquote className="pr-8 font-serif text-lg italic leading-relaxed text-slate-800 sm:text-xl">
                &ldquo;{quote}&rdquo;
              </blockquote>
              {quoteAttribution ? (
                <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
                  &mdash; {quoteAttribution}
                </p>
              ) : null}
            </div>
          ) : null}

          {footerLabel ? (
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">{footerLabel}</p>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  )
}
