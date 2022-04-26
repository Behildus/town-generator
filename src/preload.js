const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',{
  getSpecies: () => ipcRenderer.invoke('dialog:getSpecies')
})