import { useState, useEffect } from 'react'
import Spotlight from './components/Spotlight'

export default function App() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        (window as any).overlayAPI?.hide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="w-full h-screen flex items-start justify-center pt-24 bg-zinc-900">
      <Spotlight />
    </div>
  )
}