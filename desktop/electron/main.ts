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
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(path.join(__dirname, '../../dist/index.html'))
    win.webContents.openDevTools({ mode: 'detach' })
  }

  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'Escape') {
      win?.hide()
      event.preventDefault()
    }
  })

  win.on('blur', () => {
    win?.hide()
  })
}

async function captureAndShow() {
  if (!win) return

  // Capture BEFORE showing the window
  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: { width: 1280, height: 720 },
  })
  const screenshot = sources[0].thumbnail.toDataURL()

  win.center()
  win.show()
  win.focus()

  // Send screenshot to renderer after a short delay so React has mounted
  setTimeout(() => {
    win?.webContents.send('auto-scan', screenshot)
  }, 300)
}

app.whenReady().then(() => {
  createWindow()

  globalShortcut.register('CommandOrControl+Shift+Space', () => {
    if (!win) return
    if (win.isVisible()) {
      win.hide()
    } else {
      captureAndShow()
    }
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('hide-window', () => {
  if (win) {
    win.hide()
    win.blur()
  }
})