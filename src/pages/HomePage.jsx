import { useEffect, useState } from 'react'
import { ChevronDown, FileText } from 'lucide-react'
import { ExpertiseSection } from '../components/ExpertiseSection'
import { PortfolioGrid, WorkSection } from '../components/Portfolio'
import { SiteHeader } from '../components/SiteHeader'
import { getProjectsByCollection } from '../lib/projectNav'
import { projects } from '../data/projects'

const featuredProducts = getProjectsByCollection(projects, 'featured-product')
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
            Bridging the gap between{' '}
            <em className="italic text-forest">complex frontends</em> and pixel-perfect design.
          </h1>

          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-ink/75 sm:text-lg">
            <p>
              I&apos;m Stevan Brash, a Senior Design Engineer specialising in <b>React, Next.js and TypeScript</b>. My
              background in UX and product design gives me a deep understanding of how software should work, while my
              passion is building performant, production-ready frontend applications.
            </p>
            <p>
              I enjoy taking products from idea to implementation, combining modern frontend technologies with
              AI-assisted development workflows to ship polished, accessible software quickly without compromising
              quality.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('#featured-products')}
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

        <WorkSection
          id="featured-products"
          eyebrow="Featured products"
          title="Featured Products"
          description="End-to-end products engineered from concept through production—owned design, architecture, and implementation."
          projects={featuredProducts}
        />

        <WorkSection
          id="selected-work"
          eyebrow="Selected work"
          title="Recent Case Studies"
          description="Client and enterprise engagements demonstrating UX engineering, legacy modernisation, and high-conversion frontend delivery."
          projects={caseStudies}
        />

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
