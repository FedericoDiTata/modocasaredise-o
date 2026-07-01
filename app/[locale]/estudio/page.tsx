"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";

const servicios = [
  {
    number: "01",
    title: "Diseño Interior",
    description:
      "Abordamos cada proyecto desde cero: análisis del espacio, moodboard de concepto, selección de materiales, iluminación, texturas y paleta cromática. Coordinamos proveedores y supervisamos cada etapa para garantizar que el resultado coincida exactamente con la propuesta.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  },
  {
    number: "02",
    title: "Arquitectura",
    description:
      "Proyectamos y dirigimos obras residenciales y comerciales de alta gama. Trabajamos desde el anteproyecto hasta la entrega de llaves: diseño de planos, gestión de permisos, dirección de obra y coordinación de todos los gremios involucrados.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
  },
  {
    number: "03",
    title: "Muebles a medida",
    description:
      "Diseñamos y fabricamos muebles únicos que se integran con precisión a cada espacio. Trabajamos con las mejores maderas, lacas y herrajes del mercado. Cada pieza es producida en nuestro taller con control de calidad en cada etapa del proceso.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
];

const valores = [
  { label: "Escucha activa", desc: "Empezamos por entender. Cada proyecto parte de una conversación profunda con el cliente." },
  { label: "Precisión técnica", desc: "Documentamos cada detalle. Nuestros planos y especificaciones evitan sorpresas en obra." },
  { label: "Materiales de calidad", desc: "Seleccionamos proveedores que comparten nuestro estándar de excelencia." },
  { label: "Acompañamiento total", desc: "Presentes en cada decisión, desde el boceto hasta el día de entrega." },
];

export default function EstudioPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80"
            alt="Estudio Modo Casa, espacio de trabajo"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="container pb-12 lg:pb-16">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                <motion.p variants={fadeUp} className="eyebrow-light mb-3">
                  {isEn ? "The studio" : "El estudio"}
                </motion.p>
                <motion.h1
                  variants={fadeUp}
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight: 400,
                    color: "white",
                    lineHeight: 1.05,
                  }}
                >
                  {isEn ? "Design that transforms." : "Diseño que transforma."}
                </motion.h1>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Historia */}
        <section className="relative overflow-hidden" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(2.5rem,5vw,4rem)" }}>
          {/* Background image, directores juntos, muy transparentada */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://estudiomodocasa.com/wp-content/uploads/2025/06/Estrugamou-01.jpg"
              alt="Estudio Modo Casa"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.91)" }} />
          </div>

          <div className="container relative z-10">
            {/* Text block */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="max-w-2xl mx-auto mb-14 text-center"
            >
              <motion.p variants={fadeUp} className="eyebrow mb-6">Nuestra historia</motion.p>
              <div className="clip-text mb-6">
                <motion.h2
                  variants={wipeUp}
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                  }}
                >
                  15 años creando espacios únicos.
                </motion.h2>
              </div>
              <motion.div variants={fadeUp} className="space-y-4 text-muted" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
                <p>
                  Estudio Modo Casa nació en 2009 con una convicción simple: cada espacio tiene el potencial de transformar la vida de quienes lo habitan. Desde entonces trabajamos con ese principio como guía en cada proyecto.
                </p>
                <p>
                  A lo largo de más de 25 proyectos residenciales y comerciales, construimos un método de trabajo basado en la escucha, la precisión técnica y el uso de materiales de primera calidad. No hacemos dos proyectos iguales porque no hay dos clientes iguales.
                </p>
              </motion.div>
            </motion.div>


          </div>
        </section>

        {/* Directores */}
        <section className="bg-surface" style={{ paddingTop: "clamp(2.5rem,5vw,4rem)", paddingBottom: "clamp(5rem,10vw,9rem)" }}>
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="mb-14 text-center"
            >
              <div className="clip-text">
                <motion.h2
                  variants={wipeUp}
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                  }}
                >
                  Nuestros directores
                </motion.h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 max-w-2xl mx-auto">
              {[
                { name: "Gustavo Yankelevich", image: "/equipo/gustavo-yankelevich.jpg" },
                { name: "Máximo Ferraro", image: "/equipo/maximo-ferraro.jpg" },
              ].map((director, i) => (
                <motion.div
                  key={director.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={director.image}
                      alt={director.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <p
                    className="mb-1 text-[0.6rem] uppercase tracking-[0.2em] text-accent"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    Director
                  </p>
                  <h3
                    className="mb-1 text-lg font-medium"
                    style={{ fontFamily: "var(--font-inter-tight)", color: "var(--fg)" }}
                  >
                    {director.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ fontFamily: "var(--font-inter)", color: "var(--muted)" }}
                  >
                    Diseñador de interiores
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section className="section bg-dark">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="mb-12"
            >
              <motion.p variants={fadeUp} className="eyebrow-light mb-4">Servicios</motion.p>
              <motion.h2
                initial={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 400,
                  color: "white",
                  lineHeight: 1.1,
                }}
              >
                Lo que hacemos.
              </motion.h2>
            </motion.div>

            {/* Mobile: cards apiladas */}
            <div className="lg:hidden space-y-4">
              {servicios.map((s) => (
                <div key={s.number} className="relative h-64 overflow-hidden rounded-xl">
                  <Image src={s.image} alt={s.title} fill className="object-cover" sizes="100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="mb-1 text-[0.6rem] uppercase tracking-widest" style={{ fontFamily: "var(--font-inter-tight)", color: "var(--accent)" }}>{s.number}</p>
                    <h3 className="mb-2 text-lg font-medium text-white" style={{ fontFamily: "var(--font-inter-tight)" }}>{s.title}</h3>
                    <p className="text-xs leading-relaxed text-white/60" style={{ fontFamily: "var(--font-inter)" }}>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: accordion horizontal */}
            <motion.div
              className="hidden lg:flex h-[65vh] gap-1 overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onMouseLeave={() => setActiveService(null)}
            >
              {servicios.map((s, i) => {
                const isActive = activeService === i;
                return (
                  <motion.div
                    key={s.number}
                    className="relative cursor-pointer overflow-hidden"
                    animate={{ flex: isActive ? 5 : 1 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    onHoverStart={() => setActiveService(i)}
                  >
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-all duration-700"
                      style={{ filter: isActive ? "grayscale(0)" : "grayscale(1)" }}
                      sizes="60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                    {/* Strip colapsado: título vertical */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: isActive ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-inter-tight)",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.92)",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {s.title}
                      </span>
                    </motion.div>

                    {/* Panel expandido: contenido */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-10"
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 18 }}
                      transition={{ duration: 0.28, delay: isActive ? 0.15 : 0 }}
                    >
                      <p
                        className="mb-3 text-[0.6rem] uppercase tracking-[0.22em]"
                        style={{ fontFamily: "var(--font-inter-tight)", color: "var(--accent)" }}
                      >
                        {s.number}
                      </p>
                      <h3
                        className="mb-4 text-white"
                        style={{
                          fontFamily: "var(--font-inter-tight)",
                          fontSize: "clamp(1.25rem, 1.8vw, 1.75rem)",
                          fontWeight: 400,
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="max-w-xs text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.58)" }}
                      >
                        {s.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Valores */}
        <section className="section bg-white overflow-hidden">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="mb-14"
            >
              <motion.p variants={fadeUp} className="eyebrow mb-4">Nuestra filosofía</motion.p>
              <div className="clip-text">
                <motion.h2
                  variants={wipeUp}
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                  }}
                >
                  Cómo trabajamos.
                </motion.h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
              {valores.map((v, i) => {
                const icons = [
                  /* 01, Oreja (Escucha activa) */
                  <svg key="ear" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13C7 8.03 10.13 4 14 4C17.87 4 21 8.03 21 13C21 17 19 19 18 21C17.2 22.5 17.3 23.5 15.7 23.5C14.3 23.5 13.3 22.5 13.3 21" />
                    <path d="M13.3 21C13.3 19.5 14 18.5 14.4 17.5C14.8 16.5 14.6 15.5 15 14.3C15.4 13 16.5 12.5 16.8 13.8C17.1 14.8 16.6 16.3 15.6 17.3" />
                    <path d="M10 11.5C10.5 9.5 12 8.3 13.8 8.3" />
                  </svg>,
                  /* 02, Diana con dardo (Precisión técnica) */
                  <svg key="target" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="13" cy="15" r="7.5" />
                    <circle cx="13" cy="15" r="4" />
                    <circle cx="13" cy="15" r="1.3" fill="currentColor" stroke="none" />
                    <path d="M18.5 9.5L14.3 13.7" />
                    <path d="M21.5 6.5L18.5 9.5" />
                    <path d="M18.5 6.5L21.5 6.5L21.5 9.5" />
                  </svg>,
                  /* 03, Brillante con facetas (Materiales de calidad) */
                  <svg key="diamond" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    {/* Contorno: tabla + corona + cinturón + pabellón */}
                    <path d="M10 7H18L21 13L14 24L7 13Z" />
                    {/* Cinturón (línea girdle) */}
                    <path d="M7 13H21" />
                    {/* Facetas de corona */}
                    <path d="M14 7L14 13" />
                    <path d="M12 7L9 13" />
                    <path d="M16 7L19 13" />
                    {/* Facetas de pabellón */}
                    <path d="M10.5 13L14 24" />
                    <path d="M17.5 13L14 24" />
                  </svg>,
                  /* 04, Dos personas (Acompañamiento total) */
                  <svg key="people" width="32" height="28" viewBox="0 0 32 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10.5" cy="7" r="3" />
                    <path d="M4 23C4 18.3 7 15.5 10.5 15.5C12.5 15.5 14.3 16.5 15.5 18" />
                    <circle cx="21" cy="8" r="2.5" />
                    <path d="M15 23C15.2 19 17.5 17 21 17C24.5 17 27 19.5 27 23" />
                    <path d="M15.5 15C17 13.5 18.8 13.2 21 14" />
                  </svg>,
                ];
                return (
                <motion.div
                  key={v.label}
                  className="group relative overflow-hidden border-b border-r border-border px-8 py-10"
                  initial={{ opacity: 0, y: 80, scale: 0.88 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.3, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Ícono visual */}
                  <div className="mb-5 text-accent">{icons[i]}</div>

                  {/* Accent line, grows on hover */}
                  <div
                    className="mb-6 h-px bg-accent transition-all duration-500 ease-out group-hover:w-12"
                    style={{ width: "2rem" }}
                  />

                  <h3
                    className="mb-3 text-base font-medium leading-snug"
                    style={{ fontFamily: "var(--font-inter-tight)", color: "var(--fg)" }}
                  >
                    {v.label}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)", color: "var(--muted)" }}
                  >
                    {v.desc}
                  </p>
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
