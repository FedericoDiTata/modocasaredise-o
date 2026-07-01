"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "image" | "drag";

const SPRING_DOT = { stiffness: 5000, damping: 60, mass: 0.1 };
const SPRING_RING = { stiffness: 650, damping: 30, mass: 0.2 };

function getBgLuminance(el: Element): number {
  let node: Element | null = el;
  while (node && node.tagName !== "HTML") {
    const bg = window.getComputedStyle(node as HTMLElement).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      const m = bg.match(/(\d+),\s*(\d+),\s*(\d+)/);
      if (m) return (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
    }
    node = node.parentElement;
  }
  return 0; // assume dark when unknown
}

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false); // hero starts dark → cursor white

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const sDotX = useSpring(dotX, SPRING_DOT);
  const sDotY = useSpring(dotY, SPRING_DOT);

  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const sRingX = useSpring(ringX, SPRING_RING);
  const sRingY = useSpring(ringY, SPRING_RING);

  const magneticEls = useRef<Map<Element, { ox: number; oy: number }>>(new Map());
  const frameCount = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);

      // Sample background every 4 frames
      frameCount.current++;
      if (frameCount.current % 4 === 0) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el) {
          const lum = getBgLuminance(el);
          setIsDarkBg(lum < 0.5);
        }
      }

      // Magnetic effect
      magneticEls.current.forEach((_, el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = Math.max(rect.width, rect.height) * 0.75;
        if (dist < threshold) {
          const strength = (1 - dist / threshold) * 0.35;
          (el as HTMLElement).style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
          (el as HTMLElement).style.transition = "transform 0.15s ease";
        } else {
          (el as HTMLElement).style.transform = "";
          (el as HTMLElement).style.transition = "transform 0.4s ease";
        }
      });
    };

    const onLeave = () => setVisible(false);

    const onEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) { setState("default"); setLabel(""); return; }
      const el = target.closest("a, button, [data-cursor]");
      if (!el) { setState("default"); setLabel(""); return; }

      const type = el.getAttribute("data-cursor");
      if (type === "image") { setState("image"); setLabel("VER"); }
      else if (type === "drag") { setState("drag"); setLabel("ARRASTRAR"); }
      else { setState("hover"); setLabel(""); }
    };

    const onOut = (e: MouseEvent) => {
      const to = e.relatedTarget as HTMLElement | null;
      if (to?.closest("a, button, [data-cursor]")) return;
      setState("default");
      setLabel("");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter, true);
    document.addEventListener("mouseout", onOut, true);

    const registerMagnetic = () => {
      magneticEls.current.clear();
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        magneticEls.current.set(el, { ox: 0, oy: 0 });
      });
    };
    registerMagnetic();
    const obs = new MutationObserver(registerMagnetic);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter, true);
      document.removeEventListener("mouseout", onOut, true);
      obs.disconnect();
      magneticEls.current.forEach((_, el) => {
        (el as HTMLElement).style.transform = "";
      });
    };
  }, [dotX, dotY, ringX, ringY, visible]);

  if (typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches) return null;

  const isActionState = state === "image" || state === "drag";

  // image/drag always white (dark overlay on images ensures contrast)
  // default/hover: white on dark bg, black on light bg
  const cursorColor = isActionState ? "white" : (isDarkBg ? "white" : "black");

  const ringSize = isActionState ? 88 : state === "hover" ? 52 : 36;
  const ringBg = "transparent";
  const dotSize = state === "hover" ? 5 : 6;
  const dotOpacity = isActionState ? 0 : 1;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
      aria-hidden="true"
    >
      {/* Ring */}
      <motion.div
        style={{
          x: sRingX,
          y: sRingY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: `1.5px solid ${cursorColor}`,
          background: ringBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.2s ease",
        }}
        animate={{ width: ringSize, height: ringSize, background: ringBg }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && (
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "white",
              fontWeight: 500,
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            {label}
          </span>
        )}
      </motion.div>

      {/* Dot */}
      <motion.div
        style={{
          x: sDotX,
          y: sDotY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          background: cursorColor,
          opacity: dotOpacity,
          transition: "background 0.2s ease",
        }}
        animate={{ width: dotSize, height: dotSize, opacity: dotOpacity }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
