import Link from "next/link";
import { interTight, inter } from "@/lib/fonts";
import "@/app/globals.css";

/**
 * 404 global (rutas sin locale). El layout raíz devuelve children pelado y el
 * <html>/<body> vive en [locale]/layout, así que esta 404 trae su propio
 * <html>/<body> para no romper. Marca mínima, estática (sin providers).
 */
export default function NotFound() {
  return (
    <html lang="es" className={`${interTight.variable} ${inter.variable}`}>
      <body style={{ margin: 0, background: "#ffffff", color: "#08090A" }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888888",
              marginBottom: "20px",
            }}
          >
            Error 404
          </p>
          <h1
            style={{
              fontFamily: "var(--font-inter-tight)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Página no encontrada.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#888888",
              maxWidth: "28rem",
              marginTop: "16px",
            }}
          >
            La página que buscás no existe o cambió de lugar.
          </p>
          <Link
            href="/es"
            style={{
              fontFamily: "var(--font-inter-tight)",
              display: "inline-flex",
              alignItems: "center",
              height: "48px",
              padding: "0 28px",
              marginTop: "36px",
              borderRadius: "9999px",
              background: "#08090A",
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Volver al inicio
          </Link>
        </main>
      </body>
    </html>
  );
}
