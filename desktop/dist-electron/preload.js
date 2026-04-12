"use strict";const e=require("electron");e.contextBridge.exposeInMainWorld("overlayAPI",{hide:()=>e.ipcRenderer.send("hide-window"),onScan:n=>e.ipcRenderer.on("auto-scan",(o,r)=>n(r))});
