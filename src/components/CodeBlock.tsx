import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function CodeBlock({ language, children }: { language: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const code = String(children).replace(/\n$/, '')

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-white/10 bg-[#1E1E1E] shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Mac window dots */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-white/40 text-xs font-mono">{language || 'text'}</span>
        </div>
        <button
          onClick={() => {
            window.api.copyText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
          className={`text-xs px-2 py-1 rounded-md transition-colors ${
            copied ? 'text-emerald-400 bg-emerald-400/10' : 'text-white/40 hover:text-white hover:bg-white/10'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {/* Body */}
      <SyntaxHighlighter
        language={language || 'text'}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '13px' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}