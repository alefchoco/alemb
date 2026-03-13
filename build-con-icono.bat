@echo off
chcp 65001 >nul
echo.
echo ══════════════════════════════════════════════════════════════
echo    🛡️  SHIELD-MASTER 2026 - INSTALADOR COMPLETO CON ICONO
echo ══════════════════════════════════════════════════════════════
echo.
echo [PASO 1/3] Generando iconos desde SVG...
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js no instalado
    echo 📥 Descarga: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detectado
echo.

REM Verificar carpeta public
if not exist "public\" (
    mkdir public
)

REM Verificar si existe Sharp
echo [INFO] Verificando herramientas de conversión...
if not exist "node_modules\sharp\" (
    echo [INFO] Instalando Sharp (conversión de imágenes)...
    call npm install sharp --save-dev
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Fallo al instalar Sharp
        pause
        exit /b 1
    )
)

REM Generar iconos PNG
echo.
echo [INFO] Convirtiendo SVG a PNG...
node tools\generate-icons.js

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Fallo la generación de iconos PNG
    echo.
    echo Posibles causas:
    echo   • Sharp no instalado correctamente
    echo   • Archivo icon.svg corrupto
    echo   • Permisos insuficientes
    echo.
    pause
    exit /b 1
)

echo.
echo ══════════════════════════════════════════════════════════════
echo    [PASO 2/3] CREAR ICON.ICO PARA WINDOWS
echo ══════════════════════════════════════════════════════════════
echo.
echo 🌐 MÉTODO ONLINE (MÁS FÁCIL):
echo.
echo    1. Abre: https://convertio.co/es/png-ico/
echo    2. Sube: public\icon-512.png
echo    3. Configura tamaños: 256,128,64,48,32,16
echo    4. Descarga como icon.ico
echo    5. Guarda en: public\icon.ico
echo.
echo 💻 MÉTODO ALTERNATIVO (si tienes ImageMagick):
echo.
echo    magick convert public\icon-*.png public\icon.ico
echo.
echo ⚠️  IMPORTANTE: El archivo icon.ico es NECESARIO
echo     para que el instalador tenga el icono del escudo.
echo.

REM Verificar si ya existe icon.ico
if exist "public\icon.ico" (
    echo ✅ icon.ico ya existe - ¡Perfecto!
    echo.
    set ICON_EXISTS=1
) else (
    echo ⏸️  Pausado - Crea icon.ico siguiendo las instrucciones
    echo.
    echo Presiona cualquier tecla cuando hayas creado icon.ico...
    pause >nul
    
    REM Verificar de nuevo
    if exist "public\icon.ico" (
        echo ✅ icon.ico detectado
        echo.
        set ICON_EXISTS=1
    ) else (
        echo.
        echo ⚠️  ADVERTENCIA: icon.ico no encontrado
        echo.
        echo Opciones:
        echo   1. Crear icon.ico ahora (RECOMENDADO)
        echo   2. Continuar sin icono (instalador con icono genérico)
        echo.
        choice /C 12 /M "Selecciona una opción"
        
        if errorlevel 2 (
            echo.
            echo ⚠️  Continuando sin icon.ico
            echo     El instalador usará icono genérico de Electron
            echo.
            set ICON_EXISTS=0
        ) else (
            echo.
            echo 🔄 Regresando al paso 2...
            echo     Crea icon.ico y vuelve a ejecutar este script
            echo.
            pause
            exit /b 0
        )
    )
)

echo.
echo ══════════════════════════════════════════════════════════════
echo    [PASO 3/3] GENERANDO INSTALADOR .EXE
echo ══════════════════════════════════════════════════════════════
echo.

REM Instalar dependencias si no existen
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias (primera vez)...
    echo [INFO] Este proceso tarda 3-5 minutos...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Fallo en instalación de dependencias
        pause
        exit /b 1
    )
    echo.
    echo ✅ Dependencias instaladas
    echo.
)

echo [INFO] Construyendo aplicación web...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Fallo el build web
    pause
    exit /b 1
)

echo.
echo ✅ Build web completado
echo.
echo [INFO] Generando instalador NSIS con icono...
echo [INFO] Este proceso tarda 8-12 minutos
echo.

if "%ICON_EXISTS%"=="1" (
    echo 🛡️  Usando icono personalizado del escudo
) else (
    echo ⚠️  Usando icono genérico
)

echo.

call npx electron-builder --win --config.win.target=nsis
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Fallo la generación del instalador
    echo.
    pause
    exit /b 1
)

echo.
echo ══════════════════════════════════════════════════════════════
echo    ✅ INSTALADOR GENERADO EXITOSAMENTE
echo ══════════════════════════════════════════════════════════════
echo.
echo 📦 Archivo generado en:
echo    release\Shield-Master-2026-Setup-1.0.0.exe
echo.
echo 📊 Tamaño: ~180 MB
echo.
echo 🎨 Icono:
if "%ICON_EXISTS%"=="1" (
    echo    ✅ Escudo verde personalizado 🛡️
) else (
    echo    ⚠️  Icono genérico de Electron
    echo.
    echo    💡 SUGERENCIA: Para tener icono personalizado:
    echo       1. Crea icon.ico siguiendo CREAR_ICONOS.md
    echo       2. Ejecuta este script de nuevo
)
echo.
echo 🚀 El instalador incluye:
echo    ✅ Instalación personalizable
echo    ✅ Acceso directo en Escritorio
echo    ✅ Acceso directo en Menú Inicio
echo    ✅ Desinstalador incluido
echo.
echo 📤 Para distribuir:
echo    1. Comprime el .exe en .zip (opcional)
echo    2. Sube a Google Drive / Dropbox
echo    3. Comparte el enlace
echo.
echo ══════════════════════════════════════════════════════════════
echo.
pause
