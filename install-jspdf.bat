@echo off
chcp 65001 >nul
echo.
echo ══════════════════════════════════════════════════════════════
echo    🛡️  SHIELD-MASTER 2026 - INSTALACIÓN DE JSPDF
echo ══════════════════════════════════════════════════════════════
echo.
echo [INFO] Instalando dependencia para generar PDFs...
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

REM Instalar jsPDF
echo [PASO 1/2] Instalando jsPDF...
call npm install jspdf
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Error al instalar jsPDF
    pause
    exit /b 1
)

echo.
echo ✅ jsPDF instalado correctamente
echo.

REM Verificar instalación
echo [PASO 2/2] Verificando instalación...
call npm list jspdf >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Advertencia: No se pudo verificar la instalación
) else (
    echo ✅ Verificación exitosa
)

echo.
echo ══════════════════════════════════════════════════════════════
echo    ✅ INSTALACIÓN COMPLETA
echo ══════════════════════════════════════════════════════════════
echo.
echo Ahora puedes:
echo.
echo 1. Ejecutar la aplicación:
echo    npm run dev
echo.
echo 2. Probar descarga de PDFs:
echo    - Ve a "Reportes"
echo    - Click en "Descargar PDF" o "PDF Detallado"
echo.
echo 3. Generar instalador .exe:
echo    build-installer.bat
echo.
echo ══════════════════════════════════════════════════════════════
echo.
pause
