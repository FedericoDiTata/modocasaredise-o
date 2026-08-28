"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * "La diferencia está en los detalles" — cuatro diferenciadores del estudio.
 *
 * Reescrito a partir del feedback del cliente ("no se entienden esas cuatro
 * ventanas"): se eliminó la interacción de hover que desplegaba galerías
 * vacías (placeholders "Foto") y se dejó un bloque editorial claro, con cada
 * valor siempre legible — número, título y explicación breve. Sin nada
 * oculto ni instrucciones de "pasá el cursor".
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Diferenciador = {
  num: string;
  title: string;
  blurb: string;
};

export default function PorQueElegirnos() {
  const locale = useLocale();
  const isEn = locale === "en";

  const items: Diferenciador[] = [
    {
      num: "01",
      title: isEn ? "Integrated vision" : "Visión integral",
      blurb: isEn
        ? "One point of contact for the entire process, from the first sketch to the delivery of keys."
        : "Un único interlocutor para todo el proceso, desde el primer boceto hasta la entrega de llaves.",
    },
    {
      num: "02",
      title: isEn ? "15 years of practice" : "15 años de trayectoria",
      blurb: isEn
        ? "Over a decade working with the finest materials and suppliers in Argentina."
        : "Más de una década trabajando con los mejores materiales y proveedores de Argentina.",
    },
    {
      num: "03",
      title: isEn ? "Bespoke design" : "Diseño a medida",
      blurb: isEn
        ? "Every project starts from scratch. No two spaces —and no two clients— are alike."
        : "Cada proyecto parte de cero. No hay dos espacios —ni dos clientes— iguales.",
    },
    {
      num: "04",
      title: isEn ? "Full support" : "Acompañamiento total",
      blurb: isEn
        ? "Present at every decision, with technical precision that avoids surprises on site."
        : "Presentes en cada decisión, con una precisión técnica que evita sorpresas en obra.",
    },
  ];

  return (
    <section className="section bg-dark text-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-12 max-w-2xl lg:mb-16"
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

        {/* Grid de 4 valores, siempre legibles */}
        <div className="grid grid-cols-1 gap-px border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="group relative border-b border-white/12 px-1 py-9 sm:px-6 lg:border-l lg:first:border-l-0 lg:px-7 lg:py-11"
            >
              <span
                className="block leading-none text-white/25 transition-colors duration-500 group-hover:text-white/60"
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                }}
              >
                {item.num}
              </span>

              <div
                aria-hidden="true"
                className="my-6 h-px w-8 bg-white/25 transition-all duration-500 ease-out group-hover:w-14"
              />

              <h3
                className="mb-3 leading-snug text-white"
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "1.15rem",
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-[13.5px] leading-relaxed text-white/55"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.blurb}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
