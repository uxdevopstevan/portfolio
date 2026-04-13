import React, { useEffect, useState } from 'react'
import { ChevronRight, Code2, Cpu, Figma, FileText, Github, Linkedin, Mail, Layout } from 'lucide-react'

const App = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const links = [
    {
      title: 'Featured Case Study',
      description: 'SaaS Dashboard Redesign: From UX Research to React Implementation',
      icon: <Layout className="w-5 h-5" />,
      url: '#',
      type: 'primary',
      tags: ['UX Research', 'Next.js', 'Design System'],
    },
    {
      title: 'Visual Design Portfolio',
      description: 'High-fidelity prototypes and UI collections in Figma',
      icon: <Figma className="w-5 h-5" />,
      url: '#',
      type: 'secondary',
    },
    {
      title: 'Technical Projects',
      description: 'Open source contributions and production-ready components',
      icon: <Github className="w-5 h-5" />,
      url: '#',
      type: 'secondary',
    },
    {
      title: 'Component Library',
      description: 'My custom-built design system for rapid prototyping',
      icon: <Code2 className="w-5 h-5" />,
      url: '#',
      type: 'secondary',
    },
  ]

  const socialLinks = [
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: '#' },
    { name: 'Email', icon: <Mail className="w-5 h-5" />, url: 'mailto:your@email.com' },
    { name: 'Resume', icon: <FileText className="w-5 h-5" />, url: '#' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 blur opacity-25 transition duration-1000 group-hover:opacity-50"></div>
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <Cpu className="h-10 w-10 text-blue-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Your Name</h1>
          <p className="mt-2 font-medium text-slate-600 dark:text-slate-400">UX Design & Hybrid Engineer</p>

          <div className="mt-6 flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="rounded-full border border-slate-200 bg-white p-2 transition-all hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </header>

        <main className="space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={`group flex transform items-start rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${
                link.type === 'primary'
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'
                  : 'border border-slate-200 bg-white shadow-sm hover:border-blue-500/50 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div
                className={`mr-4 rounded-xl p-3 ${
                  link.type === 'primary' ? 'bg-white/20' : 'bg-slate-100 text-blue-600 dark:bg-slate-800'
                }`}
              >
                {link.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold leading-none">{link.title}</h3>
                  <ChevronRight
                    className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                      link.type === 'primary' ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                </div>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    link.type === 'primary' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {link.description}
                </p>

                {link.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {link.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </main>

        <section className="mt-16 text-center">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
            Expertise
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {['React', 'Next.js', 'Figma', 'Tailwind', 'TypeScript', 'Storybook', 'Framer Motion'].map((skill) => (
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
          <p className="text-sm text-slate-500 dark:text-slate-500">Designed & Developed by You &copy; 2026</p>
        </footer>
      </div>
    </div>
  )
}

export default App
