export function ProjectCodeBlock({ preview }) {
  if (!preview) return null

  const {
    language = 'code',
    languageIcon,
    filename = 'snippet',
    statusLabel,
    code = '',
    footerStatus = '● SYSTEM SPEC COMPLIANT',
  } = preview

  return (
    <div className="w-full font-sans">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-3">
          <div className="flex items-center space-x-2">
            <span className="block h-3 w-3 rounded-full bg-red-500/80" />
            <span className="block h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="block h-3 w-3 rounded-full bg-green-500/80" />
          </div>

          <div className="relative z-10 -mb-[13px] flex items-center space-x-2 rounded-lg border border-zinc-800/50 bg-zinc-950 px-3.5 py-1.5">
            {languageIcon ? (
              <span className="font-mono text-[11px] text-amber-500">{languageIcon}</span>
            ) : null}
            <span className="font-mono text-[11px] text-amber-500">{language}</span>
            <span className="font-mono text-[11px] font-medium text-zinc-400">{filename}</span>
          </div>

          {statusLabel ? (
            <div className="hidden font-mono text-[10px] text-zinc-500 select-none sm:block">{statusLabel}</div>
          ) : (
            <div className="w-24" />
          )}
        </div>

        <div className="max-h-[480px] overflow-x-hidden overflow-y-auto p-6 font-mono text-xs leading-relaxed text-zinc-300">
          <pre className="whitespace-pre-wrap break-words">
            <code className="block text-left font-mono">{code}</code>
          </pre>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-900 bg-zinc-950 px-4 py-2 font-mono text-[10px] text-zinc-500 select-none">
          <span>UTF-8 // LF</span>
          {footerStatus ? <span className="font-bold text-emerald-500">{footerStatus}</span> : null}
        </div>
      </div>
    </div>
  )
}
