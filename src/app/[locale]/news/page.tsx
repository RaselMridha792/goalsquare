import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/news";
import NewsCard from "@/components/NewsCard";
import NewsArchive from "@/components/NewsArchive";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("archiveTitle"), description: t("archiveLead") };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("news");
  const posts = getAllPosts(locale as Locale);

  const cards = await Promise.all(
    posts.map(async (p) => ({
      slug: p.slug,
      category: p.category,
      title: p.title,
      excerpt: p.excerpt,
      year: p.date.slice(0, 4),
      node: <NewsCard post={p} locale={locale as Locale} />,
    })),
  );

  return (
    <>
      <section className="border-b border-gs-line bg-gs-paper py-14 sm:py-20">
        <div className="gs-wrap">
          <span className="gs-eyebrow text-gs-green">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gs-green" />
            {t("eyebrow")}
          </span>
          <h1 className="gs-h2 mt-4">{t("archiveTitle")}</h1>
          <p className="gs-lead mt-3 max-w-2xl">{t("archiveLead")}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="gs-wrap">
          <NewsArchive cards={cards} />
        </div>
      </section>
    </>
  );
}
