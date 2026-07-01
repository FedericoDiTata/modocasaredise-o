"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";
import { Lightbox } from "@/components/ui/lightbox";

/**
 * Grid de 4 tarjetas de diferenciación. En desktop, al pasar el cursor
 * sobre una tarjeta ésta se expande (4fr vs 1fr resto) y despliega su
 * galería como 4 imágenes placeholder en grilla 2×2. En mobile, tap
 * alterna el despliegue.
 *
 * Patrón replicado del Espacios de la landing médica. Todos los
 * contenidos internos son placeholder (dashed border + "próximamente"),
 * se reemplazan cuando el cliente pase fotos reales.
 */

const DESKTOP_HEIGHT = 480;

type Diferenciador = {
  id: string;
  title: string;
  blurb: string;
  gallery: { src: string; alt: string; placeholder: boolean }[];
};

export default function PorQueElegirnos() {
  const locale = useLocale();
  const isEn = locale === "en";

  const differentiators: Diferenciador[] = [
    {
      id: "vision",
      title: isEn ? "Integrated\nvision" : "Visión\nintegral",
      blurb: isEn
        ? "One point of contact for the entire process, from project to delivery."
        : "Un interlocutor único para todo el proceso, desde el proyecto hasta la entrega.",
      gallery: [
        { src: "", alt: "Visión integral, placeholder 1", placeholder: true },
        { src: "", alt: "Visión integral, placeholder 2", placeholder: true },
        { src: "", alt: "Visión integral, placeholder 3", placeholder: true },
        { src: "", alt: "Visión integral, placeholder 4", placeholder: true },
      ],
    },
    {
      id: "experiencia",
      title: isEn ? "15 years" : "15 años",
      blurb: isEn
        ? "A decade with the finest materials and suppliers in Argentina."
        : "Más de una década con los mejores materiales y proveedores de Argentina.",
      gallery: [
        { src: "", alt: "15 años, placeholder 1", placeholder: true },
        { src: "", alt: "15 años, placeholder 2", placeholder: true },
        { src: "", alt: "15 años, placeholder 3", placeholder: true },
        { src: "", alt: "15 años, placeholder 4", placeholder: true },
      ],
    },
    {
      id: "personalizado",
      title: isEn ? "Bespoke\ndesign" : "Diseño\npersonalizado",
      blurb: isEn
        ? "Every project starts from scratch. No two projects alike."
        : "Cada proyecto parte de cero. No hay dos proyectos iguales.",
      gallery: [
        { src: "", alt: "Personalizado, placeholder 1", placeholder: true },
        { src: "", alt: "Personalizado, placeholder 2", placeholder: true },
        { src: "", alt: "Personalizado, placeholder 3", placeholder: true },
        { src: "", alt: "Personalizado, placeholder 4", placeholder: true },
      ],
    },
    {
      id: "acompanamiento",
      title: isEn ? "Full\nsupport" : "Acompañamiento\ntotal",
      blurb: isEn
        ? "Present at every decision, from the initial sketch to delivery day."
        : "Presentes en cada decisión, desde el boceto inicial hasta el día de entrega.",
      gallery: [
        { src: "", alt: "Acompañamiento, placeholder 1", placeholder: true },
        { src: "", alt: "Acompañamiento, placeholder 2", placeholder: true },
        { src: "", alt: "Acompañamiento, placeholder 3", placeholder: true },
        { src: "", alt: "Acompañamiento, placeholder 4", placeholder: true },
      ],
    },
  ];

  const [active, setActive] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [lightbox, setLightbox] = useState<{ cat: number; idx: number } | null>(null);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const gridStyle = useMemo<CSSProperties>(() => {
    const tracks = differentiators
      .map((_, i) => (active === null ? "1fr" : i === active ? "4fr" : "1fr"))
      .join(" ");
    return isDesktop
      ? {
          gridTemplateColumns: tracks,
          gridTemplateRows: "1fr",
          height: DESKTOP_HEIGHT,
        }
      : {
          gridTemplateColumns: "1fr",
          gridAutoRows: "minmax(160px, 1fr)",
        };
  }, [active, differentiators, isDesktop]);

  const lbGallery = lightbox !== null ? differentiators[lightbox.cat].gallery : [];
  const closeLb = useCallback(() => setLightbox(null), []);
  const prevLb = useCallback(() => {
    setLightbox((s) =>
      s
        ? {
            ...s,
            idx:
              (s.idx - 1 + differentiators[s.cat].gallery.length) %
              differentiators[s.cat].gallery.length,
          }
        : null,
    );
  }, [differentiators]);
  const nextLb = useCallback(() => {
    setLightbox((s) =>
      s
        ? { ...s, idx: (s.idx + 1) % differentiators[s.cat].gallery.length }
        : null,
    );
  }, [differentiators]);

  return (
    <section className="section bg-dark text-white">
      <div className="container">
        {/* Header, alineado a la izquierda */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-10 max-w-2xl lg:mb-14"
        >
          <motion.p variants={fadeUp} className="eyebrow-light mb-4">
            {isEn ? "Why choose us" : "Por qué elegirnos"}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mb-6"
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "white",
            }}
          >
            {isEn
              ? "The difference is in the details."
              : "La diferencia está en los detalles."}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-lg text-sm leading-relaxed text-white/55"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isEn
              ? "Hover over each card to explore what defines our practice."
              : "Pasá el cursor sobre cada tarjeta para explorar lo que define nuestra práctica."}
          </motion.p>
        </motion.div>

        {/* Grid de 4 cards que expanden en hover */}
        <ul
          onMouseLeave={() => setActive(null)}
          className="grid w-full gap-2 transition-[grid-template-columns] duration-[600ms] ease-out"
          style={gridStyle}
        >
          {differentiators.map((cat, i) => {
            const isActive = active === i;
            const isShrunkDesktop = isDesktop && active !== null && !isActive;
            const showHorizontal = !isActive && !isShrunkDesktop;
            return (
              <li
                key={cat.id}
                data-active={isActive}
                onMouseEnter={() => isDesktop && setActive(i)}
                onClick={() => (active === i ? setActive(null) : setActive(i))}
                className="group relative cursor-pointer overflow-hidden border border-white/15 bg-[#111214] min-h-[160px] md:min-h-0 md:min-w-[64px]"
              >
                {/* Cover placeholder, cuadrícula sutil de fondo mientras
                    no hay imagen real */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                  aria-hidden="true"
                />

                {/* Galería 2×2 (visible al hover/activo), 4 imágenes placeholder */}
                <div
                  className={`absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {cat.gallery.map((g, gi) => (
                    <button
                      key={gi}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox({ cat: i, idx: gi });
                      }}
                      className="group/img relative flex cursor-pointer items-center justify-center overflow-hidden bg-[#0a0b0d]"
                      aria-label={`Ampliar ${g.alt}`}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute inset-3 border border-dashed border-white/12 transition-colors duration-300 group-hover/img:border-white/30"
                      />
                      <span
                        className="text-white/30 transition-colors duration-300 group-hover/img:text-white/60"
                        style={{
                          fontFamily: "var(--font-inter-tight)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                        }}
                      >
                        Próximamente
                      </span>
                    </button>
                  ))}
                </div>

                {/* Scrim inferior (solo colapsado) para legibilidad del texto */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Título activo, arriba a la izquierda */}
                <h3
                  className={`absolute left-5 top-6 z-10 leading-tight text-white transition-opacity duration-300 md:left-6 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.015em",
                    whiteSpace: "pre-line",
                  }}
                >
                  {cat.title}
                </h3>

                {/* Colapsado en reposo, título grande + blurb debajo */}
                <div
                  className={`absolute inset-0 z-10 transition-opacity duration-300 ${
                    showHorizontal ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <h3
                    className="absolute bottom-[76px] left-5 right-5 leading-tight text-white md:left-6 md:right-6"
                    style={{
                      fontFamily: "var(--font-inter-tight)",
                      fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.015em",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="absolute bottom-5 left-5 right-5 text-[12.5px] leading-[1.5] text-white/60 md:left-6 md:right-6"
                    style={{ fontFamily: "var(--font-inter)", minHeight: "3em" }}
                  >
                    {cat.blurb}
                  </p>
                </div>

                {/* Colapsado angosto (otro activo), título rotado */}
                <span
                  className={`absolute bottom-6 left-6 z-10 hidden -rotate-90 whitespace-nowrap text-white/85 transition-opacity duration-300 md:block ${
                    isShrunkDesktop ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    transformOrigin: "left bottom",
                  }}
                >
                  {cat.title.replace("\n", " ")}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={lbGallery}
            index={lightbox.idx}
            onClose={closeLb}
            onPrev={prevLb}
            onNext={nextLb}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
