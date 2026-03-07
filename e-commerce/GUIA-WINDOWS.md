# 🪟 Guía Completa para Windows - Alena E-commerce

## ⚡ Instalación Rápida (Método Recomendado)

### Paso 1: Verifica que tienes Node.js instalado

1. Abre el **Símbolo del sistema (CMD)**:
   - Presiona `Win + R`
   - Escribe `cmd` y presiona Enter

2. Verifica la instalación de Node.js:
   ```cmd
   node --version
   ```
   
   Deberías ver algo como `v18.x.x` o superior.

3. Si no tienes Node.js instalado:
   - Descárgalo desde: https://nodejs.org/
   - Descarga la versión **LTS (recomendada)**
   - Instala y reinicia tu computadora

### Paso 2: Instala y ejecuta el proyecto

**🎯 MÉTODO MÁS FÁCIL - Doble clic:**

1. Ve a la carpeta del proyecto en el Explorador de Windows
2. **Haz doble clic en `install.bat`**
   - Espera a que termine la instalación (puede tardar 2-5 minutos)
   - Verás un mensaje "INSTALACION COMPLETADA"
3. **Haz doble clic en `start.bat`**
   - Se abrirá una ventana negra (CMD)
   - Verás "Local: http://localhost:5173"
   - Tu navegador debería abrir automáticamente la aplicación
4. **¡Listo!** Ya puedes usar Alena

> ⚠️ **NO CIERRES** la ventana negra mientras uses la aplicación. Esa ventana es el servidor.

### Paso 3: Cuando termines

- Para **detener** el servidor: Presiona `Ctrl + C` en la ventana negra, o simplemente ciérrala
- Para **volver a iniciar**: Haz doble clic en `start.bat` nuevamente

---

## 🔧 Solución de Problemas en Windows

### Problema 1: Error de PowerShell

**Síntoma:**
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

**Solución 1 (MÁS FÁCIL):**
Usa los archivos `.bat` en lugar de PowerShell. Haz doble clic en:
- `install.bat` para instalar
- `start.bat` para ejecutar

**Solución 2 (Si quieres usar PowerShell):**

1. Abre **PowerShell como Administrador**:
   - Presiona `Win + X`
   - Selecciona "Windows PowerShell (Administrador)"
   - o "Terminal (Administrador)" en Windows 11

2. Ejecuta este comando:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. Cuando pregunte, escribe `S` y presiona Enter

4. Cierra PowerShell y ábrelo normalmente

5. Ahora puedes usar:
   ```powershell
   npm install
   npm run dev
   ```

**Solución 3 (Usa CMD en lugar de PowerShell):**

1. Presiona `Win + R`
2. Escribe `cmd` y presiona Enter
3. Navega a la carpeta del proyecto:
   ```cmd
   cd C:\ruta\a\tu\proyecto
   ```
4. Ejecuta:
   ```cmd
   npm install
   npm run dev
   ```

### Problema 2: "No se puede abrir index.html en el navegador"

**Respuesta:**
¡Esto es normal! Este proyecto NO funciona abriendo `index.html` directamente en el navegador.

**¿Por qué?**
- Alena es una aplicación React moderna que usa Vite
- Necesita ser **compilada** y servida por un servidor de desarrollo
- Los archivos `.jsx`, `.tsx` y `.ts` no son entendidos directamente por el navegador

**Solución:**
Siempre inicia el proyecto con:
- `start.bat` (doble clic)
- o `npm run dev` en la terminal

### Problema 3: Error "Cannot find module"

**Síntoma:**
```
Error: Cannot find module 'react'
Error: Cannot find module 'motion/react'
etc.
```

**Solución:**

1. Borra la carpeta `node_modules` (si existe)
2. Ejecuta `install.bat` de nuevo
3. Espera a que termine completamente
4. Luego ejecuta `start.bat`

**Con comandos:**
```cmd
rmdir /s /q node_modules
npm install
npm run dev
```

### Problema 4: Puerto 5173 ya está en uso

**Síntoma:**
```
Port 5173 is in use, trying another one...
```

**Solución:**
- Vite automáticamente usará otro puerto (5174, 5175, etc.)
- Mira en la terminal el nuevo puerto y úsalo en el navegador

**O fuerza un puerto específico:**

Edita `vite.config.ts` y agrega:
```typescript
export default defineConfig({
  server: {
    port: 3000, // Cambia a cualquier puerto que quieras
  },
  // ... resto de la configuración
});
```

### Problema 5: Pantalla blanca o "Cannot GET /"

**Posibles causas y soluciones:**

1. **No iniciaste el servidor:**
   - Ejecuta `start.bat`
   - o `npm run dev`

2. **Estás accediendo a la URL incorrecta:**
   - Usa: `http://localhost:5173`
   - NO abras directamente los archivos `.html`

3. **El servidor falló al iniciar:**
   - Mira la terminal/CMD para errores
   - Normalmente es por módulos faltantes → ejecuta `install.bat` de nuevo

### Problema 6: "npm no se reconoce como comando"

**Síntoma:**
```
'npm' no se reconoce como un comando interno o externo
```

**Solución:**

1. Node.js no está instalado o no está en el PATH

2. Instala Node.js:
   - Ve a: https://nodejs.org/
   - Descarga la versión LTS
   - Instala con las opciones por defecto
   - **IMPORTANTE:** Marca la opción "Add to PATH"

3. Reinicia tu computadora

4. Verifica:
   ```cmd
   node --version
   npm --version
   ```

---

## 📋 Scripts Windows Disponibles

Todos estos archivos están en la raíz del proyecto:

| Archivo | Descripción | Cuándo usarlo |
|---------|-------------|---------------|
| `install.bat` | Instala todas las dependencias | La primera vez, o después de actualizar |
| `start.bat` | Inicia el servidor de desarrollo | Cada vez que quieras trabajar en el proyecto |
| `build.bat` | Compila para producción | Cuando quieras crear una versión final |
| `preview.bat` | Previsualiza la versión compilada | Después de hacer `build.bat` |

---

## 🎯 Flujo de Trabajo Normal

### Primera vez:
1. Descarga/clona el proyecto
2. Doble clic en `install.bat`
3. Espera a que termine (2-5 minutos)
4. Doble clic en `start.bat`
5. ¡Empieza a usar Alena!

### Días siguientes:
1. Doble clic en `start.bat`
2. ¡Listo!

### Si actualizas el proyecto o instalas nuevas dependencias:
1. Doble clic en `install.bat`
2. Espera a que termine
3. Doble clic en `start.bat`

---

## 💡 Consejos y Trucos

### 1. Acceso Rápido
Crea un **acceso directo** de `start.bat` en tu escritorio:
- Click derecho en `start.bat`
- "Enviar a" → "Escritorio (crear acceso directo)"
- Ahora puedes iniciar el proyecto desde tu escritorio

### 2. Mantén la ventana CMD abierta
- Mientras trabajes en Alena, la ventana CMD debe estar abierta
- Es normal que muestre mensajes como "hmr update" o logs
- NO la cierres hasta que termines de trabajar

### 3. Recarga Automática (Hot Reload)
- Si editas el código, los cambios se verán automáticamente en el navegador
- No necesitas reiniciar `start.bat` cada vez que cambies algo

### 4. Múltiples ventanas
- Puedes abrir la aplicación en varios navegadores/pestañas
- Todos apuntarán a `http://localhost:5173`

### 5. Modo sin conexión
- Una vez instaladas las dependencias, no necesitas internet para desarrollar
- Solo necesitas internet para instalar (`install.bat`)

---

## 🚀 Compilar para Producción

Si quieres crear una versión final para subir a un servidor:

1. Doble clic en `build.bat`
2. Espera a que termine
3. Se creará una carpeta `dist/` con todos los archivos compilados
4. Esos archivos en `dist/` son los que subes a tu hosting (Vercel, Netlify, etc.)

Para probar la versión compilada antes de subirla:
- Doble clic en `preview.bat`
- Se abrirá en `http://localhost:4173`

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo usar el proyecto sin internet después de instalarlo?**
R: Sí, solo necesitas internet para la instalación inicial.

**P: ¿Puedo cerrar el CMD mientras uso la aplicación?**
R: No, el CMD es el servidor. Si lo cierras, la aplicación dejará de funcionar.

**P: ¿Por qué tarda tanto `install.bat`?**
R: Descarga miles de archivos pequeños (dependencias de React, TypeScript, etc.). Es normal que tarde 2-5 minutos.

**P: ¿Necesito instalar algo más aparte de Node.js?**
R: No, solo Node.js. Los archivos `.bat` hacen todo lo demás automáticamente.

**P: ¿Puedo usar VSCode o cualquier editor?**
R: ¡Sí! Edita los archivos con tu editor favorito. Los cambios se reflejarán automáticamente.

**P: ¿Qué navegador recomiendan?**
R: Chrome, Firefox, Edge o Safari moderno. Todos funcionan perfectamente.

**P: ¿Cómo actualizo las dependencias?**
R: Ejecuta `install.bat` de nuevo. Se actualizarán automáticamente.

---

## 📞 Soporte Adicional

Si sigues teniendo problemas:

1. **Verifica la versión de Node.js:**
   ```cmd
   node --version
   ```
   Debe ser 18.x.x o superior

2. **Borra todo y empieza de nuevo:**
   ```cmd
   rmdir /s /q node_modules
   del package-lock.json
   ```
   Luego ejecuta `install.bat`

3. **Revisa el archivo de Troubleshooting:**
   - Lee `README.md` sección "Solución de Problemas"

---

**🎉 ¡Disfruta construyendo con Alena!**

Si esta guía te ayudó, ¡compártela con otros desarrolladores en Windows!
