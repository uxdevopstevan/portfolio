import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './icons/SocialIcons'

const socialLinks = [
  { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/uxdevopstevan/' },
  { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/sbrash/' },
  { name: 'Email', icon: Mail, url: 'mailto:ste.brash@gmail.com' },
  { name: 'Phone', icon: Phone, url: 'tel:+447792427428' },
]

const navLinks = [
  { label: 'Featured Products', href: '#featured-products' },
  { label: 'Case Studies', href: '#selected-work' },
  { label: 'Expertise', href: '#expertise' },
]

function scrollToSection(event, href) {
  if (!href.startsWith('#')) return
  event.preventDefault()
  const target = document.querySelector(href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', href)
  }
}

export function SiteHeader({ avatarFailed, onAvatarError }) {
  const [localAvatarFailed, setLocalAvatarFailed] = useState(avatarFailed ?? false)
  const showFallback = avatarFailed ?? localAvatarFailed

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink text-cream">
            {showFallback ? (
              <span className="text-xs font-bold tracking-wide">SB</span>
            ) : (
              <img
                src="/stevan-brash.jpeg"
                alt=""
                className="h-full w-full object-cover"
                onError={() => {
                  setLocalAvatarFailed(true)
                  onAvatarError?.()
                }}
              />
            )}
          </div>
          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-bold text-ink sm:text-base">Stevan Brash</p>
            <p className="truncate text-xs text-ink/55 sm:text-sm">Design Engineer</p>
          </div>
        </Link>

        <nav className="flex shrink-0 items-center gap-3 sm:gap-5" aria-label="Site">
          <div className="hidden items-center gap-5 sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium text-ink/80 transition hover:text-forest"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            {socialLinks.map((social) => {
              const Icon = social.icon
              const openInNewTab = social.url.startsWith('http')
              return (
                <a
                  key={social.name}
                  href={social.url}
                  {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="rounded-full p-2 text-ink/70 transition hover:bg-ink/5 hover:text-forest"
                  aria-label={social.name === 'Phone' ? 'Phone 07792 427 428' : social.name}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}
