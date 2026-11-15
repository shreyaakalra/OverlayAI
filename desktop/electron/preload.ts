import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

function subscribe<T>(channel: string, cb: (arg: T) => void) {
  const handler = (_e: IpcRendererEvent, arg: T) => cb(arg)
  ipcRenderer.on(channel, handler)
  return () => ipcRenderer.removeListener(channel, handler)
}

contextBridge.exposeInMainWorld('overlayAPI', {
  hide: () => ipcRenderer.send('hide-window'),
  cancel: () => ipcRenderer.send('cancel-ask'),
  enterLive: () => ipcRenderer.send('enter-live'),
  liveSize: (height: number) => ipcRenderer.send('live-size', height),
  captureNow: () => ipcRenderer.send('capture-now'),
  ask: (payload: unknown) => ipcRenderer.invoke('ask', payload),
  onScan: (cb: (screenshot: string) => void) => subscribe<string>('auto-scan', cb),
  onHide: (cb: () => void) => subscribe<void>('overlay-hide', cb),
  onToken: (cb: (e: { requestId: string; delta: string }) => void) =>
    subscribe<{ requestId: string; delta: string }>('ask-token', cb),
})