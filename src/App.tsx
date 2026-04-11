import { useEffect, useState } from 'react'
import { StatusBar } from './components/StatusBar'
import { ResultArea } from './components/ResultArea'
import { FollowUpInput } from './components/FollowUpInput'
import './index.css'

type ScanStatus = 'idle' | 'scanning' | 'thinking' | 'streaming' | 'done' | 'error'
interface Message { role: 'user' | 'assistant'; content: string }

function App() {
  const [status, setStatus] = useState<ScanStatus>('idle')
  const [mode, setMode] = useState<string | null>(null)
  const [scanCount, setScanCount] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [streamingContent, setStreamingContent] = useState('')

  useEffect(() => {
    // 1. Register all listeners directly
    window.api.onTriggerScan(() => {
      setStatus('scanning')
      setMode(null)
      setScanCount(prev => prev + 1)
    })

    window.api.onScanStatus((s: string) => {
      if (s === 'scanning') setStatus('scanning')
      if (s === 'done' || s === 'thinking') setStatus('thinking')
    })

    window.api.onScanContext((data: { mode: string; context: string }) => {
      setMode(data.mode)
      setStatus('streaming')
      // Note: We intentionally DO NOT push the raw scanned text into the messages array 
      // here anymore so your chat UI stays clean and native looking!
    })

    window.api.onAiChunk((chunk?: string) => {
      setStatus('streaming')
      if (chunk) setStreamingContent(prev => prev + chunk)
    })

    window.api.onAiDone(() => {
      setStreamingContent(prev => {
        // Move the finished stream into a permanent chat bubble
        if (prev) setMessages(msgs => [...msgs, { role: 'assistant', content: prev }])
        return ''
      })
      setStatus('done')
    })

    window.api.onAiError(() => setStatus('error'))

    // 2. Clean them ALL up at once using the bulk function from preload.cjs
    return () => {
      if (window.api.removeAllListeners) {
        window.api.removeAllListeners()
      }
    }
  }, [])

  const handleSendFollowUp = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setStreamingContent('')
    window.api.sendFollowUp(text)
  }

  return (
    <div className="w-full h-screen p-3 flex flex-col overlay-enter">
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden p-4 bg-[#0A0A0C]/90 backdrop-blur-3xl border border-white/10 shadow-2xl">
        <StatusBar mode={mode} scanCount={scanCount} />
        
        <ResultArea 
          status={status} 
          messages={messages} 
          streamingContent={streamingContent} 
        />
        
        <FollowUpInput
          disabled={status === 'scanning' || status === 'thinking'}
          onSend={handleSendFollowUp}
        />
      </div>
    </div>
  )
}

export default App