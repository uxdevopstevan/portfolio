const expertiseCategories = [
  {
    id: 'frontend',
    title: 'Frontend Design Systems',
    description:
      'High-fidelity UI architecture, custom component systems, and performance-optimized browser rendering.',
    accent: 'bg-emerald-500',
    skills: [
      'React',
      'Next.js',
      'Nuxt.js',
      'Vue.js',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'Web Components',
      'Figma',
      'Adobe CC',
      'UI/UX Design',
      'SVG Animations',
      'HTML5 Canvas',
      'Remotion',
      'Framer Motion',
    ],
  },
  {
    id: 'systems',
    title: 'Systems & Cloud Infrastructure',
    description:
      'Distributed scaling architectures, credit estimation modules, secure serverless routing, and media pipeline compute.',
    accent: 'bg-sky-500',
    skills: [
      'Python',
      'JavaScript (ES6+)',
      'Google Cloud Run',
      'AWS Lambda',
      'Azure',
      'Vercel',
      'Supabase',
      'PostgreSQL',
      'MongoDB',
      'Turso',
      'Stripe Integration',
      'Resend API',
      'FFmpeg',
      'Docker',
      'Webhooks',
      'WordPress (PHP)'
    ],
  },
  {
    id: 'telemetry',
    title: 'Telemetry & Data Pipelines',
    description:
      'Instrumenting closed-loop analytics tracking, cross-origin CDP data bridges, and high-volume pipeline warehousing.',
    accent: 'bg-violet-500',
    skills: [
      'Google BigQuery',
      'GA4 / GTM Telemetry',
      'Looker Studio',
      'BlueConic CDP',
      'Attribution Modelling',
      'DOM Parsing',
      'XML/JSON Parsing',
      'Schema Mapping',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Agentic Workflows',
    description:
      'Vectorizing custom data models, retrieval-augmented generation (RAG) loops, and prompt engineering utilities.',
    accent: 'bg-orange-400',
    skills: [
      'LLM Prompting',
      'LLM Output Validation',
      'System Prompt Architecture',
      'Agentic Workflows',
      'RAG Pipelines',
      'Telegram API',
      'Cursor IDE',
      'Headless CMS',
      'Agile Methodologies',
      'Code Debugging',
    ],
  },
]

function SkillTag({ label }) {
  return (
    <span className="inline-flex items-center rounded-md border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/70">
      {label}
    </span>
  )
}

export function ExpertiseSection() {
  return (
    <section id="expertise" className="scroll-mt-24 border-t border-ink/8 py-14 sm:py-16" aria-labelledby="expertise-heading">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Expertise &amp; credentials</p>
      <h2 id="expertise-heading" className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
        Technical Skills Mapping
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/55 sm:text-base">
        Technologies and tools I regularly use to design, build and ship modern web applications.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {expertiseCategories.map((category) => (
          <article
            key={category.id}
            className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-7"
          >
            <div className="flex items-start gap-3">
              <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${category.accent}`} aria-hidden />
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-xl font-bold text-ink">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{category.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillTag key={skill} label={skill} />
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
