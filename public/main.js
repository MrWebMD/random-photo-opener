const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const open = require('open');
const fs = require("fs");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 310,
    height: 500,
    resizable: false,
    title: "Random Photo Opener",
    frame: false,
    autoHideMenuBar: true,
    icon: __dirname + '/favicon.ico',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //load the index.html from a url
  win.loadURL("http://localhost:3000");

  // Open the DevTools.
  // win.webContents.openDevTools();

  ipcMain.handle("windowAction", (event, action) => {
    var win = BrowserWindow.getFocusedWindow();

    switch(action){
      case "minimize":
        win.minimize();
        console.log("Minimizing");
        break;
      case "maximize":
        !win.isMaximized() ? win.maximize() : win.restore()
        console.log("Maximizing");
        break;
      case "close":
        win.close();
        console.log("Closing");
        break;
      default:
        break;
    }

  });

  ipcMain.handle("selectFolder", (event) => {
    return dialog.showOpenDialog({
      properties: ["openFile", "openDirectory"],
    });
  });
  ipcMain.handle("openImage", (event, imagePath) => {
    open(imagePath);
  });
  ipcMain.handle("getImagesFromFolder", (event, folderPath) => {
    console.log("Getting images from a folder", folderPath);

    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error(err);
          resolve([]);
        }

        let fileList = files.filter((f) => {
          return /([a-zA-Z0-9\s_\\.\-():])+(.jpg|.jpeg|.png|.gif)/i.test(f);
        }).map(fileName => path.join(folderPath, fileName))

        resolve(fileList);
      });
    });
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
