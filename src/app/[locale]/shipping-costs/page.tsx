import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/icons";

export default async function ShippingCostsPage() {
  const t = await getTranslations("shipping");

  return (
    <main className="bg-white py-20 sm:py-28">
      <div className="gs-wrap max-w-4xl">
        <h1 className="gs-h2">{t("title")}</h1>
        <p className="gs-lead mt-3">{t("subtitle")}</p>

        <div className="mt-12 space-y-8">
          {/* Digital Products Card */}
          <div className="rounded-3xl border border-gs-line bg-gs-paper p-8 text-[15px] leading-relaxed text-gs-ink/80 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gs-green-soft text-gs-green-600">
                <Icon.Monitor className="h-5 w-5" />
              </span>
              <h2 className="font-display text-[20px] font-extrabold text-gs-ink">
                {t("digital.title")}
              </h2>
            </div>
            <p className="mt-4">{t("digital.text")}</p>
          </div>

          {/* Physical Products Card */}
          <div className="rounded-3xl border border-gs-line bg-gs-paper p-8 text-[15px] leading-relaxed text-gs-ink/80 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gs-green-soft text-gs-green-600">
                <Icon.Box className="h-5 w-5" />
              </span>
              <h2 className="font-display text-[20px] font-extrabold text-gs-ink">
                {t("physical.title")}
              </h2>
            </div>
            <p className="mt-4">{t("physical.text")}</p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gs-line bg-white">
              <table className="w-full text-left text-[14px]">
                <thead>
                  <tr className="border-b border-gs-line bg-gs-paper/50">
                    <th className="p-4 font-bold text-gs-ink">{t("table.region")}</th>
                    <th className="p-4 font-bold text-gs-ink">{t("table.cost")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gs-line/60">
                  <tr>
                    <td className="p-4">{t("table.germanyEu")}</td>
                    <td className="p-4 font-semibold text-gs-ink">{t("table.standardEu")}</td>
                  </tr>
                  <tr>
                    <td className="p-4">{t("table.international")}</td>
                    <td className="p-4 font-semibold text-gs-ink">{t("table.standardInt")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Delivery Times & Notes */}
          <div className="rounded-3xl border border-gs-line bg-gs-paper p-8 text-[15px] leading-relaxed text-gs-ink/80 sm:p-10">
            <h2 className="font-display text-[20px] font-extrabold text-gs-green-600">
              {t("deliveryTimes.title")}
            </h2>
            <p className="mt-3">{t("deliveryTimes.text")}</p>
          </div>
        </div>
      </div>
    </main>
  );
}