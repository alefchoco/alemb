# 🔧 Guía de Instalación Detallada - Alena E-commerce

Esta guía te ayudará a configurar y ejecutar el proyecto paso a paso, incluso si eres principiante.

## 📋 Requisitos Previos

### 1. Instalar Node.js

**Windows:**
1. Ve a [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador y sigue las instrucciones
4. Verifica la instalación abriendo CMD o PowerShell y ejecutando:
   ```bash
   node --version
   npm --version
   ```

**Mac:**
1. Abre Terminal
2. Instala Homebrew (si no lo tienes):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Instala Node.js:
   ```bash
   brew install node
   ```
4. Verifica:
   ```bash
   node --version
   npm --version
   ```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
node --version
npm --version
```

### 2. (Opcional pero Recomendado) Instalar pnpm

pnpm es más rápido y eficiente que npm:

```bash
npm install -g pnpm
```

Verifica:
```bash
pnpm --version
```

## 🚀 Instalación del Proyecto

### Paso 1: Navegar a la Carpeta del Proyecto

**Windows (CMD o PowerShell):**
```bash
cd C:\ruta\a\tu\proyecto\alena-ecommerce
```

**Mac/Linux (Terminal):**
```bash
cd /ruta/a/tu/proyecto/alena-ecommerce
```

### Paso 2: Instalar Dependencias

Este proceso descargará todas las librerías necesarias. Puede tomar varios minutos.

**Con npm:**
```bash
npm install
```

**Con pnpm (recomendado):**
```bash
pnpm install
```

**Si ves errores de dependencias peer:**
```bash
npm install --legacy-peer-deps
```

### Paso 3: Iniciar el Servidor de Desarrollo

**Con npm:**
```bash
npm run dev
```

**Con pnpm:**
```bash
pnpm dev
```

Deberías ver algo como:
```
  VITE v6.3.5  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Paso 4: Abrir en el Navegador

1. Abre tu navegador (Chrome, Firefox, Edge, etc.)
2. Ve a: `http://localhost:5173`
3. ¡La aplicación debería estar funcionando! 🎉

## 🐛 Solución de Problemas Comunes

### Error: "node: command not found" o "npm: command not found"

**Causa:** Node.js no está instalado o no está en el PATH.

**Solución:**
1. Reinstala Node.js desde [nodejs.org](https://nodejs.org/)
2. Reinicia tu terminal después de la instalación
3. Verifica: `node --version`

### Error: "Cannot find module" o "Module not found"

**Causa:** Las dependencias no están instaladas correctamente.

**Solución:**
```bash
# Elimina node_modules y package-lock.json
rm -rf node_modules package-lock.json

# En Windows usa:
# rmdir /s node_modules
# del package-lock.json

# Reinstala
npm install
# o
pnpm install
```

### Error: "Port 5173 is already in use"

**Causa:** El puerto 5173 está siendo usado por otra aplicación.

**Solución 1 - Usar otro puerto:**
Vite automáticamente buscará el siguiente puerto disponible (5174, 5175, etc.)

**Solución 2 - Cerrar la aplicación que usa el puerto:**

**Windows:**
```bash
netstat -ano | findstr :5173
taskkill /PID [número-de-proceso] /F
```

**Mac/Linux:**
```bash
lsof -ti:5173 | xargs kill -9
```

### Error: "EACCES" o problemas de permisos

**Causa:** Permisos insuficientes para instalar paquetes.

**Solución (NO uses sudo con npm):**
```bash
# Configura npm para usar un directorio sin privilegios
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Error: "digital envelope routines::unsupported"

**Causa:** Versión de Node.js incompatible (muy antigua).

**Solución:**
Actualiza Node.js a la versión 18 o superior:
```bash
node --version  # Verifica tu versión actual
```
Si es menor a 18, descarga e instala la última versión LTS.

### La página se ve sin estilos o en blanco

**Causa:** Los estilos de Tailwind no se cargaron correctamente.

**Solución:**
```bash
# Detén el servidor (Ctrl+C)
# Limpia la caché
rm -rf node_modules/.vite

# Reinicia
npm run dev
# o
pnpm dev
```

### Errores de TypeScript en el Editor

**Causa:** El editor no reconoce los tipos de TypeScript.

**Solución:**
1. Asegúrate de tener instaladas las extensiones de TypeScript en tu editor
2. En VSCode, recarga la ventana: `Cmd/Ctrl + Shift + P` → "Reload Window"

### Error: "Failed to resolve import"

**Causa:** Rutas de importación incorrectas.

**Solución:**
Este proyecto usa alias de rutas. Asegúrate de que `vite.config.ts` existe y tiene:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

## 📦 Comandos Útiles

```bash
# Iniciar desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ver archivos del proyecto
ls -la  # Mac/Linux
dir     # Windows

# Limpiar todo y empezar de cero
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 🔍 Verificar que Todo Funciona

### Checklist de Funcionalidades:

1. ✅ **Página de Inicio** - Debe mostrar productos destacados
2. ✅ **Navegación** - El header y menú funcionan
3. ✅ **Tienda** - Ver todos los productos y filtros
4. ✅ **Detalle de Producto** - Click en un producto
5. ✅ **Carrito** - Añadir productos al carrito
6. ✅ **Login** - Probar con: admin@alena.com
7. ✅ **Panel Admin** - Acceder después de login como admin
8. ✅ **Blog** - Ver artículos de moda
9. ✅ **Responsive** - Redimensiona el navegador

## 📱 Probar en Dispositivos Móviles

### Opción 1: DevTools del Navegador
1. Abre la aplicación en Chrome
2. Presiona F12 o Cmd/Ctrl + Shift + I
3. Click en el ícono de móvil (Toggle device toolbar)
4. Selecciona diferentes dispositivos

### Opción 2: En tu Teléfono Real
1. Asegúrate de que tu computadora y teléfono estén en la misma red WiFi
2. Inicia el servidor con:
   ```bash
   npm run dev -- --host
   ```
3. Busca la IP de tu computadora:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```
4. En tu teléfono, ve a: `http://[tu-ip]:5173`

## 🏗️ Construir para Producción

```bash
# Construir
npm run build

# La carpeta 'dist' contendrá los archivos optimizados
# Puedes desplegarlos en cualquier servicio de hosting
```

## 🌐 Deploy (Despliegue)

### Vercel (Recomendado - Gratis)
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Vercel detectará automáticamente que es un proyecto Vite
4. ¡Deploy automático!

### Netlify
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `dist` después de hacer build
3. O conecta con GitHub para deploy automático

### GitHub Pages
```bash
npm install -g gh-pages

# En package.json añade:
# "homepage": "https://tu-usuario.github.io/alena-ecommerce"

npm run build
gh-pages -d dist
```

## 💡 Consejos de Desarrollo

1. **Hot Reload**: Los cambios se reflejan automáticamente al guardar
2. **Consola del Navegador**: Abre DevTools (F12) para ver errores
3. **React DevTools**: Instala la extensión para debugging
4. **VSCode**: Recomendado con extensiones:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - ES7+ React/Redux/React-Native snippets

## 📞 ¿Necesitas Ayuda?

Si después de seguir esta guía sigues teniendo problemas:

1. **Verifica las versiones:**
   ```bash
   node --version  # Debe ser 18+
   npm --version
   ```

2. **Revisa los logs:** Los errores suelen dar pistas claras

3. **Busca el error:** Copia el mensaje de error completo y búscalo en Google

4. **Comunidad:** React, Vite y Tailwind tienen comunidades muy activas

## ✅ Proyecto Funcionando

Si ves la página de inicio de Alena con:
- Header con logo y navegación
- Hero section con imagen
- Productos en grid
- Footer
- Estilos pastel y minimalistas

**¡Felicidades! Todo está funcionando correctamente** 🎉

---

**Última actualización:** Marzo 2026
