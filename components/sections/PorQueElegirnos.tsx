"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Grid de 4 diferenciadores sobre fondo oscuro. Cambios respecto a la
 * iteración anterior:
 *   — sin números en las cards
 *   — descripción del header en el mismo bloque de título, no en la
 *     esquina superior derecha
 *   — fotos en color (no grayscale)
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function PorQueElegirnos() {
  const locale = useLocale();
  const isEn = locale === "en";

  const WP = "https://estudiomodocasa.com/wp-content/uploads";

  const differentiators = [
    {
      id: "vision",
      title: isEn ? "Integrated vision" : "Visión integral",
      description: isEn
        ? "One point of contact for the entire process — project, materials, construction and delivery."
        : "Un interlocutor único para todo el proceso — proyecto, materiales, obra y entrega.",
      imageUrl: `${WP}/2022/12/hudson_2025_02.jpg`,
      imageAlt: isEn ? "Hudson — architecture" : "Hudson — arquitectura",
    },
    {
      id: "experiencia",
      title: isEn ? "15 years" : "15 años",
      description: isEn
        ? "More than a decade with the finest materials and suppliers in Argentina — over 25 high-end projects delivered."
        : "Más de una década con los mejores materiales y proveedores de Argentina — más de 25 proyectos de alta gama entregados.",
      imageUrl: `${WP}/2021/10/MODO-CASA-PEDRO-GOYENA-PH_FEDERICO_KULEKDJIAN-11.jpg`,
      imageAlt: isEn ? "Goyena — luxury interior" : "Goyena — interior de lujo",
    },
    {
      id: "personalizado",
      title: isEn ? "Bespoke" : "Personalizado",
      description: isEn
        ? "Every project starts from scratch — we listen, interpret and create something unique. No two projects alike."
        : "Cada proyecto parte de cero — escuchamos, interpretamos y creamos algo único. No hay dos proyectos iguales.",
      imageUrl: `${WP}/2023/09/unkanny_v2-005.jpg`,
      imageAlt: isEn ? "Unkanny — bespoke interior" : "Unkanny — interior único",
    },
    {
      id: "acompanamiento",
      title: isEn ? "Full support" : "Acompañamiento",
      description: isEn
        ? "Present at every decision — from the initial sketch to delivery day. Your vision is our permanent priority."
        : "Presentes en cada decisión — del boceto inicial al día de entrega. Tu visión es nuestra prioridad permanente.",
      imageUrl: `${WP}/2021/10/MODO-CASA-ALVEAR-TOWER-PISO-12-PH-FEDERICO-KULEKDJIAN-03.jpg`,
      imageAlt: isEn ? "Alvear Tower — interior" : "Alvear Tower — interior",
    },
  ];

  return (
    <section className="section bg-dark text-white">
      <div className="container">
        {/* Header — alineado a la izquierda, sin bloque en la esquina derecha */}
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
              ? "The difference is in the details."
              : "La diferencia está en los detalles."}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-lg text-sm leading-relaxed text-white/55"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isEn
              ? "Four commitments that define how we work — and why more than 25 studios trusted us with their space."
              : "Cuatro compromisos que definen cómo trabajamos — y por qué más de 25 estudios eligen confiarnos su espacio."}
          </motion.p>
        </motion.div>

        {/* 4-column grid, sin números, fotos en color */}
        <div className="grid grid-cols-1 gap-8 border-t border-white/12 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {differentiators.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="flex flex-col gap-5"
            >
              {/* Foto en color, no grayscale */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  color: "white",
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed text-white/55"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
