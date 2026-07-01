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
        ? "Estudio Modo Casa · Interior Design & Architecture"
        : "Estudio Modo Casa · Diseño Interior & Arquitectura",
      template: "%s · Estudio Modo Casa",
    },
    description: isEn
      ? "Premium interior design and architecture studio in Buenos Aires. Over 15 years transforming residential and commercial spaces."
      : "Estudio de diseño interior y arquitectura de alta gama en Buenos Aires. Más de 15 años transformando espacios residenciales y comerciales.",
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

  return (
    <html
      lang={locale}
      className={`${interTight.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
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
