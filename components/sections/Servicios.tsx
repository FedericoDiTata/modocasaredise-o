"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealDescription,
  CardCurtain,
  useCardCurtainRevealContext,
} from "@/components/ui/card-curtain-reveal";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cardEntrance = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    opacity: 0,
  },
  visible: (i: number) => ({
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: i * 0.15,
      ease: EASE_OUT_EXPO,
    },
  }),
} as const;

// Card: h-[520px], footer: h-56 (224px), gap-2 (8px) → body: 288px
// Card visual center from body top = 520/2 = 260px
// Hover position: just above description (absolute bottom-0 pb-8, ~100px from body bottom → top ≈ 188px; title at 140px leaves ~12px gap)
function ServiceCardTitle({ title }: { title: string }) {
  const { isMouseIn } = useCardCurtainRevealContext();
  return (
    <motion.h3
      className="absolute left-0 right-0 px-8 text-2xl font-medium leading-tight text-white"
      style={{
        fontFamily: "var(--font-inter-tight)",
        textAlign: isMouseIn ? "left" : "center",
      }}
      animate={isMouseIn
        ? { top: 140, y: "0%" }
        : { top: 260, y: "-50%" }
      }
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      {title}
    </motion.h3>
  );
}

export default function Servicios() {
  const locale = useLocale();
  const isEn = locale === "en";
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });
  const [activeCards, setActiveCards] = useState([false, false, false]);

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setActiveCards((p) => [true, p[1], p[2]]), 0),
      setTimeout(() => setActiveCards((p) => [p[0], true, p[2]]), 700),
      setTimeout(() => setActiveCards((p) => [p[0], p[1], true]), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const services = [
    {
      id: "diseno-interior",
      title: isEn ? "Interior Design" : "Diseño Interior",
      description: isEn
        ? "We transform spaces into unique experiences, studying every detail of lighting, textures and layout to reflect your identity."
        : "Transformamos ambientes en experiencias únicas, estudiando cada detalle de iluminación, texturas y distribución para reflejar tu identidad.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
      alt: isEn ? "Modern interior design living room" : "Sala de diseño interior moderno",
      number: "01",
    },
    {
      id: "arquitectura",
      title: isEn ? "Architecture" : "Arquitectura",
      description: isEn
        ? "We design and manage construction projects with a specialized team, ensuring aesthetic and functional coherence at every stage."
        : "Proyectamos y dirigimos obras con un equipo especializado, garantizando coherencia estética y funcional en cada etapa del proceso.",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      alt: isEn ? "Contemporary architecture project" : "Proyecto de arquitectura contemporánea",
      number: "02",
    },
    {
      id: "muebles",
      title: isEn ? "Custom Furniture" : "Muebles a medida",
      description: isEn
        ? "We design and craft unique furniture that integrates into each space with millimetric precision and first-rate materials."
        : "Diseñamos y fabricamos muebles únicos que se integran a cada espacio con precisión milimétrica y materiales de primera calidad.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      alt: isEn ? "Custom design furniture" : "Muebles de diseño personalizado",
      number: "03",
    },
  ];

  return (
    <section className="section bg-background">
      <div className="container">
        {/* Header — description left-aligned below title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-14 lg:mb-20"
        >
          <motion.p variants={fadeUp} className="eyebrow mb-4">
            {isEn ? "Our services" : "Nuestros servicios"}
          </motion.p>
          <div className="clip-text">
            <motion.h2
              variants={wipeUp}
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "var(--fg)",
              }}
            >
              {isEn ? "Every space has a story." : "Cada espacio tiene una historia."}
              <br />
              <em
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontStyle: "italic",
                  color: "var(--fg)",
                }}
              >
                {isEn ? "We design it." : "Nosotros la diseñamos."}
              </em>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-sm leading-relaxed text-muted"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isEn
              ? "Three integrated service lines to bring each project to life, from concept to delivery."
              : "Tres líneas de servicio integradas para dar vida a cada proyecto, desde el concepto hasta la entrega."}
          </motion.p>
        </motion.div>

        {/* Cards — each animates independently with staggered clip-path wipe */}
        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              variants={cardEntrance}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <CardCurtainReveal
                active={activeCards[i]}
                className="h-[520px] cursor-default rounded-xl text-white"
                style={{ backgroundColor: "#08090A" }}
              >
                <CardCurtainRevealBody className="relative">
                  {/* Number — top-left */}
                  <span
                    className="absolute top-8 left-8 text-[0.65rem] font-medium uppercase tracking-widest text-white/30"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {service.number}
                  </span>

                  {/* Title — centered in rest, moves above description on hover */}
                  <ServiceCardTitle title={service.title} />

                  {/* Description — bottom of card body, revealed on hover */}
                  <CardCurtainRevealDescription className="absolute bottom-0 left-0 right-0 px-8 pb-8">
                    <p
                      className="text-sm leading-relaxed text-white/65"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {service.description}
                    </p>
                  </CardCurtainRevealDescription>

                  {/* Mix-blend-difference sweep — the signature curtain effect */}
                  <CardCurtain className="bg-white" />
                </CardCurtainRevealBody>

                <CardCurtainRevealFooter className="relative h-56 shrink-0 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </CardCurtainRevealFooter>
              </CardCurtainReveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
