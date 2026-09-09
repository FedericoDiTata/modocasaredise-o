"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Página "El Estudio", reencuadrada según feedback ronda 2:
 *  , dejar de comunicar solo "dos socios" → equipo, organización y estructura.
 *  , cantidad de obras corregida a +150.
 *  , fotos de equipo en blanco y negro (confirmado por el cliente).
 *  , bio de Máximo.
 *  , link a la sección de Prensa (completa).
 *
 * PLACEHOLDER: el hero usa la foto de los dos directores hasta tener una foto
 * GRUPAL real del equipo trabajando (pedida al cliente); la bio de Máximo es
 * provisional hasta el texto definitivo del equipo de comunicación.
 */

const stats = [
  { value: "2009", label: "Fundación" },
  { value: "+150", label: "Proyectos realizados" },
  { value: "15", label: "Años de trayectoria" },
];

const directores = [
  {
    name: "Máximo Ferraro",
    role: "Cofundador · Dirección",
    bio: "Lidera Estudio Modo Casa y a su equipo, con foco en la visión de cada proyecto y una obsesión por el detalle que se traslada de la primera idea a la obra terminada.",
  },
  {
    name: "Gustavo Yankelevich",
    role: "Cofundador · Dirección",
    bio: "Acompaña la dirección del estudio aportando criterio proyectual y una mirada sobre la materialidad y la resolución técnica de cada espacio.",
  },
];

// El orden de las fotos matchea el orden de arriba (Máximo, Gustavo).
const directorImages: Record<string, string> = {
  "Máximo Ferraro": "/equipo/maximo-ferraro.jpg",
  "Gustavo Yankelevich": "/equipo/gustavo-yankelevich.jpg",
};

export default function EstudioPage() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <>
      <main>
        {/* Hero, foto de equipo/dirección en B&N (placeholder hasta foto grupal real) */}
        <section className="relative flex h-[92vh] min-h-[560px] items-end overflow-hidden bg-dark">
          <Image
            src="/equipo/directores-hero.jpg"
            alt="Dirección y equipo de Estudio Modo Casa"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 34%", filter: "grayscale(1)" }}
            sizes="100vw"
          />
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
                  {isEn ? "Behind every project, a team." : "Detrás de cada obra, un equipo."}
                </motion.h1>
              </div>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/65"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isEn
                  ? "Led by Máximo Ferraro and Gustavo Yankelevich, Estudio Modo Casa specialises in interior design, with a team of over 15 years and 150+ projects shaping high-end spaces in Argentina and abroad."
                  : "Dirigido por Máximo Ferraro y Gustavo Yankelevich, Estudio Modo Casa es un estudio especializado en interiorismo, con un equipo de más de 15 años y 150+ proyectos proyectando espacios de alta gama en Argentina y el exterior."}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Trayectoria */}
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
                          .replace("Proyectos realizados", "Projects delivered")
                          .replace("Años de trayectoria", "Years of practice")
                      : s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Texto de trayectoria + equipo/prensa */}
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
                    ? "Estudio Modo Casa was born in 2009 from a simple conviction: every space has the potential to transform the lives of those who live in it. Today it is an organization with a multidisciplinary team and a working method built over more than 150 residential and commercial projects, grounded in listening, technical precision and first-rate materials."
                    : "Estudio Modo Casa nació en 2009 con una convicción simple: cada espacio tiene el potencial de transformar la vida de quienes lo habitan. Hoy es una organización con un equipo multidisciplinario y un método de trabajo construido a lo largo de más de 150 proyectos residenciales y comerciales, basado en la escucha, la precisión técnica y los materiales de primera calidad."}
                </p>
                <p
                  className="mt-6 text-lg leading-relaxed text-muted lg:text-xl"
                  style={{ fontFamily: "var(--font-inter)", lineHeight: 1.7 }}
                >
                  {isEn
                    ? "Behind the direction, a team of designers, project leads and site managers accompanies every project from the first sketch to the delivery of keys."
                    : "Detrás de la dirección, un equipo de diseñadores, proyectistas y directores de obra acompaña cada proyecto desde el primer boceto hasta la entrega de llaves."}
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeUp}
                className="lg:col-span-5"
              >
                <p className="eyebrow mb-5">{isEn ? "In the press" : "En los medios"}</p>
                <p className="mb-6 text-sm leading-relaxed text-muted" style={{ fontFamily: "var(--font-inter)" }}>
                  {isEn
                    ? "The studio's work has been featured in Forbes, La Nación, Clarín, Infobae, iProfesional, Newsweek and more."
                    : "El trabajo del estudio apareció en Forbes, La Nación, Clarín, Infobae, iProfesional, Newsweek y más."}
                </p>
                <Link
                  href={`/${locale}/prensa`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {isEn ? "See all press" : "Ver toda la prensa"}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dirección, fotos en blanco y negro + bio */}
        <section className="bg-surface pb-20 pt-4 lg:pb-28">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="mb-12 max-w-2xl"
            >
              <motion.p variants={fadeUp} className="eyebrow mb-4">
                {isEn ? "Direction" : "Dirección"}
              </motion.p>
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
                  {isEn ? "Who leads the studio" : "Quiénes dirigen el estudio"}
                </motion.h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
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
                      src={directorImages[d.name]}
                      alt={d.name}
                      fill
                      className="object-cover object-top"
                      style={{ filter: "grayscale(1)" }}
                      sizes="(max-width: 640px) 100vw, 45vw"
                    />
                  </div>
                  <p
                    className="mb-1 text-[0.6rem] uppercase tracking-[0.2em] text-accent"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {d.role}
                  </p>
                  <h3
                    className="mb-2 text-xl font-medium"
                    style={{ fontFamily: "var(--font-inter-tight)", color: "var(--fg)" }}
                  >
                    {d.name}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)", color: "var(--muted)" }}>
                    {d.bio}
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
