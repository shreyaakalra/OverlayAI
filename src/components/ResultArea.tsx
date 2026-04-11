import { useEffect, useRef } from "react"
import { MessageBubble } from "./MessageBubble"
import type { ResultAreaProps } from "../types"

export function ResultArea({ status, messages, streamingContent }: ResultAreaProps) {
  const endRef = useRef<HTMLDivElement>(null)
 
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingContent])
 
  if (status === 'idle' && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 pb-10">
        <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-white/85">
          OverlayAI
        </h1>
        <p className="font-mono text-[11px] text-white/30">
          <kbd className="bg-white/[0.08] border border-white/[0.12] rounded px-1.5 py-0.5 text-white/50">
            ⌘⇧Space
          </kbd>
          {' '}to analyze screen
        </p>
      </div>
    )
  }
 
  if (status === 'scanning') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border border-white/10 border-t-white/60 rounded-full animate-spin" />
          <span className="font-mono text-[11px] text-white/30 tracking-wide">Capturing screen...</span>
        </div>
      </div>
    )
  }
 
  if (status === 'error') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="font-mono text-[12px] text-red-400/70 bg-red-400/[0.07] border border-red-400/[0.15] px-4 py-2 rounded-lg">
          Failed to connect to AI.
        </p>
      </div>
    )
  }
 
  return (
    <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2.5">
      {messages.map((msg, i) => (
        <MessageBubble key={i} content={msg.content} role={msg.role} />
      ))}
 
      {status === 'thinking' && !streamingContent && (
        <div className="flex justify-start">
          <div className="flex gap-1 items-center px-[14px] py-[10px] border border-white/[0.07] rounded-[14px] rounded-bl-[4px]">
            {[0, 150, 300].map(delay => (
              <span
                key={delay}
                className="w-[5px] h-[5px] rounded-full bg-white/25 animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      )}
 
      {streamingContent && (
        <MessageBubble content={streamingContent} role="assistant" isStreaming />
      )}
 
      <div ref={endRef} />
    </div>
  )
}