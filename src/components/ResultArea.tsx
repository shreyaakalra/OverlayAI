import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { CodeBlock } from './CodeBlock'
import { useState } from 'react'

interface ResultAreaProps {
  status: 'idle' | 'scanning' | 'thinking' | 'streaming' | 'done' | 'error'
  markdown?: string
  screenshotThumb?: string | null
}

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !match ? (
      <code className="bg-white/8 border border-white/10 px-1.5 py-0.5 rounded text-[#a5f3a5] text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }} {...props}>
        {children}
      </code>
    ) : (
      <CodeBlock language={match[1]}>{children}</CodeBlock>
    )
  }
}

export function ResultArea({ status, markdown, screenshotThumb }: ResultAreaProps) {

  // IDLE
  if (status === 'idle') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center">
        <div>
          <div className="w-10 h-10 rounded-xl bg-[#00ff41]/10 border border-[#00ff41]/20 flex items-center justify-center mx-auto mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00ff41" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace' }}
            className="text-[#00ff41] text-sm font-semibold tracking-wide mb-1">
            Ready to assist
          </h2>
          <p className="text-white/30 text-xs leading-relaxed">
            Summon from anywhere on your screen
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-lg px-4 py-2.5">
          <kbd className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded font-mono">⌘</kbd>
          <kbd className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded font-mono">Shift</kbd>
          <kbd className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded font-mono">Space</kbd>
          <span className="text-white/20 text-xs ml-1">to scan</span>
        </div>

        <div className="flex gap-3 text-white/20 text-xs">
          <span>VS Code</span><span>·</span>
          <span>Gmail</span><span>·</span>
          <span>Terminal</span><span>·</span>
          <span>Figma</span>
        </div>
      </div>
    )
  }

  // SCANNING
  if (status === 'scanning') {
    return (
      <div className="flex-1 flex flex-col justify-center gap-4 px-2">

        {/* Screenshot thumbnail */}
        {screenshotThumb && (
          <div className="rounded-lg overflow-hidden border border-white/10 mb-1 relative">
            <img src={screenshotThumb} alt="captured screen" className="w-full object-cover max-h-24 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" style={{ boxShadow: '0 0 4px #00ff41' }} />
              <span className="text-[#00ff41] text-xs font-mono">Analyzing...</span>
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" style={{ boxShadow: '0 0 4px #00ff41' }} />
            <span className="text-white/50 text-xs font-mono">Reading your screen</span>
          </div>

          {/* Clean skeleton lines */}
          <div className="space-y-2.5">
            {[85, 60, 75, 45, 65].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-white/8"
                style={{
                  width: `${w}%`,
                  animation: `scanPulse 1.5s ease-in-out ${i * 0.15}s infinite`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ERROR
  if (status === 'error') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3">
            <span className="text-red-400 text-sm">!</span>
          </div>
          <p className="text-white/50 text-xs mb-4">Something went wrong</p>
          <button
            onClick={() => window.api.retry()}
            className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white/90 px-4 py-2 rounded-lg transition-all"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  // THINKING
  if (status === 'thinking' && !markdown) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#00ff41]/60"
                style={{ animation: `scanPulse 1s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
          <span className="text-white/30 text-xs">Thinking</span>
        </div>
      </div>
    )
  }

  // STREAMING / DONE
  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Screenshot thumbnail when done */}
      {screenshotThumb && (
        <div className="mb-3 rounded-lg overflow-hidden border border-white/8 relative flex-shrink-0">
          <img src={screenshotThumb} alt="captured screen" className="w-full object-cover max-h-16 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-1.5 left-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41]" style={{ boxShadow: '0 0 4px #00ff41' }} />
            <span className="text-white/40 text-xs">Screen captured</span>
          </div>
        </div>
      )}

      {/* Response */}
      <div className="flex-1 overflow-y-auto nice-scroll fade-slide-in">
        <div className="ai-prose">
          <ReactMarkdown components={markdownComponents}>
            {markdown}
          </ReactMarkdown>
          {status === 'streaming' && (
            <span className="blink text-[#00ff41] ml-0.5 text-sm">▋</span>
          )}
        </div>
      </div>

      {/* Copy button when done */}
      {status === 'done' && markdown && (
        <CopyButton text={markdown} />
      )}
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        window.api.copyText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="mt-2 flex-shrink-0 w-full text-xs py-1.5 rounded-lg border transition-all duration-200
        border-white/8 text-white/30 hover:text-white/60 hover:border-white/15 hover:bg-white/4"
    >
      {copied ? '✓ Copied to clipboard' : 'Copy response'}
    </button>
  )
}