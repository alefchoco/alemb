@echo off
echo ========================================
echo   SHIELD-MASTER 2026 - INSTALADOR UNICO
echo ========================================
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no instalado
    echo Descarga: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detectado:
node --version
echo.

REM Verificar npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm no instalado
    pause
    exit /b 1
)

echo [OK] npm detectado:
npm --version
echo.

REM Instalar dependencias si no existen
if not exist "node_modules\" (
    echo ========================================
    echo   INSTALANDO DEPENDENCIAS
    echo ========================================
    echo.
    echo Este proceso tarda 3-5 minutos...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Fallo en instalacion de dependencias
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas
    echo.
)

REM Verificar si existe carpeta public
if not exist "public\" (
    echo [INFO] Creando carpeta public/
    mkdir public
)

echo ========================================
echo   GENERANDO INSTALADOR .EXE
echo ========================================
echo.
echo [INFO] Construyendo aplicacion web...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo el build web
    pause
    exit /b 1
)

echo.
echo [OK] Build web completado
echo.
echo [INFO] Generando instalador NSIS...
echo Este proceso tarda 8-12 minutos
echo.
echo Progreso:
echo [====================] Compilando Electron...
echo.

call npx electron-builder --win --config.win.target=nsis
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Fallo la generacion del instalador
    echo.
    echo Posibles causas:
    echo - Falta electron-builder: npm install electron-builder --save-dev
    echo - Falta electron: npm install electron --save-dev
    echo - Permisos insuficientes
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   EXITO - INSTALADOR GENERADO
echo ========================================
echo.
echo Archivo generado en:
echo   release\Shield-Master-2026-Setup-1.0.0.exe
echo.
echo Tamano: ~180 MB
echo.
echo Caracteristicas del instalador:
echo   [x] Instalacion personalizable
echo   [x] Acceso directo en Escritorio
echo   [x] Acceso directo en Menu Inicio
echo   [x] Desinstalador incluido
echo   [x] Icono personalizado
echo.
echo Para distribuir:
echo   1. Comprime el .exe en .zip (opcional)
echo   2. Sube a Google Drive / Dropbox
echo   3. Comparte el enlace
echo.
pause
