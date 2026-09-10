"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import { fadeUp, wipeUp, staggerContainer, viewportConfig } from "@/lib/motion";

/**
 * Página Prensa, nueva. El cliente pidió cargar TODA la prensa (importante
 * para posicionamiento/SEO del estudio y del CEO). El listado y los links a
 * cada nota salen de la web actual (estudiomodocasa.com/prensa).
 *
 * Las notas que solo existen como recorte impreso alojado en el WordPress
 * viejo (Clarín ago-2025, Newsweek, Para Tí) NO llevan link durable: se dejan
 * sin `url` (no clickeables) hasta que Fran/Vir pasen un enlace estable, para
 * no dejar links que mueran al apagar el WP.
 */

type Nota = { medio: string; fecha: string; titulo?: string; url?: string };

const notas: Nota[] = [
  { medio: "LN Propiedades", fecha: "Abril 2026", titulo: "Salón del Mueble de Milán: las 5 tendencias de interiorismo y diseño", url: "https://www.lanacion.com.ar/propiedades/construccion-y-diseno/salon-del-mueble-de-milan-las-5-tendencias-de-interiorismo-y-diseno-que-adelantaron-las-marcas-de-nid25042026/" },
  { medio: "LN Propiedades", fecha: "Diciembre 2025", titulo: "Las tendencias de deco que se imponen esta temporada", url: "https://www.lanacion.com.ar/propiedades/casas-y-departamentos/las-tendencias-de-deco-que-se-imponen-esta-temporada-nid08122025/" },
  { medio: "LN Propiedades", fecha: "Septiembre 2025", titulo: "Comprar para reciclar: cómo remodelar un departamento de los 80", url: "https://www.lanacion.com.ar/propiedades/construccion-y-diseno/comprar-para-reciclar-como-remodelar-un-departamento-de-la-decada-de-los-80-nid27092025/" },
  { medio: "Forbes", fecha: "Septiembre 2025", titulo: "Alta gama, ciudad y turistas activan el mercado de estas propiedades en Buenos Aires", url: "https://www.forbesargentina.com/negocios/alta-gama-ciudad-turistas-activan-mercado-estas-propiedades-buenos-aires-n78609" },
  { medio: "Infobae", fecha: "Septiembre 2025", titulo: "Nuevas formas de habitar el lujo como experiencia en el diseño interior y la arquitectura", url: "https://www.infobae.com/opinion/2025/09/18/nuevas-formas-de-habitar-el-lujo-como-experiencia-en-el-diseno-interior-y-la-arquitectura/" },
  { medio: "Ministerio de Diseño", fecha: "Septiembre 2025", titulo: "Apartamento en Palacio Estrugamou, Buenos Aires", url: "https://xn--ministeriodediseo-tnb.com/portfolio/apartamento-en-palacio-estrugamou-buenos-aires-estudio-modo-casa/" },
  { medio: "La Nación", fecha: "Septiembre 2025", titulo: "Cómo refaccionar para no sentir que los espacios quedan grandes", url: "https://www.lanacion.com.ar/propiedades/casas-y-departamentos/como-refaccionar-para-no-sentir-que-los-espacios-quedan-grandes-cuando-los-hijos-se-mudan-nid07092025/" },
  { medio: "iProfesional", fecha: "Agosto 2025", titulo: "Empezaron con inversión mínima y hoy lideran el interiorismo", url: "https://www.iprofesional.com/negocios/436286-estudio-modo-casa-empezaron-con-una-inversion-minima-y-hoy-lideran-el-interiorismo" },
  { medio: "Clarín", fecha: "Agosto 2025" },
  { medio: "Clarín ARQ", fecha: "Abril 2023", titulo: "Vivir el cielo cosmopolita con elegancia", url: "https://www.clarin.com/arq/arquitectura/vivir-cielo-cosmopolita-elegante_0_bHs7RZRQNm.html" },
  { medio: "La Voz", fecha: "Marzo 2023", titulo: "Qué espacios predominan a la hora de hacer o reformar ambientes", url: "https://www.lavoz.com.ar/tendencias/que-espacios-predominan-a-la-hora-de-hacer-o-reformar-los-ambientes/" },
  { medio: "Noticias · Perfil", fecha: "Febrero 2023", titulo: "Cuáles son las tendencias del 2023 en diseño de hogar", url: "https://noticias.perfil.com/noticias/costumbres/cuales-son-las-tendencias-del-2023-en-el-diseno-de-hogar.phtml" },
  { medio: "Mustique", fecha: "Enero 2023", titulo: "Diseñar espacios a medida", url: "https://www.mustique.com.ar/sliders/slider-interna-muymustique/disenar-espacios-a-medida/" },
  { medio: "Newsweek", fecha: "Noviembre 2022" },
  { medio: "El Planeta Urbano", fecha: "Noviembre 2022", titulo: "«La pandemia reforzó muchísimo el concepto de interiorismo»", url: "https://elplanetaurbano.com/2022/11/gustavo-yankelevich-y-maximo-ferraro-de-estudio-modo-casa-la-pandemia-reforzo-muchisimo-el-concepto-de-interiorismo/" },
  { medio: "Noticias · Perfil", fecha: "Octubre 2022", titulo: "Cómo equilibrar lo femenino y lo masculino en la decoración del hogar", url: "https://noticias.perfil.com/noticias/deco/como-equilibrar-lo-femenino-y-masculino-en-la-decoracion-del-hogar.phtml" },
  { medio: "La Nación", fecha: "Septiembre 2022", titulo: "Deco post-pandemia: interiorismo funcional", url: "https://www.lanacion.com.ar/la-nacion-revista/deco-post-pandemia-mas-alla-del-home-office-el-interiorismo-funcional-esta-transformando-los-nid21092022/" },
  { medio: "D&D", fecha: "2022", titulo: "Crónica del Piso 35", url: "https://dyd.com.ar/cronica-del-piso-35/" },
  { medio: "El Constructor", fecha: "2022", url: "https://elconstructor.com/?r3d=33434#24" },
  { medio: "Revista Para Tí Deco", fecha: "Abril 2018" },
];

export default function PrensaPage() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <>
      <main>
        {/* Header */}
        <section className="bg-dark pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
              <motion.p variants={fadeUp} className="eyebrow-light mb-4">
                {isEn ? "Press" : "Prensa"}
              </motion.p>
              <div className="clip-text">
                <motion.h1
                  variants={wipeUp}
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontSize: "clamp(2.25rem, 5vw, 4rem)",
                    fontWeight: 400,
                    color: "white",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {isEn ? "In the press." : "En los medios."}
                </motion.h1>
              </div>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/60"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isEn
                  ? "Coverage of the studio's projects and vision across leading design and lifestyle media."
                  : "Cobertura de los proyectos y la mirada del estudio en los principales medios de diseño y lifestyle."}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Listado */}
        <section className="section bg-background">
          <div className="container">
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="border-t border-border"
            >
              {notas.map((n, i) => {
                const rowClass =
                  "group grid grid-cols-1 gap-1 border-b border-border py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8 sm:px-2";
                const rowInner = (
                  <>
                    <div>
                      <span
                        className="block text-base font-medium text-foreground"
                        style={{ fontFamily: "var(--font-inter-tight)", letterSpacing: "-0.01em" }}
                      >
                        {n.medio}
                      </span>
                      {n.titulo && (
                        <span className="mt-1 block max-w-xl text-sm leading-relaxed text-muted" style={{ fontFamily: "var(--font-inter)" }}>
                          {n.titulo}
                        </span>
                      )}
                    </div>
                    <span
                      className="flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-muted"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {n.fecha}
                      {n.url && (
                        <span className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
                      )}
                    </span>
                  </>
                );
                return (
                  <motion.li key={i} variants={fadeUp}>
                    {n.url ? (
                      <a
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${rowClass} cursor-pointer transition-colors duration-300 hover:bg-surface`}
                      >
                        {rowInner}
                      </a>
                    ) : (
                      <div className={rowClass}>{rowInner}</div>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            <p className="mt-8 text-xs italic text-muted/70" style={{ fontFamily: "var(--font-inter)" }}>
              {isEn
                ? "A few print-only clippings are not linked to an external article."
                : "Algunas notas de edición impresa no enlazan a una nota digital."}
            </p>
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
