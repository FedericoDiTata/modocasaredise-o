"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";

const WP = "https://estudiomodocasa.com/wp-content/uploads";

const STEPS = [
  {
    number: "01",
    es: { title: "Diagnóstico", desc: "Reunión inicial para entender el espacio, la visión y las necesidades del proyecto. Analizamos el contexto, el cliente y los objetivos." },
    en: { title: "Diagnosis", desc: "Initial meeting to understand the space, the vision and the project's needs. We analyze the context, the client and the objectives." },
    image: `${WP}/2022/12/hudson_2025_01-1024x683.jpg`,
    alt: "Hudson — arquitectura residencial",
  },
  {
    number: "02",
    es: { title: "Concepto", desc: "Desarrollo de la propuesta conceptual: paleta de materiales, moodboard, distribución y lenguaje arquitectónico del proyecto." },
    en: { title: "Concept", desc: "Development of the conceptual proposal: material palette, moodboard, layout and architectural language of the project." },
    image: `${WP}/2025/06/Estrugamou-01.jpg`,
    alt: "Palacio Estrugamou — diseño interior",
  },
  {
    number: "03",
    es: { title: "Proyecto", desc: "Documentación técnica completa: planos, renders 3D fotorrealistas y especificaciones detalladas de obra y terminaciones." },
    en: { title: "Design", desc: "Complete technical documentation: floor plans, photorealistic 3D renders and detailed construction and finish specifications." },
    image: `${WP}/2021/10/MODO-CASA-PEDRO-GOYENA-PH_FEDERICO_KULEKDJIAN-11.jpg`,
    alt: "Goyena — diseño interior de lujo",
  },
  {
    number: "04",
    es: { title: "Ejecución", desc: "Coordinación y dirección de obra con proveedores y gremios de confianza, bajo supervisión permanente del equipo del estudio." },
    en: { title: "Execution", desc: "Coordination and construction management with trusted suppliers and contractors, under permanent supervision by our studio team." },
    image: `${WP}/2022/12/terravista-1.jpg`,
    alt: "Casa Terravista — arquitectura",
  },
  {
    number: "05",
    es: { title: "Entrega", desc: "El espacio listo para habitarse desde el primer día. Acompañamiento post-entrega y garantía de terminaciones." },
    en: { title: "Delivery", desc: "The space ready to move into from day one. Post-delivery support and finish warranty included." },
    image: `${WP}/2021/08/MODO-CASA-SLS-PUERTO-MADERO-PH_FEDERICO_KULEKDJIAN-19-1.jpg`,
    alt: "SLS Puerto Madero — penthouse cosmopolita",
  },
];

interface CardProps {
  step: (typeof STEPS)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
  isEn: boolean;
}

function ProcesoCard({ step, index, total, progress, isEn }: CardProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(cardProgress, [0, 1], [1.18, 1]);
  const targetScale = 1 - (total - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  const { title, desc } = isEn ? step.en : step.es;

  return (
    <div
      ref={container}
      className="h-screen flex items-start justify-center sticky top-0 z-10 pt-52"
    >
      <motion.div
        style={{
          scale,
          width: "clamp(300px, 82vw, 1100px)",
          height: "clamp(320px, 60vh, 620px)",
        }}
        className="relative flex overflow-hidden rounded-2xl bg-white"
      >
        {/* Left: step info */}
        <div
          className="relative flex w-[42%] shrink-0 flex-col justify-center px-10 py-10"
          style={{ borderRight: "1px solid rgba(8,9,10,0.06)" }}
        >
          <span
            className="mb-2 block leading-none select-none"
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "clamp(4.5rem, 9vw, 8rem)",
              fontWeight: 300,
              color: "rgba(8,9,10,0.05)",
              letterSpacing: "-0.04em",
            }}
          >
            {step.number}
          </span>
          <h3
            className="mb-4"
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
              fontWeight: 500,
              color: "#08090A",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              lineHeight: 1.75,
              color: "rgba(8,9,10,0.5)",
            }}
          >
            {desc}
          </p>

          {/* Step indicator */}
          <div className="absolute bottom-8 left-10 flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === index ? 20 : 4,
                  height: 4,
                  background: i === index ? "#08090A" : "rgba(8,9,10,0.12)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src={step.image}
              alt={step.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </motion.div>
          {/* Soft left-edge blend */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
        </div>
      </motion.div>
    </div>
  );
}

export default function Proceso() {
  const locale = useLocale();
  const isEn = locale === "en";
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0.88, 1], [0, -36]);

  return (
    <>
      {/* ── Mobile: simple vertical list ── */}
      <div className="md:hidden section bg-dark text-white">
        <div className="container">
          <p className="eyebrow-light mb-4">{isEn ? "Process" : "Proceso"}</p>
          <h2
            className="mb-14"
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "clamp(2rem, 6vw, 2.5rem)",
              fontWeight: 400,
              color: "white",
              lineHeight: 1.1,
            }}
          >
            {isEn ? "How we " : "Cómo "}
            <em style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}>
              {isEn ? "work." : "trabajamos."}
            </em>
          </h2>
          <div className="space-y-10">
            {STEPS.map((step) => {
              const { title, desc } = isEn ? step.en : step.es;
              return (
                <div key={step.number}>
                  <div className="relative mb-5 h-52 overflow-hidden rounded-xl">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      className="object-cover brightness-75"
                      sizes="100vw"
                    />
                    <span
                      className="absolute bottom-4 left-4"
                      style={{
                        fontFamily: "var(--font-inter-tight)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: "var(--font-inter-tight)",
                      fontSize: "1.125rem",
                      fontWeight: 500,
                      color: "white",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.875rem",
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Desktop: stacking cards ── */}
      <div
        ref={container}
        className="hidden md:block relative"
        style={{
          height: `${STEPS.length * 100}vh`,
          backgroundColor: "#08090A",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      >
        {/* Sticky header — fades out as first card comes in */}
        <div className="pointer-events-none sticky top-0 z-50 h-0 overflow-visible">
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="px-16 pt-24"
          >
            <p
              className="eyebrow-light mb-4"
              style={{ fontSize: "0.65rem", letterSpacing: "0.16em" }}
            >
              {isEn ? "Process" : "Proceso"}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
                fontWeight: 400,
                color: "white",
                lineHeight: 1.08,
              }}
            >
              {isEn ? "How we " : "Cómo "}
              <em
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontStyle: "italic",
                  color: "white",
                }}
              >
                {isEn ? "work." : "trabajamos."}
              </em>
            </h2>
          </motion.div>
        </div>

        {/* Stacking cards */}
        {STEPS.map((step, i) => (
          <ProcesoCard
            key={step.number}
            step={step}
            index={i}
            total={STEPS.length}
            progress={scrollYProgress}
            isEn={isEn}
          />
        ))}
      </div>
    </>
  );
}
