export function ProjectLiveGateway({ gateway }) {
  if (!gateway) return null

  const href = gateway.url ?? (gateway.host ? `https://${gateway.host}` : null)
  const host = gateway.host ?? gateway.url?.replace(/^https?:\/\//, '')

  if (!href || !host) return null

  return (
    <div className="mt-6 rounded-2xl border border-slate-800 bg-[#1a1c1e] px-5 py-5 shadow-md sm:px-6 sm:py-6">
      <p className="font-mono text-sm sm:text-base">
        <span aria-hidden="true">🔗 </span>
        <span className="text-slate-400">Live Gateway: </span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-400 transition hover:text-emerald-300 hover:underline"
        >
          {host}
        </a>
      </p>
      {gateway.status ? (
        <p className="mt-3 font-mono text-xs leading-relaxed text-slate-500 sm:text-sm">
          [ Status: {gateway.status} ]
        </p>
      ) : null}
    </div>
  )
}
