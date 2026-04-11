import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { CodeBlock } from './CodeBlock'

interface ResultAreaProps {
  status: 'idle' | 'scanning' | 'thinking' | 'streaming' | 'done' | 'error'
  markdown?: string
  screenshotThumb?: string | null
}

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !match ? (
      <code className="bg-white/10 border border-white/5 px-1.5 py-0.5 rounded text-white/90 text-sm font-mono" {...props}>
        {children}
      </code>
    ) : (
      <CodeBlock language={match[1]}>{children}</CodeBlock>
    )
  }
}

export function ResultArea({ status, markdown }: ResultAreaProps) {
  // 1. IDLE
  if (status === 'idle') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <div>
          <h2 className="text-white/80 font-medium">Ready to scan</h2>
          <p className="text-white/40 text-sm mt-1">Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs text-white/70 mx-1">⌘ + Shift + Space</kbd> anywhere</p>
        </div>
      </div>
    )
  }

  // 2. SCANNING & THINKING
  if (status === 'scanning' || status === 'thinking') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <p className="text-white/40 text-sm font-medium">
          {status === 'scanning' ? 'Capturing screen...' : 'Analyzing context...'}
        </p>
      </div>
    )
  }

  // 3. ERROR
  if (status === 'error') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
          !
        </div>
        <p className="text-white/60 text-sm">Vision pipeline failed to read screen.</p>
        <button
          onClick={() => window.api.retry()}
          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-sm transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  // 4. STREAMING / DONE
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="prose prose-invert prose-sm max-w-none text-white/80 leading-relaxed">
          <ReactMarkdown components={markdownComponents}>
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}