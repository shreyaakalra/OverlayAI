import { app, BrowserWindow, globalShortcut, ipcMain, clipboard } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let win = null

function createWindow() {
  win = new BrowserWindow({
    width: 680,
    height: 520,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    type: 'panel',
    vibrancy: 'hud',
    visualEffectState: 'active',
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  })

  // In dev, load from Vite dev server
  win.loadURL('http://localhost:5173')

  // Start hidden
  win.hide()

  // Uncomment this during development to see DevTools
  // win.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(() => {
  createWindow()

  // Register the global hotkey
  const registered = globalShortcut.register('CommandOrControl+Shift+Space', () => {
    if (!win) return

    if (win.isVisible()) {
      win.hide()
    } else {
      win.center()
      win.show()
      win.focus()
      // Tell React to start scanning
      win.webContents.send('trigger-scan')
    }
  })

  if (!registered) {
    console.error('❌ Global shortcut registration failed')
  } else {
    console.log('✅ Hotkey Cmd+Shift+Space registered')
  }
})

// IPC Handlers
ipcMain.on('hide-window', () => {
  win?.hide()
})

ipcMain.on('copy-text', (_, text) => {
  clipboard.writeText(text)
})

ipcMain.on('follow-up', (_, message) => {
  console.log('Follow-up received:', message)
  // Phase 3 will handle this — placeholder for now
})

ipcMain.on('retry', () => {
  console.log('Retry triggered')
  // Phase 3 will handle this
})

// Cleanup
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

// Keep app alive when window is closed (macOS)
app.on('window-all-closed', (e) => {
  e.preventDefault()
})