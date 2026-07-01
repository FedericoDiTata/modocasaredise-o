"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { projects } from "@/lib/projects";

/**
 * Hero editorial estilo "book cover".
 * — Arriba: metadata (línea de estudio) + statement tipográfico grande +
 *   subhead corto + 2 CTAs discretos + índice de obras seleccionadas.
 * — Abajo: UNA imagen estática de proyecto real (no carrusel, sin
 *   rotación, sin Ken Burns, sin "SCROLL" indicator, sin combos italic).
 * — Fondo blanco/off-white — el peso lo hace la tipografía + la foto.
 *
 * Cambio deliberado respecto al pattern "photos passing + text on left"
 * anterior, que gritaba IA.
 */

// Featured hero project — foto real del WP, no Unsplash placeholder.
const featured = projects[0]; // Hudson

export default function Hero() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <section className="relative flex min-h-[100svh] flex-col bg-background text-foreground">
      {/* Top block — text */}
      <div className="flex flex-1 items-end pt-28 pb-10 lg:pt-32 lg:pb-14">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-12 gap-6 lg:gap-10"
          >
            {/* Left — metadata + statement */}
            <div className="col-span-12 lg:col-span-8">
              <motion.p variants={fadeUp} className="eyebrow mb-6">
                {isEn
                  ? "Interior Design & Architecture · Buenos Aires · Since 2010"
                  : "Diseño Interior & Arquitectura · Buenos Aires · Desde 2010"}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="mb-8 text-balance"
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "clamp(2.5rem, 6.5vw, 6rem)",
                  fontWeight: 400,
                  lineHeight: 0.98,
                  letterSpacing: "-0.035em",
                  color: "var(--fg)",
                }}
              >
                {isEn ? (
                  <>
                    Spaces thought
                    <br />
                    from the detail.
                  </>
                ) : (
                  <>
                    Espacios pensados
                    <br />
                    desde el detalle.
                  </>
                )}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="max-w-lg text-base leading-relaxed text-muted lg:text-lg"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isEn
                  ? "High-end interior design and architecture for those who value every decision. Fifteen years shaping residential and commercial spaces in Buenos Aires."
                  : "Diseño interior y arquitectura de alta gama para quienes valoran cada decisión. Quince años proyectando espacios residenciales y comerciales en Buenos Aires."}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-center gap-6"
              >
                <Link
                  href={`/${locale}/proyectos`}
                  className="group inline-flex items-center gap-3 text-sm font-medium tracking-wide text-foreground transition-opacity hover:opacity-70"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  <span
                    className="block h-px w-8 bg-foreground transition-all duration-500 group-hover:w-12"
                    aria-hidden="true"
                  />
                  {isEn ? "View projects" : "Ver proyectos"}
                </Link>
                <Link
                  href={`/${locale}/estudio`}
                  className="text-sm font-medium tracking-wide text-muted transition-colors hover:text-foreground"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {isEn ? "Meet the studio" : "Conocer el estudio"}
                </Link>
              </motion.div>
            </div>

            {/* Right — mini project index (magazine feel) */}
            <div className="col-span-12 lg:col-span-4 lg:pt-4">
              <motion.div variants={fadeUp} className="hairline mb-6" />
              <motion.p variants={fadeUp} className="eyebrow mb-4">
                {isEn ? "Selected works" : "Obras seleccionadas"}
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-0">
                {projects.slice(0, 5).map((p, i) => (
                  <motion.li key={p.id} variants={fadeUp}>
                    <Link
                      href={`/${locale}/proyectos/${p.id}`}
                      className="group flex items-baseline justify-between gap-4 border-b border-border/60 py-3 text-sm transition-colors hover:border-foreground"
                    >
                      <span className="flex items-baseline gap-3">
                        <span
                          className="w-6 text-xs text-muted/60 tabular-nums"
                          style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-foreground transition-transform duration-300 group-hover:translate-x-1"
                          style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                          {p.name}
                        </span>
                      </span>
                      <span
                        className="shrink-0 text-xs text-muted/60 tabular-nums"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                      >
                        {p.year}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom block — single static hero image with credit line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[52svh] min-h-[380px] w-full overflow-hidden"
      >
        <Image
          src={featured.image}
          alt={featured.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Subtle bottom gradient just for text contrast */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Credit line: minimal, editorial, tiny */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container flex flex-wrap items-center justify-between gap-4 py-6 text-white">
            <div className="flex items-baseline gap-3">
              <span
                className="text-[0.65rem] tracking-[0.22em] uppercase text-white/50"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {isEn ? "Featured" : "Destacado"} · 01
              </span>
              <span className="text-white/40" aria-hidden="true">
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
            <span
              className="hidden text-[0.65rem] tracking-[0.22em] uppercase text-white/40 md:inline-block"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {featured.category}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
