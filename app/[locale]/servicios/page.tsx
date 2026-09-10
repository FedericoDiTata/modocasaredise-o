"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Página Servicios, ronda 3 (reunión 08/09):
 *  , el estudio se posiciona como ESPECIALISTAS EN INTERIORISMO (se sacó
 *    arquitectura como línea de servicio; la dirección de obra queda dentro
 *    del proceso).
 *  , al entrar va directo a "¿Qué hacemos y cómo trabajamos?" con el proceso
 *    de 7 pasos en ACORDEONES (cada paso despliega una descripción + imagen),
 *    como pidió Máximo ("lo más al llano posible, un desplegable en cada
 *    sección con alguna imagen").
 *
 * Copy provisional (lo afina el equipo de comunicación con el PDF de Francisco).
 * Imágenes de los pasos = placeholder de obras hasta la selección definitiva.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const WP = "https://estudiomodocasa.com/wp-content/uploads";

const proceso = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Entendimiento inicial del proyecto, la unidad y la forma de vivir o trabajar. Definimos juntos los objetivos y el punto de partida.",
    image: `${WP}/2025/06/image-1.jpg`,
  },
  {
    n: "02",
    title: "Anteproyecto",
    desc: "El proyecto toma forma: concepto, plantas, materialidades, iluminación y paleta. Una propuesta clara para tomar decisiones sobre información real.",
    image: `${WP}/2025/06/Estrugamou-02.jpg`,
  },
  {
    n: "03",
    title: "Proyecto ejecutivo",
    desc: "Documentación técnica completa: planos definitivos, detalles constructivos y pliegos. Todo listo para arrancar la obra sin zonas grises.",
    image: `${WP}/2022/12/terravista-2.jpg`,
  },
  {
    n: "04",
    title: "Dirección de obra",
    desc: "Coordinamos contratistas, controlamos la ejecución y seguimos plazos e imprevistos. Vos ves el avance, nosotros resolvemos.",
    image: `${WP}/2025/06/donaaqua_02.jpg`,
  },
  {
    n: "05",
    title: "Gestión y administración",
    desc: "Administración de la obra, proveedores y presupuesto con total transparencia, para que el proyecto avance ordenado de principio a fin.",
    image: `${WP}/2025/06/salguerotg-02.jpg`,
  },
  {
    n: "06",
    title: "Ejecución de obra",
    desc: "Construcción y terminaciones con supervisión permanente del equipo del estudio, cuidando cada detalle hasta el acabado final.",
    image: `${WP}/2025/06/image-2.jpg`,
  },
  {
    n: "07",
    title: "Mobiliario a medida",
    desc: "Diseño y producción del equipamiento a medida que completa cada espacio, con las mejores maderas, lacas y herrajes.",
    image: `${WP}/2023/09/unkanny_v2-004.jpg`,
  },
];

export default function ServiciosPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [open, setOpen] = useState<number>(0);

  return (
    <>
      <main>
        {/* Header */}
        <section className="bg-dark pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
              <motion.p variants={fadeUp} className="eyebrow-light mb-4">
                {isEn ? "Services" : "Servicios"}
              </motion.p>
              <div className="clip-text">
                <motion.h1
                  variants={wipeUp}
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(2.25rem, 5vw, 4rem)",
                    fontWeight: 400,
                    color: "white",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {isEn ? "What we do, and how we work." : "¿Qué hacemos y cómo trabajamos?"}
                </motion.h1>
              </div>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/60"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isEn
                  ? "We are interior design specialists. We accompany each project as a single point of contact —from diagnosis to the delivery of keys— and add custom furniture and a dedicated vertical for healthcare spaces."
                  : "Somos especialistas en interiorismo. Acompañamos cada proyecto como interlocutor único —del diagnóstico a la entrega de llaves— y sumamos mobiliario a medida y una vertical dedicada a espacios para la salud."}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Proceso en acordeones */}
        <section className="section bg-background">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="mb-10 max-w-2xl lg:mb-14"
            >
              <motion.p variants={fadeUp} className="eyebrow mb-4">
                {isEn ? "Process" : "El proceso"}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.75rem)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--fg)",
                }}
              >
                {isEn ? "Seven steps, one team." : "Siete pasos, un solo equipo."}
              </motion.h2>
            </motion.div>

            <div className="border-t border-border">
              {proceso.map((p, i) => {
                const isOpen = open === i;
                return (
                  <div key={p.n} className="border-b border-border">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex w-full items-center gap-5 py-7 text-left lg:gap-10 lg:py-9"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="w-9 shrink-0 leading-none tabular-nums transition-colors duration-500 lg:w-14"
                        style={{
                          fontFamily: "var(--font-inter-tight)",
                          fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                          fontWeight: 300,
                          letterSpacing: "-0.03em",
                          color: isOpen ? "var(--fg)" : "var(--muted)",
                        }}
                      >
                        {p.n}
                      </span>
                      <span
                        className="flex-1 transition-transform duration-500 ease-out group-hover:translate-x-1"
                        style={{
                          fontFamily: "var(--font-inter-tight)",
                          fontSize: "clamp(1.2rem, 2.1vw, 1.7rem)",
                          fontWeight: 400,
                          letterSpacing: "-0.02em",
                          color: "var(--fg)",
                        }}
                      >
                        {p.title}
                      </span>
                      {/* Indicador +/− */}
                      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
                        <span className="absolute h-px w-4 bg-foreground" />
                        <span
                          className="absolute h-4 w-px bg-foreground transition-transform duration-500 ease-out"
                          style={{ transform: isOpen ? "scaleY(0)" : "scaleY(1)" }}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-12 lg:gap-10">
                            <div className="lg:col-span-5 lg:col-start-1 lg:pl-24">
                              <p
                                className="max-w-md text-[15px] leading-relaxed text-muted lg:text-base"
                                style={{ fontFamily: "var(--font-inter)" }}
                              >
                                {p.desc}
                              </p>
                            </div>
                            <motion.div
                              className="lg:col-span-6 lg:col-start-7"
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
                            >
                              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Espacios para la salud */}
        <section className="section bg-dark text-white">
          <div className="container">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <p className="eyebrow-light mb-4">{isEn ? "A dedicated vertical" : "Una vertical propia"}</p>
                <h2
                  className="mb-5"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    color: "white",
                  }}
                >
                  {isEn ? "Healthcare spaces" : "Espacios para la salud"}
                </h2>
                <p className="mb-7 max-w-md text-sm leading-relaxed text-white/60 lg:text-base" style={{ fontFamily: "var(--font-inter)" }}>
                  {isEn
                    ? "Consulting rooms and clinics that balance patient experience, medical functionality and brand aesthetics — with its own specialised site."
                    : "Consultorios y clínicas que equilibran la experiencia del paciente, la funcionalidad médica y la estética de marca — con su propio sitio dedicado."}
                </p>
                <a
                  href="https://salud.estudiomodocasa.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-white pl-7 pr-3 text-sm font-medium text-foreground transition-transform duration-300 hover:scale-[1.02]"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {isEn ? "Visit the healthcare site" : "Ver el sitio de salud"}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 transition-transform duration-300 group-hover:translate-x-0.5">
                    <svg width="13" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                      <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${WP}/2023/09/stthomas_07.jpg`}
                  alt={isEn ? "Healthcare space" : "Espacio para la salud"}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
