import { app, BrowserWindow } from "electron";
app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 700,
        height: 520
    });
    win.loadURL('data:text/html, <h1 style="color:white; background:black">OverlayAI</h1>');
});
