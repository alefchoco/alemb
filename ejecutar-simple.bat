@echo off
echo.
echo ════════════════════════════════════════════════════════════════
echo    🚀 SHIELD-MASTER 2026 - EJECUTAR
echo ════════════════════════════════════════════════════════════════
echo.

REM Verificar Node.js
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

REM Verificar node_modules
if not exist "node_modules" (
    echo ⚠️  Las dependencias no están instaladas
    echo.
    echo Por favor ejecuta primero: instalar-simple.bat
    echo.
    pause
    exit /b 1
)

echo ✅ Todo listo, iniciando...
echo.
echo 📍 URL: http://localhost:5173
echo.
echo 💡 ABRE TU NAVEGADOR EN: http://localhost:5173
echo.
echo ════════════════════════════════════════════════════════════════
echo.

REM Ejecutar
npm run dev
