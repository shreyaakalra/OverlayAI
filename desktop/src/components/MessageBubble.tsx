import { Message } from '../hooks/useCerebras'

interface Props {
  response: string
  loading: boolean
  history: Message[]
}

export default function MessageBubble({ response, loading, history }: Props) {
  const pastMessages = history.slice(0, -1) // all except the latest assistant msg

  return (
    <div className="px-4 py-3 max-h-72 overflow-y-auto flex flex-col gap-3">
      {/* Past conversation */}
      {pastMessages.map((m, i) => (
        <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
          <span className={`text-xs px-3 py-1.5 rounded-xl inline-block max-w-[85%] text-left ${
            m.role === 'user'
              ? 'bg-purple-500/30 text-purple-200'
              : 'bg-white/5 text-white/80'
          }`}>
            {m.content}
          </span>
        </div>
      ))}

      {/* Loading dots */}
      {loading && !response && (
        <div className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
        </div>
      )}

      {/* Current streaming response */}
      {response && (
        <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
          {response}
        </p>
      )}
    </div>
  )
}