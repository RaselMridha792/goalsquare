import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const HOST = process.env.NEXT_PUBLIC_SITE_URL ?? "https://goalsquare.eu";

/** Pages that must never be indexed, in every locale. */
const PRIVATE = ["/warenkorb", "/kasse"] as const;

export default function robots(): MetadataRoute.Robots {
  const disallow = routing.locales.flatMap((locale) =>
    PRIVATE.map((href) => getPathname({ locale, href })),
  );

  return {
    rules: [{ userAgent: "*", allow: "/", disallow }],
    sitemap: `${HOST}/sitemap.xml`,
  };
}
