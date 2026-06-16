export function MobileZoomPanImage({ src, alt }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 lg:aspect-auto lg:h-full">
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full object-cover object-center"
      />
    </div>
  )
}

export function HoverZoomImage({ src, alt, fillHeight = false }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={
        fillHeight
          ? 'h-full w-full select-none object-cover object-center'
          : 'block max-h-full max-w-full select-none object-contain object-center'
      }
    />
  )
}
