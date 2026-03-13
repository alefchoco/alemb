// ============================================================================
// SHIELD-MASTER 2026 - ELECTRON MAIN PROCESS (VERSIÓN NATIVA SIN REACT)
// ============================================================================

const { app, BrowserWindow, ipcMain, Notification, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;

// ============================================================================
// CREACIÓN DE VENTANA
// ============================================================================

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    backgroundColor: '#000000',
    frame: true,
    titleBarStyle: 'default',
    icon: path.join(__dirname, 'public', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false
    }
  });

  // Cargar HTML nativo
  mainWindow.loadFile(path.join(__dirname, 'native', 'index.html'));

  // DevTools en desarrollo
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  console.log('✅ Shield-Master 2026 iniciado (Versión Nativa)');
}

// ============================================================================
// EVENTOS DE APLICACIÓN
// ============================================================================

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ============================================================================
// IPC HANDLERS - INFORMACIÓN DEL SISTEMA
// ============================================================================

ipcMain.handle('get-system-info', async () => {
  return {
    platform: process.platform,
    arch: process.arch,
    hostname: os.hostname(),
    cpus: os.cpus().length,
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime()
  };
});

// ============================================================================
// NOTIFICACIONES
// ============================================================================

ipcMain.handle('show-notification', async (event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({
      title: title || 'Shield-Master 2026',
      body: body || '',
      icon: path.join(__dirname, 'public', 'icon.png')
    }).show();
  }
  return true;
});

// ============================================================================
// ESCANEO DE ARCHIVOS
// ============================================================================

ipcMain.handle('scan-file', async (event, filePath) => {
  try {
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath);
    
    // Calcular hash (simulado - en producción usar crypto)
    const hash = Buffer.from(content).toString('base64').substring(0, 32);
    
    // Simular análisis
    const isThreat = Math.random() < 0.1; // 10% de probabilidad
    
    return {
      success: true,
      fileName: path.basename(filePath),
      fileSize: stats.size,
      hash: hash,
      isThreat: isThreat,
      threatLevel: isThreat ? (Math.random() < 0.5 ? 'medium' : 'high') : 'safe',
      scanTime: Date.now()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

// ============================================================================
// SELECCIONAR ARCHIVO
// ============================================================================

ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Todos los archivos', extensions: ['*'] },
      { name: 'Ejecutables', extensions: ['exe', 'dll', 'bat', 'cmd'] },
      { name: 'Documentos', extensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return {
      success: true,
      filePath: result.filePaths[0]
    };
  }

  return {
    success: false,
    canceled: true
  };
});

// ============================================================================
// GUARDAR REPORTE
// ============================================================================

ipcMain.handle('save-report', async (event, reportData) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath: `Shield-Report-${Date.now()}.json`,
      filters: [
        { name: 'JSON', extensions: ['json'] },
        { name: 'Texto', extensions: ['txt'] }
      ]
    });

    if (!result.canceled && result.filePath) {
      fs.writeFileSync(result.filePath, JSON.stringify(reportData, null, 2));
      return {
        success: true,
        filePath: result.filePath
      };
    }

    return {
      success: false,
      canceled: true
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

// ============================================================================
// CUARENTENA DE ARCHIVOS
// ============================================================================

ipcMain.handle('quarantine-file', async (event, filePath) => {
  try {
    const quarantineDir = path.join(app.getPath('userData'), 'quarantine');
    
    // Crear carpeta de cuarentena si no existe
    if (!fs.existsSync(quarantineDir)) {
      fs.mkdirSync(quarantineDir, { recursive: true });
    }

    const fileName = path.basename(filePath);
    const quarantinePath = path.join(quarantineDir, `${Date.now()}-${fileName}`);

    // Mover archivo a cuarentena
    fs.renameSync(filePath, quarantinePath);

    return {
      success: true,
      quarantinePath: quarantinePath
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

// ============================================================================
// LOGS
// ============================================================================

console.log('═══════════════════════════════════════════════');
console.log('🛡️  SHIELD-MASTER 2026 - VERSIÓN NATIVA');
console.log('═══════════════════════════════════════════════');
console.log(`📁 App Path: ${app.getAppPath()}`);
console.log(`💾 User Data: ${app.getPath('userData')}`);
console.log(`🖥️  Platform: ${process.platform} (${process.arch})`);
console.log(`⚡ Electron: ${process.versions.electron}`);
console.log(`🌐 Chrome: ${process.versions.chrome}`);
console.log(`📦 Node: ${process.versions.node}`);
console.log('═══════════════════════════════════════════════');
