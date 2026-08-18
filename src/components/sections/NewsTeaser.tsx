import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/icons";
import NewsCard from "@/components/NewsCard";
import { getAllPosts } from "@/lib/news";
import type { Locale } from "@/i18n/routing";

export default async function NewsTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations("news");
  const posts = getAllPosts(locale).slice(0, 3);
  if (!posts.length) return null;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="gs-wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="gs-eyebrow text-gs-muted">{t("eyebrow")}</span>
            <h2 className="gs-h2 mt-3">{t("title")}</h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-gs-green-600 transition hover:opacity-70"
          >
            {t("all")}
            <Icon.Arrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <NewsCard key={p.slug} post={p} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
