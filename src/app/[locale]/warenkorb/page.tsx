import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getProducts } from "@/lib/products";
import CartView from "@/components/CartView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });
  return { title: t("title"), robots: { index: false } };
}

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("cart");

  return (
    <section className="py-12 sm:py-16">
      <div className="gs-wrap">
        <h1 className="gs-h2">{t("title")}</h1>
        <div className="mt-9">
          <CartView catalog={getProducts(locale as Locale)} locale={locale as Locale} />
        </div>
      </div>
    </section>
  );
}
