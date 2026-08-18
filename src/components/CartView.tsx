"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "./CartProvider";
import { Icon } from "./icons";
import ProductArt from "./ProductArt";
import { formatPrice, type ResolvedProduct } from "@/lib/products";
import type { Locale } from "@/i18n/routing";

export function useCartLines(catalog: ResolvedProduct[]) {
  const { lines } = useCart();
  return lines
    .map((l) => {
      const p = catalog.find((c) => c.slug === l.slug);
      return p ? { ...p, qty: l.qty } : null;
    })
    .filter((x): x is ResolvedProduct & { qty: number } => Boolean(x));
}

export function cartTotals(items: (ResolvedProduct & { qty: number })[]) {
  const subtotal = items.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0);
  const shipping = 0; // free worldwide shipping
  return { subtotal, shipping, total: subtotal + shipping };
}

export default function CartView({
  catalog,
  locale,
}: {
  catalog: ResolvedProduct[];
  locale: Locale;
}) {
  const t = useTranslations("cart");
  const tc = useTranslations("common");
  const { setQty, remove, ready } = useCart();
  const items = useCartLines(catalog);
  const { subtotal, total } = cartTotals(items);

  if (!ready) {
    return <p className="py-20 text-center text-gs-muted">{tc("loading")}</p>;
  }

  if (items.length === 0) {
    return (
      <div className="grid place-items-center gap-5 rounded-3xl border border-dashed border-gs-line py-20 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gs-paper text-gs-muted">
          <Icon.Cart className="h-6 w-6" />
        </span>
        <p className="text-[15px] text-gs-muted">{t("empty")}</p>
        <Link href="/shop" className="gs-btn gs-btn-primary">
          {t("emptyCta")}
          <Icon.Arrow className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_.85fr] lg:gap-10">
      <ul className="grid gap-3">
        {items.map((i) => (
          <li
            key={i.slug}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-gs-line bg-white p-3.5 sm:flex-nowrap"
          >
            <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl">
              <ProductArt
                accent={i.accent}
                category={i.category}
                label={i.name}
                className="h-full w-full"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[15.5px] font-extrabold leading-snug tracking-tight">
                <Link
                  href={{ pathname: "/shop/[slug]", params: { slug: i.slug } }}
                  className="transition hover:text-gs-green-600"
                >
                  {i.name}
                </Link>
              </h3>
              <p className="mt-0.5 text-[12.5px] text-gs-muted">
                {i.physical ? tc("freeShipping") : tc("digital")}
              </p>
            </div>

            <div className="flex h-10 items-center rounded-full border border-gs-line">
              <button
                onClick={() => setQty(i.slug, i.qty - 1)}
                aria-label="-"
                className="grid h-full w-9 place-items-center rounded-l-full transition hover:bg-gs-paper"
              >
                <Icon.Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-7 text-center text-[13.5px] font-semibold tabular-nums">{i.qty}</span>
              <button
                onClick={() => setQty(i.slug, i.qty + 1)}
                aria-label="+"
                className="grid h-full w-9 place-items-center rounded-r-full transition hover:bg-gs-paper"
              >
                <Icon.Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <span className="w-24 shrink-0 text-right font-display text-[17px] font-extrabold tabular-nums">
              {formatPrice((i.price ?? 0) * i.qty, locale)}
            </span>

            <button
              onClick={() => remove(i.slug)}
              aria-label={tc("remove")}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-gs-muted transition hover:bg-gs-paper hover:text-gs-ink"
            >
              <Icon.Trash className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-gs-line bg-gs-paper p-6">
          <h2 className="font-display text-[17px] font-extrabold tracking-tight">
            {t("orderSummary")}
          </h2>

          <dl className="mt-5 grid gap-2.5 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-gs-muted">{tc("subtotal")}</dt>
              <dd className="font-medium tabular-nums">{formatPrice(subtotal, locale)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gs-muted">{tc("shipping")}</dt>
              <dd className="font-medium text-gs-green-600">{tc("freeShipping")}</dd>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-gs-line pt-3">
              <dt className="font-display text-[15px] font-extrabold">{tc("total")}</dt>
              <dd className="font-display text-[22px] font-extrabold tabular-nums">
                {formatPrice(total, locale)}
              </dd>
            </div>
          </dl>
          <p className="mt-1 text-right text-[11.5px] text-gs-muted">{tc("vat")}</p>

          <Link href="/kasse" className="gs-btn gs-btn-primary mt-6 w-full">
            <Icon.Lock className="h-4 w-4" />
            {t("checkout")}
          </Link>
          <Link
            href="/shop"
            className="mt-3 block text-center text-[13px] font-semibold text-gs-muted transition hover:text-gs-ink"
          >
            {t("continueShopping")}
          </Link>

          <p className="mt-5 border-t border-gs-line pt-4 text-[12px] leading-relaxed text-gs-muted">
            {t("digitalNote")}
          </p>
        </div>
      </aside>
    </div>
  );
}
