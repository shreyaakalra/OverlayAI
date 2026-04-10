import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function CodeBlock({ language, children }: { language: string, children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const code = String(children).replace(/\n$/, '')

  const handleCopy = () => {
    window.api.copyText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-white/8 bg-black/40">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/6 bg-white/3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="text-white/30 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-white/30 hover:text-white/70 transition-colors"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '0.75rem 1rem', background: 'transparent', fontSize: '0.72rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}