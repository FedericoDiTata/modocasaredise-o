@AGENTS.md

# Estudio Modo Casa — Reglas del proyecto

## Stack exacto

| Tech | Versión | Nota |
|------|---------|------|
| Next.js | 16.2.6 | App Router + Turbopack |
| Tailwind CSS | v4 | Sin tailwind.config — config en CSS |
| Framer Motion | 12 | `motion`, `AnimatePresence`, `useInView`, `useScroll` |
| Lenis | 1.x | Smooth scroll — via `LenisProvider` en layout |
| next-intl | 4.x | Rutas `/[locale]/` — locales: `es` (default), `en` |
| TypeScript | strict | Sin `any` |

## Deploy

```bash
cd web && npx vercel --prod --yes
```

Live: https://estudio-modocasa.vercel.app

## Design tokens

```css
--fg: #08090A   /* negro de marca — NO #000000 ni #0a0a0a */
--bg: #ffffff
--dark: #08090A
--surface: #f7f7f7
--muted: #888888
--border: #e8e8e8
--accent: #08090A  /* ⚠️ también negro — no usar en secciones dark */
```

Fuentes: `var(--font-inter-tight)` / `var(--font-instrument-serif)` / `var(--font-inter)`

## Reglas de código

- `--accent` y `--fg` son negro. En secciones dark usar colores explícitos: `color: "white"` o `color: "rgba(255,255,255,0.7)"`.
- `useLocale()` solo en client components. `getLocale()` en server components.
- Animaciones con `whileInView` siempre necesitan `viewport={viewportConfig}` de `@/lib/motion`.
- `next/image` con `fill` necesita padre con `position: relative` + `overflow-hidden`.
- El Navbar debe estar fuera de cualquier `motion.div` con `position: fixed`.

## Componentes clave

### CardCurtainReveal
```tsx
// Prop extra agregada: active?: boolean (revela sin hover)
<CardCurtainReveal active={activeCards[i]}>
```
El componente hace OR entre `active` e `isMouseIn` — hover sigue funcionando siempre.

### Animación secuencial al scroll (patrón Servicios)
```tsx
const gridRef = useRef(null)
const isInView = useInView(gridRef, { once: true, margin: "-100px" })
const [activeCards, setActiveCards] = useState([false, false, false])
useEffect(() => {
  if (!isInView) return
  const timers = [
    setTimeout(() => setActiveCards((p) => [true, p[1], p[2]]), 0),
    setTimeout(() => setActiveCards((p) => [p[0], true, p[2]]), 700),
    setTimeout(() => setActiveCards((p) => [p[0], p[1], true]), 1400),
  ]
  return () => timers.forEach(clearTimeout)
}, [isInView])
```

## Contenido pendiente de reemplazar

- **Testimonios** — ficticios (aviso en `Testimonios.tsx`). Pedir textos reales a Gustavo.
- **Fotos de proyectos** — Unsplash placeholder. Usar fotos reales del WP: `https://estudiomodocasa.com/wp-content/uploads/`
- **Logo** — texto en código. Pedir SVG/PNG al cliente.
