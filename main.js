import { app, BrowserWindow, globalShortcut, ipcMain, clipboard } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import dotenv from 'dotenv';
import { analyzeScreen } from './vision.js';
import { streamResponse, SYSTEM_PROMPT } from './groq.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let win = null;
let sessionMessages = [];
let currentContext = '';
let isScanning = false;

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
  });

  win.loadURL('http://localhost:5173');
  win.hide();
}

function captureScreen() {
  const tmpPath = path.join(os.tmpdir(), 'overlay-snap.png');
  execSync(`screencapture -x -t png "${tmpPath}"`);
  const buffer = fs.readFileSync(tmpPath);
  fs.unlinkSync(tmpPath);
  return buffer.toString('base64');
}

async function runScanPipeline() {
  if (!win || isScanning) return;
  isScanning = true;

  try {
    // 1. Hide window so it doesn't appear in screenshot
    win.hide();
    await new Promise(r => setTimeout(r, 250));

    // 2. Capture screen
    const base64 = captureScreen();

    // 3. Show window and tell React to reset UI
    win.center();
    win.show();
    win.focus();
    win.webContents.send('trigger-scan');
    win.webContents.send('scan-status', 'scanning');

    // 4. Analyze with Gemini
    const { mode, context } = await analyzeScreen(base64);
    currentContext = context;
    win.webContents.send('scan-status', 'done');
    win.webContents.send('scan-context', { mode, context });

    // 5. Reset session and stream Groq response
    sessionMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Screen context:\n${currentContext}\n\nAnalyze this and help me.` }
    ];

    await streamResponse(
      sessionMessages,
      (chunk) => win.webContents.send('ai-chunk', chunk),
      (full) => {
        sessionMessages.push({ role: 'assistant', content: full });
        win.webContents.send('ai-done');
      }
    );
  } catch (error) {
    console.error('Vision Pipeline Error:', error);
    if (win) {
      win.show();
      win.webContents.send('ai-error');
    }
  } finally {
    isScanning = false;
  }
}

app.whenReady().then(() => {
  createWindow();

  const registered = globalShortcut.register('CommandOrControl+Shift+Space', async () => {
    if (!win) return;

    if (win.isVisible()) {
      // Already open — re-scan instead of hiding
      runScanPipeline();
    } else {
      runScanPipeline();
    }
  });

  if (!registered) {
    console.error('❌ Global shortcut registration failed');
  } else {
    console.log('✅ Hotkey Cmd+Shift+Space registered');
  }
});

// IPC Handlers
ipcMain.on('hide-window', () => win?.hide());
ipcMain.on('copy-text', (_, text) => clipboard.writeText(text));
ipcMain.on('retry', () => runScanPipeline());

ipcMain.on('follow-up', async (_, message) => {
  if (!win || isScanning) return;
  isScanning = true;

  win.webContents.send('scan-status', 'thinking');
  sessionMessages.push({ role: 'user', content: message });

  try {
    await streamResponse(
      sessionMessages,
      (chunk) => win.webContents.send('ai-chunk', chunk),
      (full) => {
        sessionMessages.push({ role: 'assistant', content: full });
        win.webContents.send('ai-done');
      }
    );
  } catch {
    win.webContents.send('ai-error');
  } finally {
    isScanning = false;
  }
});

app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', (e) => e.preventDefault());