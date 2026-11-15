import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  response: string
  loading: boolean
  history: Message[]
  maxHeight?: string // tailwind class, e.g. 'max-h-[420px]'
}

const mdComponents = {
  code: ({ children }: any) => (
    <code className="bg-white/10 rounded px-1 py-0.5 text-purple-300 text-xs">{children}</code>
  ),
  pre: ({ children }: any) => (
    <pre className="bg-white/10 rounded p-3 overflow-x-auto text-xs my-2">{children}</pre>
  ),
  strong: ({ children }: any) => <strong className="text-white font-semibold">{children}</strong>,
  ul: ({ children }: any) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
  li: ({ children }: any) => <li className="text-white/80">{children}</li>,
}

export default function MessageBubble({ response, loading, history, maxHeight = 'max-h-[50vh]' }: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [response, history.length])

  return (
    <div className={`px-4 py-3 ${maxHeight} overflow-y-auto flex flex-col gap-3`}>
      {history.map((msg, i) => (
        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
              msg.role === 'user' ? 'bg-purple-500/20 text-white/90' : 'text-white/85'
            }`}
          >
            <ReactMarkdown components={mdComponents}>{msg.content}</ReactMarkdown>
          </div>
        </div>
      ))}

      {loading && !response && (
        <div className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
        </div>
      )}

      {loading && response && (
        <div className="text-white/85 text-sm leading-relaxed px-3">
          <ReactMarkdown components={mdComponents}>{response}</ReactMarkdown>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}