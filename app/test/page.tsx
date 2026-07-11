import Image from "next/image";
import { Bricolage_Grotesque, Inter, Roboto_Mono } from "next/font/google";
import ContactFormLight from "../components/ContactFormLight";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["800"], variable: "--font-bricolage" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-inter-test" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-roboto-mono" });

const NAV_LINKS = [
  { label: "Diensten", href: "#diensten" },
  { label: "Werkwijze", href: "#werkwijze" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Contact", href: "#contact" },
];

const WAAROM = [
  {
    nr: "01",
    title: "Op maat, niet van de plank",
    desc: "Geen one-size-fits-all. Wij bouwen tools die perfect aansluiten bij hoe jouw bedrijf werkt, niet andersom.",
    tag: "100% op maat",
    surface: "#d5f5c2",
  },
  {
    nr: "02",
    title: "Snel live, niet over maanden",
    desc: "Door slim gebruik van AI en moderne tools is jouw oplossing in weken klaar. Geen lange trajecten, maar snel resultaat.",
    tag: "Weken, niet maanden",
    surface: "#a8e5e5",
  },
  {
    nr: "03",
    title: "Menselijk en technisch",
    desc: "Wij spreken jouw taal. Complexe technologie vertaald naar begrijpelijke oplossingen, met persoonlijk contact van A tot Z.",
    tag: "Jouw taal, onze tech",
    surface: "#f6d0ff",
  },
];

const DIENSTEN = [
  {
    icon: "📋",
    title: "Slimme planning",
    stat: "Tot 80% minder planningsstress",
    description:
      "Minder gedoe met roosters, monteurs en deadlines. AI houdt overzicht over je projecten, signaleert knelpunten en helpt je agenda realistisch te houden.",
    items: ["Automatische projectplanning", "Bezettingsoverzicht monteurs", "Vertragingen vroegtijdig signaleren", "Koppeling met bestaande agenda's"],
  },
  {
    icon: "📄",
    title: "Offertes & administratie",
    stat: "Offerte in minuten, niet in uren",
    description:
      "Offertes maken kost tijd die je liever in je werk steekt. Wij bouwen tools die dat grotendeels uit handen nemen: snel, consistent en zonder tikfouten.",
    items: ["Automatisch offertes opstellen", "Werkbonnen digitaal verwerken", "Facturen & nacalculatie", "Koppeling met boekhoudpakket"],
  },
  {
    icon: "🏗️",
    title: "Inkoop & materiaal",
    stat: "Gemiddeld 15% lagere inkoopkosten",
    description:
      "Nooit meer misgrijpen of te veel bestellen. AI houdt je materiaalstromen bij, vergelijkt prijzen en geeft aan wanneer je moet bijbestellen.",
    items: ["Materiaalverbruik bijhouden", "Inkooplijsten automatisch genereren", "Prijsvergelijking leveranciers", "Voorraadbeheer op locatie"],
  },
];

const STAPPEN = [
  { nr: "01", title: "Kennismaking", desc: "We bespreken jouw situatie, waar tijd verloren gaat en wat het meest oplevert om te automatiseren." },
  { nr: "02", title: "Analyse", desc: "We brengen je processen in kaart en bepalen samen welke AI-tool het meeste verschil maakt." },
  { nr: "03", title: "Bouwen", desc: "We bouwen de oplossing op maat. Je wordt op de hoogte gehouden en kunt tussentijds feedback geven." },
  { nr: "04", title: "Oplevering", desc: "De tool wordt live gezet en we lopen er samen doorheen zodat jij en je team ermee overweg kunnen." },
  { nr: "05", title: "Doorontwikkeling", desc: "We blijven beschikbaar voor vragen, aanpassingen en uitbreidingen. Je staat er niet alleen voor." },
];

const PORTFOLIO_ITEMS = [
  {
    tag: "Planning",
    title: "Projectplanner voor installatiebedrijf",
    description: "AI-tool die op basis van beschikbare monteurs, materiaal en looptijd automatisch een realistische projectplanning opstelt.",
    stack: ["Python", "Claude API", "Make.com"],
  },
  {
    tag: "Offertes",
    title: "Automatische offertegenerator",
    description: "Tool die op basis van een klantomschrijving en prijslijst binnen minuten een volledige offerte opstelt, inclusief materiaal en arbeid.",
    stack: ["Next.js", "OpenAI", "Supabase"],
  },
  {
    tag: "Administratie",
    title: "Digitale werkbonverwerker",
    description: "Monteurs vullen een simpel formulier in op hun telefoon. De rest regelt het systeem zelf: factuur, urenstaat en nacalculatie.",
    stack: ["Node.js", "Claude API", "Make.com"],
  },
];

const FAQS = [
  { q: "Wat kost zoiets?", a: "Dat hangt af van wat je nodig hebt. Een eenvoudige automatisering start rond de €1.500. Complexere tools of meerdere koppelingen kosten meer. We kijken altijd eerst wat het oplevert voordat we een prijs noemen." },
  { q: "Hoe lang duurt het voordat ik iets heb?", a: "De meeste tools zijn binnen 2 tot 6 weken live. We werken in korte cycli zodat je snel resultaat ziet, niet na maanden." },
  { q: "Moet ik technisch zijn om het te gebruiken?", a: "Nee. We bouwen tools die gewoon werken, ook voor mensen die niks van techniek weten. Je monteurs hoeven alleen een simpel formulier in te vullen op hun telefoon." },
  { q: "Wat als het niet werkt zoals verwacht?", a: "Dan lossen we het op. We leveren pas op als jij tevreden bent, en daarna blijven we beschikbaar voor aanpassingen." },
  { q: "Werkt dit ook met mijn bestaande software?", a: "In de meeste gevallen wel. We koppelen aan veelgebruikte pakketten zoals Exact, AFAS, SimplicTe en andere boekhoud- of plansoftware." },
];

const display = { fontFamily: "var(--font-bricolage)", letterSpacing: "0.04em" };

export default function TestPage() {
  return (
    <div
      className={`${bricolage.variable} ${inter.variable} ${robotoMono.variable} min-h-screen bg-[#fcfaf5] text-[#1a3300]`}
      style={{ fontFamily: "var(--font-inter-test)" }}
    >
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 px-4 pt-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-5 py-3 rounded-2xl bg-[#fcfaf5] border border-[#b6b6b6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#ffe95c] flex items-center justify-center font-bold text-[#1a3300]" style={display}>
              ls
            </div>
            <span className="font-bold text-xl">Leadz Systems</span>
          </div>
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium hover:opacity-60 transition-opacity">
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="text-sm font-medium px-4 py-2 rounded-md bg-[#1a3300] text-[#fcfaf5] hover:bg-[#1a3300]/90 transition-colors whitespace-nowrap shadow-sm"
          >
            Neem contact op
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-6 pt-20 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#ffe95c] text-[#1a3300] text-sm font-medium mb-8"
          >
            ✦ AI voor bouw & installatietechniek
          </span>
          <h1 className="text-5xl md:text-7xl leading-none mb-8" style={display}>
            Minder papierwerk,{" "}
            <span className="bg-[#ffe95c] box-decoration-clone px-2">meer bouwen</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-[600px] mx-auto mb-10">
            Leadz Systems bouwt AI-tools voor aannemers en installatiebedrijven.
            Planning, offertes, inkoop en administratie: wij automatiseren wat jouw tijd kost.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-10 py-4 rounded-md bg-[#1a3300] text-[#fcfaf5] font-medium text-base hover:bg-[#1a3300]/90 transition-colors shadow-sm"
            >
              → Start een gesprek
            </a>
            <a
              href="#diensten"
              className="px-10 py-4 rounded-md bg-[#a8e5e5] text-[#1a3300] font-medium text-base hover:brightness-95 transition-all"
            >
              Bekijk onze diensten
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-6 pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "Bouw", label: "& installatietechniek" },
            { num: "MKB", label: "Onze doelgroep" },
            { num: "100%", label: "Maatwerk" },
            { num: "24/7", label: "Systemen draaien door" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-[#1a3300]/15 bg-[#fcfaf5] p-6 text-center">
              <div className="text-2xl font-bold mb-1">{s.num}</div>
              <div className="text-sm text-[#1a3300]/50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WAAROM ── */}
      <section className="px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1.5 rounded-md bg-[#ffe95c] text-sm font-medium mb-6">
              Waarom Leadz Systems
            </span>
            <h2 className="text-4xl md:text-6xl leading-none mb-5" style={display}>
              Geen standaard<br />oplossingen.
            </h2>
            <p className="text-lg text-[#1a3300]/60">Drie redenen waarom bedrijven voor ons kiezen.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {WAAROM.map((item) => (
              <div
                key={item.nr}
                className="relative rounded-xl border border-[#1a3300] p-7 overflow-hidden"
                style={{ backgroundColor: item.surface }}
              >
                <span className="absolute top-3 right-5 text-7xl font-black text-[#1a3300]/10 select-none" style={display}>
                  {item.nr}
                </span>
                <h3 className="text-2xl font-bold mb-3 relative">{item.title}</h3>
                <p className="text-base text-[#1a3300]/80 leading-relaxed mb-6 relative">{item.desc}</p>
                <span className="inline-block px-3 py-1.5 rounded-full border border-[#1a3300] bg-[#fcfaf5] text-xs font-medium relative">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIENSTEN ── */}
      <section id="diensten" className="px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl leading-none mb-4" style={display}>
              Wat we <span className="bg-[#ffe95c] box-decoration-clone px-2">doen</span>
            </h2>
            <p className="text-lg text-[#1a3300]/60 max-w-xl mx-auto">
              Van strategie tot werkende oplossing: wij begeleiden het hele traject.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {DIENSTEN.map((d) => (
              <div key={d.title} className="rounded-xl border border-[#1a3300]/15 bg-[#fcfaf5] p-7">
                <div className="text-4xl mb-4">{d.icon}</div>
                <span className="inline-block text-xs font-medium bg-[#ffe95c] rounded-full px-3 py-1 mb-3">{d.stat}</span>
                <h3 className="text-xl font-bold mb-3">{d.title}</h3>
                <p className="text-[#1a3300]/60 text-base leading-relaxed mb-6">{d.description}</p>
                <ul className="space-y-2">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#1a3300]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1a3300] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVER ONS ── */}
      <section id="over-ons" className="px-6 py-16">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[520px] rounded-xl overflow-hidden border border-[#1a3300]">
            <Image
              src="/jesse.png"
              alt="Jesse, oprichter van Leadz Systems"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              className="object-cover object-[50%_35%] grayscale"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl leading-none mb-6" style={display}>
              Even <span className="bg-[#ffe95c] box-decoration-clone px-2">voorstellen</span>
            </h2>
            <p className="text-lg leading-relaxed mb-5">
              Mijn naam is Jesse, oprichter van <strong>Leadz Systems</strong>. Ik bouw AI-tools voor bedrijven in de bouw en installatietechniek.
            </p>
            <p className="text-lg leading-relaxed mb-5 text-[#1a3300]/80">
              Ik zie dagelijks hoeveel tijd er in deze sector verloren gaat aan administratie, offertes en planning. Werk dat niks oplevert, maar wel tijd kost die je liever in je project steekt.
            </p>
            <p className="text-lg leading-relaxed mb-8 text-[#1a3300]/80">
              Daar heb ik wat op bedacht. Geen dure softwarepakketten, geen maandenlange trajecten. Gewoon slimme tools die direct werken en jou tijd besparen.
            </p>
            <div className="flex flex-wrap gap-2 mb-8" style={{ fontFamily: "var(--font-roboto-mono)" }}>
              {["OpenAI / Claude API", "Python & Node.js", "Next.js", "Make.com / n8n", "Supabase", "Vector databases"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-full border border-[#1a3300]/30 text-[#1a3300]/70 text-xs">
                  {tech}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-block px-7 py-3 rounded-md bg-[#1a3300] text-[#fcfaf5] font-medium hover:bg-[#1a3300]/90 transition-colors shadow-sm"
            >
              → Stel een vraag aan Jesse
            </a>
          </div>
        </div>
      </section>

      {/* ── WERKWIJZE ── */}
      <section id="werkwijze" className="px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl leading-none mb-4" style={display}>
              Zo werken <span className="bg-[#ffe95c] box-decoration-clone px-2">wij</span>
            </h2>
            <p className="text-lg text-[#1a3300]/60 max-w-xl mx-auto">
              Van eerste gesprek tot werkende tool. Geen verrassingen, gewoon duidelijkheid.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {STAPPEN.map((s) => (
              <div key={s.nr} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#ffe95c] border border-[#1a3300] flex items-center justify-center font-bold text-lg mb-4" style={display}>
                  {s.nr}
                </div>
                <h4 className="font-bold mb-2">{s.title}</h4>
                <p className="text-[#1a3300]/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl leading-none mb-4" style={display}>
              Ons <span className="bg-[#ffe95c] box-decoration-clone px-2">werk</span>
            </h2>
            <p className="text-lg text-[#1a3300]/60 max-w-xl mx-auto">
              Voorbeelden van wat we bouwen. Elk project is uniek, elke oplossing op maat.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.map((p) => (
              <div key={p.title} className="rounded-xl border border-[#1a3300]/15 bg-[#fcfaf5] p-7 flex flex-col">
                <span className="self-start px-3 py-1 rounded-full bg-[#ffe95c] text-xs font-medium mb-6">{p.tag}</span>
                <h3 className="text-lg font-bold mb-3">{p.title}</h3>
                <p className="text-[#1a3300]/60 text-base leading-relaxed flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-2 mt-6" style={{ fontFamily: "var(--font-roboto-mono)" }}>
                  {p.stack.map((s) => (
                    <span key={s} className="px-2 py-1 rounded border border-[#1a3300]/20 text-[#1a3300]/50 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[#1a3300]/40 text-sm mt-8">
            * Voorbeeldprojecten ter illustratie van onze werkwijze
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl leading-none mb-4" style={display}>
              Veelgestelde <span className="bg-[#ffe95c] box-decoration-clone px-2">vragen</span>
            </h2>
            <p className="text-lg text-[#1a3300]/60">De vragen die je waarschijnlijk ook hebt.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-[#1a3300]/20 bg-[#fcfaf5]">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-semibold">
                  {faq.q}
                  <span className="text-xl group-open:rotate-45 transition-transform duration-200 shrink-0 ml-4">+</span>
                </summary>
                <p className="px-6 pb-5 text-[#1a3300]/65 text-base leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="px-6 py-16">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl leading-none mb-6" style={display}>
              Neem <span className="bg-[#ffe95c] box-decoration-clone px-2">contact op</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-[#1a3300]/80">
              Herken je de problemen? Stuur een bericht en we kijken samen wat haalbaar is.
              Geen verplichtingen, gewoon een eerlijk gesprek.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-[#ffe95c] flex items-center justify-center">📧</div>
                <div>
                  <div className="text-sm text-[#1a3300]/50">E-mail</div>
                  <div className="font-medium">info@leadzsystems.nl</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-[#ffe95c] flex items-center justify-center">📞</div>
                <div>
                  <div className="text-sm text-[#1a3300]/50">Telefoon</div>
                  <a href="tel:0624505863" className="font-medium hover:opacity-60 transition-opacity">06 24 50 58 63</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-[#ffe95c] flex items-center justify-center">📍</div>
                <div>
                  <div className="text-sm text-[#1a3300]/50">Locatie</div>
                  <div className="font-medium">Nederland</div>
                </div>
              </div>
            </div>
          </div>
          <ContactFormLight />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#b6b6b6] py-8 px-6 mt-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg">Leadz Systems</span>
          <p className="text-[#1a3300]/40 text-sm">© {new Date().getFullYear()} Leadz Systems. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-[#1a3300]/50 hover:text-[#1a3300] transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP ── */}
      <a
        href="https://wa.me/31624505863"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] transition-all shadow-md hover:scale-110 duration-200 flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
