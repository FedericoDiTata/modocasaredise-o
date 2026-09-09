import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { interTight, instrumentSerif, inter } from "@/lib/fonts";
import LenisProvider from "@/components/ui/LenisProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import IntroLoader from "@/components/ui/IntroLoader";
import PageTransition from "@/components/ui/PageTransition";
import Navbar from "@/components/layout/Navbar";
import "@/app/globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: {
      default: isEn
        ? "Estudio Modo Casa · High-end Interior Design"
        : "Estudio Modo Casa · Diseño de Interiores de Alta Gama",
      template: "%s · Estudio Modo Casa",
    },
    description: isEn
      ? "High-end interior design specialists in Buenos Aires. Over 15 years and 150+ projects shaping residential and commercial spaces."
      : "Especialistas en diseño de interiores de alta gama en Buenos Aires. Más de 15 años y 150+ proyectos proyectando espacios residenciales y comerciales.",
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "es_AR",
      siteName: "Estudio Modo Casa",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  // Schema.org / JSON-LD del estudio (entidad) para SEO + reconocimiento por IA
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Estudio Modo Casa",
    url: "https://estudiomodocasa.com",
    description:
      "Especialistas en diseño de interiores de alta gama en Buenos Aires. Más de 15 años y 150+ proyectos en espacios residenciales y comerciales.",
    foundingDate: "2009",
    areaServed: "Buenos Aires, Argentina",
    knowsLanguage: ["es", "en"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Álvarez Thomas 198",
      addressLocality: "Ciudad Autónoma de Buenos Aires",
      addressCountry: "AR",
    },
    telephone: "+54 11 2241-9894",
    email: "hola@estudiomodocasa.com",
    sameAs: [
      "https://www.instagram.com/estudiomodocasa",
      "https://www.facebook.com/estudiomodocasa",
    ],
  };

  return (
    <html
      lang={locale}
      className={`${interTight.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <IntroLoader />
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
            <WhatsAppButton />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
