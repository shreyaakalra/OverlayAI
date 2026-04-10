import { useEffect, useState } from 'react'
import { StatusBar } from './components/StatusBar'
import { ResultArea } from './components/ResultArea'
import { FollowUpInput } from './components/FollowUpInput'
import './index.css'

type ScanStatus = 'idle' | 'scanning' | 'thinking' | 'streaming' | 'done' | 'error'

function App() {
  const [status, setStatus] = useState<ScanStatus>('idle')
  const [mode, setMode] = useState<string | null>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Window just appeared — trigger scan
    window.api.onTriggerScan(() => {
      setStatus('scanning')
      setMode(null)
    })

    window.api.onScanStatus((s: string) => {
      if (s === 'scanning') setStatus('scanning')
      if (s === 'done') setStatus('thinking')
    })

    window.api.onScanContext((data: { mode: string; context: string }) => {
      setMode(data.mode)
      setStatus('streaming')
    })

    window.api.onAiChunk(() => {
      setStatus('streaming')
    })

    window.api.onAiDone(() => {
      setStatus('done')
    })

    window.api.onAiError(() => {
      setStatus('error')
    })
  }, [])

  return (
    <div className={`w-full h-screen p-4 flex flex-col overlay-enter`}>
      {/* Frosted glass card */}
      <div className="flex-1 flex flex-col bg-black/50 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-4 overflow-hidden">
        <StatusBar mode={mode} />
        <ResultArea status={status} />
        <FollowUpInput disabled={status === 'scanning' || status === 'thinking'} />
      </div>
    </div>
  )
}

export default App