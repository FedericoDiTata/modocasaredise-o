"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { staggerContainer, fadeUp, wipeUp, viewportConfig } from "@/lib/motion";

const WP = "https://estudiomodocasa.com/wp-content/uploads";

// AVISO: Estos testimonios son ficticios (placeholders). Deben ser reemplazados
// por testimonios reales de clientes antes de publicar el sitio.
const testimonials = [
  {
    id: 1,
    quote:
      "Transformaron completamente el espacio. Cada detalle fue pensado con un nivel de cuidado que supera cualquier expectativa.",
    author: "Marcelo R.",
    project: "Proyecto Palermo",
    image: `${WP}/2023/09/unkanny_v2-001.jpg`,
    alt: "Proyecto editorial — Palermo",
    gallery: [
      { src: `${WP}/2023/09/unkanny_v2-001.jpg`, alt: "Unkanny — Palermo" },
      { src: `${WP}/2023/09/unkanny_v2-003.jpg`, alt: "Unkanny — Palermo" },
      { src: `${WP}/2023/09/unkanny_v2-004.jpg`, alt: "Unkanny — Palermo" },
      { src: `${WP}/2023/09/unkanny_v2-005.jpg`, alt: "Unkanny — Palermo" },
    ],
  },
  {
    id: 2,
    quote:
      "Entendieron exactamente lo que buscábamos sin que tengamos que explicarlo dos veces. El resultado superó todo lo que imaginamos.",
    author: "Sofía L.",
    project: "Proyecto Belgrano",
    image: `${WP}/2021/10/MODO-CASA-PEDRO-GOYENA-PH_FEDERICO_KULEKDJIAN-11.jpg`,
    alt: "Proyecto residencial — Belgrano",
    gallery: [
      { src: `${WP}/2021/10/MODO-CASA-PEDRO-GOYENA-PH_FEDERICO_KULEKDJIAN-11.jpg`, alt: "Goyena — Belgrano" },
      { src: `${WP}/2021/10/MODO-CASA-PEDRO-GOYENA-PH_FEDERICO_KULEKDJIAN-01.jpg`, alt: "Goyena — Belgrano" },
      { src: `${WP}/2021/10/MODO-CASA-PEDRO-GOYENA-PH_FEDERICO_KULEKDJIAN-02.jpg`, alt: "Goyena — Belgrano" },
      { src: `${WP}/2021/10/MODO-CASA-PEDRO-GOYENA-PH_FEDERICO_KULEKDJIAN-03.jpg`, alt: "Goyena — Belgrano" },
    ],
  },
  {
    id: 3,
    quote:
      "La calidad del diseño y la seriedad en la ejecución son excepcionales. Los recomendaría sin dudarlo a quien quiera transformar su espacio.",
    author: "Fernando M.",
    project: "Proyecto Puerto Madero",
    image: `${WP}/2021/08/MODO-CASA-SLS-PUERTO-MADERO-PH_FEDERICO_KULEKDJIAN-19-1.jpg`,
    alt: "Penthouse — Puerto Madero",
    gallery: [
      { src: `${WP}/2021/08/MODO-CASA-SLS-PUERTO-MADERO-PH_FEDERICO_KULEKDJIAN-19-1.jpg`, alt: "SLS Puerto Madero" },
      { src: `${WP}/2021/10/MODO-CASA-SLS-PUERTO-MADERO-PH_FEDERICO_KULEKDJIAN-01.jpg`, alt: "SLS Puerto Madero" },
      { src: `${WP}/2021/10/MODO-CASA-SLS-PUERTO-MADERO-PH_FEDERICO_KULEKDJIAN-02.jpg`, alt: "SLS Puerto Madero" },
      { src: `${WP}/2021/10/MODO-CASA-SLS-PUERTO-MADERO-PH_FEDERICO_KULEKDJIAN-03.jpg`, alt: "SLS Puerto Madero" },
    ],
  },
];

export default function Testimonios() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);

  const go = useCallback((idx: number, d: number) => {
    setDir(d);
    setCurrent(idx);
    setPhotoIdx(0);
  }, []);

  const prev = () => go((current - 1 + testimonials.length) % testimonials.length, -1);
  const next = () => go((current + 1) % testimonials.length, 1);

  // Auto-avance de fotos cada 3 segundos
  useEffect(() => {
    if (lightboxOpen) return;
    const t = setInterval(() => {
      setPhotoIdx((p) => (p + 1) % testimonials[current].gallery.length);
    }, 3000);
    return () => clearInterval(t);
  }, [current, lightboxOpen]);

  // Auto-avance de testimonio cada 15 segundos
  useEffect(() => {
    if (lightboxOpen) return;
    const t = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % testimonials.length);
      setPhotoIdx(0);
    }, 15000);
    return () => clearInterval(t);
  }, [lightboxOpen]);

  return (
    <section className="h-screen flex items-center bg-background overflow-hidden">
      <div className="container w-full">
        {/* Header — centered */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-5 text-center"
        >
          <motion.p variants={fadeUp} className="eyebrow mb-4">
            {isEn ? "Testimonials" : "Testimonios"}
          </motion.p>
          <div className="clip-text">
            <motion.h2
              variants={wipeUp}
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "var(--fg)",
              }}
            >
              {isEn ? "What our clients say." : "Lo que dicen nuestros clientes."}
            </motion.h2>
          </div>
        </motion.div>

        {/* Testimonial — centered, full width */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="overflow-hidden">
          <div style={{ display: "grid" }}>
          <AnimatePresence mode="sync" custom={dir} initial={false}>
            <motion.div
              key={current}
              custom={dir}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%" }),
                center: { x: 0 },
                exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%" }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ gridArea: "1 / 1" }}
            >
              {/* Quote text */}
              <p
                className="mb-6"
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "clamp(1.15rem, 2.2vw, 1.75rem)",
                  fontWeight: 300,
                  lineHeight: 1.45,
                  color: "var(--fg)",
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              {/* Project image with outside arrows */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={prev}
                  aria-label={isEn ? "Previous" : "Anterior"}
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  onClick={() => setLightboxOpen(true)}
                  className="relative flex-1 overflow-hidden rounded-xl cursor-zoom-in"
                  style={{ aspectRatio: "16/9", maxHeight: "45vh" }}
                  aria-label="Ver imagen completa"
                >
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={`${current}-${photoIdx}`}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <Image
                        src={testimonials[current].gallery[photoIdx].src}
                        alt={testimonials[current].gallery[photoIdx].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-500" />
                  {/* Zoom hint */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-white/80 backdrop-blur-sm">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M8.5 8.5L11 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M5 3v4M3 5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span style={{ fontFamily: "var(--font-inter-tight)", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                      AMPLIAR
                    </span>
                  </div>
                </button>

                <button
                  onClick={next}
                  aria-label={isEn ? "Next" : "Siguiente"}
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-8" style={{ background: "var(--border)" }} />
                <div className="text-center">
                  <p
                    style={{
                      fontFamily: "var(--font-inter-tight)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--fg)",
                    }}
                  >
                    {testimonials[current].author}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {testimonials[current].project}
                  </p>
                </div>
                <div className="h-px w-8" style={{ background: "var(--border)" }} />
              </div>
            </motion.div>
          </AnimatePresence>
          </div>
          </div>

          {/* Navigation — dots only */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Testimonio ${i + 1}`}
                className="h-1 rounded-full transition-all duration-400"
                style={{
                  width: i === current ? 24 : 8,
                  background: i === current ? "var(--fg)" : "var(--border)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIdx}
        slides={testimonials[current].gallery}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
        styles={{ container: { backgroundColor: "rgba(8,9,10,0.95)" } }}
      />
    </section>
  );
}
