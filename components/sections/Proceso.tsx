"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Timeline zigzag como "mapa". Los waypoints (dots) se posicionan cerca
 * del centro del viewport y las cards se colocan a los EXTREMOS
 * (izquierda o derecha) para que el layout no quede apretado al medio.
 * Un hairline horizontal conecta cada card con su dot, y un SVG path
 * cÃºbico curvo une los dots entre sÃ­, dibujÃ¡ndose progresivamente al
 * scroll. Cada dot tiene un ring pulsante y cada card entra con slide
 * desde su lado.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STEPS = [
  {
    number: "01",
    es: {
      title: "DiagnÃ³stico estratÃ©gico",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Analizamos el contexto, la visiÃ³n y las necesidades del proyecto para definir los ejes de trabajo.",
    },
    en: {
      title: "Strategic diagnosis",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. We analyze the context, vision and needs of the project to define the working axes.",
    },
  },
  {
    number: "02",
    es: {
      title: "DefiniciÃ³n de flujos",
      desc: "Praesent commodo cursus magna, vel scelerisque nisl. Organizamos circulaciones, Ã¡reas tÃ©cnicas y recorridos, diferenciando lo pÃºblico de lo privado.",
    },
    en: {
      title: "Flow definition",
      desc: "Praesent commodo cursus magna, vel scelerisque nisl. We organize circulations, technical areas and paths, separating public from private.",
    },
  },
  {
    number: "03",
    es: {
      title: "Concepto e identidad",
      desc: "Nullam quis risus eget urna mollis ornare vel eu leo. Traducimos el posicionamiento del proyecto en lenguaje arquitectÃ³nico, atmÃ³sfera y paleta.",
    },
    en: {
      title: "Concept and identity",
      desc: "Nullam quis risus eget urna mollis ornare vel eu leo. We translate the project's positioning into architectural language, atmosphere and palette.",
    },
  },
  {
    number: "04",
    es: {
      title: "Proyecto ejecutivo",
      desc: "Donec ullamcorper nulla non metus auctor fringilla. ResoluciÃ³n tÃ©cnica: pliegos, planimetrÃ­as, cortes constructivos y renders fotorrealistas.",
    },
    en: {
      title: "Executive project",
      desc: "Donec ullamcorper nulla non metus auctor fringilla. Technical resolution: specifications, drawings, construction details and photorealistic renders.",
    },
  },
  {
    number: "05",
    es: {
      title: "DirecciÃ³n de obra",
      desc: "Vestibulum id ligula porta felis euismod semper. Coordinamos gremios, tiempos y entregas con supervisiÃ³n permanente del equipo del estudio.",
    },
    en: {
      title: "Construction management",
      desc: "Vestibulum id ligula porta felis euismod semper. We coordinate trades, schedules and deliveries with permanent studio supervision.",
    },
  },
  {
    number: "06",
    es: {
      title: "Entrega llave en mano",
      desc: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Un espacio listo para habitarse desde el primer dÃ­a, con acompaÃ±amiento post-entrega.",
    },
    en: {
      title: "Turnkey delivery",
      desc: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. A space ready to move into from day one, with post-delivery support.",
    },
  },
];

// Waypoints en coordenadas 0-100 del SVG. Zigzag suave cerca del centro.
const WAYPOINTS = [
  { x: 38, y: 8, side: "left" as const },
  { x: 62, y: 24, side: "right" as const },
  { x: 38, y: 40, side: "left" as const },
  { x: 62, y: 56, side: "right" as const },
  { x: 38, y: 72, side: "left" as const },
  { x: 62, y: 88, side: "right" as const },
];

function buildPath() {
  const start = WAYPOINTS[0];
  let d = `M ${start.x} ${start.y}`;
  for (let i = 1; i < WAYPOINTS.length; i++) {
    const prev = WAYPOINTS[i - 1];
    const curr = WAYPOINTS[i];
    const midY = (prev.y + curr.y) / 2;
    // Control points en el X del prev y curr para que la curva
    // "abrace" cada waypoint antes de cruzar el eje vertical.
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

const PATH_D = buildPath();

export default function Proceso() {
  const locale = useLocale();
  const isEn = locale === "en";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <section className="section bg-dark text-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-14 max-w-2xl lg:mb-20"
        >
          <motion.p variants={fadeUp} className="eyebrow-light mb-4">
            {isEn ? "Process" : "CÃ³mo trabajamos"}
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
              ? "A process in six stages."
              : "Un proceso en seis etapas."}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-lg text-sm leading-relaxed text-white/55"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isEn
              ? "An ordered, transparent method, designed so the client can focus on their project while the studio takes care of every detail."
              : "Un mÃ©todo ordenado y transparente, diseÃ±ado para que el cliente pueda enfocarse en su proyecto mientras el estudio se ocupa de cada detalle."}
          </motion.p>
        </motion.div>

        {/* Desktop, mapa zigzag */}
        <div
          ref={containerRef}
          className="relative hidden lg:block"
          style={{ height: "1500px" }}
        >
          {/* Halo radial suave detrÃ¡s del path para dar profundidad */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 42% 55% at 50% 50%, rgba(255,255,255,0.035), transparent 70%)",
            }}
          />

          {/* SVG con path animado */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Path fantasma, siempre visible pero suave */}
            <path
              d={PATH_D}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.35"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Path principal, se dibuja segÃºn scroll */}
            <motion.path
              d={PATH_D}
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength }}
            />
          </svg>

          {/* Waypoints (dots + cards) */}
          {STEPS.map((step, i) => {
            const wp = WAYPOINTS[i];
            const isRight = wp.side === "right";
            const { title, desc } = isEn ? step.en : step.es;

            return (
              <div key={step.number}>
                {/* Ring pulsante detrÃ¡s del dot, loop infinito */}
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{
                    scale: [0.6, 1.8, 0.6],
                    opacity: [0, 0.3, 0],
                  }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{
                    duration: 2.6,
                    delay: 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                  className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                  style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                />

                {/* Dot sÃ³lido, aparece con scale spring */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                  aria-hidden="true"
                  className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-white/70"
                  style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                />

                {/* Hairline conector desde el dot hasta el borde interno de la card */}
                <motion.span
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.65, delay: 0.4, ease: EASE }}
                  aria-hidden="true"
                  className="absolute h-px -translate-y-1/2 bg-white/40"
                  style={{
                    left: isRight ? `${wp.x}%` : `${wp.x - 32}%`,
                    top: `${wp.y}%`,
                    width: "32%",
                    transformOrigin: isRight ? "left center" : "right center",
                  }}
                />

                {/* Card en el extremo opuesto (fuera del centro) */}
                <motion.article
                  initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                  className="absolute"
                  style={{
                    left: isRight ? "auto" : "1%",
                    right: isRight ? "1%" : "auto",
                    top: `calc(${wp.y}% - 68px)`,
                    width: "min(340px, 30%)",
                    textAlign: isRight ? "right" : "left",
                  }}
                >
                  <div
                    className={`flex items-baseline gap-4 ${
                      isRight ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isRight && (
                      <>
                        <span
                          className="leading-none"
                          style={{
                            fontFamily: "var(--font-inter-tight)",
                            fontSize: "3.75rem",
                            fontWeight: 300,
                            letterSpacing: "-0.04em",
                            color: "rgba(255,255,255,0.9)",
                          }}
                        >
                          {step.number}
                        </span>
                        <h3
                          style={{
                            fontFamily: "var(--font-inter-tight)",
                            fontSize: "1.35rem",
                            fontWeight: 500,
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            color: "white",
                          }}
                        >
                          {title}
                        </h3>
                      </>
                    )}
                    {isRight && (
                      <>
                        <h3
                          style={{
                            fontFamily: "var(--font-inter-tight)",
                            fontSize: "1.35rem",
                            fontWeight: 500,
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            color: "white",
                          }}
                        >
                          {title}
                        </h3>
                        <span
                          className="leading-none"
                          style={{
                            fontFamily: "var(--font-inter-tight)",
                            fontSize: "3.75rem",
                            fontWeight: 300,
                            letterSpacing: "-0.04em",
                            color: "rgba(255,255,255,0.9)",
                          }}
                        >
                          {step.number}
                        </span>
                      </>
                    )}
                  </div>
                  <div
                    aria-hidden="true"
                    className={`mt-4 h-px w-12 bg-white/25 ${
                      isRight ? "ml-auto" : ""
                    }`}
                  />
                  <p
                    className="mt-4 text-[13.5px] leading-relaxed text-white/55"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {desc}
                  </p>
                </motion.article>
              </div>
            );
          })}
        </div>

        {/* Mobile / tablet fallback, stacked simple */}
        <ol className="space-y-10 lg:hidden">
          {STEPS.map((step, i) => {
            const { title, desc } = isEn ? step.en : step.es;
            return (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-3 border-t border-white/10 pt-6"
              >
                <span
                  className="row-span-2 leading-none"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    color: "white",
                  }}
                >
                  {step.number}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    lineHeight: 1.15,
                    letterSpacing: "-0.015em",
                    color: "white",
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-[13.5px] leading-relaxed text-white/55"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {desc}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
