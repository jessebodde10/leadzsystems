// Centrale inhoud en siteconfiguratie — gedeeld tussen homepage en landingspagina's.

export const SITE = {
  name: "Leadz Systems",
  // Productiedomein — pas dit aan als de definitieve domeinnaam anders is.
  url: "https://leadzsystems.nl",
  email: "info@leadzsystems.nl",
  phone: "06 24 50 58 63",
  phoneIntl: "+31624505863",
  whatsapp: "31624505863",
  cal: "https://cal.com/leadz-systems/30min",
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
  // Concrete voorbeelden van wat we binnen deze dienst bouwen.
  voorbeelden: { title: string; desc: string }[];
};

export const DIENSTEN: Dienst[] = [
  {
    slug: "ai-agents",
    icon: "🤖",
    title: "AI Agents",
    stat: "24/7 aan het werk, zonder dat jij er naar omkijkt",
    description:
      "Een AI agent is software die zelfstandig taken uitvoert: e-mails verwerken, leads opvolgen, data doorzetten tussen systemen. Het werkt door als jij naar huis gaat, en maakt niet de slordige foutjes die er om vijf uur insluipen. Wij bouwen agents die precies passen bij hoe jouw bedrijf werkt.",
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
    voorbeelden: [
      { title: "Inbox-agent", desc: "Leest je inkomende e-mail, herkent wat het is (aanvraag, vraag, factuur) en zet het door naar de juiste plek. Simpele vragen beantwoordt de agent zelf, in jouw toon." },
      { title: "Leadopvolg-agent", desc: "Volgt elke nieuwe lead binnen enkele minuten op met een persoonlijk bericht, stelt een moment voor en legt alles vast in je CRM. Geen lead blijft meer liggen." },
      { title: "Offerte-agent", desc: "Zet een aanvraag, spraaknotitie of formulier om in een complete offerte in jouw huisstijl, met de juiste prijzen erbij. Jij checkt en verstuurt." },
      { title: "Administratie-agent", desc: "Haalt facturen en bonnen uit je inbox, leest ze uit, controleert ze en boekt ze in je boekhouding. Scheelt elke maand een stapel handwerk." },
      { title: "Rapportage-agent", desc: "Verzamelt maandagochtend je cijfers uit alle systemen en zet een korte briefing klaar in Slack of je mail. Je begint de week met overzicht." },
      { title: "Planning-agent", desc: "Kijkt naar beschikbaarheid, prioriteit en looptijd, en stelt zelf een realistische planning voor. Signaleert knelpunten voordat ze problemen worden." },
    ],
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
    voorbeelden: [
      { title: "Offertes uit ruwe input", desc: "Van een formulier, mailtje of ingesproken notitie naar een nette offerte in jouw huisstijl. Wat nu een half uur kost, is straks een minuut controleren." },
      { title: "Documenten automatisch uitlezen", desc: "Werkbonnen, facturen en contracten worden gelezen, de juiste gegevens eruit gehaald en direct in het juiste systeem gezet." },
      { title: "Inkomende aanvragen verwerken", desc: "Elke aanvraag wordt herkend, gelabeld, doorgezet naar de juiste persoon en bevestigd naar de klant. Ook 's avonds en in het weekend." },
      { title: "Chatbot op je eigen kennis", desc: "Een assistent die antwoord geeft op basis van jouw documenten, prijzen en werkwijze. Voor je team intern, of voor klanten op je site." },
      { title: "Data tussen systemen doorzetten", desc: "Geen overtypen meer. Gegevens stromen automatisch van het ene systeem naar het andere, met controle op fouten." },
      { title: "Terugkerende rapportages", desc: "Wekelijkse of maandelijkse overzichten die zichzelf samenstellen en op het afgesproken moment in je mail liggen." },
    ],
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
    voorbeelden: [
      { title: "Bedrijfswebsite die aanvragen oplevert", desc: "Snel, mobielvriendelijk en vindbaar in Google. Gebouwd rond wat jij verkoopt, met een duidelijke route naar contact." },
      { title: "Klantportaal", desc: "Je klanten loggen in en zien hun status, documenten, facturen of voortgang. Scheelt jou een hoop mailtjes en telefoontjes." },
      { title: "Aanvraag- of boekingsflow", desc: "Slimme formulieren die meedenken en direct in je agenda, CRM of mailbox landen. Inclusief automatische bevestiging." },
      { title: "Interne tool op maat", desc: "Vervangt die losse Excel-bestanden en mailtjes door één applicatie waar je team écht mee werkt." },
      { title: "Webapp met eigen accounts", desc: "Gebruikersbeheer, rollen en rechten, zodat iedereen precies ziet wat hij mag zien." },
      { title: "Zelf je content beheren", desc: "Teksten en afbeeldingen aanpassen zonder ontwikkelaar. Jij houdt de site actueel, wij zorgen dat het werkt." },
    ],
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
    voorbeelden: [
      { title: "CRM gekoppeld aan boekhouding", desc: "Een deal die je wint wordt automatisch een factuur. Klantgegevens staan overal gelijk, zonder dat iemand ze overtypt." },
      { title: "Eén dashboard met je cijfers", desc: "Omzet, leads, openstaande facturen en lopende projecten in één overzicht dat altijd actueel is. Op desktop en mobiel." },
      { title: "Automatische rapportage", desc: "Elke maandag je belangrijkste cijfers in Slack of je mail. Geen exports meer, geen spreadsheets meer bij elkaar puzzelen." },
      { title: "Webshop en voorraad synchroon", desc: "Bestellingen, voorraad en boekhouding praten met elkaar. Je grijpt nooit meer mis en verkoopt niets dat op is." },
      { title: "Signalen bij afwijkingen", desc: "Een melding zodra een cijfer afwijkt van wat je verwacht. Je hoort het als er iets is, in plaats van het later te ontdekken." },
      { title: "Urenregistratie en nacalculatie", desc: "Gewerkte uren stromen door naar je project en je factuur, zodat je per klus ziet wat het echt heeft opgeleverd." },
    ],
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
  { q: "We hebben geen technische kennis in huis. Is dat een probleem?", a: "Nee, dat is juist ons uitgangspunt. Wij ontwerpen, bouwen en beheren alles. Jouw team hoeft alleen te weten hoe ze de resultaten gebruiken, en dat leren we ze in een korte training." },
  { q: "Hoe snel zien we resultaat?", a: "De eerste werkende automatisering staat meestal binnen 4 tot 6 weken live. We beginnen bewust met het proces dat de meeste tijd kost, zodat je de besparing direct merkt." },
  { q: "Is onze bedrijfsdata veilig?", a: "Ja. We werken uitsluitend met professionele AI-platforms met Europese dataverwerking waar mogelijk, sluiten verwerkersovereenkomsten af en zorgen dat jouw data nooit wordt gebruikt om publieke modellen te trainen." },
  { q: "Vervangt AI onze medewerkers?", a: "Nee, het vervangt hun vervelendste taken. Klanten zetten de vrijgekomen uren in voor werk dat wél groei oplevert: klantcontact, advies en verkoop. Groeien zonder extra personeel, dat is het doel." },
  { q: "Wat gebeurt er na de oplevering?", a: "We blijven betrokken. Via monitoring en periodieke optimalisatie zorgen we dat je systemen blijven presteren en meegroeien met je bedrijf, en met de razendsnelle ontwikkeling van AI." },
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
    screenshot: "/cases/happy-face.webp",
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
    screenshot: "/cases/connect-rise.webp",
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
    slug: "groeituin",
    tag: "Website",
    title: "De Groeituin - kinderopvang",
    description: "Website voor een kinderopvang met dagverblijf, peuteropvang en BSO: een warme uitstraling, heldere informatie per leeftijd en in een paar klikken een rondleiding plannen.",
    stack: ["Next.js", "Responsive", "SEO"],
    url: "https://groeituin.vercel.app/",
    domain: "groeituin.vercel.app",
    screenshot: "/cases/groeituin.webp",
    uitdaging: "Ouders kiezen een opvang op gevoel, maar willen ook gewoon weten hoe het zit met leeftijden, locaties en tarieven. Dat vraagt om een site die de sfeer van de opvang overbrengt én die praktische vragen meteen beantwoordt, zonder dat iemand hoeft te bellen.",
    watWeDeden: [
      "Complete website ontworpen en gebouwd in Next.js",
      "Opvangvormen uitgesplitst per leeftijd: kinderdagverblijf, peuteropvang met VVE en buitenschoolse opvang",
      "Locaties, tarieven en werkwijze overzichtelijk neergezet",
      "Rondleiding plannen als duidelijke actie op elke pagina",
      "Volledig mobielvriendelijk en geoptimaliseerd voor Google",
    ],
    resultaat: "Een warme, professionele site die laat voelen hoe het er bij de opvang aan toegaat en ouders een duidelijke route geeft naar een rondleiding.",
  },
  {
    slug: "freezo",
    tag: "Web-app",
    title: "Freezo - freelance dashboard",
    description: "Een centraal dashboard voor zelfstandige professionals om hun werk te organiseren en beheren. Alles op één plek, overzichtelijk en snel.",
    stack: ["Next.js", "Supabase", "Dashboard"],
    url: "https://www.freezo.nl",
    domain: "freezo.nl",
    screenshot: "/cases/freezo.webp",
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
