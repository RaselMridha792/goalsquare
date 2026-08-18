"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "./icons";

export default function ContactForm() {
  const t = useTranslations("contact");
  const topics = t.raw("topicOptions") as string[];
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="grid place-items-center gap-4 rounded-3xl border border-gs-green/40 bg-gs-green-soft p-12 text-center">
        <Icon.CheckCircle className="h-10 w-10 text-gs-green-600" />
        <p className="text-[15px] font-semibold text-gs-ink">{t("sent")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-4 rounded-3xl border border-gs-line bg-white p-6 sm:grid-cols-2 sm:p-8"
    >
      <label className="grid gap-1.5">
        <span className="text-[12.5px] font-semibold text-gs-ink/75">{t("name")}</span>
        <input required className="h-11 rounded-xl border border-gs-line px-3.5 text-[14px] focus:border-gs-green focus:outline-none" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-[12.5px] font-semibold text-gs-ink/75">{t("email")}</span>
        <input required type="email" className="h-11 rounded-xl border border-gs-line px-3.5 text-[14px] focus:border-gs-green focus:outline-none" />
      </label>
      <label className="grid gap-1.5 sm:col-span-2">
        <span className="text-[12.5px] font-semibold text-gs-ink/75">{t("subject")}</span>
        <select className="h-11 rounded-xl border border-gs-line bg-white px-3.5 text-[14px] focus:border-gs-green focus:outline-none">
          {topics.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 sm:col-span-2">
        <span className="text-[12.5px] font-semibold text-gs-ink/75">{t("message")}</span>
        <textarea
          required
          rows={6}
          className="rounded-xl border border-gs-line p-3.5 text-[14px] focus:border-gs-green focus:outline-none"
        />
      </label>
      <button type="submit" className="gs-btn gs-btn-primary sm:col-span-2">
        <Icon.Mail className="h-4 w-4" />
        {t("send")}
      </button>
    </form>
  );
}
