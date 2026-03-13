const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════');
console.log('🛡️  SHIELD-MASTER 2026 - GENERADOR DE ICONOS');
console.log('═══════════════════════════════════════════════\n');

const sizes = [512, 256, 128, 64, 48, 32, 16];
const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'icon.svg');

async function generateIcons() {
  try {
    // Verificar que existe el SVG
    if (!fs.existsSync(svgPath)) {
      console.error('❌ No se encontró public/icon.svg');
      process.exit(1);
    }

    console.log('📂 Leyendo icon.svg...');
    const svgBuffer = fs.readFileSync(svgPath);

    // Generar PNG principal (512x512)
    console.log('\n📐 Generando icon.png (512x512)...');
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'icon.png'));
    console.log('   ✅ icon.png creado');

    // Generar iconos en múltiples tamaños
    console.log('\n📐 Generando iconos en múltiples tamaños...');
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, `icon-${size}.png`));
      console.log(`   ✅ icon-${size}.png creado`);
    }

    console.log('\n═══════════════════════════════════════════════');
    console.log('✅ ICONOS PNG GENERADOS EXITOSAMENTE');
    console.log('═══════════════════════════════════════════════\n');

    console.log('📋 Archivos creados en /public/:');
    console.log('   • icon.png (512x512) - Linux');
    console.log('   • icon-512.png');
    console.log('   • icon-256.png');
    console.log('   • icon-128.png');
    console.log('   • icon-64.png');
    console.log('   • icon-48.png');
    console.log('   • icon-32.png');
    console.log('   • icon-16.png\n');

    console.log('⚠️  SIGUIENTE PASO: Crear icon.ico para Windows');
    console.log('═══════════════════════════════════════════════\n');
    
    console.log('Opción 1: Herramienta online (RECOMENDADO)');
    console.log('   → https://convertio.co/es/png-ico/');
    console.log('   → Sube icon-512.png');
    console.log('   → Configura tamaños: 256,128,64,48,32,16');
    console.log('   → Descarga como icon.ico');
    console.log('   → Guarda en /public/icon.ico\n');

    console.log('Opción 2: Línea de comandos (si tienes ImageMagick)');
    console.log('   → magick convert icon-*.png icon.ico\n');

    console.log('Opción 3: Instalar png2icons');
    console.log('   → npm install -g png2icons');
    console.log('   → png2icons public/icon.png public/icon.ico\n');

    console.log('═══════════════════════════════════════════════');
    console.log('🎉 ¡Listo! Ahora convierte a .ico y genera el .exe');
    console.log('═══════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nPosibles causas:');
    console.error('   • Sharp no está instalado: npm install sharp --save-dev');
    console.error('   • El archivo icon.svg está corrupto');
    console.error('   • Permisos insuficientes en /public/\n');
    process.exit(1);
  }
}

// Ejecutar
generateIcons();
