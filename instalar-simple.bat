@echo off
echo.
echo ════════════════════════════════════════════════════════════════
echo    🛡️  SHIELD-MASTER 2026 - INSTALADOR SIMPLE
echo ════════════════════════════════════════════════════════════════
echo.

REM Verificar Node.js primero
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js no está instalado
    echo.
    echo Por favor ejecuta primero: verificar-sistema.bat
    echo.
    pause
    exit /b 1
)

REM Verificar npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm no está disponible
    echo.
    echo Por favor ejecuta primero: verificar-sistema.bat
    echo.
    pause
    exit /b 1
)

echo ✅ Iniciando instalación...
echo.
echo Esto puede tardar 2-5 minutos. Por favor espera...
echo.

REM Instalar dependencias
npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ════════════════════════════════════════════════════════════════
    echo    ✅ INSTALACIÓN COMPLETA
    echo ════════════════════════════════════════════════════════════════
    echo.
    echo Ahora puedes ejecutar la aplicación:
    echo    ejecutar.bat
    echo.
) else (
    echo.
    echo ════════════════════════════════════════════════════════════════
    echo    ❌ ERROR EN LA INSTALACIÓN
    echo ════════════════════════════════════════════════════════════════
    echo.
    echo Intenta esto:
    echo    1. Cierra todas las ventanas
    echo    2. Ejecuta: verificar-sistema.bat
    echo    3. Ejecuta: instalar-simple.bat de nuevo
    echo.
)

pause
