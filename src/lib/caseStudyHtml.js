/** Shared prose + tag-highlight preprocessing for case study HTML fragments. */

export const CASE_STUDY_HTML_CLASS =
  'detail-paragraphs-html [&_a]:text-blue-600 [&_a]:underline [&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0 [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:tracking-tight [&_h2]:text-slate-900 [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-slate-800 [&_li]:mt-1 [&_mark]:rounded [&_mark]:bg-amber-200/60 [&_mark]:px-0.5 [&_mark]:py-0.5 [&_mark]:text-slate-900 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:m-0 [&_p+p]:mt-4 [&_strong]:font-semibold [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 dark:[&_h2]:text-slate-50 dark:[&_h3]:text-slate-100 dark:[&_mark]:bg-amber-300/40 dark:[&_mark]:text-amber-50'

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Splits section HTML for mobile: title block (first h1–h3), optional description (first following p),
 * then everything else after the visual (image/component).
 * @param {string} html
 * @returns {{ lead: string, rest: string }}
 */
export function splitSectionLeadForMobile(html) {
  const raw = (html ?? '').trim()
  if (!raw || typeof document === 'undefined') {
    return { lead: '', rest: raw }
  }
  const tpl = document.createElement('template')
  tpl.innerHTML = raw
  const elements = [...tpl.content.children].filter((n) => n.nodeType === Node.ELEMENT_NODE)
  if (!elements.length) {
    return { lead: '', rest: raw }
  }

  let idx = 0
  let lead = ''
  const tag0 = elements[0].tagName
  const isHeading = /^H[1-6]$/i.test(tag0)

  if (isHeading) {
    lead += elements[0].outerHTML
    idx = 1
    if (elements[idx]?.tagName === 'P') {
      lead += elements[idx].outerHTML
      idx++
    }
  } else if (tag0 === 'P') {
    lead += elements[0].outerHTML
    idx = 1
  }

  const rest = elements.slice(idx).map((el) => el.outerHTML).join('')
  return { lead, rest }
}

/**
 * Wraps matching phrases in <mark> for the active tag (client-only).
 * @param {string} html
 * @param {string | null} activeTag
 * @param {Record<string, string[]> | undefined} tagHighlights
 * @returns {string}
 */
export function applyTagHighlightsToHtml(html, activeTag, tagHighlights) {
  if (typeof document === 'undefined' || !activeTag || !tagHighlights?.[activeTag]) {
    return html
  }
  const phrases = tagHighlights[activeTag]
  const container = document.createElement('div')
  container.innerHTML = html
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
  let node
  while ((node = walker.nextNode())) {
    const value = node.nodeValue
    if (!value || !value.trim()) continue
    let replaced = value
    phrases.forEach((phrase) => {
      if (!phrase) return
      const re = new RegExp(`(${escapeRegExp(phrase)})`, 'gi')
      replaced = replaced.replace(re, '<mark>$1</mark>')
    })
    if (replaced !== value) {
      const span = document.createElement('span')
      span.innerHTML = replaced
      node.parentNode.replaceChild(span, node)
    }
  }
  return container.innerHTML
}
