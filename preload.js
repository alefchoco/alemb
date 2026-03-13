const { contextBridge, ipcRenderer } = require('electron');

// Exponer APIs seguras al renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Información del sistema
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  
  // Escaneo de archivos
  scanFile: (filePath) => ipcRenderer.invoke('scan-file', filePath),
  selectFile: () => ipcRenderer.invoke('select-file'),
  
  // Escaneo de carpetas
  scanFolder: (folderPath) => ipcRenderer.invoke('scan-folder', folderPath),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  
  // Información de red
  getNetworkInfo: () => ipcRenderer.invoke('get-network-info'),
  
  // Cuarentena
  quarantineFile: (filePath) => ipcRenderer.invoke('quarantine-file', filePath),
  deleteQuarantinedFile: (filePath) => ipcRenderer.invoke('delete-quarantined-file', filePath),
  restoreQuarantinedFile: (quarantinePath, originalPath) => 
    ipcRenderer.invoke('restore-quarantined-file', quarantinePath, originalPath),
  
  // Reportes
  saveReport: (reportData) => ipcRenderer.invoke('save-report', reportData),
  getSavedReports: () => ipcRenderer.invoke('get-saved-reports'),
  readReport: (filePath) => ipcRenderer.invoke('read-report', filePath),
  
  // Notificaciones
  showNotification: (options) => ipcRenderer.invoke('show-notification', options),
  
  // Información de la plataforma
  platform: process.platform,
  isElectron: true,
});

// Exponer una función para verificar si estamos en Electron
contextBridge.exposeInMainWorld('isElectron', true);
