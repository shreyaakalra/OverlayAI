interface StatusBarProps {
  mode: string | null
  scanCount: number
}

const modeConfig: Record<string, { label: string; color: string }> = {
  code:     { label: 'Code',     color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  email:    { label: 'Email',    color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  terminal: { label: 'Terminal', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  document: { label: 'Document', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  browser:  { label: 'Browser',  color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  other:    { label: 'Reading',  color: 'text-slate-400 bg-slate-400/10 border-slate-400/20' },
}

export function StatusBar({ mode, scanCount }: StatusBarProps) {
  const config = mode ? modeConfig[mode] ?? modeConfig.other : null

  return (
    <div className="drag-region flex items-center justify-between mb-3 pb-3 border-b border-white/8">

      {/* Left: App name */}
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full bg-[#00ff41]"
          style={{ boxShadow: '0 0 6px #00ff41, 0 0 12px #00ff4166' }}
        />
        <span style={{ fontFamily: 'JetBrains Mono, monospace' }}
          className="text-[#00ff41] text-xs font-semibold tracking-widest">
          OVERLAY_AI
        </span>
      </div>

      {/* Center: mode + scan count */}
      <div className="no-drag flex items-center gap-2">
        {scanCount > 0 && (
          <span className="text-white/20 text-xs font-mono">
            #{scanCount}
          </span>
        )}
        {config && (
          <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${config.color}`}>
            {config.label}
          </span>
        )}
      </div>

      {/* Right: close */}
      <button
        className="no-drag w-6 h-6 rounded-md flex items-center justify-center text-white/30 hover:text-white/80 hover:bg-white/8 transition-all text-xs"
        onClick={() => window.api.hide()}
      >
        ✕
      </button>
    </div>
  )
}