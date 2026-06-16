import { useEffect, useState } from 'react'
import { ChevronDown, FileText } from 'lucide-react'
import { ExpertiseSection } from '../components/ExpertiseSection'
import { PortfolioGrid } from '../components/Portfolio'
import { SiteHeader } from '../components/SiteHeader'
import { getVisibleProjects } from '../lib/projectNav'
import { projects } from '../data/projects'

const visibleProjects = getVisibleProjects(projects)

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
            Bridging the gap between{' '}
            <em className="italic text-forest">complex frontends</em> and pixel-perfect design.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
            I&apos;m Stevan Brash, a detail-driven <strong className="font-semibold text-ink">UX Designer</strong> and <strong className="font-semibold text-ink">Frontend Developer</strong> with over two decades of experience bridging
            high-fidelity UX design with complex technical implementation. Proven expertise evolving from traditional web
            architecture into modern, AI-accelerated front-end stacks (React, Next.js, TypeScript). Deft at utilising
            rapid, high-fidelity prototypes to drive cross-functional consensus, architecting composable component
            systems that translate complex user needs into production-ready web experiences at exceptional velocity.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('#selected-work')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-cream transition hover:bg-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              View Recent Case Studies
              <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('#expertise')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Read Expertise
            </button>
          </div>
        </section>

        <main id="selected-work" className="scroll-mt-24 border-t border-ink/8 py-14 sm:py-16" aria-labelledby="selected-work-heading">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Selected work</p>
          <h2 id="selected-work-heading" className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
            Recent Case Studies
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/55 sm:text-base">
            Below is a curated selection of production systems, marketing platforms, and technical prototypes that
            demonstrate end-to-end ownership—from brand and UX through architecture, implementation, and measurable
            delivery.
          </p>
          <div className="mt-10">
            <PortfolioGrid projects={visibleProjects} />
          </div>
        </main>

        <ExpertiseSection />

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
