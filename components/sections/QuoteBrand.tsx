"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";

const WORDS_ES = [
  { text: "Cada", accent: false },
  { text: "espacio", accent: false },
  { text: "es", accent: false },
  { text: "una", accent: false },
  { text: "oportunidad", accent: true },
  { text: "de", accent: false },
  { text: "contar", accent: false },
  { text: "una", accent: false },
  { text: "historia.", accent: false },
];

const WORDS_EN = [
  { text: "Every", accent: false },
  { text: "space", accent: false },
  { text: "is", accent: false },
  { text: "an", accent: false },
  { text: "opportunity", accent: true },
  { text: "to", accent: false },
  { text: "tell", accent: false },
  { text: "a", accent: false },
  { text: "story.", accent: false },
];

export default function QuoteBrand() {
  const locale = useLocale();
  const isEn = locale === "en";
  const WORDS = isEn ? WORDS_EN : WORDS_ES;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-dark py-32"
    >
      {/* Subtle radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Horizontal rule lines for structure */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-white/5"
      />

      <motion.div
        style={{ opacity, y }}
        className="container relative z-10 mx-auto px-6 md:px-12"
      >
        {/* Eyebrow */}
        <p
          className="eyebrow-light mb-12"
          style={{ letterSpacing: "0.25em" }}
        >
          {isEn ? "Our philosophy" : "Nuestra filosofía"}
        </p>

        {/* Word-by-word animated quote */}
        <div
          className="max-w-5xl"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            fontStyle: "italic",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "inline-block",
                marginRight: "0.35em",
                color: word.accent ? "var(--accent)" : "white",
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </div>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: WORDS.length * 0.09 + 0.2 }}
          className="mt-12 flex items-center gap-5"
        >
          <div className="h-px w-10 bg-accent" />
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Gustavo Vankelevich, Director, Estudio Modo Casa
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative large number */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 select-none leading-none text-white/[0.03]"
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-inter-tight)",
          fontSize: "clamp(10rem, 25vw, 28rem)",
          fontWeight: 700,
          lineHeight: 0.85,
        }}
      >
        EMC
      </div>
    </section>
  );
}
