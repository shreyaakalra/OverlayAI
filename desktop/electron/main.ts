import {
  app,
  BrowserWindow,
  globalShortcut,
  desktopCapturer,
  ipcMain,
  screen,
  systemPreferences,
  dialog,
  shell,
} from 'electron'
import path from 'path'
import dotenv from 'dotenv'

// Key lives in .env as GROQ_API_KEY (NOT VITE_GROQ_API_KEY, which would leak into the bundle)
dotenv.config({ path: path.join(app.getAppPath(), '.env') })

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
// Check https://console.groq.com/docs/vision if this id stops working
const VISION_MODEL = 'qwen/qwen3.8-27b'
const TEXT_MODEL = 'llama-3.3-70b-versatile'
const MAX_CAPTURE_WIDTH = 2560 // cap so 5K displays don't produce huge IPC payloads
const LIVE_WIDTH = 720

const isDev = !app.isPackaged
let win: BrowserWindow | null = null
let currentAbort: AbortController | null = null
let capturing = false
let live = false // true while the window is a small floating chat box over the real screen
let suppressAbort = false // true while we hide the window ourselves just to take a screenshot

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// ---------------------------------------------------------------- window

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true, // needed so live mode shows the real screen around the chat box
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    resizable: false,
    fullscreenable: false,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Float above full-screen apps and every Space
  win.setAlwaysOnTop(true, 'screen-saver')
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

  if (isDev) {
    win.loadURL('http://localhost:5173')
    if (process.env.OVERLAY_DEVTOOLS) win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  win.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'Escape') {
      win?.hide()
      event.preventDefault()
    }
  })

  // Clicking another app closes the frozen-screenshot view, but NOT the floating live box
  win.on('blur', () => {
    if (live || capturing) return
    if (win && !win.webContents.isDevToolsFocused()) win.hide()
  })

  win.on('hide', () => {
    live = false
    if (!suppressAbort) currentAbort?.abort()
    win?.webContents.send('overlay-hide')
  })
}

// ---------------------------------------------------------------- capture

async function ensureScreenPermission(): Promise<boolean> {
  if (process.platform !== 'darwin') return true
  const status = systemPreferences.getMediaAccessStatus('screen')
  // 'not-determined' is fine: the first capture triggers the macOS prompt
  if (status !== 'denied' && status !== 'restricted') return true

  const { response } = await dialog.showMessageBox({
    type: 'info',
    message: 'OverlayAI needs Screen Recording permission',
    detail:
      'Open System Settings > Privacy & Security > Screen Recording and enable OverlayAI. ' +
      'In development, enable your terminal or VS Code instead. Then restart the app.',
    buttons: ['Open settings', 'Cancel'],
  })
  if (response === 0) {
    shell.openExternal('x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture')
  }
  return false
}

async function captureAndShow() {
  if (!win || capturing) return
  capturing = true
  try {
    if (!(await ensureScreenPermission())) return

    // If the live chat box is on screen, hide it first so it doesn't appear in the screenshot.
    // The short wait lets the OS compositor finish removing the window before we capture.
    if (win.isVisible()) {
      suppressAbort = true
      win.hide()
      await sleep(220)
    }
    live = false

    // The display the cursor is on = the display the user is looking at
    const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
    const sf = display.scaleFactor
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: {
        width: Math.round(display.size.width * sf),
        height: Math.round(display.size.height * sf),
      },
    })

    const idx = screen.getAllDisplays().findIndex((d) => d.id === display.id)
    const source =
      sources.find((s) => s.display_id === String(display.id)) ?? sources[idx] ?? sources[0]
    if (!source) return

    let img = source.thumbnail
    if (img.getSize().width > MAX_CAPTURE_WIDTH) {
      img = img.resize({ width: MAX_CAPTURE_WIDTH, quality: 'best' })
    }
    const dataUrl = `data:image/jpeg;base64,${img.toJPEG(90).toString('base64')}`

    win.setBounds(display.bounds)
    win.show()
    win.focus()
    win.webContents.send('auto-scan', dataUrl)
  } finally {
    capturing = false
    suppressAbort = false
  }
}

// ---------------------------------------------------------------- live mode (floating chat box)

ipcMain.on('enter-live', () => {
  if (!win) return
  live = true
  const display = screen.getDisplayMatching(win.getBounds())
  const { x, y, width, height } = display.bounds
  const h = 220
  win.setBounds({
    x: Math.round(x + (width - LIVE_WIDTH) / 2),
    y: y + height - h - 12,
    width: LIVE_WIDTH,
    height: h,
  })
})

// The renderer reports the chat box height so the window fits it exactly
ipcMain.on('live-size', (_e, h: number) => {
  if (!win || !live) return
  const display = screen.getDisplayMatching(win.getBounds())
  const { x, y, width, height } = display.bounds
  const wh = Math.min(Math.max(Math.round(Number(h) || 0), 80), height - 40)
  win.setBounds({
    x: Math.round(x + (width - LIVE_WIDTH) / 2),
    y: y + height - wh - 12,
    width: LIVE_WIDTH,
    height: wh,
  })
})

ipcMain.on('capture-now', () => {
  captureAndShow()
})

// ---------------------------------------------------------------- Groq streaming

interface AskPayload {
  requestId: string
  messages: unknown[]
  hasImage: boolean
}

ipcMain.handle('ask', async (event, payload: AskPayload) => {
  const key = process.env.GROQ_API_KEY
  if (!key) return { ok: false, error: 'GROQ_API_KEY is missing from .env' }

  currentAbort?.abort()
  const ctrl = new AbortController()
  currentAbort = ctrl

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: payload.hasImage ? VISION_MODEL : TEXT_MODEL,
        messages: payload.messages,
        stream: true,
        max_tokens: 1024,
        temperature: 0.4,
      }),
      signal: ctrl.signal,
    })

    if (!res.ok || !res.body) {
      const text = await res.text().catch(() => '')
      return { ok: false, error: `Groq ${res.status}: ${text.slice(0, 300)}` }
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      // Keep the trailing partial line in the buffer for the next chunk
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const raw of lines) {
        const line = raw.trim()
        if (!line.startsWith('data:')) continue
        const data = line.slice(5).trim()
        if (data === '[DONE]') return { ok: true }
        try {
          const delta = JSON.parse(data).choices?.[0]?.delta?.content
          if (delta) event.sender.send('ask-token', { requestId: payload.requestId, delta })
        } catch {
          // malformed line; ignore
        }
      }
    }
    return { ok: true }
  } catch (err: any) {
    if (ctrl.signal.aborted) return { ok: false, error: 'cancelled' }
    return { ok: false, error: String(err?.message ?? err) }
  } finally {
    if (currentAbort === ctrl) currentAbort = null
  }
})

ipcMain.on('cancel-ask', () => currentAbort?.abort())

ipcMain.on('hide-window', () => {
  win?.hide()
})

// ---------------------------------------------------------------- lifecycle

app.whenReady().then(() => {
  createWindow()

  globalShortcut.register('CommandOrControl+Shift+Space', () => {
    if (!win) return
    if (win.isVisible()) {
      // In live mode the shortcut means "capture what's on screen now"; otherwise it closes
      if (live) captureAndShow()
      else win.hide()
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