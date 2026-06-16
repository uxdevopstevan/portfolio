import { useState } from 'react'
import { ProjectCodeBlock } from './ProjectCodeBlock'
import { DbrHeroAnimation } from '../Projects/DbrHeroAnimation'

const LIVE_PREVIEW_COMPONENTS = {
  DbrHeroAnimation,
}

function PillarImagePreview({ previewImage }) {
  const { src, alt, background = '#f5f5f5' } = previewImage

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl"
      style={{ backgroundColor: background }}
    >
      <div className="flex min-h-[280px] items-center justify-center p-4 sm:min-h-[360px] sm:p-6">
        <img src={src} alt={alt ?? ''} className="max-h-[640px] w-full object-contain" />
      </div>
    </div>
  )
}

export function PillarCodePanel({ codePreview }) {
  const hasComponentPreview = Boolean(
    codePreview?.livePreview && LIVE_PREVIEW_COMPONENTS[codePreview.livePreview],
  )
  const hasImagePreview = Boolean(codePreview?.previewImage?.src)
  const hasPreview = hasComponentPreview || hasImagePreview

  const [activeTab, setActiveTab] = useState(() => {
    if (!hasPreview) return 'source'
    return codePreview.defaultTab === 'source' ? 'source' : 'preview'
  })

  if (!codePreview) return null

  const LiveComponent = hasComponentPreview ? LIVE_PREVIEW_COMPONENTS[codePreview.livePreview] : null
  const previewLabel =
    codePreview.previewLabel ?? (hasComponentPreview ? 'Live Preview' : 'Design Preview')

  return (
    <div className="min-w-0 lg:pt-2">
      {hasPreview ? (
        <div className="mb-3 flex flex-wrap gap-4 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            aria-selected={activeTab === 'preview'}
            className={[
              'cursor-pointer border-b-2 px-1 py-2 font-mono text-xs uppercase tracking-wide transition sm:text-sm',
              activeTab === 'preview'
                ? 'border-emerald-500 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600',
            ].join(' ')}
          >
            [ {previewLabel} ]
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('source')}
            aria-selected={activeTab === 'source'}
            className={[
              'cursor-pointer border-b-2 px-1 py-2 font-mono text-xs uppercase tracking-wide transition sm:text-sm',
              activeTab === 'source'
                ? 'border-emerald-500 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600',
            ].join(' ')}
          >
            [ Source Code ]
          </button>
        </div>
      ) : null}

      {activeTab === 'preview' && hasComponentPreview && LiveComponent ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl sm:p-6">
          <LiveComponent />
        </div>
      ) : null}

      {activeTab === 'preview' && hasImagePreview ? (
        <PillarImagePreview previewImage={codePreview.previewImage} />
      ) : null}

      {activeTab === 'source' ? <ProjectCodeBlock preview={codePreview} /> : null}
    </div>
  )
}
