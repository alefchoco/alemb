# 🛍️ Alena - E-commerce de Ropa Contemporánea

Plataforma de e-commerce moderna y minimalista con panel de administración completo, construida con React, TypeScript, Tailwind CSS y Motion.

## ✨ Características Principales

### 🌟 Para Clientes
- **Tienda Online** con productos de ropa, accesorios y joyas
- **Sistema de Carrito** con Context API
- **Favoritos** para guardar productos
- **Autenticación** completa (registro, login, Google OAuth simulado)
- **Detalle de Productos** con reseñas y galería de imágenes
- **Sistema de Checkout** con múltiples métodos de pago
- **Blog de Moda** con artículos y tendencias
- **Perfil de Usuario** con historial de pedidos
- **Filtros Avanzados** por categoría, precio y talla
- **Diseño Responsive** con estilo pastel y minimalista

### 🔧 Para Administradores
- **Dashboard Completo** de administración
- **Gestión de Productos** (crear, editar, eliminar)
- **Gestión de Pedidos** con estados y seguimiento
- **Gestión de Envíos** y logística
- **Gestión de Usuarios** y permisos
- **Gestión del Blog** (artículos, categorías)
- **Sistema de Reseñas** y moderación
- **Marketing** con emails directos
- **Mensajes Personalizados** a clientes
- **Editor Visual del Sitio** para personalización
- **Invitación de Colaboradores**

## 🚀 Instalación y Uso

### Prerrequisitos

- **Node.js** versión 18 o superior
- **npm** o **pnpm** (recomendado)

### 🪟 Instalación en Windows (RECOMENDADO - SIN PROBLEMAS)

**Si tienes problemas con PowerShell o npm**, usa los archivos `.bat` incluidos:

1. **Haz doble clic en `install.bat`**
   - Esto instalará automáticamente todas las dependencias
   
2. **Haz doble clic en `start.bat`**
   - Esto iniciará el servidor de desarrollo
   - Se abrirá automáticamente en `http://localhost:5173`

3. **¡Listo!** La aplicación estará funcionando en tu navegador

> ⚠️ **IMPORTANTE:** No puedes simplemente abrir `index.html` en el navegador. Este es un proyecto React con Vite que necesita compilarse y ejecutarse con un servidor de desarrollo.

#### Scripts Windows disponibles:
- `install.bat` - Instala las dependencias
- `start.bat` - Inicia el servidor de desarrollo
- `build.bat` - Compila para producción
- `preview.bat` - Previsualiza la versión de producción

#### Solución al error de PowerShell

Si obtienes el error:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

**Opción 1 (Recomendada):** Usa los archivos `.bat` como se indica arriba.

**Opción 2:** Abre PowerShell como Administrador y ejecuta:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Opción 3:** Usa el Símbolo del Sistema (CMD) en lugar de PowerShell:
1. Presiona `Win + R`
2. Escribe `cmd` y presiona Enter
3. Navega a la carpeta del proyecto: `cd ruta\al\proyecto`
4. Ejecuta: `npm install` y luego `npm run dev`

### 🐧 Instalación en Mac/Linux

### Pasos de Instalación

1. **Descarga o clona el proyecto**
   ```bash
   # Si tienes el código en un repositorio
   git clone <url-del-repositorio>
   cd alena-ecommerce
   ```

2. **Instala las dependencias**
   
   Con npm:
   ```bash
   npm install
   ```
   
   O con pnpm (recomendado):
   ```bash
   pnpm install
   ```

3. **Inicia el servidor de desarrollo**
   
   Con npm:
   ```bash
   npm run dev
   ```
   
   O con pnpm:
   ```bash
   pnpm dev
   ```

4. **Abre tu navegador**
   
   La aplicación estará disponible en: `http://localhost:5173`

### Scripts Disponibles

- `npm run dev` o `pnpm dev` - Inicia el servidor de desarrollo
- `npm run build` o `pnpm build` - Construye la aplicación para producción
- `npm run preview` or `pnpm preview` - Previsualiza la build de producción

## 👤 Credenciales de Prueba

### Usuario Normal
- **Email:** usuario@ejemplo.com
- **Contraseña:** cualquier contraseña

### Usuario Administrador
- **Email:** admin@alena.com
- **Contraseña:** cualquier contraseña

> **Nota:** El sistema de autenticación es simulado para demostración. En producción, se debe integrar con un backend real.

## 🎨 Tecnologías Utilizadas

### Core
- **React 18.3.1** - Framework principal
- **TypeScript** - Tipado estático
- **Vite 6.3.5** - Build tool y dev server

### UI y Estilos
- **Tailwind CSS 4.1.12** - Framework de estilos
- **Motion (Framer Motion) 12.23.24** - Animaciones suaves
- **Radix UI** - Componentes accesibles headless
- **Lucide React** - Iconos modernos

### Estado y Navegación
- **React Router 7.13.0** - Enrutamiento con Data Mode
- **Context API** - Gestión de estado global (Auth, Cart, Favorites, Admin)

### Formularios y Validación
- **React Hook Form 7.55.0** - Gestión de formularios

### UI Components
- **Material UI (@mui/material)** - Componentes adicionales
- **Recharts** - Gráficos y estadísticas
- **React Slick** - Carruseles de productos
- **Sonner** - Notificaciones toast

### Otras Utilidades
- **date-fns** - Manejo de fechas
- **clsx / tailwind-merge** - Gestión de clases CSS
- **react-dnd** - Drag and drop

## 📁 Estructura del Proyecto

```
alena-ecommerce/
├── src/
│   ├── app/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── admin/         # Componentes del panel admin
│   │   │   ├── ui/            # Componentes UI base
│   │   │   ├── BlogCard.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ProductCard.tsx
│   │   ├── context/           # Context API providers
│   │   │   ├── AdminContext.tsx
│   │   │   ├── AuthContext.tsx
│   │   │   ├── CartContext.tsx
│   │   │   ├── FavoritesContext.tsx
│   │   │   └── LanguageContext.tsx
│   │   ├── data/              # Datos mock
│   │   │   ├── blogPosts.ts
│   │   │   ├── orders.ts
│   │   │   ├── products.ts
│   │   │   ├── reviews.ts
│   │   │   └── users.ts
│   │   ├── layouts/           # Layouts
│   │   │   └── RootLayout.tsx
│   │   ├── pages/             # Páginas de la app
│   │   │   ├── Admin.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Shop.tsx
│   │   ├── App.tsx            # Componente principal
│   │   └── routes.ts          # Configuración de rutas
│   └── styles/                # Estilos globales
│       ├── fonts.css
│       ├── index.css
│       ├── tailwind.css
│       └── theme.css
├── package.json
├── vite.config.ts
├── postcss.config.mjs
└── README.md
```

## 🎯 Funcionalidades Detalladas

### Sistema de Autenticación
- Login con email y contraseña
- Registro de nuevos usuarios
- Google OAuth (simulado)
- Gestión de sesión con Context API
- Protección de rutas (admin)

### Carrito de Compras
- Añadir/eliminar productos
- Modificar cantidades
- Calcular totales automáticamente
- Persistencia en Context API
- Quick add desde la tienda

### Sistema de Favoritos
- Marcar productos favoritos
- Ver todos los favoritos
- Gestión independiente del carrito

### Panel de Administración
1. **Productos:** CRUD completo con imágenes, precio, stock
2. **Pedidos:** Visualización, filtrado, cambio de estado
3. **Envíos:** Gestión de tracking y estados
4. **Usuarios:** Administración de usuarios y roles
5. **Blog:** Crear y gestionar artículos
6. **Rese��as:** Moderación de comentarios
7. **Marketing:** Envío de emails masivos
8. **Mensajes:** Comunicación personalizada
9. **Editor Visual:** Personalización del sitio

### Blog
- Artículos de moda y tendencias
- Categorías y tags
- Sistema de búsqueda
- Imágenes destacadas

### Checkout
- Resumen de pedido
- Información de envío
- Múltiples métodos de pago:
  - Tarjeta de crédito
  - PayPal
  - Transferencia
  - Efectivo
- Confirmación de pedido

## 🔐 Notas de Seguridad

> ⚠️ **IMPORTANTE:** Esta es una aplicación de demostración. Para producción:
> - Implementar backend real con base de datos
> - Añadir autenticación segura (JWT, OAuth)
> - Validación server-side
> - Encriptación de contraseñas
> - HTTPS obligatorio
> - Protección contra CSRF y XSS
> - Rate limiting en APIs

## 🌐 Soporte Multi-idioma

La aplicación incluye soporte para múltiples idiomas a través del `LanguageContext`:
- Español (ES)
- Inglés (EN)

## 📱 Responsive Design

El diseño es completamente responsive y se adapta a:
- 📱 Móviles (< 640px)
- 📱 Tablets (640px - 1024px)
- 💻 Desktop (> 1024px)

## 🎨 Personalización

### Colores (theme.css)
El sistema de diseño usa variables CSS personalizables en `/src/styles/theme.css`:
- Colores pastel minimalistas
- Bordes redondeados
- Sombras suaves

### Componentes UI
Todos los componentes en `/src/app/components/ui/` son personalizables y siguen el sistema de diseño.

## 🐛 Solución de Problemas

### Error: "Module not found"
```bash
# Elimina node_modules y reinstala
rm -rf node_modules
npm install
# o
pnpm install
```

### Error: Puerto 5173 en uso
```bash
# El servidor automáticamente usará el siguiente puerto disponible
# O especifica uno diferente en vite.config.ts
```

### Problemas con las dependencias peer
```bash
# Con npm
npm install --legacy-peer-deps

# Con pnpm (maneja automáticamente)
pnpm install
```

## 📝 Próximos Pasos Sugeridos

1. **Integrar Backend Real**
   - Conectar con Supabase, Firebase o tu backend preferido
   - Implementar autenticación real
   - Persistencia de datos en base de datos

2. **Pasarela de Pagos**
   - Integrar Stripe o PayPal real
   - Gestión de transacciones

3. **Optimizaciones**
   - Lazy loading de componentes
   - Optimización de imágenes
   - Cache de datos

4. **Testing**
   - Unit tests con Jest
   - E2E tests con Playwright o Cypress

5. **Deploy**
   - Vercel, Netlify o servidor propio
   - CI/CD con GitHub Actions

## 📄 Licencia

Este proyecto es de uso educativo y demostrativo.

## 🤝 Contribuciones

Este es un proyecto de demostración. Para mejoras o sugerencias, contacta al desarrollador.

---

**Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS**