"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE, PORTFOLIO_ITEMS } from "../lib/content";
import HubFlow from "./HubFlow";
import CalEmbed from "./CalEmbed";

/* ── Data ─────────────────────────────────────────────────────────────── */

const NAV = [
  ["#oplossingen", "Oplossingen"],
  ["#werkwijze", "Werkwijze"],
  ["#cases", "Cases"],
  ["#prijzen", "Prijzen"],
  ["#over", "Over ons"],
];

const TRUST = [
  "Uren minder handmatig werk",
  "Slimmere, snellere processen",
  "Minder fouten, meer overzicht",
  "AI-oplossingen op maat",
];

const PROBLEMS = [
  "Offertes en documenten opstellen",
  "E-mails en aanvragen verwerken",
  "Gegevens overtypen tussen systemen",
  "Klantvragen beantwoorden",
  "Rapportages in elkaar zetten",
  "Leads handmatig opvolgen",
];

const SOLUTIONS = [
  { icon: "process", title: "AI-procesautomatisering", benefit: "Terugkerend werk draait vanzelf, op de achtergrond." },
  { icon: "agent", title: "AI-agents", benefit: "Digitale medewerkers die 24/7 taken afhandelen." },
  { icon: "sales", title: "Sales-automation", benefit: "Elke lead binnen minuten opgevolgd, niets blijft liggen." },
  { icon: "assist", title: "Interne AI-assistent", benefit: "Direct antwoord op basis van jouw eigen kennis." },
  { icon: "dash", title: "Dashboards", benefit: "Al je cijfers in één helder, realtime overzicht." },
  { icon: "code", title: "Maatwerk software", benefit: "Tools gebouwd rond precies jouw werkwijze." },
  { icon: "plug", title: "Integraties", benefit: "Je systemen praten eindelijk met elkaar." },
];

const RESULTS = [
  { label: "Uren terug, elke week", desc: "Repetitief werk verdwijnt naar de achtergrond, zodat je team aan het echte werk toekomt." },
  { label: "Sneller opgevolgd", desc: "Leads, aanvragen en e-mails krijgen binnen minuten reactie in plaats van uren." },
  { label: "Minder fouten", desc: "Geen overtypen, geen gemiste stappen. Data staat overal correct en actueel." },
  { label: "Lagere operationele kosten", desc: "Meer volume aan met hetzelfde team, groeien zonder direct extra personeel." },
  { label: "Meer omzet uit dezelfde stroom", desc: "Geen kans blijft liggen. Elke lead en aanvraag wordt opgepakt en opgevolgd." },
];

const STEPS = [
  { n: "01", t: "Analyse", d: "We brengen je processen in kaart en vinden waar de meeste tijd, fouten en vertraging ontstaan." },
  { n: "02", t: "Strategie", d: "Een helder plan met vaste prijs: wat we bouwen, wat het oplevert en waar we beginnen." },
  { n: "03", t: "Ontwikkeling", d: "We bouwen de oplossing op maat, koppelen je systemen en houden je tussentijds op de hoogte." },
  { n: "04", t: "Implementatie", d: "Live zetten en samen doorlopen met jou en je team, zodat iedereen er direct mee werkt." },
  { n: "05", t: "Optimalisatie", d: "We blijven meekijken, meten en verbeteren. Je AI wordt elke maand een stukje slimmer." },
];

const USPS = [
  { t: "Praktische AI, geen hype", d: "We praten over wat het je oplevert, niet over modellen en frameworks. Alles is bespreekbaar en wordt op maat gemaakt." },
  { t: "Meetbare resultaten", d: "We beginnen bij wat het meeste tijd of omzet kost. Zo zie je snel het verschil, niet pas na maanden." },
  { t: "Persoonlijke begeleiding", d: "Geen accountmanager ertussen. Je werkt direct met Jesse, van het eerste gesprek tot ver na de oplevering." },
  { t: "Continue optimalisatie", d: "AI is nooit af. We blijven je oplossing aanscherpen naarmate je bedrijf groeit en verandert." },
];

const PRICING = [
  {
    name: "AI Starter",
    price: "vanaf €2.500",
    tagline: "Je eerste AI-oplossing live, gericht op je grootste tijdvreter.",
    features: ["Eén proces geautomatiseerd of één AI-agent", "Analyse en implementatie inbegrepen", "Koppeling met je bestaande tools", "Persoonlijke oplevering en uitleg"],
    featured: false,
    cta: "Plan een AI-Scan",
  },
  {
    name: "AI Growth",
    price: "vanaf €5.000",
    tagline: "Meerdere processen, agents en koppelingen die echt meebewegen met je bedrijf.",
    features: ["Meerdere automatiseringen en AI-agents", "Integraties tussen al je systemen", "Realtime dashboard met je cijfers", "Prioriteit en kwartaal-optimalisatie"],
    featured: true,
    cta: "Plan een AI-Scan",
  },
  {
    name: "Enterprise",
    price: "Op maat",
    tagline: "Complexe trajecten over meerdere afdelingen, met dedicated begeleiding.",
    features: ["Onbeperkt processen en agents", "Maatwerk AI-integraties", "Dedicated begeleiding en SLA", "Doorlopende doorontwikkeling"],
    featured: false,
    cta: "Neem contact op",
  },
];

const FAQS = [
  { q: "Wat is een gratis AI-Scan precies?", a: "In een gesprek van 30 minuten kijken we samen naar je processen: waar gaat tijd verloren, wat kost fouten en wat levert het meeste op om aan te pakken. Je krijgt een concreet beeld van wat AI voor je kan betekenen, zonder verplichting." },
  { q: "We weten zelf weinig van AI. Is dat een probleem?", a: "Nee, dat is juist het uitgangspunt. Jij hoeft niets van AI te weten. Wij vertalen de techniek naar oplossingen die gewoon werken, en leggen alles uit in gewone taal." },
  { q: "Werkt dit met onze bestaande systemen?", a: "In de meeste gevallen wel. We koppelen aan veelgebruikte software zoals CRM's, boekhoud- en mailpakketten. Staat jouw systeem er niet tussen? Grote kans dat we het alsnog kunnen koppelen." },
  { q: "Hoe snel zien we resultaat?", a: "De eerste werkende oplossing draait vaak binnen enkele weken. We beginnen altijd bij wat het meeste oplevert, zodat je snel iets in handen hebt en niet pas na maanden." },
  { q: "Wat maakt Leadz Systems anders?", a: "We zijn klein, werken direct en denken mee als partner, niet als leverancier. Geen dure trajecten of dikke offertes, maar praktische AI met meetbaar resultaat en persoonlijke begeleiding." },
  { q: "Wat als het niet oplevert wat we hoopten?", a: "Dan lossen we het op. We leveren pas op als jij tevreden bent, en blijven daarna beschikbaar om te optimaliseren. Denken we onderweg dat een andere route slimmer is, dan zeggen we dat eerlijk." },
];

/* ── Icons ────────────────────────────────────────────────────────────── */

function Icon({ name }: { name: string }) {
  const p = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "process": return <svg {...p}><path d="M4 7h9M4 7l3-3M4 7l3 3" /><path d="M20 17h-9M20 17l-3-3M20 17l-3 3" /><circle cx="18" cy="7" r="2" /><circle cx="6" cy="17" r="2" /></svg>;
    case "agent": return <svg {...p}><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 8V4.6" /><circle cx="12" cy="3.4" r="1.1" /><circle cx="9.6" cy="13" r="1" /><circle cx="14.4" cy="13" r="1" /><path d="M9.5 16.5h5" /></svg>;
    case "sales": return <svg {...p}><path d="M4 18l5-5 3 3 8-8" /><path d="M20 8h-4M20 8v4" /></svg>;
    case "assist": return <svg {...p}><path d="M12 3l1.9 4.6L18.5 9l-3.7 3.2 1.1 4.8L12 14.6 8.1 17l1.1-4.8L5.5 9l4.6-1.4L12 3Z" /></svg>;
    case "dash": return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="2.5" /><path d="M8 15v-3M12 15V9M16 15v-5" /></svg>;
    case "code": return <svg {...p}><path d="M9 8l-4 4 4 4M15 8l4 4-4 4" /></svg>;
    default: return <svg {...p}><circle cx="6" cy="7" r="2.1" /><circle cx="18" cy="7" r="2.1" /><circle cx="12" cy="17" r="2.1" /><path d="M8 7h8M7.4 8.7l3.2 6M16.6 8.7l-3.2 6" /></svg>;
  }
}

const Tick = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="v2-tick"><path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="v2-arrow"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* ── Component ─────────────────────────────────────────────────────────── */

export default function V2Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hours, setHours] = useState(1240);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setHours((h) => h + Math.floor(Math.random() * 3)), 2200);
    return () => window.clearInterval(id);
  }, []);

  const cases = PORTFOLIO_ITEMS.slice(0, 4);

  return (
    <div className="v2">
      {/* ── Nav ── */}
      <header className="v2-nav">
        <div className="v2-nav-inner">
          <div className="v2-nav-row">
            <Link href="/v2" className="v2-brand" aria-label="Leadz Systems">
              <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="v2-logo" priority />
            </Link>
            <nav className="v2-nav-links">
              {NAV.map(([h, l]) => <a key={h} href={h} className="v2-nav-link">{l}</a>)}
            </nav>
            <a href="#contact" className="v2-btn v2-btn-solid v2-nav-cta">Plan gratis AI-Scan</a>
            <button type="button" className="v2-burger" aria-label={menuOpen ? "Menu sluiten" : "Menu openen"} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
              <span className={menuOpen ? "o1" : ""} /><span className={menuOpen ? "o2" : ""} /><span className={menuOpen ? "o3" : ""} />
            </button>
          </div>
          <div className={`v2-mobile${menuOpen ? " open" : ""}`}>
            {NAV.map(([h, l]) => <a key={h} href={h} className="v2-mobile-link" onClick={() => setMenuOpen(false)}>{l}</a>)}
            <a href="#contact" className="v2-btn v2-btn-solid v2-mobile-cta" onClick={() => setMenuOpen(false)}>Plan gratis AI-Scan</a>
          </div>
        </div>
      </header>

      {/* ── 1. Hero ── */}
      <section className="v2-hero">
        <div className="v2-hero-glow" aria-hidden />
        <div className="v2-hero-grid">
          <div className="v2-hero-copy">
            <span className="v2-eyebrow"><span className="v2-dot" aria-hidden />AI-consultancy voor het MKB</span>
            <h1 className="v2-h1">Automatiseer je bedrijfsprocessen met AI en bespaar honderden uren per jaar.</h1>
            <p className="v2-hero-sub">
              Leadz Systems helpt MKB-bedrijven van 5 tot 100 medewerkers om handmatig werk te vervangen door slimme AI.
              Meer gedaan met hetzelfde team, minder fouten en processen die zichzelf draaien, gebouwd rond hoe jij werkt.
            </p>
            <div className="v2-hero-cta">
              <a href="#contact" className="v2-btn v2-btn-solid">Plan gratis AI-Scan<Arrow /></a>
              <a href="#oplossingen" className="v2-btn v2-btn-ghost">Bekijk oplossingen</a>
            </div>
            <p className="v2-hero-note">Vrijblijvend gesprek van 30 minuten. Geen verplichtingen.</p>
          </div>

          <div className="v2-console" aria-hidden>
            <div className="v2-console-head">
              <span className="v2-console-title"><span className="v2-dot v2-dot-live" />Leadz Console</span>
              <span className="v2-console-badge">live</span>
            </div>
            <div className="v2-kpis">
              <div className="v2-kpi">
                <span className="v2-kpi-num">{hours.toLocaleString("nl-NL")}</span>
                <span className="v2-kpi-lab">uren teruggewonnen</span>
              </div>
              <div className="v2-kpi">
                <span className="v2-kpi-num">6</span>
                <span className="v2-kpi-lab">actieve agents</span>
              </div>
              <div className="v2-kpi">
                <span className="v2-kpi-num v2-kpi-mint">99,4%</span>
                <span className="v2-kpi-lab">foutloos verwerkt</span>
              </div>
            </div>
            <div className="v2-agents">
              {[["Leadopvolging", "actief"], ["Offerte-agent", "actief"], ["Factuurverwerking", "verwerkt 12"], ["Rapportage", "gepland 08:00"]].map(([a, s], i) => (
                <div className="v2-agent" key={i}>
                  <span className="v2-agent-dot" />
                  <span className="v2-agent-name">{a}</span>
                  <span className="v2-agent-state">{s}</span>
                </div>
              ))}
            </div>
            <div className="v2-spark">
              {[38, 52, 44, 61, 55, 72, 68, 84, 79, 92].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
            </div>
            <div className="v2-spark-lab"><span>werk afgehandeld</span><span>+34% deze maand</span></div>
          </div>
        </div>
      </section>

      {/* ── 2. Vertrouwen ── */}
      <section className="v2-trust">
        <div className="v2-trust-inner">
          <p className="v2-trust-lead">Gebouwd voor MKB-bedrijven die willen groeien zonder direct meer mensen aan te nemen.</p>
          <div className="v2-trust-row">
            {TRUST.map((t) => <span key={t} className="v2-trust-item"><Tick />{t}</span>)}
          </div>
        </div>
      </section>

      {/* ── 3. Problemen ── */}
      <section className="v2-sec v2-problems">
        <div className="v2-head">
          <span className="v2-kicker">Herkenbaar?</span>
          <h2 className="v2-h2">Besteedt je team nog uren aan werk dat zichzelf zou moeten doen?</h2>
        </div>
        <div className="v2-prob-grid">
          {PROBLEMS.map((p) => (
            <div className="v2-prob" key={p}><span className="v2-prob-x">×</span>{p}</div>
          ))}
        </div>
        <p className="v2-prob-punch">Dat handelt AI in <span className="v2-mark">seconden</span> af, zonder fouten, dag en nacht.</p>
      </section>

      {/* ── 4. Oplossingen ── */}
      <section id="oplossingen" className="v2-sec">
        <div className="v2-head">
          <span className="v2-kicker">Oplossingen</span>
          <h2 className="v2-h2">Slimmere processen, van begin tot eind.</h2>
          <p className="v2-lead">Geen losse tools, maar een samenhangende aanpak: we automatiseren wat tijd kost en koppelen wat los staat.</p>
        </div>
        <div className="v2-sol-grid">
          {SOLUTIONS.map((s) => (
            <article className="v2-sol" key={s.title}>
              <span className="v2-sol-icon"><Icon name={s.icon} /></span>
              <h3 className="v2-sol-title">{s.title}</h3>
              <p className="v2-sol-benefit">{s.benefit}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── 5. AI Agents ── */}
      <section className="v2-sec v2-feature">
        <div className="v2-feature-grid">
          <div className="v2-feature-copy">
            <span className="v2-kicker">AI-agents</span>
            <h2 className="v2-h2">Digitale medewerkers die nooit slapen.</h2>
            <p className="v2-feature-line"><strong>Het probleem.</strong> Leads, e-mails en aanvragen blijven liggen omdat niemand er op tijd bij kan.</p>
            <p className="v2-feature-line"><strong>De oplossing.</strong> Een AI-agent vangt binnenkomend werk op, handelt het af en zet het door naar je systemen, 24/7.</p>
            <p className="v2-feature-line"><strong>Het resultaat.</strong> Elke lead binnen minuten opgevolgd, elke taak afgehandeld, zonder dat je er naar omkijkt.</p>
            <a href="#contact" className="v2-btn v2-btn-solid v2-feature-cta">Zet een agent aan het werk<Arrow /></a>
          </div>
          <div className="v2-feature-visual"><HubFlow /></div>
        </div>
      </section>

      {/* ── 6. Automatiseringen ── */}
      <section className="v2-sec v2-feature v2-feature-alt">
        <div className="v2-feature-grid">
          <div className="v2-feature-visual">
            <div className="v2-flowcard">
              <div className="v2-flowcard-head">automatisering · offerte</div>
              {[["Aanvraag binnengekomen", "done"], ["Gegevens uitgelezen", "done"], ["Prijzen berekend", "done"], ["Offerte opgesteld", "done"], ["Klaargezet voor verzending", "run"]].map(([t, st], i) => (
                <div className="v2-flowrow" key={i}>
                  <span className={`v2-flowrow-ic ${st}`}>{st === "done" ? "✓" : ""}</span>
                  <span>{t}</span>
                </div>
              ))}
              <div className="v2-flowcard-foot">Van aanvraag naar verzendklare offerte in <strong>28 sec</strong></div>
            </div>
          </div>
          <div className="v2-feature-copy">
            <span className="v2-kicker">Procesautomatisering</span>
            <h2 className="v2-h2">Werk dat steeds hetzelfde is, hoort zichzelf te doen.</h2>
            <p className="v2-feature-line"><strong>Het probleem.</strong> Offertes, facturen en rapportages kosten elke week uren aan handwerk.</p>
            <p className="v2-feature-line"><strong>De oplossing.</strong> We automatiseren die processen met AI, van ruwe input tot afgerond document, in jouw huisstijl.</p>
            <p className="v2-feature-line"><strong>Het resultaat.</strong> Uren terug per week, geen overtypfouten en processen die gewoon doorlopen.</p>
            <a href="#contact" className="v2-btn v2-btn-ghost v2-feature-cta">Bespreek jouw processen</a>
          </div>
        </div>
      </section>

      {/* ── 7. Resultaten ── */}
      <section className="v2-sec v2-results">
        <div className="v2-head">
          <span className="v2-kicker">Resultaten</span>
          <h2 className="v2-h2">Wat je ermee wint.</h2>
          <p className="v2-lead">Geen technologie om de technologie. Het gaat om wat er in je bedrijf verandert.</p>
        </div>
        <div className="v2-res-grid">
          {RESULTS.map((r, i) => (
            <article className={`v2-res${i === 0 ? " v2-res-wide" : ""}`} key={r.label}>
              <h3 className="v2-res-label">{r.label}</h3>
              <p className="v2-res-desc">{r.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── 8. Werkwijze ── */}
      <section id="werkwijze" className="v2-sec">
        <div className="v2-head">
          <span className="v2-kicker">Werkwijze</span>
          <h2 className="v2-h2">Van idee naar meetbaar resultaat, in vijf stappen.</h2>
        </div>
        <ol className="v2-steps">
          {STEPS.map((s) => (
            <li className="v2-step" key={s.n}>
              <span className="v2-step-n">{s.n}</span>
              <h3 className="v2-step-t">{s.t}</h3>
              <p className="v2-step-d">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 9. Waarom Leadz ── */}
      <section className="v2-sec v2-why">
        <div className="v2-why-grid">
          <div className="v2-why-head">
            <span className="v2-kicker">Waarom Leadz Systems</span>
            <h2 className="v2-h2">Geen standaard softwarebureau.</h2>
            <p className="v2-lead">We leveren geen pakket waar jij je omheen buigt. We denken mee, bouwen op maat en blijven optimaliseren.</p>
          </div>
          <div className="v2-why-list">
            {USPS.map((u) => (
              <article className="v2-why-item" key={u.t}>
                <span className="v2-why-ic"><Tick /></span>
                <div>
                  <h3 className="v2-why-t">{u.t}</h3>
                  <p className="v2-why-d">{u.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Over Jesse ── */}
      <section id="over" className="v2-sec">
        <div className="v2-about">
          <div className="v2-about-photo">
            <Image src="/jesse-color.png" alt="Jesse, oprichter van Leadz Systems" width={832} height={890} className="v2-about-img" sizes="(max-width:900px) 100vw, 420px" />
          </div>
          <div className="v2-about-copy">
            <span className="v2-kicker">Over Jesse</span>
            <h2 className="v2-h2">De partner die dagelijks met AI werkt.</h2>
            <p className="v2-lead">
              Ik ben Jesse, oprichter van Leadz Systems. Ik werk elke dag met tools als Claude, ChatGPT, Gemini, n8n en
              AI-agents, en vertaal wat daar kan naar praktische oplossingen voor het MKB.
            </p>
            <p className="v2-about-p">
              Geen hype en geen buzzwords, maar toepassingen die echt werk uit handen nemen. Ik geloof in klein beginnen,
              snel iets werkends laten zien en van daaruit doorbouwen, met korte lijnen en directe communicatie.
            </p>
            <div className="v2-about-tools">
              {["Claude", "ChatGPT", "Gemini", "n8n", "AI-agents", "Maatwerk"].map((t) => <span key={t} className="v2-chip">{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Cases ── */}
      <section id="cases" className="v2-sec">
        <div className="v2-head">
          <span className="v2-kicker">Cases</span>
          <h2 className="v2-h2">Echt werk, echt opgeleverd.</h2>
          <p className="v2-lead">Een greep uit wat we bouwden voor ondernemers zoals jij. Elk project op maat, elk probleem concreet opgelost.</p>
        </div>
        <div className="v2-cases">
          {cases.map((c) => (
            <Link key={c.slug} href={`/portfolio/${c.slug}`} className="v2-case">
              <div className="v2-case-shot">
                {c.screenshot && <Image src={c.screenshot} alt={`Screenshot van ${c.title}`} width={1280} height={3200} sizes="(max-width:760px) 100vw, 520px" className="v2-case-img" />}
              </div>
              <div className="v2-case-body">
                <span className="v2-case-tag">{c.tag}</span>
                <h3 className="v2-case-title">{c.title}</h3>
                <p className="v2-case-desc">{c.description}</p>
                <span className="v2-case-link">Bekijk case<Arrow /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 12. Prijzen ── */}
      <section id="prijzen" className="v2-sec">
        <div className="v2-head">
          <span className="v2-kicker">Prijzen</span>
          <h2 className="v2-h2">Investeer in resultaat, niet in uurtjes.</h2>
          <p className="v2-lead">Vaste prijzen, vooraf helder. Je weet precies wat je krijgt en wat het oplevert, voordat we beginnen.</p>
        </div>
        <div className="v2-price-grid">
          {PRICING.map((p) => (
            <article className={`v2-price${p.featured ? " v2-price-hot" : ""}`} key={p.name}>
              {p.featured && <span className="v2-price-badge">Meest gekozen</span>}
              <h3 className="v2-price-name">{p.name}</h3>
              <div className="v2-price-amt">{p.price}</div>
              <p className="v2-price-tag">{p.tagline}</p>
              <ul className="v2-price-list">
                {p.features.map((f) => <li key={f}><Tick />{f}</li>)}
              </ul>
              <a href="#contact" className={`v2-btn ${p.featured ? "v2-btn-solid" : "v2-btn-ghost"} v2-price-cta`}>{p.cta}</a>
            </article>
          ))}
        </div>
        <div className="v2-partner">
          <div>
            <h3 className="v2-partner-t">AI Partner-abonnement</h3>
            <p className="v2-partner-d">Blijf na de oplevering doorontwikkelen. Doorlopende optimalisatie, monitoring en nieuwe automatiseringen, zodat je AI meegroeit met je bedrijf.</p>
          </div>
          <a href="#contact" className="v2-btn v2-btn-ghost">Vraag naar de mogelijkheden</a>
        </div>
      </section>

      {/* ── 13. FAQ ── */}
      <section className="v2-sec v2-faq-sec">
        <div className="v2-head">
          <span className="v2-kicker">Veelgestelde vragen</span>
          <h2 className="v2-h2">Goed om te weten.</h2>
        </div>
        <div className="v2-faq">
          {FAQS.map((f) => (
            <details className="v2-faq-item" key={f.q}>
              <summary className="v2-faq-q">{f.q}<span className="v2-faq-p" aria-hidden>+</span></summary>
              <p className="v2-faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 14. CTA / agenda ── */}
      <section id="contact" className="v2-sec">
        <div className="v2-cta">
          <div className="v2-cta-glow" aria-hidden />
          <div className="v2-cta-copy">
            <span className="v2-kicker">Gratis AI-Scan</span>
            <h2 className="v2-cta-title">Ontdek in 30 minuten wat AI jouw bedrijf oplevert.</h2>
            <p className="v2-lead">We kijken samen waar je nu tijd verliest, welke processen slimmer kunnen en wat een realistische eerste stap is. Vrijblijvend, en we zeggen eerlijk als iets anders slimmer is.</p>
          </div>
          <div id="agenda" className="v2-cal"><CalEmbed calUrl={SITE.cal} /></div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="v2-footer">
        <div className="v2-footer-grid">
          <div className="v2-footer-brand">
            <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="v2-logo" />
            <p>Praktische AI-consultancy en implementatie voor het MKB. Slimmere processen, meetbaar resultaat.</p>
            <p className="v2-footer-copy">© {new Date().getFullYear()} {SITE.name}</p>
          </div>
          <div className="v2-footer-col">
            <h4>Leadz Systems</h4>
            <a href="https://www.linkedin.com/company/leadz-systems/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="v2-footer-col">
            <h4>Bedrijfsgegevens</h4>
            <span>{SITE.name}</span>
            <span>KvK: {SITE.kvk}</span>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      <style>{CSS}</style>
    </div>
  );
}

const CSS = `
.v2{
  --ink:#0E1116; --muted:#5A6172; --faint:#8B93A3;
  --bg:#ffffff; --panel:#F7F8FA; --panel-2:#F1F3F6;
  --line:rgba(14,17,22,.09); --line-2:rgba(14,17,22,.14);
  --amber:#F5A524; --amber-2:#FFC061; --amber-ink:#A2650E; --on-amber:#160F02;
  --mint:#16A34A;
  --edge:24px; --maxw:1180px;
  color:var(--ink); background:var(--bg);
  font-family:var(--font-geist-sans),system-ui,sans-serif; -webkit-font-smoothing:antialiased;
  line-height:1.5;
}
.v2 *{ box-sizing:border-box; }
.v2 a{ text-decoration:none; color:inherit; }

/* Buttons */
.v2-btn{ display:inline-flex; align-items:center; gap:8px; justify-content:center; font-size:15px; font-weight:600; padding:14px 24px; border-radius:12px; cursor:pointer; white-space:nowrap;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease, background-color .2s ease, border-color .2s ease; }
.v2-btn:focus-visible{ outline:2px solid var(--amber-ink); outline-offset:3px; }
.v2-btn-solid{ color:var(--on-amber); border:1px solid rgba(0,0,0,.06); background:linear-gradient(180deg,var(--amber-2),var(--amber)); box-shadow:0 10px 26px -12px rgba(245,165,36,.7); }
.v2-btn-solid:hover{ transform:translateY(-2px); box-shadow:0 16px 34px -12px rgba(245,165,36,.75); }
.v2-btn-ghost{ color:var(--ink); background:#fff; border:1px solid var(--line-2); }
.v2-btn-ghost:hover{ transform:translateY(-2px); border-color:rgba(14,17,22,.28); }
.v2-btn .v2-arrow{ transition:transform .2s cubic-bezier(.34,1.56,.64,1); }
.v2-btn-solid:hover .v2-arrow{ transform:translateX(3px); }
.v2-tick{ color:var(--amber-ink); flex:none; }

/* Nav */
.v2-nav{ position:sticky; top:0; z-index:50; padding:14px var(--edge) 0; display:flex; justify-content:center; background:linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,0)); }
.v2-nav-inner{ width:100%; max-width:var(--maxw); border:1px solid var(--line); border-radius:16px; background:rgba(255,255,255,.8); backdrop-filter:blur(14px); box-shadow:0 12px 30px -20px rgba(14,17,22,.25); overflow:hidden; }
.v2-nav-row{ display:flex; align-items:center; justify-content:space-between; gap:24px; padding:12px 14px 12px 20px; }
.v2-logo{ height:22px; width:auto; object-fit:contain; filter:brightness(0); opacity:.9; }
.v2-nav-links{ display:none; align-items:center; gap:28px; }
.v2-nav-link{ font-size:14.5px; color:var(--muted); border-radius:6px; transition:color .18s ease; }
.v2-nav-link:hover{ color:var(--ink); }
.v2-nav-link:focus-visible{ outline:2px solid var(--amber-ink); outline-offset:4px; }
.v2-nav .v2-nav-cta{ display:none; padding:11px 18px; }
.v2-burger{ display:inline-flex; flex-direction:column; gap:5px; width:42px; height:42px; align-items:center; justify-content:center; margin:-6px -8px -6px 0; border:0; background:transparent; cursor:pointer; border-radius:10px; }
.v2-burger span{ width:22px; height:2px; border-radius:2px; background:var(--ink); transition:transform .25s cubic-bezier(.22,1,.36,1), opacity .2s ease; }
.v2-burger .o1{ transform:translateY(7px) rotate(45deg); } .v2-burger .o2{ opacity:0; } .v2-burger .o3{ transform:translateY(-7px) rotate(-45deg); }
.v2-burger:focus-visible{ outline:2px solid var(--amber-ink); outline-offset:2px; }
.v2-mobile{ max-height:0; overflow:hidden; transition:max-height .32s cubic-bezier(.22,1,.36,1); }
.v2-mobile.open{ max-height:360px; }
.v2-mobile-link{ display:block; padding:13px 20px; font-size:15px; color:var(--ink); border-top:1px solid var(--line); }
.v2-mobile-cta{ margin:14px 20px 18px; }
@media(min-width:900px){ .v2-nav-links{ display:flex; } .v2-nav .v2-nav-cta{ display:inline-flex; } .v2-burger{ display:none; } .v2-mobile{ display:none; } }

/* Sections */
.v2-sec{ max-width:var(--maxw); margin:0 auto; padding:112px var(--edge); }
@media(max-width:700px){ .v2-sec{ padding:80px var(--edge); } }
.v2-head{ max-width:720px; margin-bottom:56px; }
.v2-kicker{ display:inline-block; font-family:var(--font-geist-mono),monospace; font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:var(--amber-ink); margin-bottom:18px; }
.v2-h2{ font-family:var(--font-bricolage),sans-serif; font-weight:800; letter-spacing:-.03em; line-height:1.04; font-size:clamp(2rem,4.4vw,3.2rem); text-wrap:balance; }
.v2-lead{ margin-top:18px; color:var(--muted); font-size:clamp(1.05rem,1.5vw,1.2rem); line-height:1.65; max-width:40rem; }
.v2-mark{ color:var(--amber-ink); }

/* Hero */
.v2-hero{ position:relative; max-width:var(--maxw); margin:0 auto; padding:80px var(--edge) 40px; overflow:hidden; }
.v2-hero-glow{ position:absolute; top:-160px; right:-120px; width:720px; height:720px; border-radius:999px; z-index:0; pointer-events:none;
  background:radial-gradient(circle, rgba(245,165,36,.16) 0%, transparent 62%); }
.v2-hero-grid{ position:relative; z-index:1; display:grid; grid-template-columns:1fr; gap:56px; align-items:center; }
@media(min-width:980px){ .v2-hero-grid{ grid-template-columns:1.05fr .95fr; gap:64px; } .v2-hero{ padding-top:96px; } }
.v2-eyebrow{ display:inline-flex; align-items:center; gap:9px; font-family:var(--font-geist-mono),monospace; font-size:12.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); padding:7px 14px; border:1px solid var(--line); border-radius:999px; background:#fff; }
.v2-dot{ width:7px; height:7px; border-radius:999px; background:var(--amber); }
.v2-dot-live{ background:var(--mint); box-shadow:0 0 0 0 rgba(22,163,74,.5); animation:v2pulse 2.4s ease-out infinite; }
.v2-h1{ font-family:var(--font-bricolage),sans-serif; font-weight:800; letter-spacing:-.035em; line-height:1.02; font-size:clamp(2.6rem,5.6vw,4.4rem); margin:22px 0 0; text-wrap:balance; }
.v2-hero-sub{ margin:24px 0 0; color:var(--muted); font-size:clamp(1.08rem,1.6vw,1.24rem); line-height:1.6; max-width:38rem; }
.v2-hero-cta{ display:flex; flex-wrap:wrap; gap:12px; margin-top:34px; }
.v2-hero-note{ margin-top:18px; font-family:var(--font-geist-mono),monospace; font-size:12.5px; color:var(--faint); }

/* Console visual */
.v2-console{ border:1px solid var(--line-2); border-radius:22px; overflow:hidden; background:linear-gradient(180deg,#fff,#FAFBFC);
  box-shadow:0 40px 80px -44px rgba(14,17,22,.4), 0 1px 0 rgba(255,255,255,.9) inset; }
.v2-console-head{ display:flex; align-items:center; justify-content:space-between; padding:16px 18px; border-bottom:1px solid var(--line); }
.v2-console-title{ display:inline-flex; align-items:center; gap:9px; font-weight:600; font-size:14.5px; }
.v2-console-badge{ font-family:var(--font-geist-mono),monospace; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--mint); background:rgba(22,163,74,.1); border:1px solid rgba(22,163,74,.28); padding:4px 9px; border-radius:999px; }
.v2-kpis{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; padding:18px; }
.v2-kpi{ background:var(--panel); border:1px solid var(--line); border-radius:14px; padding:14px; display:flex; flex-direction:column; gap:4px; }
.v2-kpi-num{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:1.5rem; letter-spacing:-.02em; font-variant-numeric:tabular-nums; }
.v2-kpi-mint{ color:var(--mint); }
.v2-kpi-lab{ font-size:11.5px; color:var(--faint); line-height:1.3; }
.v2-agents{ padding:0 18px; display:flex; flex-direction:column; }
.v2-agent{ display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:12px; padding:12px 0; border-top:1px solid var(--line); font-size:14px; }
.v2-agent-dot{ width:8px; height:8px; border-radius:999px; background:var(--amber); box-shadow:0 0 8px var(--amber); }
.v2-agent-name{ color:var(--ink); }
.v2-agent-state{ font-family:var(--font-geist-mono),monospace; font-size:11.5px; color:var(--faint); }
.v2-spark{ display:flex; align-items:flex-end; gap:6px; height:64px; padding:18px 18px 6px; }
.v2-spark span{ flex:1; background:linear-gradient(180deg,var(--amber-2),var(--amber)); border-radius:4px 4px 0 0; opacity:.9; }
.v2-spark-lab{ display:flex; justify-content:space-between; padding:0 18px 18px; font-family:var(--font-geist-mono),monospace; font-size:11.5px; color:var(--faint); }
.v2-spark-lab span:last-child{ color:var(--mint); }

/* Trust */
.v2-trust{ border-block:1px solid var(--line); background:var(--panel); }
.v2-trust-inner{ max-width:var(--maxw); margin:0 auto; padding:40px var(--edge); display:flex; flex-direction:column; gap:22px; align-items:flex-start; }
.v2-trust-lead{ font-size:1.05rem; color:var(--ink); font-weight:500; }
.v2-trust-row{ display:flex; flex-wrap:wrap; gap:14px 28px; }
.v2-trust-item{ display:inline-flex; align-items:center; gap:9px; font-size:.98rem; color:var(--muted); }

/* Problemen */
.v2-prob-grid{ display:grid; grid-template-columns:1fr; gap:12px; }
@media(min-width:640px){ .v2-prob-grid{ grid-template-columns:1fr 1fr; } }
@media(min-width:900px){ .v2-prob-grid{ grid-template-columns:1fr 1fr 1fr; } }
.v2-prob{ display:flex; align-items:center; gap:14px; padding:18px 20px; border:1px solid var(--line); border-radius:14px; background:#fff; font-size:1.02rem; color:var(--ink); }
.v2-prob-x{ width:26px; height:26px; flex:none; display:inline-flex; align-items:center; justify-content:center; border-radius:8px; background:var(--panel-2); color:var(--faint); font-size:16px; }
.v2-prob-punch{ margin-top:40px; font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:clamp(1.5rem,3vw,2.2rem); letter-spacing:-.02em; }

/* Oplossingen */
.v2-sol-grid{ display:grid; grid-template-columns:1fr; gap:16px; }
@media(min-width:640px){ .v2-sol-grid{ grid-template-columns:1fr 1fr; } }
@media(min-width:980px){ .v2-sol-grid{ grid-template-columns:1fr 1fr 1fr; } }
.v2-sol{ padding:28px; border:1px solid var(--line); border-radius:18px; background:#fff; transition:transform .3s cubic-bezier(.22,1,.36,1), border-color .3s ease, box-shadow .3s ease; }
.v2-sol:hover{ transform:translateY(-4px); border-color:color-mix(in srgb, var(--amber) 40%, var(--line-2)); box-shadow:0 30px 50px -34px rgba(14,17,22,.3); }
.v2-sol-icon{ display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:12px; color:var(--amber-ink); background:color-mix(in srgb, var(--amber) 12%, transparent); border:1px solid color-mix(in srgb, var(--amber) 26%, transparent); }
.v2-sol-title{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.2rem; letter-spacing:-.01em; margin-top:18px; }
.v2-sol-benefit{ margin-top:8px; color:var(--muted); font-size:.98rem; line-height:1.6; }

/* Feature (AI Agents / Automatisering) */
.v2-feature-grid{ display:grid; grid-template-columns:1fr; gap:48px; align-items:center; }
@media(min-width:980px){ .v2-feature-grid{ grid-template-columns:1fr 1fr; gap:72px; } }
.v2-feature-line{ margin-top:16px; color:var(--muted); font-size:1.05rem; line-height:1.65; max-width:34rem; }
.v2-feature-line strong{ color:var(--ink); font-weight:600; }
.v2-feature-cta{ margin-top:30px; }
.v2-feature-alt .v2-feature-visual{ order:-1; }
@media(min-width:980px){ .v2-feature-alt .v2-feature-visual{ order:0; } }
.v2-flowcard{ border:1px solid var(--line-2); border-radius:20px; background:#fff; padding:22px; box-shadow:0 40px 80px -50px rgba(14,17,22,.4); }
.v2-flowcard-head{ font-family:var(--font-geist-mono),monospace; font-size:12.5px; color:var(--faint); padding-bottom:14px; border-bottom:1px solid var(--line); }
.v2-flowrow{ display:flex; align-items:center; gap:12px; padding:13px 0; border-top:1px solid var(--line); font-size:.98rem; }
.v2-flowrow:first-of-type{ border-top:0; }
.v2-flowrow-ic{ width:22px; height:22px; flex:none; display:inline-flex; align-items:center; justify-content:center; border-radius:7px; font-size:13px; }
.v2-flowrow-ic.done{ color:var(--mint); background:rgba(22,163,74,.12); border:1px solid rgba(22,163,74,.28); }
.v2-flowrow-ic.run{ background:conic-gradient(var(--amber) 25%, rgba(245,165,36,.2) 0); }
.v2-flowcard-foot{ margin-top:14px; padding-top:16px; border-top:1px solid var(--line); font-size:.92rem; color:var(--muted); }
.v2-flowcard-foot strong{ color:var(--amber-ink); }

/* Resultaten */
.v2-res-grid{ display:grid; grid-template-columns:1fr; gap:16px; }
@media(min-width:760px){ .v2-res-grid{ grid-template-columns:1fr 1fr; } }
.v2-res{ padding:30px; border:1px solid var(--line); border-radius:18px; background:linear-gradient(180deg,#fff,#FAFBFC); }
.v2-res-wide{ grid-column:1/-1; background:linear-gradient(120deg, color-mix(in srgb, var(--amber) 10%, #fff), #fff); border-color:color-mix(in srgb, var(--amber) 26%, var(--line)); }
.v2-res-label{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:1.5rem; letter-spacing:-.02em; }
.v2-res-desc{ margin-top:10px; color:var(--muted); font-size:1rem; line-height:1.6; max-width:34rem; }

/* Werkwijze */
.v2-steps{ list-style:none; margin:0; padding:0; display:grid; grid-template-columns:1fr; gap:0; }
.v2-step{ padding:28px 0; border-top:1px solid var(--line); display:grid; grid-template-columns:1fr; gap:8px; }
.v2-step:last-child{ border-bottom:1px solid var(--line); }
.v2-step-n{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:1.4rem; color:transparent; -webkit-text-stroke:1.3px color-mix(in srgb, var(--amber) 75%, transparent); }
.v2-step-t{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.3rem; letter-spacing:-.01em; }
.v2-step-d{ color:var(--muted); font-size:1.02rem; line-height:1.6; max-width:46rem; }
@media(min-width:860px){ .v2-step{ grid-template-columns:120px 240px 1fr; align-items:baseline; gap:32px; padding:34px 0; } .v2-step-n{ font-size:2.2rem; } }

/* Waarom */
.v2-why-grid{ display:grid; grid-template-columns:1fr; gap:48px; }
@media(min-width:980px){ .v2-why-grid{ grid-template-columns:.85fr 1.15fr; gap:64px; } }
.v2-why-list{ display:grid; grid-template-columns:1fr; gap:14px; }
@media(min-width:620px){ .v2-why-list{ grid-template-columns:1fr 1fr; } }
.v2-why-item{ display:flex; gap:14px; padding:24px; border:1px solid var(--line); border-radius:16px; background:#fff; }
.v2-why-ic{ flex:none; width:34px; height:34px; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; color:var(--amber-ink); background:color-mix(in srgb, var(--amber) 12%, transparent); border:1px solid color-mix(in srgb, var(--amber) 26%, transparent); }
.v2-why-t{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.1rem; }
.v2-why-d{ margin-top:7px; color:var(--muted); font-size:.96rem; line-height:1.6; }

/* Over */
.v2-about{ display:grid; grid-template-columns:1fr; gap:48px; align-items:center; }
@media(min-width:900px){ .v2-about{ grid-template-columns:420px 1fr; gap:64px; } }
.v2-about-photo{ border-radius:22px; overflow:hidden; border:1px solid var(--line-2); background:var(--panel); max-width:440px; box-shadow:0 40px 80px -50px rgba(14,17,22,.4); }
.v2-about-img{ display:block; width:100%; height:auto; }
.v2-about-p{ margin-top:16px; color:var(--muted); font-size:1.02rem; line-height:1.65; max-width:36rem; }
.v2-about-tools{ display:flex; flex-wrap:wrap; gap:8px; margin-top:26px; }
.v2-chip{ font-family:var(--font-geist-mono),monospace; font-size:12px; color:var(--muted); padding:7px 13px; border:1px solid var(--line-2); border-radius:999px; background:#fff; }

/* Cases */
.v2-cases{ display:grid; grid-template-columns:1fr; gap:22px; }
@media(min-width:760px){ .v2-cases{ grid-template-columns:1fr 1fr; } }
.v2-case{ display:flex; flex-direction:column; border:1px solid var(--line); border-radius:20px; overflow:hidden; background:#fff; transition:transform .3s cubic-bezier(.22,1,.36,1), border-color .3s ease, box-shadow .3s ease; }
.v2-case:hover{ transform:translateY(-4px); border-color:color-mix(in srgb, var(--amber) 40%, var(--line-2)); box-shadow:0 34px 60px -40px rgba(14,17,22,.4); }
.v2-case:focus-visible{ outline:2px solid var(--amber-ink); outline-offset:3px; }
.v2-case-shot{ height:260px; overflow:hidden; background:var(--panel); border-bottom:1px solid var(--line); }
.v2-case-img{ display:block; width:100%; height:auto; }
.v2-case-body{ padding:26px; }
.v2-case-tag{ display:inline-block; font-family:var(--font-geist-mono),monospace; font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--amber-ink); padding:4px 10px; border-radius:999px; border:1px solid color-mix(in srgb,var(--amber-ink) 30%, transparent); }
.v2-case-title{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.32rem; letter-spacing:-.01em; margin-top:14px; }
.v2-case-desc{ margin-top:10px; color:var(--muted); font-size:.98rem; line-height:1.6; }
.v2-case-link{ display:inline-flex; align-items:center; gap:7px; margin-top:18px; font-weight:600; font-size:.95rem; color:var(--amber-ink); }

/* Prijzen */
.v2-price-grid{ display:grid; grid-template-columns:1fr; gap:20px; align-items:stretch; }
@media(min-width:900px){ .v2-price-grid{ grid-template-columns:repeat(3,1fr); } }
.v2-price{ position:relative; display:flex; flex-direction:column; padding:32px; border:1px solid var(--line); border-radius:22px; background:#fff; box-shadow:0 30px 60px -50px rgba(14,17,22,.35); }
.v2-price-hot{ border-color:color-mix(in srgb, var(--amber) 55%, var(--line-2)); box-shadow:0 34px 70px -40px rgba(245,165,36,.5); }
@media(min-width:900px){ .v2-price-hot{ transform:translateY(-12px); } }
.v2-price-badge{ position:absolute; top:-12px; left:32px; font-family:var(--font-geist-mono),monospace; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:var(--on-amber); padding:5px 12px; border-radius:999px; background:linear-gradient(180deg,var(--amber-2),var(--amber)); box-shadow:0 8px 18px -8px rgba(245,165,36,.7); }
.v2-price-name{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.3rem; }
.v2-price-amt{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:2rem; letter-spacing:-.02em; margin-top:12px; }
.v2-price-tag{ margin-top:14px; color:var(--muted); font-size:.98rem; line-height:1.55; }
.v2-price-list{ list-style:none; margin:24px 0; padding:0; display:flex; flex-direction:column; gap:12px; flex:1; }
.v2-price-list li{ display:flex; align-items:flex-start; gap:11px; font-size:.96rem; color:var(--ink); line-height:1.45; }
.v2-price-cta{ width:100%; }
.v2-partner{ margin-top:22px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:22px; padding:30px 34px; border:1px solid var(--line-2); border-radius:20px;
  background:linear-gradient(120deg, color-mix(in srgb, var(--amber) 10%, #fff), #fff); }
.v2-partner-t{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.25rem; }
.v2-partner-d{ margin-top:8px; color:var(--muted); font-size:.98rem; line-height:1.6; max-width:46rem; }

/* FAQ */
.v2-faq{ border-top:1px solid var(--line); }
.v2-faq-item{ border-bottom:1px solid var(--line); }
.v2-faq-q{ display:flex; align-items:center; justify-content:space-between; gap:24px; padding:24px 4px; cursor:pointer; list-style:none;
  font-family:var(--font-bricolage),sans-serif; font-weight:600; font-size:1.15rem; letter-spacing:-.01em; }
.v2-faq-q::-webkit-details-marker{ display:none; }
.v2-faq-q:focus-visible{ outline:2px solid var(--amber-ink); outline-offset:3px; border-radius:6px; }
.v2-faq-p{ flex:none; width:32px; height:32px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; font-size:20px; color:var(--amber-ink); border:1px solid var(--line-2); transition:transform .25s ease, background-color .2s ease; }
.v2-faq-item[open] .v2-faq-p{ transform:rotate(45deg); background:color-mix(in srgb, var(--amber) 12%, transparent); }
.v2-faq-a{ padding:0 4px 26px; color:var(--muted); font-size:1.02rem; line-height:1.7; max-width:52rem; }

/* CTA */
.v2-cta{ position:relative; overflow:hidden; border:1px solid var(--line-2); border-radius:28px; padding:56px; background:linear-gradient(180deg,#fff,#FAFBFC); box-shadow:0 40px 90px -56px rgba(14,17,22,.45);
  display:grid; grid-template-columns:1fr; gap:40px; align-items:start; }
@media(min-width:980px){ .v2-cta{ grid-template-columns:.85fr 1.15fr; gap:56px; } }
@media(max-width:600px){ .v2-cta{ padding:34px 22px; } }
.v2-cta-glow{ position:absolute; top:-120px; left:-80px; width:520px; height:520px; border-radius:999px; z-index:0; pointer-events:none; background:radial-gradient(circle, rgba(245,165,36,.2) 0%, transparent 62%); }
.v2-cta-copy{ position:relative; z-index:1; }
.v2-cta-title{ font-family:var(--font-bricolage),sans-serif; font-weight:800; letter-spacing:-.03em; line-height:1.06; font-size:clamp(1.8rem,3.6vw,2.6rem); text-wrap:balance; }
.v2-cta-copy .v2-lead{ margin-top:20px; }
.v2-cal{ position:relative; z-index:1; border:1px solid var(--line-2); border-radius:18px; overflow:hidden; background:#fff; box-shadow:0 20px 50px -40px rgba(14,17,22,.4); }

/* Footer */
.v2-footer{ border-top:1px solid var(--line); background:var(--panel); }
.v2-footer-grid{ max-width:var(--maxw); margin:0 auto; padding:64px var(--edge); display:grid; grid-template-columns:1fr; gap:40px; }
@media(min-width:760px){ .v2-footer-grid{ grid-template-columns:1.6fr 1fr 1fr; } }
.v2-footer .v2-logo{ height:24px; }
.v2-footer-brand p{ margin-top:16px; color:var(--muted); font-size:.95rem; line-height:1.6; max-width:22rem; }
.v2-footer-copy{ margin-top:18px !important; color:var(--faint) !important; font-size:.88rem !important; }
.v2-footer-col h4{ font-size:.95rem; font-weight:600; color:var(--ink); margin-bottom:16px; }
.v2-footer-col a, .v2-footer-col span{ display:block; color:var(--muted); font-size:.95rem; line-height:1.5; margin-bottom:10px; }
.v2-footer-col a{ transition:color .18s ease; }
.v2-footer-col a:hover{ color:var(--amber-ink); }

@keyframes v2pulse{ 0%{ box-shadow:0 0 0 0 rgba(22,163,74,.5);} 70%{ box-shadow:0 0 0 8px rgba(22,163,74,0);} 100%{ box-shadow:0 0 0 0 rgba(22,163,74,0);} }

@media(prefers-reduced-motion:reduce){
  .v2-btn,.v2-arrow,.v2-sol,.v2-case,.v2-nav-link,.v2-burger span,.v2-mobile,.v2-faq-p,.v2-dot-live{ transition:none; animation:none; }
}
`;
