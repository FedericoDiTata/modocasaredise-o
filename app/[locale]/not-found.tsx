"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function NotFound() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <main className="flex min-h-[82vh] flex-col items-center justify-center bg-background px-6 text-center">
      <p className="eyebrow mb-5">Error 404</p>
      <h1
        style={{
          fontFamily: "var(--font-inter-tight)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: "var(--fg)",
        }}
      >
        {isEn ? "Page not found." : "Página no encontrada."}
      </h1>
      <p
        className="mt-4 max-w-md text-sm leading-relaxed text-muted lg:text-base"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {isEn
          ? "The page you're looking for doesn't exist or may have moved."
          : "La página que buscás no existe o cambió de lugar."}
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={`/${locale}`}
          className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          {isEn ? "Back home" : "Volver al inicio"}
        </Link>
        <Link
          href={`/${locale}/proyectos`}
          className="inline-flex h-12 items-center rounded-full border border-border px-7 text-sm font-medium text-foreground transition-colors duration-300 hover:border-foreground"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          {isEn ? "View projects" : "Ver proyectos"}
        </Link>
      </div>
    </main>
  );
}
