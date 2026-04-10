import { useRef, useEffect, useState } from 'react'

interface FollowUpInputProps {
  disabled: boolean
}

export function FollowUpInput({ disabled }: FollowUpInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { window.api.hide(); return }
    if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
      window.api.sendFollowUp(value.trim())
      setValue('')
    }
  }

  const handleSend = () => {
    if (value.trim()) {
      window.api.sendFollowUp(value.trim())
      setValue('')
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-white/8">
      <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-3 py-2 focus-within:border-white/20 transition-all">
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Scanning...' : 'Ask a follow-up...'}
          className="flex-1 bg-transparent border-none outline-none text-xs text-white/80 placeholder:text-white/25 disabled:opacity-40 disabled:cursor-not-allowed caret-[#00ff41]"
        />
        {value && (
          <button
            onClick={handleSend}
            className="text-[#00ff41]/60 hover:text-[#00ff41] transition-colors text-xs"
          >
            ⏎
          </button>
        )}
      </div>
      <div className="flex justify-between mt-1.5 px-1">
        <span className="text-white/15 text-xs">Enter to send</span>
        <span className="text-white/15 text-xs">Esc to close</span>
      </div>
    </div>
  )
}