import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { PRODUCTS } from "@/lib/products";
import { getNewsSlugs } from "@/lib/news";

const HOST = process.env.NEXT_PUBLIC_SITE_URL ?? "https://goalsquare.eu";

type Static = "/" | "/konzept" | "/produkte" | "/shop" | "/news" | "/kontakt";
const STATIC: Static[] = ["/", "/konzept", "/produkte", "/shop", "/news", "/kontakt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const pathname of STATIC) {
    entries.push(withAlternates((locale) => getPathname({ locale, href: pathname })));
  }
  for (const p of PRODUCTS) {
    entries.push(
      withAlternates((locale) =>
        getPathname({ locale, href: { pathname: "/shop/[slug]", params: { slug: p.slug } } }),
      ),
    );
  }
  for (const slug of getNewsSlugs()) {
    entries.push(
      withAlternates((locale) =>
        getPathname({ locale, href: { pathname: "/news/[slug]", params: { slug } } }),
      ),
    );
  }

  return entries;
}

function withAlternates(
  resolve: (locale: (typeof routing.locales)[number]) => string,
): MetadataRoute.Sitemap[number] {
  return {
    url: HOST + resolve(routing.defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, HOST + resolve(l)])),
    },
  };
}
