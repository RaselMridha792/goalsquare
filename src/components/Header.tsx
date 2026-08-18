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

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { count } = useCart();
  const { open: openPlan } = usePlanInfo();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gs-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white">
        Skip
      </a>

      {/* thin utility rail */}
      <div className="hidden h-9 items-center border-b border-gs-line bg-gs-paper text-[11.5px] text-gs-muted md:flex">
        <div className="gs-wrap flex items-center justify-between">
          <span className="font-semibold uppercase tracking-[.18em]">World of Goalkeeping</span>
          <div className="flex items-center gap-4">
            <a
              href="http://goalsquare.freeforums.net/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 transition hover:text-gs-ink"
            >
              {t("forum")}
              <Icon.ArrowUpRight className="h-3 w-3" />
            </a>
            <Link href="/kontakt" className="transition hover:text-gs-ink">
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-gs-line bg-white/85 backdrop-blur-xl"
            : "border-transparent bg-white"
        }`}
      >
        <div className="gs-wrap flex h-[68px] items-center gap-4">
          <Link href="/" aria-label="Goalsquare" className="shrink-0">
            <GoalsquareLogo className="h-7 w-auto text-gs-ink" />
          </Link>

          <nav className="ml-4 hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-2 text-[14px] font-medium transition ${
                    active ? "text-gs-ink" : "text-gs-muted hover:text-gs-ink"
                  }`}
                >
                  {t(item.key)}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-gs-green" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <LocaleSwitcher />

            <Link
              href="/warenkorb"
              aria-label={t("cart")}
              className="relative grid h-9 w-9 place-items-center rounded-full border border-gs-line transition hover:bg-gs-paper"
            >
              <Icon.Cart className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gs-green px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            <button onClick={openPlan} className="gs-btn gs-btn-dark hidden h-9 !px-4 text-[13.5px] sm:inline-flex">
              <Icon.Calendar className="h-4 w-4" />
              {t("planOnline")}
            </button>

            <button
              onClick={() => setMenu((v) => !v)}
              aria-label={menu ? t("close") : t("menu")}
              aria-expanded={menu}
              className="grid h-9 w-9 place-items-center rounded-full border border-gs-line lg:hidden"
            >
              {menu ? <Icon.Close className="h-4 w-4" /> : <Icon.Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menu && (
          <div className="gs-anim border-t border-gs-line bg-white lg:hidden">
            <nav className="gs-wrap grid gap-0.5 py-3" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-[15px] font-medium transition hover:bg-gs-paper"
                >
                  {t(item.key)}
                </Link>
              ))}
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
    </>
  );
}
