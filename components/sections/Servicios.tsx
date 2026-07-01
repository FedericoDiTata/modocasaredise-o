"use client";

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
        ? "We transform spaces into unique experiences, studying every detail of lighting, textures and layout to reflect your identity."
        : "Transformamos ambientes en experiencias únicas, estudiamos cada detalle de iluminación, texturas y distribución para reflejar tu identidad.",
      image:
        "https://estudiomodocasa.com/wp-content/uploads/2025/06/image-1.jpg",
      alt: isEn ? "Interior design project" : "Proyecto de diseño interior",
    },
    {
      id: "arquitectura",
      title: isEn ? "Architecture" : "Arquitectura",
      description: isEn
        ? "We design and manage construction projects with a specialized team, ensuring aesthetic and functional coherence at every stage."
        : "Proyectamos y dirigimos obras con un equipo especializado, coherencia estética y funcional en cada etapa del proceso.",
      image:
        "https://estudiomodocasa.com/wp-content/uploads/2022/12/hudson_2025_02.jpg",
      alt: isEn ? "Architecture project" : "Proyecto de arquitectura",
    },
    {
      id: "muebles",
      title: isEn ? "Custom Furniture" : "Muebles a medida",
      description: isEn
        ? "We design and craft unique furniture that integrates into each space with millimetric precision and first-rate materials."
        : "Diseñamos y fabricamos muebles únicos, se integran a cada espacio con precisión milimétrica y materiales de primera calidad.",
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
              ? "Three integrated lines of practice."
              : "Tres líneas integradas de práctica."}
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
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface lg:aspect-[16/10]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(8,9,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,9,10,0.04) 1px, transparent 1px)",
                      backgroundSize: "48px 48px",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-4 border border-dashed border-muted/40"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-muted/60"
                        style={{
                          fontFamily: "var(--font-inter-tight)",
                          fontSize: "0.7rem",
                          letterSpacing: "0.32em",
                          textTransform: "uppercase",
                        }}
                      >
                        Foto
                      </span>
                    </div>
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
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
