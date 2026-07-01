"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialCardProps {
  testimonial: string;
  author: string;
  project: string;
  avatarUrl: string;
  direction: number;
}

export function TestimonialCard({
  testimonial,
  author,
  project,
  avatarUrl,
  direction,
}: TestimonialCardProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={author}
        custom={direction}
        initial={{ opacity: 0, x: direction * 60, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: direction * -60, scale: 0.96 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-between rounded-2xl p-8 shadow-2xl"
        style={{
          border: "1px solid rgba(196,168,130,0.18)",
          background: "rgba(10,10,10,0.90)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Avatar */}
        <img
          src={avatarUrl}
          alt={`Foto de ${author}`}
          className="pointer-events-none h-24 w-24 rounded-full object-cover"
          style={{ border: "2px solid rgba(196,168,130,0.3)" }}
        />

        {/* Quote */}
        <div className="flex-1 pt-6 text-center">
          <p
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "3rem",
              lineHeight: 0.5,
              color: "rgba(255,255,255,0.4)",
              opacity: 1,
              marginBottom: "0.5rem",
            }}
          >
            "
          </p>
          <p
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "1.1rem",
              fontStyle: "italic",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {testimonial}
          </p>
        </div>

        {/* Author */}
        <div
          className="mt-5 flex w-full flex-col items-center gap-1.5 border-t pt-5"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "1rem",
              fontWeight: 500,
              color: "white",
            }}
          >
            {author}
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.06em",
            }}
          >
            {project}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function CardStack({ count = 2 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-2xl"
          style={{
            transform: `translateY(${(i + 1) * 10}px) scale(${1 - (i + 1) * 0.04})`,
            border: "1px solid rgba(196,168,130,0.08)",
            background: `rgba(10,10,10,${0.55 - i * 0.15})`,
            zIndex: -(i + 1),
          }}
        />
      ))}
    </>
  );
}
