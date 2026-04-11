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

  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <div className="relative group flex items-center">
        <svg className="absolute left-3 w-4 h-4 text-white/30 group-focus-within:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Waiting for AI...' : 'Ask a follow-up...'}
          className="w-full bg-white/5 border border-white/10 focus:border-white/30 focus:bg-white/10 focus:ring-4 focus:ring-white/5 rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all disabled:opacity-50"
        />

        {value && (
          <button
            onClick={() => {
               window.api.sendFollowUp(value.trim()); 
               setValue('');
            }}
            className="absolute right-2.5 p-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-white/30 font-medium uppercase tracking-widest">
        <span>Press Enter to Send</span>
        <span>Esc to Close</span>
      </div>
    </div>
  )
}