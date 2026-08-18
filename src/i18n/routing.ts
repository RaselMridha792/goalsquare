import { defineRouting } from "next-intl/routing";

export const locales = ["de", "en", "fr", "nl"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
  nl: "Nederlands",
};

export const localeFlags: Record<Locale, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
  fr: "🇫🇷",
  nl: "🇳🇱",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/konzept": {
      de: "/konzept",
      en: "/concept",
      fr: "/concept",
      nl: "/concept",
    },
    "/produkte": {
      de: "/produkte",
      en: "/products",
      fr: "/produits",
      nl: "/producten",
    },
    "/shop": {
      de: "/shop",
      en: "/shop",
      fr: "/boutique",
      nl: "/shop",
    },
    "/shop/[slug]": {
      de: "/shop/[slug]",
      en: "/shop/[slug]",
      fr: "/boutique/[slug]",
      nl: "/shop/[slug]",
    },
    "/warenkorb": {
      de: "/warenkorb",
      en: "/cart",
      fr: "/panier",
      nl: "/winkelwagen",
    },
    "/kasse": {
      de: "/kasse",
      en: "/checkout",
      fr: "/commande",
      nl: "/afrekenen",
    },
    "/kasse/danke": {
      de: "/kasse/danke",
      en: "/checkout/thank-you",
      fr: "/commande/merci",
      nl: "/afrekenen/bedankt",
    },
    "/news": {
      de: "/news",
      en: "/news",
      fr: "/actualites",
      nl: "/nieuws",
    },
    "/news/[slug]": {
      de: "/news/[slug]",
      en: "/news/[slug]",
      fr: "/actualites/[slug]",
      nl: "/nieuws/[slug]",
    },
    "/plan": "/plan",
    "/kontakt": {
      de: "/kontakt",
      en: "/contact",
      fr: "/contact",
      nl: "/contact",
    },
  },
});
