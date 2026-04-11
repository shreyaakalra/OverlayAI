import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('overlayAPI', {
  hide: () => ipcRenderer.send('hide-window'),
  onScan: (callback: (screenshot: string) => void) =>
    ipcRenderer.on('auto-scan', (_event, screenshot) => callback(screenshot)),
})