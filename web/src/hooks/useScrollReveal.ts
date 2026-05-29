import { useEffect } from 'react'

export function useScrollReveal(dep?: string) {
  useEffect(() => {
    // Small timeout so React has flushed the new page's DOM before we query
    const timer = setTimeout(() => {
      // Reset any elements that are no longer visible (navigated away and back)
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.remove('visible')
      })

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e, i) => {
            if (e.isIntersecting) {
              setTimeout(() => e.target.classList.add('visible'), i * 80)
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.08 }
      )

      document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

      return () => io.disconnect()
    }, 50)

    return () => clearTimeout(timer)
  }, [dep]) // re-runs every time the page changes
}