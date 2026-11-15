import { useEffect, useState } from 'react'
import Spotlight from './components/Spotlight'

export default function App() {
  const [screenshot, setScreenshot] = useState<string | null>(null)

  useEffect(() => {
    // New capture replaces the screenshot. The conversation is kept (see Spotlight).
    return window.overlayAPI.onScan((shot) => setScreenshot(shot))
  }, [])

  return <Spotlight screenshot={screenshot} />
}