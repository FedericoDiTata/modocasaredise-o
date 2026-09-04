"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Página Servicios, rehecha conceptualmente según el feedback del cliente:
 * explica QUÉ hace el estudio y CÓMO trabaja (estilo ARA), integra el proceso
 * de trabajo acá adentro (antes vivía suelto en el home como "Proceso"), y
 * suma un bloque de Espacios para la salud con link a la landing de consultorios.
 *
 * Copy provisional: los textos finos y el detalle del proceso salen del PDF
 * comercial de Francisco (pendiente). La estructura ya queda armada.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const WP = "https://estudiomodocasa.com/wp-content/uploads";

const servicios = [
  {
    id: "interiorismo",
    title: "Diseño de interiores",
    desc: "El corazón del estudio. Proyectos integrales de interiorismo, con dirección y administración de obra: análisis del espacio, concepto, materialidades, iluminación y equipamiento a medida.",
    image: `${WP}/2025/06/image-1.jpg`,
  },
  {
    id: "arquitectura",
    title: "Arquitectura",
    desc: "Proyecto y dirección de obra residencial y comercial, y puesta en valor de arquitectura existente. Coherencia técnica y estética desde el anteproyecto hasta la entrega.",
    image: `${WP}/2022/12/hudson_2025_02.jpg`,
  },
  {
    id: "muebles",
    title: "Muebles a medida",
    desc: "Mobiliario ad hoc pensado para cada proyecto, producido con las mejores maderas, lacas y herrajes. Piezas únicas que se integran con precisión milimétrica al espacio.",
    image: `${WP}/2023/09/unkanny_v2-004.jpg`,
  },
  {
    id: "salud",
    title: "Espacios para la salud",
    desc: "Diseño de consultorios y clínicas que equilibran experiencia del paciente, funcionalidad médica y una estética de marca. Una vertical con su propio sitio dedicado.",
    image: `${WP}/2025/06/salguerotg-03.jpg`,
    link: "https://salud.estudiomodocasa.com/",
    linkLabel: "Ver espacios para la salud",
  },
];

const proceso = [
  { n: "01", title: "Diagnóstico", desc: "Entendimiento inicial del proyecto, el lote o la unidad, la forma de vivir y los objetivos." },
  { n: "02", title: "Anteproyecto", desc: "El proyecto toma forma: concepto, plantas, cortes, materialidades e iluminación." },
  { n: "03", title: "Proyecto ejecutivo", desc: "Documentación técnica completa: planos definitivos, detalles constructivos y pliegos." },
  { n: "04", title: "Dirección de obra", desc: "Coordinación de contratistas, control de ejecución y seguimiento de plazos." },
  { n: "05", title: "Gestión y administración", desc: "Administración de la obra, proveedores y presupuesto con total transparencia." },
  { n: "06", title: "Ejecución de obra", desc: "Construcción y terminaciones con supervisión permanente del equipo del estudio." },
  { n: "07", title: "Mobiliario ad hoc", desc: "Diseño y producción del equipamiento a medida que completa cada espacio." },
];

export default function ServiciosPage() {
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
                  {isEn ? "What we do, and how we work." : "Qué hacemos y cómo trabajamos."}
                </motion.h1>
              </div>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/60"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isEn
                  ? "A single point of contact for the entire project: interior design, architecture and custom furniture, from the first idea to the delivery of keys."
                  : "Un único interlocutor para todo el proyecto: interiorismo, arquitectura y mobiliario a medida, desde la primera idea hasta la entrega de llaves."}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Servicios, spreads editoriales alternados */}
        <section className="section bg-background">
          <div className="container">
            <div className="flex flex-col gap-16 lg:gap-24">
              {servicios.map((s, i) => {
                const imageFirst = i % 2 === 0;
                return (
                  <motion.article
                    key={s.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.85, ease: EASE }}
                    className="grid grid-cols-12 items-center gap-6 lg:gap-12"
                  >
                    <div className={`col-span-12 lg:col-span-7 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface lg:aspect-[16/10]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                      </div>
                    </div>
                    <div className={`col-span-12 lg:col-span-5 ${imageFirst ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"}`}>
                      <p className="eyebrow mb-4">{String(i + 1).padStart(2, "0")}</p>
                      <h2
                        className="mb-5"
                        style={{
                          fontFamily: "var(--font-inter-tight)",
                          fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                          fontWeight: 400,
                          lineHeight: 1.05,
                          letterSpacing: "-0.025em",
                          color: "var(--fg)",
                        }}
                      >
                        {s.title}
                      </h2>
                      <div className="mb-6 h-px w-12 bg-foreground/30" aria-hidden="true" />
                      <p className="max-w-lg text-[15px] leading-relaxed text-muted lg:text-base" style={{ fontFamily: "var(--font-inter)" }}>
                        {s.desc}
                      </p>
                      {s.link && (
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                          style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                          {s.linkLabel}
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cómo trabajamos, proceso integrado */}
        <section className="section bg-dark text-white">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="mb-12 max-w-2xl lg:mb-16"
            >
              <motion.p variants={fadeUp} className="eyebrow-light mb-4">
                {isEn ? "Process" : "Cómo trabajamos"}
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
                {isEn ? "Seven steps, one team." : "Siete pasos, un solo equipo."}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-lg text-sm leading-relaxed text-white/55"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isEn
                  ? "You can join the process at the point that suits you; each stage adds deliverables as the project advances."
                  : "Podés sumarte en el punto que necesites; cada etapa suma entregables a medida que avanza el proyecto."}
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 gap-px border-t border-white/12 sm:grid-cols-2 lg:grid-cols-3">
              {proceso.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
                  className="group border-b border-white/12 px-1 py-8 sm:px-6 lg:border-l lg:px-7 lg:py-10"
                >
                  <span
                    className="block leading-none text-white/25 transition-colors duration-500 group-hover:text-white/60"
                    style={{ fontFamily: "var(--font-inter-tight)", fontSize: "2.25rem", fontWeight: 300, letterSpacing: "-0.03em" }}
                  >
                    {p.n}
                  </span>
                  <div aria-hidden="true" className="my-5 h-px w-8 bg-white/25 transition-all duration-500 ease-out group-hover:w-14" />
                  <h3
                    className="mb-2.5 leading-snug text-white"
                    style={{ fontFamily: "var(--font-inter-tight)", fontSize: "1.1rem", fontWeight: 500, letterSpacing: "-0.015em" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-white/55" style={{ fontFamily: "var(--font-inter)" }}>
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
