# ⚡ Inicio Rápido - Alena E-commerce

## Para Desarrolladores Experimentados

```bash
# 1. Instalar dependencias
npm install
# o
pnpm install

# 2. Iniciar servidor de desarrollo
npm run dev
# o
pnpm dev

# 3. Abrir navegador en http://localhost:5173
```

## Credenciales de Prueba

**Admin:**
- Email: `admin@alena.com`
- Password: `cualquiera`

**Usuario:**
- Email: `usuario@ejemplo.com`
- Password: `cualquiera`

## Rutas Principales

- `/` - Home
- `/shop` - Tienda
- `/cart` - Carrito
- `/login` - Login/Registro
- `/admin` - Panel Admin (requiere login como admin)
- `/blog` - Blog de moda
- `/profile` - Perfil de usuario

## Stack

- React 18.3.1 + TypeScript
- Vite 6.3.5
- Tailwind CSS 4.1.12
- Motion (Framer Motion) 12.23.24
- React Router 7.13.0
- Context API (state management)

## Scripts Disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run preview  # Preview build
```

## Estructura Clave

```
src/
├── app/
│   ├── components/     # Componentes UI
│   ├── context/        # Context API providers
│   ├── data/           # Mock data
│   ├── pages/          # Páginas
│   └── App.tsx
├── styles/             # CSS global
└���─ main.tsx           # Entry point
```

## Problemas Comunes

**Error de módulos:**
```bash
rm -rf node_modules package-lock.json && npm install
```

**Puerto ocupado:**
Vite usará automáticamente el siguiente puerto disponible.

**Sin estilos:**
```bash
rm -rf node_modules/.vite && npm run dev
```

---

Para más detalles, lee [README.md](./README.md) y [SETUP.md](./SETUP.md)
