// AI-nieuws artikelen. Eén object per artikel.
//
// Zo voeg je een artikel toe:
//  1. Zet een object in de ARTIKELEN-array hieronder (zie het sjabloon eronder).
//  2. Vul de velden in: unieke `slug` (in de URL, kleine letters + koppeltekens),
//     `title`, `date` (JJJJ-MM-DD), `category`, `excerpt` (korte samenvatting) en
//     `body` (elke regel in de array is één alinea).
//  3. Nieuwste artikel bovenaan zetten (de pagina sorteert ook automatisch op datum).
//
// Zolang de array leeg is, toont /nieuws een nette "Binnenkort meer"-melding.

export type Artikel = {
  slug: string;
  title: string;
  date: string; // ISO: JJJJ-MM-DD
  category: string;
  excerpt: string;
  cover?: string; // optioneel: pad naar afbeelding in /public
  body: string[]; // elke string is één alinea
};

export const ARTIKELEN: Artikel[] = [
  // Voeg hier je artikelen toe. Sjabloon:
  //
  // {
  //   slug: "mijn-eerste-artikel",
  //   title: "Titel van het artikel",
  //   date: "2026-07-10",
  //   category: "AI-nieuws",
  //   excerpt: "Korte samenvatting die op de overzichtspagina en in de zoekresultaten verschijnt.",
  //   body: [
  //     "Eerste alinea van het artikel.",
  //     "Tweede alinea. Elke regel in deze lijst is één alinea.",
  //   ],
  // },
];
