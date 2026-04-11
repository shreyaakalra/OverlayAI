import { useRef, useEffect, useState } from 'react'

interface FollowUpInputProps {
  disabled: boolean
  onSend: (text: string) => void
}

// Notice we added `onSend` inside the curly braces here!
export function FollowUpInput({ disabled, onSend }: FollowUpInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { window.api.hide(); return }
    if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
      onSend(value.trim()) // Use the prop!
      setValue('')
    }
  }

  // Handle clicking the send button icon
  const handleSendClick = () => {
    if (value.trim()) {
      onSend(value.trim())
      setValue('')
    }
  }

  return (
  <div className="border-t border-white/[0.05] px-[14px] pt-[12px] pb-[14px]">
    <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] focus-within:border-white/[0.18] focus-within:bg-white/[0.06] rounded-xl px-3 py-[9px] transition-all">
      <svg className="w-[14px] h-[14px] text-white/20 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={disabled ? 'Waiting...' : 'Ask a follow-up...'}
        className="flex-1 bg-transparent text-[13px] text-white placeholder:text-white/30 outline-none disabled:opacity-40 font-[Syne,sans-serif]"
      />
      {value && (
        <button onClick={handleSendClick} className="w-6 h-6 flex items-center justify-center rounded-md bg-white/[0.08] text-white/60 hover:bg-white/[0.14] hover:text-white transition-colors flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      )}
    </div>
    <div className="flex justify-between mt-1.5 px-0.5 font-mono text-[9px] text-white/[0.18] tracking-[0.1em] uppercase">
      <span>↵ send</span>
      <span>esc close</span>
    </div>
  </div>
)
}