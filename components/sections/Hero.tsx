"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLocale } from "next-intl";

/**
 * Hero minimalista, todo centrado. Sin imágenes (placeholder gradient
 * de fondo), sin metadata en corners, sin credit line, sin strip
 * inferior de thumbs. Solo statement, subhead y CTAs, todo alineado
 * verticalmente.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const wordWipe: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: EASE },
  },
};

export default function Hero() {
  const locale = useLocale();
  const isEn = locale === "en";

  const line1 = isEn ? "Spaces thought" : "Espacios pensados";
  const line2 = isEn ? "from the detail." : "desde el detalle.";

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-dark text-white">
      {/* Placeholder de fondo, sin imagen. Gradient radial sutil para dar
          profundidad y una textura noise SVG bajísima para que no sea un
          bloque plano de color. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0) 70%), linear-gradient(180deg, #0d0e10 0%, #08090a 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Contenido, todo centrado */}
      <div className="container relative z-10 flex flex-col items-center justify-center text-center">
        <h1
          className="mb-8 lg:mb-10"
          style={{
            fontFamily: "var(--font-inter-tight)",
            fontSize: "clamp(2.75rem, 8vw, 8rem)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: "white",
          }}
        >
          <span className="clip-text">
            <motion.span
              variants={wordWipe}
              initial="hidden"
              animate="visible"
              className="block"
            >
              {line1}
            </motion.span>
          </span>
          <span className="clip-text">
            <motion.span
              variants={wordWipe}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="block"
            >
              {line2}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="mb-10 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {isEn
            ? "High-end interior design and architecture. Fifteen years shaping residential and commercial spaces in Buenos Aires."
            : "Diseño interior y arquitectura de alta gama. Quince años proyectando espacios residenciales y comerciales en Buenos Aires."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={`/${locale}/proyectos`}
            className="inline-flex h-12 items-center gap-3 rounded-full bg-white px-8 text-sm font-medium text-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-white/95"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            {isEn ? "View projects" : "Ver proyectos"}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path
                d="M1 5H13M13 5L9 1M13 5L9 9"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </Link>
          <Link
            href={`/${locale}/estudio`}
            className="inline-flex h-12 items-center rounded-full border border-white/40 px-7 text-sm font-medium text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            {isEn ? "Meet the studio" : "Conocer el estudio"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
