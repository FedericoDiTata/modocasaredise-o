"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import { projects, categories } from "@/lib/projects";
import { fadeUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/motion";

export default function ProyectosPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [active, setActive] = useState<string>("Todos");

  const categoryLabels: Record<string, string> = isEn
    ? { "Todos": "All", "Diseño Interior": "Interior Design", "Arquitectura": "Architecture" }
    : { "Todos": "Todos", "Diseño Interior": "Diseño Interior", "Arquitectura": "Arquitectura" };

  const filtered =
    active === "Todos" ? projects : projects.filter((p) => p.category === active);

  const displayed = filtered.slice(0, Math.floor(filtered.length / 3) * 3);

  return (
    <>
      <main>
        {/* Page header */}
        <section className="bg-dark pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="container">
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
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="shrink-0 rounded-full px-5 py-2 text-sm transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    letterSpacing: "0.04em",
                    background: active === cat ? "var(--fg)" : "transparent",
                    color: active === cat ? "white" : "var(--muted)",
                    border: active === cat ? "1px solid var(--fg)" : "1px solid var(--border)",
                  }}
                >
                  {categoryLabels[cat] ?? cat}
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
                {displayed.map((project) => (
                  <motion.div key={project.id} variants={scaleIn}>
                    <Link href={`/${locale}/proyectos/${project.id}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface">
                        <Image
                          src={project.image}
                          alt={project.alt}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <span
                            className="mb-1 block text-[0.6rem] uppercase tracking-widest text-white/60"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                          >
                            {categoryLabels[project.category] ?? project.category} · {project.year}
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
                            {categoryLabels[project.category] ?? project.category} · {project.location}
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

            {displayed.length === 0 && (
              <p className="py-20 text-center text-muted" style={{ fontFamily: "var(--font-inter)" }}>
                {isEn ? "No projects in this category yet." : "No hay proyectos en esta categoría aún."}
              </p>
            )}
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
