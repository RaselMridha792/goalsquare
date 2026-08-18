import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/icons";

type Card = { title: string; text: string; note: string };

export default async function Audience() {
  const t = await getTranslations("audience");
  const cards = t.raw("cards") as Card[];
  const icons = [Icon.Activity, Icon.Layers, Icon.Book];

  return (
    <section className="bg-gs-paper py-20 sm:py-28">
      <div className="gs-wrap">
        <div className="mx-auto max-w-2xl text-center">
          <span className="gs-eyebrow text-gs-muted">{t("eyebrow")}</span>
          <h2 className="gs-h2 mt-4">
            {t("title1")} <span className="text-gs-green">{t("title2")}</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => {
            const I = icons[i] ?? Icon.Box;
            return (
              <article
                key={c.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-gs-line bg-white transition hover:shadow-[0_24px_60px_-44px_rgba(0,0,0,.9)]"
              >
                <div className="relative h-40 overflow-hidden bg-gs-ink">
                  <PitchArt index={i} />
                  <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-xl bg-white/95 text-gs-ink">
                    <I className="h-4.5 w-4.5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[19px] font-extrabold tracking-tight">{c.title}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-gs-muted">{c.text}</p>
                  <p className="mt-5 border-t border-gs-line pt-4 text-[12.5px] leading-relaxed text-gs-green-600">
                    {c.note}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PitchArt({ index }: { index: number }) {
  const accents = ["var(--color-el-5)", "var(--color-el-1)", "var(--color-el-4)"];
  const c = accents[index % accents.length];
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden>
      <rect width="320" height="160" fill="#0d1b12" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={i * 40} y="0" width="20" height="160" fill="rgba(255,255,255,.022)" />
      ))}
      <g stroke="rgba(255,255,255,.28)" strokeWidth="1.2" fill="none">
        <rect x="90" y="12" width="140" height="52" />
        <rect x="128" y="12" width="64" height="24" />
        <circle cx="160" cy="120" r="34" />
        <path d="M0 120h320" strokeDasharray="3 5" />
      </g>
      <g fill={c}>
        {[
          [70, 96],
          [160, 84],
          [250, 96],
          [110, 132],
          [210, 132],
        ]
          .slice(0, 3 + index)
          .map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5.5" />
          ))}
      </g>
      <circle cx="160" cy="44" r="4" fill="#fff" />
    </svg>
  );
}
