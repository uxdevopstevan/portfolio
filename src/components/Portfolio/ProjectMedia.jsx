import { useCallback, useEffect, useRef, useState } from 'react'

export function MobileZoomPanImage({ src, alt }) {
  const containerRef = useRef(null)
  const dragRef = useRef({ startX: 0, startY: 0, startTx: 0, startTy: 0 })
  const draggingRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  const clampTranslate = useCallback(
    (next, scaleOverride = scale) => {
      const el = containerRef.current
      if (!el) return next
      const w = el.clientWidth
      const h = el.clientHeight
      const maxX = Math.max(0, (w * (scaleOverride - 1)) / 2)
      const maxY = Math.max(0, (h * (scaleOverride - 1)) / 2)
      return {
        x: Math.min(maxX, Math.max(-maxX, next.x)),
        y: Math.min(maxY, Math.max(-maxY, next.y)),
      }
    },
    [scale],
  )

  const setScaleFromControl = useCallback(
    (nextScale) => {
      setScale(nextScale)
      if (nextScale <= 1) setTranslate({ x: 0, y: 0 })
      else setTranslate((t) => clampTranslate(t, nextScale))
    },
    [clampTranslate],
  )

  const onPointerDown = (e) => {
    if (scale <= 1) return
    draggingRef.current = true
    setIsDragging(true)
    dragRef.current.startX = e.clientX
    dragRef.current.startY = e.clientY
    dragRef.current.startTx = translate.x
    dragRef.current.startTy = translate.y
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!draggingRef.current) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setTranslate(clampTranslate({ x: dragRef.current.startTx + dx, y: dragRef.current.startTy + dy }))
  }

  const onPointerUp = (e) => {
    draggingRef.current = false
    setIsDragging(false)
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 lg:aspect-auto lg:h-full"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ touchAction: scale > 1 ? 'none' : 'pan-y' }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="max-h-full max-w-full select-none object-contain object-center"
            style={{
              transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
              transformOrigin: 'center',
              transition: isDragging ? 'none' : 'transform 120ms ease-out',
              cursor: scale > 1 ? 'grab' : 'default',
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 lg:hidden">
        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Zoom</label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={scale}
          onChange={(e) => setScaleFromControl(Number(e.target.value))}
          className="w-full"
          aria-label="Zoom image"
        />
        <button
          type="button"
          onClick={() => setScaleFromControl(1)}
          className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export function HoverZoomImage({ src, alt, fillHeight = false }) {
  const imgRef = useRef(null)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const onMove = useCallback(
    (e) => {
      if (reduceMotion) return
      const r = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      if (Number.isFinite(x) && Number.isFinite(y)) {
        setOrigin({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) })
      }
    },
    [reduceMotion],
  )

  return (
    <div
      className={[
        fillHeight ? 'group relative h-full w-full min-h-0 max-w-none' : 'group relative inline-block max-h-full max-w-full',
        reduceMotion ? '' : 'cursor-zoom-in',
      ].join(' ')}
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setIsHovering(false)
        setOrigin({ x: 50, y: 50 })
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        className={[
          fillHeight
            ? 'h-full w-full select-none object-cover object-center'
            : 'block max-h-full max-w-full select-none object-contain object-center',
          reduceMotion ? '' : 'transition-transform duration-200 ease-out',
          reduceMotion ? '' : 'group-hover:scale-[1.9]',
          'pointer-events-none',
        ].join(' ')}
        style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}
      />
      {!reduceMotion ? (
        <div
          className={[
            'pointer-events-none absolute bottom-3 left-3 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-medium text-white shadow-sm',
            isHovering ? 'opacity-0' : 'opacity-100',
            'transition-opacity duration-200',
          ].join(' ')}
          aria-hidden
        >
          Hover to zoom
        </div>
      ) : null}
    </div>
  )
}
