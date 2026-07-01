"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Proceso como "mapa" en zigzag diagonal. Los pasos se colocan
 * alternando izquierda / derecha en una grilla de 12 columnas,
 * conectados por un SVG path curvo que se dibuja al scroll (como
 * ruta trazándose en un mapa). Cada paso tiene su número grande
 * como ancla visual + título justo al lado (no separado) +
 * descripción debajo. Cada waypoint se revela con animación tipo
 * "pin drop" cuando entra en viewport.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STEPS = [
  {
    number: "01",
    es: {
      title: "Diagnóstico estratégico",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Analizamos el contexto, la visión y las necesidades del proyecto para definir los ejes de trabajo.",
    },
    en: {
      title: "Strategic diagnosis",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. We analyze the context, vision and needs of the project to define the working axes.",
    },
  },
  {
    number: "02",
    es: {
      title: "Definición de flujos",
      desc: "Praesent commodo cursus magna, vel scelerisque nisl. Organizamos circulaciones, áreas técnicas y recorridos, diferenciando lo público de lo privado.",
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
      desc: "Nullam quis risus eget urna mollis ornare vel eu leo. Traducimos el posicionamiento del proyecto en lenguaje arquitectónico, atmósfera y paleta.",
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
      desc: "Donec ullamcorper nulla non metus auctor fringilla. Resolución técnica: pliegos, planimetrías, cortes constructivos y renders fotorrealistas.",
    },
    en: {
      title: "Executive project",
      desc: "Donec ullamcorper nulla non metus auctor fringilla. Technical resolution: specifications, drawings, construction details and photorealistic renders.",
    },
  },
  {
    number: "05",
    es: {
      title: "Dirección de obra",
      desc: "Vestibulum id ligula porta felis euismod semper. Coordinamos gremios, tiempos y entregas con supervisión permanente del equipo del estudio.",
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
      desc: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Un espacio listo para habitarse desde el primer día, con acompañamiento post-entrega.",
    },
    en: {
      title: "Turnkey delivery",
      desc: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. A space ready to move into from day one, with post-delivery support.",
    },
  },
];

// Coordenadas normalizadas (0-100) de cada waypoint en el SVG virtual
// para el path curvo. Zigzag alternando left/right.
const WAYPOINTS = [
  { x: 22, y: 8 },   // 01, izquierda arriba
  { x: 78, y: 25 },  // 02, derecha
  { x: 22, y: 42 },  // 03, izquierda
  { x: 78, y: 59 },  // 04, derecha
  { x: 22, y: 76 },  // 05, izquierda
  { x: 78, y: 92 },  // 06, derecha abajo
];

/**
 * Construye un path SVG cúbico que atraviesa todos los waypoints con
 * curvas suaves. Cada segmento entre dos puntos usa Bezier cúbica con
 * puntos de control desplazados horizontalmente para dar sensación de
 * ruta orgánica en zigzag.
 */
function buildPath() {
  const start = WAYPOINTS[0];
  let d = `M ${start.x} ${start.y}`;
  for (let i = 1; i < WAYPOINTS.length; i++) {
    const prev = WAYPOINTS[i - 1];
    const curr = WAYPOINTS[i];
    const midY = (prev.y + curr.y) / 2;
    // Puntos de control en el eje X del waypoint anterior/actual para
    // que la curva "abrace" cada waypoint antes de cruzar
    const cp1 = { x: prev.x, y: midY };
    const cp2 = { x: curr.x, y: midY };
    d += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${curr.x} ${curr.y}`;
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
    offset: ["start end", "end center"],
  });

  // El path se dibuja de 0 a 1 conforme el usuario scrollea por la sección
  const pathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

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
            {isEn ? "Process" : "Cómo trabajamos"}
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
              : "Un método ordenado y transparente, diseñado para que el cliente pueda enfocarse en su proyecto mientras el estudio se ocupa de cada detalle."}
          </motion.p>
        </motion.div>

        {/* Mapa / zigzag, solo desktop */}
        <div
          ref={containerRef}
          className="relative hidden lg:block"
          style={{ height: "1400px" }}
        >
          {/* SVG del path curvo, se dibuja al scroll */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Path base semitransparente, línea fantasma */}
            <path
              d={PATH_D}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.15"
              strokeDasharray="0.8 0.8"
              vectorEffect="non-scaling-stroke"
            />
            {/* Path que se dibuja al scroll, sobre el ghost */}
            <motion.path
              d={PATH_D}
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="0.18"
              strokeLinecap="round"
              strokeDasharray="0.9 0.7"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength }}
            />
          </svg>

          {/* Waypoints con motion.dot (bullet en la línea) + card cerca */}
          {STEPS.map((step, i) => {
            const wp = WAYPOINTS[i];
            const isRight = wp.x > 50;
            const { title, desc } = isEn ? step.en : step.es;

            return (
              <div key={step.number}>
                {/* Dot en la línea */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
                  aria-hidden="true"
                  className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-4 ring-white/10"
                  style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                />

                {/* Card, aparece con "pin drop" y offset según lado */}
                <motion.article
                  initial={{ opacity: 0, y: 30, x: isRight ? 20 : -20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
                  className="absolute w-[min(340px,26vw)]"
                  style={{
                    left: isRight
                      ? `calc(${wp.x}% - 340px - 32px)`
                      : `calc(${wp.x}% + 32px)`,
                    top: `calc(${wp.y}% - 60px)`,
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="leading-none"
                      style={{
                        fontFamily: "var(--font-inter-tight)",
                        fontSize: "3.5rem",
                        fontWeight: 300,
                        letterSpacing: "-0.04em",
                        color: "rgba(255,255,255,0.85)",
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
                  </div>
                  <div
                    aria-hidden="true"
                    className="my-4 h-px w-10 bg-white/25"
                  />
                  <p
                    className="text-[13.5px] leading-relaxed text-white/55"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {desc}
                  </p>
                </motion.article>
              </div>
            );
          })}
        </div>

        {/* Fallback mobile / tablet, layout apilado sencillo con
            número grande y título/descripción justo al lado */}
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
