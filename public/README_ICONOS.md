# Placeholder para iconos de Electron

⚠️ **IMPORTANTE**: Debes agregar los iconos antes de generar el .exe

## Iconos Necesarios

### **Para Windows (.ico)**
- **Nombre:** `icon.ico`
- **Tamaño:** 256x256 px
- **Formato:** .ico
- **Herramienta:** https://www.icoconverter.com/

### **Para macOS (.icns)**
- **Nombre:** `icon.icns`
- **Tamaño:** 512x512 px
- **Formato:** .icns
- **Herramienta:** https://cloudconvert.com/png-to-icns

### **Para Linux (.png)**
- **Nombre:** `icon.png`
- **Tamaño:** 512x512 px
- **Formato:** .png

---

## 🎨 Diseño Sugerido (Cyber-Luxury)

```
Tema Shield-Master 2026:
- Escudo negro 🛡️ (OLED Black #000000)
- Detalles rojos vibrantes (#ef4444) para alertas
- Contorno verde neón (#22c55e) para seguridad
- Fondo transparente
```

---

## 📝 Cómo Crear los Iconos

### Opción 1: Desde Cero (Figma/GIMP)

1. Abre Figma Design o GIMP
2. Crea un canvas de 512x512 px
3. Diseña el icono con el tema Cyber-Luxury
4. Exporta como PNG
5. Convierte a .ico y .icns con las herramientas online

### Opción 2: Usar Plantilla

1. Descarga una plantilla de escudo
2. Personaliza colores: negro, rojo, verde neón
3. Exporta en los 3 formatos

### Opción 3: Generador AI

1. Usa DALL-E, Midjourney o similar
2. Prompt: "cyberpunk shield logo, black background, red and neon green accents, minimalist, 512x512"
3. Convierte a los formatos necesarios

---

## ⚙️ Dónde Colocarlos

```
public/
├── icon.ico        ⬅️ Coloca aquí
├── icon.icns       ⬅️ Coloca aquí
└── icon.png        ⬅️ Coloca aquí
```

---

## 🚫 Mientras Tanto (Sin Iconos)

Si generas el .exe sin iconos, usará:
- Icono genérico de Electron (⚡)
- Funcionará, pero no se verá profesional

---

## ✅ Verificar que Están Listos

Antes de ejecutar `build.bat`:

```bash
# Verifica que existen
dir public\icon.ico
dir public\icon.icns
dir public\icon.png

# O en Linux/Mac
ls public/icon.*
```

Si ves los 3 archivos, ¡estás listo! 🎉
