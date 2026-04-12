import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  response: string
  loading: boolean
  history: Message[]
}

export default function MessageBubble({ response, loading, history }: Props) {
  return (
    <div className="px-4 py-3 max-h-72 overflow-y-auto flex flex-col gap-3">
      {/* Previous messages */}
      {history.slice(0, -1).map((msg, i) => (
        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
            msg.role === 'user'
              ? 'bg-purple-500/20 text-white/90'
              : 'text-white/80'
          }`}>
            <ReactMarkdown
              components={{
                code: ({ children }) => (
                  <code className="bg-white/10 rounded px-1 py-0.5 text-purple-300 text-xs">{children}</code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-white/10 rounded p-3 overflow-x-auto text-xs my-2">{children}</pre>
                ),
                strong: ({ children }) => (
                  <strong className="text-white font-semibold">{children}</strong>
                ),
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      {/* Current streaming response */}
      {loading && !response && (
        <div className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
        </div>
      )}
      {response && (
        <div className="text-white/90 text-sm leading-relaxed">
          <ReactMarkdown
            components={{
              code: ({ children }) => (
                <code className="bg-white/10 rounded px-1 py-0.5 text-purple-300 text-xs">{children}</code>
              ),
              pre: ({ children }) => (
                <pre className="bg-white/10 rounded p-3 overflow-x-auto text-xs my-2">{children}</pre>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
              li: ({ children }) => <li className="text-white/80">{children}</li>,
            }}
          >
            {response}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}