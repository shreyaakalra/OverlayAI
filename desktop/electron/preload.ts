import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('overlayAPI', {
  captureScreen: () => ipcRenderer.invoke('capture-screen'),
  hide: () => ipcRenderer.send('hide-window'),
})