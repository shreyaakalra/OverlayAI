const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  onScanStatus: (cb) => ipcRenderer.on('scan-status', (_, status) => cb(status)),
  onScanContext: (cb) => ipcRenderer.on('scan-context', (_, data) => cb(data)),
  onAiChunk: (cb) => ipcRenderer.on('ai-chunk', (_, chunk) => cb(chunk)),
  onAiDone: (cb) => ipcRenderer.on('ai-done', (_, full) => cb(full)),
  onAiError: (cb) => ipcRenderer.on('ai-error', (_, err) => cb(err)),
  onTriggerScan: (cb) => ipcRenderer.on('trigger-scan', () => cb()),

  sendFollowUp: (msg) => ipcRenderer.send('follow-up', msg),
  copyText: (text) => ipcRenderer.send('copy-text', text),
  retry: () => ipcRenderer.send('retry'),
  hide: () => ipcRenderer.send('hide-window'),
})