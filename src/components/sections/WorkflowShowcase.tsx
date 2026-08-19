import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/icons";
import { PlanCta } from "@/components/PlanInfoModal";

export default async function WorkflowShowcase() {
  const t = await getTranslations("workflow");

  return (
    <section className="relative overflow-hidden bg-gs-ink py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-gs-green/12 blur-[120px]"
      />
      <div className="gs-wrap relative grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <span className="gs-eyebrow text-gs-green-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gs-green" />
            {t("eyebrow")}
          </span>
          <h2 className="gs-h2 mt-4">
            {t("title1")}
            <br />
            <span className="text-gs-green-400">{t("title2")}</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">{t("text")}</p>
          <PlanCta className="gs-btn gs-btn-primary mt-8">
            <Icon.Calendar className="h-4 w-4" />
            {t("cta")}
          </PlanCta>
        </div>

        {/* session planner screenshot instead of HTML mock */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] shadow-2xl">
          <Image
            src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1787124379/Training_in_the_club_voo1gr.jpg" 
            alt="Goalsquare PLAN"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}