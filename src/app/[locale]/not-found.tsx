import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/icons";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tn = useTranslations("nav");
  return (
    <div className="gs-wrap grid min-h-[62vh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-[clamp(5rem,16vw,11rem)] font-extrabold leading-none text-gs-paper">
          404
        </p>
        <h1 className="gs-h2 -mt-4">{t("title")}</h1>
        <p className="gs-lead mx-auto mt-3 max-w-md">{t("text")}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="gs-btn gs-btn-primary">
            {t("cta")} <Icon.Arrow className="h-4 w-4" />
          </Link>
          <Link href="/shop" className="gs-btn gs-btn-ghost">{tn("shop")}</Link>
          <Link href="/konzept" className="gs-btn gs-btn-ghost">{tn("concept")}</Link>
        </div>
      </div>
    </div>
  );
}
