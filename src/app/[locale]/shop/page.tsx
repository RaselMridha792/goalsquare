import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getProducts } from "@/lib/products";
import ShopGrid from "@/components/ShopGrid";
import { Icon } from "@/components/icons";
import CtaBand from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return { title: t("title"), description: t("lead") };
}

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("shop");
  const tc = await getTranslations("common");
  const products = getProducts(locale as Locale);

  return (
    <>
      <section className="border-b border-gs-line bg-gs-paper py-14 sm:py-20">
        <div className="gs-wrap">
          <span className="gs-eyebrow text-gs-green">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gs-green" />
            Goalsquare
          </span>
          <h1 className="gs-h2 mt-4">{t("title")}</h1>
          <p className="gs-lead mt-3 max-w-2xl">{t("lead")}</p>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-gs-muted">
            <li className="inline-flex items-center gap-1.5">
              <Icon.CheckCircle className="h-4 w-4 text-gs-green" />
              {tc("freeShipping")}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Icon.CheckCircle className="h-4 w-4 text-gs-green" />
              {tc("digital")}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Icon.Lock className="h-4 w-4 text-gs-green" />
              SSL
            </li>
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="gs-wrap">
          <ShopGrid products={products} locale={locale as Locale} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
