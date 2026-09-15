"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import { projects, projectFilters, getProjectFilter, type ProjectFilter } from "@/lib/projects";
import { fadeUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/motion";

export default function ProyectosPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [active, setActive] = useState<Exclude<ProjectFilter, "Todos">>("Terminadas");

  const filtered = projects.filter((p) => getProjectFilter(p) === active);

  return (
    <>
      <main>
        {/* Page header. Fondo negro animado (placeholder estético hasta definir
            la foto de portada con el cliente). Glows suaves que se desplazan lento. */}
        <section className="relative overflow-hidden bg-dark pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              aria-hidden="true"
              className="absolute left-[12%] top-[-40%] h-[70vw] w-[70vw] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 62%)",
                filter: "blur(24px)",
              }}
              animate={{ x: ["-8%", "12%", "-8%"], y: ["-6%", "10%", "-6%"], scale: [1, 1.18, 1] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute right-[8%] bottom-[-50%] h-[65vw] w-[65vw] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.055), transparent 60%)",
                filter: "blur(34px)",
              }}
              animate={{ x: ["6%", "-10%", "6%"], y: ["4%", "-8%", "4%"], scale: [1.12, 1, 1.12] }}
              transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Viñeta sutil para profundidad */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55))" }}
            />
          </div>
          <div className="container relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeUp}
                className="eyebrow-light mb-4"
              >
                Portfolio
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
                {isEn ? "Our projects." : "Nuestros proyectos."}
              </motion.h1>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-[60px] z-30 border-b border-border bg-white/95 backdrop-blur-md">
          <div className="container">
            <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
              {projectFilters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  className="shrink-0 rounded-full px-5 py-2 text-sm transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    letterSpacing: "0.04em",
                    background: active === f.id ? "var(--fg)" : "transparent",
                    color: active === f.id ? "white" : "var(--muted)",
                    border: active === f.id ? "1px solid var(--fg)" : "1px solid var(--border)",
                  }}
                >
                  {isEn ? f.en : f.es}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-white pt-10 pb-24 lg:pt-12 lg:pb-32">
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((project) => (
                  <motion.div key={project.id} variants={scaleIn}>
                    <Link href={`/${locale}/proyectos/${project.id}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface">
                        {/* <img> plano a propósito: las imágenes del WP viejo fallan
                            intermitentemente en el optimizer de Next (mismo criterio que el Hero). */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image}
                          alt={project.alt}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <span
                            className="mb-1 block text-[0.6rem] uppercase tracking-widest text-white/60"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                          >
                            {project.status} · {project.year}
                          </span>
                          <h3
                            className="text-lg font-medium text-white"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                          >
                            {project.name}
                          </h3>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <p
                            className="text-sm font-medium text-foreground"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                          >
                            {project.name}
                          </p>
                          <p
                            className="mt-0.5 text-xs text-muted"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {project.location}
                          </p>
                        </div>
                        <span
                          className="text-xs text-muted"
                          style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                          {project.year}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="py-24 text-center">
                <p
                  className="mx-auto max-w-md text-lg text-foreground"
                  style={{ fontFamily: "var(--font-inter-tight)", fontWeight: 400 }}
                >
                  {isEn ? "Coming soon." : "Muy pronto."}
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted" style={{ fontFamily: "var(--font-inter)" }}>
                  {isEn
                    ? "We're preparing this selection of projects."
                    : "Estamos preparando esta selección de proyectos."}
                </p>
              </div>
            )}
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
