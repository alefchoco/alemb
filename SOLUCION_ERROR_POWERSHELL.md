# 🔧 SOLUCIÓN RÁPIDA - ERROR DE POWERSHELL

## ❌ ERROR

```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because 
running scripts is disabled on this system.
```

---

## ✅ SOLUCIONES (Elige una)

### **🥇 OPCIÓN 1: Usar CMD (MÁS FÁCIL - RECOMENDADO)**

```cmd
1. Presiona: Win + R
2. Escribe: cmd
3. Presiona: Enter
4. Navega a tu proyecto:
   cd "C:\ruta\a\tu\proyecto\shield-master-2026"
5. Ejecuta:
   npm install
```

**O mejor aún, usa los scripts .bat:**

```cmd
# Doble clic en:
instalar.bat      # Instala todo automáticamente
ejecutar.bat      # Ejecuta la aplicación
```

---

### **🥈 OPCIÓN 2: Habilitar PowerShell (PERMANENTE)**

```powershell
# 1. Presiona: Win + X
# 2. Selecciona: "Terminal (Administrador)" o "PowerShell (Administrador)"
# 3. Ejecuta:

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 4. Escribe: Y
# 5. Presiona: Enter
# 6. Ahora ejecuta:

cd C:\ruta\a\tu\proyecto
npm install
```

---

### **🥉 OPCIÓN 3: Bypass Temporal (SIN PERMISOS DE ADMIN)**

```powershell
# En PowerShell normal, ejecuta:

powershell -ExecutionPolicy Bypass -Command "npm install"

# O simplemente:

cmd /c npm install
```

---

## 🚀 SCRIPTS AUTOMÁTICOS INCLUIDOS

### **Ya creé 3 archivos .bat para ti:**

```
✅ instalar.bat      → Instala todas las dependencias
✅ ejecutar.bat      → Ejecuta la aplicación
✅ build-installer.bat → Genera el .exe
```

### **Cómo usar:**

```
1. Ve a la carpeta del proyecto en el Explorador de Windows
2. Doble clic en: instalar.bat
3. Espera a que termine
4. Doble clic en: ejecutar.bat
5. Abre: http://localhost:5173
```

**¡Así de fácil! Sin comandos, sin PowerShell, sin problemas.** ✨

---

## 📋 PASOS DETALLADOS CON CAPTURAS

### **Método CMD (paso a paso):**

```
PASO 1: Abrir CMD
─────────────────────────
Win + R
Escribir: cmd
Enter

PASO 2: Ir a la carpeta del proyecto
─────────────────────────
cd C:\Users\TuUsuario\Desktop\shield-master-2026
(Cambia la ruta por la tuya)

PASO 3: Instalar
─────────────────────────
npm install

PASO 4: Ejecutar
─────────────────────────
npm run dev

PASO 5: Abrir navegador
─────────────────────────
http://localhost:5173
```

---

## 🔍 VERIFICAR QUE NODE.JS ESTÁ INSTALADO

### **En CMD o PowerShell:**

```bash
node --version
# Debería mostrar: v20.x.x o v18.x.x

npm --version
# Debería mostrar: 10.x.x o 9.x.x
```

### **Si no está instalado:**

```
1. Ve a: https://nodejs.org/
2. Descarga: "LTS" (Recomendado)
3. Ejecuta el instalador
4. Reinicia la computadora
5. Intenta de nuevo
```

---

## 🎯 ATAJO VISUAL

### **Crear acceso directo para instalar:**

```
1. Clic derecho en el escritorio → Nuevo → Acceso directo
2. Ubicación: C:\Windows\System32\cmd.exe
3. Argumentos: /k cd "C:\ruta\proyecto" && npm install && pause
4. Nombre: "Instalar Shield-Master"
5. Cambiar icono (opcional)
```

---

## ⚡ SOLUCIÓN ULTRA RÁPIDA

### **Copia y pega en CMD:**

```cmd
cd %USERPROFILE%\Desktop && cd shield-master-2026 && npm install
```

*(Cambia "Desktop" y "shield-master-2026" por tu ruta real)*

---

## 🐛 OTROS ERRORES COMUNES

### **Error: "npm: command not found"**
```
Solución: Instala Node.js desde https://nodejs.org/
```

### **Error: "EACCES: permission denied"**
```
Solución: 
- Windows: Ejecuta CMD como Administrador
- O usa: npm install --no-optional
```

### **Error: "Cannot find module"**
```
Solución:
1. rm -rf node_modules package-lock.json
2. npm install
```

---

## 📞 AYUDA ADICIONAL

### **Si nada funciona:**

```
1. Desinstala Node.js:
   Panel de Control → Programas → Desinstalar Node.js

2. Descarga e instala la última versión LTS:
   https://nodejs.org/

3. Reinicia tu PC

4. Abre CMD (no PowerShell)

5. Ejecuta: npm install
```

---

## ✅ VERIFICACIÓN FINAL

### **Después de instalar, verifica:**

```cmd
# En CMD, ejecuta:

cd tu-proyecto
npm list jspdf

# Debería mostrar:
shield-master-2026@1.0.0
└── jspdf@4.2.0

# Si aparece, todo está bien ✅
```

---

## 🎉 RESUMEN

```
❌ Problema: PowerShell bloquea scripts
✅ Solución 1: Usa CMD (recomendado)
✅ Solución 2: Habilita PowerShell
✅ Solución 3: Usa instalar.bat

📁 Archivos creados:
   ✅ instalar.bat
   ✅ ejecutar.bat
   ✅ build-installer.bat

⏱️ Tiempo: 2 minutos
```

---

**¡Con estos archivos .bat, nunca más tendrás que lidiar con PowerShell!** 🎉
