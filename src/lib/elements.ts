import type { Locale } from "@/i18n/routing";

export type ElementId =
  | "grundtechnik"
  | "beinarbeit"
  | "ballsicherung"
  | "stellungsspiel"
  | "spielformen";

export type ElementContent = {
  /** Element name */
  title: string;
  /** Bold one-liner shown directly under the title in the matrix card */
  intro: string;
  /** Full description, revealed under "Mehr erfahren…" */
  body: string[];
  /** Training contents, bullet list */
  contents: string[];
};

export type GsElement = {
  id: ElementId;
  /** Display number on the matrix card (01 … 05) */
  number: string;
  /** CSS colour token */
  color: string;
  colorSoft: string;
  /** Inline SVG icon key */
  icon: ElementId;
  /** Original Goalsquare clip in /public/media */
  video: string;
};

export const ELEMENT_META: GsElement[] = [
  {
    id: "grundtechnik",
    number: "01",
    color: "var(--color-el-1)",
    colorSoft: "rgba(47,111,237,.10)",
    icon: "grundtechnik",
    video: "/media/GSV0001.mp4",
  },
  {
    id: "beinarbeit",
    number: "02",
    color: "var(--color-el-2)",
    colorSoft: "rgba(214,0,110,.10)",
    icon: "beinarbeit",
    video: "/media/GSV0044.mp4",
  },
  {
    id: "ballsicherung",
    number: "03",
    color: "var(--color-el-3)",
    colorSoft: "rgba(230,51,41,.10)",
    icon: "ballsicherung",
    video: "/media/GSV0089.mp4",
  },
  {
    id: "stellungsspiel",
    number: "04",
    // Color updated to darker mustard yellow
    color: "#d4a017",
    colorSoft: "rgba(212,160,23,.13)",
    icon: "stellungsspiel",
    video: "/media/GSV0114.mp4",
  },
  {
    id: "spielformen",
    number: "05",
    // Color updated to lighter green
    color: "#7dd181",
    colorSoft: "rgba(125,209,129,.15)",
    icon: "spielformen",
    video: "/media/GSV0128.mp4",
  },
];

/**
 * Texts supplied by the client (Walter Harth) in
 * "5 elemets description text {GERMAN|ENGLISH|FRENCH|DUTCH}".
 * `intro` = the bold line that appears in the matrix card under the title.
 * `body`  = the rest, revealed via "Mehr erfahren…".
 */
export const ELEMENT_TEXT: Record<Locale, Record<ElementId, ElementContent>> = {
  de: {
    grundtechnik: {
      title: "Grundtechnik",
      intro:
        "Das technische Fundament: Grundstellung, Fangen und die saubere Bewegung zum Ball.",
      body: [
        "Die Basis unserer Methode ist die Grundtechnik. Sie besteht aus: Grundstellung, Bewegung zum Ball, Bewegung mit dem Ball, Ballannahme, Fangschule, sowie die Koordination, die in keiner Trainingseinheit fehlen sollte.",
        "Wir legen beim Erlernen der Grundtechnik neben den torwartspezifischen Eigenschaften auch einen besonderen Wert auf die fußballerischen Fähigkeiten des Torwarts.",
      ],
      contents: [
        "Grundstellung",
        "Bewegung zum Ball",
        "Bewegung mit dem Ball",
        "Ballannahme & Fangschule",
        "Koordination",
      ],
    },
    beinarbeit: {
      title: "Beinarbeit",
      intro:
        "Körperkontrolle auf kurzer Distanz: Schnelle Füße, Beweglichkeit, Positionsspiel.",
      body: [
        "Hier geht es vor allem um die Beweglichkeit des Torwarts, d.h. die Fähigkeit, sich im Torraum schnell vor- und zurück, sowie seitwärts zu bewegen.",
        "In diese Kategorie gehören die Techniken der schnellen Füße, den Ball angreifen, Reaktion und Reflex, sowie die Körperspannung.",
      ],
      contents: ["Schnelle Füße", "Ball angreifen", "Reaktion & Reflex", "Körperspannung"],
    },
    ballsicherung: {
      title: "Ballsicherung",
      intro:
        "Ball sichern unter Druck: Fangtechnik, kontrolliertes Fallen und Schussabwehr.",
      body: [
        "Übungen und Spiele, die Bewegungsabläufe zur Ballsicherung lehren.",
        "Die in der Ballsicherung enthaltenen Techniken sind die Fangtechnik (Ball fangen), die Fallschule, sowie die Schussabwehr.",
      ],
      contents: ["Ball fangen", "Fallschule", "Schußabwehr"],
    },
    stellungsspiel: {
      title: "Stellungsspiel",
      intro:
        "Das Spiel und den Raum lesen: Spieleröffnung, Antizipation, frühe Anpassung an Ballverlagerungen.",
      body: [
        "Zu den spielerischen Eigenschaften des Torwarts gehören das Stellungsspiel bei Flanken und Ecken, die Spieleröffnung mit Hand und Fuß, sowie Bewegungsabläufe während des Spiels.",
      ],
      contents: [
        "Stellungsspiel bei Flanken & Ecken",
        "Spieleröffnung mit Hand und Fuß",
        "Bewegungsabläufe im Spiel",
      ],
    },
    spielformen: {
      title: "Spielformen",
      intro:
        "Alles im Wettkampf: Spielnahe Situationen mit Entscheidungen und Abschlussdruck.",
      body: [
        "In den Spielformen wird das Gesamtbild des Torwarts im Zusammenspiel mit der Mannschaft ausgebildet. Das Torwartspiel wird in verschiedenen Spielsituationen verbessert. Durch Fun-Formen und Wettbewerbe wird das Erlernte spielerisch angewendet.",
        "Hier geht es darum, Spiele und Wettkämpfe zwischen den Torhütern (Torwart gegen Torwart) und zwischen dem Torwart und den Feldspielern (Torwart gegen Team) einzubauen. Diese Kategorie enthält aber auch Schlussspiele (Cooling Down), die am Ende einer Trainingseinheit eingebaut werden können.",
      ],
      contents: ["Torwart gegen Torwart", "Torwart gegen Team", "Schlussspiele (Cooling Down)"],
    },
  },
  en: {
    grundtechnik: {
      title: "Basic Technique",
      intro:
        "The technical foundation: basic stance, catching, and a smooth movement toward the ball.",
      body: [
        "This is the base of our method. It contains: the basic position, receiving, movements to and with the ball, catching the ball and of course coordination, which should not be missing in any session.",
        "In addition to the goalkeeper-specific characteristics, we also pay special attention to the soccer skills of the goalkeeper when learning the basic technique.",
      ],
      contents: [
        "Basic position",
        "Movement to the ball",
        "Movement with the ball",
        "Receiving & catching school",
        "Coordination",
      ],
    },
    beinarbeit: {
      title: "Footwork, Mobility, Positioning",
      intro: "Close-range ball control: fast feet, agility, positional play.",
      body: [
        "This is mainly about the mobility of the goalkeeper, the ability to quickly move back and forth, as well as sideways, in the goal area.",
        "In this category belong the techniques of fast feet, the ball attack, reaction and reflex, as well as the body tension.",
      ],
      contents: ["Fast feet", "Attacking the ball", "Reaction & reflex", "Body tension"],
    },
    ballsicherung: {
      title: "Ball Protection",
      intro:
        "Securing the ball under pressure: catching technique, controlled falling and shot stopping.",
      body: [
        "The \"Ball Protection\" consists of exercises and games that teach movements to secure the ball.",
        "The techniques included in the ball protection are the catching technique (ball catching), the falling technique, as well as the shot defense / shot stopping.",
      ],
      contents: ["Catching the ball", "Falling technique", "Shot stopping"],
    },
    stellungsspiel: {
      title: "Positioning, Game Opening",
      intro:
        "Reading the game and the field: game opening, anticipation and early adjustment to ball movement.",
      body: [
        "In this element, the playful characteristics, such as positional play at crosses and corners, the game opening by hand and foot, as well as movements in the game will be encouraged.",
      ],
      contents: [
        "Positioning at crosses & corners",
        "Game opening by hand and foot",
        "Movement patterns in the game",
      ],
    },
    spielformen: {
      title: "Game Play",
      intro:
        "Everything in a competitive setting: game-like situations involving decision-making and pressure to finish.",
      body: [
        "The Game Play improves the goalkeeper to play in interaction with the team and in different game situations. The learned is applied in playful fun shapes and competitions.",
        "The goal is to place games and competitions between goalkeepers (goalkeeper vs. goalkeeper), goalkeeper and field players (goalkeeper vs. team), as well as finals (cooling down) to play at the end of a training session.",
      ],
      contents: ["Goalkeeper vs. goalkeeper", "Goalkeeper vs. team", "Final games (cooling down)"],
    },
  },
  fr: {
    grundtechnik: {
      title: "Technique de Base",
      intro:
        "La base technique : la position de départ, la réception et le déplacement fluide vers le ballon.",
      body: [
        "La base de notre méthode contient : la position de base, le mouvement vers et avec le ballon, réception et contrôle, prise du ballon et surtout la coordination, qui ne doit manquer dans aucune séance.",
        "En plus des caractéristiques spécifiques du gardien, nous accordons une attention particulière aux compétences footballistiques du gardien de but lors de l'apprentissage des techniques de base.",
      ],
      contents: [
        "Position de base",
        "Mouvement vers le ballon",
        "Mouvement avec le ballon",
        "Réception & prise du ballon",
        "Coordination",
      ],
    },
    beinarbeit: {
      title: "Jeu de jambes",
      intro: "Contrôle du ballon à courte distance : rapidité des appuis, agilité, placement.",
      body: [
        "Il s'agit principalement de la mobilité du gardien de but, c'est-à-dire la capacité de se déplacer rapidement vers l'avant et en arrière, ainsi que de côté, dans la zone de but.",
        "Dans cette catégorie appartiennent les techniques des pieds rapides, l'attaque de la balle, la réaction et le réflexe, ainsi que la tension du corps.",
      ],
      contents: ["Pieds rapides", "Attaque du ballon", "Réaction & réflexe", "Tension du corps"],
    },
    ballsicherung: {
      title: "Sécurisation du ballon",
      intro:
        "Récupérer le ballon sous pression : technique de réception, chute contrôlée et arrêt de tir.",
      body: [
        "Exercices et jeux qui enseignent les mouvements afin de sécuriser le ballon.",
        "Les techniques incluses dans la sécurisation du ballon sont la technique de capture (attraper le ballon), tomber correctement, ainsi que la défense de tir.",
      ],
      contents: ["Attraper le ballon", "Technique de chute", "Défense de tir"],
    },
    stellungsspiel: {
      title: "Positionnement, Ouverture de jeu",
      intro:
        "Analyser le jeu et l'espace : ouverture du jeu, anticipation, adaptation rapide aux déplacements du ballon.",
      body: [
        "Dans cette catégorie on améliore les caractéristiques du jeu, comme le jeu de position au moment des ballons venant des flancs ou des coups de coin, l'ouverture de la main et du pied, ainsi que des séquences de mouvements pendant le jeu.",
      ],
      contents: [
        "Placement sur centres & corners",
        "Ouverture de jeu à la main et au pied",
        "Séquences de mouvements en match",
      ],
    },
    spielformen: {
      title: "Formes de jeu",
      intro:
        "Tout comme en compétition : des situations proches du match réel, avec des décisions à prendre et une pression pour conclure.",
      body: [
        "Le jeu du gardien de but est amélioré dans les différentes situations de jeu en interaction avec l'équipe. Nous appliquons ce que le gardien a appris dans des concours sous formes de jeux amusants.",
        "Le but est de placer des jeux et des compétitions entre les gardiens de but (gardien contre gardien), gardien de but et joueurs (gardien contre équipe), ainsi que des jeux finaux (refroidissement) à pouvoir intégrer à la fin d'une séance.",
      ],
      contents: [
        "Gardien contre gardien",
        "Gardien contre équipe",
        "Jeux finaux (retour au calme)",
      ],
    },
  },
  nl: {
    grundtechnik: {
      title: "Basistechniek",
      intro: "De technische basis: uitgangspositie, het opvangen en de soepele beweging naar de bal.",
      body: [
        "De basis van onze methode is de basistechniek. Deze bestaat uit: de basispositie, de beweging naar de bal, de beweging met de bal, de balbeheersing, het vangen, en de coördinatie, die in geen enkele training mag ontbreken.",
        "Bij het aanleren van de basistechniek hechten we, naast de keeperspecifieke eigenschappen, ook bijzonder veel waarde aan de voetbalvaardigheden van de keeper.",
      ],
      contents: [
        "Basispositie",
        "Beweging naar de bal",
        "Beweging met de bal",
        "Balbeheersing & vangen",
        "Coördinatie",
      ],
    },
    beinarbeit: {
      title: "Voetenwerk, Beweeglijkheid, Positiespel",
      intro: "Lichaamsbeheersing op korte afstand: snelle voeten, wendbaarheid, positiespel.",
      body: [
        "Hier gaat het vooral om de wendbaarheid van de doelman, d.w.z. het vermogen om zich in het doelgebied snel heen en weer en zijwaarts te bewegen.",
        "Tot deze categorie behoren de technieken van snelle voeten, het aanpakken van de bal, reactievermogen en reflexen, evenals de lichaamsspanning.",
      ],
      contents: ["Snelle voeten", "Bal aanpakken", "Reactie & reflex", "Lichaamsspanning"],
    },
    ballsicherung: {
      title: "Balbeveiliging",
      intro: "De bal onder druk veiligstellen: vangtechniek, gecontroleerd vallen en schoten afweren.",
      body: [
        "Deze categorie bestaat uit oefeningen en spellen die de bewegingsaflopen voor de zekering van de bal aanleren.",
        "De technieken die bij de balbeveiliging opgenomen worden, zijn de vangsttechniek (bal vangen), het correcte vallen en het schot afweren.",
      ],
      contents: ["Bal vangen", "Valtechniek", "Schot afweren"],
    },
    stellungsspiel: {
      title: "Positiespel, Spelopening",
      intro:
        "Het spel en de ruimte lezen: spelopbouw, anticipatie, vroegtijdige aanpassing aan balverplaatsingen.",
      body: [
        "Deze categorie is gericht op de positionering van de keeper bij flanken en hoekschoppen, alsook de opening van het spel met hand en voet. Daarnaast worden de bewegingsaflopen van het keepersspel getraind.",
      ],
      contents: [
        "Positionering bij flanken & hoekschoppen",
        "Spelopening met hand en voet",
        "Bewegingsaflopen in het spel",
      ],
    },
    spielformen: {
      title: "Spelvormen",
      intro: "Alles in wedstrijdverband: wedstrijdachtige situaties met beslissingen en scoringsdruk.",
      body: [
        "In de spelvormen wordt het totaalbeeld van de keeper in samenspel met het team gevormd. Het keepersspel wordt in verschillende spelsituaties verbeterd. Door middel van leuke spelvormen en wedstrijden wordt het geleerde op een speelse manier toegepast.",
        "Het gaat hier om spelletjes en wedstrijden tussen de keepers onderling (keeper tegen keeper) en tussen de keeper en de veldspelers (keeper tegen team). Deze categorie omvat echter ook afsluitende oefeningen (cooling down) die aan het einde van een training kunnen worden ingepast.",
      ],
      contents: ["Keeper tegen keeper", "Keeper tegen team", "Afsluitende spelen (cooling down)"],
    },
  },
};

/**
 * The original Goalsquare drill cards, one per element and per language
 * (GSD = de, GSE = en, GSF = fr, GSN = nl on the old site).
 */
export function drillImage(locale: Locale, id: ElementId) {
  return `/media/drills/${locale}/${id}.jpg`;
}

export function getElements(locale: Locale) {
  return ELEMENT_META.map((meta) => ({
    ...meta,
    ...ELEMENT_TEXT[locale][meta.id],
    drillImage: drillImage(locale, meta.id),
  }));
}
export type ResolvedElement = ReturnType<typeof getElements>[number];