import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function CodeBlock({ language, children }: { language: string, children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const code = String(children).replace(/\n$/, '')

  const handleCopy = () => {
    window.api.copyText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden bg-[#282c34]">
      <div className="flex items-center justify-between px-4 py-1.5 bg-white/10 text-xs text-white/50">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="hover:text-white transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={oneDark}
        customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}