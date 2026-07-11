// Centrale inhoud en siteconfiguratie — gedeeld tussen homepage en landingspagina's.

export const SITE = {
  name: "Leadz Systems",
  // Productiedomein — pas dit aan als de definitieve domeinnaam anders is.
  url: "https://leadzsystems.nl",
  email: "info@leadzsystems.nl",
  phone: "06 24 50 58 63",
  phoneIntl: "+31624505863",
  whatsapp: "31624505863",
  cal: "https://cal.com/leadz-systems-2yvqzu",
  region: "Nederland",
  kvk: "73898074",
};

export const NAV_LINKS = [
  { label: "Diensten", href: "/#diensten" },
  { label: "Werkwijze", href: "/#werkwijze" },
  { label: "Portfolio", href: "/#portfolio" },
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
    slug: "ai-agents",
    icon: "🤖",
    title: "AI Agents",
    stat: "24/7 aan het werk, zonder dat jij er naar omkijkt",
    description:
      "Een AI agent is software die zelfstandig taken uitvoert: e-mails verwerken, leads opvolgen, data doorzetten tussen systemen. Geen vermoeidheid, geen fouten, geen pauzes. Wij bouwen agents die precies passen bij hoe jouw bedrijf werkt.",
    items: [
      "Agents die e-mails, aanvragen en leads automatisch verwerken",
      "Koppelingen met je bestaande systemen zoals CRM en boekhouding",
      "24/7 actief, ook buiten kantooruren",
      "Schaalbaar: meer volume zonder extra mensen",
    ],
    metaTitle: "AI Agents laten bouwen voor het MKB | Leadz Systems",
    metaDescription:
      "Laat AI agents het repetitieve werk overnemen: e-mailverwerking, leadopvolging, administratie en systeemkoppelingen. Maatwerk gebouwd rond jouw processen.",
    heroLead:
      "Terwijl jij je richt op de groei van je bedrijf, werkt een AI agent op de achtergrond. E-mails verwerken, leads opvolgen, data doorzetten: taken die nu uren kosten, gedaan in seconden.",
    herkenbaar: [
      "Medewerkers besteden uren aan taken die steeds hetzelfde zijn.",
      "Leads of aanvragen blijven liggen omdat niemand er snel genoeg bij kan.",
      "Systemen praten niet met elkaar en data wordt handmatig overgenomen.",
    ],
    oplossing: [
      { title: "Agents die zelfstandig werken", desc: "Van inkomende e-mail tot leadopvolging: de agent herkent wat er moet gebeuren en handelt, zonder dat jij er iets voor hoeft te doen." },
      { title: "Gekoppeld aan jouw systemen", desc: "De agent werkt samen met je CRM, boekhouding, inbox en andere tools. Geen dubbel werk, geen data die blijft liggen." },
      { title: "Dag en nacht actief", desc: "Geen kantooruren, geen pauzes. Een AI agent werkt 24/7 en schaalt mee als het drukker wordt, zonder dat je extra mensen nodig hebt." },
    ],
    koppelingen: ["HubSpot", "Pipedrive", "Exact", "AFAS", "Google Workspace", "Slack", "WhatsApp Business", "Outlook"],
  },
  {
    slug: "ai-automatisering",
    icon: "⚡",
    title: "AI-automatisering & workflows",
    stat: "Uren repetitief werk per week eruit",
    description:
      "Offertes, e-mails, facturen, rapportages: werk dat steeds hetzelfde is, kost elke week uren. Wij automatiseren die processen met AI, zodat ze zichzelf draaien.",
    items: [
      "Documenten en offertes automatisch opstellen",
      "Inkomende e-mail en aanvragen verwerken",
      "Data overnemen tussen systemen zonder overtypen",
      "AI-assistenten en chatbots op je eigen informatie",
    ],
    metaTitle: "AI-automatisering & workflows voor het MKB | Leadz Systems",
    metaDescription:
      "Automatiseer terugkerend werk met AI: offertes, e-mailverwerking, administratie en rapportages. Maatwerk dat aansluit op je bestaande systemen.",
    heroLead:
      "Werk dat steeds hetzelfde is, hoort niet handmatig te gebeuren. Wij bouwen AI-automatiseringen die offertes opstellen, aanvragen verwerken en data doorzetten, zonder dat jij eraan denkt.",
    herkenbaar: [
      "Je typt elke week dezelfde soort documenten en e-mails uit.",
      "Gegevens worden met de hand van het ene systeem naar het andere overgenomen.",
      "Aanvragen of leads blijven liggen omdat niemand er direct bij kan.",
    ],
    oplossing: [
      { title: "Documenten uit ruwe input", desc: "Van een aanvraag, spraaknotitie of formulier naar een net document, automatisch opgesteld in jouw huisstijl." },
      { title: "Processen die doorlopen", desc: "Inkomend werk wordt herkend, verwerkt en doorgezet naar de juiste plek, 24/7, zonder handwerk." },
      { title: "AI op jouw kennis", desc: "Assistenten en chatbots die antwoorden op basis van jouw documenten, prijzen en werkwijze." },
    ],
    koppelingen: ["OpenAI", "Claude", "Make", "Zapier", "Google Workspace", "Microsoft 365"],
  },
  {
    slug: "websites-webapps",
    icon: "🖥️",
    title: "Websites & web-apps",
    stat: "Van idee naar live in weken",
    description:
      "Een snelle, moderne website of een webapplicatie op maat. Geen sjabloon waar je je bedrijf omheen buigt, maar iets dat past bij hoe jij werkt en groeit.",
    items: [
      "Snelle, moderne websites die scoren in Google",
      "Webapplicaties en klantportalen op maat",
      "Slimme formulieren en boekings- of aanvraagflows",
      "Beheer zelf je content, zonder technische kennis",
    ],
    metaTitle: "Websites & web-apps op maat | Leadz Systems",
    metaDescription:
      "Moderne websites en webapplicaties op maat: snel, vindbaar in Google en gebouwd rond jouw werkwijze. Inclusief portalen, formulieren en koppelingen.",
    heroLead:
      "Een website die alleen een visitekaartje is, levert weinig op. Wij bouwen snelle sites en webapps die werk uit handen nemen: aanvragen, boekingen, portalen en alles wat erachter draait.",
    herkenbaar: [
      "Je huidige site is traag, gedateerd of levert geen aanvragen op.",
      "Je werkt met losse tools en Excel waar een eigen app handiger zou zijn.",
      "Aanpassen van je site kan alleen via een dure bureau-ticket.",
    ],
    oplossing: [
      { title: "Snel en vindbaar", desc: "Gebouwd op moderne techniek: razendsnel, mobielvriendelijk en geoptimaliseerd voor Google." },
      { title: "Meer dan een brochure", desc: "Formulieren, aanvraagflows, klantportalen en automatisering achter de schermen." },
      { title: "Zelf in beheer", desc: "Pas teksten en afbeeldingen zelf aan, zonder dat je daar een ontwikkelaar voor nodig hebt." },
    ],
    koppelingen: ["Next.js", "Vercel", "Supabase", "Stripe", "Google Analytics"],
  },
  {
    slug: "integraties-dashboards",
    icon: "🔗",
    title: "Integraties & dashboards",
    stat: "Eén overzicht, alle systemen verbonden",
    description:
      "Je gegevens zitten verspreid over boekhouding, CRM, mail en spreadsheets. Wij koppelen die systemen en bouwen één dashboard waar je in een oogopslag ziet hoe het ervoor staat.",
    items: [
      "Koppelingen tussen je bestaande software",
      "Eén dashboard met je belangrijkste cijfers",
      "Automatische rapportages per mail of Slack",
      "Realtime inzicht in omzet, leads en projecten",
    ],
    metaTitle: "Integraties & dashboards voor het MKB | Leadz Systems",
    metaDescription:
      "Koppel je systemen en breng je data samen in één helder dashboard. Automatische rapportages en realtime inzicht in omzet, leads en projecten.",
    heroLead:
      "Cijfers uit vijf verschillende systemen bij elkaar puzzelen kost tijd en gaat mis. Wij koppelen je software en bouwen één dashboard dat altijd actueel is.",
    herkenbaar: [
      "Je exporteert maandelijks data en plakt het in een spreadsheet.",
      "Verschillende systemen tonen verschillende cijfers.",
      "Je mist realtime zicht op hoe je bedrijf er nu voorstaat.",
    ],
    oplossing: [
      { title: "Systemen die praten", desc: "Boekhouding, CRM, webshop en mail gekoppeld, zodat gegevens vanzelf op de juiste plek staan." },
      { title: "Eén bron van waarheid", desc: "Een dashboard dat alle cijfers samenbrengt en altijd actueel is, op desktop en mobiel." },
      { title: "Rapportage zonder werk", desc: "Automatische overzichten op het moment dat jij ze wilt, per mail of in Slack." },
    ],
    koppelingen: ["Moneybird", "Exact", "HubSpot", "Slack", "Google Sheets", "Power BI"],
  },
];

export const STAPPEN = [
  { nr: "01", title: "Kennismaking", desc: "We bespreken jouw situatie, waar tijd verloren gaat en wat het meest oplevert om aan te pakken." },
  { nr: "02", title: "Analyse", desc: "We brengen je processen en systemen in kaart en bepalen welke oplossing het meeste verschil maakt." },
  { nr: "03", title: "Bouwen", desc: "We bouwen de oplossing op maat. Je wordt op de hoogte gehouden en kunt tussentijds feedback geven." },
  { nr: "04", title: "Oplevering", desc: "De oplossing wordt live gezet en we lopen er samen doorheen, met jou en je team." },
  { nr: "05", title: "Doorontwikkeling", desc: "We blijven beschikbaar voor vragen, aanpassingen en uitbreidingen. Je staat er niet alleen voor." },
];

export const FAQS = [
  { q: "Wat doet Leadz Systems precies?", a: "We bouwen software op maat voor het MKB: van AI-automatiseringen die repetitief werk overnemen, tot websites, web-apps en koppelingen tussen systemen. Geen standaardpakketten, maar oplossingen gebouwd rond hoe jij werkt." },
  { q: "Voor welke bedrijven is dit geschikt?", a: "Vooral voor MKB-bedrijven met 2 tot 50 medewerkers die merken dat processen te veel handwerk kosten of systemen niet goed op elkaar aansluiten. Branche maakt niet uit: als er werk te automatiseren valt, kunnen wij helpen." },
  { q: "Hoe snel zie ik resultaat?", a: "De meeste projecten zijn binnen 2 tot 6 weken live. We beginnen altijd met de oplossing die het meeste oplevert, zodat je snel iets werkends hebt en niet pas na maanden." },
  { q: "Wat maakt jullie anders dan andere bureaus?", a: "We zijn klein, werken direct en denken mee. Geen accountmanager ertussen, geen offerte van twintig pagina's. Je werkt direct met degene die ook bouwt, en we leveren pas op als jij tevreden bent." },
  { q: "Hoe begin ik?", a: "Met een vrijblijvend gesprek van 30 minuten. We kijken samen waar de meeste tijd of omzet blijft liggen en of we daar iets zinnigs aan kunnen doen. Geen verplichtingen, gewoon eerlijk advies." },
  { q: "Werken jullie per project of doorlopend?", a: "Beide. Je kunt kiezen voor een eenmalig project (één oplossing, vaste prijs) of een doorlopend partnerschap waarbij we blijven doorontwikkelen en je altijd iemand hebt die meekijkt." },
];

export type PortfolioItem = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
  url: string;
  domain: string;
  uitdaging: string;
  watWeDeden: string[];
  resultaat: string;
  screenshot?: string;
};

// PORTFOLIO — echte, live projecten. De previews tonen de site zelf via een iframe.
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "happy-face",
    tag: "Website",
    title: "Happy Face - schoonheidssalon",
    description: "Complete website voor een schoonheidssalon in Rijswijk: behandelingen, merken en contact, met een warme en persoonlijke uitstraling.",
    stack: ["Next.js", "Responsive", "SEO"],
    url: "https://website-happy-test.vercel.app/",
    domain: "happy-face.nl",
    uitdaging: "Happy Face had geen online aanwezigheid die recht deed aan de sfeer en kwaliteit van de salon. De oude site was gedateerd en genereerde nauwelijks aanvragen. Het doel: een website die de warmte van de salon uitstraalt en bezoekers omzet naar klanten.",
    watWeDeden: [
      "Complete nieuwe website ontworpen en gebouwd in Next.js",
      "Overzichtspagina met alle behandelingen en bijbehorende merken",
      "Contactpagina met afspraakmogelijkheid",
      "Geoptimaliseerd voor Google met correcte structuur en laadsnelheid",
      "Volledig mobielvriendelijk en snel op alle apparaten",
    ],
    resultaat: "Een warme, professionele website die de uitstraling van de salon weerspiegelt en bezoekers een duidelijke weg geeft naar het maken van een afspraak.",
  },
  {
    slug: "connect-rise",
    tag: "Website",
    title: "Connect & Rise - ademcoach",
    description: "Website voor een ademcoach met workshops en circles rond ouder & kind, gericht op rust, ruimte en verbinding.",
    stack: ["Next.js", "Responsive", "SEO"],
    url: "https://connectrise-test.vercel.app/",
    domain: "connectrise.nl",
    uitdaging: "Connect & Rise bood workshops en ademcoaching aan, maar had geen website die het aanbod helder maakte. Potentiële deelnemers vonden moeilijk wat ze zochten en haakten af. De wens: een rustige, persoonlijke site die vertrouwen wekt.",
    watWeDeden: [
      "Nieuwe website gebouwd met focus op rust en persoonlijk contact",
      "Overzichtspagina met workshops, circles en individuele sessies",
      "Verhaal van de coach duidelijk en toegankelijk neergezet",
      "Contactformulier voor aanmeldingen en vragen",
      "Mobielvriendelijk en snel geladen",
    ],
    resultaat: "Een website die de eigenheid van het merk uitstraalt en bezoekers op een rustige manier begeleidt naar aanmelding of contact.",
  },
  {
    slug: "ags",
    tag: "Web-app",
    title: "AGS - maatwerk tool",
    description: "Een maatwerk webapplicatie die een specifiek werkproces digitaliseert en versnelt, gebouwd rond de wensen van de klant.",
    stack: ["Next.js", "Supabase", "Maatwerk"],
    url: "https://ags-tool.vercel.app/",
    domain: "ags-tool.app",
    uitdaging: "AGS verwerkte een terugkerend werkproces handmatig via losse bestanden en e-mails. Dat kostte veel tijd, was foutgevoelig en gaf geen overzicht. De vraag: kan dit slimmer, sneller en betrouwbaarder?",
    watWeDeden: [
      "Werkproces in kaart gebracht en vertaald naar een digitale tool",
      "Webapplicatie op maat gebouwd met eigen login en gebruikersbeheer",
      "Gestructureerd overzicht van alle lopende en afgeronde taken",
      "Automatische verwerking van stappen die eerder handmatig gingen",
      "Snel te gebruiken op desktop, ook onderweg op mobiel",
    ],
    resultaat: "Een tool die het werkproces volledig digitaliseert: minder handwerk, minder fouten en altijd inzicht in de status van lopende zaken.",
  },
  {
    slug: "freezo",
    tag: "Web-app",
    title: "Freezo - freelance dashboard",
    description: "Een centraal dashboard voor zelfstandige professionals om hun werk te organiseren en beheren. Alles op één plek, overzichtelijk en snel.",
    stack: ["Next.js", "Supabase", "Dashboard"],
    url: "https://www.freezo.nl",
    domain: "freezo.nl",
    uitdaging: "Freelancers werken met losse tools voor facturatie, planning en overzicht. Dat leidt tot verspreide informatie en verlies van tijd. Freezo wilde één centrale plek waar alles samenkomt.",
    watWeDeden: [
      "Dashboard gebouwd met realtime overzicht van inkomsten en opdrachten",
      "Registratie en login met eigen account per gebruiker",
      "Overzicht van actieve en afgeronde projecten",
      "Inzicht in omzet en openstaande facturen",
      "Schaalbare techniek zodat het platform kan meegroeien",
    ],
    resultaat: "Een helder dashboard dat freelancers in één oogopslag laat zien hoe hun bedrijf ervoor staat, zonder losse spreadsheets of aparte tools.",
  },
];

export const WAAROM = [
  {
    nr: "01",
    icon: "🧩",
    title: "Op maat, niet van de plank",
    desc: "Geen standaardpakket waar je je werkwijze omheen moet buigen. Wij bouwen rond hoe jouw bedrijf draait: jouw processen, jouw systemen, jouw klanten.",
    tag: "100% op maat",
  },
  {
    nr: "02",
    icon: "⚡",
    title: "Snel live, niet over maanden",
    desc: "De eerste werkende versie draait vaak binnen een paar weken. Geen lange trajecten, maar snel iets waar je morgen mee verder kunt.",
    tag: "Weken, niet maanden",
  },
  {
    nr: "03",
    icon: "🤝",
    title: "Heldere taal, geen jargon",
    desc: "We praten over wat het je oplevert, niet over algoritmes en frameworks. Persoonlijk contact van eerste gesprek tot oplevering.",
    tag: "Mensentaal, slimme tech",
  },
];
