import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/icons";
import { PlanCta } from "@/components/PlanInfoModal";

export default async function CtaBand() {
  const t = await getTranslations("ctaBand");
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="gs-wrap">
        <div className="relative overflow-hidden rounded-[28px] bg-gs-ink p-8 text-white sm:p-12">
          <svg
            aria-hidden
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[.16]"
          >
            <defs>
              <linearGradient id="ctaG" x1="0" x2="1">
                <stop offset="0" stopColor="#00b862" />
                <stop offset="1" stopColor="#00b862" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="1200" height="400" fill="url(#ctaG)" />
            <g stroke="#fff" strokeWidth="2" fill="none" opacity=".5">
              <rect x="60" y="60" width="420" height="280" rx="4" />
              <circle cx="270" cy="200" r="90" />
              <path d="M760 60v280M960 60v280" strokeDasharray="6 10" />
            </g>
          </svg>

          <div className="relative max-w-xl">
            <h2 className="gs-h2">
              {t("title1")}
              <br />
              <span className="text-gs-green-400">{t("title2")}</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60">{t("text")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PlanCta className="gs-btn gs-btn-primary">
                <Icon.Calendar className="h-4 w-4" />
                {t("primary")}
              </PlanCta>
              <Link href="/konzept" className="gs-btn gs-btn-ghost-dark">
                {t("secondary")}
                <Icon.Arrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
