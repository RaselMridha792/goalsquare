import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getElements } from "@/lib/elements";
import ElementsExplorer from "@/components/ElementsExplorer";
import { ElementIcons, Icon } from "@/components/icons";
import CtaBand from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "elements" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function KonzeptPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("elements");
  const th = await getTranslations("how");
  const tp = await getTranslations("products");
  const elements = getElements(locale as Locale);
  const facts = t.raw("facts") as { k: string; v: string }[];
  const steps = th.raw("steps") as { tag: string; title: string; detail: string }[];

  return (
    <>
      {/* ---------- intro ---------- */}
      <section className="relative overflow-hidden bg-gs-ink pb-24 pt-16 text-white sm:pb-32 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-gs-green/12 blur-[130px]"
        />
        <div className="gs-wrap relative grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <span className="gs-eyebrow rounded-full border border-white/20 px-3.5 py-1.5 text-white/80">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gs-green" />
              {t("eyebrow")}
            </span>
            <h1 className="gs-h1 mt-6 max-w-[14ch]">{t("title")}</h1>
            <p className="mt-6 max-w-[56ch] text-[16px] leading-relaxed text-white/60">
              {t("subtitle")}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-7 border-t border-white/12 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {facts.map((f) => (
              <div key={f.v}>
                <dt className="whitespace-nowrap font-display text-[clamp(1.35rem,2.2vw,1.9rem)] font-extrabold leading-none text-gs-green-400">
                  {f.k}
                </dt>
                <dd className="mt-1.5 text-[12px] leading-snug text-white/50">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* colour legend */}
        <div className="gs-wrap relative mt-14">
          <ol className="grid gap-2 sm:grid-cols-5">
            {elements.map((el) => {
              const I = ElementIcons[el.icon];
              return (
                <li
                  key={el.id}
                  className="flex items-center gap-3 rounded-2xl border-t-[3px] bg-white/[.05] p-3.5"
                  style={{ borderTopColor: el.color }}
                >
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                    style={{ background: `${el.color}26`, color: el.color }}
                  >
                    <I className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10.5px] font-bold" style={{ color: el.color }}>
                      {el.number}
                    </span>
                    <span className="block text-[13px] font-semibold leading-snug text-white/90">
                      {el.title}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------- interactive explorer ---------- */}
      <section className="relative -mt-14 pb-20 sm:pb-28">
        <div className="gs-wrap">
          <div className="rounded-[28px] border border-gs-line bg-white p-5 shadow-[0_30px_80px_-60px_rgba(0,0,0,.9)] sm:p-8">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-[19px] font-extrabold tracking-tight">
                {t("title")}
              </h2>
              <span className="inline-flex items-center gap-1.5 text-[12.5px] text-gs-muted">
                <Icon.Sparkle className="h-3.5 w-3.5 text-gs-green" />
                {t("hint")}
              </span>
            </div>
            <ElementsExplorer elements={elements} />
          </div>
        </div>
      </section>

      {/* ---------- curriculum note + method steps ---------- */}
      <section className="bg-gs-paper py-20 sm:py-24">
        <div className="gs-wrap grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <h2 className="gs-h2">{t("curriculumTitle")}</h2>
            <p className="gs-lead mt-4">{t("curriculumText")}</p>
            <Link href="/produkte" className="gs-btn gs-btn-dark mt-8">
              {tp("title")}
              <Icon.Arrow className="h-4 w-4" />
            </Link>
          </div>

          <ol className="grid gap-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-gs-line bg-white p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gs-green-soft font-mono text-[12px] font-bold text-gs-green-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-gs-muted">
                    {s.tag}
                  </p>
                  <h3 className="mt-1 font-display text-[17px] font-extrabold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-gs-muted">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
