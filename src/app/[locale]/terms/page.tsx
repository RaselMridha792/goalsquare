import { getTranslations } from "next-intl/server";

export default async function TermsPage() {
  const t = await getTranslations("terms");

  return (
    <main className="bg-white py-20 sm:py-28">
      <div className="gs-wrap max-w-4xl">
        <h1 className="gs-h2">{t("title")}</h1>
        <p className="gs-lead mt-3">{t("subtitle")}</p>

        <div className="mt-12 space-y-10 rounded-3xl border border-gs-line bg-gs-paper p-8 text-[15px] leading-relaxed text-gs-ink/80 sm:p-12">
          
          <section>
            <h2 className="font-display text-[20px] font-extrabold text-gs-green-600 mb-3">
              {t("s1.title")}
            </h2>
            <p>{t("s1.text")}</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-extrabold text-gs-green-600 mb-3">
              {t("s2.title")}
            </h2>
            <p>{t("s2.text")}</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-extrabold text-gs-green-600 mb-3">
              {t("s3.title")}
            </h2>
            <p>{t("s3.text")}</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-extrabold text-gs-green-600 mb-3">
              {t("s4.title")}
            </h2>
            <p>{t("s4.text")}</p>
          </section>

        </div>
      </div>
    </main>
  );
}