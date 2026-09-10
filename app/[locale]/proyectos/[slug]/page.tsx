"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import { projects, getProjectById } from "@/lib/projects";
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

  // Schema.org / JSON-LD, para que Google e IAs reconozcan y citen la obra
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.memoriaDescriptiva,
    image: project.image,
    locationCreated: {
      "@type": "Place",
      name: project.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "AR",
        addressLocality: project.location,
        streetAddress: project.locationFull,
      },
    },
    dateCreated: project.year,
    genre: project.category,
    keywords: project.keywords.join(", "),
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

  const specItems = [
    { label: isEn ? "Status" : "Estado", value: project.status },
    { label: isEn ? "Year" : "Año", value: project.year },
    { label: isEn ? "Location" : "Ubicación", value: project.location },
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

        {/* Ficha técnica, spec bar editorial minimalista */}
        <section className="border-t border-border bg-white">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeUp}
              className="mx-auto max-w-5xl py-12 lg:py-16"
            >
              {/* Specs */}
              <div className="grid grid-cols-3 gap-y-8 border-y border-border py-8 sm:gap-0 sm:divide-x sm:divide-border">
                {specItems.map((it) => (
                  <div key={it.label} className="px-2 sm:px-7 sm:first:pl-0">
                    <p
                      className="mb-2.5 text-[0.6rem] uppercase tracking-[0.18em] text-muted"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {it.label}
                    </p>
                    <p
                      className="text-[0.95rem] leading-snug text-foreground"
                      style={{ fontFamily: "var(--font-inter-tight)", fontWeight: 400, letterSpacing: "-0.01em" }}
                    >
                      {it.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Servicios + memoria técnica (contenido real del estudio) */}
              <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <p
                    className="mb-3 text-[0.6rem] uppercase tracking-[0.18em] text-muted"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {isEn ? "Services" : "Servicios"}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground" style={{ fontFamily: "var(--font-inter)" }}>
                    {project.services}
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <p
                    className="mb-3 text-[0.6rem] uppercase tracking-[0.18em] text-muted"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {isEn ? "Technical memo" : "Memoria técnica"}
                  </p>
                  <p className="text-[15px] leading-relaxed text-muted lg:text-base" style={{ fontFamily: "var(--font-inter)" }}>
                    {project.memoriaTecnica}
                  </p>
                </div>
              </div>
            </motion.div>
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
