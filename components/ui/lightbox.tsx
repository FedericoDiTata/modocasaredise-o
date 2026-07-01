"use client";

import { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";

type LightboxImage = { src: string; alt: string; placeholder?: boolean };

type LightboxProps = {
  images: readonly LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/**
 * Lightbox reusable copiado del patrón de la landing médica.
 * Soporta placeholders (sin src) para el modo "próximamente".
 */
export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const img = images[index];
  const [fading, setFading] = useState(false);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  useEffect(() => {
    setFading(true);
    const t = setTimeout(() => setFading(false), 150);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/92" />

      <span
        className="absolute top-6 left-6 z-10 text-white/50 text-[13px] font-medium tracking-[0.1em]"
        style={{ fontFamily: "var(--font-inter-tight)" }}
      >
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>

      <button
        onClick={onClose}
        className="absolute top-5 right-6 z-10 flex h-10 w-10 cursor-pointer items-center justify-center text-white/60 transition-colors duration-200 hover:text-white"
        aria-label="Cerrar"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-white/50 transition-colors duration-200 hover:text-white md:left-6"
        aria-label="Anterior"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-white/50 transition-colors duration-200 hover:text-white md:right-6"
        aria-label="Siguiente"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div
        className="relative z-10 flex h-[80vh] w-[90vw] items-center justify-center md:h-[86vh] md:w-[82vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {img.placeholder || !img.src ? (
          <div className="relative flex h-full w-full items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute inset-4 border border-dashed border-white/15"
            />
            <span
              className="text-white/40"
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "0.7rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              Foto
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="max-h-full max-w-full object-contain transition-opacity duration-150"
            style={{ opacity: fading ? 0 : 1 }}
          />
        )}
      </div>
    </motion.div>
  );
}
