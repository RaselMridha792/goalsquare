"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/icons";

type Step = { tag: string; title: string; text: string; bullets: string[]; detail: string };

const STEP_ICONS = [Icon.Book, Icon.Layers, Icon.Monitor, Icon.Activity];

export default function HowItWorks() {
  const t = useTranslations("how");
  const tc = useTranslations("common");
  const steps = t.raw("steps") as Step[];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="gs-wrap">
        <span className="gs-eyebrow text-gs-green">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gs-green" />
          {t("eyebrow")}
        </span>
        <h2 className="gs-h2 mt-4">{t("title")}</h2>
        <p className="gs-lead mt-3 max-w-xl">{t("subtitle")}</p>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => {
            const StepIcon = STEP_ICONS[i] ?? Icon.Box;
            const isOpen = open === i;
            return (
              <li
                key={step.title}
                className={`group relative flex flex-col rounded-3xl border p-6 transition-all duration-300 ${
                  isOpen
                    ? "border-gs-green bg-gs-green-soft shadow-[0_18px_48px_-30px_rgba(0,184,98,.9)]"
                    : "border-gs-line bg-white hover:border-gs-green/45 hover:shadow-[0_16px_40px_-32px_rgba(0,0,0,.6)]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-gs-green-soft font-mono text-[11px] font-bold text-gs-green-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-[.16em] text-gs-muted">
                    {step.tag}
                  </span>
                  <StepIcon className="ml-auto h-5 w-5 text-gs-green" />
                </div>

                <h3 className="mt-5 font-display text-[19px] font-extrabold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-gs-muted">{step.text}</p>

                <ul className="mt-4 grid gap-2 border-t border-gs-line/80 pt-4">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13px] leading-snug text-gs-ink/75">
                      <span aria-hidden className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-gs-green" />
                      {b}
                    </li>
                  ))}
                </ul>

                {isOpen && (
                  <p className="gs-anim mt-4 rounded-2xl bg-white/70 p-3.5 text-[13px] leading-relaxed text-gs-muted">
                    {step.detail}
                  </p>
                )}

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gs-green-600 transition hover:opacity-70"
                  aria-expanded={isOpen}
                >
                  {isOpen ? tc("showLess") : tc("learnMore")}
                  <Icon.Chevron className={`h-3.5 w-3.5 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </li>
            );
          })}
        </ol>

        {/* ক্লায়েন্টের রিকোয়েস্ট করা নতুন প্যারাগ্রাফটি এখানে অ্যাড করা হলো */}
        <div className="mt-16 max-w-3xl rounded-3xl bg-gs-paper p-6 sm:p-8 md:mt-24">
           <h3 className="font-display text-[22px] font-bold text-gs-ink">One curriculum, five colours.</h3>
           <p className="mt-3 text-[15.5px] leading-relaxed text-gs-muted">
             Every element contains dedicated drills for each age and performance level, so every goalkeeper can be developed individually. The difficulty can be adapted to the level of the keeper.
           </p>
        </div>
      </div>
    </section>
  );
}