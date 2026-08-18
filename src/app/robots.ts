import type { MetadataRoute } from "next";

const HOST = process.env.NEXT_PUBLIC_SITE_URL ?? "https://goalsquare.eu";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/*/warenkorb", "/*/kasse"] }],
    sitemap: `${HOST}/sitemap.xml`,
  };
}
