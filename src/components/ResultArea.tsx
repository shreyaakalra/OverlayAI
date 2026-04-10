interface ResultAreaProps {
  status: 'idle' | 'scanning' | 'thinking' | 'streaming' | 'done' | 'error'
}

export function ResultArea({ status }: ResultAreaProps) {

  if (status === 'idle') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
        <div className="text-4xl">⌨️</div>
        <p className="text-white/40 text-sm">
          Press <kbd className="bg-white/10 px-2 py-0.5 rounded text-white/60 font-mono text-xs">⌘ Shift Space</kbd> to scan your screen
        </p>
        <p className="text-white/20 text-xs">Works in VS Code, Gmail, Slack, Terminal</p>
      </div>
    )
  }

  if (status === 'scanning') {
    return (
      <div className="flex-1 flex flex-col justify-center gap-3 px-2">
        <p className="text-white/40 text-xs mb-1 animate-pulse">Scanning screen...</p>
        <div className="space-y-2.5 animate-pulse">
          <div className="h-2.5 bg-white/15 rounded-full w-3/4" />
          <div className="h-2.5 bg-white/10 rounded-full w-1/2" />
          <div className="h-2.5 bg-white/15 rounded-full w-2/3" />
          <div className="h-2.5 bg-white/10 rounded-full w-5/6" />
          <div className="h-2.5 bg-white/15 rounded-full w-1/3" />
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-sm text-center">
          <p className="text-red-300 mb-3">⚠️ Something went wrong</p>
          <button
            onClick={() => window.api.retry()}
            className="text-xs bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // streaming / thinking / done — Phase 3 fills this in
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-white/20 text-sm animate-pulse">Connecting to AI...</div>
    </div>
  )
}