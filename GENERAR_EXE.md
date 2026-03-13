# 🛡️ GUÍA COMPLETA: CONVERTIR A APLICACIÓN .EXE

## 📋 TABLA DE CONTENIDOS

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Configuración de Iconos](#configuración-de-iconos)
4. [Generar el .EXE](#generar-el-exe)
5. [Probar la Aplicación](#probar-la-aplicación)
6. [Solución de Problemas](#solución-de-problemas)
7. [Funcionalidades Electron](#funcionalidades-electron)

---

## 📦 REQUISITOS PREVIOS

Antes de empezar, asegúrate de tener instalado:

```bash
✅ Node.js (versión 18 o superior)
   Descarga: https://nodejs.org/

✅ npm (incluido con Node.js)
   Verifica: npm --version

✅ Git (opcional, pero recomendado)
   Descarga: https://git-scm.com/

✅ Windows 10/11 (para generar .exe)
```

---

## 🚀 INSTALACIÓN

### **Paso 1: Descargar el Proyecto**

```bash
# Si estás en Figma Make, exporta todo el código
# O clona desde Git si tienes repositorio
```

### **Paso 2: Instalar Dependencias**

```bash
# Abre terminal en la carpeta del proyecto
cd shield-master-2026

# Instala todas las dependencias
npm install

# Esto instalará:
# - React y dependencias web (69 paquetes)
# - Electron (para app de escritorio)
# - electron-builder (para generar .exe)
# - concurrently y wait-on (para desarrollo)
```

**⏱️ Tiempo estimado:** 3-5 minutos (dependiendo de tu conexión)

---

## 🎨 CONFIGURACIÓN DE ICONOS

### **Paso 3: Crear Carpeta de Recursos**

```bash
# Crear carpeta public si no existe
mkdir public
```

### **Paso 4: Agregar Iconos**

Necesitas crear iconos en diferentes formatos:

#### **Para Windows (.ico):**

```bash
public/icon.ico
- Tamaño recomendado: 256x256 px
- Formato: .ico
- Herramienta online: https://www.icoconverter.com/
```

#### **Para macOS (.icns):**

```bash
public/icon.icns
- Tamaño recomendado: 512x512 px
- Formato: .icns
- Herramienta online: https://cloudconvert.com/png-to-icns
```

#### **Para Linux (.png):**

```bash
public/icon.png
- Tamaño recomendado: 512x512 px
- Formato: .png
```

### **🎨 Diseño del Icono (Sugerencia):**

Para el tema "Cyber-Luxury" de Shield-Master 2026:

```
Elementos sugeridos:
- Escudo (🛡️) en negro OLED
- Detalles en rojo vibrante (#ef4444)
- Contorno en verde neón (#22c55e)
- Fondo transparente o negro
```

**Herramientas para crear iconos:**
- Figma Design (diseño)
- GIMP (edición)
- Online: https://www.favicon-generator.org/

---

## ⚙️ CONFIGURACIÓN ADICIONAL

### **Paso 5: Verificar package.json**

Ya está configurado con:

```json
{
  "name": "shield-master-2026",
  "version": "1.0.0",
  "main": "electron.js",
  "scripts": {
    "electron:build:win": "npm run build && electron-builder --win"
  },
  "build": {
    "appId": "com.shieldmaster.app",
    "win": {
      "target": ["nsis", "portable"],
      "icon": "public/icon.ico"
    }
  }
}
```

✅ **Ya está listo, no necesitas modificar nada**

---

## 🏗️ GENERAR EL .EXE

### **Paso 6: Construir la Aplicación**

```bash
# Opción 1: Build completo para Windows
npm run electron:build:win

# Opción 2: Solo ejecutable portable (sin instalador)
npm run electron:build:win -- --config.win.target=portable

# Opción 3: Solo instalador NSIS
npm run electron:build:win -- --config.win.target=nsis
```

### **⏱️ Tiempo de Build:**

```
Primera vez:    8-12 minutos
Builds después: 3-5 minutos
```

### **📁 Archivos Generados:**

```
release/
├── Shield-Master-2026-Setup-1.0.0.exe        ✅ INSTALADOR
│   └─> Tamaño: ~150-200 MB
│   └─> Crea acceso directo en Escritorio
│   └─> Se instala en Program Files
│
└── Shield-Master-2026-Portable-1.0.0.exe     ✅ PORTABLE
    └─> Tamaño: ~150-200 MB
    └─> No necesita instalación
    └─> Ejecuta directamente
```

---

## 🧪 PROBAR LA APLICACIÓN

### **Opción 1: Modo Desarrollo (SIN generar .exe)**

```bash
# Ejecuta en modo desarrollo con Electron
npm run electron:dev

# Esto abre:
# 1. Servidor Vite en http://localhost:5173
# 2. Ventana de Electron automáticamente
# 3. DevTools para debugging
```

### **Opción 2: Ejecutar el .EXE Generado**

```bash
# Navega a la carpeta release
cd release

# Doble clic en el instalador
Shield-Master-2026-Setup-1.0.0.exe
└─> Instala la app en tu PC
└─> Crea acceso directo
└─> Ejecuta automáticamente

# O ejecuta el portable
Shield-Master-2026-Portable-1.0.0.exe
└─> Ejecuta sin instalar
```

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### **Error: "electron not found"**

```bash
# Solución:
npm install electron --save-dev

# Verifica:
npx electron --version
```

### **Error: "electron-builder not found"**

```bash
# Solución:
npm install electron-builder --save-dev

# Verifica:
npx electron-builder --version
```

### **Error: "icon.ico not found"**

```bash
# Solución 1: Crear icono temporal
# Crea un archivo icon.ico de 256x256 en /public/

# Solución 2: Usar icono por defecto
# Elimina la línea "icon": "public/icon.ico" en package.json
```

### **Error: "npm run build" falla**

```bash
# Solución:
npm run build

# Si hay error de Vite:
npm install vite --save-dev
npm run build
```

### **Error: Build muy lento**

```bash
# Optimización:
# 1. Cierra otras apps
# 2. Usa solo un target:
npm run electron:build:win -- --config.win.target=portable

# 3. Limpia caché:
npm run build
rmdir /s /q dist
npm run electron:build:win
```

### **Error: Antivirus bloquea el .exe**

```bash
# Esto es NORMAL para apps sin firmar
# Soluciones:

# 1. Agregar excepción en tu antivirus
Windows Defender → Protección contra virus → Exclusiones → Agregar exclusión

# 2. Firmar el ejecutable (requiere certificado code-signing)
# Más info: https://www.electronjs.org/docs/latest/tutorial/code-signing
```

---

## 🎯 FUNCIONALIDADES ELECTRON

### **APIs Disponibles en el .exe:**

Cuando la app corre como .exe, tiene acceso a:

#### **1. Sistema de Archivos**

```javascript
// Desde cualquier componente React:
if (window.electronAPI) {
  // Seleccionar archivo
  const filePath = await window.electronAPI.selectFile();
  
  // Escanear archivo
  const result = await window.electronAPI.scanFile(filePath);
  
  // Mover a cuarentena
  await window.electronAPI.quarantineFile(filePath);
}
```

#### **2. Información del Sistema**

```javascript
// Obtener info de CPU, RAM, OS
const sysInfo = await window.electronAPI.getSystemInfo();

console.log(sysInfo);
// {
//   platform: 'win32',
//   arch: 'x64',
//   cpus: 8,
//   totalMemory: 16GB,
//   freeMemory: 8GB,
// }
```

#### **3. Red y Conectividad**

```javascript
// Obtener interfaces de red
const networkInfo = await window.electronAPI.getNetworkInfo();

// Interfaz, IP, MAC address, etc.
```

#### **4. Notificaciones del Sistema**

```javascript
// Mostrar notificación de Windows
await window.electronAPI.showNotification({
  title: 'Amenaza Detectada',
  body: 'Se encontró malware en archivo.exe',
});
```

#### **5. Reportes en Disco**

```javascript
// Guardar reporte como JSON
await window.electronAPI.saveReport(reportData);

// Listar reportes guardados
const reports = await window.electronAPI.getSavedReports();

// Leer reporte específico
const report = await window.electronAPI.readReport(filePath);
```

### **Diferencias: Web vs Electron**

| Funcionalidad | Web (navegador) | Electron (.exe) |
|---------------|----------------|-----------------|
| **Escanear archivos locales** | ❌ No | ✅ Sí |
| **Acceso a sistema de archivos** | ❌ Limitado | ✅ Completo |
| **Notificaciones nativas** | 🟡 API web | ✅ Nativas de Windows |
| **Información de hardware** | ❌ No | ✅ CPU, RAM, red |
| **Cuarentena de archivos** | ❌ No | ✅ Sí |
| **Guardar en disco** | 🟡 Downloads | ✅ Donde sea |
| **Configuración de GPU** | ❌ N/A | ✅ Sí (tus consejos) |
| **Permisos de firewall** | ❌ N/A | ✅ Sí (tus consejos) |

---

## 🎮 CONFIGURAR GPU EN WINDOWS (Aplicación .exe)

### **AHORA SÍ Aplican Tus Consejos:**

#### **Paso 1: Configuración de Gráficos**

```bash
1. Windows + I (Configuración)
2. Sistema → Pantalla → Gráficos
3. Examinar → Buscar Shield-Master-2026.exe
4. Opciones → Alto rendimiento
5. Guardar
```

#### **Paso 2: Permisos de Firewall**

```bash
1. Windows Defender Firewall → Permitir una app
2. Cambiar configuración
3. Permitir otra aplicación
4. Examinar → Shield-Master-2026.exe
5. Agregar
6. Marcar "Privada" y "Pública"
7. Aceptar
```

#### **Paso 3: Configuración de Electron (Opcional)**

Edita `electron.js` si quieres forzar GPU:

```javascript
// Al inicio del archivo electron.js
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
```

---

## 📊 ESTADÍSTICAS DE BUILD

### **Tamaño de Archivos:**

```
Instalador NSIS:    ~180 MB
Portable .exe:      ~150 MB
App instalada:      ~250 MB (incluye datos)

Desglose:
- Chromium (Electron):  ~120 MB
- Node.js runtime:      ~30 MB
- Tu código (React):    ~5 MB
- Dependencias:         ~45 MB
```

### **Requisitos del Sistema:**

```
Windows:           10 o superior (64-bit)
RAM mínima:        4 GB
RAM recomendada:   8 GB
Disco:             500 MB libres
Procesador:        Dual-core o superior
GPU:               Integrada o dedicada
```

---

## 🚀 DISTRIBUCIÓN

### **Compartir tu .exe:**

#### **Opción 1: Directo**

```bash
# Comprime el .exe
Shield-Master-2026-Setup-1.0.0.exe → .zip

# Sube a:
- Google Drive
- Dropbox
- WeTransfer
- Mega.nz
```

#### **Opción 2: Portable (Sin instalador)**

```bash
# El archivo portable no necesita instalación
Shield-Master-2026-Portable-1.0.0.exe

# Usuario solo descarga y ejecuta
```

#### **Opción 3: Firma Digital (Profesional)**

```bash
# Para evitar advertencias de SmartScreen
# Requiere certificado code-signing (~$300-500/año)

# Proveedores:
- DigiCert
- Sectigo
- GlobalSign

# Configuración en package.json:
"win": {
  "certificateFile": "cert.pfx",
  "certificatePassword": "password"
}
```

---

## 📝 COMANDOS RÁPIDOS

```bash
# DESARROLLO
npm run dev                    # Web en navegador
npm run electron:dev           # Electron modo desarrollo

# BUILD WEB
npm run build                  # Build para web
npm run preview                # Preview del build

# BUILD ELECTRON
npm run electron:build         # Build todas las plataformas
npm run electron:build:win     # Solo Windows (.exe)
npm run electron:build:mac     # Solo macOS (.dmg)
npm run electron:build:linux   # Solo Linux (.AppImage)

# TESTING
npm run electron               # Ejecutar Electron directo (requiere build previo)
```

---

## ✅ CHECKLIST FINAL

Antes de distribuir tu .exe, verifica:

- [ ] La app abre sin errores
- [ ] Todas las rutas funcionan (Dashboard, DeepScan, etc.)
- [ ] Los gráficos de Recharts se ven bien
- [ ] EmailJS envía reportes correctamente
- [ ] El icono se ve bien en la barra de tareas
- [ ] Las notificaciones de Windows funcionan
- [ ] El instalador crea accesos directos
- [ ] La app se desinstala correctamente
- [ ] No hay errores en la consola
- [ ] La GPU se usa correctamente (si configuraste)

---

## 🎉 ¡LISTO!

Ahora tienes una **aplicación de escritorio REAL** (.exe) de Shield-Master 2026.

### **Qué Lograste:**

✅ Convertir app web → app de escritorio  
✅ Generar instalador profesional para Windows  
✅ Acceso completo al sistema de archivos  
✅ Notificaciones nativas de Windows  
✅ Escaneo de archivos locales (simulado)  
✅ Cuarentena y gestión de amenazas  
✅ Guardado de reportes en disco  
✅ Información de hardware en tiempo real  

### **AHORA SÍ Aplican Tus Consejos:**

✅ Configurar GPU en Windows → **Relevante**  
✅ Permisos de firewall → **Relevante**  
✅ Monitoreo de memoria → **Disponible**  
✅ Acceso a WebSockets nativos → **Sí**  
✅ Configuración de Electron → **Sí**  

---

## 📧 SOPORTE

Si tienes problemas:

1. Revisa la sección "Solución de Problemas"
2. Consulta logs en: `%APPDATA%/shield-master-2026/logs`
3. Abre DevTools en la app: `Ctrl+Shift+I`

---

**Última actualización:** Marzo 7, 2026  
**Versión de la guía:** 1.0  
**Electron version:** 33.3.1  
**electron-builder version:** 25.1.8  

---

**¡Disfruta tu aplicación de escritorio Shield-Master 2026!** 🛡️🚀✨
