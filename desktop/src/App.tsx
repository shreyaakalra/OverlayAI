import { useEffect, useState } from 'react'
import Spotlight from './components/Spotlight'

export default function App() {
  const [screenshot, setScreenshot] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setScreenshot(null)
        ;(window as any).overlayAPI?.hide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    ;(window as any).overlayAPI?.onScan((shot: string) => {
      setScreenshot(null) // force reset first
      setTimeout(() => setScreenshot(shot), 50) // then set new one
    })

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="w-full h-screen flex items-start justify-center pt-16 bg-zinc-900">
      <Spotlight screenshot={screenshot} />
    </div>
  )
}