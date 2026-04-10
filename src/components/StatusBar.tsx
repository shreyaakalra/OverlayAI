interface StatusBarProps {
  mode: string | null
}

const modeConfig: Record<string, { label: string; color: string }> = {
  code:     { label: '⌨️ Code Mode',     color: 'bg-blue-500/30 border-blue-400/30' },
  email:    { label: '✉️ Email Mode',    color: 'bg-green-500/30 border-green-400/30' },
  terminal: { label: '💻 Terminal Mode', color: 'bg-orange-500/30 border-orange-400/30' },
  document: { label: '📄 Doc Mode',      color: 'bg-yellow-500/30 border-yellow-400/30' },
  browser:  { label: '🌐 Browser Mode',  color: 'bg-purple-500/30 border-purple-400/30' },
  other:    { label: '🔍 Reading Mode',  color: 'bg-white/10 border-white/10' },
}

export function StatusBar({ mode }: StatusBarProps) {
  const config = mode ? modeConfig[mode] ?? modeConfig.other : null

  return (
    <div className="drag-region flex items-center justify-between mb-3 pb-3 border-b border-white/10">
      {/* Left: App name */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-white/50 text-xs font-medium tracking-wider uppercase">
          OverlayAI
        </span>
      </div>

      {/* Center: Mode pill */}
      {config && (
        <div className={`no-drag px-3 py-1 rounded-full border text-xs font-medium text-white/80 ${config.color} transition-all duration-300`}>
          {config.label}
        </div>
      )}

      {/* Right: Close button */}
      <button
        className="no-drag w-5 h-5 rounded-full bg-white/10 hover:bg-red-500/40 text-white/40 hover:text-white/80 text-xs flex items-center justify-center transition-all duration-150"
        onClick={() => window.api.hide()}
      >
        ✕
      </button>
    </div>
  )
}