import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/icons";
import PlanBanner from "./PlanBanner";
import { getProduct, formatPrice } from "@/lib/products";
import type { Locale } from "@/i18n/routing";

export default async function ProductsOverview({ locale }: { locale: Locale }) {
  const t = await getTranslations("products");
  const tc = await getTranslations("common");

  const basic = getProduct(locale, "basic-edition")!;
  const pro = getProduct(locale, "pro-suite")!;
  const drills = getProduct(locale, "drills-pack-1")!;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="gs-wrap">
        <div className="mx-auto max-w-3xl text-center">
          <span className="gs-eyebrow rounded-full bg-gs-ink px-3.5 py-1.5 text-white">
            <Icon.Sparkle className="h-3 w-3 text-gs-green-400" />
            {t("eyebrow")}
          </span>
          <h2 className="gs-h2 mt-5">{t("title")}</h2>
          <p className="gs-lead mx-auto mt-3 max-w-2xl">{t("subtitle")}</p>
          <p className="mx-auto mt-6 inline-flex max-w-2xl items-start gap-2 rounded-2xl border border-gs-green/30 bg-gs-green-soft px-4 py-2.5 text-left text-[13px] leading-snug text-gs-ink/80">
            <Icon.CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gs-green-600" />
            {t("appNote")}
          </p>
        </div>

        <div className="mt-12">
          <PlanBanner />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* ---- BASIC ---- */}
          <article className="flex flex-col rounded-3xl border border-gs-line bg-white p-6 transition hover:shadow-[0_20px_50px_-38px_rgba(0,0,0,.8)]">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gs-paper text-gs-ink">
                <Icon.Monitor className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-gs-paper px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-gs-muted">
                Desktop Software
              </span>
            </div>
            <h3 className="mt-5 font-display text-[22px] font-extrabold tracking-tight">{basic.name}</h3>
            <p className="mt-1 text-[13px] text-gs-muted">{basic.tagline}</p>
            <p className="mt-4 text-[13.5px] leading-relaxed text-gs-ink/70">{basic.short}</p>
            <ul className="mt-5 grid flex-1 gap-2">
              {basic.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-gs-ink/75">
                  <Icon.CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gs-green" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-end justify-between border-t border-gs-line pt-4">
              <span className="text-[11.5px] text-gs-muted">{t("singleLicense")}</span>
              <span className="font-display text-[26px] font-extrabold leading-none">
                {formatPrice(basic.price!, locale)}
              </span>
            </div>
            <Link
              href={{ pathname: "/shop/[slug]", params: { slug: basic.slug } }}
              className="gs-btn gs-btn-dark mt-4 w-full"
            >
              <Icon.Cart className="h-4 w-4" />
              {tc("buyNow")}
            </Link>
          </article>

          {/* ---- PRO ---- */}
          <article className="relative flex flex-col overflow-hidden rounded-3xl bg-gs-ink p-6 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-acc-pro/20 blur-3xl"
            />
            <div className="relative flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">
                <Icon.Layers className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-acc-pro px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-gs-ink">
                Desktop Software PRO
              </span>
            </div>
            <h3 className="relative mt-5 font-display text-[22px] font-extrabold tracking-tight">
              {pro.name}
            </h3>
            <p className="relative mt-1 text-[13px] text-white/50">{pro.tagline}</p>
            <p className="relative mt-4 text-[13.5px] leading-relaxed text-white/70">{pro.short}</p>
            <ul className="relative mt-5 grid flex-1 gap-2">
              {pro.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-white/80">
                  <Icon.CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-acc-pro" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="relative mt-6 flex items-end justify-between border-t border-white/12 pt-4">
              <span className="text-[11.5px] text-white/45">{t("fullVersion")}</span>
              <span className="font-display text-[26px] font-extrabold leading-none text-acc-pro">
                {formatPrice(pro.price!, locale)}
              </span>
            </div>
            <Link
              href={{ pathname: "/shop/[slug]", params: { slug: pro.slug } }}
              className="gs-btn relative mt-4 w-full bg-acc-pro text-gs-ink hover:brightness-95"
            >
              <Icon.Cart className="h-4 w-4" />
              {tc("buyNow")}
            </Link>
          </article>

          {/* ---- DRILLS ---- */}
          <article className="flex flex-col rounded-3xl border border-gs-line bg-white p-6 transition hover:shadow-[0_20px_50px_-38px_rgba(0,0,0,.8)]">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-acc-drills/10 text-acc-drills">
                <Icon.Box className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-acc-drills/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-acc-drills">
                {t("archiveBadge")}
              </span>
            </div>
            <h3 className="mt-5 font-display text-[22px] font-extrabold tracking-tight">{t("drillsTitle")}</h3>
            <p className="mt-1 text-[13px] text-gs-muted">{t("drillsAvailable")}</p>
            <p className="mt-4 text-[13.5px] leading-relaxed text-gs-ink/70">{t("drillsText")}</p>
            <ul className="mt-5 grid flex-1 gap-2">
              <li className="flex items-start gap-2 text-[13px] text-gs-ink/75">
                <Icon.CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-acc-drills" />
                {t("drillsFeature")}
              </li>
              {drills.features.slice(1, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-gs-ink/75">
                  <Icon.CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-acc-drills" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-end justify-between border-t border-gs-line pt-4">
              <span className="text-[11.5px] text-gs-muted">{t("modular")}</span>
              <span className="font-display text-[26px] font-extrabold leading-none">
                <span className="text-[13px] font-semibold text-gs-muted">{tc("from")} </span>
                {formatPrice(drills.price!, locale)}
              </span>
            </div>
            <Link href="/shop" className="gs-btn mt-4 w-full bg-acc-drills text-white hover:brightness-95">
              <Icon.Box className="h-4 w-4" />
              {tc("discover")}
            </Link>
          </article>

        </div>

        {/* ---- club band ---- */}
        <div className="mt-6 flex flex-col gap-5 rounded-3xl bg-gs-ink p-6 text-white sm:p-7 lg:flex-row lg:items-center">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
            <Icon.Cart className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="font-display text-[17px] font-extrabold tracking-tight">{t("clubTitle")}</h3>
            <p className="mt-1 text-[13.5px] text-white/55">{t("clubText")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/kontakt" className="gs-btn gs-btn-ghost-dark">
              {t("clubCta")}
            </Link>
            <Link href="/shop" className="gs-btn gs-btn-primary">
              {t("shopCta")}
              <Icon.Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}