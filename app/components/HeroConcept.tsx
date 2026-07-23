"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SITE, DIENSTEN, PORTFOLIO_ITEMS, FAQS } from "../lib/content";
import CalEmbed from "./CalEmbed";
import LogoLoop from "./ui/LogoLoop";
import {
  SiClaude, SiGooglegemini, SiZapier, SiMake, SiN8N, SiHubspot, SiNotion,
  SiSupabase, SiStripe, SiWhatsapp, SiAirtable, SiGmail, SiGithub,
} from "react-icons/si";
import { FaSlack, FaGoogle, FaMicrosoft } from "react-icons/fa6";

/* Echte merk-logo's voor de LogoLoop onder de hero. */
const TOOL_LOGOS = [
  { node: <SiClaude title="Claude" />, title: "Claude" },
  { node: <SiGooglegemini title="Google Gemini" />, title: "Gemini" },
  { node: <FaGoogle title="Google Workspace" />, title: "Google Workspace" },
  { node: <FaMicrosoft title="Microsoft 365" />, title: "Microsoft 365" },
  { node: <SiHubspot title="HubSpot" />, title: "HubSpot" },
  { node: <SiZapier title="Zapier" />, title: "Zapier" },
  { node: <SiMake title="Make" />, title: "Make" },
  { node: <SiN8N title="n8n" />, title: "n8n" },
  { node: <FaSlack title="Slack" />, title: "Slack" },
  { node: <SiNotion title="Notion" />, title: "Notion" },
  { node: <SiAirtable title="Airtable" />, title: "Airtable" },
  { node: <SiGmail title="Gmail" />, title: "Gmail" },
  { node: <SiSupabase title="Supabase" />, title: "Supabase" },
  { node: <SiStripe title="Stripe" />, title: "Stripe" },
  { node: <SiWhatsapp title="WhatsApp" />, title: "WhatsApp" },
  { node: <SiGithub title="GitHub" />, title: "GitHub" },
];

/* Werkwijze — 4 steps, copy matches the live leadzsystems.nl site. */
const WERKWIJZE = [
  { week: "Week 1", title: "Analyse", icon: "search", desc: "We brengen je processen in kaart en berekenen waar AI de meeste tijd en kosten bespaart.", krijgt: "Een helder overzicht van je grootste tijdvreters" },
  { week: "Week 2", title: "Strategie", icon: "map", desc: "Je krijgt een concreet plan: welke processen we automatiseren, in welke volgorde en wat het oplevert.", krijgt: "Een concreet plan met vaste prijs vooraf" },
  { week: "Week 3–6", title: "Ontwikkeling", icon: "build", desc: "We bouwen je AI-agents en workflows op maat en testen ze grondig met jouw eigen data.", krijgt: "Werkende software, getest met je eigen data" },
  { week: "Week 6–8", title: "Implementatie", icon: "rocket", desc: "We rollen alles gecontroleerd uit en trainen je team, zodat iedereen ermee kan werken.", krijgt: "Alles live, je team getraind en aan de slag" },
  { week: "Doorlopend", title: "Optimalisatie", icon: "cycle", desc: "We houden de boel in de gaten en schaven bij waar het beter kan. Wat vandaag werkt, kan volgende maand slimmer.", krijgt: "We blijven meekijken, ook na livegang" },
];

const GARANTIES = [
  { icon: "scan", title: "Eerst inzicht, dan pas een beslissing", desc: "Je krijgt een concreet voorstel met de verwachte besparing erbij, nog voordat je iets tekent. Zo weet je vooraf of het zich terugbetaalt." },
  { icon: "tag", title: "Eén prijs, vooraf afgesproken", desc: "Geen losse uurtjes die achteraf oplopen. De prijs waar we het over eens worden, is de prijs die op de factuur staat." },
  { icon: "chat", title: "Rechtstreeks contact, geen tussenpersoon", desc: "Je schakelt met mij, niet met een accountmanager die het weer moet doorvertalen. Van het eerste gesprek tot ver na oplevering." },
  { icon: "shield", title: "We ronden pas af als jij tevreden bent", desc: "Een fase is pas klaar als het écht werkt zoals afgesproken. Geen halve opleveringen om maar te kunnen factureren." },
];

function GarantieIcon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "scan":
      return (<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...p}><path d="M4 8V5a1 1 0 0 1 1-1h3" /><path d="M20 8V5a1 1 0 0 0-1-1h-3" /><path d="M4 16v3a1 1 0 0 0 1 1h3" /><path d="M20 16v3a1 1 0 0 1-1 1h-3" /><circle cx="12" cy="12" r="3.2" /></svg>);
    case "tag":
      return (<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...p}><path d="M12.6 3.5H6a1.5 1.5 0 0 0-1.5 1.5v6.6c0 .4.16.78.44 1.06l8.9 8.9a1.5 1.5 0 0 0 2.12 0l6.6-6.6a1.5 1.5 0 0 0 0-2.12l-8.9-8.9a1.5 1.5 0 0 0-1.06-.44z" /><circle cx="9" cy="9" r="1.3" fill="currentColor" stroke="none" /></svg>);
    case "chat":
      return (<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...p}><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4H5.5A1.5 1.5 0 0 1 4 14.5z" /></svg>);
    case "shield":
      return (<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...p}><path d="M12 3.5 5 6v6c0 4.6 3 7.9 7 9 4-1.1 7-4.4 7-9V6z" /><path d="M9 12.2l2.1 2.1L15.5 10" /></svg>);
    default:
      return null;
  }
}

/* Trust stats — from the live site. */
const STATS = [
  { num: "50+", label: "tools en systemen waar we direct mee koppelen" },
  { num: "3 weken", label: "gemiddelde doorlooptijd van idee tot live" },
  { num: "100%", label: "tevredenheidsgarantie, we stoppen pas als jij blij bent" },
];


/* Hero-flow: drie statische stappen die tonen hoe een agent tot een resultaat komt.
   Bewust geen live-tellende simulatie — een eerlijke illustratie, geen nepdata. */
const FLOW_STEPS = [
  { icon: "inbox", title: "Digitale collega", sub: "Leest mee en pakt het op", example: "Aanvraag binnen · om 23:14 al beantwoord" },
  { icon: "link", title: "Automatisering", sub: "Zet je systemen aan het werk", example: "CRM bijgewerkt · offerte klaargezet" },
  { icon: "chart", title: "Bedrijfsresultaat", sub: "Je ziet het terug in je week", example: "Maandagochtend · overzicht staat klaar" },
];

function FlowIcon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "inbox":
      return (<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...p}><path d="M4 12h4l1.5 2.5h5L16 12h4" /><path d="M5.5 6h13L20 12v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6z" /></svg>);
    case "link":
      return (<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...p}><path d="M9 15 15 9" /><path d="M10.5 6.5 12 5a3.5 3.5 0 0 1 5 5l-1.5 1.5" /><path d="M13.5 17.5 12 19a3.5 3.5 0 0 1-5-5l1.5-1.5" /></svg>);
    case "chart":
      return (<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...p}><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 15 4-4 3 3 5-6" /><path d="M15 8h4v4" /></svg>);
    default:
      return null;
  }
}

/* Palette variants — same layout, only the accent + its readable text colour change.
   Amber is the chosen brand accent; ?p=iris | ?p=teal stay available for comparison. */
const PALETTES: Record<string, React.CSSProperties> = {
  amber: {
    ["--iris" as string]: "#F5A524",
    ["--iris-2" as string]: "#FFC061",
    ["--iris-glow" as string]: "rgba(245,165,36,.5)",
    ["--on-accent" as string]: "#160F02",
  },
  iris: {
    ["--iris" as string]: "#6E5BF6",
    ["--iris-2" as string]: "#8B7BFF",
    ["--iris-glow" as string]: "rgba(110,91,246,.55)",
    ["--on-accent" as string]: "#ffffff",
  },
  teal: {
    ["--iris" as string]: "#22C7B4",
    ["--iris-2" as string]: "#5AE6D6",
    ["--iris-glow" as string]: "rgba(34,199,180,.48)",
    ["--on-accent" as string]: "#02110E",
  },
};

/* Minimal line-glyphs per service — custom marks instead of generic emoji. */
function DienstIcon({ slug }: { slug: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (slug) {
    case "ai-agents":
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="8" width="14" height="11" rx="3" />
          <path d="M12 8V4.6" />
          <circle cx="12" cy="3.4" r="1.1" />
          <circle cx="9.6" cy="13" r="1" />
          <circle cx="14.4" cy="13" r="1" />
          <path d="M9.5 16.5h5" />
        </svg>
      );
    case "ai-automatisering":
      return (
        <svg {...common} aria-hidden>
          <path d="M13 3 5.5 13H11l-1 8 8.5-11H13l1-7Z" />
        </svg>
      );
    case "websites-webapps":
      return (
        <svg {...common} aria-hidden>
          <rect x="4" y="5" width="16" height="14" rx="2.5" />
          <path d="M4 9h16" />
          <circle cx="6.8" cy="7" r=".5" />
          <circle cx="8.6" cy="7" r=".5" />
        </svg>
      );
    default: // integraties-dashboards
      return (
        <svg {...common} aria-hidden>
          <circle cx="6" cy="7" r="2.1" />
          <circle cx="18" cy="7" r="2.1" />
          <circle cx="12" cy="17" r="2.1" />
          <path d="M8 7h8M7.4 8.7l3.2 6M16.6 8.7l-3.2 6" />
        </svg>
      );
  }
}

export default function HeroConcept() {
  const [palette, setPalette] = useState<React.CSSProperties>({});
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [bg, setBg] = useState<"mesh" | "flow" | "nodes" | "contour" | "dots">("mesh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [workFilter, setWorkFilter] = useState("Alles");
  // Besparingscalculator — invoer
  const [calcPeople, setCalcPeople] = useState(3);
  const [calcHours, setCalcHours] = useState(8);
  const [calcWage, setCalcWage] = useState(45);
  const rootRef = useRef<HTMLDivElement>(null);

  // ── Palet & thema uit URL-parameters (?p=amber|iris|teal, ?t=dark|light, ?bg=...) ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p") ?? "amber";
    setPalette(PALETTES[p] ?? PALETTES.amber);
    if (params.get("t") === "dark") setTheme("dark");
    else if (params.get("t") === "light") setTheme("light");
    const b = params.get("bg");
    if (b === "mesh" || b === "flow" || b === "nodes" || b === "contour" || b === "dots") setBg(b);
  }, []);

  // ── Scroll reveal ──
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".lz-reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const year = new Date().getFullYear();

  // Besparingscalculator — afgeleide waarden (70% automatiseringswinst op terugkerend handwerk)
  const SAVE_FACTOR = 0.7;
  const savedHrsWeek = calcPeople * calcHours * SAVE_FACTOR;
  const euroWeek = savedHrsWeek * calcWage;
  // Harde spatie ( ) na het euroteken, zodat bedrag en teken nooit los afbreken.
  const fmtEuro = (n: number) => "€ " + Math.round(n).toLocaleString("nl-NL");
  const fmtHrs = (n: number) => Math.round(n).toLocaleString("nl-NL") + " uur";
  const savings = [
    { label: "Per week", euro: euroWeek, hrs: savedHrsWeek },
    { label: "Per maand", euro: (euroWeek * 52) / 12, hrs: (savedHrsWeek * 52) / 12 },
    { label: "Per jaar", euro: euroWeek * 52, hrs: savedHrsWeek * 52, feat: true },
  ];
  const clampStep =
    (setter: React.Dispatch<React.SetStateAction<number>>, delta: number, min: number, max: number) =>
    () =>
      setter((v) => Math.min(max, Math.max(min, v + delta)));

  return (
    <div className={`lz-root${theme === "light" ? " lz-light" : ""}`} ref={rootRef} style={{ ...rootStyle, ...palette }}>
      {/* ── Ambient background: layered accent gradients + one subject-true pattern + grain ── */}
      <div aria-hidden className="lz-bg-grad" />
      {bg === "dots" && <div aria-hidden className="lz-bg-dots" />}
      {bg === "flow" && (
        <>
          {/* Bespoke woven routes for the hero region */}
          <svg aria-hidden className="lz-bg-art" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMin slice">
            <path className="lz-flow-line" d="M-40 205 H250 Q290 205 290 245 V430 Q290 470 330 470 H720 Q760 470 760 430 V300 Q760 260 800 260 H1480" />
            <path className="lz-flow-line" d="M-40 545 H430 Q470 545 470 505 V335 Q470 295 510 295 H905 Q945 295 945 335 V470 Q945 510 985 510 H1480" />
            <path className="lz-flow-line lz-flow-faint" d="M640 -40 V120 Q640 160 680 160 H1050 Q1090 160 1090 200 V700" />
            {[[290, 245], [760, 300], [470, 505], [945, 335], [1090, 200], [800, 260]].map(([x, y], i) => (
              <rect key={i} className="lz-flow-node" x={x - 4} y={y - 4} width="8" height="8" rx="2" />
            ))}
            {[[330, 470], [510, 295], [985, 510]].map(([x, y], i) => (
              <circle key={i} className="lz-flow-hot" cx={x} cy={y} r="4.5" />
            ))}
          </svg>
          {/* Seamless tiling flow that carries the pattern through every section below the hero */}
          <svg aria-hidden className="lz-bg-flow">
            <defs>
              <pattern id="lzflowtile" width="520" height="440" patternUnits="userSpaceOnUse">
                <path className="lz-flow-line" d="M260 0 V140 Q260 185 305 205 Q358 228 358 275 Q358 330 300 350 Q262 366 260 440" />
                <path className="lz-flow-line" d="M0 220 Q95 226 140 252 Q198 285 250 255 Q300 226 360 240 Q432 257 520 220" />
                <path className="lz-flow-line lz-flow-faint" d="M120 92 H176 Q206 92 206 122 V178" />
                <rect className="lz-flow-node" x="301" y="201" width="8" height="8" rx="2" />
                <rect className="lz-flow-node" x="246" y="251" width="8" height="8" rx="2" />
                <rect className="lz-flow-node" x="356" y="236" width="8" height="8" rx="2" />
                <circle className="lz-flow-hot" cx="332" cy="250" r="4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lzflowtile)" />
          </svg>
        </>
      )}
      {bg === "nodes" && (
        <svg aria-hidden className="lz-bg-art" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMin slice">
          {([["A","B"],["B","C"],["B","D"],["D","E"],["D","F"],["F","G"],["F","H"],["H","I"],["I","J"],["I","K"],["F","I"],["G","L"],["K","L"],["C","G"],["E","H"]] as const).map(([a, b2], i) => {
            const N: Record<string, [number, number]> = { A:[130,150], B:[360,250], C:[300,470], D:[560,360], E:[620,150], F:[830,300], G:[780,520], H:[1030,200], I:[1080,430], J:[1290,300], K:[1180,560], L:[980,610] };
            return <line key={i} className="lz-net-line" x1={N[a][0]} y1={N[a][1]} x2={N[b2][0]} y2={N[b2][1]} />;
          })}
          {Object.entries({ A:[130,150], B:[360,250], C:[300,470], D:[560,360], E:[620,150], F:[830,300], G:[780,520], H:[1030,200], I:[1080,430], J:[1290,300], K:[1180,560], L:[980,610] } as Record<string, [number, number]>).map(([k, [x, y]]) => (
            <circle key={k} className={k === "D" || k === "I" ? "lz-net-hot" : "lz-net-node"} cx={x} cy={y} r={k === "D" || k === "I" ? 5 : 3} />
          ))}
        </svg>
      )}
      {bg === "contour" && (
        <svg aria-hidden className="lz-bg-art" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMin slice">
          <g transform="rotate(-15 1120 90)">
            {[150, 250, 360, 480, 610, 760, 920].map((rx, i) => (
              <ellipse key={i} className="lz-contour" cx="1120" cy="90" rx={rx} ry={rx * 0.6} />
            ))}
          </g>
        </svg>
      )}
      <div aria-hidden className="lz-bg-grain" />

      {/* ── Nav ── */}
      <nav className="lz-nav">
        <div className="lz-nav-inner">
          <div className="lz-nav-row">
            <a href="/" className="lz-brand" aria-label="Leadz Systems home">
              <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="lz-logo" priority />
            </a>
            <div className="lz-nav-links">
              <a href="#diensten" className="lz-nav-link">Diensten</a>
              <a href="#werkwijze" className="lz-nav-link">Werkwijze</a>
              <a href="#portfolio" className="lz-nav-link">Portfolio</a>
              <a href="#over-ons" className="lz-nav-link">Over ons</a>
              <a href="/nieuws" className="lz-nav-link">Nieuws</a>
            </div>
            <a href="#agenda" className="lz-btn lz-btn-primary lz-nav-cta">Plan een AI Scan</a>
            <button
              type="button"
              className="lz-burger"
              aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={menuOpen}
              aria-controls="lz-mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={`lz-burger-bar${menuOpen ? " lz-burger-bar--1" : ""}`} />
              <span className={`lz-burger-bar${menuOpen ? " lz-burger-bar--2" : ""}`} />
              <span className={`lz-burger-bar${menuOpen ? " lz-burger-bar--3" : ""}`} />
            </button>
          </div>
          <div id="lz-mobile-menu" className={`lz-mobile-menu${menuOpen ? " is-open" : ""}`}>
            <div className="lz-mobile-menu-inner">
              {[["#diensten", "Diensten"], ["#werkwijze", "Werkwijze"], ["#portfolio", "Portfolio"], ["#over-ons", "Over ons"], ["/nieuws", "Nieuws"]].map(([href, label]) => (
                <a key={href} href={href} className="lz-mobile-link" onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
              <a href="#agenda" className="lz-btn lz-btn-primary lz-mobile-cta" onClick={() => setMenuOpen(false)}>Plan een AI Scan</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="lz-hero">
        <div className="lz-hero-grid">
          <div className="lz-col-text">
            <h1 className="lz-h1">
              <span className="lz-line lz-anim" style={{ animationDelay: "120ms" }}>Van handmatig werk</span>
              <span className="lz-line lz-iris lz-anim" style={{ animationDelay: "240ms" }}>naar slimme systemen</span>
            </h1>

            <p className="lz-sub lz-anim" style={{ animationDelay: "420ms" }}>
              Leadz Systems bouwt slimme software en automatiseringen op maat, zodat jij je
              op de groei van je bedrijf kunt richten.
            </p>

            <div className="lz-cta-row lz-anim" style={{ animationDelay: "520ms" }}>
              <a href="#agenda" className="lz-btn lz-btn-primary">
                Plan een vrijblijvend gesprek
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="lz-btn-arrow">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#diensten" className="lz-btn lz-btn-ghost">Bekijk wat we doen</a>
            </div>

          </div>

          {/* Signature — van agent naar resultaat, in drie stappen */}
          <div className="lz-col-panel lz-anim" style={{ animationDelay: "360ms" }}>
            <div className="lz-flow-card">
              {FLOW_STEPS.map((s, i) => (
                <div key={s.title} className="lz-flow-card-step">
                  {i > 0 && <span className="lz-flow-card-connector" aria-hidden />}
                  <div className="lz-flow-card-box">
                    <div className="lz-flow-card-row">
                      <span className="lz-flow-card-ico"><FlowIcon name={s.icon} /></span>
                      <div>
                        <h3 className="lz-flow-card-title">{s.title}</h3>
                        <p className="lz-flow-card-sub">{s.sub}</p>
                      </div>
                    </div>
                    <div className="lz-flow-card-pill">
                      <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
                        <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {s.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Tools: LogoLoop met echte merk-logo's ── */}
      <section className="lz-marquee-band" aria-label="Tools waarmee we koppelen">
        <p className="lz-marquee-label">Koppelt naadloos met de tools die je al gebruikt</p>
        <LogoLoop
          logos={TOOL_LOGOS}
          speed={42}
          direction="left"
          logoHeight={30}
          gap={64}
          fadeOut
          scaleOnHover
          ariaLabel="Tools waarmee we koppelen"
        />
      </section>

      {/* ── Diensten ── */}
      <section id="diensten" className="lz-section">
        <div className="lz-head lz-reveal">
          <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Diensten</span>
          <h2 className="lz-h2">Wat we voor<br />je bouwen.</h2>
          <p className="lz-lead">
            Van losse automatisering tot een complete webapplicatie. Altijd op maat,
            altijd rond hoe jij werkt.
          </p>
        </div>

        <div className="lz-dienst-grid">
          {DIENSTEN.map((d, i) => (
            <a key={d.slug} href={`/diensten/${d.slug}`} className="lz-card lz-reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="lz-card-top">
                <span className="lz-card-icon"><DienstIcon slug={d.slug} /></span>
                <span className="lz-card-stat">{d.stat}</span>
              </div>
              <h3 className="lz-card-title">{d.title}</h3>
              <p className="lz-card-desc">{d.description}</p>
              <ul className="lz-card-list">
                {d.items.slice(0, 3).map((item) => (
                  <li key={item}>
                    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden className="lz-tick">
                      <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="lz-card-chips">
                {d.koppelingen.slice(0, 5).map((k) => (<span key={k} className="lz-chip">{k}</span>))}
              </div>
              <span className="lz-card-more">Meer over deze dienst →</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Werkwijze — a real sequence, so numbering earns its place ── */}
      <section id="werkwijze" className="lz-section">
        <div className="lz-head lz-reveal">
          <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Werkwijze</span>
          <h2 className="lz-h2">Van eerste gesprek naar<br /><span className="lz-iris">werkende AI in weken</span></h2>
          <p className="lz-lead">Geen maandenlange IT-trajecten. Onze aanpak is helder, snel en volledig begeleid. Jij houdt op elk moment overzicht.</p>
        </div>

        <ol className="lz-flow">
          {WERKWIJZE.map((s, i) => (
            <li key={s.title} className="lz-flow-step lz-reveal">
              <div className="lz-flow-top">
                <span className="lz-flow-ico" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <span className="lz-flow-line" aria-hidden />
              </div>
              <span className="lz-flow-week">{s.week}</span>
              <h3 className="lz-flow-title">{s.title}</h3>
              <p className="lz-flow-desc">{s.desc}</p>
              <p className="lz-flow-krijgt"><span className="lz-flow-krijgt-label">Je krijgt</span>{s.krijgt}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Trust stats ── */}
      <section className="lz-section lz-stats-section">
        <div className="lz-stats-band lz-reveal">
          {STATS.map((s) => (
            <div key={s.num} className="lz-statbig">
              <span className="lz-statbig-num">{s.num}</span>
              <span className="lz-statbig-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Besparingscalculator ── */}
      <section id="besparing" className="lz-section">
        <div className="sc-head lz-reveal">
          <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Bereken je besparing</span>
          <h2 className="lz-h2">Reken uit wat<br />automatisering <span className="lz-iris">jou oplevert</span></h2>
          <p className="lz-lead">Vul drie getallen in en zie direct wat je per week, maand en jaar terugwint.</p>
        </div>

        <div className="sc-card lz-reveal">
          <div className="sc-grid">
            {/* Invoer */}
            <div className="sc-inputs">
              <div className="sc-field">
                <span className="sc-label" id="sc-people">Medewerkers die handmatig werk doen</span>
                <div className="sc-control">
                  <span className="sc-value"><span className="sc-num" aria-labelledby="sc-people">{calcPeople}</span><span className="sc-unit">personen</span></span>
                  <span className="sc-steppers">
                    <button type="button" className="sc-step" aria-label="Minder medewerkers" onClick={clampStep(setCalcPeople, -1, 1, 100)}>−</button>
                    <button type="button" className="sc-step" aria-label="Meer medewerkers" onClick={clampStep(setCalcPeople, 1, 1, 100)}>+</button>
                  </span>
                </div>
              </div>

              <div className="sc-field">
                <span className="sc-label" id="sc-hours">Uren handmatig werk per medewerker per week</span>
                <div className="sc-control">
                  <span className="sc-value"><span className="sc-num" aria-labelledby="sc-hours">{calcHours}</span><span className="sc-unit">uur</span></span>
                  <span className="sc-steppers">
                    <button type="button" className="sc-step" aria-label="Minder uren" onClick={clampStep(setCalcHours, -1, 1, 80)}>−</button>
                    <button type="button" className="sc-step" aria-label="Meer uren" onClick={clampStep(setCalcHours, 1, 1, 80)}>+</button>
                  </span>
                </div>
              </div>

              <div className="sc-field">
                <span className="sc-label" id="sc-wage">Gemiddeld uurloon</span>
                <div className="sc-control">
                  <span className="sc-value"><span className="sc-num" aria-labelledby="sc-wage"><span className="sc-cur">€</span>{calcWage}</span><span className="sc-unit">per uur</span></span>
                  <span className="sc-steppers">
                    <button type="button" className="sc-step" aria-label="Lager uurloon" onClick={clampStep(setCalcWage, -5, 5, 500)}>−</button>
                    <button type="button" className="sc-step" aria-label="Hoger uurloon" onClick={clampStep(setCalcWage, 5, 5, 500)}>+</button>
                  </span>
                </div>
              </div>
            </div>

            {/* Resultaat */}
            <div className="sc-results">
              <span className="sc-results-kicker">Potentiële besparing</span>
              <div className="sc-results-list" aria-live="polite">
                {savings.map((s) => (
                  <div key={s.label} className={`sc-result${s.feat ? " is-feat" : ""}`}>
                    <span className="sc-result-label">{s.label}</span>
                    <span className="sc-result-val">{fmtEuro(s.euro)}<span className="sc-result-hrs">· {fmtHrs(s.hrs)}</span></span>
                  </div>
                ))}
              </div>
              <p className="sc-note">
                Berekening op basis van een geschatte automatiseringswinst van 70% bij terugkerend
                handmatig werk. De werkelijke besparing hangt af van je processen.
              </p>
            </div>
          </div>

          <div className="sc-foot">
            <p className="sc-foot-text">
              Dit is tijd en capaciteit die je direct terugwint zodra je processen geautomatiseerd zijn.
            </p>
            <a href="#agenda" className="lz-btn lz-btn-primary sc-cta">
              Plan een verkenningsgesprek
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="lz-btn-arrow">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Over ons ── */}
      <section id="over-ons" className="lz-section">
        <div className="lz-about lz-reveal">
          <div className="lz-about-photo">
            <Image src="/jesse-color.png" alt="Jesse, oprichter van Leadz Systems" width={832} height={890} className="lz-about-img" sizes="(max-width:900px) 100vw, 380px" />
            <div className="lz-about-photo-tint" aria-hidden />
          </div>
          <div className="lz-about-text">
            <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Over ons</span>
            <h2 className="lz-h2">Geen ver-van-je-bed software, maar iemand die meedenkt.</h2>
            <p className="lz-about-p">
              Ik ben Jesse, oprichter van Leadz Systems. Ik bouw AI-software en automatiseringen
              voor het MKB, niet vanaf een afstand, maar door eerst écht te begrijpen hoe jouw
              bedrijf werkt.
            </p>
            <p className="lz-about-p">
              Ik geloof niet in dikke pakketten waar je je werkwijze omheen moet wringen. Ik kijk
              waar bij jou de meeste tijd of omzet blijft liggen, en bouw daar iets concreets voor.
              Klein beginnen, snel iets werkends, en van daaruit verder.
            </p>
            <p className="lz-about-p">
              Korte lijntjes, geen jargon. Van het eerste gesprek tot ver na de oplevering heb je
              gewoon met mij te maken.
            </p>
            <div className="lz-cta-row lz-about-cta">
              <a href="#agenda" className="lz-btn lz-btn-primary">
                Plan een kennismaking
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="lz-btn-arrow">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="lz-btn lz-btn-ghost">App me direct</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio — live previews of real projects ── */}
      <section id="portfolio" className="lz-section">
        <div className="lz-head lz-reveal">
          <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Portfolio</span>
          <h2 className="lz-h2">Een greep uit<br />wat we bouwen.</h2>
          <p className="lz-lead">Concrete oplossingen voor concrete problemen. Van automatisering tot webapplicatie.</p>
        </div>

        <div className="lz-filter lz-reveal" role="group" aria-label="Filter op type project">
          {["Alles", ...Array.from(new Set(PORTFOLIO_ITEMS.map((p) => p.tag)))].map((tag) => (
            <button
              key={tag}
              type="button"
              className={`lz-filter-btn${workFilter === tag ? " is-active" : ""}`}
              aria-pressed={workFilter === tag}
              onClick={() => setWorkFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="lz-work-grid">
          {PORTFOLIO_ITEMS.filter((p) => workFilter === "Alles" || p.tag === workFilter).map((p, i) => (
            <a key={p.slug} href={`/portfolio/${p.slug}`} className="lz-work lz-reveal is-visible" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="lz-browser">
                <div className="lz-browser-bar">
                  <span className="lz-dot" /><span className="lz-dot" /><span className="lz-dot" />
                </div>
                <div className="lz-preview">
                  {p.screenshot && (
                    <Image
                      src={p.screenshot}
                      alt={`Screenshot van ${p.title}`}
                      width={1280}
                      height={3200}
                      sizes="(max-width:760px) 100vw, 520px"
                      className="lz-shot"
                    />
                  )}
                </div>
              </div>
              <div className="lz-work-body">
                <span className="lz-work-tag">{p.tag}</span>
                <h3 className="lz-work-title">{p.title}</h3>
                <p className="lz-work-desc">{p.description}</p>
                <div className="lz-work-foot">
                  <div className="lz-work-stack">
                    {p.stack.map((s) => (<span key={s} className="lz-chip">{s}</span>))}
                  </div>
                  <span className="lz-work-link">
                    Bekijk case
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Garanties ── */}
      <section id="garanties" className="lz-section">
        <div className="lz-guarantee-panel lz-reveal">
          <div className="lz-guarantee-head">
            <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Zonder verrassingen</span>
            <h2 className="lz-h2">Wat je van ons<br />kunt verwachten.</h2>
            <p className="lz-lead">Geen dikke voorwaarden nodig om te snappen waar je aan toe bent. Dit zijn de afspraken die we altijd aanhouden.</p>
          </div>
          <div className="lz-guarantee-grid">
            {GARANTIES.slice(0, 3).map((g) => (
              <div key={g.title} className="lz-guarantee-item">
                <span className="lz-guarantee-ico"><GarantieIcon name={g.icon} /></span>
                <h3 className="lz-guarantee-title">{g.title}</h3>
                <p className="lz-guarantee-desc">{g.desc}</p>
              </div>
            ))}
          </div>
          {/* De belofte die alles samenvat, bewust uit het raster gelicht. */}
          <div className="lz-guarantee-feature">
            <span className="lz-guarantee-ico"><GarantieIcon name={GARANTIES[3].icon} /></span>
            <div className="lz-guarantee-feature-body">
              <h3 className="lz-guarantee-feature-title">{GARANTIES[3].title}</h3>
              <p className="lz-guarantee-desc">{GARANTIES[3].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="lz-section">
        <div className="lz-head lz-head-center lz-reveal">
          <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Veelgestelde vragen</span>
          <h2 className="lz-h2">Alles wat je wilt weten<br /><span className="lz-iris">voordat we starten</span></h2>
        </div>
        <div className="lz-faq lz-reveal">
          {FAQS.map((f) => (
            <details key={f.q} className="lz-faq-item">
              <summary className="lz-faq-q">
                {f.q}
                <span className="lz-faq-chevron" aria-hidden>
                  <svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </summary>
              <p className="lz-faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Contact / agenda ── */}
      <section id="contact" className="lz-section">
        <div className="lz-contact-grid">
          <div className="lz-contact-info lz-reveal">
            <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Kennismaking</span>
            <h2 className="lz-h2">Plan een vrijblijvend gesprek</h2>
            <p className="lz-lead">
              Een gesprek over automatisering, AI-agents of maatwerk software voor jouw bedrijf.
              In 30 minuten kijken we samen waar je team nu tijd verliest, welke processen
              slimmer kunnen en of Leadz Systems de juiste partij is om dat op te lossen.
            </p>
            <p className="lz-contact-p">
              Bedoeld voor ondernemers en teams die minder handwerk willen, systemen beter willen
              koppelen, of willen weten wat AI-software praktisch kan betekenen in hun operatie.
            </p>
            <p className="lz-contact-sub">Dit bespreken we:</p>
            <ul className="lz-contact-list">
              {[
                "Waar nu de meeste tijd, fouten of vertraging ontstaan",
                "Welke workflows of systemen je kunt automatiseren",
                "Of maatwerk software, AI-automatisering of eerst een procesanalyse logisch is",
                "Wat een realistische eerste stap, scope en investering kan zijn",
              ].map((item) => (
                <li key={item}>
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden className="lz-tick">
                    <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div id="agenda" className="lz-cal-card lz-reveal">
            <CalEmbed calUrl={SITE.cal} />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lz-footer">
        <div className="lz-footer-grid">
          <div className="lz-footer-brandcol">
            <Image src="/logo.png" alt={SITE.name} width={1350} height={157} className="lz-logo" />
            <p className="lz-footer-tag">
              {SITE.name} helpt MKB-bedrijven slimmer werken met AI en automatisering.
              Slimmer werken. Meer bereiken.
            </p>
          </div>

          <nav className="lz-footer-col" aria-label="Navigatie">
            <h3 className="lz-footer-h">Navigatie</h3>
            <a href="#diensten" className="lz-footer-link">Oplossingen</a>
            <a href="/diensten/ai-agents" className="lz-footer-link">AI Agents</a>
            <a href="/diensten/ai-automatisering" className="lz-footer-link">Automatiseringen</a>
            <a href="/diensten/websites-webapps" className="lz-footer-link">Websites</a>
            <a href="#portfolio" className="lz-footer-link">Cases</a>
            <a href="#over-ons" className="lz-footer-link">Over ons</a>
          </nav>

          <div className="lz-footer-col">
            <h3 className="lz-footer-h">Contact</h3>
            <a href="#agenda" className="lz-footer-link">Plan een AI Scan</a>
            <a href={`mailto:${SITE.email}`} className="lz-footer-link">{SITE.email}</a>
            <a href="https://www.linkedin.com/company/leadz-systems/" target="_blank" rel="noopener noreferrer" className="lz-footer-link">LinkedIn</a>
          </div>

          <div className="lz-footer-col">
            <h3 className="lz-footer-h">Juridisch</h3>
            <a href="/privacy" className="lz-footer-link">Privacyverklaring</a>
            <a href="/voorwaarden" className="lz-footer-link">Algemene voorwaarden</a>
          </div>
        </div>

        <div className="lz-footer-bar">
          <p className="lz-footer-copy">© {year} {SITE.name}. Alle rechten voorbehouden.</p>
          <div className="lz-footer-sign">
            <a href="https://www.linkedin.com/company/leadz-systems/" target="_blank" rel="noopener noreferrer" className="lz-footer-in" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H10z" />
              </svg>
            </a>
            <span>Slimmer werken. <span className="lz-footer-sign-em">Meer bereiken.</span></span>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp ── */}
      <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="lz-wa" aria-label="Stuur een WhatsApp-bericht">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <style>{CSS}</style>
    </div>
  );
}

/* overflow-x:clip contains horizontal bleed (ambient layers, floating panel) without
   turning the root into a vertical scroll-container that would clamp page scroll. */
const rootStyle: React.CSSProperties = { position: "relative", overflowX: "clip", isolation: "isolate" };

const CSS = `
.lz-root{
  --ink:#0A0B10; --ink-2:#0E1017;
  --surface:#14171F; --surface-2:#1A1E28;
  --line:rgba(255,255,255,.09); --line-2:rgba(255,255,255,.14);
  --paper:#ECEDF4; --fog:#9AA0B2; --fog-2:#666C7D;
  --iris:#F5A524; --iris-2:#FFC061; --iris-glow:rgba(245,165,36,.5); --on-accent:#160F02;
  --mint:#4ADE9E;
  --sp-1:8px; --sp-2:12px; --sp-3:16px; --sp-4:24px; --sp-5:32px; --sp-6:48px; --sp-7:96px;
  --edge:24px; --maxw:1120px;
  background:var(--ink); color:var(--paper);
  font-family:var(--font-geist-sans),system-ui,sans-serif; -webkit-font-smoothing:antialiased;
}

/* ── Micro-typografie: merkkleur bij tekstselectie + nette regelafbrekingen ── */
.lz-root ::selection{ background:color-mix(in srgb, var(--iris) 32%, transparent); color:var(--paper); }
.lz-root ::-moz-selection{ background:color-mix(in srgb, var(--iris) 32%, transparent); color:var(--paper); }
.lz-h1,.lz-h2,.lz-card-title,.lz-flow-title,.lz-guarantee-title,.lz-guarantee-feature-title,.lz-faq-q,.lz-work-title,.lz-statbig-label{ text-wrap:balance; }
.lz-lead,.lz-sub,.lz-about-p,.lz-card-desc,.lz-guarantee-desc,.lz-flow-desc,.lz-work-desc,.lz-contact-p{ text-wrap:pretty; }

/* ── Ambient layers (hero region only) ── */
.lz-bg-grad{ position:absolute; inset:0 0 auto; height:920px; z-index:-3; pointer-events:none;
  background:
    radial-gradient(48% 42% at 12% 0%, color-mix(in srgb, var(--iris) 28%, transparent) 0%, transparent 62%),
    radial-gradient(42% 40% at 92% 6%, color-mix(in srgb, var(--iris-2) 20%, transparent) 0%, transparent 60%),
    radial-gradient(60% 55% at 68% 34%, color-mix(in srgb, var(--iris) 10%, transparent) 0%, transparent 70%),
    linear-gradient(180deg,#0B0C12 0%, #0A0B10 60%, #0A0B10 100%);
}
/* Sparse dot matrix — softer cousin of the grid (optional ?bg=dots) */
.lz-bg-dots{ position:absolute; inset:0 0 auto; height:920px; z-index:-2; pointer-events:none;
  background-image:radial-gradient(color-mix(in srgb, var(--paper) 12%, transparent) 1.2px, transparent 1.3px);
  background-size:34px 34px;
  -webkit-mask-image:radial-gradient(120% 90% at 50% 0%, #000 26%, transparent 76%);
  mask-image:radial-gradient(120% 90% at 50% 0%, #000 26%, transparent 76%);
}
/* Shared canvas for the SVG background patterns (flow / nodes / contour) */
.lz-bg-art{ position:absolute; inset:0 0 auto; width:100%; height:920px; z-index:-2; pointer-events:none;
  -webkit-mask-image:radial-gradient(120% 92% at 50% 0%, #000 34%, transparent 80%);
  mask-image:radial-gradient(120% 92% at 50% 0%, #000 34%, transparent 80%);
}
/* Full-page tiling flow: invisible under the hero (where the bespoke art lives),
   fades in just below it and carries the pattern down to the footer. */
.lz-bg-flow{ position:absolute; top:0; left:0; width:100%; height:100%; z-index:-2; pointer-events:none; opacity:.8;
  -webkit-mask-image:linear-gradient(180deg, transparent 0, transparent 600px, #000 900px, #000 calc(100% - 200px), transparent 100%);
  mask-image:linear-gradient(180deg, transparent 0, transparent 600px, #000 900px, #000 calc(100% - 200px), transparent 100%); }
/* flow — pipelines/workflows */
.lz-flow-line{ fill:none; stroke:color-mix(in srgb, var(--iris) 30%, transparent); stroke-width:1.4; }
.lz-flow-faint{ stroke:color-mix(in srgb, var(--paper) 10%, transparent); }
.lz-flow-node{ fill:color-mix(in srgb, var(--iris) 32%, transparent); }
.lz-flow-hot{ fill:var(--iris); filter:drop-shadow(0 0 6px var(--iris-glow)); }
/* nodes — connected systems */
.lz-net-line{ stroke:color-mix(in srgb, var(--paper) 11%, transparent); stroke-width:1; fill:none; }
.lz-net-node{ fill:color-mix(in srgb, var(--paper) 26%, transparent); }
.lz-net-hot{ fill:var(--iris); filter:drop-shadow(0 0 7px var(--iris-glow)); }
/* contour — signal rings */
.lz-contour{ fill:none; stroke:color-mix(in srgb, var(--paper) 9%, transparent); stroke-width:1.2; }
.lz-bg-grain{ position:absolute; inset:0; z-index:-1; pointer-events:none; opacity:.42; mix-blend-mode:soft-light;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>"); }

/* ── Nav ── */
.lz-nav{ position:absolute; top:0; left:0; right:0; z-index:20; display:flex; justify-content:center; padding:var(--sp-3) var(--sp-3) 0; }
.lz-nav-inner{ width:100%; max-width:var(--maxw); overflow:hidden; border:1px solid var(--line); border-radius:18px;
  background:rgba(16,18,24,.66); backdrop-filter:blur(14px);
  box-shadow:0 1px 0 rgba(255,255,255,.04) inset, 0 18px 40px -24px rgba(0,0,0,.9); }
.lz-nav-row{ display:flex; align-items:center; justify-content:space-between; gap:var(--sp-5); padding:12px 14px 12px 20px; }
.lz-brand{ display:flex; align-items:center; border-radius:8px; }
.lz-brand:focus-visible{ outline:2px solid var(--iris-2); outline-offset:4px; }
.lz-logo{ height:19px; width:auto; object-fit:contain; filter:brightness(0) invert(1); opacity:.94; }
.lz-nav-links{ display:none; align-items:center; gap:var(--sp-5); }
.lz-nav-link{ font-size:14px; color:var(--fog); text-decoration:none; border-radius:6px; transition:color .18s cubic-bezier(.22,1,.36,1); }
.lz-nav-link:hover{ color:var(--paper); }
.lz-nav-link:focus-visible{ outline:2px solid var(--iris-2); outline-offset:4px; color:var(--paper); }
.lz-nav .lz-nav-cta{ display:none; white-space:nowrap; }
/* Hamburger — mobile only */
.lz-burger{ display:inline-flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; width:42px; height:42px; margin:-6px -8px -6px 0; border-radius:10px; cursor:pointer; background:transparent; border:0; }
.lz-burger:focus-visible{ outline:2px solid var(--iris-2); outline-offset:2px; }
.lz-burger-bar{ width:22px; height:2px; border-radius:2px; background:var(--paper); transition:transform .25s cubic-bezier(.22,1,.36,1), opacity .2s ease; }
.lz-burger-bar--1{ transform:translateY(7px) rotate(45deg); }
.lz-burger-bar--2{ opacity:0; }
.lz-burger-bar--3{ transform:translateY(-7px) rotate(-45deg); }
/* Mobile dropdown menu */
.lz-mobile-menu{ max-height:0; overflow:hidden; transition:max-height .32s cubic-bezier(.22,1,.36,1); }
.lz-mobile-menu.is-open{ max-height:340px; }
.lz-mobile-menu-inner{ display:flex; flex-direction:column; gap:2px; padding:6px 14px 16px; border-top:1px solid var(--line); }
.lz-mobile-link{ padding:13px 6px; font-size:15px; color:var(--paper); text-decoration:none; border-radius:8px; border-bottom:1px solid rgba(255,255,255,.05); }
.lz-mobile-link:last-of-type{ border-bottom:0; }
.lz-mobile-link:focus-visible{ outline:2px solid var(--iris-2); outline-offset:2px; }
.lz-mobile-cta{ margin-top:12px; width:100%; }
/* Op mobiel blijft de balk zichtbaar tijdens het scrollen, met een iets kleiner logo. */
@media(max-width:859px){
  .lz-nav{ position:fixed; }
  .lz-logo{ height:16px; }
}
@media(min-width:860px){ .lz-nav-links{ display:flex; } .lz-nav .lz-nav-cta{ display:inline-flex; } .lz-burger{ display:none; } .lz-mobile-menu{ display:none; } }

/* ── Buttons ── */
.lz-btn{ display:inline-flex; align-items:center; gap:8px; justify-content:center; font-size:15px; font-weight:600; letter-spacing:.01em; text-decoration:none;
  padding:13px 22px; border-radius:12px; cursor:pointer;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1), background-color .2s ease, box-shadow .2s ease, color .2s ease, border-color .2s ease; }
.lz-btn:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }
.lz-btn-primary{ color:var(--on-accent); border:1px solid rgba(255,255,255,.14);
  background:linear-gradient(180deg,var(--iris-2) 0%, var(--iris) 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.25) inset, 0 12px 28px -10px var(--iris-glow), 0 2px 8px -2px var(--iris-glow); }
.lz-btn-primary:hover{ transform:translateY(-2px); box-shadow:0 1px 0 rgba(255,255,255,.3) inset, 0 20px 40px -12px var(--iris-glow), 0 4px 12px -2px var(--iris-glow); }
.lz-btn-primary:active{ transform:translateY(0); }
.lz-btn-arrow{ transition:transform .2s cubic-bezier(.34,1.56,.64,1); }
.lz-btn-primary:hover .lz-btn-arrow{ transform:translateX(3px); }
.lz-nav-cta{ padding:10px 18px; font-size:14px; border-radius:10px; }
.lz-btn-ghost{ color:var(--paper); background:var(--surface); border:1px solid var(--line-2); box-shadow:0 1px 0 rgba(255,255,255,.05) inset; }
.lz-btn-ghost:hover{ transform:translateY(-2px); background:var(--surface-2); border-color:rgba(255,255,255,.22); }
.lz-btn-ghost:active{ transform:translateY(0); }

/* ── Hero ── */
.lz-hero{ position:relative; z-index:1; max-width:var(--maxw); margin:0 auto; padding:132px var(--edge) var(--sp-7); }
.lz-hero-grid{ display:grid; grid-template-columns:1fr; gap:var(--sp-6); align-items:center; }
@media(min-width:980px){ .lz-hero-grid{ grid-template-columns:1.02fr .98fr; } .lz-hero{ padding-top:150px; } }
.lz-eyebrow{ display:inline-flex; align-items:center; gap:9px; font-family:var(--font-geist-mono),monospace; font-size:12.5px; letter-spacing:.14em; text-transform:uppercase;
  color:var(--fog); padding:7px 13px; border:1px solid var(--line); border-radius:999px; background:rgba(255,255,255,.02); }
.lz-h1{ font-family:var(--font-bricolage),var(--font-geist-sans),sans-serif; font-weight:800; letter-spacing:-.03em; line-height:.98; font-size:clamp(2.85rem,7vw,4.9rem); margin:var(--sp-4) 0 0; }
.lz-h1 .lz-line{ display:block; }
.lz-iris{ background:linear-gradient(100deg,var(--iris-2) 0%, color-mix(in srgb, var(--iris-2) 55%, #fff) 55%, var(--iris) 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lz-sub{ max-width:33rem; margin:var(--sp-4) 0 0; color:var(--fog); font-size:clamp(1.02rem,1.5vw,1.16rem); line-height:1.7; }
.lz-cta-row{ display:flex; flex-wrap:wrap; gap:var(--sp-2); margin-top:var(--sp-5); }
.lz-trust{ margin-top:var(--sp-4); color:var(--fog-2); font-family:var(--font-geist-mono),monospace; font-size:12.5px; letter-spacing:.02em; }

/* ── Signature: agent → automatisering → resultaat ── */
.lz-col-panel{ perspective:1400px; }
.lz-flow-card{ display:flex; flex-direction:column; animation:lzFloat 8s ease-in-out infinite; }
.lz-flow-card-step{ display:flex; flex-direction:column; }
.lz-flow-card-connector{ position:relative; align-self:center; width:1px; height:30px; overflow:hidden;
  background:linear-gradient(180deg, color-mix(in srgb, var(--iris) 12%, transparent) 0%, color-mix(in srgb, var(--iris) 42%, transparent) 50%, color-mix(in srgb, var(--iris) 12%, transparent) 100%); }
.lz-flow-card-connector::after{ content:""; position:absolute; left:0; top:0; width:1px; height:14px; border-radius:1px;
  background:var(--iris-2); box-shadow:0 0 9px 1.5px var(--iris-glow);
  animation:lzFlowGlow 2.6s cubic-bezier(.5,0,.5,1) infinite; }
.lz-flow-card-step:nth-child(3) .lz-flow-card-connector::after{ animation-delay:1.3s; }
@keyframes lzFlowGlow{ 0%{ transform:translateY(-16px); opacity:0; } 18%{ opacity:1; } 82%{ opacity:1; } 100%{ transform:translateY(30px); opacity:0; } }
.lz-flow-card-box{ border:1px solid var(--line-2); border-radius:18px; padding:16px 18px;
  background:linear-gradient(180deg, rgba(26,30,40,.92) 0%, rgba(18,21,28,.94) 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.06) inset, 0 30px 60px -40px rgba(0,0,0,.9); }
.lz-flow-card-row{ display:flex; align-items:flex-start; gap:12px; }
.lz-flow-card-ico{ flex:none; display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:11px; color:var(--iris-2); background:color-mix(in srgb, var(--iris) 15%, transparent); border:1px solid color-mix(in srgb, var(--iris) 30%, var(--line)); }
.lz-flow-card-title{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1rem; letter-spacing:-.01em; color:var(--paper); }
.lz-flow-card-sub{ margin-top:2px; color:var(--fog); font-size:.87rem; }
.lz-flow-card-pill{ margin-top:12px; display:flex; align-items:center; gap:8px; padding:9px 12px; border-radius:10px; background:rgba(255,255,255,.03); border:1px solid var(--line); color:var(--fog-2); font-family:var(--font-geist-mono),monospace; font-size:12px; }
.lz-flow-card-pill svg{ flex:none; color:var(--mint); }
.lz-chip{ font-family:var(--font-geist-mono),monospace; font-size:11px; color:var(--fog); padding:4px 9px; border:1px solid var(--line); border-radius:7px; background:rgba(255,255,255,.02); }

/* ── Tools marquee (full-width bar under the hero) ── */
/* ── Tools: scroll-based velocity marquee ── */
.lz-marquee-band{ position:relative; z-index:1; padding:var(--sp-5) 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.lz-marquee-label{ text-align:center; font-family:var(--font-geist-mono),monospace; font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--fog-2); margin-bottom:var(--sp-4); padding:0 var(--edge); }
/* LogoLoop (React Bits) — echte merk-logo's, thema-geïntegreerd */
.lz-marquee-band .logoloop{ position:relative; --logoloop-gap:32px; --logoloop-logoHeight:28px; --logoloop-fadeColorAuto:var(--ink); }
.lz-marquee-band .logoloop__track{ display:flex; width:max-content; will-change:transform; user-select:none; }
.lz-marquee-band .logoloop__list{ display:flex; align-items:center; }
.lz-marquee-band .logoloop__item{ flex:0 0 auto; margin-right:var(--logoloop-gap); font-size:var(--logoloop-logoHeight); line-height:1; }
.lz-marquee-band .logoloop__item:last-child{ margin-right:var(--logoloop-gap); }
.lz-marquee-band .logoloop__node{ display:inline-flex; align-items:center; color:color-mix(in srgb, var(--paper) 58%, transparent); transition:color .3s cubic-bezier(.4,0,.2,1), transform .3s cubic-bezier(.4,0,.2,1); }
.lz-marquee-band .logoloop--scale-hover .logoloop__item:hover .logoloop__node{ transform:scale(1.18); color:var(--iris-2); }
.lz-marquee-band .logoloop--fade::before,
.lz-marquee-band .logoloop--fade::after{ content:""; position:absolute; top:0; bottom:0; width:clamp(32px,10%,140px); pointer-events:none; z-index:10; }
.lz-marquee-band .logoloop--fade::before{ left:0; background:linear-gradient(to right, var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%, rgba(0,0,0,0) 100%); }
.lz-marquee-band .logoloop--fade::after{ right:0; background:linear-gradient(to left, var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%, rgba(0,0,0,0) 100%); }

/* ── Section scaffold ── */
.lz-section{ position:relative; z-index:1; max-width:var(--maxw); margin:0 auto; padding:var(--sp-7) var(--edge); }
.lz-head{ max-width:640px; margin-bottom:var(--sp-6); }
.lz-kicker{ display:inline-flex; align-items:center; gap:9px; font-family:var(--font-geist-mono),monospace; font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:var(--iris-2); }
.lz-kicker-dot{ width:6px; height:6px; border-radius:2px; background:var(--iris); box-shadow:0 0 12px 1px var(--iris-glow); transform:rotate(45deg); }
.lz-h2{ font-family:var(--font-bricolage),sans-serif; font-weight:800; letter-spacing:-.03em; line-height:1.0; font-size:clamp(2.1rem,4.6vw,3.4rem); margin:var(--sp-3) 0 0; }
.lz-lead{ margin:var(--sp-3) 0 0; color:var(--fog); font-size:clamp(1rem,1.4vw,1.12rem); line-height:1.7; max-width:36rem; }

/* ── Diensten ── */
.lz-dienst-grid{ display:grid; grid-template-columns:1fr; gap:var(--sp-3); }
@media(min-width:760px){ .lz-dienst-grid{ grid-template-columns:1fr 1fr; gap:var(--sp-4); } }
.lz-card{ position:relative; display:flex; flex-direction:column; text-decoration:none; color:inherit; border:1px solid var(--line); border-radius:18px; padding:26px; background:linear-gradient(180deg, var(--surface) 0%, #101219 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.04) inset, 0 24px 48px -32px rgba(0,0,0,.9);
  transition:transform .3s cubic-bezier(.22,1,.36,1), border-color .3s ease, box-shadow .3s ease; }
.lz-card:hover{ transform:translateY(-4px); border-color:color-mix(in srgb, var(--iris) 40%, var(--line-2)); box-shadow:0 1px 0 rgba(255,255,255,.06) inset, 0 34px 60px -30px rgba(0,0,0,.95), 0 20px 50px -30px var(--iris-glow); }
.lz-card-top{ display:flex; align-items:center; gap:14px; margin-bottom:18px; }
.lz-card-icon{ flex:none; width:44px; height:44px; border-radius:12px; display:inline-flex; align-items:center; justify-content:center; color:var(--iris); border:1px solid color-mix(in srgb, var(--iris) 30%, transparent); background:color-mix(in srgb, var(--iris) 10%, transparent); }
.lz-card-stat{ font-family:var(--font-geist-mono),monospace; font-size:11.5px; line-height:1.4; letter-spacing:.02em; color:var(--iris-2); }
.lz-card-title{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.45rem; letter-spacing:-.01em; }
.lz-card-desc{ margin-top:10px; color:var(--fog); font-size:.98rem; line-height:1.65; }
.lz-card-list{ margin-top:18px; display:flex; flex-direction:column; gap:9px; }
.lz-card-list li{ display:flex; align-items:flex-start; gap:10px; font-size:.93rem; color:#C4C8D4; line-height:1.45; }
.lz-tick{ flex:none; margin-top:2px; color:var(--iris); }
.lz-card-chips{ display:flex; flex-wrap:wrap; gap:6px; margin-top:20px; padding-top:18px; border-top:1px solid var(--line); }
.lz-card-more{ margin-top:18px; font-weight:600; font-size:.9rem; color:var(--iris-2); }
.lz-card:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }
.lz-card-list{ flex:1; }

/* ── Werkwijze ── */
.lz-flow{ display:grid; grid-template-columns:1fr; gap:32px; list-style:none; padding:0; margin-top:var(--sp-6); }
@media(min-width:720px){ .lz-flow{ grid-template-columns:repeat(2,1fr); gap:36px 28px; } }
@media(min-width:980px){ .lz-flow{ grid-template-columns:repeat(5,1fr); gap:24px; } }
.lz-flow-top{ display:flex; align-items:center; gap:12px; margin-bottom:18px; }
.lz-flow-ico{ flex:none; width:48px; height:48px; border-radius:12px; display:inline-flex; align-items:center; justify-content:center; color:var(--iris-2); background:color-mix(in srgb, var(--iris) 12%, transparent); border:1px solid color-mix(in srgb, var(--iris) 24%, var(--line)); font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:1.05rem; letter-spacing:-.02em; font-variant-numeric:tabular-nums; }
.lz-flow-line{ display:none; flex:1; height:1px; min-width:12px; background:color-mix(in srgb, var(--iris) 40%, var(--line)); }
@media(min-width:980px){ .lz-flow-line{ display:block; margin-right:-24px; } .lz-flow-step:last-child .lz-flow-line{ display:none; } }
.lz-flow-week{ display:block; font-family:var(--font-geist-mono),monospace; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--fog-2); }
.lz-flow-title{ margin-top:6px; font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.2rem; letter-spacing:-.01em; color:var(--paper); }
.lz-flow-desc{ margin-top:10px; color:var(--fog); font-size:.95rem; line-height:1.6; }
.lz-flow-krijgt{ display:flex; flex-direction:column; gap:4px; margin-top:14px; padding-top:14px; border-top:1px solid var(--line); color:var(--paper); font-size:.9rem; line-height:1.45; }
.lz-flow-krijgt-label{ font-family:var(--font-geist-mono),monospace; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--iris-2); }


/* ── Over Jesse ── */
.lz-about{ display:grid; grid-template-columns:1fr; gap:var(--sp-6); align-items:center; }
@media(min-width:820px){ .lz-about{ grid-template-columns:360px 1fr; gap:var(--sp-7); } }
.lz-about-photo{ position:relative; border-radius:20px; overflow:hidden; border:1px solid var(--line-2); background:#0e1017; max-width:380px; }
.lz-about-img{ display:block; width:100%; height:auto; object-fit:cover; filter:saturate(1.03) contrast(1.02); }
.lz-about-photo-tint{ position:absolute; inset:0; pointer-events:none; background:linear-gradient(180deg, transparent 62%, rgba(10,11,16,.34) 100%); }
.lz-about-p{ margin:var(--sp-3) 0 0; color:var(--fog); font-size:clamp(1rem,1.4vw,1.1rem); line-height:1.7; max-width:38rem; }
.lz-about-cta{ margin-top:var(--sp-5); }

/* ── Trust stats band ── */
.lz-stats-section{ padding-top:var(--sp-5); padding-bottom:var(--sp-5); }
.lz-stats-band{ display:grid; grid-template-columns:1fr; gap:var(--sp-4); border-block:1px solid var(--line); padding:var(--sp-6) 0; }
@media(min-width:760px){ .lz-stats-band{ grid-template-columns:repeat(3,1fr); gap:var(--sp-5); } }
.lz-statbig{ display:flex; flex-direction:column; gap:8px; }
.lz-statbig-num{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:clamp(2.4rem,4vw,3.2rem); letter-spacing:-.03em; line-height:1; color:var(--iris-2); }
.lz-statbig-label{ color:var(--fog); font-size:.98rem; line-height:1.55; max-width:22rem; }

/* ── Portfolio ── */
.lz-work-grid{ display:grid; grid-template-columns:1fr; gap:var(--sp-4); }
@media(min-width:760px){ .lz-work-grid{ grid-template-columns:1fr 1fr; } }
.lz-filter{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:var(--sp-5); }
.lz-filter-btn{ font-size:13.5px; font-weight:600; color:var(--fog); padding:9px 16px; border-radius:999px; cursor:pointer;
  border:1px solid var(--line-2); background:var(--surface);
  transition:color .2s ease, border-color .2s ease, background-color .2s ease; }
.lz-filter-btn:hover{ color:var(--paper); border-color:color-mix(in srgb, var(--iris) 45%, var(--line-2)); }
.lz-filter-btn:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }
.lz-filter-btn.is-active{ color:var(--on-accent); border-color:transparent; background:linear-gradient(180deg,var(--iris-2) 0%, var(--iris) 100%); box-shadow:0 8px 20px -10px var(--iris-glow); }
.lz-work{ display:flex; flex-direction:column; text-decoration:none; color:inherit; border:1px solid var(--line); border-radius:18px; overflow:hidden; background:linear-gradient(180deg, var(--surface) 0%, #101219 100%); box-shadow:0 1px 0 rgba(255,255,255,.04) inset, 0 24px 48px -32px rgba(0,0,0,.9); transition:transform .3s cubic-bezier(.22,1,.36,1), border-color .3s ease; }
.lz-work:hover{ transform:translateY(-4px); border-color:color-mix(in srgb, var(--iris) 40%, var(--line-2)); }
.lz-work:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }
.lz-work-body{ flex:1; display:flex; flex-direction:column; }
.lz-work-foot{ margin-top:auto; }
.lz-browser{ background:#0d0f15; border-bottom:1px solid var(--line); }
.lz-browser-bar{ display:flex; align-items:center; gap:6px; padding:10px 14px; border-bottom:1px solid var(--line); }
.lz-dot{ width:9px; height:9px; border-radius:999px; background:#2a2f3a; }
.lz-browser-url{ margin-left:10px; font-family:var(--font-geist-mono),monospace; font-size:11.5px; color:var(--fog-2); }
/* Langwerpige screenshot die langzaam door het beeld scrollt */
.lz-preview{ position:relative; height:230px; overflow:hidden; background:#fff; }
.lz-shot{ display:block; width:100%; height:auto; animation:lzShot 26s ease-in-out infinite alternate; }
.lz-work:hover .lz-shot{ animation-play-state:paused; }
/* calc(-100% + 230px) laat de onderkant van de screenshot exact op de framerand landen,
   ongeacht de weergavehoogte van de kaart. */
@keyframes lzShot{ 0%,8%{ transform:translateY(0); } 92%,100%{ transform:translateY(calc(-100% + 230px)); } }
.lz-work-body{ padding:22px; }
.lz-work-tag{ display:inline-block; font-family:var(--font-geist-mono),monospace; font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--iris-2); padding:4px 9px; border-radius:999px; border:1px solid color-mix(in srgb, var(--iris-2) 30%, transparent); }
.lz-work-title{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.2rem; letter-spacing:-.01em; margin-top:12px; }
.lz-work-desc{ margin-top:8px; color:var(--fog); font-size:.93rem; line-height:1.6; }
.lz-work-foot{ display:flex; align-items:center; justify-content:space-between; gap:var(--sp-3); flex-wrap:wrap; margin-top:18px; }
.lz-work-stack{ display:flex; flex-wrap:wrap; gap:6px; }
.lz-work-link{ display:inline-flex; align-items:center; gap:6px; font-size:.9rem; font-weight:600; color:var(--iris-2); text-decoration:none; border-radius:6px; transition:gap .2s ease, color .2s ease; white-space:nowrap; }
.lz-work-link:hover{ gap:9px; color:var(--iris); }
.lz-work-link:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }

/* ── Garanties ── */
.lz-guarantee-panel{ position:relative; overflow:hidden; border:1px solid var(--line-2); border-radius:28px; padding:clamp(32px,4.4vw,56px); background:linear-gradient(180deg, color-mix(in srgb, var(--iris) 7%, var(--surface)) 0%, var(--surface) 55%); }
.lz-guarantee-head{ max-width:640px; }
.lz-guarantee-grid{ margin-top:clamp(28px,3.6vw,40px); display:grid; grid-template-columns:1fr; gap:28px 32px; }
@media(min-width:640px){ .lz-guarantee-grid{ grid-template-columns:1fr 1fr; } }
@media(min-width:980px){ .lz-guarantee-grid{ grid-template-columns:repeat(3,1fr); } }
/* Uitgelichte belofte — bewust asymmetrisch t.o.v. het raster erboven. */
.lz-guarantee-feature{ margin-top:28px; display:flex; gap:20px; align-items:flex-start; padding:clamp(22px,2.6vw,30px); border-radius:20px;
  border:1px solid color-mix(in srgb, var(--iris) 34%, var(--line-2));
  background:linear-gradient(180deg, color-mix(in srgb, var(--iris) 12%, var(--surface-2)) 0%, var(--surface-2) 100%); }
@media(min-width:640px){ .lz-guarantee-feature{ align-items:center; gap:26px; } }
.lz-guarantee-feature-body{ flex:1; }
.lz-guarantee-feature-title{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:clamp(1.15rem,1.9vw,1.4rem); letter-spacing:-.015em; line-height:1.25; color:var(--paper); }
.lz-guarantee-feature .lz-guarantee-desc{ margin-top:8px; max-width:52rem; font-size:.98rem; }
.lz-guarantee-ico{ display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:12px; color:var(--iris-2); background:color-mix(in srgb, var(--iris) 13%, transparent); border:1px solid color-mix(in srgb, var(--iris) 26%, var(--line)); }
.lz-guarantee-title{ margin-top:16px; font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.05rem; letter-spacing:-.01em; line-height:1.3; color:var(--paper); }
.lz-guarantee-desc{ margin-top:9px; color:var(--fog); font-size:.9rem; line-height:1.6; }

/* ── FAQ ── */
.lz-head-center{ max-width:720px; margin-left:auto; margin-right:auto; text-align:center; }
.lz-head-center .lz-kicker{ justify-content:center; }
.lz-faq{ display:flex; flex-direction:column; gap:16px; max-width:860px; margin:0 auto; }
.lz-faq-item{ border:1px solid var(--line); border-radius:16px; background:var(--surface); padding:4px 26px; box-shadow:0 1px 0 rgba(255,255,255,.04) inset, 0 20px 40px -36px rgba(20,24,40,.4); transition:border-color .2s ease, box-shadow .25s ease; }
.lz-faq-item:hover{ border-color:color-mix(in srgb, var(--iris) 28%, var(--line-2)); }
.lz-faq-item[open]{ box-shadow:0 1px 0 rgba(255,255,255,.05) inset, 0 26px 48px -34px rgba(20,24,40,.5); }
.lz-faq-q{ display:flex; align-items:center; justify-content:space-between; gap:var(--sp-4); padding:22px 0; cursor:pointer; list-style:none; font-family:var(--font-bricolage),sans-serif; font-weight:600; font-size:1.12rem; letter-spacing:-.01em; color:var(--paper); }
.lz-faq-q::-webkit-details-marker{ display:none; }
.lz-faq-q:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; border-radius:6px; }
.lz-faq-chevron{ flex:none; width:34px; height:34px; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; color:var(--iris-2); border:1px solid var(--line-2); transition:transform .25s cubic-bezier(.22,1,.36,1), background-color .2s ease; }
.lz-faq-item[open] .lz-faq-chevron{ transform:rotate(180deg); background:color-mix(in srgb, var(--iris) 14%, transparent); }
.lz-faq-a{ padding:0 0 24px; color:var(--fog); font-size:1rem; line-height:1.7; }

/* ── Closing CTA ── */
.lz-cta{ position:relative; overflow:hidden; text-align:center; border:1px solid var(--line-2); border-radius:26px; padding:64px var(--sp-4); background:linear-gradient(180deg, #14161e 0%, #0e1016 100%); }
.lz-cta-glow{ position:absolute; inset:0; z-index:0; pointer-events:none; background:radial-gradient(60% 90% at 50% 0%, color-mix(in srgb, var(--iris) 22%, transparent) 0%, transparent 62%); }
.lz-cta > *{ position:relative; z-index:1; }
.lz-cta .lz-kicker{ justify-content:center; }
.lz-cta-title{ font-family:var(--font-bricolage),sans-serif; font-weight:800; letter-spacing:-.03em; line-height:1.02; font-size:clamp(2rem,5vw,3.4rem); margin:var(--sp-3) auto 0; max-width:18ch; }
.lz-cta-lead{ margin-left:auto; margin-right:auto; }
.lz-cta-center{ justify-content:center; margin-top:var(--sp-5); }
.lz-contact-grid{ display:grid; grid-template-columns:1fr; gap:var(--sp-6); align-items:start; }
@media(min-width:920px){ .lz-contact-grid{ grid-template-columns:minmax(0,0.9fr) minmax(0,1.1fr); gap:var(--sp-6); } }
.lz-contact-info .lz-h2{ margin-top:var(--sp-3); }
.lz-contact-p{ margin-top:var(--sp-3); color:var(--fog); font-size:clamp(1rem,1.4vw,1.08rem); line-height:1.7; max-width:34rem; }
.lz-contact-sub{ margin-top:var(--sp-5); font-weight:600; color:var(--paper); font-size:1.02rem; }
.lz-contact-list{ margin-top:14px; display:flex; flex-direction:column; gap:11px; }
.lz-contact-list li{ display:flex; align-items:flex-start; gap:11px; color:var(--fog); font-size:.98rem; line-height:1.5; }
.lz-contact-note{ margin-top:var(--sp-5); padding-top:var(--sp-4); border-top:1px solid var(--line); color:var(--fog); font-size:.96rem; line-height:1.65; max-width:34rem; }
.lz-cal-card{ width:100%; scroll-margin-top:100px; text-align:left; border:1px solid var(--line-2); border-radius:20px; overflow:hidden; background:#fff; box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -40px rgba(20,24,40,.4); }
.lz-cta-contacts{ display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:10px; margin-top:var(--sp-5); font-family:var(--font-geist-mono),monospace; font-size:13px; }
.lz-contact-link{ color:var(--paper); text-decoration:none; border-radius:6px; transition:color .18s ease; }
.lz-contact-link:hover{ color:var(--iris-2); }
.lz-contact-link:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }
.lz-contact-sep{ color:var(--fog-2); }
.lz-contact-muted{ color:var(--fog-2); }

/* ── Footer ── */
.lz-footer{ position:relative; z-index:1; max-width:var(--maxw); margin:0 auto; padding:var(--sp-7) var(--edge) var(--sp-6); }
.lz-footer-grid{ display:grid; grid-template-columns:1fr; gap:var(--sp-6); }
@media(min-width:560px){ .lz-footer-grid{ grid-template-columns:1fr 1fr; } }
@media(min-width:900px){ .lz-footer-grid{ grid-template-columns:2fr 1fr 1fr 1fr; gap:var(--sp-5); } }
.lz-footer .lz-logo{ height:26px; }
.lz-footer-brandcol{ max-width:360px; grid-column:1 / -1; }
@media(min-width:900px){ .lz-footer-brandcol{ grid-column:auto; } }
.lz-footer-tag{ margin-top:18px; color:var(--fog); font-size:.95rem; line-height:1.65; }
.lz-footer-h{ font-family:var(--font-geist-mono),monospace; font-weight:500; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--fog-2); margin-bottom:8px; }
.lz-footer-col{ display:flex; flex-direction:column; gap:14px; }
.lz-footer-link{ color:var(--fog); font-size:.95rem; text-decoration:none; border-radius:4px; width:fit-content; transition:color .18s ease; }
.lz-footer-link:hover{ color:var(--iris-2); }
.lz-footer-link:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }
/* Onderbalk */
.lz-footer-bar{ margin-top:var(--sp-6); padding-top:var(--sp-4); border-top:1px solid var(--line); display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; }
.lz-footer-copy{ color:var(--fog-2); font-size:.9rem; }
.lz-footer-sign{ display:inline-flex; align-items:center; gap:12px; color:var(--fog-2); font-size:.9rem; }
.lz-footer-sign-em{ color:var(--iris-2); font-weight:600; }
.lz-footer-in{ display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:8px; color:var(--fog); background:var(--surface-2); border:1px solid var(--line); transition:color .18s ease, border-color .18s ease; }
.lz-footer-in:hover{ color:var(--iris-2); border-color:color-mix(in srgb, var(--iris) 45%, var(--line-2)); }
.lz-footer-in:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }

/* ── Floating WhatsApp ── */
.lz-wa{ position:fixed; bottom:22px; right:22px; z-index:60; width:54px; height:54px; border-radius:999px; display:flex; align-items:center; justify-content:center; color:#fff; background:#20b95a; box-shadow:0 12px 30px -8px rgba(32,185,90,.6), 0 2px 6px rgba(0,0,0,.4); transition:transform .2s cubic-bezier(.34,1.56,.64,1); }
.lz-wa:hover{ transform:translateY(-3px) scale(1.05); }
.lz-wa:active{ transform:translateY(0) scale(1); }
.lz-wa:focus-visible{ outline:2px solid #fff; outline-offset:3px; }

/* ── Reveal + load animations ── */
.lz-anim{ opacity:0; animation:lzUp .7s cubic-bezier(.22,1,.36,1) forwards; }
.lz-reveal{ opacity:0; transform:translateY(26px); transition:opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
.lz-reveal.is-visible{ opacity:1; transform:translateY(0); }
@keyframes lzUp{ from{ opacity:0; transform:translateY(22px);} to{ opacity:1; transform:translateY(0);} }
@keyframes lzFloat{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-8px);} }
@keyframes lzReel{ 0%,8%{ transform:translateY(0);} 92%,100%{ transform:translateY(-1720px);} }

@media(max-width:480px){ .lz-eyebrow{ font-size:11px; letter-spacing:.08em; padding:6px 12px; } }
/* Clear the floating WhatsApp button so it never overlaps footer text on small screens */
@media(max-width:620px){ .lz-footer{ padding-bottom:92px; } }

/* ── Light theme ── keeps amber accent; flips base surfaces, text, lines, shadows ── */
/* ── Besparingscalculator ── */
.sc-head{ max-width:640px; margin:0 auto var(--sp-6); text-align:center; }
.sc-head .lz-kicker{ justify-content:center; }
.sc-head .lz-h2{ margin-top:var(--sp-3); }
.sc-head .lz-lead{ margin-left:auto; margin-right:auto; }
.sc-card{ position:relative; z-index:1; max-width:var(--maxw); margin:0 auto; border:1px solid var(--line); border-radius:26px; background:var(--surface); padding:clamp(24px,3.2vw,44px); box-shadow:0 1px 0 rgba(255,255,255,.05) inset, 0 30px 60px -40px rgba(20,24,40,.5); }
.sc-grid{ display:grid; grid-template-columns:1fr; gap:var(--sp-6); }
@media(min-width:880px){ .sc-grid{ grid-template-columns:1fr 1fr; gap:var(--sp-7); } }
.sc-field{ padding:20px 0; border-bottom:1px solid var(--line); }
.sc-field:first-child{ padding-top:0; }
.sc-field:last-child{ border-bottom:0; padding-bottom:0; }
.sc-label{ display:block; font-size:.92rem; font-weight:600; color:var(--paper); }
.sc-control{ display:flex; align-items:center; justify-content:space-between; gap:16px; margin-top:14px; }
.sc-value{ display:inline-flex; align-items:baseline; gap:12px; }
.sc-num{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:1.7rem; letter-spacing:-.02em; color:var(--paper); font-variant-numeric:tabular-nums; }
.sc-cur{ color:var(--fog); font-weight:700; margin-right:3px; }
.sc-unit{ font-family:var(--font-geist-mono),monospace; font-size:.78rem; color:var(--fog-2); }
.sc-steppers{ display:inline-flex; gap:8px; flex:none; }
.sc-step{ width:42px; height:42px; display:inline-flex; align-items:center; justify-content:center; font-size:1.3rem; line-height:1; color:var(--paper); background:var(--surface-2); border:1px solid var(--line-2); border-radius:12px; cursor:pointer; transition:transform .15s ease, border-color .2s ease; }
.sc-step:hover{ border-color:color-mix(in srgb, var(--iris) 55%, var(--line-2)); transform:translateY(-1px); }
.sc-step:active{ transform:translateY(0); }
.sc-step:focus-visible{ outline:2px solid var(--iris-2); outline-offset:2px; }
.sc-results-kicker{ display:block; font-family:var(--font-geist-mono),monospace; font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:var(--iris-2); margin-bottom:16px; }
.sc-result{ display:flex; align-items:center; justify-content:space-between; gap:12px; padding:16px 18px; border:1px solid var(--line); border-radius:16px; background:var(--ink); }
.sc-result + .sc-result{ margin-top:12px; }
.sc-result-label{ font-size:.95rem; font-weight:600; color:var(--paper); }
.sc-result-val{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:1.5rem; letter-spacing:-.02em; color:var(--paper); font-variant-numeric:tabular-nums; white-space:nowrap; }
.sc-result-hrs{ font-family:var(--font-geist-mono),monospace; font-size:.72rem; font-weight:400; letter-spacing:.02em; color:var(--fog-2); margin-left:8px; }
.sc-result.is-feat{ background:color-mix(in srgb, var(--iris) 14%, transparent); border-color:color-mix(in srgb, var(--iris) 45%, var(--line-2)); }
.sc-result.is-feat .sc-result-label{ color:var(--iris-2); }
.sc-note{ margin-top:16px; color:var(--fog-2); font-size:.82rem; line-height:1.6; }
.sc-foot{ margin-top:clamp(24px,3vw,32px); padding-top:clamp(24px,3vw,32px); border-top:1px solid var(--line); text-align:center; }
.sc-foot-text{ max-width:34rem; margin:0 auto; color:var(--fog); font-size:1rem; line-height:1.6; }
.sc-cta{ margin-top:var(--sp-4); }

.lz-light{
  --ink:#EFE9DC; --ink-2:#E8E1D1;
  --surface:#FCFAF5; --surface-2:#FFFFFF;
  --line:rgba(74,55,20,.15); --line-2:rgba(74,55,20,.24);
  --paper:#14171F; --fog:#525869; --fog-2:#8890A0;
  --iris-2:#A2650E; --mint:#15A34A;
}
.lz-light .lz-bg-grad{
  background:
    radial-gradient(48% 42% at 12% 0%, color-mix(in srgb, var(--iris) 26%, transparent) 0%, transparent 60%),
    radial-gradient(42% 40% at 92% 6%, color-mix(in srgb, var(--iris) 15%, transparent) 0%, transparent 58%),
    linear-gradient(180deg,#F5F0E5 0%, #EFE9DC 60%, #EFE9DC 100%);
}
.lz-light .lz-bg-grain{ opacity:.22; }
.lz-light .lz-nav-inner{ background:rgba(255,255,255,.74); box-shadow:0 1px 0 rgba(255,255,255,.7) inset, 0 18px 40px -26px rgba(20,24,40,.35); }
/* Fully dark logo on light theme — flattens the indigo mark to the same dark as the wordmark */
.lz-light .lz-logo{ filter:brightness(0); opacity:.92; }
.lz-light .lz-eyebrow{ background:rgba(20,24,40,.03); }
.lz-light .lz-flow-card-box{ background:linear-gradient(180deg,#FFFFFF 0%,#FBF6EC 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -40px rgba(74,55,20,.4); }
.lz-light .lz-flow-card-pill{ background:rgba(74,55,20,.04); border-color:rgba(74,55,20,.10); }
.lz-light .lz-flow-card-pill svg{ color:#0F8A43; }
.lz-light .lz-card,.lz-light .lz-work{ background:linear-gradient(180deg,#FFFFFF 0%,#FBF6EC 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 24px 48px -34px rgba(74,55,20,.4); }
.lz-light .lz-card:hover{ box-shadow:0 1px 0 rgba(255,255,255,1) inset, 0 30px 60px -34px rgba(74,55,20,.5), 0 20px 50px -32px var(--iris-glow); }
.lz-light .lz-card-list li{ color:#3A4150; }
.lz-light .lz-chip{ background:rgba(74,55,20,.05); }
.lz-light .lz-browser{ background:#EFEADF; }
.lz-light .lz-dot{ background:#CFC6B2; }
.lz-light .lz-preview{ background:#ffffff; }
.lz-light .lz-iris{ background:linear-gradient(100deg,#B4740E 0%, #E0952B 55%, #A2650E 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lz-light .lz-about-photo{ background:#E9EBEF; }
.lz-light .lz-about-img{ mix-blend-mode:normal; }
.lz-light .lz-cta{ background:linear-gradient(180deg,#FFFFFF 0%,#FBF6EC 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 40px 80px -50px rgba(74,55,20,.42); }
.lz-light .lz-wa{ box-shadow:0 12px 30px -8px rgba(32,185,90,.45), 0 2px 6px rgba(20,24,40,.15); }

@media(prefers-reduced-motion:reduce){
  .lz-anim,.lz-reveal{ opacity:1; transform:none; animation:none; transition:none; }
  .lz-flow-card{ animation:none; }
  .lz-flow-card-connector::after{ animation:none; opacity:1; }
  .lz-reelbox iframe{ animation:none; }
  .lz-marquee-band .logoloop__track{ transform:translate3d(0,0,0)!important; }
  .lz-marquee-band .logoloop__node{ transition:none!important; }
  .lz-btn,.lz-btn-arrow,.lz-nav-link,.lz-card,.lz-work,.lz-faq-plus,.lz-wa{ transition:none; }
  .lz-burger-bar,.lz-mobile-menu{ transition:none; }
}
`;
