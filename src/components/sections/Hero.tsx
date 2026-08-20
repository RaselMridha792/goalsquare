import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/icons";
import { PlanCta } from "@/components/PlanInfoModal";

export default async function Hero() {
  const t = await getTranslations("hero");

  const stats = [
    { k: t("stat1"), v: t("stat1Label") },
    { k: t("stat2"), v: t("stat2Label") },
   
    { k: t("stat4"), v: t("stat4Label") },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-gs-ink text-white w-full min-h-[100vh] flex items-center">
      <Image
        src="/img/hero-goalkeeper.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_center] sm:object-[75%_center] md:object-[85%_center]"
      />
      
      <div
        aria-hidden
        className="absolute inset-0 "
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[20vh] bg-[linear-gradient(to_bottom,rgba(8,11,10,.40),transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[20vh] bg-[linear-gradient(to_top,rgba(255,255,255,1),transparent)]"
      />

      <div className="w-full px-[5vw] relative z-10 pt-[15vh] pb-[10vh]">
        <div className="max-w-[90vw] md:max-w-[60vw] lg:max-w-[45vw]">
          <span className="gs-eyebrow rounded-full border border-white/20 bg-white/[.06] px-3.5 py-1.5 text-white/85 backdrop-blur inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gs-green" />
            {t("eyebrow")}
          </span>

          <h1 className="gs-h1 mt-[3vh] max-w-[16ch]">
            {t("title1")}
            <br />
            <span className="text-gs-green-400">{t("title2")}</span>
          </h1>

          <p className="mt-[3vh] max-w-[34ch] font-display text-[clamp(1.15rem,2.1vw,1.55rem)] font-bold leading-snug tracking-tight text-white/95">
            {t("subtitle")}
          </p>
          <p className="mt-[2vh] max-w-[48ch] text-[15.5px] leading-relaxed text-white/75">
            {t("lead")}
          </p>

          <div className="mt-[4vh] flex flex-wrap items-center gap-3">
            <Link href="/konzept" className="gs-btn gs-btn-light">
              {t("ctaPrimary")}
              <Icon.Arrow className="h-4 w-4" />
            </Link>
            <PlanCta className="gs-btn gs-btn-primary">
              <Icon.Calendar className="h-4 w-4" />
              {t("ctaSecondary")}
            </PlanCta>
            <Link href="/shop" className="gs-btn gs-btn-ghost-dark">
              {t("ctaShop")}
            </Link>
          </div>

          <dl className="mt-[8vh] grid max-w-2xl grid-cols-2 gap-x-6 gap-y-[4vh] border-t border-white/12 pt-[4vh] sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.v}>
                <dt className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-none text-white">
                  {s.k}
                </dt>
                <dd className="mt-1.5 text-[12.5px] leading-snug text-white/60">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}