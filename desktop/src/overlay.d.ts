export {}

declare global {
  interface Window {
    overlayAPI: {
      hide: () => void
      cancel: () => void
      enterLive: () => void
      liveSize: (height: number) => void
      captureNow: () => void
      ask: (payload: {
        requestId: string
        messages: unknown[]
        hasImage: boolean
      }) => Promise<{ ok: boolean; error?: string }>
      onScan: (cb: (screenshot: string) => void) => () => void
      onHide: (cb: () => void) => () => void
      onToken: (cb: (e: { requestId: string; delta: string }) => void) => () => void
    }
  }
}