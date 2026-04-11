import { modeConfig } from '../constants'

interface Props {
  mode: string | null
  scanCount: number
}

export function StatusBar({ mode, scanCount }: Props) {
  const config = mode ? modeConfig[mode] ?? modeConfig.other : null

  return (
    <div className="drag-region flex items-center justify-between px-[18px] py-[14px] border-b border-white/[0.05]">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
        <span className="font-mono text-[11px] font-medium tracking-[0.15em] uppercase text-white/55">
          OverlayAI
        </span>
      </div>

      <div className="no-drag flex items-center gap-2.5">
        {scanCount > 0 && (
          <span className="font-mono text-[10px] text-white/20">#{scanCount}</span>
        )}
        {config && (
          <div className={`flex items-center gap-[5px] px-2.5 py-[3px] rounded-full border ${config.colorClass}`}>
            <span className="font-mono text-[10px] opacity-80">{config.icon}</span>
            <span className="text-[11px] font-medium tracking-[0.03em]">{config.label}</span>
          </div>
        )}
      </div>

      <button
        className="no-drag w-[26px] h-[26px] flex items-center justify-center rounded-lg text-white/25 hover:text-white/70 hover:bg-white/[0.07] transition-colors"
        onClick={() => window.api.hide()}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}