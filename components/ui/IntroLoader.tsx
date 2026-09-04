"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
        >
          {/* Logo, grande y potente sobre fondo blanco */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <Image
              src="/logo-estudio.png"
              alt="Estudio Modo Casa"
              width={2560}
              height={323}
              priority
              className="h-auto w-[74vw] max-w-[560px]"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.72rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(8,9,10,0.4)",
              }}
            >
              Buenos Aires · Argentina
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[#08090A] origin-left"
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
              <div className="absolute top-0 left-0 h-px w-full bg-[#08090A]/15" />
              <div className="absolute top-0 left-0 h-full w-px bg-[#08090A]/15" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
