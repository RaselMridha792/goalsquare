"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "./icons";

const Ctx = createContext<{ open: () => void } | null>(null);

export function usePlanInfo() {
  const c = useContext(Ctx);
  return c ?? { open: () => {} };
}

/**
 * "Info screen" that opens when a visitor clicks "Online planen".
 * Requested by the client on 18 Aug: Goalsquare PLAN only goes live in September,
 * so the CTA must explain the launch instead of leading to a dead end.
 */
export function PlanInfoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const t = useTranslations("plan");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="plan-info-title"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="gs-anim relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto overflow-x-hidden rounded-t-3xl bg-gs-ink text-white shadow-2xl sm:rounded-3xl">
            <button
              onClick={close}
              aria-label={tn("close")}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <Icon.Close className="h-4 w-4" />
            </button>

            <div className="grid min-w-0 gap-0 md:grid-cols-[1.15fr_.85fr]">
              <div className="min-w-0 p-7 sm:p-9">
                <span className="gs-eyebrow rounded-full bg-gs-green px-3 py-1.5 text-[10px] text-white">
                  <Icon.Sparkle className="h-3 w-3" />
                  {t("badge")}
                </span>
                <h2 id="plan-info-title" className="mt-5 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.05]">
                  {t("infoTitle")}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{t("infoLead")}</p>

                <ul className="mt-6 grid gap-2.5">
                  {t.raw("infoPoints").map((p: string) => (
                    <li key={p} className="flex items-start gap-2.5 text-[14px] text-white/85">
                      <Icon.CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gs-green-400" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/produkte" onClick={close} className="gs-btn gs-btn-primary">
                    {t("infoAlt")}
                    <Icon.Arrow className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="min-w-0 border-t border-white/10 bg-white/[.04] p-7 pr-14 sm:p-9 sm:pr-14 md:border-l md:border-t-0">
                <h3 className="text-lg leading-snug">{t("infoNotifyTitle")}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">
                  {t("infoNotifyText")}
                </p>
                {sent ? (
                  <p className="mt-5 flex items-start gap-2 rounded-xl bg-gs-green/15 p-3.5 text-[13.5px] text-gs-green-400">
                    <Icon.CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {t("success")}
                  </p>
                ) : (
                  <form
                    className="mt-5 grid gap-2.5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <label className="sr-only" htmlFor="plan-email">
                      E-Mail
                    </label>
                    <input
                      id="plan-email"
                      type="email"
                      required
                      placeholder="name@club.com"
                      className="h-11 rounded-xl border border-white/15 bg-white/5 px-3.5 text-[14px] text-white placeholder:text-white/35 focus:border-gs-green focus:outline-none"
                    />
                    <button type="submit" className="gs-btn gs-btn-primary w-full !px-3 text-[13.5px]">
                      {t("infoNotifyCta")}
                    </button>
                  </form>
                )}

                <div className="mt-7 rounded-2xl border border-white/10 p-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-3xl font-extrabold text-gs-green-400">
                      € {t("priceMonthly")}
                    </span>
                    <span className="text-[12px] text-white/50">{tc("perMonth")}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-white/45">{t("priceNote")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

export function PlanCta({
  className = "gs-btn gs-btn-primary",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open } = usePlanInfo();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
