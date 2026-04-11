import { app, BrowserWindow, globalShortcut, desktopCapturer, ipcMain } from 'electron'
import path from 'path'

let win: BrowserWindow | null = null

const isDev = !app.isPackaged

function createWindow() {
  win = new BrowserWindow({
    width: 680,
    height: 500,
    frame: false,
    transparent: false,
    backgroundColor: '#1a1a1a',
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
    },
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
    // DevTools removed so ESC works properly
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  win.center()
  win.show()

  // ESC at Electron level
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'Escape') {
      win?.hide()
      event.preventDefault()
    }
  })

  // Hide when window loses focus
  win.on('blur', () => {
    win?.hide()
  })
}

app.whenReady().then(() => {
  createWindow()

  globalShortcut.register('CommandOrControl+Shift+Space', () => {
    if (!win) return
    if (win.isVisible()) {
      win.hide()
    } else {
      win.center()
      win.show()
      win.focus()
    }
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('capture-screen', async () => {
  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: { width: 1280, height: 720 },
  })
  return sources[0].thumbnail.toDataURL()
})

ipcMain.on('hide-window', () => {
  if (win) {
    win.hide()
    win.blur()
  }
})