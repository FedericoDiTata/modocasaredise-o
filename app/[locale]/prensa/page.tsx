"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Página Prensa, nueva. El cliente pidió cargar TODA la prensa (importante
 * para posicionamiento/SEO del estudio y del CEO). El listado sale de la web
 * actual (estudiomodocasa.com/prensa). Los links reales a cada nota los pasa
 * la account manager; por ahora quedan como placeholder (#).
 */

type Nota = { medio: string; fecha: string; titulo?: string; url?: string };

const notas: Nota[] = [
  { medio: "LN Propiedades", fecha: "Abril 2026", titulo: "Salón del Mueble de Milán: las 5 tendencias de interiorismo y diseño" },
  { medio: "LN Propiedades", fecha: "Diciembre 2025", titulo: "Las tendencias de deco que se imponen esta temporada" },
  { medio: "LN Propiedades", fecha: "Septiembre 2025", titulo: "Comprar para reciclar: cómo remodelar un departamento de los 80" },
  { medio: "Forbes", fecha: "Septiembre 2025", titulo: "Alta gama, ciudad y turistas activan el mercado de estas propiedades en Buenos Aires" },
  { medio: "Infobae", fecha: "Septiembre 2025", titulo: "Nuevas formas de habitar el lujo como experiencia en el diseño interior y la arquitectura" },
  { medio: "Ministerio de Diseño", fecha: "Septiembre 2025", titulo: "Apartamento en Palacio Estrugamou, Buenos Aires" },
  { medio: "La Nación", fecha: "Septiembre 2025", titulo: "Cómo refaccionar para no sentir que los espacios quedan grandes" },
  { medio: "iProfesional", fecha: "Agosto 2025", titulo: "Empezaron con inversión mínima y hoy lideran el interiorismo" },
  { medio: "Clarín", fecha: "Agosto 2025" },
  { medio: "Clarín ARQ", fecha: "Abril 2023", titulo: "Vivir el cielo cosmopolita con elegancia" },
  { medio: "La Voz", fecha: "Marzo 2023", titulo: "Qué espacios predominan a la hora de hacer o reformar ambientes" },
  { medio: "Noticias · Perfil", fecha: "Febrero 2023", titulo: "Cuáles son las tendencias del 2023 en diseño de hogar" },
  { medio: "Mustique", fecha: "Enero 2023", titulo: "Diseñar espacios a medida" },
  { medio: "Newsweek", fecha: "Noviembre 2022" },
  { medio: "El Planeta Urbano", fecha: "Noviembre 2022" },
  { medio: "Noticias · Perfil", fecha: "Octubre 2022", titulo: "Cómo equilibrar lo femenino y lo masculino en la decoración del hogar" },
  { medio: "La Nación", fecha: "Septiembre 2022", titulo: "Deco post-pandemia: interiorismo funcional" },
  { medio: "D&D", fecha: "2022", titulo: "Crónica del Piso 35" },
  { medio: "El Constructor", fecha: "2022" },
  { medio: "Revista Para Tí Deco", fecha: "Abril 2018" },
];

export default function PrensaPage() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <>
      <main>
        {/* Header */}
        <section className="bg-dark pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
              <motion.p variants={fadeUp} className="eyebrow-light mb-4">
                {isEn ? "Press" : "Prensa"}
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
                  {isEn ? "In the press." : "En los medios."}
                </motion.h1>
              </div>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/60"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isEn
                  ? "Coverage of the studio's projects and vision across leading design and lifestyle media."
                  : "Cobertura de los proyectos y la mirada del estudio en los principales medios de diseño y lifestyle."}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Listado */}
        <section className="section bg-background">
          <div className="container">
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="border-t border-border"
            >
              {notas.map((n, i) => (
                <motion.li key={i} variants={fadeUp}>
                  <a
                    href={n.url ?? "#"}
                    target={n.url ? "_blank" : undefined}
                    rel={n.url ? "noopener noreferrer" : undefined}
                    className="group grid grid-cols-1 gap-1 border-b border-border py-6 transition-colors duration-300 hover:bg-surface sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8 sm:px-2"
                  >
                    <div>
                      <span
                        className="block text-base font-medium text-foreground"
                        style={{ fontFamily: "var(--font-inter-tight)", letterSpacing: "-0.01em" }}
                      >
                        {n.medio}
                      </span>
                      {n.titulo && (
                        <span className="mt-1 block max-w-xl text-sm leading-relaxed text-muted" style={{ fontFamily: "var(--font-inter)" }}>
                          {n.titulo}
                        </span>
                      )}
                    </div>
                    <span
                      className="flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-muted"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {n.fecha}
                      <span className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <p className="mt-8 text-xs italic text-muted/70" style={{ fontFamily: "var(--font-inter)" }}>
              {isEn
                ? "Article links are being consolidated."
                : "Los links a cada nota se están consolidando."}
            </p>
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
