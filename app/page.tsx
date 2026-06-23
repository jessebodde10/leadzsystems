import Image from "next/image";
import ContactForm from "./components/ContactForm";

const NAV_LINKS = [
  { label: "Diensten", href: "#diensten" },
  { label: "Werkwijze", href: "#werkwijze" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Contact", href: "#contact" },
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

const FAQS = [
  { q: "Wat kost zoiets?", a: "Dat hangt af van wat je nodig hebt. Een eenvoudige automatisering start rond de €1.500. Complexere tools of meerdere koppelingen kosten meer. We kijken altijd eerst wat het oplevert voordat we een prijs noemen." },
  { q: "Hoe lang duurt het voordat ik iets heb?", a: "De meeste tools zijn binnen 2 tot 6 weken live. We werken in korte cycli zodat je snel resultaat ziet, niet na maanden." },
  { q: "Moet ik technisch zijn om het te gebruiken?", a: "Nee. We bouwen tools die gewoon werken, ook voor mensen die niks van techniek weten. Je monteurs hoeven alleen een simpel formulier in te vullen op hun telefoon." },
  { q: "Wat als het niet werkt zoals verwacht?", a: "Dan lossen we het op. We leveren pas op als jij tevreden bent, en daarna blijven we beschikbaar voor aanpassingen." },
  { q: "Werkt dit ook met mijn bestaande software?", a: "In de meeste gevallen wel. We koppelen aan veelgebruikte pakketten zoals Exact, AFAS, SimplicTe en andere boekhoud- of plansoftware." },
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111418] text-white overflow-x-hidden">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-6">
        <div className="flex items-center justify-between gap-8 px-5 py-3 rounded-full bg-[#1a1d22]/90 backdrop-blur-md border border-white/10 shadow-lg shadow-black/30 w-full max-w-3xl">
          <span className="text-base font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent whitespace-nowrap">
            Leadz Systems
          </span>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="text-sm px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all font-semibold whitespace-nowrap shadow-md shadow-orange-500/20"
          >
            Neem contact op
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl orb-1" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl orb-2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-400/8 rounded-full blur-2xl orb-1" style={{ animationDelay: "2s" }} />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 grid-fade"
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative text-center max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm mb-8 fade-in-down"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            AI voor bouw & installatietechniek
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 fade-in-up"
            style={{ animationDelay: "0.25s" }}
          >
            Minder papierwerk,{" "}
            <span className="shimmer-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              meer bouwen
            </span>
          </h1>

          <p
            className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed fade-in-up"
            style={{ animationDelay: "0.45s" }}
          >
            Leadz Systems bouwt AI-tools voor aannemers en installatiebedrijven.
            Planning, offertes, inkoop en administratie: wij automatiseren wat jouw tijd kost.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up"
            style={{ animationDelay: "0.65s" }}
          >
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all font-semibold text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 duration-200"
            >
              Start een gesprek
            </a>
            <a
              href="#diensten"
              className="px-8 py-4 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all font-medium text-white/80 hover:scale-105 duration-200"
            >
              Bekijk onze diensten →
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "Bouw", label: "& installatietechniek" },
            { num: "MKB", label: "Onze doelgroep" },
            { num: "100%", label: "Maatwerk" },
            { num: "24/7", label: "Systemen draaien door" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                {s.num}
              </div>
              <div className="text-sm text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIENSTEN ── */}
      <section id="diensten" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Wat we{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                doen
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Van strategie tot werkende oplossing: wij begeleiden het hele traject.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DIENSTEN.map((d) => (
              <div
                key={d.title}
                className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-orange-500/40 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-600/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-4xl mb-4">{d.icon}</div>
                <div className="text-xs font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 inline-block mb-3">{d.stat}</div>
                <h3 className="text-xl font-bold mb-3">{d.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{d.description}</p>
                <ul className="space-y-2">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
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
      <section id="over-ons" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* Foto links */}
          <div className="relative h-[520px] rounded-2xl overflow-hidden ring-1 ring-white/10">
            <Image
              src="/jesse.png"
              alt="Jesse, oprichter van Leadz Systems"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              priority
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111418]/60 via-transparent to-transparent" />
          </div>

          {/* Tekst rechts */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Even{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                voorstellen
              </span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-5">
              Mijn naam is Jesse, oprichter van <strong className="text-white">Leadz Systems</strong>. Ik bouw AI-tools voor bedrijven in de bouw en installatietechniek.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-5">
              Ik zie dagelijks hoeveel tijd er in deze sector verloren gaat aan administratie, offertes en planning. Werk dat niks oplevert, maar wel tijd kost die je liever in je project steekt.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Daar heb ik wat op bedacht. Geen dure softwarepakketten, geen maandenlange trajecten. Gewoon slimme tools die direct werken en jou tijd besparen.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["OpenAI / Claude API", "Python & Node.js", "Next.js", "Make.com / n8n", "Supabase", "Vector databases"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-block px-7 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all font-semibold shadow-lg shadow-orange-500/20 hover:scale-105 duration-200"
            >
              Stel een vraag aan Jesse →
            </a>
          </div>

        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ons{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                werk
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Voorbeelden van wat we bouwen. Elk project is uniek, elke oplossing op maat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.map((p) => (
              <div
                key={p.title}
                className="group p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-orange-500/40 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium">
                    {p.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <span className="text-sm">→</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {p.stack.map((s) => (
                    <span key={s} className="px-2 py-1 rounded bg-white/5 text-white/40 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/30 text-sm mt-8">
            * Voorbeeldprojecten ter illustratie van onze werkwijze
          </p>
        </div>
      </section>


      {/* ── WERKWIJZE ── */}
      <section id="werkwijze" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Zo werken{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                wij
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Van eerste gesprek tot werkende tool. Geen verrassingen, gewoon duidelijkheid.
            </p>
          </div>
          <div className="relative">
            {/* Verbindingslijn */}
            <div className="hidden md:block absolute top-8 left-[calc(10%+1rem)] right-[calc(10%+1rem)] h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
            <div className="grid md:grid-cols-5 gap-6">
              {STAPPEN.map((s) => (
                <div key={s.nr} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-lg mb-4 relative z-10">
                    {s.nr}
                  </div>
                  <h4 className="font-bold mb-2">{s.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Veelgestelde{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                vragen
              </span>
            </h2>
            <p className="text-white/50 text-lg">De vragen die je waarschijnlijk ook hebt.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:border-orange-500/30 transition-colors"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-semibold text-white/90 group-hover:text-white transition-colors">
                  {faq.q}
                  <span className="text-orange-400 text-xl group-open:rotate-45 transition-transform duration-200 shrink-0 ml-4">+</span>
                </summary>
                <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a
        href="https://wa.me/31624505863"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] transition-all shadow-lg shadow-black/30 hover:shadow-[#25D366]/40 hover:scale-110 duration-200 flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Neem{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                contact op
              </span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Herken je de problemen? Stuur een bericht en we kijken samen wat haalbaar is.
              Geen verplichtingen, gewoon een eerlijk gesprek.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300">
                  📧
                </div>
                <div>
                  <div className="text-sm text-white/40">E-mail</div>
                  <div className="text-white/80">info@leadzystems.nl</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300">
                  📞
                </div>
                <div>
                  <div className="text-sm text-white/40">Telefoon</div>
                  <a href="tel:0624505863" className="text-white/80 hover:text-orange-400 transition-colors">06 24 50 58 63</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300">
                  📍
                </div>
                <div>
                  <div className="text-sm text-white/40">Locatie</div>
                  <div className="text-white/80">Nederland</div>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Leadz Systems
          </span>
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Leadz Systems. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/30 hover:text-white/60 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
