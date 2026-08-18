import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import ProductsOverview from "@/components/sections/ProductsOverview";
import WorkflowShowcase from "@/components/sections/WorkflowShowcase";
import CtaBand from "@/components/sections/CtaBand";
import ComparisonTable from "@/components/ComparisonTable";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ProduktePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <>
      <ProductsOverview locale={locale as Locale} />
      <ComparisonTable />
      <WorkflowShowcase />
      <CtaBand />
    </>
  );
}
