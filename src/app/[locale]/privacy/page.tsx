import { getTranslations } from "next-intl/server";

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <main className="bg-white py-20 sm:py-28">
      <div className="gs-wrap max-w-4xl">
        <h1 className="gs-h2">{t("title")}</h1>
        <p className="gs-lead mt-3">{t("subtitle")}</p>

        <div className="mt-12 space-y-10 rounded-3xl border border-gs-line bg-gs-paper p-8 text-[15px] leading-relaxed text-gs-ink/80 sm:p-12">
          
          {/* Section 1 */}
          <section>
            <h2 className="font-display text-[20px] font-extrabold text-gs-green-600 mb-3">
              {t("s1.title")}
            </h2>
            <p>{t("s1.text")}</p>
          </section>

          {/* Section 2: Data Controller (From Screenshot) */}
          <section>
            <h2 className="font-display text-[20px] font-extrabold text-gs-green-600 mb-3">
              {t("s2.title")}
            </h2>
            <p className="whitespace-pre-line">{t("s2.text")}</p>
          </section>

          {/* Section 3: Data Collection */}
          <section>
            <h2 className="font-display text-[20px] font-extrabold text-gs-green-600 mb-3">
              {t("s3.title")}
            </h2>
            <p>{t("s3.text")}</p>
          </section>

          {/* Section 4: Cookies */}
          <section>
            <h2 className="font-display text-[20px] font-extrabold text-gs-green-600 mb-3">
              {t("s4.title")}
            </h2>
            <p>{t("s4.text")}</p>
          </section>

          {/* Section 5: User Rights */}
          <section>
            <h2 className="font-display text-[20px] font-extrabold text-gs-green-600 mb-3">
              {t("s5.title")}
            </h2>
            <p>{t("s5.text")}</p>
          </section>

        </div>
      </div>
    </main>
  );
}