"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatItem({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, 1200 + index * 100, inView);

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center gap-2 py-10 text-center lg:py-14"
    >
      <div
        className="leading-none tracking-tight"
        style={{
          fontFamily: "var(--font-inter-tight)",
          fontSize: "clamp(3rem, 5.5vw, 4.5rem)",
          fontWeight: 300,
          color: "var(--fg)",
        }}
      >
        {count}
        <span style={{ color: "var(--fg)" }}>{stat.suffix}</span>
      </div>
      <p
        className="text-sm text-muted"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  const locale = useLocale();
  const isEn = locale === "en";

  const stats: Stat[] = [
    { value: 25, suffix: "+", label: isEn ? "Projects completed" : "Proyectos realizados" },
    { value: 15, suffix: "", label: isEn ? "Years of experience" : "Años de experiencia" },
    { value: 3, suffix: "", label: isEn ? "Service lines" : "Líneas de servicio" },
    { value: 100, suffix: "%", label: isEn ? "Client satisfaction" : "Satisfacción del cliente" },
  ];

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-t border-b border-border bg-background"
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-2 divide-x divide-y divide-[--border] lg:grid-cols-4 lg:divide-y-0"
        >
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
