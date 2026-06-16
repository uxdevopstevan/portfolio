export function ProjectMetaBar({ items }) {
  if (!items?.length) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-100/80 px-5 py-6 dark:border-slate-800 dark:bg-slate-900/50 sm:px-8 sm:py-7">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
              {item.label}
            </dt>
            <dd
              className={[
                'mt-2 text-sm font-semibold leading-snug sm:text-base',
                item.accent
                  ? 'text-forest dark:text-emerald-400'
                  : 'text-slate-900 dark:text-slate-100',
              ].join(' ')}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
