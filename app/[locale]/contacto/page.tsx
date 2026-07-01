"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";

type FormState = "idle" | "loading" | "success" | "error";

const whatsappUrl = `https://wa.me/5491122419894?text=${encodeURIComponent(
  "Hola, me gustaría consultar sobre sus servicios de diseño interior y arquitectura."
)}`;

export default function ContactoPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <main>
        {/* Header */}
        <section className="bg-dark pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.p variants={fadeUp} className="eyebrow-light mb-4">
                {isEn ? "Contact" : "Contacto"}
              </motion.p>
              <div className="clip-text">
                <motion.h1
                  variants={wipeUp}
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight: 400,
                    color: "white",
                    lineHeight: 1.05,
                  }}
                >
                  {isEn ? "Start your " : "Empezá tu "}
                  <em style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", color: "var(--accent)" }}>
                    {isEn ? "project." : "proyecto."}
                  </em>
                </motion.h1>
              </div>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-lg text-base text-white/50"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isEn
                  ? "The first meeting is free and no commitment required. Tell us your idea and we'll respond within 24 hours."
                  : "La primera reunión es sin costo y sin compromiso. Contanos tu idea y te respondemos en menos de 24 horas."}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
              {/* Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={staggerContainer}
              >
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-8"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10l4 4 8-8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-inter-tight)", fontSize: "1.25rem", fontWeight: 500 }}>
                      {isEn ? "Message sent!" : "¡Mensaje enviado!"}
                    </h3>
                    <p className="text-muted" style={{ fontFamily: "var(--font-inter)" }}>
                      {isEn ? "We'll be in touch within 24 business hours." : "Te contactamos en menos de 24 horas hábiles."}
                    </p>
                    <button
                      onClick={() => { setStatus("idle"); setForm({ nombre: "", email: "", telefono: "", mensaje: "" }); }}
                      className="mt-2 text-sm text-muted underline underline-offset-4 hover:text-foreground transition-colors text-left"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {isEn ? "Send another message" : "Enviar otro mensaje"}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {[
                      { name: "nombre", label: isEn ? "Full name" : "Nombre completo", type: "text", required: true },
                      { name: "email", label: "Email", type: "email", required: true },
                      { name: "telefono", label: isEn ? "Phone (optional)" : "Teléfono (opcional)", type: "tel", required: false },
                    ].map((field) => (
                      <motion.div key={field.name} variants={fadeUp} className="flex flex-col gap-1.5">
                        <label
                          htmlFor={field.name}
                          className="text-xs uppercase tracking-widest text-muted"
                          style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleChange}
                          className="border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/40 focus:border-foreground"
                          style={{ fontFamily: "var(--font-inter)" }}
                          placeholder=" "
                        />
                      </motion.div>
                    ))}

                    <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                      <label
                        htmlFor="mensaje"
                        className="text-xs uppercase tracking-widest text-muted"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                      >
                        {isEn ? "Message" : "Mensaje"}
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        required
                        rows={5}
                        value={form.mensaje}
                        onChange={handleChange}
                        className="resize-none border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/40 focus:border-foreground"
                        style={{ fontFamily: "var(--font-inter)" }}
                        placeholder={isEn ? "Tell us about your project..." : "Contanos sobre tu proyecto..."}
                      />
                    </motion.div>

                    {status === "error" && (
                      <p className="text-sm text-red-500" style={{ fontFamily: "var(--font-inter)" }}>
                        {isEn ? "There was an error. Please message us on WhatsApp." : "Hubo un error. Por favor escribinos por WhatsApp."}
                      </p>
                    )}

                    <motion.div variants={fadeUp} className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex h-12 items-center rounded-full bg-foreground px-8 text-sm font-medium text-white transition-all hover:bg-foreground/80 disabled:opacity-50"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                      >
                        {status === "loading"
                          ? (isEn ? "Sending..." : "Enviando...")
                          : (isEn ? "Send message" : "Enviar mensaje")}
                      </button>
                    </motion.div>
                  </form>
                )}
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={staggerContainer}
                className="flex flex-col gap-10"
              >
                {[
                  {
                    label: isEn ? "Address" : "Dirección",
                    content: "Avenida Álvarez Thomas 168\nCiudad Autónoma de Buenos Aires",
                    href: "https://maps.google.com/?q=Avenida+Alvarez+Thomas+168+Buenos+Aires",
                  },
                  {
                    label: "Email",
                    content: "hola@estudiomodocasa.com",
                    href: "mailto:hola@estudiomodocasa.com",
                  },
                  {
                    label: isEn ? "Phone" : "Teléfono",
                    content: "+54 11 2241-9894",
                    href: "tel:+541122419894",
                  },
                  {
                    label: isEn ? "Office hours" : "Horario de atención",
                    content: isEn ? "Monday to Friday\n9:00 AM — 6:00 PM" : "Lunes a viernes\n9:00 — 18:00 hs",
                    href: null,
                  },
                ].map((item) => (
                  <motion.div key={item.label} variants={fadeUp}>
                    <p
                      className="mb-2 text-xs uppercase tracking-widest text-muted"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="whitespace-pre-line text-base text-foreground hover:text-muted transition-colors"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="whitespace-pre-line text-base text-foreground" style={{ fontFamily: "var(--font-inter)" }}>
                        {item.content}
                      </p>
                    )}
                  </motion.div>
                ))}

                {/* WhatsApp CTA */}
                <motion.div variants={fadeUp}>
                  <p className="mb-4 text-sm text-muted" style={{ fontFamily: "var(--font-inter)" }}>
                    {isEn ? "Prefer to message us directly?" : "¿Preferís escribirnos directo?"}
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2.5 rounded-full border border-foreground px-6 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-white"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.054 23.077a.75.75 0 00.924.924l5.215-1.478A11.951 11.951 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.807-.526-5.393-1.446l-.385-.23-3.994 1.132 1.133-3.994-.23-.385A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                    {isEn ? "Message via WhatsApp" : "Escribir por WhatsApp"}
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
