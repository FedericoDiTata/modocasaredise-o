"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, wipeUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/motion";
import { projects as allProjects } from "@/lib/projects";

const FEATURED_IDS = [
  "hudson",                  // Left col top, exterior architecture, open sky
  "casa-terravista",         // Left col bottom, nature, open spaces, horizontal planes
  "palacio-estrugamou",      // Right col top, elegant interior
  "sls",                     // Right col bottom, dark luxury interior
  "nordelta-barrio-el-golf", // Row 2, modern exterior + lush garden
  "aleph",                   // Row 2, geometric architecture
  "sls-puerto-madero",       // Row 2, penthouse + city views
];

const projects = FEATURED_IDS
  .map((id) => allProjects.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function PortfolioDestacado() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <section className="section bg-surface">
      <div className="container">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              {isEn ? "Projects" : "Proyectos"}
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
                {isEn ? "Latest works." : "Últimas obras."}
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xs text-sm leading-relaxed text-muted"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              &ldquo;{isEn
                ? "Every space is an opportunity to tell a story."
                : "Cada espacio es una oportunidad de contar una historia."}&rdquo;
              <span
                className="mt-1 block text-xs tracking-wider text-muted/60"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
               , Gustavo Yankelevich
              </span>
            </motion.p>
          </div>

          <motion.div variants={fadeUp}>
            <Link
              href={`/${locale}/proyectos`}
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {isEn ? "View all projects" : "Ver todos los proyectos"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M2 7h10M7 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {/* Row 1, desktop: left col (Hudson + Terravista) + right col (Palacio + SLS) */}
          <div className="hidden lg:flex gap-3 mb-3" style={{ height: "560px" }}>
            <div className="flex flex-[7] flex-col gap-3">
              <motion.div variants={scaleIn} className="flex-1 min-h-0">
                <ProjectCard project={projects[0]} index={0} />
              </motion.div>
              <motion.div variants={scaleIn} className="flex-1 min-h-0">
                <ProjectCard project={projects[1]} index={1} />
              </motion.div>
            </div>
            <div className="flex flex-[5] flex-col gap-3">
              <motion.div variants={scaleIn} className="flex-1 min-h-0">
                <ProjectCard project={projects[2]} index={2} />
              </motion.div>
              <motion.div variants={scaleIn} className="flex-1 min-h-0">
                <ProjectCard project={projects[3]} index={3} />
              </motion.div>
            </div>
          </div>

          {/* Row 1, mobile: 2-col grid for first 4 projects */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden mb-3">
            {projects.slice(0, 4).map((project, i) => (
              <motion.div key={project.id} variants={scaleIn}>
                <div className="aspect-[4/3]">
                  <ProjectCard project={project} index={i} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2: desktop, columnas alineadas con row superior (7/5) */}
          <div className="hidden lg:flex gap-3" style={{ height: "300px" }}>
            {/* Los 2 de la izquierda juntos = mismo ancho que columna izquierda (flex-7) */}
            <div className="flex flex-[7] gap-3">
              <motion.div variants={scaleIn} className="flex-1 min-h-0">
                <ProjectCard project={projects[4]} index={4} />
              </motion.div>
              <motion.div variants={scaleIn} className="flex-1 min-h-0">
                <ProjectCard project={projects[5]} index={5} />
              </motion.div>
            </div>
            {/* El de la derecha = mismo ancho que columna derecha (flex-5) */}
            <motion.div variants={scaleIn} className="flex-[5] min-h-0">
              <ProjectCard project={projects[6]} index={6} />
            </motion.div>
          </div>

          {/* Row 2: mobile */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            {projects.slice(4).map((project, i) => (
              <motion.div key={project.id} variants={scaleIn}>
                <div className="aspect-[4/3]">
                  <ProjectCard project={project} index={i + 4} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          className="mt-10 flex justify-center lg:hidden"
        >
          <Link
            href={`/${locale}/proyectos`}
            className="inline-flex h-11 items-center rounded-full border border-foreground px-7 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-white"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            {isEn ? "View all projects" : "Ver todos los proyectos"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: NonNullable<(typeof projects)[number]>;
  index: number;
}) {
  const locale = useLocale();

  return (
    <Link href={`/${locale}/proyectos/${project.id}`} className="group block h-full">
      <div className="relative h-full overflow-hidden rounded-lg">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />

        {/* Permanent gradient so text is always legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Extra darkening on hover */}
        <div className="absolute inset-0 bg-black/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Index, top left */}
        <span
          className="absolute left-4 top-4 text-white/40 transition-colors duration-300 group-hover:text-white/70"
          style={{
            fontFamily: "var(--font-inter-tight)",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Name + category */}
        <div className="absolute inset-x-0 bottom-0 p-5 translate-y-0.5 transition-transform duration-500 group-hover:translate-y-0">
          <span
            className="mb-1.5 block text-white/50 transition-colors duration-300 group-hover:text-white/70"
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {project.category}
          </span>
          <h3
            className="text-white leading-tight"
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
              fontWeight: 400,
            }}
          >
            {project.name}
          </h3>
        </div>

        {/* Underline on hover */}
        <div className="absolute bottom-0 left-0 h-px w-0 bg-white/40 transition-all duration-500 ease-out group-hover:w-full" />
      </div>
    </Link>
  );
}
