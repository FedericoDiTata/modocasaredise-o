"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Página Servicios. Entra directo a "¿Qué hacemos y cómo trabajamos?" con el
 * proceso de 7 pasos.
 *
 * Los pasos usan un scroll-reveal (estilo "Nuestro compromiso" de Estudio
 * Peiré / "Text Scroll Read" de 21st.dev): cada título se tiñe de gris a negro
 * a medida que se scrollea, con una línea que crece debajo. Se dejó de usar
 * fotos por paso porque las que había eran obras terminadas y no representaban
 * cada momento del proceso (pendiente material real de Fran). Con movimiento
 * reducido todo queda en su estado final (títulos teñidos, sin líneas).
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const proceso = [
  {
    n: "01",
    title: "Diagnóstico",
    titleEn: "Diagnosis",
    desc: "Entendimiento inicial del proyecto, la unidad y la forma de vivir o trabajar. Definimos juntos los objetivos y el punto de partida.",
    descEn: "Initial understanding of the project, the unit and the way of living or working. Together we define the goals and the starting point.",
  },
  {
    n: "02",
    title: "Anteproyecto",
    titleEn: "Preliminary design",
    desc: "El proyecto toma forma: concepto, plantas, materialidades, iluminación y paleta. Una propuesta clara para decidir sobre información real.",
    descEn: "The project takes shape: concept, floor plans, materials, lighting and palette. A clear proposal to decide on real information.",
  },
  {
    n: "03",
    title: "Proyecto ejecutivo",
    titleEn: "Construction documentation",
    desc: "Documentación técnica completa: planos definitivos, detalles constructivos y pliegos. Todo listo para arrancar la obra sin zonas grises.",
    descEn: "Complete technical documentation: final drawings, construction details and specs. Everything ready to start the works with no grey areas.",
  },
  {
    n: "04",
    title: "Dirección de obra",
    titleEn: "Site management",
    desc: "Coordinamos contratistas, controlamos la ejecución y seguimos plazos e imprevistos. Vos ves el avance, nosotros resolvemos.",
    descEn: "We coordinate contractors, oversee execution and track timelines and contingencies. You see the progress, we solve the rest.",
  },
  {
    n: "05",
    title: "Gestión y administración",
    titleEn: "Management & administration",
    desc: "Administración de la obra, proveedores y presupuesto con total transparencia, para que el proyecto avance ordenado de principio a fin.",
    descEn: "Administration of the works, suppliers and budget with full transparency, so the project advances in order from start to finish.",
  },
  {
    n: "06",
    title: "Ejecución de obra",
    titleEn: "Construction",
    desc: "Construcción y terminaciones con supervisión permanente del equipo del estudio, cuidando cada detalle hasta el acabado final.",
    descEn: "Construction and finishes with permanent supervision from the studio's team, caring for every detail down to the final finish.",
  },
  {
    n: "07",
    title: "Mobiliario a medida",
    titleEn: "Custom furniture",
    desc: "Diseño y producción del equipamiento a medida que completa cada espacio, con las mejores maderas, lacas y herrajes.",
    descEn: "Design and production of the custom furniture that completes each space, with the finest woods, lacquers and hardware.",
  },
];

const pasoTitleStyle = {
  fontFamily: "var(--font-inter-tight)",
  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
  fontWeight: 400,
  lineHeight: 1.12,
  letterSpacing: "-0.02em",
} as const;

function PasoRenglon({
  n,
  title,
  desc,
  progreso,
  desde,
  hasta,
}: {
  n: string;
  title: string;
  desc: string;
  progreso: MotionValue<number>;
  desde: number;
  hasta: number;
}) {
  const avance = useTransform(progreso, [desde, hasta], [0, 1]);
  const tinta = useTransform(avance, [0.15, 0.85], [0, 1]);
  const numOpacity = useTransform(avance, [0, 0.6], [0.3, 1]);

  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-5 border-b border-border py-7 lg:gap-12 lg:py-9">
      <motion.span
        style={{ opacity: numOpacity }}
        className="shrink-0 tabular-nums leading-none text-foreground motion-reduce:opacity-100!"
      >
        <span
          className="block w-9 lg:w-14"
          style={{
            fontFamily: "var(--font-inter-tight)",
            fontSize: "clamp(1.25rem, 2.4vw, 2rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
          }}
        >
          {n}
        </span>
      </motion.span>

      <div>
        <div className="relative inline-block">
          <h3 style={{ ...pasoTitleStyle, color: "#8a8780" }}>{title}</h3>
          <motion.span
            aria-hidden="true"
            style={{ ...pasoTitleStyle, color: "var(--fg)", opacity: tinta }}
            className="absolute inset-0 motion-reduce:opacity-100!"
          >
            {title}
          </motion.span>
        </div>
        <p
          className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted lg:text-base"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {desc}
        </p>
      </div>

      <motion.span
        aria-hidden="true"
        style={{ scaleX: avance }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-foreground motion-reduce:hidden"
      />
    </li>
  );
}

export default function ServiciosPage() {
  const locale = useLocale();
  const isEn = locale === "en";

  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 45%"],
  });
  const total = proceso.length;

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
                  ? "We are interior design specialists. We accompany each project as a single point of contact, from diagnosis to the delivery of keys, and add custom furniture and a dedicated vertical for healthcare spaces."
                  : "Somos especialistas en interiorismo. Acompañamos cada proyecto como interlocutor único, del diagnóstico a la entrega de llaves, y sumamos mobiliario a medida y una vertical dedicada a espacios para la salud."}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Proceso, scroll-reveal */}
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

            <ol ref={listRef} className="border-t border-border">
              {proceso.map((p, i) => (
                <PasoRenglon
                  key={p.n}
                  n={p.n}
                  title={isEn ? p.titleEn : p.title}
                  desc={isEn ? p.descEn : p.desc}
                  progreso={scrollYProgress}
                  desde={i / total}
                  hasta={(i + 1) / total}
                />
              ))}
            </ol>
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
                    ? "Consulting rooms and clinics that balance patient experience, medical functionality and brand aesthetics, with its own specialised site."
                    : "Consultorios y clínicas que equilibran la experiencia del paciente, la funcionalidad médica y la estética de marca, con su propio sitio dedicado."}
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
                className="grid grid-cols-2 items-start gap-3"
              >
                {/* Consultorio (toma vertical): marco retrato para no recortarlo */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/salud/chinski-0952b.jpg"
                    alt={isEn ? "Consulting room by Estudio Modo Casa" : "Consultorio diseñado por Estudio Modo Casa"}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Dos tomas apaisadas apiladas, alto ~igual al retrato */}
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/salud/chinski-0862b.jpg"
                      alt={isEn ? "Clinic waiting room" : "Sala de espera de clínica"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/salud/recepcion-03.jpg"
                      alt={isEn ? "Clinic reception area" : "Recepción de clínica"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
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
