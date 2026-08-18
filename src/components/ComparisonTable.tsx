import { getLocale } from "next-intl/server";
import { Icon } from "./icons";

const ROWS: { label: Record<string, string>; basic: boolean; pro: boolean; plan: boolean }[] = [
  {
    label: {
      de: "Basis-Übungsarchiv (260 Übungen)",
      en: "Base drill archive (260 drills)",
      fr: "Archive de base (260 exercices)",
      nl: "Basisarchief (260 oefeningen)",
    },
    basic: true, pro: true, plan: true,
  },
  {
    label: {
      de: "Trainingsplanung & PDF-Export",
      en: "Session planning & PDF export",
      fr: "Planification & export PDF",
      nl: "Trainingsplanning & PDF-export",
    },
    basic: true, pro: true, plan: true,
  },
  {
    label: {
      de: "Synchronisation mit der Mobil-App",
      en: "Sync with the mobile app",
      fr: "Synchronisation avec l'app mobile",
      nl: "Synchronisatie met de mobiele app",
    },
    basic: true, pro: true, plan: true,
  },
  {
    label: {
      de: "Eigene Übungen erstellen",
      en: "Create your own drills",
      fr: "Créer ses propres exercices",
      nl: "Eigen oefeningen aanmaken",
    },
    basic: true, pro: true, plan: true,
  },
  {
    label: {
      de: "DRAW Übungs-Zeichenmodul",
      en: "DRAW drill drawing module",
      fr: "Module de dessin DRAW",
      nl: "DRAW-tekenmodule",
    },
    basic: false, pro: true, plan: false,
  },
  {
    label: {
      de: "Leistungs- & Trainingsbewertung",
      en: "Performance & training assessment",
      fr: "Évaluation performance & entraînement",
      nl: "Prestatie- & trainingsbeoordeling",
    },
    basic: false, pro: true, plan: false,
  },
  {
    label: {
      de: "Spielererfassung und Analyse",
      en: "Player records and analysis",
      fr: "Suivi et analyse des joueurs",
      nl: "Spelersregistratie en analyse",
    },
    basic: false, pro: true, plan: true,
  },
  {
    label: {
      de: "Ohne Installation im Browser",
      en: "Runs in the browser, no install",
      fr: "Dans le navigateur, sans installation",
      nl: "In de browser, zonder installatie",
    },
    basic: false, pro: false, plan: true,
  },
  {
    label: {
      de: "KI-unterstützte Trainingsplanung",
      en: "AI-assisted session planning",
      fr: "Planification assistée par IA",
      nl: "AI-ondersteunde planning",
    },
    basic: false, pro: false, plan: true,
  },
  {
    label: {
      de: "Cloud-Sync für Trainerteams",
      en: "Cloud sync for coaching teams",
      fr: "Synchro cloud pour le staff",
      nl: "Cloudsync voor trainersstaf",
    },
    basic: false, pro: false, plan: true,
  },
];

const TITLE: Record<string, string> = {
  de: "BASIC, PRO oder PLAN?",
  en: "BASIC, PRO or PLAN?",
  fr: "BASIC, PRO ou PLAN ?",
  nl: "BASIC, PRO of PLAN?",
};
const SUB: Record<string, string> = {
  de: "Alle drei nutzen dieselbe Methode und dasselbe Übungsarchiv. Sie unterscheiden sich darin, wo du arbeitest und wie tief du auswertest.",
  en: "All three use the same method and the same drill archive. They differ in where you work and how deeply you analyse.",
  fr: "Les trois utilisent la même méthode et la même archive. Ils diffèrent par l'endroit où vous travaillez et la profondeur d'analyse.",
  nl: "Alle drie gebruiken dezelfde methode en hetzelfde oefeningenarchief. Ze verschillen in waar je werkt en hoe diep je analyseert.",
};

export default async function ComparisonTable() {
  const loc = await getLocale();

  return (
    <section className="bg-gs-paper py-20 sm:py-24">
      <div className="gs-wrap">
        <div className="max-w-2xl">
          <h2 className="gs-h2">{TITLE[loc] ?? TITLE.de}</h2>
          <p className="gs-lead mt-3">{SUB[loc] ?? SUB.de}</p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-gs-line bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gs-line">
                <th className="p-4 text-[12px] font-bold uppercase tracking-[.14em] text-gs-muted sm:p-5">
                  &nbsp;
                </th>
                <th className="p-4 font-display text-[15px] font-extrabold sm:p-5">BASIC</th>
                <th className="bg-gs-ink/[.03] p-4 font-display text-[15px] font-extrabold sm:p-5">
                  PRO Suite
                </th>
                <th className="bg-gs-green-soft p-4 font-display text-[15px] font-extrabold text-gs-green-600 sm:p-5">
                  PLAN
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} className="border-b border-gs-line/70 last:border-0">
                  <td className="p-4 text-[13.5px] text-gs-ink/80 sm:p-5">
                    {r.label[loc] ?? r.label.de}
                  </td>
                  <Cell on={r.basic} />
                  <Cell on={r.pro} tint="bg-gs-ink/[.03]" />
                  <Cell on={r.plan} tint="bg-gs-green-soft/60" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Cell({ on, tint = "" }: { on: boolean; tint?: string }) {
  return (
    <td className={`p-4 sm:p-5 ${tint}`}>
      {on ? (
        <Icon.CheckCircle className="h-5 w-5 text-gs-green" aria-label="yes" />
      ) : (
        <span className="block h-[2px] w-4 rounded-full bg-gs-line" aria-label="no" />
      )}
    </td>
  );
}
