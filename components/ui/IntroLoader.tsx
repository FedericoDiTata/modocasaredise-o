"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Only show on first visit per session
    const seen = sessionStorage.getItem("emc-intro-seen");
    if (seen) {
      setVisible(false);
      return;
    }
    setHasLoaded(true);
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("emc-intro-seen", "1");
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  if (!hasLoaded && !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-1"
          >
            <div className="flex items-baseline gap-2">
              <span
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "white",
                }}
              >
                ModoCasa
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "clamp(0.7rem, 1.4vw, 0.95rem)",
                  fontWeight: 400,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  marginLeft: "0.6em",
                  position: "relative",
                  top: "-0.4em",
                }}
              >
                estudio
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Buenos Aires · Argentina
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-white origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "linear", delay: 0.1 }}
            style={{ width: "100%" }}
          />

          {/* Corner marks, architectural detail */}
          {[
            "top-8 left-8",
            "top-8 right-8",
            "bottom-8 left-8",
            "bottom-8 right-8",
          ].map((pos, i) => (
            <motion.div
              key={pos}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
              className={`absolute ${pos} h-6 w-6`}
            >
              <div className="absolute top-0 left-0 h-px w-full bg-white/15" />
              <div className="absolute top-0 left-0 h-full w-px bg-white/15" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
