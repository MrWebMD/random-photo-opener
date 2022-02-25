// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  selectFolderDialog: () =>
    new Promise((resolve, reject) => {
      ipcRenderer.invoke("selectFolder").then(resolve);
    }),

  getImagesFromFolder: (folderPath) =>
    new Promise((resolve, reject) => {
      ipcRenderer.invoke("getImagesFromFolder", folderPath).then(resolve);
    }),

  openImage: (imagePath) => {
    ipcRenderer.invoke("openImage", imagePath);
  },

  minimize: () => ipcRenderer.invoke("windowAction", "minimize"),
  maximize: () => ipcRenderer.invoke("windowAction", "maximize"),
  close: () => ipcRenderer.invoke("windowAction", "close"),
});
