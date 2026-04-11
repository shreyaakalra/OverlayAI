"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("overlayAPI", {
  hide: () => electron.ipcRenderer.send("hide-window"),
  onScan: (callback) => electron.ipcRenderer.on("auto-scan", (_event, screenshot) => callback(screenshot))
});
