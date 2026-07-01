"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isEs = pathname.startsWith("/es") || pathname === "/";
  const locale = isEs ? "es" : "en";

  const navLinks = [
    { label: isEs ? "Proyectos" : "Projects", href: `/${locale}/proyectos` },
    { label: isEs ? "Estudio" : "Studio", href: `/${locale}/estudio` },
    { label: isEs ? "Contacto" : "Contact", href: `/${locale}/contacto` },
  ];

  return (
    <footer className="bg-dark text-white">
      {/* Main footer */}
      <div className="container py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Logo & tagline */}
          <div className="max-w-xs">
            <Link href={`/${locale}`} className="flex items-baseline gap-1">
              <span
                className="text-lg font-600 tracking-tight text-white"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                ModoCasa
              </span>
              <span
                className="text-white/45"
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "0.62rem",
                  fontWeight: 400,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  marginLeft: "0.35em",
                  position: "relative",
                  top: "-0.2em",
                }}
              >
                estudio
              </span>
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed text-white/45"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {isEs
                ? <>Diseño interior y arquitectura de alta gama.<br />Buenos Aires, Argentina.</>
                : <>High-end interior design and architecture.<br />Buenos Aires, Argentina.</>}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3">
            <p
              className="mb-2 text-[0.65rem] font-medium uppercase tracking-widest text-white/30"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {isEs ? "Navegación" : "Navigation"}
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p
              className="mb-2 text-[0.65rem] font-medium uppercase tracking-widest text-white/30"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {isEs ? "Contacto" : "Contact"}
            </p>
            <a
              href="tel:+541122419894"
              className="text-sm text-white/60 transition-colors hover:text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              11-2241-9894
            </a>
            <p
              className="text-sm text-white/45"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Av. Álvarez Thomas 168
              <br />
              Buenos Aires, Argentina
            </p>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p
              className="mb-2 text-[0.65rem] font-medium uppercase tracking-widest text-white/30"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {isEs ? "Social" : "Follow us"}
            </p>
            <a
              href="https://www.instagram.com/estudiomodocasa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <InstagramIcon />
              Instagram
            </a>
            <a
              href="https://www.facebook.com/estudiomodocasa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-6 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p style={{ fontFamily: "var(--font-inter)" }}>
            © {year} Estudio Modo Casa.{" "}
            {isEs ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
          <p style={{ fontFamily: "var(--font-inter)" }}>
            Diseñado por{" "}
            <a
              href="https://brodhia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              Brodhia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
