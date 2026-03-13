@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════════
echo    🛡️  SHIELD-MASTER 2026 - CREAR ACCESOS DIRECTOS
echo ════════════════════════════════════════════════════════════════
echo.
echo Este script creará accesos directos en tu escritorio
echo con iconos personalizados para:
echo.
echo   1. Instalar dependencias
echo   2. Ejecutar la aplicación
echo.
echo ════════════════════════════════════════════════════════════════
echo.
pause
echo.

REM Obtener rutas
set DESKTOP=%USERPROFILE%\Desktop
set PROYECTO=%~dp0

echo [1/4] Detectando ubicación del proyecto...
echo 📁 Proyecto: %PROYECTO%
echo 🖥️  Escritorio: %DESKTOP%
echo.

REM Verificar que existen los archivos .bat
if not exist "%PROYECTO%instalar.bat" (
    echo ❌ Error: No se encuentra instalar.bat
    echo.
    echo Asegúrate de ejecutar este script desde la carpeta del proyecto.
    echo.
    pause
    exit /b 1
)

if not exist "%PROYECTO%ejecutar.bat" (
    echo ❌ Error: No se encuentra ejecutar.bat
    echo.
    echo Asegúrate de ejecutar este script desde la carpeta del proyecto.
    echo.
    pause
    exit /b 1
)

echo [2/4] Creando acceso directo: "🛡️ Shield-Master - Instalar.lnk"
powershell -Command "$WS = New-Object -ComObject WScript.Shell; $SC = $WS.CreateShortcut('%DESKTOP%\Shield-Master - Instalar.lnk'); $SC.TargetPath = 'cmd.exe'; $SC.Arguments = '/c \"cd /d \"%PROYECTO%\" && instalar.bat\"'; $SC.WorkingDirectory = '%PROYECTO%'; $SC.Description = 'Instala todas las dependencias de Shield-Master 2026'; $SC.Save()"

if %ERRORLEVEL% EQU 0 (
    echo ✅ Acceso directo "Instalar" creado
) else (
    echo ⚠️  Error al crear acceso directo "Instalar"
)
echo.

echo [3/4] Creando acceso directo: "🛡️ Shield-Master 2026.lnk"
powershell -Command "$WS = New-Object -ComObject WScript.Shell; $SC = $WS.CreateShortcut('%DESKTOP%\Shield-Master 2026.lnk'); $SC.TargetPath = 'cmd.exe'; $SC.Arguments = '/c \"cd /d \"%PROYECTO%\" && ejecutar.bat\"'; $SC.WorkingDirectory = '%PROYECTO%'; $SC.Description = 'Ejecuta Shield-Master 2026 en http://localhost:5173'; $SC.Save()"

if %ERRORLEVEL% EQU 0 (
    echo ✅ Acceso directo "Ejecutar" creado
) else (
    echo ⚠️  Error al crear acceso directo "Ejecutar"
)
echo.

echo [4/4] Intentando asignar icono personalizado...

REM Verificar si existe el icono
if exist "%PROYECTO%public\shield-icon.ico" (
    echo ✅ Icono encontrado: shield-icon.ico
    echo.
    echo Asignando icono a los accesos directos...
    
    powershell -Command "$WS = New-Object -ComObject WScript.Shell; $SC = $WS.CreateShortcut('%DESKTOP%\Shield-Master - Instalar.lnk'); $SC.IconLocation = '%PROYECTO%public\shield-icon.ico,0'; $SC.Save()"
    powershell -Command "$WS = New-Object -ComObject WScript.Shell; $SC = $WS.CreateShortcut('%DESKTOP%\Shield-Master 2026.lnk'); $SC.IconLocation = '%PROYECTO%public\shield-icon.ico,0'; $SC.Save()"
    
    echo ✅ Iconos personalizados asignados
) else (
    echo ⚠️  No se encontró shield-icon.ico en public\
    echo.
    echo 💡 Los accesos directos usarán el icono predeterminado de CMD
    echo.
    echo Para usar un icono personalizado:
    echo   1. Coloca tu archivo .ico en: %PROYECTO%public\shield-icon.ico
    echo   2. Ejecuta este script de nuevo
    echo   3. O clic derecho en el acceso → Propiedades → Cambiar icono
)

echo.
echo ════════════════════════════════════════════════════════════════
echo    ✅ PROCESO COMPLETADO
echo ════════════════════════════════════════════════════════════════
echo.
echo Se han creado en tu escritorio:
echo.
echo   📌 Shield-Master - Instalar.lnk
echo      (Instala todas las dependencias)
echo.
echo   📌 Shield-Master 2026.lnk
echo      (Ejecuta la aplicación)
echo.
echo ════════════════════════════════════════════════════════════════
echo.
echo 🎯 PRÓXIMOS PASOS:
echo.
echo   1. Ve a tu escritorio
echo   2. Doble clic en "Shield-Master - Instalar"
echo   3. Espera que termine la instalación
echo   4. Doble clic en "Shield-Master 2026"
echo   5. Abre http://localhost:5173 en tu navegador
echo.
echo ════════════════════════════════════════════════════════════════
echo.
pause
