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
        <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
          {response}
        </p>
      )}
    </div>
  )
}