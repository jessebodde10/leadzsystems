// Centrale inhoud en siteconfiguratie — gedeeld tussen homepage en landingspagina's.

export const SITE = {
  name: "Leadz Systems",
  // Productiedomein — pas dit aan als de definitieve domeinnaam anders is.
  url: "https://leadzystems.nl",
  email: "info@leadzystems.nl",
  phone: "06 24 50 58 63",
  phoneIntl: "+31624505863",
  whatsapp: "31624505863",
  region: "Nederland",
};

export const NAV_LINKS = [
  { label: "Diensten", href: "/#diensten" },
  { label: "Werkwijze", href: "/#werkwijze" },
  { label: "Cases", href: "/#cases" },
  { label: "Over ons", href: "/#over-ons" },
  { label: "Contact", href: "/#contact" },
];

export type Dienst = {
  slug: string;
  icon: string;
  title: string;
  stat: string;
  // Korte omschrijving voor de homepage-kaart
  description: string;
  items: string[];
  // Uitgebreide inhoud voor de landingspagina
  metaTitle: string;
  metaDescription: string;
  heroLead: string;
  herkenbaar: string[];
  oplossing: { title: string; desc: string }[];
  koppelingen: string[];
};

export const DIENSTEN: Dienst[] = [
  {
    slug: "planning",
    icon: "📋",
    title: "Slimme planning",
    stat: "Tot 80% minder planningsstress",
    description:
      "Een monteur die zonder materiaal op de bouw staat, of twee ploegen die per ongeluk naar dezelfde klus rijden. AI houdt je planning realistisch en seint op tijd als het knelt.",
    items: [
      "Monteurs en busjes automatisch inplannen",
      "Reistijd en voorbereiding meegerekend",
      "Uitloop en weersvertraging vroeg gesignaleerd",
      "Koppeling met Bouw7, SimPlan of je eigen agenda",
    ],
    metaTitle: "AI-planning voor installatie- en bouwbedrijven | Leadz Systems",
    metaDescription:
      "Plan monteurs, busjes en projecten zonder gepuzzel. Onze AI-planningstool houdt rekening met reistijd, materiaal en uitloop, en koppelt aan Bouw7 en SimPlan.",
    heroLead:
      "Stop met puzzelen in Excel en op het whiteboard. Onze planningstool weet wie waar moet zijn, welk materiaal mee moet en wat er gebeurt als een klus uitloopt.",
    herkenbaar: [
      "Een monteur staat op locatie, maar het materiaal ligt nog in het magazijn.",
      "Een spoedklus komt binnen en je hele week schuift om.",
      "Je weet pas op vrijdag dat een project volgende week niet gaat passen.",
    ],
    oplossing: [
      { title: "Realistische dagplanning", desc: "Reistijd, voorbereiding en oplevertijd worden automatisch meegerekend, niet alleen de klussen zelf." },
      { title: "Knelpunten vooraf", desc: "De tool waarschuwt zodra een project niet meer past, zodat je kunt schuiven voordat de klant belt." },
      { title: "Werkt op de bouw", desc: "Monteurs zien hun planning en adres op hun telefoon, met materiaallijst en notities erbij." },
    ],
    koppelingen: ["Bouw7", "SimPlan", "Google/Outlook agenda", "AFAS"],
  },
  {
    slug: "offertes-administratie",
    icon: "📄",
    title: "Offertes & administratie",
    stat: "Offerte in minuten, niet 's avonds op de bank",
    description:
      "Offertes uittypen na werktijd, werkbonnen die kwijtraken, facturen die blijven liggen. Wij automatiseren de papierwinkel zodat jij niet meer 's avonds achter de laptop zit.",
    items: [
      "Offerte uit een spraaknotitie of foto van de situatie",
      "Werkbonnen die monteurs op de telefoon invullen",
      "Automatisch factureren en meer-/minderwerk bijhouden",
      "Koppeling met Exact, Snelstart of AFAS",
    ],
    metaTitle: "Offertes & administratie automatiseren voor de bouw | Leadz Systems",
    metaDescription:
      "Maak offertes in minuten, verwerk werkbonnen digitaal en factureer automatisch. Onze AI-tools koppelen aan Exact, Snelstart en AFAS. Geen avondwerk meer.",
    heroLead:
      "De offerte uittypen, de werkbon overtypen, de factuur maken: dat zijn drie keer dezelfde gegevens. Wij laten dat één keer gebeuren, automatisch.",
    herkenbaar: [
      "Je typt 's avonds nog offertes uit terwijl je liever klaar was.",
      "Een werkbon raakt zoek en het meerwerk wordt nooit gefactureerd.",
      "Facturen gaan pas weken later de deur uit omdat de administratie achterloopt.",
    ],
    oplossing: [
      { title: "Offerte uit ruwe input", desc: "Spreek de situatie in of maak een foto in de meterkast; de tool maakt er een nette offerte van met je eigen prijzen." },
      { title: "Digitale werkbon", desc: "Monteurs vullen op locatie uren, materiaal en meerwerk in. Niets raakt meer kwijt." },
      { title: "Factuur volgt vanzelf", desc: "Opgeleverde bonnen worden automatisch facturen, inclusief meer- en minderwerk." },
    ],
    koppelingen: ["Exact", "Snelstart", "AFAS", "Moneybird", "Twinfield"],
  },
  {
    slug: "inkoop-materiaal",
    icon: "🏗️",
    title: "Inkoop & materiaal",
    stat: "Gemiddeld 15% lagere inkoopkosten",
    description:
      "Te veel besteld en het ligt in het magazijn weg te roesten, of net te weinig waardoor de klus stilligt. AI houdt je materiaalverbruik bij en bestelt op tijd bij de juiste groothandel.",
    items: [
      "Materiaalverbruik per project bijgehouden",
      "Bestellijst automatisch uit de werkbon",
      "Prijzen vergelijken tussen groothandels",
      "Koppeling met Technische Unie, Rexel of Wildkamp",
    ],
    metaTitle: "Inkoop & materiaalbeheer automatiseren | Leadz Systems",
    metaDescription:
      "Houd materiaalverbruik per project bij, genereer bestellijsten automatisch en vergelijk prijzen tussen groothandels zoals Technische Unie en Rexel.",
    heroLead:
      "Misgrijpen kost een halve dag, te veel bestellen kost geld. De tool weet wat er per project verbruikt wordt en bestelt op tijd tegen de beste prijs.",
    herkenbaar: [
      "Een klus ligt stil omdat één onderdeel niet op voorraad is.",
      "Het magazijn ligt vol restmateriaal van projecten van vorig jaar.",
      "Je bestelt overal los, zonder zicht op wat het bij elkaar kost.",
    ],
    oplossing: [
      { title: "Verbruik per project", desc: "Wat er op de werkbon staat, wordt automatisch afgeboekt van je voorraad en gekoppeld aan het project." },
      { title: "Bestellen op het juiste moment", desc: "De tool seint wanneer iets bijna op is en zet de bestellijst klaar." },
      { title: "Beste prijs", desc: "Prijzen van je vaste groothandels worden vergeleken zodat je niet te veel betaalt." },
    ],
    koppelingen: ["Technische Unie", "Rexel", "Wildkamp", "Ketenstandaard"],
  },
];

export const STAPPEN = [
  { nr: "01", title: "Kennismaking", desc: "We bespreken jouw situatie, waar tijd verloren gaat en wat het meest oplevert om te automatiseren." },
  { nr: "02", title: "Analyse", desc: "We lopen mee met je werkbonnen, offertes en planning en bepalen welke tool het meeste verschil maakt." },
  { nr: "03", title: "Bouwen", desc: "We bouwen de oplossing op maat. Je wordt op de hoogte gehouden en kunt tussentijds feedback geven." },
  { nr: "04", title: "Oplevering", desc: "De tool wordt live gezet en we lopen er samen doorheen, ook met je monteurs op de bouw." },
  { nr: "05", title: "Doorontwikkeling", desc: "We blijven beschikbaar voor vragen, aanpassingen en uitbreidingen. Je staat er niet alleen voor." },
];

export const FAQS = [
  { q: "Wat kost zoiets?", a: "Dat hangt af van wat je nodig hebt. Een eenvoudige automatisering, bijvoorbeeld een digitale werkbon, start rond de €1.500. Complexere tools of meerdere koppelingen kosten meer. We kijken altijd eerst wat het oplevert voordat we een prijs noemen." },
  { q: "Hoe lang duurt het voordat ik iets heb?", a: "De meeste tools zijn binnen 2 tot 6 weken live. We werken in korte cycli zodat je snel resultaat ziet, niet na maanden." },
  { q: "Moeten mijn monteurs technisch zijn?", a: "Nee. Op de bouw vullen ze alleen een simpel formulier in op hun telefoon: uren, materiaal en een foto. De rest gebeurt op de achtergrond." },
  { q: "Wat als het niet werkt zoals verwacht?", a: "Dan lossen we het op. We leveren pas op als jij tevreden bent, en daarna blijven we beschikbaar voor aanpassingen." },
  { q: "Werkt dit ook met mijn bestaande software?", a: "In de meeste gevallen wel. We koppelen aan veelgebruikte pakketten zoals Exact, AFAS, Snelstart, Bouw7 en aan groothandels als Technische Unie en Rexel." },
];

export const PORTFOLIO_ITEMS = [
  {
    tag: "Planning",
    title: "Projectplanner voor installatiebedrijf",
    description: "Plant monteurs en busjes op basis van beschikbaarheid, reistijd en materiaal. Seint automatisch als een spoedklus de week in de war schopt.",
    stack: ["Python", "Claude API", "Bouw7-koppeling"],
  },
  {
    tag: "Offertes",
    title: "Offertegenerator uit spraaknotitie",
    description: "De ondernemer spreekt de situatie in vanuit de meterkast; de tool maakt er binnen minuten een nette offerte van met de eigen prijslijst en arbeidstarieven.",
    stack: ["Next.js", "OpenAI", "Exact-koppeling"],
  },
  {
    tag: "Administratie",
    title: "Digitale werkbonverwerker",
    description: "Monteurs vullen uren, materiaal en meerwerk in op hun telefoon. De rest, factuur en nacalculatie, regelt het systeem zelf.",
    stack: ["Node.js", "Claude API", "AFAS-koppeling"],
  },
];

export const WAAROM = [
  {
    nr: "01",
    icon: "🧩",
    title: "Op maat, niet van de plank",
    desc: "Geen standaardpakket waar je je werkwijze omheen moet buigen. Wij bouwen rond hoe jouw bedrijf draait: jouw werkbon, jouw prijslijst, jouw groothandel.",
    tag: "100% op maat",
  },
  {
    nr: "02",
    icon: "⚡",
    title: "Snel live, niet over maanden",
    desc: "De eerste werkende tool draait vaak binnen een paar weken. Geen lange trajecten, maar snel iets waar je monteurs morgen mee verder kunnen.",
    tag: "Weken, niet maanden",
  },
  {
    nr: "03",
    icon: "🤝",
    title: "Taal van de bouw",
    desc: "We praten over werkbonnen, meerwerk en opleverdossiers, niet over algoritmes. Persoonlijk contact van eerste gesprek tot oplevering.",
    tag: "Jouw taal, onze tech",
  },
];
