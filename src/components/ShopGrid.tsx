"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "./icons";
import ProductArt from "./ProductArt";
import AddToCartButton from "./AddToCartButton";
import { formatPrice, type ProductCategory, type ResolvedProduct } from "@/lib/products";
import type { Locale } from "@/i18n/routing";

const CATS: ProductCategory[] = ["software", "subscription", "drills", "bundle", "media", "accessory"];

export default function ShopGrid({
  products,
  locale,
}: {
  products: ResolvedProduct[];
  locale: Locale;
}) {
  const t = useTranslations("shop");
  const tc = useTranslations("common");
  const tp = useTranslations("products");
  const [cat, setCat] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");

  const visible = useMemo(() => {
    const list = cat === "all" ? products : products.filter((p) => p.category === cat);
    const price = (p: ResolvedProduct) => p.price ?? 0;
    if (sort === "asc") return [...list].sort((a, b) => price(a) - price(b));
    if (sort === "desc") return [...list].sort((a, b) => price(b) - price(a));
    return list;
  }, [products, cat, sort]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 border-b border-gs-line pb-5">
        <div className="flex flex-wrap gap-1.5">
          <Chip on={cat === "all"} onClick={() => setCat("all")}>
            {t("filterAll")}
          </Chip>
          {CATS.map((c) => (
            <Chip key={c} on={cat === c} onClick={() => setCat(c)}>
              {t(`categories.${c}`)}
            </Chip>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-[12.5px] text-gs-muted">{t("resultCount", { count: visible.length })}</span>
          <label className="sr-only" htmlFor="shop-sort">
            {t("sort")}
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="h-9 rounded-full border border-gs-line bg-white px-3 text-[13px] font-medium focus:border-gs-green focus:outline-none"
          >
            <option value="default">{t("sortDefault")}</option>
            <option value="asc">{t("sortPriceAsc")}</option>
            <option value="desc">{t("sortPriceDesc")}</option>
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-gs-muted">{t("emptyCategory")}</p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((p) => (
            <li key={p.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gs-line bg-white transition hover:-translate-y-0.5 hover:shadow-[0_26px_60px_-46px_rgba(0,0,0,.9)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProductArt
                    accent={p.accent}
                    category={p.category}
                    label={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  {p.badge && (
                    <span
                      className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[.12em] ${
                        p.badge === "new"
                          ? "bg-gs-green text-white"
                          : p.badge === "free"
                            ? "bg-white text-gs-green-600"
                            : "bg-white text-gs-ink"
                      }`}
                    >
                      {p.badge === "new" ? tc("new") : p.badge === "free" ? tp("freeBadge") : "Bestseller"}
                    </span>
                  )}
                  <span className="absolute right-4 top-4 rounded-full bg-black/45 px-2.5 py-1 text-[10.5px] font-semibold text-white backdrop-blur">
                    {t(`categories.${p.category}`)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[18px] font-extrabold leading-snug tracking-tight">
                    <Link
                      href={{ pathname: "/shop/[slug]", params: { slug: p.slug } }}
                      className="after:absolute after:inset-0 group-hover:text-gs-green-600"
                    >
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[12.5px] text-gs-muted">{p.tagline}</p>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-gs-ink/70">{p.short}</p>

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-gs-line pt-4">
                    <div>
                      {p.compareAt && (
                        <span className="mr-2 text-[12.5px] text-gs-muted line-through">
                          {formatPrice(p.compareAt, locale)}
                        </span>
                      )}
                      <span className="font-display text-[21px] font-extrabold leading-none">
                        {p.price === null ? tp("freeBadge") : formatPrice(p.price, locale)}
                      </span>
                      {p.interval && (
                        <span className="ml-1 text-[11.5px] text-gs-muted">
                          {p.interval === "month" ? tc("perMonth") : tc("perYear")}
                        </span>
                      )}
                    </div>
                    <div className="relative z-10">
                      <AddToCartButton
                        slug={p.slug}
                        className="gs-btn gs-btn-dark h-9 !px-3.5 text-[12.5px]"
                        label={tc("addToCart")}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-9 rounded-full px-3.5 text-[13px] font-semibold transition ${
        on ? "bg-gs-ink text-white" : "border border-gs-line text-gs-muted hover:bg-gs-paper"
      }`}
    >
      {children}
    </button>
  );
}
