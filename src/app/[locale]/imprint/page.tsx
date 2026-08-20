import { getTranslations } from "next-intl/server";

export default async function ImprintAshish() {
  const t = await getTranslations("imprint");

  return (
    <main className="bg-white py-20 sm:py-28">
      <div className="gs-wrap max-w-3xl">
        <h1 className="gs-h2">{t("title")}</h1>

        <div className="mt-12 grid gap-10 rounded-3xl border border-gs-line bg-gs-paper p-8 text-[15px] leading-relaxed text-gs-ink/80 sm:p-10">
          
          {/* Publisher Section */}
          <section>
            <h2 className="font-display text-[18px] font-extrabold text-gs-green-600 mb-4">
              {t("publisherTitle")}
            </h2>
            <p className="flex flex-col gap-1">
              <strong className="text-gs-ink">{t("publisherName")}</strong>
              <span>{t("publisherCompany")}</span>
              <span>{t("publisherAddress1")}</span>
              <span>{t("publisherAddress2")}</span>
              <span className="mt-2 font-medium">{t("publisherEmail")}</span>
            </p>
          </section>

          {/* Copyright Section */}
          <section>
            <h2 className="font-display text-[18px] font-extrabold text-gs-green-600 mb-4">
              {t("copyrightTitle")}
            </h2>
            <p className="font-bold text-gs-ink">{t("copyrightSubtitle")}</p>
            <p className="mt-2">{t("copyrightTrademark")}</p>
            <p className="mt-4">{t("copyrightText")}</p>
          </section>

          {/* Disclaimer Section */}
          <section>
            <h2 className="font-display text-[18px] font-extrabold text-gs-green-600 mb-4">
              {t("liabilityTitle")}
            </h2>
            <div className="grid gap-4">
              <p>{t("liabilityText1")}</p>
              <p>{t("liabilityText2")}</p>
              <p>{t("liabilityText3")}</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}