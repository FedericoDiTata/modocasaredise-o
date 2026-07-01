"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isEs = pathname.startsWith("/es") || pathname === "/";
  const locale = isEs ? "es" : "en";

  const navLinks = [
    { label: isEs ? "Proyectos" : "Projects", href: `/${locale}/proyectos` },
    { label: isEs ? "Estudio" : "Studio", href: `/${locale}/estudio` },
    { label: isEs ? "Contacto" : "Contact", href: `/${locale}/contacto` },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const altLocale = isEs ? "en" : "es";
  const altPath = isEs
    ? pathname.replace(/^\/es/, "/en") || "/en"
    : pathname.replace(/^\/en/, "/es") || "/es";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm shadow-black/5"
            : "bg-transparent"
        }`}
      >
        {/* Gradient overlay for legibility on images */}
        {!scrolled && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        )}
        <div className="container relative flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/es" className="flex items-baseline gap-1 shrink-0">
            <span
              className={`font-display tracking-tight transition-colors duration-300 ${
                scrolled ? "text-foreground" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-inter-tight)", fontSize: "1.2rem", fontWeight: 600 }}
            >
              ModoCasa
            </span>
            <span
              className={`text-sm italic transition-colors duration-300 ${
                scrolled ? "text-muted" : "text-white/70"
              }`}
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              estudio
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[0.8125rem] font-medium tracking-wide transition-colors duration-300 ${
                    isActive
                      ? scrolled ? "text-foreground" : "text-white"
                      : scrolled ? "text-foreground hover:opacity-60" : "text-white hover:opacity-60"
                  }`}
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-px transition-colors duration-300 ${
                        scrolled ? "bg-foreground" : "bg-white"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden items-center gap-4 lg:flex">
            {/* Language switcher */}
            <Link
              href={altPath}
              className={`text-[0.75rem] font-medium tracking-widest uppercase transition-colors duration-300 hover:opacity-60 ${
                scrolled ? "text-muted" : "text-white/60"
              }`}
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {altLocale}
            </Link>

            {/* CTA */}
            <Link
              href={`/${locale}/contacto`}
              className={`inline-flex h-9 items-center rounded-full border px-5 text-[0.8rem] font-medium tracking-wide transition-all duration-300 hover:opacity-80 ${
                scrolled
                  ? "border-foreground text-foreground hover:bg-foreground hover:text-white"
                  : "border-white/60 text-white hover:bg-white hover:text-foreground"
              }`}
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {isEs ? "Agendar reunión" : "Schedule a meeting"}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col items-center justify-center gap-[5px] p-2 lg:hidden ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${
                menuOpen ? "translate-y-[8.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${
                menuOpen ? "-translate-y-[8.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 flex flex-col bg-foreground px-6 pt-28 pb-12 lg:hidden"
          >
            <nav className="flex flex-1 flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-4 text-4xl font-light transition-colors ${
                        isActive ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="flex items-center gap-6 border-t border-white/10 pt-8">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex h-11 items-center rounded-full border border-white px-6 text-sm font-medium text-white"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {isEs ? "Agendar reunión" : "Schedule a meeting"}
              </Link>
              <Link
                href={altPath}
                className="text-sm font-medium uppercase tracking-widest text-white/50"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {altLocale}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
