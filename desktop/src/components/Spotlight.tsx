import { useEffect, useRef, useState } from 'react'
import AnnotationCanvas, { AnnotationHandle } from './AnnotationCanvas'
import MessageBubble from './MessageBubble'
import { useGroq } from '../hooks/useGroq'

interface Props {
  screenshot: string | null
}

type Phase = 'annotate' | 'chat' | 'live'

const DEFAULT_PROMPT = 'Scan my screen and tell me what is worth knowing or doing here.'

export default function Spotlight({ screenshot }: Props) {
  const [query, setQuery] = useState('')
  const [phase, setPhase] = useState<Phase>('annotate')
  const { ask, response, loading, history, reset } = useGroq()
  const canvasRef = useRef<AnnotationHandle>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const liveRef = useRef<HTMLDivElement>(null)

  // New capture: go back to marking mode but KEEP the conversation
  useEffect(() => {
    if (!screenshot) return
    setPhase('annotate')
    setQuery('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [screenshot])

  useEffect(() => {
    if (!loading && phase === 'chat') inputRef.current?.focus()
  }, [loading, phase])

  // Live mode: tell the main process how tall the chat box is so the window fits it exactly
  useEffect(() => {
    if (phase !== 'live' || !liveRef.current) return
    const el = liveRef.current
    const send = () => window.overlayAPI.liveSize(el.offsetHeight)
    const ro = new ResizeObserver(send)
    ro.observe(el)
    send()
    return () => ro.disconnect()
  }, [phase])

  async function handleSubmit() {
    if (loading) return
    const q = query.trim()

    if (phase === 'annotate') {
      if (!canvasRef.current) return
      const { dataUrl, annotated, cropped } = canvasRef.current.exportImage()
      setPhase('chat')
      setQuery('')
      await ask(q || DEFAULT_PROMPT, dataUrl, { annotated, cropped })
    } else {
      if (!q) return
      setQuery('')
      await ask(q)
    }
  }

  function markAgain() {
    canvasRef.current?.clear()
    setPhase('annotate')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function goLive() {
    window.overlayAPI.enterLive()
    setPhase('live')
    setTimeout(() => inputRef.current?.focus(), 150)
  }

  function newChat() {
    reset()
    canvasRef.current?.clear()
    setQuery('')
    if (phase !== 'live') setPhase('annotate')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  if (!screenshot) return <div className="w-screen h-screen" />

  const hasChat = history.length > 0
  const linkBtn = 'text-xs text-white/50 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 shrink-0'
  const primaryBtn =
    'text-xs bg-white text-zinc-900 font-medium px-3 py-1.5 rounded-lg hover:bg-white/90 shrink-0'

  const placeholder =
    phase === 'annotate'
      ? hasChat
        ? 'Mark something new, then ask'
        : 'Mark what you mean, then ask. Press Enter alone to scan the screen.'
      : phase === 'live'
        ? loading
          ? 'Thinking...'
          : 'Ask a follow-up, or capture the new screen'
        : loading
          ? 'Thinking...'
          : 'Ask a follow-up'

  const panel = (
    <div
      className={`pointer-events-auto rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/95 backdrop-blur-xl shadow-2xl ${
        phase === 'live' ? 'w-full' : 'w-[680px] max-w-[92vw]'
      }`}
    >
      {phase !== 'annotate' && (
        <div className="border-b border-white/10">
          <MessageBubble
            response={response}
            loading={loading}
            history={history}
            maxHeight={phase === 'live' ? 'max-h-[420px]' : 'max-h-[50vh]'}
          />
        </div>
      )}

      <div className="flex items-center gap-2 px-4 py-3">
        <div
          className={`w-2 h-2 rounded-full shrink-0 ${loading ? 'bg-purple-400 animate-pulse' : 'bg-green-400'}`}
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent text-white text-sm outline-none placeholder-white/35"
        />

        {phase === 'chat' && (
          <>
            <button className={linkBtn} onClick={markAgain}>
              Mark screen
            </button>
            <button
              className={linkBtn}
              title="Shrinks this box so you can use your real screen, then capture again"
              onClick={goLive}
            >
              Change screen
            </button>
          </>
        )}
        {phase === 'annotate' && hasChat && (
          <button className={linkBtn} onClick={() => setPhase('chat')}>
            Show chat
          </button>
        )}
        {phase === 'live' && (
          <button
            className={primaryBtn}
            title="Take a new screenshot (or press Cmd/Ctrl+Shift+Space)"
            onClick={() => window.overlayAPI.captureNow()}
          >
            Capture screen
          </button>
        )}
        {hasChat && (
          <button className={linkBtn} onClick={newChat}>
            New chat
          </button>
        )}
      </div>
    </div>
  )

  // Live mode: the window is just this box, floating over your real screen
  if (phase === 'live') {
    return (
      <div ref={liveRef} className="w-screen p-5">
        {panel}
      </div>
    )
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <AnnotationCanvas ref={canvasRef} src={screenshot} interactive={phase === 'annotate'} />

      {phase === 'chat' && <div className="absolute inset-0 bg-black/45 pointer-events-none" />}

      <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none">{panel}</div>
    </div>
  )
}