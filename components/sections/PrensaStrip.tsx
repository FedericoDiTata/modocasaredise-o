"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Franja de prensa real para el home. Reemplaza a los testimonios ficticios
 * (el cliente pidió no usar testimonios armados). Prueba social legítima:
 * mastheads de los medios donde apareció el estudio, en grises → color al
 * hover, con link a la página de Prensa. Los logos reales (SVG) reemplazan
 * estos mastheads tipográficos cuando estén disponibles.
 */

const medios = [
  "Forbes",
  "La Nación",
  "Clarín",
  "Infobae",
  "iProfesional",
  "Newsweek",
  "Perfil",
  "La Voz",
];

export default function PrensaStrip() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <section className="section bg-background">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-md">
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              {isEn ? "Press" : "Prensa"}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
              }}
            >
              {isEn ? "Featured in leading media." : "Nos leés en los principales medios."}
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href={`/${locale}/prensa`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {isEn ? "See all press" : "Ver toda la prensa"}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-2 gap-px border-l border-t border-border sm:grid-cols-4"
        >
          {medios.map((m) => (
            <motion.div
              key={m}
              variants={fadeUp}
              className="group flex h-20 items-center justify-center border-b border-r border-border px-4"
            >
              <span
                className="text-xl text-muted/60 transition-colors duration-300 group-hover:text-foreground lg:text-2xl"
                style={{ fontFamily: "var(--font-serif), Georgia, serif", letterSpacing: "-0.01em" }}
              >
                {m}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
