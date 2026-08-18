import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/icons";
import { PlanCta } from "@/components/PlanInfoModal";

export default async function PlanBanner() {
  const t = await getTranslations("plan");
  const tc = await getTranslations("common");
  const bullets = t.raw("bullets") as string[];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gs-ink p-6 text-white sm:p-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gs-green/20 blur-3xl"
      />
      <div className="relative grid gap-8 lg:grid-cols-[1.5fr_auto_auto] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="gs-eyebrow rounded-full bg-gs-green px-3 py-1.5 text-[10px] text-white">
              <Icon.Sparkle className="h-3 w-3" />
              {t("badge")}
            </span>
            <span className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-white/70">
              {t("kicker")}
            </span>
          </div>

          <h3 className="mt-5 font-display text-[clamp(1.55rem,3.4vw,2.5rem)] font-extrabold leading-[1.05] tracking-tight">
            {t("title")} <span className="text-gs-green-400">{t("titleAccent")}</span>
          </h3>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-white/60">{t("lead")}</p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-white/85">
                <Icon.CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gs-green-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/12 bg-white/[.04] p-6 text-center">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="font-display text-[2.6rem] font-extrabold leading-none text-gs-green-400">
              € {t("priceMonthly")}
            </span>
            <span className="text-[12px] text-white/50">{tc("perMonth")}</span>
          </div>
          <p className="mt-2 text-[12px] text-white/45">{t("priceNote")}</p>
          <PlanCta className="gs-btn gs-btn-primary mt-5 w-full">
            <Icon.Calendar className="h-4 w-4" />
            {t("cta")}
          </PlanCta>
        </div>

        <div className="hidden xl:block">
          <PlanLogo />
        </div>
      </div>
    </div>
  );
}

function PlanLogo() {
  return (
    <div className="grid h-40 w-40 place-items-center rounded-2xl bg-white/95 p-3">
      <svg viewBox="0 0 120 120" className="h-full w-full" role="img" aria-label="Goalsquare PLAN">
        <rect x="4" y="4" width="112" height="112" rx="18" fill="#0f7a45" />
        <path
          d="M40 78c6-16 18-30 34-38"
          stroke="#fff"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="80" cy="34" r="7" fill="#fff" />
        <circle cx="92" cy="28" r="5.5" fill="#fff" />
        <text
          x="60"
          y="96"
          textAnchor="middle"
          fontFamily="Archivo, sans-serif"
          fontSize="15"
          fontWeight="800"
          fill="#fff"
          letterSpacing="1"
        >
          GOALSQUARE
        </text>
        <text
          x="60"
          y="110"
          textAnchor="middle"
          fontFamily="Archivo, sans-serif"
          fontSize="15"
          fontWeight="800"
          fill="#fff"
          letterSpacing="3"
        >
          PLAN
        </text>
        <path d="M96 84v18h-18" stroke="#fff" strokeWidth="2.5" fill="none" />
      </svg>
    </div>
  );
}
