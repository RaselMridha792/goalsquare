import { getLocale } from "next-intl/server";
import { Icon } from "./icons";

type CellValue = boolean | string | Record<string, string>;

const ROWS: { label: Record<string, string>; basic: CellValue; pro: CellValue; plan: CellValue }[] = [
  {
    label: {
      de: "Erweiterbar mit Drills Packs",
      en: "Expandable by Drills Packs",
      fr: "Extensible avec des Drills Packs",
      nl: "Uitbreidbaar met Drill Packs",
    },
    basic: true, pro: true, plan: false,
  },
  {
    label: {
      de: "Betriebssystem",
      en: "Operating System",
      fr: "Système d'exploitation",
      nl: "Besturingssysteem",
    },
    basic: "Windows",
    pro: "Windows",
    plan: {
      de: "Beliebig (webbasiert)",
      en: "Any (web-based)",
      fr: "Peu importe (navigateur)",
      nl: "Ongeacht (webgebaseerd)",
    },
  },
  {
    label: {
      de: "Spielererfassung (Datenbank) und Analyse",
      en: "Player records (database) and analysis",
      fr: "Suivi et analyse des joueurs (base de données)",
      nl: "Spelersregistratie (database) en analyse",
    },
    basic: true, pro: true, plan: false,
  },
  {
    label: {
      de: "Spielaufzeichnung und -analyse",
      en: "Game records and analysis",
      fr: "Enregistrement et analyse des matchs",
      nl: "Wedstrijdregistratie en -analyse",
    },
    basic: false, pro: true, plan: false,
  },
  {
    label: {
      de: "Trainererfassung (Datenbank)",
      en: "Coaches records (database)",
      fr: "Fiches entraîneurs (base de données)",
      nl: "Trainersregistratie (database)",
    },
    basic: false, pro: true, plan: false,
  },
  {
    label: {
      de: "Eigene Übungen / eigene Übungsdatenbank erstellen",
      en: "Create your own drills / own drill database",
      fr: "Créer ses propres exercices / sa propre base d'exercices",
      nl: "Eigen oefeningen / eigen oefeningendatabase aanmaken",
    },
    basic: false, pro: true, plan: false,
  },
  {
    label: {
      de: "Enthaltenes Basis-Übungsarchiv",
      en: "Basic drills archive included",
      fr: "Archive d'exercices de base incluse",
      nl: "Inbegrepen basisoefeningenarchief",
    },
    basic: "260 (*)",
    pro: "260 (*)",
    plan: "1,250+",
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
    basic: true, pro: true, plan: false,
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
    basic: false, pro: false, plan: false,
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
const FOOTNOTE: Record<string, string> = {
  de: "(*) = erweiterbar durch Drills Packs",
  en: "(*) = extendable by Drills Packs",
  fr: "(*) = extensible avec des Drills Packs",
  nl: "(*) = uitbreidbaar met Drill Packs",
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
                  <Cell value={r.basic} loc={loc} />
                  <Cell value={r.pro} loc={loc} tint="bg-gs-ink/[.03]" />
                  <Cell value={r.plan} loc={loc} tint="bg-gs-green-soft/60" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[12.5px] text-gs-muted">{FOOTNOTE[loc] ?? FOOTNOTE.de}</p>
      </div>
    </section>
  );
}

function Cell({
  value,
  loc,
  tint = "",
}: {
  value: boolean | string | Record<string, string>;
  loc: string;
  tint?: string;
}) {
  let content;
  if (typeof value === "boolean") {
    content = value ? (
      <Icon.CheckCircle className="h-5 w-5 text-gs-green" aria-label="yes" />
    ) : (
      <span className="block h-[2px] w-4 rounded-full bg-gs-line" aria-label="no" />
    );
  } else if (typeof value === "string") {
    content = <span className="text-[13.5px] font-semibold text-gs-ink">{value}</span>;
  } else {
    content = (
      <span className="text-[13.5px] font-semibold text-gs-ink">{value[loc] ?? value.de}</span>
    );
  }
  return <td className={`p-4 sm:p-5 ${tint}`}>{content}</td>;
}