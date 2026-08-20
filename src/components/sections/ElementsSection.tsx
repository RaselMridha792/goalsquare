import { getTranslations } from "next-intl/server";
import { getElements } from "@/lib/elements";
import type { Locale } from "@/i18n/routing";
import ElementsExplorer from "@/components/ElementsExplorer";
import { Icon } from "@/components/icons";

export default async function ElementsSection({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const t = await getTranslations("elements");
  const elements = getElements(locale);

  return (
    <section className="relative overflow-hidden bg-gs-paper py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,.045)_1px,transparent_0)] [background-size:26px_26px]"
      />
      <div className="gs-wrap relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="gs-eyebrow rounded-full bg-white px-3 py-1.5 text-gs-green shadow-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gs-green" />
              {t("eyebrow")}
            </span>
            <h2 className="gs-h2 mt-4">{t("title")}</h2>
            <p className="gs-lead mt-3">{t("subtitle")}</p>
            <p className="mt-3 text-[16px] leading-relaxed text-gs-muted">
              {t("curriculumText")}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[12.5px] font-medium text-gs-muted">
            <Icon.Sparkle className="h-3.5 w-3.5 text-gs-green" />
            {t("hint")}
          </div>
        </div>

        <div className="mt-11">
          <ElementsExplorer elements={elements} compact={compact} />
        </div>
      </div>
    </section>
  );
}