"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GoalsquareLogo, Icon } from "./icons";
import LocaleSwitcher from "./LocaleSwitcher";

const SOCIAL = [
  { href: "http://www.facebook.com/goalsquare", label: "Facebook", I: Icon.Facebook },
  { href: "https://www.instagram.com/glsqr/", label: "Instagram", I: Icon.Instagram },
  { href: "https://twitter.com/goalsquare", label: "X", I: Icon.X },
  {
    href: "https://www.youtube.com/channel/UCgYOrpua3g9zZHXVNZ647pw",
    label: "YouTube",
    I: Icon.Youtube,
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("common");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-gs-ink text-white">
      <div className="gs-wrap relative z-10 pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <GoalsquareLogo className="h-12 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/55">{t("about")}</p>
            <div className="mt-6 flex gap-2">
              {SOCIAL.map(({ href, label, I }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/70 transition hover:border-gs-green hover:text-gs-green-400"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <LocaleSwitcher dark />
            </div>
          </div>

          <div className="grid gap-9 sm:grid-cols-3">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[.18em] text-white/40">
                {t("columns.product")}
              </h3>
              <ul className="mt-4 grid gap-2.5 text-[14px] text-white/70">
                <li><Link href="/produkte" className="transition hover:text-gs-green-400">{tn("products")}</Link></li>
                <li><Link href="/shop" className="transition hover:text-gs-green-400">{tn("shop")}</Link></li>
                <li><Link href={{ pathname: "/shop/[slug]", params: { slug: "plan-monthly" } }} className="transition hover:text-gs-green-400">Goalsquare PLAN</Link></li>
                <li><Link href={{ pathname: "/shop/[slug]", params: { slug: "mobile-app" } }} className="transition hover:text-gs-green-400">Mobil-App</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[.18em] text-white/40">
                {t("columns.method")}
              </h3>
              <ul className="mt-4 grid gap-2.5 text-[14px] text-white/70">
                <li><Link href="/konzept" className="transition hover:text-gs-green-400">{tn("concept")}</Link></li>
                <li><Link href="/news" className="transition hover:text-gs-green-400">{tn("news")}</Link></li>
                <li>
                  <a href="http://goalsquare.freeforums.net/" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 transition hover:text-gs-green-400">
                    {tn("forum")}<Icon.ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[.18em] text-white/40">
                {t("columns.legal")}
              </h3>
              <ul className="mt-4 grid gap-2.5 text-[14px] text-white/70">
                <li><a href="#" className="transition hover:text-gs-green-400">{t("links.imprint")}</a></li>
                <li><a href="#" className="transition hover:text-gs-green-400">{t("links.privacy")}</a></li>
                <li><a href="#" className="transition hover:text-gs-green-400">{t("links.terms")}</a></li>
                <li><a href="#" className="transition hover:text-gs-green-400">{t("links.shipping")}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h3 className="font-display text-xl font-extrabold">{t("newsletterTitle")}</h3>
            <p className="mt-1.5 text-[13.5px] text-white/55">{t("newsletterText")}</p>
          </div>
          {sent ? (
            <p className="flex items-center gap-2 text-[14px] text-gs-green-400">
              <Icon.CheckCircle className="h-4 w-4" /> {tc("subscribe")} ✓
            </p>
          ) : (
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="sr-only" htmlFor="nl-email">E-Mail</label>
              <input
                id="nl-email"
                type="email"
                required
                placeholder={tc("emailPlaceholder")}
                className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 text-[14px] text-white placeholder:text-white/35 focus:border-gs-green focus:outline-none"
              />
              <button type="submit" className="gs-btn gs-btn-primary h-11 shrink-0">
                {tc("subscribe")}
              </button>
            </form>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Goalsquare. {t("rights")}</span>
          <span className="font-mono uppercase tracking-[.14em]">{t("tagline")}</span>
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[19vw] font-extrabold leading-none tracking-tighter text-white/[.035]"
      >
        Goalsquare
      </span>
    </footer>
  );
}
