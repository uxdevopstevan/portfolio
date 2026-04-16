import React, { useEffect, useState } from 'react'
import { Cpu, FileText, Mail, Phone } from 'lucide-react'
import { PortfolioGrid, ProjectModal } from './components/Portfolio'
import { projects } from './data/projects'

function LinkedInIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const App = () => {
  const [mounted, setMounted] = useState(false)
  const [avatarFailed, setAvatarFailed] = useState(false)
  const [activeProjectIndex, setActiveProjectIndex] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const socialLinks = [
    { name: 'LinkedIn', icon: <LinkedInIcon className="h-5 w-5" />, url: 'https://www.linkedin.com/in/sbrash/' },
    { name: 'Email', icon: <Mail className="w-5 h-5" />, url: 'mailto:ste.brash@gmail.com' },
    { name: 'Phone', icon: <Phone className="h-5 w-5" />, url: 'tel:+447792427428' },
  ]
  const cvUrl = 'https://docs.google.com/document/d/12L3-NacjF4ZqH6MNbf31zWMai-hGIqevvlq00YwljP4/edit?usp=sharing'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 blur opacity-25 transition duration-1000 group-hover:opacity-50"></div>
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              {avatarFailed ? (
                <Cpu className="h-10 w-10 text-blue-600" />
              ) : (
                <img
                  src="/stevan-brash.jpeg"
                  alt="Stevan Brash"
                  className="h-full w-full object-cover"
                  onError={() => setAvatarFailed(true)}
                />
              )}
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Stevan Brash</h1>
          <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-500">
            Pronounced <span className="font-semibold text-slate-700 dark:text-slate-200">Ste-van</span>
          </p>
          <p className="mt-2 font-medium text-slate-600 dark:text-slate-400">Design Engineer</p>

          <div className="mt-6 flex gap-4">
            {socialLinks.map((social) => {
              const openInNewTab = social.url.startsWith('http')
              return (
              <a
                key={social.name}
                href={social.url}
                {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="rounded-full border border-slate-200 bg-white p-2 transition-all hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
                aria-label={social.name === 'Phone' ? 'Phone 07792 427 428' : social.name}
              >
                {social.icon}
              </a>
              )
            })}
          </div>
        </header>

        <section className="mb-16" aria-labelledby="professional-summary-heading">
          <h2
            id="professional-summary-heading"
            className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600"
          >
            Professional summary
          </h2>
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Detail-driven Design Engineer and Frontend Developer with over two decades of experience bridging high-fidelity UX
            design with complex technical implementation. Proven expertise evolving from traditional web architecture into modern,
            AI-accelerated front-end stacks (React, Next.js, TypeScript). Deft at analyzing user needs, designing composable
            component systems, and engineering micro-animations to deliver delightful, production-ready web experiences at
            exceptional velocity.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              <FileText className="h-5 w-5" aria-hidden />
              Download CV
            </a>
          </div>
        </section>

        <main>
          <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
            Selected work
          </h2>
          <PortfolioGrid projects={projects} onOpenProject={setActiveProjectIndex} />
        </main>

        <ProjectModal
          projects={projects}
          activeIndex={activeProjectIndex}
          onClose={() => setActiveProjectIndex(null)}
          onNavigate={setActiveProjectIndex}
        />

        <section className="mt-16 text-center">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
            Expertise
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              // Frontend & UI Architecture
              'React (Next.js, Nuxt.js, Vue.js, Vite)',
              'JavaScript (ES6+)',
              'Python',
              'Google BigQuery',
              'Google Cloud Run',
              'TypeScript',
              'Tailwind CSS',
              'HTML5 Canvas',
              'Figma',
              'Adobe CC',
              'UI/UX Design',
              'SVG Animations',

              // AI & Prompt Engineering
              'LLM Output Validation',
              'System Prompt Architecture',
              'Agentic Workflows (Claude, Gemini, OpenAI)',
              'Cursor IDE',
              'Code Debugging',

              // Infrastructure & Methodologies
              'Cloud Infrastructure (AWS, Azure, Vercel)',
              'Docker',
              'Databases (MongoDB, PostgreSQL, Turso, Supabase)',
              'API Integration (Stripe, Resend)',
              'FFmpeg',
              'Remotion',
              'JSON/XML Data Parsing',
              'Headless CMS',
              'Agile Methodologies',
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <footer className="mt-20 pb-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Designed & Developed using Vite, React, Tailwind CSS, and Lucide Icons
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Stevan Brash
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
