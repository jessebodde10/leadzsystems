// AI-nieuws artikelen. Eén object per artikel.
//
// Zo voeg je een artikel toe:
//  1. Zet een object in de ARTIKELEN-array hieronder.
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
  {
    slug: "gpt-5-6-nu-voor-iedereen",
    title: "GPT-5.6 nu voor iedereen: OpenAI zet de deuren open",
    date: "2026-07-10",
    category: "AI-nieuws",
    excerpt:
      "OpenAI brengt zijn nieuwste model breed uit in drie varianten: Sol, Terra en Luna. Eerste indrukken, en hoe het zich verhoudt tot Claude Fable 5.",
    body: [
      "OpenAI's nieuwste model komt vanaf vandaag voor iedereen beschikbaar. Na weken waarin GPT-5.6 alleen voor een handvol partners toegankelijk was, zet OpenAI de deuren open, met drie smaken: Sol als het krachtigste vlaggenschip, Terra voor dagelijks werk, en Luna als de snelle, goedkope optie.",
      "Vroege testers zijn onder de indruk, al is de teneur dat Sol net iets minder slim aanvoelt dan Claude Fable 5, maar op sommige taken juist uitblinkt en vooral veel biedt voor zijn prijs.",
      "Hoogleraar en auteur van het boek Co-Intelligence, Ethan Mollick, vatte het verschil aardig: “Fable gaat het liefst zelfstandig aan de slag, terwijl Sol sneller is maar meer stap voor stap met je meewerkt.”",
      "Wij voelen het model de komende week zelf uitgebreid aan de tand, dus verwacht binnenkort een grondiger oordeel.",
    ],
  },
  {
    slug: "claude-cowork-telefoon-browser",
    title: "Claude werkt door met je laptop dicht: Cowork komt naar telefoon en browser",
    date: "2026-07-09",
    category: "AI-nieuws",
    excerpt:
      "Anthropic brengt Cowork naar mobiel en browser. Geef Claude een klus, loop naar je meeting en pak het afgeronde werk later op je telefoon op.",
    body: [
      "Claude kan voortaan doorwerken terwijl je je laptop dichtklapt. Anthropic (de maker van Claude) brengt zijn digitale assistent Cowork naar je telefoon en de browser. Je kunt nu een klus aan Claude geven achter je bureau, naar een vergadering lopen, en het afgeronde werk later op je mobiel oppakken.",
      "Geplande taken draaien zelfs door met je computer uit: laat Claude 's nachts je e-mails en gespreksverslagen doorspitten en een briefing klaarzetten. Moet er een knoop worden doorgehakt die alleen jij kunt doorhakken, dan krijg je een seintje op je telefoon. Er wordt niets verzonden zonder jouw akkoord.",
      "Opvallend detail uit Anthropics eigen cijfers: ruim 90 procent van wat mensen met Cowork doen, heeft niets met programmeren te maken, maar met gewoon kantoorwerk zoals processen stroomlijnen en teksten schrijven. De functie rolt de komende weken uit, te beginnen bij het duurste abonnement.",
    ],
  },
  {
    slug: "microsoft-eigen-ai-modellen",
    title: "Microsoft vervangt AI van OpenAI en Anthropic door eigen modellen",
    date: "2026-07-08",
    category: "AI-nieuws",
    excerpt:
      "In Excel en Outlook stapt Microsoft geleidelijk over op zelfgebouwde AI, om minder afhankelijk te zijn van de grote AI-labs.",
    body: [
      "Microsoft begint de modellen van OpenAI en Anthropic te vervangen door eigen modellen. In vertrouwde programma's als Excel en Outlook schakelt Microsoft geleidelijk over op zelfgebouwde AI.",
      "De reden is nuchter: Microsoft verstookt gigantische hoeveelheden AI-rekenkracht in zijn producten, krijgt die nu nog met korting, maar wil niet straks overgeleverd zijn aan wat de grote AI-labs besluiten te rekenen.",
      "Voor jou als gebruiker verandert er onder de motorkap dus iets: de AI-hulp in je Office-programma's draait straks mogelijk op Microsofts eigen model in plaats van op ChatGPT. Het laat zien hoe de techreuzen steeds minder afhankelijk willen zijn van elkaar.",
    ],
  },
  {
    slug: "chatgpt-gpt-live-voice",
    title: "Een gesprek met ChatGPT wordt beter",
    date: "2026-07-07",
    category: "AI-nieuws",
    excerpt:
      "OpenAI's nieuwe voice-laag GPT-Live luistert terwijl ze praat. Onderbreken, pauzeren en live vertalen worden mogelijk.",
    body: [
      "De nieuwe voice mode luistert terwijl ze praat. Je hoeft dus niet meer netjes te wachten tot ChatGPT klaar is. Je kunt onderbreken, nadenken, pauzeren of vragen of ze even stil blijft. Het wordt minder een dictafoon die om de beurt aan staat en meer een gesprek. OpenAI noemt dit GPT-Live, een nieuwe voice-laag die continu kan luisteren en reageren.",
      "Voor gewone gebruikers is dit waarschijnlijk de update die je als eerste merkt. Tijdens wandelen, koken, autorijden, reizen of taal oefenen is praten vaak logischer dan typen. Zeker als ChatGPT beter wacht wanneer je nadenkt en minder snel door je heen praat. De nieuwe stemmodus kan live vertalen, beter omgaan met onderbrekingen en bij ingewikkeldere vragen op de achtergrond een sterker model of web search inschakelen. Jij blijft praten, terwijl ChatGPT ondertussen zoekt of redeneert.",
      "Dat maakt Voice interessanter dan “ChatGPT, maar dan gesproken”. Je kunt onderweg een idee uitwerken, een gesprek in een andere taal voeren, jezelf laten overhoren of snel iets actueels laten opzoeken zonder terug naar je toetsenbord te gaan.",
    ],
  },
  {
    slug: "chatgpt-work-maakt-werk-af",
    title: "ChatGPT Work maakt werk af",
    date: "2026-07-06",
    category: "AI-nieuws",
    excerpt:
      "ChatGPT Work is een agent die uit je apps, bestanden en workflows een document, spreadsheet of presentatie maakt. De stap van antwoord naar uitkomst.",
    body: [
      "De grootste verschuiving zit in ChatGPT Work. Dat is een agent die informatie uit je apps, bestanden en workflows kan halen en daar iets van maakt: een document, spreadsheet, presentatie, analyse, site of webapp. ChatGPT kan zo'n taak opdelen, langer blijven doorwerken en onderweg vragen stellen of om goedkeuring vragen.",
      "Dit is de stap van antwoord naar uitkomst. Niet: “vat deze notities samen.” Eerder: “maak van deze notities, mails en documenten een briefing voor mijn meeting van morgen.” Of: “werk deze presentatie bij met de laatste feedback uit Slack en mail.” Dat is voor de gewone gebruiker relevanter dan welke modelnaam eronder zit.",
      "Onder de motorkap draait dit op GPT-5.6, het nieuwe model van OpenAI. De technische claim is dat het beter is in meerstapswerk, templates volgen en rommelige context omzetten in bruikbare output. Voor jou betekent dat vooral: minder opnieuw uitleggen, meer kans dat het eindresultaat lijkt op wat je nodig had.",
    ],
  },
];
