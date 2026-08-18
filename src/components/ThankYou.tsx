"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "./icons";

export default function ThankYou() {
  const t = useTranslations("checkout");
  const [order, setOrder] = useState("GS-2026-000000");

  useEffect(() => {
    try {
      const v = window.sessionStorage.getItem("gs.lastOrder");
      if (v) setOrder(v);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="mx-auto grid max-w-lg place-items-center gap-5 py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gs-green-soft text-gs-green-600">
        <Icon.CheckCircle className="h-8 w-8" />
      </span>
      <h1 className="gs-h2">{t("thankYouTitle")}</h1>
      <p className="gs-lead">{t("thankYouLead")}</p>
      <p className="rounded-full border border-gs-line px-4 py-2 font-mono text-[13px]">
        {t("orderNumber")}: <strong>{order}</strong>
      </p>
      <Link href="/" className="gs-btn gs-btn-primary mt-2">
        {t("thankYouCta")} <Icon.Arrow className="h-4 w-4" />
      </Link>
    </div>
  );
}
