import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PRODUCTS, getProduct, formatPrice } from "@/lib/products";
import ProductArt from "@/components/ProductArt";
import AddToCartButton from "@/components/AddToCartButton";
import { Icon } from "@/components/icons";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PRODUCTS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProduct(locale as Locale, slug);
  if (!p) return {};
  return { title: p.name, description: p.short };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const product = getProduct(locale as Locale, slug);
  if (!product) notFound();

  const t = await getTranslations("shop");
  const tc = await getTranslations("common");
  const related = product.related
    .map((s) => getProduct(locale as Locale, s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <div className="gs-wrap pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12.5px] text-gs-muted">
          <Link href="/shop" className="transition hover:text-gs-ink">
            {t("title")}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-gs-ink">{product.name}</span>
        </nav>
      </div>

      <section className="py-8 sm:py-12">
        <div className="gs-wrap grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          {/* ---------- media ---------- */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-gs-line">
              <ProductArt
                accent={product.accent}
                category={product.category}
                label={product.name}
                className="aspect-[4/3] w-full"
              />
            </div>
            <ul className="mt-4 grid grid-cols-3 gap-3 text-[12px] text-gs-muted">
              <li className="rounded-2xl border border-gs-line p-3">
                <Icon.Lock className="mb-1.5 h-4 w-4 text-gs-green" />
                SSL Checkout
              </li>
              <li className="rounded-2xl border border-gs-line p-3">
                {product.physical ? (
                  <>
                    <Icon.Box className="mb-1.5 h-4 w-4 text-gs-green" />
                    {tc("freeShipping")}
                  </>
                ) : (
                  <>
                    <Icon.Download className="mb-1.5 h-4 w-4 text-gs-green" />
                    {tc("digital")}
                  </>
                )}
              </li>
              <li className="rounded-2xl border border-gs-line p-3">
                <Icon.Mail className="mb-1.5 h-4 w-4 text-gs-green" />
                Support
              </li>
            </ul>
          </div>

          {/* ---------- detail ---------- */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gs-paper px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[.12em] text-gs-muted">
                {t(`categories.${product.category}`)}
              </span>
              {product.badge === "new" && (
                <span className="rounded-full bg-gs-green px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[.12em] text-white">
                  {tc("new")}
                </span>
              )}
            </div>

            <h1 className="gs-h2 mt-4">{product.name}</h1>
            <p className="mt-2 text-[15px] text-gs-muted">{product.tagline}</p>

            <div className="mt-7 flex flex-wrap items-end gap-x-3 gap-y-1">
              {product.compareAt && (
                <span className="text-[15px] text-gs-muted line-through">
                  {formatPrice(product.compareAt, locale as Locale)}
                </span>
              )}
              <span className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-none">
                {product.price === null
                  ? "100% Gratis"
                  : formatPrice(product.price, locale as Locale)}
              </span>
              {product.interval && (
                <span className="pb-1 text-[13px] text-gs-muted">
                  {product.interval === "month" ? tc("perMonth") : tc("perYear")}
                </span>
              )}
              <span className="pb-1 text-[12px] text-gs-muted">· {tc("vat")}</span>
            </div>

            {product.price !== null ? (
              <div className="mt-6">
                <AddToCartButton slug={product.slug} showQty className="gs-btn gs-btn-primary flex-1 sm:flex-none" />
              </div>
            ) : (
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#" className="gs-btn gs-btn-dark">
                  <Icon.Download className="h-4 w-4" /> App Store
                </a>
                <a href="#" className="gs-btn gs-btn-ghost">
                  <Icon.Download className="h-4 w-4" /> Google Play
                </a>
              </div>
            )}

            <div className="mt-9 grid gap-4 border-t border-gs-line pt-8">
              {product.description.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-gs-ink/80">
                  {p}
                </p>
              ))}
            </div>

            <h2 className="mt-9 font-display text-[17px] font-extrabold tracking-tight">
              {t("included")}
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-gs-ink/80">
                  <Icon.CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gs-green" />
                  {f}
                </li>
              ))}
            </ul>

            {product.specs && (
              <>
                <h2 className="mt-9 font-display text-[17px] font-extrabold tracking-tight">
                  {t("specs")}
                </h2>
                <dl className="mt-4 overflow-hidden rounded-2xl border border-gs-line">
                  {product.specs.map((s, i) => (
                    <div
                      key={s.label}
                      className={`grid grid-cols-[1fr_1.4fr] gap-4 p-3.5 text-[13.5px] ${
                        i % 2 ? "bg-gs-paper/70" : ""
                      }`}
                    >
                      <dt className="text-gs-muted">{s.label}</dt>
                      <dd className="font-medium">{s.value}</dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[1fr_1.4fr] gap-4 border-t border-gs-line p-3.5 text-[13.5px]">
                    <dt className="text-gs-muted">SKU</dt>
                    <dd className="font-mono">{product.sku}</dd>
                  </div>
                </dl>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ---------- related ---------- */}
      {related.length > 0 && (
        <section className="border-t border-gs-line bg-gs-paper py-16">
          <div className="gs-wrap">
            <h2 className="gs-h3 font-display font-extrabold">{t("relatedTitle")}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={{ pathname: "/shop/[slug]", params: { slug: r.slug } }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gs-line bg-white transition hover:shadow-[0_20px_50px_-40px_rgba(0,0,0,.9)]"
                  >
                    <ProductArt
                      accent={r.accent}
                      category={r.category}
                      label={r.name}
                      className="aspect-[16/9] w-full"
                    />
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-[15px] font-extrabold tracking-tight group-hover:text-gs-green-600">
                        {r.name}
                      </h3>
                      <p className="mt-1 flex-1 text-[12.5px] text-gs-muted">{r.tagline}</p>
                      <span className="mt-3 font-display text-[16px] font-extrabold">
                        {r.price === null ? "Gratis" : formatPrice(r.price, locale as Locale)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
