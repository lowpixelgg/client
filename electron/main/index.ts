process.env.DIST = join(__dirname, "../..");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST, "../public");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

import { app, BrowserWindow, shell, ipcMain } from "electron";
import { release } from "os";
import { join } from "path";
import { RichPrecense } from "../game-props/external/rpc"
import GameProps from "../game-props/main";

const rpc = new RichPrecense();
let game
// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "ROCKET CLIENT",
    icon: join(process.env.PUBLIC, "favicon.svg"),
    width: 1030,
    height: 590,
    minHeight: 520,
    minWidth: 800,
    frame: false,
    resizable: false,
    roundedCorners: true,
    center: true,
    fullscreen: false,
    fullscreenable: false,
    webPreferences: { 
      preload,
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  game = new GameProps(win, rpc).io;
  game.listen(3030);

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
    win.webContents.openDevTools();

  }

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });



  
  // rpc.request("Explorando o cliente")
}

app.whenReady().then(createWindow);

ipcMain.on("window-take-minimized", () => {
  win.minimize();
});

ipcMain.on("window-take-toggleMaximized", () => {
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});

ipcMain.on("window-take-closed", () => {
  win.close();
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", async () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
