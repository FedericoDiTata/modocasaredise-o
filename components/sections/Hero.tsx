"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

/**
 * Hero estilo russiarqs: logo grande y protagonista sobre una secuencia de
 * fotos de proyectos que van pasando (crossfade + ken burns lento), combinado
 * con contenido comercial (posicionamiento + bajada de trayectoria + CTAs)
 * para que la portada no sea solo visual.
 *
 * NOTA: las fotos de fondo son PLACEHOLDER (obras actuales). Se reemplazan por
 * la selección real (La Pampa / Gelly / Aqua) cuando la AM pase el material.
 * Se usan <img> directos a propósito, para no depender del optimizador de Next
 * con las imágenes del WordPress viejo.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const WP = "https://estudiomodocasa.com/wp-content/uploads";

const SLIDES = [
  `${WP}/2022/12/hudson_2025_01.jpg`,
  `${WP}/2025/06/Estrugamou-02.jpg`,
  `${WP}/2025/06/salguerotg-02.jpg`,
  `${WP}/2025/06/donaaqua_02.jpg`,
  `${WP}/2022/12/terravista-2.jpg`,
];

export default function Hero() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-dark text-white">
      {/* Secuencia de fotos de fondo, crossfade */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: i === index ? 1 : 0,
              transform: i === index ? "scale(1.06)" : "scale(1)",
              transition: "opacity 1.6s cubic-bezier(0.22,1,0.36,1), transform 6s ease-out",
            }}
          />
        ))}
      </div>

      {/* Scrim para legibilidad del contenido */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80"
      />

      {/* Contenido: logo protagonista + posicionamiento + CTAs */}
      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="w-full max-w-[640px]"
        >
          <Image
            src="/logo-estudio.png"
            alt="Estudio Modo Casa"
            width={2560}
            height={323}
            priority
            className="mx-auto h-auto w-[78%] max-w-[560px]"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="mt-9 max-w-2xl"
          style={{
            fontFamily: "var(--font-inter-tight)",
            fontSize: "clamp(1.35rem, 2.6vw, 2.15rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "white",
          }}
        >
          {isEn
            ? "High-end interior design and architecture"
            : "Diseño de interiores y arquitectura de alta gama"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 lg:text-base"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {isEn
            ? "15 years designing residential and commercial spaces in Argentina, nationally and internationally."
            : "15 años proyectando espacios residenciales y comerciales en Argentina, a nivel nacional e internacional."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={`/${locale}/proyectos`}
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-white pl-7 pr-3 text-sm font-medium text-foreground transition-transform duration-300 hover:scale-[1.02]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            {isEn ? "View projects" : "Ver proyectos"}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 transition-transform duration-300 group-hover:translate-x-0.5">
              <svg width="13" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </span>
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

      {/* Indicadores de slide */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ver imagen ${i + 1}`}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === index ? 28 : 8,
              background: i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
