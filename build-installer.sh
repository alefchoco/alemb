#!/bin/bash

echo "========================================"
echo "  SHIELD-MASTER 2026 - INSTALADOR UNICO"
echo "========================================"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js no instalado"
    echo "Descarga: https://nodejs.org/"
    exit 1
fi

echo "[OK] Node.js detectado:"
node --version
echo ""

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm no instalado"
    exit 1
fi

echo "[OK] npm detectado:"
npm --version
echo ""

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "========================================"
    echo "  INSTALANDO DEPENDENCIAS"
    echo "========================================"
    echo ""
    echo "Este proceso tarda 3-5 minutos..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Fallo en instalacion de dependencias"
        exit 1
    fi
    echo ""
    echo "[OK] Dependencias instaladas"
    echo ""
fi

# Verificar carpeta public
if [ ! -d "public" ]; then
    echo "[INFO] Creando carpeta public/"
    mkdir -p public
fi

echo "========================================"
echo "  GENERANDO INSTALADOR"
echo "========================================"
echo ""
echo "[INFO] Construyendo aplicacion web..."
npm run build
if [ $? -ne 0 ]; then
    echo "[ERROR] Fallo el build web"
    exit 1
fi

echo ""
echo "[OK] Build web completado"
echo ""

# Detectar plataforma
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "[INFO] Generando instalador .dmg para macOS..."
    echo "Este proceso tarda 8-12 minutos"
    echo ""
    npx electron-builder --mac --config.mac.target=dmg
    if [ $? -ne 0 ]; then
        echo ""
        echo "[ERROR] Fallo la generacion del instalador"
        exit 1
    fi
    echo ""
    echo "========================================"
    echo "  EXITO - INSTALADOR GENERADO"
    echo "========================================"
    echo ""
    echo "Archivo generado en:"
    echo "  release/Shield-Master-2026-1.0.0.dmg"
    echo ""
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "[INFO] Generando instalador .deb para Linux..."
    echo "Este proceso tarda 8-12 minutos"
    echo ""
    npx electron-builder --linux --config.linux.target=deb
    if [ $? -ne 0 ]; then
        echo ""
        echo "[ERROR] Fallo la generacion del instalador"
        exit 1
    fi
    echo ""
    echo "========================================"
    echo "  EXITO - INSTALADOR GENERADO"
    echo "========================================"
    echo ""
    echo "Archivo generado en:"
    echo "  release/Shield-Master-2026-1.0.0.deb"
    echo ""
else
    # Windows con Git Bash / WSL
    echo "[INFO] Generando instalador NSIS para Windows..."
    echo "Este proceso tarda 8-12 minutos"
    echo ""
    npx electron-builder --win --config.win.target=nsis
    if [ $? -ne 0 ]; then
        echo ""
        echo "[ERROR] Fallo la generacion del instalador"
        exit 1
    fi
    echo ""
    echo "========================================"
    echo "  EXITO - INSTALADOR GENERADO"
    echo "========================================"
    echo ""
    echo "Archivo generado en:"
    echo "  release/Shield-Master-2026-Setup-1.0.0.exe"
    echo ""
fi

echo "Para distribuir:"
echo "  1. Comprime el instalador en .zip (opcional)"
echo "  2. Sube a Google Drive / Dropbox"
echo "  3. Comparte el enlace"
echo ""
