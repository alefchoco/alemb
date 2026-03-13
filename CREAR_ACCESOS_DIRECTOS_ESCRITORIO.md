# 🖥️ CREAR ACCESOS DIRECTOS EN EL ESCRITORIO

## 🎯 OBJETIVO
Tener iconos en el escritorio para instalar y ejecutar Shield-Master 2026 con un solo clic.

---

## 📋 MÉTODO 1: Accesos directos con icono personalizado

### **PASO 1: Crear acceso directo para INSTALAR**

```
1. Clic derecho en el Escritorio
2. Nuevo → Acceso directo
3. En "Ubicación", pega esto (CAMBIA LA RUTA):

cmd.exe /c "cd /d C:\Users\alena\Desktop\shield-master-2026 && instalar.bat"

4. Clic en "Siguiente"
5. Nombre: Shield-Master - Instalar
6. Clic en "Finalizar"
```

### **PASO 2: Cambiar el icono**

```
7. Clic derecho en el acceso directo → Propiedades
8. Pestaña "Acceso directo"
9. Botón "Cambiar icono..."
10. Botón "Examinar..."
11. Navega a tu carpeta del proyecto:
    C:\Users\alena\Desktop\shield-master-2026\public\shield-icon.ico
12. Selecciona el archivo .ico
13. Clic en "Aceptar"
14. Clic en "Aplicar"
15. Clic en "Aceptar"
```

---

### **PASO 3: Crear acceso directo para EJECUTAR**

```
Repite los pasos 1-6 pero con estos cambios:

3. Ubicación:
cmd.exe /c "cd /d C:\Users\alena\Desktop\shield-master-2026 && ejecutar.bat"

5. Nombre: Shield-Master 2026

Luego repite los pasos 7-15 para cambiar el icono.
```

---

## 📋 MÉTODO 2: Arrastrar y soltar (MÁS RÁPIDO)

### **Opción A: Crear acceso directo simple**

```
1. Abre la carpeta del proyecto
2. Localiza: instalar.bat
3. Clic derecho → Enviar a → Escritorio (crear acceso directo)
4. Repite con: ejecutar.bat
5. Renombra en el escritorio:
   - "instalar.bat - Acceso directo" → "🛡️ Instalar Shield-Master"
   - "ejecutar.bat - Acceso directo" → "🛡️ Shield-Master 2026"
```

### **Opción B: Cambiar icono después**

```
6. Clic derecho en el acceso directo → Propiedades
7. Cambiar icono... → Examinar...
8. Selecciona: shield-icon.ico
9. Aceptar → Aplicar → Aceptar
```

---

## 📋 MÉTODO 3: Script automático para crear accesos directos

### **Crea un archivo: crear-accesos-escritorio.bat**

```batch
@echo off
echo.
echo ════════════════════════════════════════════════════════════
echo    Creando accesos directos en el escritorio...
echo ════════════════════════════════════════════════════════════
echo.

set DESKTOP=%USERPROFILE%\Desktop
set PROYECTO=%~dp0

echo Creando acceso para INSTALAR...
powershell "$WS = New-Object -ComObject WScript.Shell; $SC = $WS.CreateShortcut('%DESKTOP%\Shield-Master Instalar.lnk'); $SC.TargetPath = 'cmd.exe'; $SC.Arguments = '/c \"cd /d \"%PROYECTO%\" ^&^& instalar.bat\"'; $SC.IconLocation = '%PROYECTO%public\shield-icon.ico'; $SC.Save()"

echo Creando acceso para EJECUTAR...
powershell "$WS = New-Object -ComObject WScript.Shell; $SC = $WS.CreateShortcut('%DESKTOP%\Shield-Master 2026.lnk'); $SC.TargetPath = 'cmd.exe'; $SC.Arguments = '/c \"cd /d \"%PROYECTO%\" ^&^& ejecutar.bat\"'; $SC.IconLocation = '%PROYECTO%public\shield-icon.ico'; $SC.Save()"

echo.
echo ✅ Accesos directos creados en el escritorio
echo.
pause
```

**Uso:**
```
1. Guarda este código como: crear-accesos-escritorio.bat
2. Ponlo en la carpeta del proyecto
3. Doble clic
4. ¡Listo! Aparecen en el escritorio con icono personalizado
```

---

## 🎨 CREAR ICONO PERSONALIZADO (.ICO)

### **Si no tienes shield-icon.ico, créalo:**

#### **Opción 1: Desde una imagen PNG/JPG**

```
1. Ve a: https://convertio.co/es/png-ico/
2. Sube tu logo del escudo verde
3. Configura: 256x256 píxeles
4. Descarga el .ico
5. Guarda como: shield-icon.ico
6. Ponlo en: C:\Users\alena\Desktop\shield-master-2026\public\
```

#### **Opción 2: Usar iconos de Windows**

```
Al cambiar icono (paso 9):
- En lugar de "Examinar"
- Selecciona uno de los iconos predeterminados:
  
  C:\Windows\System32\SHELL32.dll
  (Tiene escudos, engranajes, etc.)
```

---

## 📐 RUTAS IMPORTANTES

### **Cambia estas rutas según tu proyecto:**

```
❌ RUTA DE EJEMPLO:
C:\Users\alena\Desktop\shield-master-2026

✅ TU RUTA REAL:
(Donde esté tu carpeta del proyecto)

Ejemplos:
- C:\Proyectos\shield-master-2026
- D:\Mis Documentos\shield-master-2026
- C:\Users\TuNombre\Downloads\shield-master-2026
```

---

## 🎯 VERIFICACIÓN

### **Después de crear los accesos directos:**

```
✅ En el escritorio deberías ver:
   
   🛡️ Shield-Master Instalar     (con tu icono personalizado)
   🛡️ Shield-Master 2026          (con tu icono personalizado)

✅ Al hacer doble clic en "Instalar":
   - Se abre CMD
   - Instala dependencias
   - Muestra "Instalación completa"

✅ Al hacer doble clic en "Ejecutar":
   - Se abre CMD
   - Inicia el servidor
   - Muestra "http://localhost:5173"
```

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### **Problema: "No se encuentra el archivo .bat"**

```
Solución:
1. Clic derecho en el acceso directo → Propiedades
2. Campo "Destino" debe ser:
   cmd.exe /c "cd /d C:\RUTA\COMPLETA\shield-master-2026 && instalar.bat"
3. Cambia C:\RUTA\COMPLETA\ por tu ruta real
4. Aplicar → Aceptar
```

### **Problema: "No se encuentra shield-icon.ico"**

```
Solución A: Usa icono de Windows
1. Propiedades → Cambiar icono
2. Buscar en: C:\Windows\System32\SHELL32.dll
3. Selecciona un escudo o engranaje
4. Aceptar

Solución B: Crea el .ico
1. Usa https://convertio.co/es/png-ico/
2. Convierte tu logo
3. Guarda en: proyecto\public\shield-icon.ico
```

### **Problema: "El acceso directo no funciona"**

```
Solución:
1. Abre CMD manualmente
2. Ve a la carpeta:
   cd C:\Users\alena\Desktop\shield-master-2026
3. Ejecuta:
   instalar.bat
4. Si funciona aquí, el problema es la ruta del acceso directo
```

---

## 🎨 PERSONALIZACIÓN AVANZADA

### **Cambiar el texto al pasar el mouse:**

```
1. Clic derecho en acceso directo → Propiedades
2. Campo "Comentario":
   Instala todas las dependencias de Shield-Master 2026
3. Aplicar → Aceptar
```

### **Ejecutar minimizado:**

```
1. Propiedades
2. "Ejecutar": Normal → Minimizada
3. Aplicar → Aceptar
```

### **Usar teclas de acceso rápido:**

```
1. Propiedades
2. Campo "Tecla de acceso directo"
3. Presiona: Ctrl + Alt + S (por ejemplo)
4. Ahora puedes ejecutar con Ctrl+Alt+S
```

---

## 🏆 RESULTADO FINAL

```
🖥️ ESCRITORIO:
   ├─ 🛡️ Shield-Master Instalar.lnk
   └─ 🛡️ Shield-Master 2026.lnk

📁 CARPETA PROYECTO:
   ├─ instalar.bat
   ├─ ejecutar.bat
   ├─ crear-accesos-escritorio.bat
   └─ public/
      └─ shield-icon.ico

✨ FUNCIONALIDAD:
   - Un clic para instalar todo
   - Un clic para ejecutar la app
   - Iconos personalizados con tu logo
```

---

## ⚡ RESUMEN RÁPIDO

```
1. Clic derecho en escritorio → Nuevo → Acceso directo
2. Ubicación: cmd.exe /c "cd /d RUTA_PROYECTO && instalar.bat"
3. Nombre: Shield-Master Instalar
4. Clic derecho → Propiedades → Cambiar icono
5. Buscar: proyecto\public\shield-icon.ico
6. Repetir para ejecutar.bat
7. ¡Listo!
```

---

## 🎉 ¡DISFRUTA TU APP!

Ahora tienes acceso rápido desde el escritorio con iconos profesionales.

**Un doble clic y Shield-Master 2026 está funcionando.** 🚀
