const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Información del sistema
let mainWindow;

// Deshabilitar advertencias de seguridad en desarrollo
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

function createWindow() {
  // Crear la ventana del navegador
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1024,
    minHeight: 768,
    backgroundColor: '#000000', // OLED Black - Cyber-Luxury
    icon: path.join(__dirname, 'public', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
    autoHideMenuBar: true,
    frame: true,
    show: false, // No mostrar hasta que esté listo
  });

  // Cargar la app
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, 'dist', 'index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Mostrar cuando esté listo para evitar flicker
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Abrir DevTools en desarrollo
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Manejar cierre de ventana
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Prevenir navegación externa
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(startUrl)) {
      event.preventDefault();
    }
  });
}

// Cuando Electron esté listo
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Salir cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// =============================================================================
// IPC HANDLERS - Comunicación con el renderer
// =============================================================================

// Obtener información del sistema (para el dashboard)
ipcMain.handle('get-system-info', async () => {
  try {
    return {
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      cpus: os.cpus().length,
      uptime: os.uptime(),
      homeDir: os.homedir(),
      tmpDir: os.tmpdir(),
      version: process.versions,
    };
  } catch (error) {
    console.error('Error getting system info:', error);
    return null;
  }
});

// Escanear un archivo (simulado - para DeepScan)
ipcMain.handle('scan-file', async (event, filePath) => {
  try {
    // En una app real, aquí harías un escaneo de virus
    // Por ahora, solo verificamos que el archivo existe
    const stats = fs.statSync(filePath);
    
    return {
      success: true,
      fileName: path.basename(filePath),
      fileSize: stats.size,
      filePath: filePath,
      scanTime: Date.now(),
      threats: Math.random() > 0.9 ? ['Threat.Suspicious.JS'] : [], // 10% de probabilidad de amenaza simulada
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

// Abrir diálogo para seleccionar archivo
ipcMain.handle('select-file', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'All Files', extensions: ['*'] },
        { name: 'Documents', extensions: ['pdf', 'doc', 'docx', 'txt'] },
        { name: 'Images', extensions: ['jpg', 'png', 'gif', 'bmp'] },
        { name: 'Executables', extensions: ['exe', 'msi', 'app'] },
      ],
    });

    if (result.canceled) {
      return null;
    }

    return result.filePaths[0];
  } catch (error) {
    console.error('Error selecting file:', error);
    return null;
  }
});

// Abrir diálogo para seleccionar carpeta
ipcMain.handle('select-folder', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    if (result.canceled) {
      return null;
    }

    return result.filePaths[0];
  } catch (error) {
    console.error('Error selecting folder:', error);
    return null;
  }
});

// Escanear carpeta (simulado)
ipcMain.handle('scan-folder', async (event, folderPath) => {
  try {
    const files = fs.readdirSync(folderPath);
    
    return {
      success: true,
      folderPath: folderPath,
      filesCount: files.length,
      scanTime: Date.now(),
      threats: Math.floor(Math.random() * 3), // 0-2 amenazas simuladas
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

// Obtener información de red
ipcMain.handle('get-network-info', async () => {
  try {
    const interfaces = os.networkInterfaces();
    const networkInfo = [];

    for (const [name, addresses] of Object.entries(interfaces)) {
      for (const addr of addresses) {
        if (addr.family === 'IPv4' && !addr.internal) {
          networkInfo.push({
            interface: name,
            address: addr.address,
            netmask: addr.netmask,
            mac: addr.mac,
          });
        }
      }
    }

    return {
      success: true,
      interfaces: networkInfo,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

// Cuarentena de archivo (mover a carpeta segura)
ipcMain.handle('quarantine-file', async (event, filePath) => {
  try {
    const quarantineDir = path.join(app.getPath('userData'), 'quarantine');
    
    // Crear carpeta de cuarentena si no existe
    if (!fs.existsSync(quarantineDir)) {
      fs.mkdirSync(quarantineDir, { recursive: true });
    }

    const fileName = path.basename(filePath);
    const destination = path.join(quarantineDir, `${Date.now()}_${fileName}`);
    
    // Mover archivo a cuarentena
    fs.renameSync(filePath, destination);

    return {
      success: true,
      originalPath: filePath,
      quarantinePath: destination,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

// Eliminar archivo de cuarentena
ipcMain.handle('delete-quarantined-file', async (event, filePath) => {
  try {
    fs.unlinkSync(filePath);
    return {
      success: true,
      filePath: filePath,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

// Restaurar archivo de cuarentena
ipcMain.handle('restore-quarantined-file', async (event, quarantinePath, originalPath) => {
  try {
    fs.renameSync(quarantinePath, originalPath);
    return {
      success: true,
      restoredPath: originalPath,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

// Guardar reporte en disco
ipcMain.handle('save-report', async (event, reportData) => {
  try {
    const reportsDir = path.join(app.getPath('userData'), 'reports');
    
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const fileName = `report_${Date.now()}.json`;
    const filePath = path.join(reportsDir, fileName);
    
    fs.writeFileSync(filePath, JSON.stringify(reportData, null, 2));

    return {
      success: true,
      filePath: filePath,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

// Obtener lista de reportes guardados
ipcMain.handle('get-saved-reports', async () => {
  try {
    const reportsDir = path.join(app.getPath('userData'), 'reports');
    
    if (!fs.existsSync(reportsDir)) {
      return {
        success: true,
        reports: [],
      };
    }

    const files = fs.readdirSync(reportsDir);
    const reports = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(reportsDir, file);
        const stats = fs.statSync(filePath);
        return {
          fileName: file,
          filePath: filePath,
          createdAt: stats.birthtime,
          size: stats.size,
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt);

    return {
      success: true,
      reports: reports,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

// Leer reporte específico
ipcMain.handle('read-report', async (event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return {
      success: true,
      data: JSON.parse(content),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

// Mostrar notificación del sistema
ipcMain.handle('show-notification', async (event, options) => {
  const { Notification } = require('electron');
  
  if (Notification.isSupported()) {
    new Notification({
      title: options.title || 'Shield-Master 2026',
      body: options.body || '',
      icon: path.join(__dirname, 'public', 'icon.png'),
    }).show();
    
    return { success: true };
  }
  
  return { success: false, error: 'Notifications not supported' };
});

// =============================================================================
// MANEJO DE ERRORES
// =============================================================================

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});