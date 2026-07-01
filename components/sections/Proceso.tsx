"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Proceso como timeline vertical — pattern de la landing médica.
 * Cambios respecto a la iteración anterior:
 *   — Sin sticky-scroll cards apiladas (patrón AI clásico)
 *   — Sin imágenes por paso — puramente tipografía + hairlines
 *   — Contenido en lorem, se reemplaza cuando el cliente lo defina
 *   — Los pasos se conectan con una línea vertical hairline continua
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STEPS = [
  {
    number: "01",
    es: {
      title: "Diagnóstico estratégico",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Analizamos el contexto, la visión y las necesidades del proyecto para definir los ejes de trabajo desde el inicio.",
    },
    en: {
      title: "Strategic diagnosis",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. We analyze the context, vision and needs of the project to define the working axes from the start.",
    },
  },
  {
    number: "02",
    es: {
      title: "Definición de flujos y programa",
      desc: "Praesent commodo cursus magna, vel scelerisque nisl. Organizamos circulaciones, áreas técnicas y recorridos: diferenciamos lo público de lo privado, lo servido de lo servidor.",
    },
    en: {
      title: "Program and flow definition",
      desc: "Praesent commodo cursus magna, vel scelerisque nisl. We organize circulations, technical areas and paths: differentiating public from private, served from serving spaces.",
    },
  },
  {
    number: "03",
    es: {
      title: "Concepto e identidad espacial",
      desc: "Nullam quis risus eget urna mollis ornare vel eu leo. Traducimos el posicionamiento del proyecto en lenguaje arquitectónico: materiales, atmósfera, paleta y mobiliario.",
    },
    en: {
      title: "Concept and spatial identity",
      desc: "Nullam quis risus eget urna mollis ornare vel eu leo. We translate the project's positioning into architectural language: materials, atmosphere, palette and furniture.",
    },
  },
  {
    number: "04",
    es: {
      title: "Proyecto ejecutivo",
      desc: "Donec ullamcorper nulla non metus auctor fringilla. Resolución técnica completa: pliegos, planimetrías, cortes constructivos, especificaciones de terminaciones y renders fotorrealistas.",
    },
    en: {
      title: "Executive project",
      desc: "Donec ullamcorper nulla non metus auctor fringilla. Full technical resolution: specifications, drawings, construction details, finish specs and photorealistic renders.",
    },
  },
  {
    number: "05",
    es: {
      title: "Dirección de obra",
      desc: "Vestibulum id ligula porta felis euismod semper. Coordinamos gremios, tiempos y entregas con supervisión permanente del equipo del estudio. Control de obra y coherencia total.",
    },
    en: {
      title: "Construction management",
      desc: "Vestibulum id ligula porta felis euismod semper. We coordinate trades, schedules and deliveries with permanent supervision by our studio team. Full control and coherence.",
    },
  },
  {
    number: "06",
    es: {
      title: "Entrega llave en mano",
      desc: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Un espacio listo para habitarse el primer día — no sólo para verse bien en fotos. Acompañamiento post-entrega.",
    },
    en: {
      title: "Turnkey delivery",
      desc: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. A space ready to move into from day one — not just to look good in photos. Post-delivery support.",
    },
  },
];

export default function Proceso() {
  const locale = useLocale();
  const isEn = locale === "en";

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
              ? "An ordered, transparent method designed so the client can focus on their practice while we take care of every detail."
              : "Un método ordenado y transparente, diseñado para que el cliente pueda enfocarse en su proyecto mientras el estudio se ocupa de cada detalle."}
          </motion.p>
        </motion.div>

        {/* Timeline vertical */}
        <div className="relative">
          {/* Línea vertical conectora — se dibuja de arriba a abajo al entrar en viewport */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 1.6, ease: EASE }}
            className="pointer-events-none absolute bottom-0 left-4 top-0 w-px origin-top bg-white/15 lg:left-[7.5%]"
            aria-hidden="true"
          />

          <ol className="space-y-14 lg:space-y-20">
            {STEPS.map((step, i) => {
              const { title, desc } = isEn ? step.en : step.es;
              return (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.75, delay: i * 0.06, ease: EASE }}
                  className="relative pl-14 lg:grid lg:grid-cols-12 lg:gap-8 lg:pl-0"
                >
                  {/* Número grande a la izquierda con dot en la línea */}
                  <div className="lg:col-span-3">
                    <div className="absolute left-0 top-2 h-2.5 w-2.5 -translate-x-[3px] rounded-full bg-white lg:left-[7.5%] lg:top-6" />
                    <span
                      className="block leading-none"
                      style={{
                        fontFamily: "var(--font-inter-tight)",
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        fontWeight: 300,
                        letterSpacing: "-0.03em",
                        color: "white",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Título + descripción */}
                  <div className="mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: "var(--font-inter-tight)",
                        fontSize: "clamp(1.25rem, 2vw, 1.65rem)",
                        fontWeight: 500,
                        lineHeight: 1.15,
                        letterSpacing: "-0.015em",
                        color: "white",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      className="max-w-2xl text-sm leading-relaxed text-white/55 lg:text-[15px]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {desc}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
