"use strict";
const electron = require("electron");
const path = require("path");
let win = null;
const isDev = !electron.app.isPackaged;
function createWindow() {
  win = new electron.BrowserWindow({
    width: 680,
    height: 500,
    frame: false,
    transparent: false,
    backgroundColor: "#1a1a1a",
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false
    }
  });
  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  win.webContents.on("before-input-event", (event, input) => {
    if (input.key === "Escape") {
      win == null ? void 0 : win.hide();
      event.preventDefault();
    }
  });
  win.on("blur", () => {
    win == null ? void 0 : win.hide();
  });
}
async function captureAndShow() {
  if (!win) return;
  const sources = await electron.desktopCapturer.getSources({
    types: ["screen"],
    thumbnailSize: { width: 1280, height: 720 }
  });
  const screenshot = sources[0].thumbnail.toDataURL();
  win.center();
  win.show();
  win.focus();
  setTimeout(() => {
    win == null ? void 0 : win.webContents.send("auto-scan", screenshot);
  }, 300);
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.globalShortcut.register("CommandOrControl+Shift+Space", () => {
    if (!win) return;
    if (win.isVisible()) {
      win.hide();
    } else {
      captureAndShow();
    }
  });
});
electron.app.on("will-quit", () => {
  electron.globalShortcut.unregisterAll();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
electron.ipcMain.on("hide-window", () => {
  if (win) {
    win.hide();
    win.blur();
  }
});
