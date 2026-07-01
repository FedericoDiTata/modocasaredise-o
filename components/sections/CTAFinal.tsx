"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { viewportConfig } from "@/lib/motion";

const WHATSAPP_NUMBER = "5491122419894";

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
  phase: number;
  dx: number;
  dy: number;
}

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const STAR_COUNT = 140;
    let animId: number;
    let stars: Star[] = [];

    const buildStars = (w: number, h: number) => {
      stars = Array.from({ length: STAR_COUNT }, () => {
        const angle = Math.random() * Math.PI * 2;
        const moveSpeed = Math.random() * 0.22 + 0.04;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.2,
          opacity: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 0.4 + 0.1,
          phase: Math.random() * Math.PI * 2,
          dx: Math.cos(angle) * moveSpeed,
          dy: Math.sin(angle) * moveSpeed,
        };
      });
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      buildStars(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.008;
      for (const s of stars) {
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < -2) s.x = w + 2;
        if (s.x > w + 2) s.x = -2;
        if (s.y < -2) s.y = h + 2;
        if (s.y > h + 2) s.y = -2;
        const alpha = s.opacity * (0.55 + 0.45 * Math.sin(time * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function CTAFinal() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [form, setForm] = useState({ nombre: "", mail: "", motivo: "" });
  const [submitted, setSubmitted] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isEn
      ? "Hello, I'd like to inquire about your interior design and architecture services."
      : "Hola, me gustaría consultar sobre sus servicios de diseño interior y arquitectura."
  )}`;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const baseInput =
    "w-full border-b border-white/20 bg-transparent pb-3 pt-1 text-white text-sm outline-none placeholder:text-white/30 focus:border-white/55 transition-colors duration-300";

  return (
    <section className="relative overflow-hidden bg-[#08090A] py-24 lg:py-32">
      <Starfield />

      <div className="container relative z-10">
        {/* Logo grande centrado */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-center"
        >
          <p
            className="mb-6 text-[0.6rem] tracking-[0.22em] uppercase text-white/35"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            {isEn ? "Studio · Buenos Aires" : "Estudio · Buenos Aires"}
          </p>
          <div className="flex items-baseline justify-center gap-3">
            <span
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                color: "white",
                lineHeight: 1,
              }}
            >
              ModoCasa
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
                fontWeight: 400,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1,
                marginLeft: "0.6em",
                position: "relative",
                top: "-0.35em",
              }}
            >
              estudio
            </span>
          </div>
          <div className="mx-auto mt-8 h-px w-16 bg-white/20" />
        </motion.div>

        {/* Dos columnas */}
        {!submitted ? (
          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20 lg:mt-20 items-stretch">
            {/* Izquierda: copy + WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <div className="mb-7 flex items-center gap-3">
                <div className="h-px w-8 bg-white/30" />
                <p
                  className="text-[0.6rem] tracking-[0.2em] uppercase text-white/40"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {isEn ? "Schedule a meeting" : "Coordinar reunión"}
                </p>
              </div>

              <h2
                className="mb-6"
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  fontWeight: 300,
                  color: "white",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {isEn ? "Have a space in mind?" : "¿Tenés un espacio en mente?"}
                <br />
                {isEn ? "Let's talk." : "Hablemos."}
              </h2>

              <p
                className="text-sm leading-relaxed text-white/40"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isEn
                  ? "Let's talk about your project. The first meeting is free and no-commitment."
                  : "Conversemos sobre tu proyecto. La primera reunión es sin costo y sin compromiso."}
              </p>

              {/* WhatsApp empujado al fondo, alineado con el borde inferior del textarea */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto group flex items-center gap-3 border-b border-white/15 pb-4 text-sm text-white/55 transition-all hover:text-white hover:border-white/35"
                style={{ fontFamily: "var(--font-inter-tight)", letterSpacing: "0.03em" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={15} height={15} aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.054 23.077a.75.75 0 00.924.924l5.215-1.478A11.951 11.951 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.807-.526-5.393-1.446l-.385-.23-3.994 1.132 1.133-3.994-.23-.385A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                {isEn ? "Write on WhatsApp" : "Escribir por WhatsApp"}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto transition-transform group-hover:translate-x-1">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              {/* Espaciador invisible = altura del botón + su padding superior */}
              <div className="h-[88px]" aria-hidden="true" />
            </motion.div>

            {/* Derecha: formulario */}
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="flex flex-col"
            >
              <div className="mb-7">
                <label className="mb-2 block text-[0.6rem] tracking-[0.18em] uppercase text-white/35" style={{ fontFamily: "var(--font-inter-tight)" }}>
                  {isEn ? "Name" : "Nombre"} *
                </label>
                <input type="text" name="nombre" required value={form.nombre} onChange={handleChange} className={baseInput} style={{ fontFamily: "var(--font-inter)" }} />
              </div>

              <div className="mb-7">
                <label className="mb-2 block text-[0.6rem] tracking-[0.18em] uppercase text-white/35" style={{ fontFamily: "var(--font-inter-tight)" }}>
                  Email *
                </label>
                <input type="email" name="mail" required value={form.mail} onChange={handleChange} placeholder={isEn ? "your@email.com" : "tu@email.com"} className={baseInput} style={{ fontFamily: "var(--font-inter)" }} />
              </div>

              {/* Textarea crece para ocupar el espacio restante */}
              <div className="flex flex-1 flex-col">
                <label className="mb-2 block text-[0.6rem] tracking-[0.18em] uppercase text-white/35" style={{ fontFamily: "var(--font-inter-tight)" }}>
                  {isEn ? "About your project" : "Contanos brevemente sobre tu proyecto"} *
                </label>
                <textarea
                  name="motivo"
                  required
                  value={form.motivo}
                  onChange={handleChange}
                  className={baseInput + " flex-1 min-h-[80px]"}
                  style={{ fontFamily: "var(--font-inter)", resize: "none" }}
                />
              </div>

              {/* Botón, mismo espacio que el espaciador de la izquierda */}
              <div className="pt-10">
                <button
                  type="submit"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-medium text-[#08090A] transition-all hover:bg-white/90 hover:scale-[1.02]"
                  style={{ fontFamily: "var(--font-inter-tight)", letterSpacing: "0.06em" }}
                >
                  {isEn ? "SEND" : "ENVIAR"}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </motion.form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-20 text-center"
          >
            <p
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                fontWeight: 300,
                color: "white",
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
              }}
            >
              {isEn
                ? "Thanks! We'll be in touch shortly."
                : "¡Gracias! Nos ponemos en contacto a la brevedad."}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
