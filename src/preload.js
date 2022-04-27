const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',{
  getSpecies: () => ipcRenderer.invoke('dialog:getSpecies'),
  putSpecies: (species_data) => ipcRenderer.send('putSpecies', species_data)
})