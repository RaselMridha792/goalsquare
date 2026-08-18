import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getProducts } from "@/lib/products";
import CheckoutFlow from "@/components/CheckoutFlow";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });
  return { title: t("title"), robots: { index: false } };
}

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("checkout");

  return (
    <section className="py-12 sm:py-16">
      <div className="gs-wrap">
        <h1 className="gs-h2">{t("title")}</h1>
        <div className="mt-9">
          <CheckoutFlow catalog={getProducts(locale as Locale)} locale={locale as Locale} />
        </div>
      </div>
    </section>
  );
}
