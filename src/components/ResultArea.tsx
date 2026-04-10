import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { CodeBlock } from './CodeBlock'

interface ResultAreaProps {
  status: 'idle' | 'scanning' | 'thinking' | 'streaming' | 'done' | 'error'
  markdown?: string
}

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    const isInline = !match

    return isInline ? (
      <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90" {...props}>
        {children}
      </code>
    ) : (
      <CodeBlock language={match[1]}>{children}</CodeBlock>
    )
  }
}

export function ResultArea({ status, markdown }: ResultAreaProps) {
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

  if (status === 'thinking' && !markdown) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/20 text-sm animate-pulse">Connecting to AI...</div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <div className="prose prose-invert prose-sm max-w-none text-white/80">
        <ReactMarkdown components={markdownComponents}>
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}