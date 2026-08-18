import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { PlanInfoProvider } from "@/components/PlanInfoModal";
import "@fontsource-variable/archivo";
import "@fontsource-variable/inter";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL("https://goalsquare.eu"),
    title: {
      default: `${t("siteName")} – ${t("tagline")}`,
      template: `%s · ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: `${t("siteName")} – ${t("tagline")}`,
      description: t("defaultDescription"),
      locale,
    },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  return (
    <html lang={locale}>
      <body className="min-h-dvh antialiased">
        <NextIntlClientProvider>
          <CartProvider>
            <PlanInfoProvider>
              <Header />
              <main id="main">{children}</main>
              <Footer />
            </PlanInfoProvider>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
