import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import ElementsSection from "@/components/sections/ElementsSection";
import ProductsOverview from "@/components/sections/ProductsOverview";
import WorkflowShowcase from "@/components/sections/WorkflowShowcase";
import Audience from "@/components/sections/Audience";
import CtaBand from "@/components/sections/CtaBand";
import NewsTeaser from "@/components/sections/NewsTeaser";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <HowItWorks />
      <ElementsSection locale={locale as Locale} />
      <ProductsOverview locale={locale as Locale} />
      <WorkflowShowcase />
      <Audience />
      <CtaBand />
      <NewsTeaser locale={locale as Locale} />
    </>
  );
}
