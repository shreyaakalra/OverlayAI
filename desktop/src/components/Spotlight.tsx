import { useState, useRef, useEffect } from 'react'
import { useCerebras } from '../hooks/useCerebras'
import { captureScreen } from '../hooks/useVision'
import MessageBubble from './MessageBubble'

export default function Spotlight() {
  const [query, setQuery] = useState('')
  const [useScreen, setUseScreen] = useState(true)
  const { ask, response, loading } = useCerebras()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function handleSubmit() {
    if (!query.trim() || loading) return
    const screenshot = useScreen ? await captureScreen() : undefined
    await ask(query, screenshot)
    setQuery('')
  }

  return (
    <div className="w-[640px] rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <div className="w-2 h-2 rounded-full bg-purple-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Ask anything about your screen..."
          className="flex-1 bg-transparent text-white text-base outline-none placeholder-white/40"
        />
        <button
          onClick={() => setUseScreen((v) => !v)}
          className={`text-xs px-2 py-1 rounded-md transition-colors ${
            useScreen
              ? 'bg-purple-500/30 text-purple-300'
              : 'bg-white/10 text-white/40'
          }`}
        >
          {useScreen ? 'Screen on' : 'Screen off'}
        </button>
      </div>

      {(loading || response) && (
        <MessageBubble response={response} loading={loading} />
      )}

      <div className="px-4 py-2 flex items-center justify-between">
        <span className="text-white/20 text-xs">↵ to send · Esc to close</span>
        <span className="text-white/20 text-xs">OverlayAI</span>
      </div>
    </div>
  )
}