"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";
import { VisualCard } from "@/components/ui/visual-card";

export default function PorQueElegirnos() {
  const locale = useLocale();
  const isEn = locale === "en";

  const WP = "https://estudiomodocasa.com/wp-content/uploads";

  const differentiators = [
    {
      id: "vision",
      title: isEn ? "Integrated vision" : "Visión integral",
      description: isEn
        ? "We manage every stage: project, materials, construction and delivery. One point of contact for the entire process."
        : "Gestionamos cada etapa: proyecto, materiales, obra y entrega. Un interlocutor único para todo el proceso.",
      // Hudson — architecture exterior, the full project from the outside: landscape + structure
      imageUrl: `${WP}/2022/12/hudson_2025_02.jpg`,
      imageAlt: isEn ? "Hudson — contemporary architecture" : "Hudson — arquitectura contemporánea",
    },
    {
      id: "experiencia",
      title: isEn ? "15 years of experience" : "15 años de experiencia",
      description: isEn
        ? "Over a decade with the finest materials and suppliers in Argentina. More than 25 high-end projects delivered."
        : "Más de una década con los mejores materiales y proveedores de Argentina. Más de 25 proyectos de alta gama entregados.",
      // Goyena — Kulekdjian hero shot, high definition, different space type
      imageUrl: `${WP}/2021/10/MODO-CASA-PEDRO-GOYENA-PH_FEDERICO_KULEKDJIAN-11.jpg`,
      imageAlt: isEn ? "Goyena — luxury interior" : "Goyena — interior de lujo",
    },
    {
      id: "personalizado",
      title: isEn ? "Bespoke design" : "Diseño personalizado",
      description: isEn
        ? "Every project starts from scratch. We listen, interpret and create something unique. No two projects alike."
        : "Cada proyecto parte de cero. Escuchamos, interpretamos y creamos algo único. No hay dos proyectos iguales.",
      // Unkanny — editorial staging, unexpected materials, striking scale contrasts: unmistakably custom
      imageUrl: `${WP}/2023/09/unkanny_v2-005.jpg`,
      imageAlt: isEn ? "Unkanny — editorial bespoke interior" : "Unkanny — interior editorial único",
    },
    {
      id: "acompanamiento",
      title: isEn ? "Full support" : "Acompañamiento total",
      description: isEn
        ? "Present at every decision, from the initial sketch to delivery day. Your vision is our permanent priority."
        : "Presentes en cada decisión, desde el boceto inicial hasta el día de entrega. Tu visión es nuestra prioridad permanente.",
      // Alvear Tower — Kulekdjian professional shot, high definition
      imageUrl: `${WP}/2021/10/MODO-CASA-ALVEAR-TOWER-PISO-12-PH-FEDERICO-KULEKDJIAN-03.jpg`,
      imageAlt: isEn ? "Alvear Tower — luxury interior" : "Alvear Tower — interior de lujo",
    },
  ];

  return (
    <section className="h-screen flex items-center bg-dark text-white overflow-hidden">
      <div className="container w-full">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-6"
        >
          <motion.p variants={fadeUp} className="eyebrow-light mb-4">
            {isEn ? "Why choose us" : "Por qué elegirnos"}
          </motion.p>
          <div className="clip-text">
            <motion.h2
              variants={wipeUp}
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "white",
              }}
            >
              {isEn ? "The difference is" : "La diferencia está"}
              <br />
              <em
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontStyle: "italic",
                  color: "white",
                }}
              >
                {isEn ? "in the details." : "en los detalles."}
              </em>
            </motion.h2>
          </div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid gap-3 sm:grid-cols-2"
        >
          {differentiators.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <VisualCard
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                imageAlt={item.imageAlt}
                imageClassName="h-48"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
