import { PortfolioGrid } from './PortfolioGrid'

export function WorkSection({ id, eyebrow, title, description, projects }) {
  if (!projects?.length) return null

  return (
    <section id={id} className="scroll-mt-24 border-t border-ink/8 py-14 sm:py-16" aria-labelledby={`${id}-heading`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">{eyebrow}</p>
      <h2 id={`${id}-heading`} className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/55 sm:text-base">{description}</p>
      ) : null}
      <div className="mt-10">
        <PortfolioGrid projects={projects} />
      </div>
    </section>
  )
}
