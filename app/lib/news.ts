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
    slug: "google-stelt-gemini-3-5-uit",
    title: "Google stelt zijn nieuwste AI uit: Gemini 3.5 Pro laat op zich wachten",
    date: "2026-07-17",
    category: "AI-nieuws",
    excerpt:
      "Google schuift de brede lancering van Gemini 3.5 Pro maanden op na tegenvallende interne tests. Beleggers reageren nerveus.",
    body: [
      "Google heeft de brede uitrol van zijn nieuwste vlaggenschipmodel, Gemini 3.5 Pro, met enkele maanden uitgesteld. Uit interne tests bleek dat het model tegenviel op programmeren en op ingewikkelde taken waarbij het lang moet doorredeneren. Voorlopig blijft het alleen beschikbaar in een beperkte preview voor zakelijke klanten.",
      "De markt reageerde meteen: het aandeel van moederbedrijf Alphabet zakte ruim 4 procent. De achterliggende zorg is of Google de aansluiting houdt in de race om de slimste AI, waarin OpenAI, Anthropic en inmiddels ook Chinese partijen hard aan de weg timmeren.",
      "Voor jou als gebruiker is de les vooral dat 'binnenkort' bij AI zelden een harde datum is. De grote labs beloven veel, maar leveren pas als het klopt, en soms schuift dat op. Wie vandaag met AI aan de slag wil, bouwt daarom beter op wat nú betrouwbaar werkt dan op wat is aangekondigd.",
    ],
  },
  {
    slug: "apple-klaagt-openai-aan",
    title: "Apple klaagt OpenAI aan om gestolen hardwaregeheimen",
    date: "2026-07-17",
    category: "AI-nieuws",
    excerpt:
      "Apple beschuldigt OpenAI van diefstal van bedrijfsgeheimen rond hardware en waarschuwt tientallen oud-werknemers. Ondertussen wordt Apple het waardevolste bedrijf ter wereld.",
    body: [
      "Apple is een grote rechtszaak begonnen tegen OpenAI. De iPhone-maker beschuldigt het AI-bedrijf ervan bedrijfsgeheimen over hardware te hebben gestolen. Zo'n veertig oud-Apple-medewerkers die inmiddels bij OpenAI werken kregen een juridische waarschuwing om hun documenten te bewaren voor aankomende verhoren.",
      "De zaak legt bloot hoe fel de strijd om AI-hardware is geworden. OpenAI werkt aan eigen apparaten, en dat zit Apple, dat zelf zwaar op AI inzet, duidelijk niet lekker. Opvallend detail: in dezelfde week passeerde Apple chipmaker Nvidia als het waardevolste bedrijf ter wereld, met een beurswaarde die de 5 biljoen dollar nadert.",
      "Voor de gewone gebruiker verandert er op korte termijn niets, maar het tekent het speelveld: de techreuzen zijn niet langer partners die elkaar aanvullen, maar concurrenten die elkaar voor de rechter slepen. De inzet is wie straks zowel de hardware als de AI in handen heeft.",
    ],
  },
  {
    slug: "kimi-k3-chinees-open-model",
    title: "Chinees open AI-model Kimi K3 verslaat de gevestigde orde op code",
    date: "2026-07-16",
    category: "AI-nieuws",
    excerpt:
      "Moonshot AI's nieuwe open model Kimi K3 pakt de koppositie op programmeren, vóór Claude Fable 5 en GPT-5.6. En het is vrij beschikbaar.",
    body: [
      "Het Chinese Moonshot AI heeft Kimi K3 uitgebracht, een zogeheten open-weight model dat meteen bovenaan staat op een toonaangevende benchmark voor het bouwen van websites en het uitvoeren van agent-taken. Met een winstpercentage van 76 procent in directe vergelijkingen liet het model Anthropics Claude Fable 5 en OpenAI's GPT-5.6 Sol achter zich.",
      "Bijzonder is dat Kimi K3 'open' is: bedrijven kunnen het model zelf draaien en aanpassen, zonder afhankelijk te zijn van één aanbieder. Dat maakt krachtige AI toegankelijker en goedkoper, en zet de gevestigde, gesloten modellen onder druk.",
      "Voor het MKB is dit goed nieuws. Meer concurrentie en sterke open modellen betekenen lagere kosten en meer keuze; je zit niet vast aan één leverancier. Bij het bouwen van een oplossing kiezen wij daarom bewust het model dat op dat moment het beste past bij de taak en het budget, niet automatisch de bekendste naam.",
    ],
  },
  {
    slug: "anthropic-marktleider-ipo",
    title: "Anthropic is stilletjes marktleider geworden, en gaat naar de beurs",
    date: "2026-07-14",
    category: "AI-nieuws",
    excerpt:
      "De maker van Claude draait naar verwachting 47 miljard dollar omzet op jaarbasis, is winstgevend, en bereidt een beursgang voor in oktober.",
    body: [
      "Anthropic, de maker van Claude, is bijna ongemerkt de commercieel sterkste speler in AI geworden. Het bedrijf koerst af op zo'n 47 miljard dollar omzet op jaarbasis en zou dit jaar zelfs winstgevend zijn, vooral dankzij Claude Code en breed gebruik binnen grote bedrijven.",
      "Om die groei vast te houden zet Anthropic twee grote stappen. Het praat met Samsung over een eigen AI-chip om minder afhankelijk te zijn van Nvidia, en bereidt een beursgang (IPO) voor in oktober. Eigen chips en beurskapitaal moeten zorgen voor voldoende rekenkracht en voorspelbare groei.",
      "Waarom dit voor jou relevant is: Claude is een van de modellen waarmee wij dagelijks oplossingen bouwen. Een gezond, winstgevend bedrijf erachter betekent stabiliteit en doorontwikkeling op de lange termijn, prettig als je AI een vaste plek in je bedrijfsvoering geeft.",
    ],
  },
  {
    slug: "95-procent-ai-pilots-levert-niets-op",
    title: "95% van de AI-pilots levert niets op, en wat je daarvan kunt leren",
    date: "2026-07-13",
    category: "AI-nieuws",
    excerpt:
      "Uit onderzoek blijkt dat het overgrote deel van de bedrijfs-AI-projecten geen meetbaar resultaat oplevert. Microsoft zet 6.000 engineers in om dat te doorbreken.",
    body: [
      "Een ontnuchterend cijfer maakte deze week de ronde: naar schatting 95 procent van de AI-pilots bij bedrijven levert geen enkel meetbaar effect op de winst op. Microsoft neemt dat serieus en richtte een nieuwe afdeling op van 2,5 miljard dollar, met zo'n 6.000 engineers die letterlijk bij klanten binnen de deur gaan werken om projecten wél te laten slagen.",
      "Het probleem zit zelden in de techniek, want de modellen zijn krachtig genoeg. Het gaat mis bij de aansluiting op echte processen: een losse pilot die niemand gebruikt, een tool die niet koppelt met bestaande systemen, of een oplossing die niet is gebouwd rond hoe mensen echt werken.",
      "Precies daar zit onze aanpak. Wij beginnen niet bij de technologie maar bij het proces dat de meeste tijd kost, bouwen klein en meetbaar, en leveren pas op als het aantoonbaar werkt in de praktijk. Zo hoor je bij de 5 procent die het wél oplevert, in plaats van bij de 95 procent die blijft steken in een proef.",
    ],
  },
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
