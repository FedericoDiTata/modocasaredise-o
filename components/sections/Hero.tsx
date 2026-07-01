"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useLocale } from "next-intl";
import { projects } from "@/lib/projects";

/**
 * Hero editorial full-bleed con visual dominante y dinamismo genuino.
 *
 * Diferencias respecto a versiones anteriores:
 *   — Sin carrusel de fotos rotando (no "photos passing")
 *   — Sin "SCROLL" cartel + arrow
 *   — No es "text only" ni "text a un costado" — el visual domina
 *   — El dinamismo viene del scroll-parallax + reveal por palabra +
 *     Ken Burns lento + strip inferior de 3 proyectos hovereables
 *
 * Estructura:
 *   Fondo: UNA foto grande de proyecto estática, con Ken Burns lento y
 *          parallax al scroll. Overlay oscuro para legibilidad.
 *   Centro: statement editorial gigante con reveal word-by-word.
 *   Abajo: strip de 3 project cards clickeables + credit line.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const wordWipe: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: EASE },
  },
};

const featured = projects[0];
const thumbs = [projects[1], projects[2], projects[3]];

export default function Hero() {
  const locale = useLocale();
  const isEn = locale === "en";

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: foto de fondo se mueve más lento que el contenido
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  const line1 = isEn ? "Spaces thought" : "Espacios pensados";
  const line2 = isEn ? "from the detail." : "desde el detalle.";

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-dark text-white"
    >
      {/* Fondo — foto full-bleed con Ken Burns lento */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src={featured.image}
            alt={featured.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Overlays gradient — de arriba para navbar, de abajo para strip */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-black/25 to-black/85" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Contenido */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex min-h-[100svh] flex-col justify-between pt-28 pb-8 lg:pt-32"
      >
        {/* Metadata arriba a la derecha */}
        <div className="container">
          <div className="flex justify-end">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="max-w-[16rem] text-right"
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
              }}
            >
              {isEn ? (
                <>
                  Interior Design & Architecture
                  <br />
                  Buenos Aires · Since 2010
                </>
              ) : (
                <>
                  Diseño Interior & Arquitectura
                  <br />
                  Buenos Aires · Desde 2010
                </>
              )}
            </motion.p>
          </div>
        </div>

        {/* Statement central + CTAs */}
        <div className="container">
          <div className="max-w-5xl">
            {/* Reveal por línea con clip-path */}
            <h1
              className="mb-10"
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
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="mb-10 max-w-xl text-base leading-relaxed text-white/75 lg:text-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {isEn
                ? "High-end interior design and architecture. Fifteen years shaping residential and commercial spaces in Buenos Aires."
                : "Diseño interior y arquitectura de alta gama. Quince años proyectando espacios residenciales y comerciales en Buenos Aires."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href={`/${locale}/proyectos`}
                className="inline-flex h-12 items-center gap-3 rounded-full bg-white px-8 text-sm font-medium text-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-white/95"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {isEn ? "View projects" : "Ver proyectos"}
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  aria-hidden="true"
                >
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
        </div>

        {/* Strip inferior — 3 project thumbs hovereables + credit line */}
        <div className="container mt-14 lg:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
            className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8"
          >
            <div className="flex items-baseline gap-3">
              <span
                className="text-[0.6rem] tracking-[0.22em] uppercase text-white/50"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {isEn ? "Featured" : "Destacado"} · 01
              </span>
              <span className="text-white/30" aria-hidden="true">
                /
              </span>
              <Link
                href={`/${locale}/proyectos/${featured.id}`}
                className="text-sm text-white transition-opacity hover:opacity-80"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {featured.name}
                <span className="text-white/50">
                  {" — "}
                  {featured.location} · {featured.year}
                </span>
              </Link>
            </div>

            <ul className="flex items-center gap-3">
              {thumbs.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/${locale}/proyectos/${p.id}`}
                    className="group relative block h-14 w-20 overflow-hidden rounded-md ring-1 ring-white/25 transition-all hover:ring-white/70 md:h-16 md:w-24"
                    aria-label={p.name}
                  >
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      sizes="96px"
                    />
                    <span
                      className="pointer-events-none absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/85 to-transparent px-1.5 pt-4 pb-1 text-[0.55rem] tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {p.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
