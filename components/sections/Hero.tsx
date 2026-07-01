"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { wipeUp, fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

const images = [
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80",
    alt: "Diseño interior de sala de estar de lujo",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80",
    alt: "Espacio de cocina contemporáneo",
  },
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
    alt: "Sala de estar minimalista",
  },
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80",
    alt: "Dormitorio de diseño premium",
  },
  {
    src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1920&q=80",
    alt: "Interior arquitectónico",
  },
];

const INTERVAL = 6000;

export default function Hero() {
  const locale = useLocale();
  const isEn = locale === "en";

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const tick = () => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setIsAnimating(true);
      }, 50);
    };

    intervalRef.current = setInterval(tick, INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrent(index);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, INTERVAL);
  };

  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden">
      {/* Image carousel */}
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <div
            key={`${img.src}-${current === i}`}
            className={current === i && isAnimating ? "animate-ken-burns absolute inset-0" : "absolute inset-0"}
            style={{
              animation: current === i && isAnimating
                ? `${i % 2 === 0 ? "kenBurns" : "kenBurns2"} 8s ease-in-out forwards`
                : "none",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col justify-end">
        <div className="container pb-20 lg:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              className="eyebrow-light mb-6"
            >
              Buenos Aires · Argentina
            </motion.p>

            {/* Headline */}
            <h1
              className="mb-6 leading-[1.05] tracking-tight text-white"
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                fontWeight: 400,
              }}
            >
              <div className="clip-text">
                <motion.span variants={wipeUp} className="block">
                  {isEn ? "Spaces that" : "Espacios que"}
                </motion.span>
              </div>
              <div className="clip-text">
                <motion.span variants={wipeUp} className="block" style={{ transitionDelay: "0.1s" }}>
                  <em
                    className="not-italic"
                    style={{
                      fontFamily: "var(--font-instrument-serif)",
                      fontStyle: "italic",
                      color: "white",
                    }}
                  >
                    {isEn ? "define" : "definen"}
                  </em>{" "}
                  {isEn ? "who we are." : "quiénes somos."}
                </motion.span>
              </div>
            </h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="mb-10 max-w-lg text-base leading-relaxed text-white/70 lg:text-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {isEn
                ? "High-end interior design and architecture for those who value every detail."
                : "Diseño interior y arquitectura de alta gama para quienes valoran cada detalle."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href={`/${locale}/proyectos`}
                data-magnetic
                className="inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-medium text-foreground transition-all duration-300 hover:bg-white/90 hover:scale-[1.02]"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {isEn ? "View projects" : "Ver proyectos"}
              </Link>
              <Link
                href={`/${locale}/estudio`}
                data-magnetic
                className="inline-flex h-12 items-center rounded-full border border-white/40 px-7 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/80 hover:bg-white/10"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {isEn ? "Meet the studio" : "Conocer el estudio"}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Imagen ${i + 1}`}
              className="transition-all duration-300"
            >
              <span
                className={`block h-px transition-all duration-500 ${
                  i === current ? "w-8 bg-white" : "w-3 bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2">
          <span
            className="text-[0.65rem] uppercase tracking-widest text-white/40"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            Scroll
          </span>
          <div className="animate-scroll-pulse">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-white/40"
            >
              <path
                d="M8 3v10M3.5 8.5L8 13l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
