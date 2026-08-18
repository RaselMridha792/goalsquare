import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { routing, type Locale } from "@/i18n/routing";

export type NewsCategory = "product" | "method" | "company" | "event";

export type NewsMeta = {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  author: string;
  accent: string;
  featured?: boolean;
};

export type NewsPost = NewsMeta & { content: string; readingMinutes: number };

const DIR = path.join(process.cwd(), "content", "news");

function readFileFor(slug: string, locale: Locale): string | null {
  const exact = path.join(DIR, slug, `${locale}.mdx`);
  if (fs.existsSync(exact)) return fs.readFileSync(exact, "utf8");
  // graceful fallback to the default locale so no article 404s in a language
  const fallback = path.join(DIR, slug, `${routing.defaultLocale}.mdx`);
  if (fs.existsSync(fallback)) return fs.readFileSync(fallback, "utf8");
  return null;
}

export function getNewsSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getPost(slug: string, locale: Locale): NewsPost | null {
  const raw = readFileFor(slug, locale);
  if (!raw) return null;
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    locale,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? "1970-01-01"),
    category: (data.category ?? "company") as NewsCategory,
    author: String(data.author ?? "Goalsquare"),
    accent: String(data.accent ?? "var(--color-el-5)"),
    featured: Boolean(data.featured),
    content,
    readingMinutes: Math.max(1, Math.ceil(words / 180)),
  };
}

export function getAllPosts(locale: Locale): NewsPost[] {
  return getNewsSlugs()
    .map((s) => getPost(s, locale))
    .filter((p): p is NewsPost => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelated(slug: string, locale: Locale, limit = 3): NewsPost[] {
  const all = getAllPosts(locale);
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const sameCat = all.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = all.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...rest].slice(0, limit);
}
