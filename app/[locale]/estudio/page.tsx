"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Página "El Estudio", reescrita según el feedback del cliente:
 *  , se elimina el hero redundante "Diseño que transforma".
 *  , entra con una foto grande de los dos socios que ocupa toda la pantalla.
 *  , la trayectoria se cuenta fuerte y corta (fundación, obras, prensa).
 *  , los directores en fotos más grandes y en blanco y negro (elegante).
 *  , se quitó la sección de Servicios (estaba duplicada con el home) y la de
 *    Valores para reducir el scroll: es una página de alto impacto, no larga.
 */

const stats = [
  { value: "2009", label: "Fundación" },
  { value: "+30", label: "Obras entregadas" },
  { value: "15", label: "Años de trayectoria" },
];

// Prensa donde apareció el estudio (nota provisoria: confirmar listado completo).
const prensa = ["Forbes", "Clarín", "La Nación", "Newsweek", "Perfil", "iProfesional"];

const directores = [
  { name: "Gustavo Yankelevich", image: "/equipo/gustavo-yankelevich.jpg" },
  { name: "Máximo Ferraro", image: "/equipo/maximo-ferraro.jpg" },
];

export default function EstudioPage() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <>
      <main>
        {/* Hero, foto grande de los dos socios ocupando toda la pantalla */}
        <section className="relative flex h-[92vh] min-h-[560px] items-end overflow-hidden bg-dark">
          <Image
            src="/equipo/directores-hero.jpg"
            alt="Gustavo Yankelevich y Máximo Ferraro, directores de Estudio Modo Casa"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 34%" }}
            sizes="100vw"
          />
          {/* Doble scrim: base inferior + lateral izquierdo para legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          <div className="container relative z-10 pb-14 lg:pb-20">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
              <motion.p variants={fadeUp} className="eyebrow-light mb-4">
                {isEn ? "The studio" : "El estudio"}
              </motion.p>
              <div className="clip-text">
                <motion.h1
                  variants={wipeUp}
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
                    fontWeight: 400,
                    color: "white",
                    lineHeight: 1.04,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {isEn
                    ? "Two partners, one obsession with detail."
                    : "Dos socios, una misma obsesión por el detalle."}
                </motion.h1>
              </div>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/65"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isEn
                  ? "Gustavo Yankelevich and Máximo Ferraro lead a studio that has been shaping high-end residential and commercial spaces in Buenos Aires for over fifteen years."
                  : "Gustavo Yankelevich y Máximo Ferraro dirigen un estudio que proyecta espacios residenciales y comerciales de alta gama en Buenos Aires desde hace más de quince años."}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Trayectoria, contada fuerte y corta */}
        <section className="section bg-white">
          <div className="container">
            {/* Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="grid grid-cols-1 gap-8 border-b border-border pb-12 sm:grid-cols-3"
            >
              {stats.map((s) => (
                <motion.div key={s.label} variants={fadeUp}>
                  <div
                    className="leading-none"
                    style={{
                      fontFamily: "var(--font-inter-tight)",
                      fontSize: "clamp(2.75rem, 5vw, 4rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.03em",
                      color: "var(--fg)",
                    }}
                  >
                    {s.value}
                  </div>
                  <p className="mt-3 text-sm text-muted" style={{ fontFamily: "var(--font-inter)" }}>
                    {isEn
                      ? s.label
                          .replace("Fundación", "Founded")
                          .replace("Obras entregadas", "Projects delivered")
                          .replace("Años de trayectoria", "Years of practice")
                      : s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Texto de trayectoria + prensa */}
            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeUp}
                className="lg:col-span-7"
              >
                <p
                  className="text-lg leading-relaxed text-foreground lg:text-xl"
                  style={{ fontFamily: "var(--font-inter)", lineHeight: 1.7 }}
                >
                  {isEn
                    ? "Estudio Modo Casa was born in 2009 from a simple conviction: every space has the potential to transform the lives of those who live in it. Over more than thirty residential and commercial projects, we built a method grounded in listening, technical precision and first-rate materials."
                    : "Estudio Modo Casa nació en 2009 con una convicción simple: cada espacio tiene el potencial de transformar la vida de quienes lo habitan. A lo largo de más de treinta proyectos residenciales y comerciales, construimos un método basado en la escucha, la precisión técnica y los materiales de primera calidad."}
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeUp}
                className="lg:col-span-5"
              >
                <p className="eyebrow mb-5">{isEn ? "Featured in" : "Presencia en prensa"}</p>
                {/* Muro de logos, placeholder tipográfico (masthead serif) hasta
                    cargar los SVG reales de cada medio. Grises → color en hover. */}
                <div className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-3">
                  {prensa.map((medio) => (
                    <div
                      key={medio}
                      className="group flex h-16 items-center justify-center border-b border-r border-border px-2"
                    >
                      <span
                        className="text-lg text-muted/70 transition-colors duration-300 group-hover:text-foreground"
                        style={{ fontFamily: "var(--font-serif), Georgia, serif", letterSpacing: "-0.01em" }}
                      >
                        {medio}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Directores, fotos grandes en blanco y negro */}
        <section className="bg-surface pb-20 pt-4 lg:pb-28">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="mb-12 text-center"
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
                  {isEn ? "Our directors" : "Nuestros directores"}
                </motion.h2>
              </div>
            </motion.div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
              {directores.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 45vw"
                    />
                  </div>
                  <p
                    className="mb-1 text-[0.6rem] uppercase tracking-[0.2em] text-accent"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    Director
                  </p>
                  <h3
                    className="mb-1 text-xl font-medium"
                    style={{ fontFamily: "var(--font-inter-tight)", color: "var(--fg)" }}
                  >
                    {d.name}
                  </h3>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "var(--muted)" }}>
                    Lorem ipsum dolor
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
