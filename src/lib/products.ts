import type { Locale } from "@/i18n/routing";

export type ProductCategory =
  | "software"
  | "bundle"
  | "drills"
  | "media"
  | "accessory"
  | "subscription";

export type ProductAccent = "basic" | "pro" | "drills" | "app" | "neutral";

export type ProductBase = {
  slug: string;
  sku: string;
  category: ProductCategory;
  /** Price in EUR. `null` = free */
  price: number | null;
  /** Struck-through reference price (bundles) */
  compareAt?: number;
  accent: ProductAccent;
  digital: boolean;
  /** Requires physical shipping (USB key, DVD) */
  physical: boolean;
  featured?: boolean;
  badge?: "new" | "bestseller" | "free";
  /** Recurring subscription */
  interval?: "month" | "year";
  related: string[];
};

export const PRODUCTS: ProductBase[] = [
  {
    slug: "basic-edition",
    sku: "GS-BASIC",
    category: "software",
    price: 129,
    accent: "basic",
    digital: true,
    physical: true,
    featured: true,
    badge: "bestseller",
    related: ["pro-suite", "drills-pack-1", "bundle-basic-dvd"],
  },
  {
    slug: "pro-suite",
    sku: "GS-PRO",
    category: "software",
    price: 349,
    accent: "pro",
    digital: true,
    physical: true,
    featured: true,
    related: ["upgrade-basic-pro", "drills-pack-2", "bundle-pro-dvd"],
  },
  {
    slug: "upgrade-basic-pro",
    sku: "GS-UPG",
    category: "software",
    price: 219,
    accent: "pro",
    digital: true,
    physical: false,
    related: ["pro-suite", "drills-pack-1"],
  },
  {
    slug: "plan-monthly",
    sku: "GS-PLAN-M",
    category: "subscription",
    price: 9.99,
    accent: "app",
    digital: true,
    physical: false,
    featured: true,
    badge: "new",
    interval: "month",
    related: ["plan-yearly", "pro-suite", "mobile-app"],
  },
  {
    slug: "plan-yearly",
    sku: "GS-PLAN-Y",
    category: "subscription",
    price: 99,
    compareAt: 119.88,
    accent: "app",
    digital: true,
    physical: false,
    badge: "new",
    interval: "year",
    related: ["plan-monthly", "pro-suite", "mobile-app"],
  },
  {
    slug: "drills-pack-1",
    sku: "GS-DP1",
    category: "drills",
    price: 55,
    accent: "drills",
    digital: true,
    physical: false,
    related: ["drills-pack-2", "drills-pack-3", "basic-edition"],
  },
  {
    slug: "drills-pack-2",
    sku: "GS-DP2",
    category: "drills",
    price: 55,
    accent: "drills",
    digital: true,
    physical: false,
    related: ["drills-pack-1", "drills-pack-3", "pro-suite"],
  },
  {
    slug: "drills-pack-3",
    sku: "GS-DP3",
    category: "drills",
    price: 55,
    accent: "drills",
    digital: true,
    physical: false,
    related: ["drills-pack-1", "drills-pack-2", "pro-suite"],
  },
  {
    slug: "bundle-basic-dvd",
    sku: "GS-BND-B",
    category: "bundle",
    price: 135,
    compareAt: 143.95,
    accent: "basic",
    digital: true,
    physical: true,
    related: ["basic-edition", "dvd-goalkeeping-basics", "drills-pack-1"],
  },
  {
    slug: "bundle-pro-dvd",
    sku: "GS-BND-P",
    category: "bundle",
    price: 355,
    compareAt: 363.95,
    accent: "pro",
    digital: true,
    physical: true,
    related: ["pro-suite", "dvd-goalkeeping-basics", "drills-pack-2"],
  },
  {
    slug: "dvd-goalkeeping-basics",
    sku: "GS-DVD",
    category: "media",
    price: 14.95,
    accent: "neutral",
    digital: false,
    physical: true,
    related: ["basic-edition", "bundle-basic-dvd"],
  },
  {
    slug: "usb-key",
    sku: "GS-USB",
    category: "accessory",
    price: 35,
    accent: "neutral",
    digital: false,
    physical: true,
    related: ["basic-edition", "pro-suite"],
  },
  {
    slug: "mobile-app",
    sku: "GS-APP",
    category: "software",
    price: null,
    accent: "app",
    digital: true,
    physical: false,
    badge: "free",
    related: ["basic-edition", "pro-suite", "plan-monthly"],
  },
];

export type ProductText = {
  name: string;
  tagline: string;
  short: string;
  description: string[];
  features: string[];
  specs?: { label: string; value: string }[];
};

type Dict = Record<string, ProductText>;

const de: Dict = {
  "basic-edition": {
    name: "BASIC Edition",
    tagline: "Die bewährte Software in der Basisversion",
    short:
      "Die solide Grundversion für engagierte Torwarttrainer. Einfache Trainingsplanung, direkte Synchronisation mit der kostenlosen Mobil-App.",
    description: [
      "Die BASIC Edition ist der schnellste Weg in die Goalsquare-Methode. Du planst deine Trainingseinheit in wenigen Minuten, greifst auf das Basis-Übungsarchiv mit 260 Übungen zu und nimmst den fertigen Plan als PDF mit auf den Platz.",
      "Markiere Übungen als Favoriten, setze sie auf eine Warteliste und gib die Einheit als PDF aus oder verschicke sie per E-Mail. Die Synchronisation mit der kostenlosen Mobil-App ist inklusive.",
    ],
    features: [
      "Basis-Übungsarchiv mit 260 Übungen",
      "Torwart-Datenbank",
      "Eigene Übungen erstellen",
      "Formular-Center",
      "PDF-Ausgabe und E-Mail-Versand",
      "Synchronisation mit der kostenlosen Mobil-App",
    ],
    specs: [
      { label: "Lizenz", value: "Einzellizenz" },
      { label: "System", value: "Windows 10/11, macOS 12+" },
      { label: "Lieferung", value: "USB-Schlüssel + Download-Link" },
    ],
  },
  "pro-suite": {
    name: "PRO Suite",
    tagline: "Die professionelle Software für höchste Ansprüche",
    short:
      "Die vollausgestattete Profi-Software für Leistungszentren, Akademien und Profiklubs.",
    description: [
      "Die PRO Suite enthält alles aus der BASIC Edition und ergänzt sie um das DRAW Übungs-Zeichenmodul, ein eigenes Übungsarchiv sowie Leistungs- und Trainingsbewertung mit Spielererfassung und Analyse.",
      "Damit dokumentierst du die Entwicklung jedes Torhüters über eine ganze Saison – vom einzelnen Drill bis zur Jahresplanung.",
    ],
    features: [
      "Alles aus der BASIC Edition",
      "DRAW Übungs-Zeichenmodul",
      "Eigenes Übungsarchiv",
      "Leistungs- und Trainingsbewertung",
      "Spielererfassung und Analyse",
      "Viele erweiterte Funktionen",
    ],
    specs: [
      { label: "Lizenz", value: "Vollversion" },
      { label: "System", value: "Windows 10/11, macOS 12+" },
      { label: "Lieferung", value: "USB-Schlüssel + Download-Link" },
    ],
  },
  "upgrade-basic-pro": {
    name: "Upgrade: BASIC → PRO Suite",
    tagline: "Erweitere deine bestehende Lizenz",
    short: "Erweitere die Funktionen deiner BASIC Edition durch das Upgrade auf die PRO Suite.",
    description: [
      "Du arbeitest bereits mit der BASIC Edition? Mit dem Upgrade schaltest du sämtliche PRO-Funktionen frei – ohne deine bestehenden Daten zu verlieren.",
    ],
    features: [
      "Freischaltung aller PRO-Funktionen",
      "Bestehende Daten und Übungen bleiben erhalten",
      "DRAW Übungs-Zeichenmodul",
      "Leistungs- und Trainingsbewertung",
    ],
    specs: [
      { label: "Voraussetzung", value: "Aktive BASIC-Lizenz" },
      { label: "Lieferung", value: "Lizenzschlüssel per E-Mail" },
    ],
  },
  "plan-monthly": {
    name: "Goalsquare PLAN – Monatlich",
    tagline: "Online Session Planner, monatlich kündbar",
    short:
      "Plane Einheiten direkt im Webbrowser oder in der App – ohne Software-Installation.",
    description: [
      "Goalsquare PLAN ist der neue Online Session Planner. Du planst deine Einheiten direkt im Webbrowser, greifst über die neue iOS- und Android-App auf dem Platz darauf zu und exportierst alles als PDF.",
      "Die KI-unterstützte Trainingsplanung schlägt dir passende Übungsreihen anhand von Schwerpunkt, Dauer und Belastung vor.",
    ],
    features: [
      "Sofort im Webbrowser loslegen",
      "Neue App in Apple Store & Google Play",
      "KI-unterstützte Trainingsplanung",
      "PDF-Export",
      "Cloud-Synchronisation für Trainerteams",
      "Monatlich kündbar",
    ],
    specs: [
      { label: "Abrechnung", value: "monatlich" },
      { label: "Verfügbar", value: "ab September" },
    ],
  },
  "plan-yearly": {
    name: "Goalsquare PLAN – Jährlich",
    tagline: "Online Session Planner, ein Jahr im Voraus",
    short: "Ein Jahr Goalsquare PLAN inklusive vollem App-Zugang – günstiger als monatlich.",
    description: [
      "Dasselbe wie das Monatsabo, nur günstiger: Ein Jahr Goalsquare PLAN mit vollem Zugang zum Webportal und zur neuen App.",
    ],
    features: [
      "Alles aus dem Monatsabo",
      "Voller App-Zugang inklusive",
      "Rund 2 Monate günstiger als monatlich",
      "Prioritäts-Support",
    ],
    specs: [
      { label: "Abrechnung", value: "jährlich" },
      { label: "Verfügbar", value: "ab September" },
    ],
  },
  "drills-pack-1": {
    name: "Drill Pack #1",
    tagline: "150+ zusätzliche Übungen pro Drill Pack",
    short: "Erweitere dein Übungsarchiv für dauerhaft abwechslungsreiches Training.",
    description: [
      "Drills Packs sind optionale Übungspakete zur Archiv-Erweiterung. Pack #1 bringt 165 zusätzliche Übungen mit Zeichnungen, Coaching-Punkten und Animationen direkt in deine BASIC- oder PRO-Software.",
    ],
    features: [
      "150+ zusätzliche Übungen pro Pack",
      "Erweitert BASIC- und PRO-Archive",
      "Fertige Übungsreihen mit Coaching-Punkten",
      "Sofortiger Import per Lizenzschlüssel",
    ],
    specs: [
      { label: "Voraussetzung", value: "BASIC oder PRO" },
      { label: "Lieferung", value: "Lizenzschlüssel per E-Mail" },
    ],
  },
  "drills-pack-2": {
    name: "Drill Pack #2",
    tagline: "150+ zusätzliche Übungen pro Drill Pack",
    short: "Erweitere dein Übungsarchiv für dauerhaft abwechslungsreiches Training.",
    description: [
      "Pack #2 legt den Schwerpunkt auf 1-gegen-1, Flanken und Spieleröffnung – 170 neue Übungen inklusive Variationen.",
    ],
    features: [
      "150+ zusätzliche Übungen pro Pack",
      "Schwerpunkte: 1-gegen-1, Flanken, Spieleröffnung",
      "Erweitert BASIC- und PRO-Archive",
      "Sofortiger Import per Lizenzschlüssel",
    ],
    specs: [
      { label: "Voraussetzung", value: "BASIC oder PRO" },
      { label: "Lieferung", value: "Lizenzschlüssel per E-Mail" },
    ],
  },
  "drills-pack-3": {
    name: "Drill Pack #3",
    tagline: "150+ zusätzliche Übungen pro Drill Pack",
    short: "Erweitere dein Übungsarchiv für dauerhaft abwechslungsreiches Training.",
    description: [
      "Pack #3 konzentriert sich auf Reflexe, Fallschule und Spielformen – 160 neue Übungen führender Torwarttrainer.",
    ],
    features: [
      "150+ zusätzliche Übungen pro Pack",
      "Schwerpunkte: Reflexe, Fallschule, Spielformen",
      "Erweitert BASIC- und PRO-Archive",
      "Sofortiger Import per Lizenzschlüssel",
    ],
    specs: [
      { label: "Voraussetzung", value: "BASIC oder PRO" },
      { label: "Lieferung", value: "Lizenzschlüssel per E-Mail" },
    ],
  },
  "bundle-basic-dvd": {
    name: "Bundle: BASIC Edition & DVD",
    tagline: "Software + Lehr-DVD",
    short: "Die BASIC Edition zusammen mit der DVD „Goalkeeping Basics“.",
    description: [
      "Das Einsteigerpaket: die BASIC Edition zur Trainingsplanung plus die Lehr-DVD mit über 70 Torwartübungen für Trainer und Eltern.",
    ],
    features: [
      "BASIC Edition (Einzellizenz)",
      "DVD Goalkeeping Basics",
      "Kostenloser Versand weltweit",
    ],
    specs: [{ label: "Lieferung", value: "USB-Schlüssel + DVD" }],
  },
  "bundle-pro-dvd": {
    name: "Bundle: PRO Suite & DVD",
    tagline: "Profi-Software + Lehr-DVD",
    short: "Die PRO Suite zusammen mit der DVD „Goalkeeping Basics“.",
    description: [
      "Das Profipaket: die vollausgestattete PRO Suite plus die Lehr-DVD mit über 70 Torwartübungen.",
    ],
    features: ["PRO Suite (Vollversion)", "DVD Goalkeeping Basics", "Kostenloser Versand weltweit"],
    specs: [{ label: "Lieferung", value: "USB-Schlüssel + DVD" }],
  },
  "dvd-goalkeeping-basics": {
    name: "DVD Goalkeeping Basics",
    tagline: "Mehr als 70 Torwartübungen",
    short: "Mehr als 70 Torwartübungen für Trainer und Eltern – erklärt und vorgeführt.",
    description: [
      "Die Lehr-DVD zeigt über 70 Grundübungen aus der Goalsquare-Methode: sauber erklärt, live vorgeführt und sofort umsetzbar – ideal auch für Eltern und Vereinstrainer ohne Torwart-Ausbildung.",
    ],
    features: ["70+ Torwartübungen", "Für Trainer und Eltern", "Laufzeit ca. 90 Minuten"],
    specs: [{ label: "Format", value: "DVD, PAL" }],
  },
  "usb-key": {
    name: "USB-Schlüssel (Ersatz)",
    tagline: "Für registrierte Nutzer",
    short: "Ersatz-USB-Schlüssel für bereits registrierte Goalsquare-Nutzer.",
    description: [
      "USB-Schlüssel verloren oder defekt? Registrierte Nutzer erhalten hier einen Ersatzschlüssel für ihre bestehende BASIC- oder PRO-Lizenz.",
    ],
    features: ["Nur für registrierte Lizenzen", "Enthält deine bestehende Lizenz"],
    specs: [{ label: "Voraussetzung", value: "Registrierte Lizenz" }],
  },
  "mobile-app": {
    name: "Goalsquare Mobil-App",
    tagline: "Kostenlose Begleit-App für den Trainingsplatz",
    short:
      "Die offizielle Mobil-App ist in beiden Stores kostenlos verfügbar und verbindet sich direkt mit deiner BASIC- oder PRO-Software.",
    description: [
      "Die App bringt deine geplanten Einheiten und Übungsanimationen direkt auf den Platz – damit du sie beim Training dabeihast.",
    ],
    features: [
      "100% kostenlos in Apple App Store & Google Play",
      "Funktioniert mit BASIC- oder PRO-Softwareversion",
      "Alle geplanten Einheiten und Übungen griffbereit auf dem Rasen",
    ],
    specs: [{ label: "Plattformen", value: "iOS & Android" }],
  },
};

const en: Dict = {
  "basic-edition": {
    name: "BASIC Edition",
    tagline: "The proven software in its base version",
    short:
      "The solid base version for committed goalkeeper coaches. Simple session planning, direct sync with the free mobile app.",
    description: [
      "The BASIC Edition is the fastest way into the Goalsquare method. Plan a session in minutes, use the base archive with 260 drills and take the finished plan onto the pitch as a PDF.",
      "Mark drills as favourites, put them on a waiting list, print the session as PDF or send it by email. Sync with the free mobile app is included.",
    ],
    features: [
      "Base drill archive with 260 drills",
      "Goalkeeper database",
      "Create your own drills",
      "Form centre",
      "PDF output and email delivery",
      "Sync with the free mobile app",
    ],
    specs: [
      { label: "Licence", value: "Single licence" },
      { label: "System", value: "Windows 10/11, macOS 12+" },
      { label: "Delivery", value: "USB key + download link" },
    ],
  },
  "pro-suite": {
    name: "PRO Suite",
    tagline: "Professional software for the highest demands",
    short: "The fully equipped professional software for academies, centres and pro clubs.",
    description: [
      "The PRO Suite contains everything from the BASIC Edition and adds the DRAW drill drawing module, your own drill archive as well as performance and training assessment with player records and analysis.",
      "It lets you document every goalkeeper's development across a full season – from a single drill to the annual plan.",
    ],
    features: [
      "Everything from the BASIC Edition",
      "DRAW drill drawing module",
      "Your own drill archive",
      "Performance and training assessment",
      "Player records and analysis",
      "Many extended functions",
    ],
    specs: [
      { label: "Licence", value: "Full version" },
      { label: "System", value: "Windows 10/11, macOS 12+" },
      { label: "Delivery", value: "USB key + download link" },
    ],
  },
  "upgrade-basic-pro": {
    name: "Upgrade: BASIC → PRO Suite",
    tagline: "Extend your existing licence",
    short: "Extend the functions of your BASIC Edition by upgrading to the PRO Suite.",
    description: [
      "Already working with the BASIC Edition? The upgrade unlocks all PRO functions without losing any of your existing data.",
    ],
    features: [
      "Unlocks all PRO functions",
      "Existing data and drills are kept",
      "DRAW drill drawing module",
      "Performance and training assessment",
    ],
    specs: [
      { label: "Requirement", value: "Active BASIC licence" },
      { label: "Delivery", value: "Licence key by email" },
    ],
  },
  "plan-monthly": {
    name: "Goalsquare PLAN – Monthly",
    tagline: "Online session planner, cancel any month",
    short: "Plan sessions directly in the browser or in the app – no software installation.",
    description: [
      "Goalsquare PLAN is the new online session planner. Plan your sessions in the web browser, access them on the pitch through the new iOS and Android app and export everything as PDF.",
      "AI-assisted planning suggests suitable drill sequences based on focus, duration and load.",
    ],
    features: [
      "Start instantly in the browser",
      "New app on Apple Store & Google Play",
      "AI-assisted session planning",
      "PDF export",
      "Cloud sync for coaching teams",
      "Cancel monthly",
    ],
    specs: [
      { label: "Billing", value: "monthly" },
      { label: "Available", value: "from September" },
    ],
  },
  "plan-yearly": {
    name: "Goalsquare PLAN – Yearly",
    tagline: "Online session planner, one year up front",
    short: "One year of Goalsquare PLAN including full app access – cheaper than monthly.",
    description: [
      "The same as the monthly plan, only cheaper: a full year of Goalsquare PLAN with complete access to the web portal and the new app.",
    ],
    features: [
      "Everything from the monthly plan",
      "Full app access included",
      "Around 2 months cheaper than monthly",
      "Priority support",
    ],
    specs: [
      { label: "Billing", value: "yearly" },
      { label: "Available", value: "from September" },
    ],
  },
  "drills-pack-1": {
    name: "Drill Pack #1",
    tagline: "150+ additional drills per Drill Pack",
    short: "Expand your drill library for consistently varied training.",
    description: [
      "Drills Packs are optional drill packages that extend your archive. Pack #1 adds 165 drills with diagrams, coaching points and animations straight into your BASIC or PRO software.",
    ],
    features: [
      "150+ additional drills per pack",
      "Extends BASIC and PRO archives",
      "Ready-made drill sequences with coaching points",
      "Instant import via licence key",
    ],
    specs: [
      { label: "Requirement", value: "BASIC or PRO" },
      { label: "Delivery", value: "Licence key by email" },
    ],
  },
  "drills-pack-2": {
    name: "Drill Pack #2",
    tagline: "150+ additional drills per Drill Pack",
    short: "Expand your drill library for consistently varied training.",
    description: [
      "Pack #2 focuses on 1-v-1, crosses and game opening – 170 new drills including variations.",
    ],
    features: [
      "150+ additional drills per pack",
      "Focus: 1-v-1, crosses, game opening",
      "Extends BASIC and PRO archives",
      "Instant import via licence key",
    ],
    specs: [
      { label: "Requirement", value: "BASIC or PRO" },
      { label: "Delivery", value: "Licence key by email" },
    ],
  },
  "drills-pack-3": {
    name: "Drill Pack #3",
    tagline: "150+ additional drills per Drill Pack",
    short: "Expand your drill library for consistently varied training.",
    description: [
      "Pack #3 concentrates on reflexes, falling technique and game forms – 160 new drills from leading goalkeeper coaches.",
    ],
    features: [
      "150+ additional drills per pack",
      "Focus: reflexes, falling technique, game forms",
      "Extends BASIC and PRO archives",
      "Instant import via licence key",
    ],
    specs: [
      { label: "Requirement", value: "BASIC or PRO" },
      { label: "Delivery", value: "Licence key by email" },
    ],
  },
  "bundle-basic-dvd": {
    name: "Bundle: BASIC Edition & DVD",
    tagline: "Software + instructional DVD",
    short: "The BASIC Edition together with the \"Goalkeeping Basics\" DVD.",
    description: [
      "The starter package: the BASIC Edition for session planning plus the instructional DVD with 70+ goalkeeper drills for coaches and parents.",
    ],
    features: ["BASIC Edition (single licence)", "Goalkeeping Basics DVD", "Free worldwide shipping"],
    specs: [{ label: "Delivery", value: "USB key + DVD" }],
  },
  "bundle-pro-dvd": {
    name: "Bundle: PRO Suite & DVD",
    tagline: "Professional software + instructional DVD",
    short: "The PRO Suite together with the \"Goalkeeping Basics\" DVD.",
    description: [
      "The professional package: the fully equipped PRO Suite plus the instructional DVD with 70+ goalkeeper drills.",
    ],
    features: ["PRO Suite (full version)", "Goalkeeping Basics DVD", "Free worldwide shipping"],
    specs: [{ label: "Delivery", value: "USB key + DVD" }],
  },
  "dvd-goalkeeping-basics": {
    name: "DVD Goalkeeping Basics",
    tagline: "More than 70 goalkeeper drills",
    short: "More than 70 goalkeeper drills for coaches and parents – explained and demonstrated.",
    description: [
      "The instructional DVD shows 70+ base drills from the Goalsquare method: clearly explained, demonstrated live and ready to use – ideal for parents and club coaches without goalkeeper training.",
    ],
    features: ["70+ goalkeeper drills", "For coaches and parents", "Running time approx. 90 minutes"],
    specs: [{ label: "Format", value: "DVD, PAL" }],
  },
  "usb-key": {
    name: "USB key (replacement)",
    tagline: "For registered users",
    short: "Replacement USB key for already registered Goalsquare users.",
    description: [
      "Lost or broken USB key? Registered users can order a replacement key for their existing BASIC or PRO licence here.",
    ],
    features: ["For registered licences only", "Contains your existing licence"],
    specs: [{ label: "Requirement", value: "Registered licence" }],
  },
  "mobile-app": {
    name: "Goalsquare mobile app",
    tagline: "Free companion app for the training ground",
    short:
      "The official mobile app is free in both stores and connects directly with your BASIC or PRO software.",
    description: [
      "The app brings your planned sessions and drill animations straight onto the pitch, so you have them with you during training.",
    ],
    features: [
      "100% free on the Apple App Store & Google Play",
      "Works with the BASIC or PRO software version",
      "All planned sessions and drills at hand on the grass",
    ],
    specs: [{ label: "Platforms", value: "iOS & Android" }],
  },
};

const fr: Dict = {
  "basic-edition": {
    name: "BASIC Edition",
    tagline: "Le logiciel éprouvé en version de base",
    short:
      "La version de base solide pour les entraîneurs engagés. Planification simple, synchronisation directe avec l'application mobile gratuite.",
    description: [
      "La BASIC Edition est le moyen le plus rapide d'entrer dans la méthode Goalsquare. Planifie une séance en quelques minutes, accède aux 260 exercices de l'archive de base et emporte le plan terminé sur le terrain au format PDF.",
      "Marque les exercices en favoris, place-les en liste d'attente, imprime la séance en PDF ou envoie-la par e-mail. La synchronisation avec l'application mobile gratuite est incluse.",
    ],
    features: [
      "Archive de base avec 260 exercices",
      "Base de données gardiens",
      "Créer ses propres exercices",
      "Centre de formulaires",
      "Export PDF et envoi par e-mail",
      "Synchronisation avec l'app mobile gratuite",
    ],
    specs: [
      { label: "Licence", value: "Licence individuelle" },
      { label: "Système", value: "Windows 10/11, macOS 12+" },
      { label: "Livraison", value: "Clé USB + lien de téléchargement" },
    ],
  },
  "pro-suite": {
    name: "PRO Suite",
    tagline: "Le logiciel professionnel pour les exigences les plus élevées",
    short: "Le logiciel professionnel complet pour centres de formation, académies et clubs pros.",
    description: [
      "La PRO Suite reprend tout de la BASIC Edition et y ajoute le module de dessin DRAW, une archive d'exercices personnelle ainsi que l'évaluation des performances avec suivi et analyse des joueurs.",
      "Tu documentes ainsi la progression de chaque gardien sur toute une saison – de l'exercice isolé à la planification annuelle.",
    ],
    features: [
      "Tout de la BASIC Edition",
      "Module de dessin DRAW",
      "Archive d'exercices personnelle",
      "Évaluation de la performance et de l'entraînement",
      "Suivi et analyse des joueurs",
      "De nombreuses fonctions avancées",
    ],
    specs: [
      { label: "Licence", value: "Version complète" },
      { label: "Système", value: "Windows 10/11, macOS 12+" },
      { label: "Livraison", value: "Clé USB + lien de téléchargement" },
    ],
  },
  "upgrade-basic-pro": {
    name: "Mise à niveau : BASIC → PRO Suite",
    tagline: "Étends ta licence existante",
    short: "Étends les fonctions de ta BASIC Edition en passant à la PRO Suite.",
    description: [
      "Tu utilises déjà la BASIC Edition ? La mise à niveau débloque toutes les fonctions PRO sans perdre tes données existantes.",
    ],
    features: [
      "Déblocage de toutes les fonctions PRO",
      "Données et exercices existants conservés",
      "Module de dessin DRAW",
      "Évaluation de la performance et de l'entraînement",
    ],
    specs: [
      { label: "Prérequis", value: "Licence BASIC active" },
      { label: "Livraison", value: "Clé de licence par e-mail" },
    ],
  },
  "plan-monthly": {
    name: "Goalsquare PLAN – Mensuel",
    tagline: "Planificateur en ligne, résiliable chaque mois",
    short: "Planifie tes séances directement dans le navigateur ou l'app – sans installation.",
    description: [
      "Goalsquare PLAN est le nouveau planificateur de séances en ligne. Planifie dans le navigateur, consulte sur le terrain via la nouvelle app iOS et Android et exporte le tout en PDF.",
      "La planification assistée par IA te propose des séries d'exercices adaptées selon la priorité, la durée et la charge.",
    ],
    features: [
      "Démarrer immédiatement dans le navigateur",
      "Nouvelle app sur Apple Store & Google Play",
      "Planification assistée par IA",
      "Export PDF",
      "Synchronisation cloud pour le staff",
      "Résiliable chaque mois",
    ],
    specs: [
      { label: "Facturation", value: "mensuelle" },
      { label: "Disponible", value: "à partir de septembre" },
    ],
  },
  "plan-yearly": {
    name: "Goalsquare PLAN – Annuel",
    tagline: "Planificateur en ligne, un an d'avance",
    short: "Un an de Goalsquare PLAN, accès complet à l'app inclus – moins cher qu'au mois.",
    description: [
      "Identique à la formule mensuelle, mais moins cher : un an de Goalsquare PLAN avec accès complet au portail web et à la nouvelle application.",
    ],
    features: [
      "Tout de la formule mensuelle",
      "Accès complet à l'app inclus",
      "Environ 2 mois moins cher qu'au mois",
      "Support prioritaire",
    ],
    specs: [
      { label: "Facturation", value: "annuelle" },
      { label: "Disponible", value: "à partir de septembre" },
    ],
  },
  "drills-pack-1": {
    name: "Drill Pack #1",
    tagline: "150+ exercices supplémentaires par Drill Pack",
    short: "Élargis ta bibliothèque d'exercices pour un entraînement toujours varié.",
    description: [
      "Les Drills Packs sont des modules optionnels d'extension de l'archive. Le Pack #1 ajoute 165 exercices avec schémas, points de coaching et animations directement dans ton logiciel BASIC ou PRO.",
    ],
    features: [
      "150+ exercices supplémentaires par pack",
      "Étend les archives BASIC et PRO",
      "Séries d'exercices prêtes à l'emploi",
      "Import immédiat par clé de licence",
    ],
    specs: [
      { label: "Prérequis", value: "BASIC ou PRO" },
      { label: "Livraison", value: "Clé de licence par e-mail" },
    ],
  },
  "drills-pack-2": {
    name: "Drill Pack #2",
    tagline: "150+ exercices supplémentaires par Drill Pack",
    short: "Élargis ta bibliothèque d'exercices pour un entraînement toujours varié.",
    description: [
      "Le Pack #2 met l'accent sur le 1 contre 1, les centres et l'ouverture de jeu – 170 nouveaux exercices avec variantes.",
    ],
    features: [
      "150+ exercices supplémentaires par pack",
      "Priorités : 1 contre 1, centres, ouverture de jeu",
      "Étend les archives BASIC et PRO",
      "Import immédiat par clé de licence",
    ],
    specs: [
      { label: "Prérequis", value: "BASIC ou PRO" },
      { label: "Livraison", value: "Clé de licence par e-mail" },
    ],
  },
  "drills-pack-3": {
    name: "Drill Pack #3",
    tagline: "150+ exercices supplémentaires par Drill Pack",
    short: "Élargis ta bibliothèque d'exercices pour un entraînement toujours varié.",
    description: [
      "Le Pack #3 se concentre sur les réflexes, la technique de chute et les formes de jeu – 160 nouveaux exercices d'entraîneurs de gardiens reconnus.",
    ],
    features: [
      "150+ exercices supplémentaires par pack",
      "Priorités : réflexes, chute, formes de jeu",
      "Étend les archives BASIC et PRO",
      "Import immédiat par clé de licence",
    ],
    specs: [
      { label: "Prérequis", value: "BASIC ou PRO" },
      { label: "Livraison", value: "Clé de licence par e-mail" },
    ],
  },
  "bundle-basic-dvd": {
    name: "Pack : BASIC Edition & DVD",
    tagline: "Logiciel + DVD pédagogique",
    short: "La BASIC Edition accompagnée du DVD « Goalkeeping Basics ».",
    description: [
      "Le pack de démarrage : la BASIC Edition pour la planification plus le DVD pédagogique avec plus de 70 exercices pour entraîneurs et parents.",
    ],
    features: [
      "BASIC Edition (licence individuelle)",
      "DVD Goalkeeping Basics",
      "Livraison gratuite dans le monde entier",
    ],
    specs: [{ label: "Livraison", value: "Clé USB + DVD" }],
  },
  "bundle-pro-dvd": {
    name: "Pack : PRO Suite & DVD",
    tagline: "Logiciel pro + DVD pédagogique",
    short: "La PRO Suite accompagnée du DVD « Goalkeeping Basics ».",
    description: [
      "Le pack professionnel : la PRO Suite complète plus le DVD pédagogique avec plus de 70 exercices.",
    ],
    features: [
      "PRO Suite (version complète)",
      "DVD Goalkeeping Basics",
      "Livraison gratuite dans le monde entier",
    ],
    specs: [{ label: "Livraison", value: "Clé USB + DVD" }],
  },
  "dvd-goalkeeping-basics": {
    name: "DVD Goalkeeping Basics",
    tagline: "Plus de 70 exercices pour gardiens",
    short: "Plus de 70 exercices pour entraîneurs et parents – expliqués et démontrés.",
    description: [
      "Le DVD pédagogique présente plus de 70 exercices de base de la méthode Goalsquare : clairement expliqués, démontrés en direct et immédiatement applicables – idéal aussi pour les parents et entraîneurs de club.",
    ],
    features: [
      "Plus de 70 exercices",
      "Pour entraîneurs et parents",
      "Durée d'environ 90 minutes",
    ],
    specs: [{ label: "Format", value: "DVD, PAL" }],
  },
  "usb-key": {
    name: "Clé USB (remplacement)",
    tagline: "Pour utilisateurs enregistrés",
    short: "Clé USB de remplacement pour les utilisateurs Goalsquare déjà enregistrés.",
    description: [
      "Clé USB perdue ou défectueuse ? Les utilisateurs enregistrés peuvent commander ici une clé de remplacement pour leur licence BASIC ou PRO existante.",
    ],
    features: ["Uniquement pour licences enregistrées", "Contient ta licence existante"],
    specs: [{ label: "Prérequis", value: "Licence enregistrée" }],
  },
  "mobile-app": {
    name: "Application mobile Goalsquare",
    tagline: "Application compagnon gratuite pour le terrain",
    short:
      "L'application officielle est gratuite dans les deux stores et se connecte directement à ton logiciel BASIC ou PRO.",
    description: [
      "L'application amène tes séances planifiées et les animations d'exercices directement sur le terrain, pour les avoir sous la main pendant l'entraînement.",
    ],
    features: [
      "100 % gratuite sur l'Apple App Store & Google Play",
      "Fonctionne avec la version BASIC ou PRO",
      "Toutes les séances et exercices à portée de main sur le terrain",
    ],
    specs: [{ label: "Plateformes", value: "iOS & Android" }],
  },
};

const nl: Dict = {
  "basic-edition": {
    name: "BASIC Edition",
    tagline: "De beproefde software in de basisversie",
    short:
      "De solide basisversie voor betrokken keeperstrainers. Eenvoudige trainingsplanning, directe synchronisatie met de gratis mobiele app.",
    description: [
      "De BASIC Edition is de snelste weg naar de Goalsquare-methode. Plan je training in enkele minuten, gebruik het basisarchief met 260 oefeningen en neem het afgeronde plan als pdf mee het veld op.",
      "Markeer oefeningen als favoriet, zet ze op een wachtlijst, print de training als pdf of stuur hem per e-mail. Synchronisatie met de gratis mobiele app is inbegrepen.",
    ],
    features: [
      "Basisarchief met 260 oefeningen",
      "Keepersdatabase",
      "Eigen oefeningen aanmaken",
      "Formuliercentrum",
      "PDF-uitvoer en verzending per e-mail",
      "Synchronisatie met de gratis mobiele app",
    ],
    specs: [
      { label: "Licentie", value: "Enkele licentie" },
      { label: "Systeem", value: "Windows 10/11, macOS 12+" },
      { label: "Levering", value: "USB-sleutel + downloadlink" },
    ],
  },
  "pro-suite": {
    name: "PRO Suite",
    tagline: "De professionele software voor de hoogste eisen",
    short: "De volledig uitgeruste profsoftware voor opleidingscentra, academies en profclubs.",
    description: [
      "De PRO Suite bevat alles uit de BASIC Edition en vult die aan met de DRAW-tekenmodule, een eigen oefeningenarchief en prestatie- en trainingsbeoordeling met spelersregistratie en analyse.",
      "Zo documenteer je de ontwikkeling van elke keeper over een heel seizoen – van losse oefening tot jaarplanning.",
    ],
    features: [
      "Alles uit de BASIC Edition",
      "DRAW-tekenmodule voor oefeningen",
      "Eigen oefeningenarchief",
      "Prestatie- en trainingsbeoordeling",
      "Spelersregistratie en analyse",
      "Veel uitgebreide functies",
    ],
    specs: [
      { label: "Licentie", value: "Volledige versie" },
      { label: "Systeem", value: "Windows 10/11, macOS 12+" },
      { label: "Levering", value: "USB-sleutel + downloadlink" },
    ],
  },
  "upgrade-basic-pro": {
    name: "Upgrade: BASIC → PRO Suite",
    tagline: "Breid je bestaande licentie uit",
    short: "Breid de functies van je BASIC Edition uit met de upgrade naar de PRO Suite.",
    description: [
      "Werk je al met de BASIC Edition? De upgrade ontgrendelt alle PRO-functies zonder dat je bestaande gegevens verloren gaan.",
    ],
    features: [
      "Ontgrendelt alle PRO-functies",
      "Bestaande gegevens en oefeningen blijven behouden",
      "DRAW-tekenmodule",
      "Prestatie- en trainingsbeoordeling",
    ],
    specs: [
      { label: "Vereiste", value: "Actieve BASIC-licentie" },
      { label: "Levering", value: "Licentiesleutel per e-mail" },
    ],
  },
  "plan-monthly": {
    name: "Goalsquare PLAN – Maandelijks",
    tagline: "Online session planner, maandelijks opzegbaar",
    short: "Plan trainingen direct in de browser of in de app – zonder installatie.",
    description: [
      "Goalsquare PLAN is de nieuwe online session planner. Plan in de webbrowser, raadpleeg op het veld via de nieuwe iOS- en Android-app en exporteer alles als pdf.",
      "De AI-ondersteunde planning stelt passende oefenreeksen voor op basis van accent, duur en belasting.",
    ],
    features: [
      "Direct starten in de webbrowser",
      "Nieuwe app in Apple Store & Google Play",
      "AI-ondersteunde trainingsplanning",
      "PDF-export",
      "Cloudsynchronisatie voor trainersstaf",
      "Maandelijks opzegbaar",
    ],
    specs: [
      { label: "Facturering", value: "maandelijks" },
      { label: "Beschikbaar", value: "vanaf september" },
    ],
  },
  "plan-yearly": {
    name: "Goalsquare PLAN – Jaarlijks",
    tagline: "Online session planner, een jaar vooruit",
    short: "Een jaar Goalsquare PLAN inclusief volledige app-toegang – voordeliger dan maandelijks.",
    description: [
      "Hetzelfde als het maandabonnement, maar voordeliger: een jaar Goalsquare PLAN met volledige toegang tot het webportaal en de nieuwe app.",
    ],
    features: [
      "Alles uit het maandabonnement",
      "Volledige app-toegang inbegrepen",
      "Ongeveer 2 maanden voordeliger",
      "Prioriteitsondersteuning",
    ],
    specs: [
      { label: "Facturering", value: "jaarlijks" },
      { label: "Beschikbaar", value: "vanaf september" },
    ],
  },
  "drills-pack-1": {
    name: "Drill Pack #1",
    tagline: "150+ extra oefeningen per Drill Pack",
    short: "Breid je oefeningenbibliotheek uit voor blijvend gevarieerde trainingen.",
    description: [
      "Drills Packs zijn optionele oefeningpakketten om je archief uit te breiden. Pack #1 voegt 165 oefeningen met tekeningen, coachingpunten en animaties direct toe aan je BASIC- of PRO-software.",
    ],
    features: [
      "150+ extra oefeningen per pack",
      "Breidt BASIC- en PRO-archieven uit",
      "Kant-en-klare oefenreeksen met coachingpunten",
      "Directe import via licentiesleutel",
    ],
    specs: [
      { label: "Vereiste", value: "BASIC of PRO" },
      { label: "Levering", value: "Licentiesleutel per e-mail" },
    ],
  },
  "drills-pack-2": {
    name: "Drill Pack #2",
    tagline: "150+ extra oefeningen per Drill Pack",
    short: "Breid je oefeningenbibliotheek uit voor blijvend gevarieerde trainingen.",
    description: [
      "Pack #2 legt de nadruk op 1-tegen-1, voorzetten en spelopbouw – 170 nieuwe oefeningen inclusief variaties.",
    ],
    features: [
      "150+ extra oefeningen per pack",
      "Accenten: 1-tegen-1, voorzetten, spelopbouw",
      "Breidt BASIC- en PRO-archieven uit",
      "Directe import via licentiesleutel",
    ],
    specs: [
      { label: "Vereiste", value: "BASIC of PRO" },
      { label: "Levering", value: "Licentiesleutel per e-mail" },
    ],
  },
  "drills-pack-3": {
    name: "Drill Pack #3",
    tagline: "150+ extra oefeningen per Drill Pack",
    short: "Breid je oefeningenbibliotheek uit voor blijvend gevarieerde trainingen.",
    description: [
      "Pack #3 richt zich op reflexen, valtechniek en spelvormen – 160 nieuwe oefeningen van toonaangevende keeperstrainers.",
    ],
    features: [
      "150+ extra oefeningen per pack",
      "Accenten: reflexen, valtechniek, spelvormen",
      "Breidt BASIC- en PRO-archieven uit",
      "Directe import via licentiesleutel",
    ],
    specs: [
      { label: "Vereiste", value: "BASIC of PRO" },
      { label: "Levering", value: "Licentiesleutel per e-mail" },
    ],
  },
  "bundle-basic-dvd": {
    name: "Bundel: BASIC Edition & dvd",
    tagline: "Software + instructie-dvd",
    short: "De BASIC Edition samen met de dvd „Goalkeeping Basics”.",
    description: [
      "Het startpakket: de BASIC Edition voor de trainingsplanning plus de instructie-dvd met meer dan 70 keepersoefeningen voor trainers en ouders.",
    ],
    features: [
      "BASIC Edition (enkele licentie)",
      "Dvd Goalkeeping Basics",
      "Gratis verzending wereldwijd",
    ],
    specs: [{ label: "Levering", value: "USB-sleutel + dvd" }],
  },
  "bundle-pro-dvd": {
    name: "Bundel: PRO Suite & dvd",
    tagline: "Profsoftware + instructie-dvd",
    short: "De PRO Suite samen met de dvd „Goalkeeping Basics”.",
    description: [
      "Het profpakket: de volledig uitgeruste PRO Suite plus de instructie-dvd met meer dan 70 keepersoefeningen.",
    ],
    features: ["PRO Suite (volledige versie)", "Dvd Goalkeeping Basics", "Gratis verzending wereldwijd"],
    specs: [{ label: "Levering", value: "USB-sleutel + dvd" }],
  },
  "dvd-goalkeeping-basics": {
    name: "Dvd Goalkeeping Basics",
    tagline: "Meer dan 70 keepersoefeningen",
    short: "Meer dan 70 keepersoefeningen voor trainers en ouders – uitgelegd en voorgedaan.",
    description: [
      "De instructie-dvd toont meer dan 70 basisoefeningen uit de Goalsquare-methode: helder uitgelegd, live voorgedaan en direct toepasbaar – ook ideaal voor ouders en clubtrainers zonder keepersopleiding.",
    ],
    features: ["70+ keepersoefeningen", "Voor trainers en ouders", "Speelduur ca. 90 minuten"],
    specs: [{ label: "Formaat", value: "Dvd, PAL" }],
  },
  "usb-key": {
    name: "USB-sleutel (vervanging)",
    tagline: "Voor geregistreerde gebruikers",
    short: "Vervangende USB-sleutel voor reeds geregistreerde Goalsquare-gebruikers.",
    description: [
      "USB-sleutel kwijt of defect? Geregistreerde gebruikers bestellen hier een vervangende sleutel voor hun bestaande BASIC- of PRO-licentie.",
    ],
    features: ["Alleen voor geregistreerde licenties", "Bevat je bestaande licentie"],
    specs: [{ label: "Vereiste", value: "Geregistreerde licentie" }],
  },
  "mobile-app": {
    name: "Goalsquare mobiele app",
    tagline: "Gratis begeleidende app voor het trainingsveld",
    short:
      "De officiële mobiele app is gratis in beide stores en verbindt direct met je BASIC- of PRO-software.",
    description: [
      "De app brengt je geplande trainingen en oefenanimaties direct naar het veld, zodat je ze tijdens de training bij de hand hebt.",
    ],
    features: [
      "100% gratis in de Apple App Store & Google Play",
      "Werkt met de BASIC- of PRO-softwareversie",
      "Alle geplande trainingen en oefeningen binnen handbereik",
    ],
    specs: [{ label: "Platforms", value: "iOS & Android" }],
  },
};

export const PRODUCT_TEXT: Record<Locale, Dict> = { de, en, fr, nl };

export type ResolvedProduct = ProductBase & ProductText;

export function getProducts(locale: Locale): ResolvedProduct[] {
  return PRODUCTS.map((p) => ({ ...p, ...PRODUCT_TEXT[locale][p.slug] }));
}

export function getProduct(locale: Locale, slug: string): ResolvedProduct | undefined {
  const base = PRODUCTS.find((p) => p.slug === slug);
  if (!base) return undefined;
  return { ...base, ...PRODUCT_TEXT[locale][slug] };
}

export function findProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

const LOCALE_TAGS: Record<Locale, string> = {
  de: "de-DE",
  en: "en-GB",
  fr: "fr-FR",
  nl: "nl-NL",
};

export function formatPrice(value: number, locale: Locale) {
  return new Intl.NumberFormat(LOCALE_TAGS[locale], {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}