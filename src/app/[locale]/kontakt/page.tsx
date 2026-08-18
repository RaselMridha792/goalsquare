import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import ContactForm from "@/components/ContactForm";
import { Icon } from "@/components/icons";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("lead") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("contact");
  const tp = await getTranslations("products");

  return (
    <section className="py-14 sm:py-20">
      <div className="gs-wrap grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
        <div>
          <h1 className="gs-h2">{t("title")}</h1>
          <p className="gs-lead mt-4">{t("lead")}</p>

          <div className="mt-9 grid gap-3">
            <div className="flex items-start gap-3 rounded-2xl border border-gs-line p-4">
              <Icon.Mail className="mt-0.5 h-5 w-5 shrink-0 text-gs-green" />
              <div>
                <p className="text-[13px] font-semibold">{t("infoTitle")}</p>
                <a href="mailto:info@goalsquare.eu" className="text-[13.5px] text-gs-muted underline underline-offset-4">
                  info@goalsquare.eu
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-gs-line p-4">
              <Icon.Cart className="mt-0.5 h-5 w-5 shrink-0 text-gs-green" />
              <div>
                <p className="text-[13px] font-semibold">{tp("clubTitle")}</p>
                <p className="text-[13.5px] text-gs-muted">{tp("clubText")}</p>
              </div>
            </div>
            <a
              href="http://goalsquare.freeforums.net/"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-start gap-3 rounded-2xl border border-gs-line p-4 transition hover:bg-gs-paper"
            >
              <Icon.Layers className="mt-0.5 h-5 w-5 shrink-0 text-gs-green" />
              <div>
                <p className="inline-flex items-center gap-1 text-[13px] font-semibold">
                  Forum <Icon.ArrowUpRight className="h-3 w-3" />
                </p>
                <p className="text-[13.5px] text-gs-muted">goalsquare.freeforums.net</p>
              </div>
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
