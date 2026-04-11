interface StatusBarProps {
  mode: string | null
  scanCount: number
}

const modeConfig: Record<string, { label: string; icon: string; colorClass: string }> = {
  code:     { label: 'Code',     icon: '</>',  colorClass: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  email:    { label: 'Email',    icon: '@',    colorClass: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  terminal: { label: 'Terminal', icon: '$',    colorClass: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  document: { label: 'Document', icon: '§',    colorClass: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  browser:  { label: 'Browser',  icon: '⊕',    colorClass: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  other:    { label: 'Reading',  icon: '◎',    colorClass: 'text-slate-400 bg-slate-400/10 border-slate-400/20' },
}

export function StatusBar({ mode, scanCount }: StatusBarProps) {
  const config = mode ? modeConfig[mode] ?? modeConfig.other : null

  return (
    <div className="drag-region flex items-center justify-between pb-3 mb-4 border-b border-white/10">
      {/* Left: Brand */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white/80" />
        <span className="text-white/80 text-xs font-semibold tracking-wide uppercase">
          OverlayAI
        </span>
      </div>

      {/* Center: Mode Pill */}
      <div className="no-drag flex items-center gap-2">
        {scanCount > 0 && (
          <span className="text-white/30 text-xs font-mono">#{scanCount}</span>
        )}
        {config && (
          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${config.colorClass}`}>
            <span className="font-mono text-[10px] opacity-80">{config.icon}</span>
            <span className="text-xs font-medium">{config.label}</span>
          </div>
        )}
      </div>

      {/* Right: Close */}
      <button
        className="no-drag w-6 h-6 flex items-center justify-center rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => window.api.hide()}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}