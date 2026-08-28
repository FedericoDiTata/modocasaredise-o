"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import { projects, getProjectById, getFicha } from "@/lib/projects";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = use(params);
  const locale = useLocale();
  const isEn = locale === "en";
  const project = getProjectById(slug);

  if (!project) notFound();

  const related = projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

  const ficha = getFicha(project);

  // Schema.org / JSON-LD, para que Google e IAs reconozcan y citen la obra
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    image: project.image,
    locationCreated: {
      "@type": "Place",
      name: project.location,
      address: { "@type": "PostalAddress", addressCountry: "AR", addressLocality: project.location },
    },
    dateCreated: project.year,
    genre: project.category,
    ...(ficha.materials.length ? { material: ficha.materials } : {}),
    creator: {
      "@type": "Organization",
      name: "Estudio Modo Casa",
      url: "https://estudiomodocasa.com",
    },
    author: {
      "@type": "Organization",
      name: "Estudio Modo Casa",
    },
  };

  const fichaRows = [
    { label: isEn ? "Status" : "Estado", value: ficha.status },
    { label: isEn ? "Year" : "Año", value: project.year },
    { label: isEn ? "Location" : "Ubicación", value: project.location },
    { label: isEn ? "Surface" : "Superficie", value: ficha.area ?? (isEn ? "TBC" : "A confirmar") },
    { label: isEn ? "Scope" : "Alcance", value: ficha.scope },
    { label: isEn ? "Category" : "Categoría", value: project.category },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* Hero */}
        <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <Image
            src={project.image}
            alt={project.alt}
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
                  {project.category}
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
                  {project.name}
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  className="mt-3 text-sm text-white/50"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {project.location} · {project.year}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="section bg-white">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  lineHeight: 1.8,
                  color: "var(--muted)",
                }}
              >
                {project.description}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Ficha técnica + memoria descriptiva */}
        <section className="border-t border-border bg-surface py-16 lg:py-24">
          <div className="container">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
              {/* Ficha técnica */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeUp}
                className="lg:col-span-5"
              >
                <p className="eyebrow mb-6">{isEn ? "Technical sheet" : "Ficha técnica"}</p>
                <dl>
                  {fichaRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-6 border-b border-border py-3.5"
                    >
                      <dt
                        className="text-xs uppercase tracking-[0.12em] text-muted"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                      >
                        {row.label}
                      </dt>
                      <dd
                        className="text-right text-sm text-foreground"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Materialidades */}
                <p
                  className="mb-3 mt-8 text-xs uppercase tracking-[0.12em] text-muted"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {isEn ? "Dominant materials" : "Materialidades dominantes"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ficha.materials.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-border bg-white px-3.5 py-1.5 text-xs text-foreground"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {ficha.photographer && (
                  <p
                    className="mt-8 text-xs text-muted"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {isEn ? "Photography" : "Fotografía"}: {ficha.photographer}
                  </p>
                )}
              </motion.div>

              {/* Memoria descriptiva: Desafío / Solución */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeUp}
                className="lg:col-span-7"
              >
                <p className="eyebrow mb-6">{isEn ? "Design memo" : "Memoria descriptiva"}</p>
                <div className="space-y-8">
                  <div>
                    <h3
                      className="mb-2 text-sm font-medium text-foreground"
                      style={{ fontFamily: "var(--font-inter-tight)", letterSpacing: "-0.01em" }}
                    >
                      {isEn ? "The challenge" : "El desafío"}
                    </h3>
                    <p
                      className="text-[15px] leading-relaxed text-muted lg:text-base"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {ficha.challenge}
                    </p>
                  </div>
                  <div>
                    <h3
                      className="mb-2 text-sm font-medium text-foreground"
                      style={{ fontFamily: "var(--font-inter-tight)", letterSpacing: "-0.01em" }}
                    >
                      {isEn ? "The solution" : "La solución"}
                    </h3>
                    <p
                      className="text-[15px] leading-relaxed text-muted lg:text-base"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {ficha.solution}
                    </p>
                  </div>
                </div>

                {ficha.provisional && (
                  <p
                    className="mt-10 border-l-2 border-border pl-4 text-xs italic text-muted/70"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {isEn
                      ? "Provisional technical data — to be confirmed with the studio."
                      : "Datos técnicos provisorios — a confirmar con el estudio."}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="pb-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.gallery.map((src, i) => {
                const total = project.gallery.length;
                const isFirst = i === 0;
                const isLastAlone = i === total - 1 && (total - 1) % 2 === 1;
                const fullWidth = isFirst || isLastAlone;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative overflow-hidden rounded-lg ${
                      fullWidth ? "sm:col-span-2 aspect-[16/7]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${project.name}, imagen ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes={fullWidth ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related projects */}
        {related.length > 0 && (
          <section className="section bg-surface">
            <div className="container">
              <p className="eyebrow mb-8">
                {isEn ? "You might also like" : "También te puede interesar"}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <Link key={p.id} href={`/${locale}/proyectos/${p.id}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={p.image}
                        alt={p.alt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <p
                      className="mt-3 text-sm font-medium text-foreground"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {p.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted" style={{ fontFamily: "var(--font-inter)" }}>
                      {p.category} · {p.year}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="bg-white py-12 border-t border-border">
          <div className="container">
            <Link
              href={`/${locale}/proyectos`}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {isEn ? "Back to projects" : "Volver a proyectos"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
