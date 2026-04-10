import { useRef, useEffect, useState } from 'react'

interface FollowUpInputProps {
  disabled: boolean
}

export function FollowUpInput({ disabled }: FollowUpInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus when enabled (i.e. when window appears)
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      window.api.hide()
      return
    }
    if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
      window.api.sendFollowUp(value.trim())
      setValue('')
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-white/10">
      <input
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={disabled ? 'Scanning...' : 'Ask a follow-up... (Enter to send, Esc to close)'}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      />
    </div>
  )
}