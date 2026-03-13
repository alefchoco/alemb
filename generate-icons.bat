@echo off
echo ========================================
echo   SHIELD-MASTER 2026 - GENERADOR DE ICONOS
echo ========================================
echo.
echo [INFO] Generando iconos desde SVG...
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no instalado
    echo Descarga: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si existe Sharp
if not exist "node_modules\sharp\" (
    echo [INFO] Instalando Sharp (herramienta de conversion)...
    call npm install sharp --save-dev
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Fallo al instalar Sharp
        pause
        exit /b 1
    )
)

REM Generar iconos PNG
echo [INFO] Ejecutando generador de iconos...
node tools\generate-icons.js

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Fallo la generacion de iconos PNG
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SIGUIENTE PASO: CREAR ICON.ICO
echo ========================================
echo.
echo Metodo 1: Online (MAS FACIL)
echo   1. Ve a: https://convertio.co/es/png-ico/
echo   2. Sube public\icon-512.png
echo   3. Configura tamanos: 256,128,64,48,32,16
echo   4. Descarga como icon.ico
echo   5. Guarda en public\icon.ico
echo.
echo Metodo 2: Automatico con ImageMagick
echo   (Si tienes ImageMagick instalado)
echo   magick convert public\icon-*.png public\icon.ico
echo.
echo Despues de crear icon.ico:
echo   ejecuta: build-installer.bat
echo.
pause
