"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { GoalsquareLogo, Icon } from "./icons";
import LocaleSwitcher from "./LocaleSwitcher";
import { useCart } from "./CartProvider";
import { usePlanInfo } from "./PlanInfoModal";

const NAV = [
  { href: "/konzept", key: "concept" },
  { href: "/produkte", key: "products" },
  { href: "/news", key: "news" },
  { href: "/shop", key: "shop" },
  { href: "/kontakt", key: "contact" },
] as const;

/**
 * Routes that open with a dark hero image. On those the header starts
 * transparent over the image and only collapses into the floating capsule
 * once the visitor scrolls. Derived from the pathname so the first server
 * render already matches the client.
 */
function hasDarkHero(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/konzept" ||
    (pathname.startsWith("/news/") && pathname !== "/news")
  );
}

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { count } = useCart();
  const { open: openPlan } = usePlanInfo();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  const darkHero = hasDarkHero(pathname);
  /** transparent, light-on-dark state: only at the very top of a dark hero */
  const onHero = darkHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gs-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(.22,.7,.3,1)] ${
          onHero ? "pt-4 sm:pt-6" : "pt-2 sm:pt-3"
        }`}
      >
        <div
          className={`mx-auto flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(.22,.7,.3,1)] ${
            onHero
              ? "h-16 w-full max-w-[1240px] border border-transparent bg-transparent px-[clamp(20px,4vw,40px)] shadow-none"
              : "h-14 w-[min(1140px,calc(100%-1.5rem))] rounded-full border border-black/[.06] bg-gs-paper/[.93] px-3 shadow-[0_10px_34px_-18px_rgba(0,0,0,.45)] backdrop-blur-xl sm:px-4"
          }`}
        >
          <Link href="/" aria-label="Goalsquare" className="shrink-0">
            <GoalsquareLogo
              priority
              className={`w-auto transition-all duration-500 ${
                onHero ? "h-[52px] brightness-0 invert" : "h-11"
              }`}
            />
          </Link>

          <nav className="ml-3 hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${
                    onHero
                      ? active
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                      : active
                        ? "text-gs-ink"
                        : "text-gs-muted hover:text-gs-ink"
                  }`}
                >
                  {t(item.key)}
                  {active && (
                    <span
                      className={`absolute inset-x-3.5 bottom-0.5 h-[2px] rounded-full ${
                        onHero ? "bg-gs-green-400" : "bg-gs-green"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <LocaleSwitcher dark={onHero} />

            <Link
              href="/warenkorb"
              aria-label={t("cart")}
              className={`relative grid h-9 w-9 place-items-center rounded-full border transition-colors ${
                onHero
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-gs-line text-gs-ink hover:bg-gs-paper"
              }`}
            >
              <Icon.Cart className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gs-green px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={openPlan}
              className={`gs-btn hidden h-9 !px-4 text-[13.5px] sm:inline-flex ${
                onHero ? "gs-btn-primary" : "gs-btn-dark"
              }`}
            >
              <Icon.Calendar className="h-4 w-4" />
              {t("planOnline")}
            </button>

            <button
              onClick={() => setMenu((v) => !v)}
              aria-label={menu ? t("close") : t("menu")}
              aria-expanded={menu}
              className={`grid h-9 w-9 place-items-center rounded-full border transition-colors lg:hidden ${
                onHero ? "border-white/30 text-white" : "border-gs-line text-gs-ink"
              }`}
            >
              {menu ? <Icon.Close className="h-4 w-4" /> : <Icon.Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menu && (
          <div className="gs-anim mx-auto mt-2 w-[min(1140px,calc(100%-1.5rem))] overflow-hidden rounded-3xl border border-black/[.06] bg-white/95 shadow-xl backdrop-blur-xl lg:hidden">
            <nav className="grid gap-0.5 p-3" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-[15px] font-medium text-gs-ink transition hover:bg-gs-paper"
                >
                  {t(item.key)}
                </Link>
              ))}
              <a
                href="http://goalsquare.freeforums.net/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-3 text-[15px] font-medium text-gs-muted transition hover:bg-gs-paper"
              >
                {t("forum")} <Icon.ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => {
                  setMenu(false);
                  openPlan();
                }}
                className="gs-btn gs-btn-primary mt-2 w-full"
              >
                <Icon.Calendar className="h-4 w-4" />
                {t("planOnline")}
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* the header is fixed, so pages without a dark hero need the space back */}
      {!darkHero && <div aria-hidden className="h-[68px] sm:h-[72px]" />}
    </>
  );
}