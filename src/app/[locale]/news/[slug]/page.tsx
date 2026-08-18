import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getNewsSlugs, getPost, getRelated } from "@/lib/news";
import { formatDate } from "@/lib/products";
import { Icon } from "@/components/icons";
import NewsCard from "@/components/NewsCard";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getNewsSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale as Locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

const mdxComponents = {
  h2: (p: React.ComponentProps<"h2">) => (
    <h2 className="mt-11 font-display text-[clamp(1.25rem,2.4vw,1.6rem)] font-extrabold tracking-tight" {...p} />
  ),
  h3: (p: React.ComponentProps<"h3">) => (
    <h3 className="mt-8 font-display text-[1.15rem] font-extrabold tracking-tight" {...p} />
  ),
  p: (p: React.ComponentProps<"p">) => (
    <p className="mt-4 text-[16px] leading-[1.72] text-gs-ink/80" {...p} />
  ),
  ul: (p: React.ComponentProps<"ul">) => <ul className="mt-4 grid gap-2.5" {...p} />,
  ol: (p: React.ComponentProps<"ol">) => <ol className="mt-4 grid list-decimal gap-2.5 pl-5" {...p} />,
  li: (p: React.ComponentProps<"li">) => (
    <li className="text-[15.5px] leading-relaxed text-gs-ink/80" {...p} />
  ),
  strong: (p: React.ComponentProps<"strong">) => <strong className="font-semibold text-gs-ink" {...p} />,
  a: (p: React.ComponentProps<"a">) => (
    <a className="text-gs-green-600 underline underline-offset-4" {...p} />
  ),
  blockquote: (p: React.ComponentProps<"blockquote">) => (
    <blockquote className="mt-6 border-l-[3px] border-gs-green pl-5 text-[16px] italic text-gs-ink/75" {...p} />
  ),
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const post = getPost(slug, locale as Locale);
  if (!post) notFound();

  const t = await getTranslations("news");
  const tc = await getTranslations("common");
  const related = getRelated(slug, locale as Locale);

  return (
    <>
      <article>
        {/* ---------- header ---------- */}
        <header className="relative overflow-hidden bg-gs-ink pb-16 pt-[112px] text-white sm:pb-20 sm:pt-[140px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full blur-[120px]"
            style={{ background: post.accent, opacity: 0.16 }}
          />
          <div className="gs-wrap relative">
            <div>
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/60 transition hover:text-white"
              >
                <Icon.Arrow className="h-3.5 w-3.5 rotate-180" />
                {tc("backToNews")}
              </Link>
            </div>

            <span
              className="mt-6 inline-block rounded-full px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[.14em] text-white"
              style={{ background: post.accent }}
            >
              {t(`categories.${post.category}`)}
            </span>

            <h1 className="gs-h2 mt-5 max-w-4xl">{post.title}</h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/60">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-white/50">
              <span>
                {t("published")} <time dateTime={post.date}>{formatDate(post.date, locale as Locale)}</time>
              </span>
              <span aria-hidden>·</span>
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Icon.Clock className="h-3.5 w-3.5" />
                {post.readingMinutes} {t("readingTime")}
              </span>
            </div>
          </div>
        </header>

        {/* ---------- body ---------- */}
        <div className="gs-wrap py-14 sm:py-20">
          <div className="mx-auto max-w-[68ch]">
            <MDXRemote source={post.content} components={mdxComponents} />

            <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-gs-line pt-8">
              <span className="text-[13px] font-semibold text-gs-muted">{t("share")}</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-9 w-9 place-items-center rounded-full border border-gs-line transition hover:bg-gs-paper"
                aria-label="X"
              >
                <Icon.X className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.facebook.com/goalsquare"
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-9 w-9 place-items-center rounded-full border border-gs-line transition hover:bg-gs-paper"
                aria-label="Facebook"
              >
                <Icon.Facebook className="h-4 w-4" />
              </a>
              <Link href="/news" className="gs-btn gs-btn-ghost ml-auto h-9 !px-4 text-[13px]">
                {tc("backToNews")}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* ---------- related ---------- */}
      {related.length > 0 && (
        <section className="border-t border-gs-line bg-gs-paper py-16">
          <div className="gs-wrap">
            <h2 className="gs-h3 font-display font-extrabold">{t("relatedTitle")}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <NewsCard key={p.slug} post={p} locale={locale as Locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
