"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Servicios como filas editoriales, no como cards h-[520px].
 * Cada servicio ocupa una fila con hairline separadora arriba:
 *   [número · título grande · descripción · thumbnail lateral]
 * Sin CardCurtainReveal, sin secuencia scroll-cards, sin fondo negro.
 * Fondo paper, texto negro — coherente con el resto del sitio.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Servicios() {
  const locale = useLocale();
  const isEn = locale === "en";

  const services = [
    {
      id: "diseno-interior",
      number: "01",
      title: isEn ? "Interior Design" : "Diseño Interior",
      description: isEn
        ? "We transform spaces into unique experiences, studying every detail of lighting, textures and layout to reflect your identity."
        : "Transformamos ambientes en experiencias únicas — estudiamos cada detalle de iluminación, texturas y distribución para reflejar tu identidad.",
      image:
        "https://estudiomodocasa.com/wp-content/uploads/2025/06/image-1.jpg",
      alt: isEn ? "Interior design project" : "Proyecto de diseño interior",
    },
    {
      id: "arquitectura",
      number: "02",
      title: isEn ? "Architecture" : "Arquitectura",
      description: isEn
        ? "We design and manage construction projects with a specialized team, ensuring aesthetic and functional coherence at every stage."
        : "Proyectamos y dirigimos obras con un equipo especializado — coherencia estética y funcional en cada etapa del proceso.",
      image:
        "https://estudiomodocasa.com/wp-content/uploads/2022/12/hudson_2025_02.jpg",
      alt: isEn ? "Architecture project" : "Proyecto de arquitectura",
    },
    {
      id: "muebles",
      number: "03",
      title: isEn ? "Custom Furniture" : "Muebles a medida",
      description: isEn
        ? "We design and craft unique furniture that integrates into each space with millimetric precision and first-rate materials."
        : "Diseñamos y fabricamos muebles únicos — se integran a cada espacio con precisión milimétrica y materiales de primera calidad.",
      image:
        "https://estudiomodocasa.com/wp-content/uploads/2023/09/unkanny_v2-004.jpg",
      alt: isEn ? "Custom furniture" : "Muebles de diseño personalizado",
    },
  ];

  return (
    <section className="section bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-10 grid grid-cols-12 gap-6 lg:mb-14"
        >
          <div className="col-span-12 lg:col-span-6">
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              {isEn ? "Services" : "Servicios"}
            </motion.p>
            <motion.h2
              variants={fadeUp}
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
                ? "Three integrated lines of practice."
                : "Tres líneas integradas de práctica."}
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="col-span-12 max-w-sm self-end text-sm leading-relaxed text-muted lg:col-span-4 lg:col-start-9"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isEn
              ? "From concept to delivery, we accompany each project as a single point of contact — with a specialized team behind every decision."
              : "Del concepto a la entrega, acompañamos cada proyecto como interlocutor único — con un equipo especializado detrás de cada decisión."}
          </motion.p>
        </motion.div>

        {/* Rows */}
        <ul className="border-t border-border">
          {services.map((service, i) => (
            <motion.li
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="border-b border-border"
            >
              <div className="grid grid-cols-12 items-center gap-6 py-8 lg:py-10">
                {/* Number */}
                <span
                  className="col-span-2 lg:col-span-1 text-xs text-muted/70 tabular-nums"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {service.number}
                </span>

                {/* Title */}
                <h3
                  className="col-span-10 lg:col-span-3"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--fg)",
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="col-span-12 max-w-xl text-sm leading-relaxed text-muted lg:col-span-5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {service.description}
                </p>

                {/* Thumbnail — small square, right side */}
                <div className="col-span-12 lg:col-span-3">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md lg:aspect-square lg:h-24 lg:w-24 lg:ml-auto">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 96px"
                    />
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
