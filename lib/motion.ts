import type { Variants, Transition } from "framer-motion";

const easeOut: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

const easeOutFast: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export const wipeUp: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: easeOut,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOut,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: easeOutFast,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOut,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: easeOut,
  },
};

export const viewportConfig = {
  once: true,
  margin: "-80px",
} as const;
