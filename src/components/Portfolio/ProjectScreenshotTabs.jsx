import { useState } from 'react'

export function ProjectScreenshotTabs({ tabs }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id)
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0]

  if (!tabs?.length || !activeTab) return null

  return (
    <section aria-label="Product screenshots">
      <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-end sm:justify-center sm:gap-8">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id)}
              aria-selected={isActive}
              className={[
                'cursor-pointer border-b-2 px-1 py-3 font-mono text-[11px] uppercase tracking-wide transition sm:text-xs',
                isActive
                  ? 'border-emerald-500 text-slate-900 dark:text-slate-100'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300',
              ].join(' ')}
            >
              [ {tab.label} ]
            </button>
          )
        })}
      </div>

      <div className="mt-2 overflow-hidden rounded-2xl border border-slate-800 bg-[#1a1c1e] shadow-lg">
        <img
          key={activeTab.image}
          src={activeTab.image}
          alt={activeTab.alt ?? activeTab.label}
          className="block w-full"
        />
      </div>
    </section>
  )
}
