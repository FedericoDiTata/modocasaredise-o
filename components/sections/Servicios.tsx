"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Servicios como bloques alternados grande imagen + texto, tipo revista.
 * Cambios respecto a la iteración anterior:
 *  , sin enumeración (01, 02, 03)
 *  , sin thumbnails chicas al costado, se van a imágenes grandes
 *  , cada servicio se lee como un "spread" editorial, no como una fila
 *     horizontal plana
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Servicios() {
  const locale = useLocale();
  const isEn = locale === "en";

  const services = [
    {
      id: "diseno-interior",
      title: isEn ? "Interior Design" : "Diseño Interior",
      description: isEn
        ? "The core of the studio. We work each space from scratch: functional analysis, concept, materials, custom lighting and colour palette. We coordinate suppliers and supervise every stage so the result matches the project exactly."
        : "El corazón del estudio. Trabajamos cada espacio desde cero: análisis funcional, concepto, materiales, iluminación a medida y paleta cromática. Coordinamos proveedores y supervisamos cada etapa para que el resultado coincida exactamente con el proyecto.",
      scope: isEn
        ? "Residential · Commercial · Full project & turnkey"
        : "Residencial · Comercial · Proyecto integral y llave en mano",
      image:
        "https://estudiomodocasa.com/wp-content/uploads/2025/06/image-1.jpg",
      alt: isEn ? "Interior design project" : "Proyecto de diseño interior",
    },
    {
      id: "salud",
      title: isEn ? "Healthcare spaces" : "Espacios para la salud",
      description: isEn
        ? "A dedicated vertical: consulting rooms and clinics that balance patient experience, medical functionality and brand aesthetics. It has its own specialised site."
        : "Una vertical propia: consultorios y clínicas que equilibran la experiencia del paciente, la funcionalidad médica y la estética de marca. Tiene su propio sitio dedicado.",
      scope: isEn
        ? "Clinics · Consulting rooms · Medical fit-out"
        : "Clínicas · Consultorios · Equipamiento médico",
      image:
        "https://estudiomodocasa.com/wp-content/uploads/2025/06/salguerotg-03.jpg",
      alt: isEn ? "Healthcare space project" : "Proyecto de espacio para la salud",
    },
    {
      id: "muebles",
      title: isEn ? "Custom Furniture" : "Muebles a medida",
      description: isEn
        ? "We design and build unique pieces that integrate into each space with millimetric precision. We work with the finest woods, lacquers and hardware, with quality control at every step of production."
        : "Diseñamos y fabricamos piezas únicas que se integran a cada espacio con precisión milimétrica. Trabajamos con las mejores maderas, lacas y herrajes, con control de calidad en cada etapa de producción.",
      scope: isEn
        ? "Joinery · Equipment · Unique pieces"
        : "Carpintería · Equipamiento · Piezas únicas",
      image:
        "https://estudiomodocasa.com/wp-content/uploads/2023/09/unkanny_v2-004.jpg",
      alt: isEn ? "Custom furniture" : "Muebles de diseño personalizado",
    },
  ];

  return (
    <section className="section bg-background">
      <div className="container">
        {/* Header, sin bloque de descripción en la esquina derecha */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-14 max-w-2xl lg:mb-20"
        >
          <motion.p variants={fadeUp} className="eyebrow mb-4">
            {isEn ? "Services" : "Servicios"}
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
              color: "var(--fg)",
            }}
          >
            {isEn
              ? "Interior design specialists, end to end."
              : "Especialistas en interiorismo, de principio a fin."}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-lg text-sm leading-relaxed text-muted"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isEn
              ? "From concept to delivery, we accompany each project as a single point of contact, with a specialized team behind every decision."
              : "Del concepto a la entrega, acompañamos cada proyecto como interlocutor único, con un equipo especializado detrás de cada decisión."}
          </motion.p>
        </motion.div>

        {/* Bloques alternados imagen/texto tipo revista */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {services.map((service, i) => {
            const imageFirst = i % 2 === 0;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.85, ease: EASE }}
                className="grid grid-cols-12 items-center gap-6 lg:gap-12"
              >
                {/* Image */}
                <div
                  className={`col-span-12 lg:col-span-7 ${
                    imageFirst ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface lg:aspect-[16/10]">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`col-span-12 lg:col-span-5 ${
                    imageFirst ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"
                  }`}
                >
                  <h3
                    className="mb-5"
                    style={{
                      fontFamily: "var(--font-inter-tight)",
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      fontWeight: 400,
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                      color: "var(--fg)",
                    }}
                  >
                    {service.title}
                  </h3>
                  <div className="mb-6 h-px w-12 bg-foreground/30" aria-hidden="true" />
                  <p
                    className="max-w-lg text-[15px] leading-relaxed text-muted lg:text-base"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {service.description}
                  </p>
                  <p
                    className="mt-5 text-[0.7rem] uppercase tracking-[0.16em] text-foreground/55"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {service.scope}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA a la página completa de Servicios (incluye el proceso de trabajo) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-16 border-t border-border pt-10 lg:mt-24"
        >
          <Link
            href={`/${locale}/servicios`}
            className="group inline-flex items-center gap-3 text-base font-medium text-foreground transition-colors hover:text-accent"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            {isEn ? "See services and how we work" : "Ver servicios y cómo trabajamos"}
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
