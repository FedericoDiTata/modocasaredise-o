"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  items,
  speed = 30,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-0"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <span className="px-6 text-sm font-medium tracking-widest uppercase">
              {item}
            </span>
            <span className="text-muted opacity-60">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
