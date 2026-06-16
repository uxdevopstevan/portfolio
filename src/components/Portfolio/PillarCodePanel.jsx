import { useEffect, useRef, useState } from 'react'
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

function PillarVideoPreview({ previewVideo, isActive }) {
  const videoRef = useRef(null)
  const { src, poster, background = '#0a0a0a' } = previewVideo

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      video.currentTime = 0
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isActive])

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl"
      style={{ backgroundColor: background }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="block max-h-[640px] w-full object-contain"
      />
    </div>
  )
}

function TabButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-selected={active}
      className={[
        'cursor-pointer border-b-2 px-1 py-2 font-mono text-xs uppercase tracking-wide transition sm:text-sm',
        active
          ? 'border-emerald-500 text-slate-900'
          : 'border-transparent text-slate-400 hover:text-slate-600',
      ].join(' ')}
    >
      [ {label} ]
    </button>
  )
}

export function PillarCodePanel({ codePreview }) {
  const hasComponentPreview = Boolean(
    codePreview?.livePreview && LIVE_PREVIEW_COMPONENTS[codePreview.livePreview],
  )
  const hasImagePreview = Boolean(codePreview?.previewImage?.src)
  const hasVideoPreview = Boolean(codePreview?.previewVideo?.src)
  const hasDesignPreview = hasComponentPreview || hasImagePreview

  const [activeTab, setActiveTab] = useState(() => {
    if (codePreview?.defaultTab === 'source') return 'source'
    if (codePreview?.defaultTab === 'video' && hasVideoPreview) return 'video'
    if (hasDesignPreview) return 'preview'
    if (hasVideoPreview) return 'video'
    return 'source'
  })

  if (!codePreview) return null

  const LiveComponent = hasComponentPreview ? LIVE_PREVIEW_COMPONENTS[codePreview.livePreview] : null
  const designLabel =
    codePreview.previewLabel ?? (hasComponentPreview ? 'Live Preview' : 'Design Preview')
  const videoLabel = codePreview.previewVideo?.label ?? 'Onboarding Animation'
  const showTabs = hasDesignPreview || hasVideoPreview

  return (
    <div className="min-w-0 lg:pt-2">
      {showTabs ? (
        <div className="mb-3 flex flex-wrap gap-4 border-b border-slate-200">
          {hasDesignPreview ? (
            <TabButton
              active={activeTab === 'preview'}
              onClick={() => setActiveTab('preview')}
              label={designLabel}
            />
          ) : null}
          {hasVideoPreview ? (
            <TabButton
              active={activeTab === 'video'}
              onClick={() => setActiveTab('video')}
              label={videoLabel}
            />
          ) : null}
          <TabButton
            active={activeTab === 'source'}
            onClick={() => setActiveTab('source')}
            label="Source Code"
          />
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

      {hasVideoPreview ? (
        <div className={activeTab === 'video' ? 'block' : 'hidden'} aria-hidden={activeTab !== 'video'}>
          <PillarVideoPreview previewVideo={codePreview.previewVideo} isActive={activeTab === 'video'} />
        </div>
      ) : null}

      {activeTab === 'source' ? <ProjectCodeBlock preview={codePreview} /> : null}
    </div>
  )
}
