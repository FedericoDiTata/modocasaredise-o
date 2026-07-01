# Estudio Modo Casa — Web

Sitio web de Estudio Modo Casa, estudio de diseño de interiores premium de Buenos Aires.

**Live:** https://estudio-modocasa.vercel.app

---

## Stack

| Tech | Versión |
|------|---------|
| Next.js | 16.x (App Router + Turbopack) |
| Tailwind CSS | v4 |
| Framer Motion | 12 |
| Lenis | 1.x (smooth scroll) |
| next-intl | 4.x (ES + EN) |
| TypeScript | strict |

---

## Setup

```bash
git clone https://github.com/brodhia222-dotcom/estudio-modocasa.git
cd estudio-modocasa
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> Las imágenes se sirven desde `https://estudiomodocasa.com/wp-content/uploads/` — necesitás conexión a internet para que carguen.

---

## Estructura

```
app/
├── [locale]/
│   ├── page.tsx              # Home
│   ├── estudio/page.tsx      # El estudio
│   ├── proyectos/page.tsx    # Listado de proyectos
│   ├── proyectos/[slug]/     # Detalle de proyecto
│   └── contacto/page.tsx     # Contacto
components/
├── sections/                 # Secciones de página (Hero, Servicios, etc.)
├── layout/                   # Navbar, Footer
└── ui/                       # Componentes reutilizables
lib/
├── projects.ts               # Data de todos los proyectos
├── motion.ts                 # Variantes de animación compartidas
└── fonts.ts                  # Configuración de tipografías
```

---

## Contenido

Los proyectos se gestionan en `lib/projects.ts`. Cada proyecto tiene:

```ts
{
  id: string          // slug de la URL
  name: string
  category: "Diseño Interior" | "Arquitectura"
  year: string
  location: string
  description: string
  image: string       // URL de WP
  gallery: string[]   // URLs de WP
  alt: string
}
```

---

## Internacionalización

El sitio tiene dos idiomas: español (`/es/`) e inglés (`/en/`).

- `useLocale()` — solo en client components
- `getLocale()` — solo en server components
- Traducciones inline en cada componente con `isEn ? "..." : "..."`

---

## Deploy

```bash
npx vercel --prod --yes
```

---

## Flujo de trabajo en equipo

```bash
# Crear una rama para trabajar
git checkout -b feat/nombre-del-cambio

# Commitear los cambios
git add .
git commit -m "feat: descripción del cambio"

# Subir y abrir PR hacia main
git push origin feat/nombre-del-cambio
```

`main` es la rama de producción — lo que se mergea ahí se puede deployar.

---

## Pendiente

- [ ] Reemplazar testimonios ficticios por textos reales del cliente (`components/sections/Testimonios.tsx`)
- [ ] Agregar logo SVG/PNG del cliente (`components/layout/Navbar.tsx`)
- [ ] Revisar y simplificar textos de todas las páginas con el cliente
