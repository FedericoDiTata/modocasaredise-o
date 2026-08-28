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
import { getProjectById } from "@/lib/projects";

/**
 * "La diferencia está en los detalles" — 4 tarjetas que expanden en hover.
 *
 * Se restauró la interacción original (versión que prefirió el cliente): en
 * desktop, al pasar el cursor la tarjeta se expande (4fr vs 1fr) y despliega
 * una galería 2×2. Cambios sobre la versión con placeholders "Foto":
 *  , cada tarjeta usa FOTOS REALES de proyectos (curadas, provisionales).
 *  , las portadas están en escala de grises y pasan a COLOR al interactuar,
 *    igual que la sección "Espacios" de salud.estudiomodocasa.com.
 *
 * NOTA: el mapeo foto→diferenciador es editorial/provisional. Cuando el
 * cliente defina qué imágenes representan cada valor, se reemplazan acá.
 */

const DESKTOP_HEIGHT = 480;

type Diferenciador = {
  id: string;
  title: string;
  blurb: string;
  projectIds: string[];
};

function galleryFor(ids: string[]) {
  return ids.map((id) => {
    const p = getProjectById(id);
    return { src: p?.image ?? "", alt: p?.alt ?? "", placeholder: !p };
  });
}

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
      projectIds: ["hudson", "casa-terravista", "cervino", "nordelta-barrio-el-golf"],
    },
    {
      id: "experiencia",
      title: isEn ? "15 years" : "15 años",
      blurb: isEn
        ? "Over a decade with the finest materials and suppliers in Argentina."
        : "Más de una década con los mejores materiales y proveedores de Argentina.",
      projectIds: ["palacio-estrugamou", "puerto-madero-v-alvear-tower", "salguero-torre-gelly", "sls-puerto-madero"],
    },
    {
      id: "personalizado",
      title: isEn ? "Bespoke\ndesign" : "Diseño\npersonalizado",
      blurb: isEn
        ? "Every project starts from scratch. No two projects alike."
        : "Cada proyecto parte de cero. No hay dos proyectos iguales.",
      projectIds: ["saint-thomas", "cramer", "arcos-belgrano", "aleph"],
    },
    {
      id: "acompanamiento",
      title: isEn ? "Full\nsupport" : "Acompañamiento\ntotal",
      blurb: isEn
        ? "Present at every decision, from the initial sketch to delivery day."
        : "Presentes en cada decisión, desde el boceto inicial hasta el día de entrega.",
      projectIds: ["donna-acqua", "casa-de-verano-pinamar", "palermo-le-parc-alcorta", "arcos-belgrano"],
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
          gridAutoRows: "minmax(180px, 1fr)",
        };
  }, [active, differentiators, isDesktop]);

  const lbGallery = lightbox !== null ? galleryFor(differentiators[lightbox.cat].projectIds) : [];
  const closeLb = useCallback(() => setLightbox(null), []);
  const prevLb = useCallback(() => {
    setLightbox((s) =>
      s
        ? { ...s, idx: (s.idx - 1 + 4) % 4 }
        : null,
    );
  }, []);
  const nextLb = useCallback(() => {
    setLightbox((s) => (s ? { ...s, idx: (s.idx + 1) % 4 } : null));
  }, []);

  return (
    <section className="section bg-dark text-white">
      <div className="container">
        {/* Header */}
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
            const gallery = galleryFor(cat.projectIds);
            const cover = gallery[0];
            return (
              <li
                key={cat.id}
                data-active={isActive}
                onMouseEnter={() => isDesktop && setActive(i)}
                onClick={() => (active === i ? setActive(null) : setActive(i))}
                className="group relative cursor-pointer overflow-hidden border border-white/15 bg-[#111214] min-h-[180px] md:min-h-0 md:min-w-[64px]"
              >
                {/* Cover: foto real en escala de grises (color al activar) */}
                {cover?.src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cover.src}
                    alt={cover.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                    style={{ filter: "grayscale(1)" }}
                  />
                )}

                {/* Galería 2×2 en COLOR (visible al activar) */}
                <div
                  className={`absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {gallery.map((g, gi) => (
                    <button
                      key={gi}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox({ cat: i, idx: gi });
                      }}
                      className="group/img relative overflow-hidden bg-[#0a0b0d]"
                      aria-label={`Ampliar ${g.alt}`}
                    >
                      {g.src && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={g.src}
                          alt={g.alt}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Scrim inferior (solo colapsado) para legibilidad del texto */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-500 ${
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
                    textShadow: "0 2px 12px rgba(0,0,0,0.5)",
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
                    className="absolute bottom-5 left-5 right-5 text-[12.5px] leading-[1.5] text-white/70 md:left-6 md:right-6"
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
