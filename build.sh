#!/bin/bash

echo "========================================"
echo "  SHIELD-MASTER 2026 - BUILD SCRIPT"
echo "========================================"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js no está instalado"
    echo "Por favor descarga Node.js desde: https://nodejs.org/"
    exit 1
fi

echo "[OK] Node.js detectado:"
node --version
echo ""

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm no está instalado"
    exit 1
fi

echo "[OK] npm detectado:"
npm --version
echo ""

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "[INFO] Instalando dependencias..."
    echo "Este proceso puede tardar 3-5 minutos"
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Falló la instalación de dependencias"
        exit 1
    fi
    echo ""
    echo "[OK] Dependencias instaladas correctamente"
    echo ""
else
    echo "[OK] Dependencias ya instaladas"
    echo ""
fi

# Verificar si existe carpeta public con iconos
if [ ! -d "public" ]; then
    echo "[WARNING] No existe carpeta public/"
    echo "Creando carpeta public/"
    mkdir -p public
    echo ""
    echo "[INFO] Por favor agrega los iconos en public/:"
    echo "  - icon.ico (para Windows)"
    echo "  - icon.icns (para macOS)"
    echo "  - icon.png (para Linux)"
    echo ""
fi

# Función para mostrar menú
show_menu() {
    echo "========================================"
    echo "  OPCIONES DE BUILD"
    echo "========================================"
    echo ""
    echo "1. Build completo (todas las plataformas)"
    echo "2. Solo macOS (.dmg)"
    echo "3. Solo Linux (.AppImage y .deb)"
    echo "4. Solo Windows (.exe) [requiere wine en Linux/Mac]"
    echo "5. Ejecutar en modo desarrollo"
    echo "6. Build web (sin Electron)"
    echo "7. Salir"
    echo ""
}

# Loop del menú
while true; do
    show_menu
    read -p "Selecciona una opción (1-7): " option
    
    case $option in
        1)
            echo ""
            echo "========================================"
            echo "  BUILD COMPLETO"
            echo "========================================"
            echo ""
            echo "[INFO] Construyendo aplicación web..."
            npm run build
            if [ $? -ne 0 ]; then
                echo "[ERROR] Falló el build web"
                exit 1
            fi
            echo ""
            echo "[OK] Build web completado"
            echo ""
            echo "[INFO] Generando builds para todas las plataformas..."
            echo "Este proceso puede tardar 10-15 minutos"
            echo ""
            npm run electron:build
            if [ $? -ne 0 ]; then
                echo "[ERROR] Falló el build de Electron"
                exit 1
            fi
            echo ""
            echo "[OK] Build completado exitosamente"
            echo ""
            echo "Archivos generados en: release/"
            echo ""
            break
            ;;
        2)
            echo ""
            echo "========================================"
            echo "  BUILD MACOS"
            echo "========================================"
            echo ""
            echo "[INFO] Construyendo aplicación web..."
            npm run build
            if [ $? -ne 0 ]; then
                echo "[ERROR] Falló el build web"
                exit 1
            fi
            echo ""
            echo "[OK] Build web completado"
            echo ""
            echo "[INFO] Generando .dmg para macOS..."
            echo "Este proceso puede tardar 6-8 minutos"
            echo ""
            npm run electron:build:mac
            if [ $? -ne 0 ]; then
                echo "[ERROR] Falló el build de macOS"
                exit 1
            fi
            echo ""
            echo "[OK] Build de macOS completado"
            echo ""
            echo "Archivo generado en: release/"
            echo "  - Shield-Master-2026-1.0.0.dmg"
            echo ""
            break
            ;;
        3)
            echo ""
            echo "========================================"
            echo "  BUILD LINUX"
            echo "========================================"
            echo ""
            echo "[INFO] Construyendo aplicación web..."
            npm run build
            if [ $? -ne 0 ]; then
                echo "[ERROR] Falló el build web"
                exit 1
            fi
            echo ""
            echo "[OK] Build web completado"
            echo ""
            echo "[INFO] Generando .AppImage y .deb para Linux..."
            echo "Este proceso puede tardar 6-8 minutos"
            echo ""
            npm run electron:build:linux
            if [ $? -ne 0 ]; then
                echo "[ERROR] Falló el build de Linux"
                exit 1
            fi
            echo ""
            echo "[OK] Build de Linux completado"
            echo ""
            echo "Archivos generados en: release/"
            echo "  - Shield-Master-2026-1.0.0.AppImage"
            echo "  - Shield-Master-2026-1.0.0.deb"
            echo ""
            break
            ;;
        4)
            echo ""
            echo "========================================"
            echo "  BUILD WINDOWS"
            echo "========================================"
            echo ""
            echo "[WARNING] Para generar .exe desde Linux/Mac"
            echo "          necesitas wine instalado"
            echo ""
            read -p "¿Continuar? (s/n): " confirm
            if [ "$confirm" != "s" ] && [ "$confirm" != "S" ]; then
                continue
            fi
            echo ""
            echo "[INFO] Construyendo aplicación web..."
            npm run build
            if [ $? -ne 0 ]; then
                echo "[ERROR] Falló el build web"
                exit 1
            fi
            echo ""
            echo "[OK] Build web completado"
            echo ""
            echo "[INFO] Generando .exe para Windows..."
            echo "Este proceso puede tardar 8-12 minutos"
            echo ""
            npm run electron:build:win
            if [ $? -ne 0 ]; then
                echo "[ERROR] Falló el build de Windows"
                exit 1
            fi
            echo ""
            echo "[OK] Build de Windows completado"
            echo ""
            echo "Archivos generados en: release/"
            echo "  - Shield-Master-2026-Setup-1.0.0.exe"
            echo "  - Shield-Master-2026-Portable-1.0.0.exe"
            echo ""
            break
            ;;
        5)
            echo ""
            echo "========================================"
            echo "  MODO DESARROLLO"
            echo "========================================"
            echo ""
            echo "[INFO] Iniciando en modo desarrollo..."
            echo "Se abrirá una ventana de Electron automáticamente"
            echo "Presiona Ctrl+C para detener"
            echo ""
            npm run electron:dev
            break
            ;;
        6)
            echo ""
            echo "========================================"
            echo "  BUILD WEB (SIN ELECTRON)"
            echo "========================================"
            echo ""
            echo "[INFO] Construyendo aplicación web..."
            npm run build
            if [ $? -ne 0 ]; then
                echo "[ERROR] Falló el build web"
                exit 1
            fi
            echo ""
            echo "[OK] Build web completado"
            echo ""
            echo "Archivos generados en: dist/"
            echo ""
            echo "Para ejecutar:"
            echo "  npm run preview"
            echo ""
            break
            ;;
        7)
            echo ""
            echo "========================================"
            echo "  GRACIAS POR USAR SHIELD-MASTER 2026"
            echo "========================================"
            echo ""
            exit 0
            ;;
        *)
            echo "[ERROR] Opción inválida"
            echo ""
            ;;
    esac
done
