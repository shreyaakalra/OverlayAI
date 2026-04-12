import ReactMarkdown from 'react-markdown'

interface Props {
  response: string
  loading: boolean
}

export default function MessageBubble({ response, loading }: Props) {
  return (
    <div className="px-4 py-3 max-h-64 overflow-y-auto">
      {loading && !response && (
        <div className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
        </div>
      )}
      {response && (
        <div className="text-white/90 text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              code: ({ children }) => (
                <code className="bg-white/10 rounded px-1 py-0.5 text-purple-300 text-xs">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-white/10 rounded p-3 overflow-x-auto text-xs my-2">
                  {children}
                </pre>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-white/80">{children}</li>
              ),
            }}
          >
            {response}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}