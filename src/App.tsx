import { useEffect, useRef, useState } from 'react'
import { StatusBar } from './components/StatusBar'
import { ResultArea } from './components/ResultArea'
import { FollowUpInput } from './components/FollowUpInput'
import './index.css'

type ScanStatus = 'idle' | 'scanning' | 'thinking' | 'streaming' | 'done' | 'error'

function App() {
  const [status, setStatus] = useState<ScanStatus>('idle')
  const [mode, setMode] = useState<string | null>(null)
  const [markdown, setMarkdown] = useState<string>('')
  const [screenshotThumb, setScreenshotThumb] = useState<string | null>(null)
  const [scanCount, setScanCount] = useState(0)
  const hasRegistered = useRef(false)

  useEffect(() => {
    if (hasRegistered.current) return
    hasRegistered.current = true

    window.api.onTriggerScan(() => {
      setStatus('scanning')
      setMode(null)
      setMarkdown('')
      setScanCount(prev => prev + 1)
    })

    window.api.onScanStatus((s: string) => {
      if (s === 'scanning') setStatus('scanning')
      if (s === 'done') setStatus('thinking')
      if (s === 'thinking') setStatus('thinking')
    })

    window.api.onScanContext((data: { mode: string; context: string; thumb?: string }) => {
      setMode(data.mode)
      setStatus('streaming')
      if (data.thumb) setScreenshotThumb(data.thumb)
    })

    window.api.onAiChunk((chunk?: string) => {
      setStatus('streaming')
      if (chunk) setMarkdown(prev => prev + chunk)
    })

    window.api.onAiDone(() => setStatus('done'))
    window.api.onAiError(() => setStatus('error'))

    return () => {
      window.api.removeAllListeners?.()
      hasRegistered.current = false
    }
  }, [])

  return (
  <div className="w-full h-screen p-3 flex flex-col overlay-enter">
    <div
      className="flex-1 flex flex-col rounded-2xl overflow-hidden p-4"
      style={{
        background: 'rgba(9, 11, 17, 0.88)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}
    >
      <StatusBar mode={mode} scanCount={scanCount} />
      <ResultArea status={status} markdown={markdown} screenshotThumb={screenshotThumb} />
      <FollowUpInput disabled={status === 'scanning' || status === 'thinking'} />
    </div>
  </div>
)
}

export default App