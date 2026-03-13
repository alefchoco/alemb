@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════════
echo    🔍 SHIELD-MASTER 2026 - VERIFICACIÓN DEL SISTEMA
echo ════════════════════════════════════════════════════════════════
echo.

REM Verificar Node.js
echo [1/3] Verificando Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ERROR: Node.js NO está instalado
    echo.
    echo ════════════════════════════════════════════════════════════════
    echo    📥 NECESITAS INSTALAR NODE.JS
    echo ════════════════════════════════════════════════════════════════
    echo.
    echo Node.js es REQUERIDO para ejecutar Shield-Master 2026.
    echo.
    echo 🔗 DESCARGA NODE.JS AQUÍ:
    echo    https://nodejs.org/
    echo.
    echo 💡 INSTRUCCIONES:
    echo    1. Abre el enlace de arriba en tu navegador
    echo    2. Descarga la versión LTS (Recomendada)
    echo    3. Ejecuta el instalador
    echo    4. Marca TODAS las opciones durante la instalación
    echo    5. Reinicia tu PC
    echo    6. Ejecuta este archivo de nuevo
    echo.
    echo ════════════════════════════════════════════════════════════════
    echo.
    echo ¿Quieres abrir el sitio de Node.js ahora? (S/N)
    set /p abrir=
    if /i "%abrir%"=="S" (
        start https://nodejs.org/
    )
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js instalado
node --version
echo.

REM Verificar npm
echo [2/3] Verificando npm...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ERROR: npm NO está disponible
    echo.
    echo npm debería venir con Node.js.
    echo.
    echo 💡 SOLUCIÓN:
    echo    1. Reinstala Node.js desde: https://nodejs.org/
    echo    2. Durante la instalación, marca TODAS las opciones
    echo    3. Reinicia tu PC
    echo.
    pause
    exit /b 1
)

echo ✅ npm instalado
npm --version
echo.

REM Verificar que estamos en la carpeta correcta
echo [3/3] Verificando ubicación del proyecto...
if not exist "package.json" (
    echo.
    echo ❌ ERROR: package.json no encontrado
    echo.
    echo No estás en la carpeta correcta del proyecto.
    echo.
    echo 💡 SOLUCIÓN:
    echo    1. Abre la carpeta shield-master-2026
    echo    2. Busca el archivo package.json
    echo    3. Ejecuta verificar-sistema.bat desde esa carpeta
    echo.
    pause
    exit /b 1
)

echo ✅ Carpeta del proyecto correcta
echo.

echo ════════════════════════════════════════════════════════════════
echo    ✅ TODO ESTÁ LISTO
echo ════════════════════════════════════════════════════════════════
echo.
echo Tu sistema tiene todo lo necesario para ejecutar Shield-Master.
echo.
echo 🚀 PRÓXIMOS PASOS:
echo.
echo    1. Ejecuta: instalar.bat
echo       (Para instalar las dependencias)
echo.
echo    2. Luego ejecuta: ejecutar.bat
echo       (Para iniciar la aplicación)
echo.
echo ════════════════════════════════════════════════════════════════
echo.
pause
