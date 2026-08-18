import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/icons";
import { PlanCta } from "@/components/PlanInfoModal";

export default async function WorkflowShowcase() {
  const t = await getTranslations("workflow");
  const rows = t.raw("demoRows") as string[];
  const colors = ["var(--color-el-1)", "var(--color-el-4)", "var(--color-el-3)", "var(--color-el-5)"];

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

        {/* session planner mock */}
        <div className="rounded-3xl border border-white/10 bg-white/[.04] p-3 shadow-2xl backdrop-blur sm:p-4">
          <div className="overflow-hidden rounded-2xl bg-white text-gs-ink">
            <div className="flex items-center gap-2 border-b border-gs-line px-4 py-3">
              <span className="flex gap-1.5">
                <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="ml-2 font-display text-[14px] font-bold tracking-tight">
                {t("demoTitle")}
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-gs-green-soft px-2.5 py-1 text-[11px] font-semibold text-gs-green-600">
                <Icon.Plus className="h-3 w-3" />
                {t("demoAdd")}
              </span>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-0">
              <div className="hidden w-40 border-r border-gs-line p-4 sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[.14em] text-gs-muted">Menu</p>
                <ul className="mt-3 grid gap-1.5 text-[12.5px] text-gs-muted">
                  {["Dashboard", "Drills", "Goalkeepers", "Calendar", "Export"].map((x, i) => (
                    <li
                      key={x}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
                        i === 0 ? "bg-gs-paper font-semibold text-gs-ink" : ""
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gs-line" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-[26px] font-extrabold leading-none">
                    {t("demoDuration")}
                  </span>
                  <span className="font-display text-[19px] font-extrabold leading-none text-gs-muted">
                    {t("demoFocus")}
                  </span>
                </div>

                <ul className="mt-4 grid gap-2">
                  {rows.map((r, i) => (
                    <li
                      key={r}
                      className="flex items-center gap-3 rounded-xl border border-gs-line bg-white px-3 py-2.5 text-[13px]"
                    >
                      <span
                        className="h-6 w-1.5 shrink-0 rounded-full"
                        style={{ background: colors[i % colors.length] }}
                      />
                      <span className="min-w-0 flex-1 truncate">{r}</span>
                      <span className="shrink-0 font-mono text-[11px] text-gs-muted">
                        {[12, 20, 18, 25][i]} min
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-gs-green-soft px-3 py-2.5 text-[12px] text-gs-green-600">
                  <Icon.Sparkle className="h-3.5 w-3.5" />
                  AI: Belastung 72 % · RPE 6/10 · PDF ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
