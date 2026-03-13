@echo off
echo ========================================
echo   SHIELD-MASTER 2026 - BUILD SCRIPT
echo ========================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no está instalado
    echo Por favor descarga Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detectado: 
node --version
echo.

REM Verificar si npm está instalado
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm no está instalado
    pause
    exit /b 1
)

echo [OK] npm detectado:
npm --version
echo.

REM Verificar si node_modules existe
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias...
    echo Este proceso puede tardar 3-5 minutos
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Falló la instalación de dependencias
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas correctamente
    echo.
) else (
    echo [OK] Dependencias ya instaladas
    echo.
)

REM Verificar si existe carpeta public con iconos
if not exist "public\" (
    echo [WARNING] No existe carpeta public/
    echo Creando carpeta public/
    mkdir public
    echo.
    echo [INFO] Por favor agrega los iconos en public/:
    echo   - icon.ico (para Windows)
    echo   - icon.icns (para macOS)
    echo   - icon.png (para Linux)
    echo.
)

REM Menú de opciones
:menu
echo ========================================
echo   OPCIONES DE BUILD
echo ========================================
echo.
echo 1. Build completo (Instalador + Portable)
echo 2. Solo instalador NSIS
echo 3. Solo ejecutable portable
echo 4. Ejecutar en modo desarrollo
echo 5. Build web (sin Electron)
echo 6. Salir
echo.
set /p option="Selecciona una opción (1-6): "

if "%option%"=="1" goto build_all
if "%option%"=="2" goto build_nsis
if "%option%"=="3" goto build_portable
if "%option%"=="4" goto dev_mode
if "%option%"=="5" goto build_web
if "%option%"=="6" goto end

echo [ERROR] Opción inválida
echo.
goto menu

:build_all
echo.
echo ========================================
echo   BUILD COMPLETO
echo ========================================
echo.
echo [INFO] Construyendo aplicación web...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Falló el build web
    pause
    exit /b 1
)
echo.
echo [OK] Build web completado
echo.
echo [INFO] Generando instalador y portable...
echo Este proceso puede tardar 8-12 minutos
echo.
call npm run electron:build:win
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Falló el build de Electron
    pause
    exit /b 1
)
echo.
echo [OK] Build completado exitosamente
echo.
echo Archivos generados en: release/
echo   - Shield-Master-2026-Setup-1.0.0.exe (Instalador)
echo   - Shield-Master-2026-Portable-1.0.0.exe (Portable)
echo.
pause
goto end

:build_nsis
echo.
echo ========================================
echo   BUILD INSTALADOR NSIS
echo ========================================
echo.
echo [INFO] Construyendo aplicación web...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Falló el build web
    pause
    exit /b 1
)
echo.
echo [OK] Build web completado
echo.
echo [INFO] Generando instalador NSIS...
echo Este proceso puede tardar 6-8 minutos
echo.
call npm run electron:build:win -- --config.win.target=nsis
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Falló el build del instalador
    pause
    exit /b 1
)
echo.
echo [OK] Instalador generado exitosamente
echo.
echo Archivo generado en: release/
echo   - Shield-Master-2026-Setup-1.0.0.exe
echo.
pause
goto end

:build_portable
echo.
echo ========================================
echo   BUILD PORTABLE
echo ========================================
echo.
echo [INFO] Construyendo aplicación web...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Falló el build web
    pause
    exit /b 1
)
echo.
echo [OK] Build web completado
echo.
echo [INFO] Generando ejecutable portable...
echo Este proceso puede tardar 6-8 minutos
echo.
call npm run electron:build:win -- --config.win.target=portable
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Falló el build portable
    pause
    exit /b 1
)
echo.
echo [OK] Portable generado exitosamente
echo.
echo Archivo generado en: release/
echo   - Shield-Master-2026-Portable-1.0.0.exe
echo.
pause
goto end

:dev_mode
echo.
echo ========================================
echo   MODO DESARROLLO
echo ========================================
echo.
echo [INFO] Iniciando en modo desarrollo...
echo Se abrirá una ventana de Electron automáticamente
echo Presiona Ctrl+C para detener
echo.
call npm run electron:dev
goto end

:build_web
echo.
echo ========================================
echo   BUILD WEB (SIN ELECTRON)
echo ========================================
echo.
echo [INFO] Construyendo aplicación web...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Falló el build web
    pause
    exit /b 1
)
echo.
echo [OK] Build web completado
echo.
echo Archivos generados en: dist/
echo.
echo Para ejecutar:
echo   npm run preview
echo.
pause
goto end

:end
echo.
echo ========================================
echo   GRACIAS POR USAR SHIELD-MASTER 2026
echo ========================================
echo.
