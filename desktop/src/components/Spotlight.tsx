import { useState, useRef, useEffect } from 'react'
import { useCerebras } from '../hooks/useCerebras'
import MessageBubble from './MessageBubble'

interface Props {
  screenshot: string | null
}

export default function Spotlight({ screenshot }: Props) {
  const [query, setQuery] = useState('')
  const [phase, setPhase] = useState<'scanning' | 'summary' | 'chat'>('scanning')
  const { ask, response, loading, history, reset } = useCerebras()
  const inputRef = useRef<HTMLInputElement>(null)
  const hasScanned = useRef(false)

  useEffect(() => {
    if (!screenshot) {
      hasScanned.current = false
      setPhase('scanning')
      setQuery('')
      reset()
      return
    }

    if (screenshot && !hasScanned.current) {
      hasScanned.current = true
      setPhase('scanning')
      setTimeout(async () => {
        setPhase('summary')
        await ask('Summarize what you see on my screen and highlight anything important or actionable.', screenshot)
      }, 1200)
    }
  }, [screenshot])

  useEffect(() => {
    if (!loading && (phase === 'summary' || phase === 'chat')) {
      inputRef.current?.focus()
    }
  }, [loading, phase])

  async function handleSubmit() {
    if (!query.trim() || loading) return
    const q = query
    setQuery('')
    setPhase('chat')
    await ask(q)
  }

  return (
    <div className="w-[660px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-800/90 shadow-2xl">

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <div className={`w-2 h-2 rounded-full ${loading ? 'bg-purple-400 animate-pulse' : phase === 'scanning' ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
        <span className="text-white/50 text-sm">
          {phase === 'scanning' && 'Scanning your screen...'}
          {phase === 'summary' && loading && 'Summarizing...'}
          {phase === 'summary' && !loading && 'Ask a follow-up question'}
          {phase === 'chat' && loading && 'Thinking...'}
          {phase === 'chat' && !loading && 'Ask anything'}
        </span>
      </div>

      {/* Scanning animation */}
      {phase === 'scanning' && (
        <div className="px-4 py-10 flex flex-col items-center gap-4">
          <div className="flex gap-1.5 items-end">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-purple-400 rounded-full animate-pulse"
                style={{ height: `${16 + i * 6}px`, animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
          <p className="text-white/40 text-sm">Reading your screen</p>
        </div>
      )}

      {/* Response area */}
      {(phase === 'summary' || phase === 'chat') && (
        <MessageBubble response={response} loading={loading} history={history} />
      )}

      {/* Input */}
      {(phase === 'summary' || phase === 'chat') && (
        <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Ask a follow-up..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30"
          />
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-1.5 flex justify-between">
        <span className="text-white/20 text-xs">Esc to close</span>
        <span className="text-white/20 text-xs">OverlayAI</span>
      </div>

    </div>
  )
}