import Image from "next/image";
import ContactForm from "./components/ContactForm";
import Nav from "./components/Nav";
import { SITE, DIENSTEN, STAPPEN, FAQS, PORTFOLIO_ITEMS, WAAROM } from "./lib/content";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE.url}/#business`,
        name: SITE.name,
        description:
          "AI-tools voor aannemers en installatiebedrijven: slimme planning, automatische offertes, digitale werkbonnen en materiaalbeheer.",
        url: SITE.url,
        email: SITE.email,
        telephone: SITE.phoneIntl,
        areaServed: SITE.region,
        address: { "@type": "PostalAddress", addressCountry: "NL" },
        founder: { "@type": "Person", name: "Jesse" },
        knowsAbout: ["AI-automatisering", "Bouw", "Installatietechniek", "Offertes", "Projectplanning"],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#111418] text-white overflow-x-hidden pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Nav />

      {/* ── HERO ── */}
      <section className="relative min-h-[86vh] md:min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-sm font-medium mb-8 fade-in-down"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            AI voor bouw &amp; installatietechniek
          </div>

          <h1
            className="text-[2.75rem] leading-[1.05] md:text-7xl font-bold mb-6 fade-in-up"
            style={{ animationDelay: "0.25s" }}
          >
            Minder papierwerk,{" "}
            <span className="shimmer-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              meer bouwen
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-8 fade-in-up"
            style={{ animationDelay: "0.45s" }}
          >
            Offertes 's avonds uittypen, werkbonnen die kwijtraken, monteurs zonder materiaal op de bouw.
            Leadz Systems bouwt slimme tools die dat uit handen nemen, zodat jij je op het werk kunt richten.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up"
            style={{ animationDelay: "0.65s" }}
          >
            <a
              href="#scan"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all font-semibold text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.03] duration-200"
            >
              Plan een gratis scan
            </a>
            <a
              href="#diensten"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/15 hover:border-white/35 hover:bg-white/5 transition-all font-medium text-white/90 hover:scale-[1.03] duration-200"
            >
              Bekijk onze diensten →
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="border-y border-white/5 bg-white/[0.03]">
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
              <div className="text-sm text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WAAROM ── */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-sm font-medium mb-4">
              Waarom Leadz Systems
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Geen standaard<br />oplossingen.
            </h2>
            <p className="text-white/70 text-lg leading-8">Drie redenen waarom bouw- en installatiebedrijven voor ons kiezen.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {WAAROM.map((item) => (
              <div
                key={item.nr}
                className="relative group p-8 rounded-2xl border border-white/10 bg-white/[0.04] hover:border-orange-500/30 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
              >
                <span className="absolute top-4 right-5 text-7xl font-black text-white/[0.07] select-none group-hover:text-white/[0.1] transition-colors">
                  {item.nr}
                </span>
                <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center text-2xl mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/70 text-[0.95rem] leading-7 mb-6">{item.desc}</p>
                <span className="inline-block px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIENSTEN ── (iets lichter werkvlak + blueprint) */}
      <section id="diensten" className="relative py-16 md:py-24 px-6 bg-[#15191e] border-y border-white/5">
        <div className="absolute inset-0 blueprint opacity-60 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Wat we{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                doen
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-8">
              Van strategie tot werkende tool op de bouw: wij begeleiden het hele traject.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DIENSTEN.map((d) => (
              <a
                key={d.title}
                href={`/diensten/${d.slug}`}
                className="group relative p-8 rounded-2xl border border-white/10 bg-[#1a1f25] hover:border-orange-500/40 hover:bg-[#1d232a] transition-all duration-300 flex flex-col"
              >
                <div className="text-4xl mb-4">{d.icon}</div>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-white/75 bg-white/5 border border-white/10 rounded-full px-3 py-1 self-start mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  {d.stat}
                </div>
                <h3 className="text-xl font-bold mb-3">{d.title}</h3>
                <p className="text-white/70 text-[0.95rem] leading-7 mb-6">{d.description}</p>
                <ul className="space-y-2.5 mb-6">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/75">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto text-sm font-semibold text-orange-400 group-hover:text-orange-300 transition-colors">
                  Meer over deze dienst →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTOR-PREVIEW (werkbon + planning) ── */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Zo ziet het er in de praktijk uit</h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-8">
              Een digitale werkbon op de telefoon van je monteur, en een dagplanning die zichzelf bijhoudt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Digitale werkbon */}
            <div className="rounded-2xl border border-white/10 bg-[#15191e] p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-mono text-white/50">WERKBON #2041</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-300 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Afgerond
                </span>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  ["Klant", "Van Dijk Vastgoed"],
                  ["Adres", "Industrieweg 12, Apeldoorn"],
                  ["Monteur", "Kevin"],
                  ["Uren", "3,5 u"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-white/50">{k}</span>
                    <span className="text-white/85 font-medium">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1">
                  <span className="text-white/50">Materiaal</span>
                  <span className="text-white/85 font-medium text-right">CV-pomp + 4 koppelingen</span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-orange-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Factuur &amp; nacalculatie automatisch aangemaakt
              </div>
            </div>

            {/* Dagplanning */}
            <div className="rounded-2xl border border-white/10 bg-[#15191e] p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-mono text-white/50">PLANNING · DI 24 JUNI</span>
                <span className="text-xs text-white/50">3 monteurs</span>
              </div>
              <div className="space-y-3">
                {[
                  { t: "08:00", k: "Onderhoud cv — Stationsplein 4", s: "Onderweg", c: "bg-orange-500/15 border-orange-500/30 text-orange-300", d: "bg-orange-400" },
                  { t: "10:30", k: "Storing warmtepomp — De Veste 8", s: "Gepland", c: "bg-white/5 border-white/15 text-white/60", d: "bg-white/40" },
                  { t: "13:00", k: "Nieuwbouw meterkast — Kavel 21", s: "Materiaal ✓", c: "bg-green-500/15 border-green-500/30 text-green-300", d: "bg-green-400" },
                ].map((row) => (
                  <div key={row.t} className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <span className="text-sm font-mono text-white/55 w-12 shrink-0">{row.t}</span>
                    <span className="text-sm text-white/85 flex-1 truncate">{row.k}</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${row.c} text-xs font-medium shrink-0`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${row.d}`} /> {row.s}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-orange-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Spoedklus? De planning schuift automatisch mee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRATIS SCAN CTA (vroeg op de pagina, met Jesse) ── */}
      <section id="scan" className="px-6 py-8 md:py-12">
        <div className="max-w-5xl mx-auto rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-600/15 to-amber-600/5 p-7 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-7 md:gap-10">
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden ring-2 ring-orange-500/40 shrink-0">
              <Image src="/jesse.png" alt="Jesse, oprichter van Leadz Systems" fill sizes="120px" className="object-cover object-[50%_30%]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Gratis scan: waar verlies jij tijd?</h2>
              <p className="text-white/75 leading-7">
                In een gesprek van 30 minuten kijkt Jesse met je mee naar je offertes, werkbonnen en planning,
                en vertelt eerlijk waar AI je het meeste tijd bespaart. Geen verkooppraatje.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all font-semibold text-center shadow-lg shadow-orange-500/25"
              >
                Plan de gratis scan
              </a>
              <a
                href={`tel:${SITE.phoneIntl}`}
                className="px-7 py-3.5 rounded-full border border-white/15 hover:border-white/35 hover:bg-white/5 transition-all font-medium text-center text-white/90"
              >
                Of bel {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVEN VOORSTELLEN (warme lichte editorial sectie) ── */}
      <section id="over-ons" className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto rounded-[2rem] bg-[#f4efe6] text-[#1c1a16] overflow-hidden">
          <div className="grid md:grid-cols-5 items-stretch">
            {/* Foto, redactioneel */}
            <div className="relative md:col-span-2 min-h-[320px] md:min-h-[480px]">
              <Image
                src="/jesse.png"
                alt="Jesse, oprichter van Leadz Systems"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={85}
                className="object-cover object-[50%_30%]"
              />
            </div>
            {/* Tekst */}
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-sm font-medium uppercase tracking-wider text-orange-700 mb-4">Even voorstellen</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                &ldquo;Ik bouw tools die op de bouw écht gebruikt worden.&rdquo;
              </h2>
              <p className="text-[#3a362f] text-lg leading-8 mb-4">
                Mijn naam is Jesse. Ik zie dagelijks hoeveel tijd er verdwijnt in offertes, werkbonnen en planning.
                Werk dat moet gebeuren, maar dat je liever niet 's avonds op de bank doet.
              </p>
              <p className="text-[#3a362f] text-lg leading-8 mb-8">
                Daarom bouw ik geen dure pakketten waar je je werkwijze omheen moet buigen, maar tools die aansluiten
                op jouw werkbon, jouw prijslijst en jouw groothandel.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full bg-[#1c1a16] text-[#f4efe6] font-semibold text-center hover:bg-[#2a261f] transition-colors"
                >
                  Plan een gratis scan
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-[#1c1a16]/25 text-[#1c1a16] font-medium text-center hover:bg-[#1c1a16]/5 transition-colors"
                >
                  Stuur een WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASES (swipebaar op mobiel) ── */}
      <section id="cases" className="py-16 md:py-24 px-6 bg-[#15191e] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ons{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                werk
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-8">
              Voorbeelden van wat we bouwen. Elk project is uniek, elke oplossing op maat.
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {PORTFOLIO_ITEMS.map((p) => (
              <div
                key={p.title}
                className="group shrink-0 w-[82%] sm:w-[60%] md:w-auto snap-center p-8 rounded-2xl border border-white/10 bg-[#1a1f25] hover:border-orange-500/40 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium">
                    {p.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <span className="text-sm">→</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3">{p.title}</h3>
                <p className="text-white/70 text-[0.95rem] leading-7 flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {p.stack.map((s) => (
                    <span key={s} className="px-2 py-1 rounded bg-white/5 text-white/55 text-xs font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/50 text-sm mt-8">
            * Voorbeeldprojecten ter illustratie van onze werkwijze
          </p>
        </div>
      </section>

      {/* ── WERKWIJZE ── */}
      <section id="werkwijze" className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Zo werken{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                wij
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-8">
              Van eerste gesprek tot werkende tool. Geen verrassingen, gewoon duidelijkheid.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[calc(10%+1rem)] right-[calc(10%+1rem)] h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
            <div className="grid md:grid-cols-5 gap-8 md:gap-6">
              {STAPPEN.map((s) => (
                <div key={s.nr} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-lg mb-4 relative z-10">
                    {s.nr}
                  </div>
                  <h4 className="font-bold mb-2">{s.title}</h4>
                  <p className="text-white/65 text-sm leading-7">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 px-6 bg-[#15191e] border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Veelgestelde{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                vragen
              </span>
            </h2>
            <p className="text-white/70 text-lg leading-8">De vragen die je waarschijnlijk ook hebt.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-white/10 bg-[#1a1f25] hover:border-orange-500/30 transition-colors"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-semibold text-white/90 group-hover:text-white transition-colors">
                  {faq.q}
                  <span className="text-orange-400 text-xl group-open:rotate-45 transition-transform duration-200 shrink-0 ml-4">+</span>
                </summary>
                <p className="px-6 pb-5 text-white/70 text-[0.95rem] leading-7">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Neem{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                contact op
              </span>
            </h2>
            <p className="text-white/75 text-lg leading-8 mb-8">
              Herken je de problemen? Stuur een bericht en we kijken samen wat haalbaar is.
              Geen verplichtingen, gewoon een eerlijk gesprek.
            </p>
            <div className="space-y-4">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">📧</div>
                <div>
                  <div className="text-sm text-white/55">E-mail</div>
                  <div className="text-white/90 group-hover:text-orange-400 transition-colors">{SITE.email}</div>
                </div>
              </a>
              <a href={`tel:${SITE.phoneIntl}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">📞</div>
                <div>
                  <div className="text-sm text-white/55">Telefoon</div>
                  <div className="text-white/90 group-hover:text-orange-400 transition-colors">{SITE.phone}</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">📍</div>
                <div>
                  <div className="text-sm text-white/55">Locatie</div>
                  <div className="text-white/90">{SITE.region}</div>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ── WHATSAPP FLOATING (desktop) ── */}
      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Stuur Leadz Systems een WhatsApp-bericht"
        title="Stuur ons een WhatsApp-bericht"
        className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] transition-all shadow-lg shadow-black/30 hover:shadow-[#25D366]/40 hover:scale-110 duration-200 items-center justify-center"
      >
        <span className="sr-only">Stuur Leadz Systems een WhatsApp-bericht</span>
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7" aria-hidden="true" focusable="false">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── MOBIELE STICKY CTA-BALK ── */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 flex gap-2 p-3 bg-[#111418]/95 backdrop-blur-md border-t border-white/10">
        <a
          href={`tel:${SITE.phoneIntl}`}
          className="flex-1 py-3 rounded-full border border-white/15 text-white/90 font-medium text-center text-sm"
        >
          📞 Bellen
        </a>
        <a
          href="#contact"
          className="flex-[1.4] py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 font-semibold text-center text-sm shadow-md shadow-orange-500/20"
        >
          Plan gratis scan
        </a>
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Stuur een WhatsApp-bericht"
          className="w-12 shrink-0 rounded-full bg-[#25D366] flex items-center justify-center"
        >
          <span className="sr-only">Stuur een WhatsApp-bericht</span>
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Leadz Systems
          </span>
          <p className="text-white/45 text-sm">
            © {new Date().getFullYear()} Leadz Systems. Alle rechten voorbehouden.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {DIENSTEN.map((d) => (
              <a key={d.slug} href={`/diensten/${d.slug}`} className="text-sm text-white/45 hover:text-white/80 transition-colors">
                {d.title}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
