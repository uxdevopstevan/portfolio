import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { WorkSection } from '../components/Portfolio'
import { SiteHeader } from '../components/SiteHeader'
import { getProjectsByCollection } from '../lib/projectNav'
import { projects } from '../data/projects'

const caseStudies = getProjectsByCollection(projects, 'case-study')

function scrollToSection(href) {
  const target = document.querySelector(href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', href)
  }
}

export function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [avatarFailed, setAvatarFailed] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-cream text-ink">
      <SiteHeader avatarFailed={avatarFailed} onAvatarError={() => setAvatarFailed(true)} />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <section className="py-14 sm:py-20 lg:py-24">
          <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
          Designing products that change behaviour, engineered to scale.
          </h1>

          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-ink/75 sm:text-lg">
            <p>
            I'm Stevan Brash, a Senior Design Engineer with a background in UX, product design and frontend engineering. I help organisations design products that align business goals, user behaviour and frontend architecture. My work spans UX strategy, scalable design systems and production-ready React applications.</p>
            
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('#selected-work')}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-cream transition hover:bg-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Case Studies
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                aria-hidden
              />
            </button>
          </div>
        </section>

        <WorkSection
          id="selected-work"
          title="Recent Case Studies"
          projects={caseStudies}
        />

        <footer className="border-t border-ink/8 py-10 text-center">
          <p className="text-sm text-ink/50">
            Designed & Developed in Cursor using Vite, React, Tailwind CSS, and Lucide Icons
          </p>
          <p className="mt-1 text-sm text-ink/50">&copy; {new Date().getFullYear()} Stevan Brash</p>
        </footer>
      </div>
    </div>
  )
}
