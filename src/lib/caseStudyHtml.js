/** Shared prose + tag-highlight preprocessing for case study HTML fragments. */

export const CASE_STUDY_HTML_CLASS =
  'detail-paragraphs-html [&_a]:text-blue-600 [&_a]:underline [&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0 [&_.case-study-split]:grid [&_.case-study-split]:grid-cols-1 [&_.case-study-split]:gap-8 [&_.case-study-split]:md:grid-cols-2 [&_.case-study-split]:md:gap-10 [&_.case-study-split-col>h3:first-child]:mt-0 [&_.media-placeholder]:mt-6 [&_.media-placeholder]:rounded-2xl [&_.media-placeholder]:border-2 [&_.media-placeholder]:border-dashed [&_.media-placeholder]:border-slate-300 [&_.media-placeholder]:bg-slate-100 [&_.media-placeholder]:px-6 [&_.media-placeholder]:py-10 [&_.media-placeholder]:text-center dark:[&_.media-placeholder]:border-slate-600 dark:[&_.media-placeholder]:bg-slate-800/50 [&_.media-placeholder-eyebrow]:font-mono [&_.media-placeholder-eyebrow]:text-[10px] [&_.media-placeholder-eyebrow]:font-semibold [&_.media-placeholder-eyebrow]:uppercase [&_.media-placeholder-eyebrow]:tracking-[0.16em] [&_.media-placeholder-eyebrow]:text-slate-400 [&_.media-placeholder-label]:mt-2 [&_.media-placeholder-label]:text-sm [&_.media-placeholder-label]:font-medium [&_.media-placeholder-label]:text-slate-600 dark:[&_.media-placeholder-label]:text-slate-300 [&_img]:mt-6 [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-slate-200 [&_img]:shadow-sm dark:[&_img]:border-slate-700 [&_.overview-lead]:font-serif [&_.overview-lead]:text-2xl [&_.overview-lead]:font-normal [&_.overview-lead]:leading-snug [&_.overview-lead]:tracking-tight [&_.overview-lead]:text-slate-900 sm:[&_.overview-lead]:text-3xl dark:[&_.overview-lead]:text-slate-100 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:tracking-tight [&_h2]:text-slate-900 sm:[&_h2]:text-5xl [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-3xl [&_h3]:font-bold [&_h3]:leading-snug [&_h3]:tracking-tight [&_h3]:text-slate-900 sm:[&_h3]:text-4xl [&_li]:mt-1 [&_mark]:rounded [&_mark]:bg-amber-200/60 [&_mark]:px-0.5 [&_mark]:py-0.5 [&_mark]:text-slate-900 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:m-0 [&_p+p]:mt-4 [&_strong]:font-semibold [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 dark:[&_h2]:text-slate-50 dark:[&_h3]:text-slate-100 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] dark:[&_code]:bg-slate-800'

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
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
