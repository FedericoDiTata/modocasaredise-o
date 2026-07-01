"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

import { projects as allProjects } from "@/lib/projects";

const projects = allProjects.slice(0, 5).map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  year: p.year,
  image: p.image,
}));

const CARD_WIDTH = "44vw";
const CARD_GAP = "2vw";

export default function PortfolioHorizontal() {
  const locale = useLocale();
  const isEn = locale === "en";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 5 cards × 44vw + gaps — minus 100vw visible + 8vw initial padding
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-168vw"]);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.18], [0, -30]);
  const counterOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <>
      {/* ── Mobile: simple swipeable snap scroll ── */}
      <div className="md:hidden bg-dark">
        <div className="px-6 pb-0 pt-24">
          <p className="eyebrow-light mb-3">{isEn ? "Projects" : "Proyectos"}</p>
          <h2
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
              fontWeight: 400,
              color: "white",
              lineHeight: 1.15,
            }}
          >
            {isEn ? "Latest " : "Últimas "}
            <em
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontStyle: "italic",
                color: "var(--fg)",
              }}
            >
              {isEn ? "works." : "obras."}
            </em>
          </h2>
        </div>

        {/* Snap scroll track */}
        <div
          className="flex gap-4 overflow-x-auto py-10 pl-6 pr-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {projects.map((project, i) => (
            <Link
              key={project.name}
              href={`/${locale}/proyectos/${project.id}`}
              className="snap-start shrink-0 relative overflow-hidden rounded-lg group block"
              style={{ width: "80vw", height: "60vw", minHeight: 240 }}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-active:scale-105"
                sizes="80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span
                  className="mb-2 block"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  0{i + 1}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "1.25rem",
                    fontWeight: 400,
                    color: "white",
                    lineHeight: 1.1,
                  }}
                >
                  {project.name}
                </h3>
                <div className="mt-2 flex items-center gap-3">
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {project.category}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem" }}>
                    {project.year}
                  </span>
                </div>
              </div>
              {/* Accent underline */}
              <div className="absolute bottom-0 left-0 h-px w-full bg-white/30" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── Desktop: sticky horizontal scroll ── */}
      <div ref={containerRef} style={{ height: "600vh" }} className="relative hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden bg-dark">

          {/* Section header */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute left-0 right-0 top-0 z-20 flex items-end justify-between px-8 pt-24 md:px-16 md:pt-28"
          >
            <div>
              <p className="eyebrow-light mb-3">{isEn ? "Projects" : "Proyectos"}</p>
              <h2
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  fontWeight: 400,
                  color: "white",
                  lineHeight: 1.15,
                }}
              >
                {isEn ? "Latest " : "Últimas "}
                <em
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontStyle: "italic",
                    color: "white",
                  }}
                >
                  {isEn ? "works." : "obras."}
                </em>
              </h2>
            </div>

            <div className="hidden items-center gap-2 md:flex" aria-hidden="true">
              <div className="h-px w-12 bg-white/30" />
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {isEn ? "Scroll to explore" : "Scroll para explorar"}
              </p>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/30">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>

          {/* Horizontal track */}
          <div className="absolute inset-x-0 bottom-0 top-48 flex items-center">
            <motion.div style={{ x }} className="flex will-change-transform">
              <div className="shrink-0" style={{ width: "8vw" }} />

              {projects.map((project, i) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={i}
                  cardWidth={CARD_WIDTH}
                  cardGap={CARD_GAP}
                  locale={locale}
                />
              ))}

              {/* Trailing CTA */}
              <div
                className="flex shrink-0 flex-col items-start justify-center pl-16 pr-8"
                style={{ width: "32vw" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.4,
                    marginBottom: "2rem",
                  }}
                >
                  {isEn ? "Every project is unique." : "Cada proyecto es único."}
                  <br />
                  {isEn ? "Yours will be too." : "El tuyo también lo será."}
                </p>
                <a
                  href={`/${locale}/proyectos`}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-3 text-sm text-white/80 transition-all hover:border-white hover:text-white"
                  style={{ fontFamily: "var(--font-inter-tight)", letterSpacing: "0.08em" }}
                >
                  {isEn ? "View all projects" : "Ver todos los proyectos"}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-px origin-left bg-white/40"
            style={{ scaleX: scrollYProgress, width: "100%" }}
          />

          {/* Counter */}
          <motion.div
            style={{ opacity: counterOpacity }}
            className="absolute bottom-8 right-8 md:right-16"
          >
            <span
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {projects.length} proyectos
            </span>
          </motion.div>
        </div>
      </div>
    </>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[number];
  index: number;
  cardWidth: string;
  cardGap: string;
  locale: string;
}

function ProjectCard({ project, index, cardWidth, cardGap, locale }: ProjectCardProps) {
  return (
    <Link
      href={`/${locale}/proyectos/${project.id}`}
      style={{
        width: cardWidth,
        height: "72vh",
        marginRight: cardGap,
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        display: "block",
      }}
      className="group"
      data-cursor="image"
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="44vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <span
          className="mb-4 block"
          style={{
            fontFamily: "var(--font-inter-tight)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          0{index + 1}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-inter-tight)",
            fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
            fontWeight: 400,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {project.name}
        </h3>

        <div className="mt-3 flex items-center gap-4">
          <span
            className="inline-block border border-white/20 px-3 py-1 text-white/60"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {project.category}
          </span>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {project.year}
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-white/60 transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}
