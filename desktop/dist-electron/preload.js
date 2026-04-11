"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("overlayAPI", {
  captureScreen: () => electron.ipcRenderer.invoke("capture-screen"),
  hide: () => electron.ipcRenderer.send("hide-window")
});
