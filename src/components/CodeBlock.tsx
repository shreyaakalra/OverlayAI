import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function CodeBlock({ language, children }: { language: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const code = String(children).replace(/\n$/, '')

  return (
    <div className="my-2 rounded-[10px] overflow-hidden border border-white/[0.07]">
      <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border-b border-white/[0.05]">
        <span className="font-mono text-[10px] tracking-[0.08em] text-white/30">{language || 'text'}</span>
        <button
          onClick={() => { window.api.copyText(code); setCopied(true); setTimeout(() => setCopied(false), 1800) }}
          className={`font-mono text-[10px] px-1.5 py-0.5 rounded transition-colors ${
            copied ? 'text-emerald-400' : 'text-white/30 hover:text-white/70 hover:bg-white/[0.05]'
          }`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '12px', background: 'rgba(0,0,0,0.3)', fontSize: '12px' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}