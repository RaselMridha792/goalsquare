"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "./icons";
import type { NewsCategory } from "@/lib/news";

const CATS: NewsCategory[] = ["product", "method", "company", "event"];

/**
 * Client-side filter shell. Cards are rendered on the server and passed in
 * keyed by slug, so the archive keeps server rendering + interactive filters.
 */
export default function NewsArchive({
  cards,
}: {
  cards: { slug: string; category: NewsCategory; title: string; excerpt: string; year: string; node: ReactNode }[];
}) {
  const t = useTranslations("news");
  const [cat, setCat] = useState<NewsCategory | "all">("all");
  const [q, setQ] = useState("");

  const years = useMemo(
    () => Array.from(new Set(cards.map((c) => c.year))).sort((a, b) => Number(b) - Number(a)),
    [cards],
  );

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return cards.filter(
      (c) =>
        (cat === "all" || c.category === cat) &&
        (!term ||
          c.title.toLowerCase().includes(term) ||
          c.excerpt.toLowerCase().includes(term)),
    );
  }, [cards, cat, q]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 border-b border-gs-line pb-5">
        <div className="flex flex-wrap gap-1.5">
          <Chip on={cat === "all"} onClick={() => setCat("all")}>
            {t("all")}
          </Chip>
          {CATS.map((c) => (
            <Chip key={c} on={cat === c} onClick={() => setCat(c)}>
              {t(`categories.${c}`)}
            </Chip>
          ))}
        </div>

        <div className="relative ml-auto w-full sm:w-64">
          <Icon.Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gs-muted" />
          <label className="sr-only" htmlFor="news-search">
            {t("searchPlaceholder")}
          </label>
          <input
            id="news-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-10 w-full rounded-full border border-gs-line bg-white pl-10 pr-4 text-[13.5px] focus:border-gs-green focus:outline-none"
          />
        </div>
      </div>

      {years.length > 1 && (
        <p className="mt-4 text-[12px] text-gs-muted">
          {t("archiveTitle")}: {years.join(" · ")}
        </p>
      )}

      {visible.length === 0 ? (
        <p className="py-20 text-center text-gs-muted">{t("noResults")}</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((c) => (
            <div key={c.slug} className="contents">
              {c.node}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
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
