import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "./icons";
import { formatDate } from "@/lib/products";
import type { NewsPost } from "@/lib/news";
import type { Locale } from "@/i18n/routing";

export default async function NewsCard({
  post,
  locale,
  featured = false,
}: {
  post: NewsPost;
  locale: Locale;
  featured?: boolean;
}) {
  const t = await getTranslations("news");
  const tc = await getTranslations("common");

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-gs-line bg-white transition hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-42px_rgba(0,0,0,.85)] ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${featured ? "h-48 md:h-auto md:w-[46%]" : "h-40"}`}
        style={{ background: post.accent }}
      >
        <ArticleArt accent={post.accent} seed={post.slug.length} />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[.12em] text-gs-ink">
          {t(`categories.${post.category}`)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[12px] text-gs-muted">
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Icon.Clock className="h-3 w-3" />
            {post.readingMinutes} {t("readingTime")}
          </span>
        </div>

        <h3
          className={`mt-3 font-display font-extrabold tracking-tight ${
            featured ? "text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.12]" : "text-[18px] leading-snug"
          }`}
        >
          <Link
            href={{ pathname: "/news/[slug]", params: { slug: post.slug } }}
            className="after:absolute after:inset-0 group-hover:text-gs-green-600"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-gs-muted">{post.excerpt}</p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gs-green-600">
          {tc("readArticle")}
          <Icon.Arrow className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

function ArticleArt({ accent, seed }: { accent: string; seed: number }) {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="#0d1b12" />
      <rect width="400" height="220" fill={accent} opacity=".18" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={i * 40} width="20" height="220" fill="rgba(255,255,255,.02)" />
      ))}
      <g stroke="rgba(255,255,255,.22)" strokeWidth="1.4" fill="none">
        <rect x="110" y="18" width="180" height="70" />
        <rect x="158" y="18" width="84" height="32" />
        <circle cx="200" cy="160" r="46" />
      </g>
      <g fill={accent}>
        <circle cx={90 + (seed % 5) * 22} cy="132" r="8" />
        <circle cx={230 + (seed % 4) * 18} cy="118" r="8" />
        <circle cx="200" cy="60" r="6" fill="#fff" />
      </g>
      <path
        d={`M${90 + (seed % 5) * 22} 132 L200 60 L${230 + (seed % 4) * 18} 118`}
        stroke={accent}
        strokeWidth="2"
        fill="none"
        strokeDasharray="5 5"
      />
    </svg>
  );
}
