"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SITE, DIENSTEN, PORTFOLIO_ITEMS, FAQS } from "../lib/content";
import CalEmbed from "./CalEmbed";

/* The pool of plain-language tasks the agent visibly clears in the live worklog.
   Kept in Dutch and concrete on purpose — this is the product made visible. */
const TASKS = [
  "Lead opgevolgd",
  "Offerte opgesteld",
  "E-mail beantwoord",
  "Factuur verwerkt",
  "Afspraak ingepland",
  "Data gesynct naar CRM",
  "Aanvraag doorgezet",
  "Rapportage verstuurd",
  "Nieuwe lead gekwalificeerd",
  "Werkbon verwerkt",
];

/* Tools shown in the scrolling marquee under the hero. */
const TOOLS = ["OpenAI", "Claude", "Make", "Zapier", "n8n", "HubSpot", "Pipedrive", "Exact", "AFAS", "Moneybird", "Slack", "Microsoft 365", "Google Workspace", "Supabase", "Stripe", "WhatsApp"];

/* Werkwijze — 4 steps, copy matches the live leadzsystems.nl site. */
const WERKWIJZE = [
  { nr: "01", title: "Intake gesprek", desc: "We beginnen met een vrijblijvend gesprek om te begrijpen wat je wil aanpakken, welke systemen je gebruikt en wat het meeste oplevert." },
  { nr: "02", title: "Ontwerp & voorstel", desc: "We leveren een helder voorstel met technische aanpak en vaste prijs. Pas als jij akkoord geeft, starten we." },
  { nr: "03", title: "Bouwen & testen", desc: "Wij bouwen je oplossing op maat, koppelen alle systemen en testen alles uitgebreid met jou erbij." },
  { nr: "04", title: "Live & onderhoud", desc: "Je oplossing gaat live. Wij zorgen voor hosting, updates en monitoring. Maand na maand, zonder gedoe." },
];

/* Trust stats — from the live site. */
const STATS = [
  { num: "50+", label: "tools en systemen waar we direct mee koppelen" },
  { num: "3 weken", label: "gemiddelde doorlooptijd van idee tot live" },
  { num: "100%", label: "tevredenheidsgarantie, we stoppen pas als jij blij bent" },
];

/* Prijzen — three plans, copy matches the live site. */
const PRIJZEN = [
  {
    name: "Starter",
    price: "€250",
    setup: "€2.500 setup",
    tagline: "Jouw eerste oplossing live. Eén automatisering, website of koppeling op maat.",
    features: ["1 automatisering, website of koppeling", "Tot 3 systemen gekoppeld", "Oplevering binnen 2 tot 4 weken", "Hosting en onderhoud", "Maandelijkse rapportage", "E-mail support"],
    cta: "Start je project",
    featured: false,
  },
  {
    name: "Growth",
    price: "€350",
    setup: "€3.500 setup",
    tagline: "Meer koppelingen, AI-workflows en een oplossing die écht meegroeit met jouw bedrijf.",
    features: ["Meerdere automatiseringen en koppelingen", "Tot 7 systemen gekoppeld", "Realtime inzicht in je data", "Hosting en onderhoud", "AI-workflows en slimme notificaties", "Wekelijkse rapportages", "Prioriteit support en kwartaalgesprek"],
    cta: "Start je project",
    featured: true,
  },
  {
    name: "Custom",
    price: "Op maat",
    setup: "",
    tagline: "Complexe automatisering, meerdere oplossingen of specifieke wensen. We denken graag mee.",
    features: ["Onbeperkt koppelingen", "Onbeperkt automatiseringen", "Maatwerk AI-integraties", "Dedicated ontwikkelaar", "SLA met uptime garantie", "24/7 telefoon support"],
    cta: "Neem contact op",
    featured: false,
  },
];

type LogLine = { id: number; time: string; task: string; state: "running" | "done" };

/* Format minutes-of-day into HH:MM so the log reads like a real clock ticking forward. */
function fmt(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
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
  const [lines, setLines] = useState<LogLine[]>([]);
  const [count, setCount] = useState(1284);
  const [palette, setPalette] = useState<React.CSSProperties>({});
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [bg, setBg] = useState<"mesh" | "flow" | "nodes" | "contour" | "dots">("mesh");
  const [menuOpen, setMenuOpen] = useState(false);
  const idRef = useRef(0);
  const clockRef = useRef(7 * 60 + 41); // start the fictional day at 07:41
  const reducedRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // ── Live agent worklog ──
  useEffect(() => {
    // Amber is the chosen brand accent; ?p=iris|teal stays available for comparison.
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p") ?? "amber";
    setPalette(PALETTES[p] ?? PALETTES.amber);
    if (params.get("t") === "dark") setTheme("dark");
    else if (params.get("t") === "light") setTheme("light");
    const b = params.get("bg");
    if (b === "mesh" || b === "flow" || b === "nodes" || b === "contour" || b === "dots") setBg(b);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;

    const seed: LogLine[] = TASKS.slice(0, 4).map((task, i) => {
      idRef.current += 1;
      clockRef.current += 1 + (i % 2);
      return { id: idRef.current, time: fmt(clockRef.current), task, state: "done" };
    });
    idRef.current += 1;
    clockRef.current += 2;
    seed.push({ id: idRef.current, time: fmt(clockRef.current), task: TASKS[4], state: "running" });
    setLines(seed);

    if (mq.matches) return; // honour reduced motion: static filled log, no ticking

    const tick = () => {
      setLines((prev) => {
        const done = prev.map((l) => ({ ...l, state: "done" as const }));
        idRef.current += 1;
        clockRef.current += 1 + Math.floor(Math.random() * 3);
        const next: LogLine = {
          id: idRef.current,
          time: fmt(clockRef.current),
          task: TASKS[idRef.current % TASKS.length],
          state: "running",
        };
        return [...done, next].slice(-5);
      });
      setCount((c) => c + 1 + Math.floor(Math.random() * 2));
    };

    const interval = window.setInterval(tick, 1900);
    return () => window.clearInterval(interval);
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
              <a href="#prijzen" className="lz-nav-link">Prijzen</a>
              <a href="#over-ons" className="lz-nav-link">Over ons</a>
              <a href="/nieuws" className="lz-nav-link">Nieuws</a>
            </div>
            <a href="#contact" className="lz-btn lz-btn-primary lz-nav-cta">Plan een gesprek</a>
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
              {[["#diensten", "Diensten"], ["#werkwijze", "Werkwijze"], ["#portfolio", "Portfolio"], ["#prijzen", "Prijzen"], ["#over-ons", "Over ons"], ["/nieuws", "Nieuws"]].map(([href, label]) => (
                <a key={href} href={href} className="lz-mobile-link" onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
              <a href="#contact" className="lz-btn lz-btn-primary lz-mobile-cta" onClick={() => setMenuOpen(false)}>Plan een gesprek</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="lz-hero">
        <div className="lz-hero-grid">
          <div className="lz-col-text">
            <span className="lz-eyebrow lz-anim" style={{ animationDelay: "40ms" }}>
              <span className="lz-live-dot" aria-hidden />
              AI-software &amp; automatisering voor het MKB
            </span>

            <h1 className="lz-h1">
              <span className="lz-line lz-anim" style={{ animationDelay: "120ms" }}>Software die werkt.</span>
              <span className="lz-line lz-iris lz-anim" style={{ animationDelay: "240ms" }}>Processen die lopen.</span>
            </h1>

            <p className="lz-sub lz-anim" style={{ animationDelay: "420ms" }}>
              Leadz Systems bouwt slimme software en automatiseringen op maat, zodat jij je
              op de groei van je bedrijf kunt richten.
            </p>

            <div className="lz-cta-row lz-anim" style={{ animationDelay: "520ms" }}>
              <a href="#contact" className="lz-btn lz-btn-primary">
                Plan een vrijblijvend gesprek
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="lz-btn-arrow">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#diensten" className="lz-btn lz-btn-ghost">Bekijk wat we doen</a>
            </div>

          </div>

          {/* Signature — live agent worklog */}
          <div className="lz-col-panel lz-anim" style={{ animationDelay: "360ms" }}>
            <div className="lz-panel">
              <div className="lz-panel-head">
                <span className="lz-panel-live">
                  <span className="lz-live-dot" aria-hidden />
                  agent · leadz
                </span>
                <span className="lz-panel-badge">24/7 actief</span>
              </div>

              <div className="lz-log" role="log" aria-label="Live activiteit van de agent">
                <div className="lz-log-fade" aria-hidden />
                {lines.map((l) => (
                  <div key={l.id} className="lz-log-line">
                    <span className="lz-log-time">{l.time}</span>
                    <span className="lz-log-task">{l.task}</span>
                    {l.state === "running" ? (
                      <span className="lz-log-run" aria-label="bezig"><span className="lz-spinner" aria-hidden /></span>
                    ) : (
                      <span className="lz-log-done" aria-label="klaar">
                        <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
                          <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="lz-panel-foot">
                <div className="lz-counter">
                  <span className="lz-counter-num">{count.toLocaleString("nl-NL")}</span>
                  <span className="lz-counter-label">taken vandaag afgehandeld</span>
                </div>
                <span className="lz-panel-status"><span className="lz-live-dot" aria-hidden />live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Tools marquee ── */}
      <section className="lz-marquee-band" aria-label="Tools waarmee we koppelen">
        <p className="lz-marquee-label">Koppelt naadloos met de tools die je al gebruikt</p>
        <div className="lz-marquee">
          <div className="lz-marquee-track">
            {[...TOOLS, ...TOOLS].map((t, i) => (
              <span className="lz-tool" key={i}>
                <span className="lz-tool-dot" aria-hidden />
                {t}
              </span>
            ))}
          </div>
        </div>
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
            <article key={d.slug} className="lz-card lz-reveal" style={{ transitionDelay: `${i * 70}ms` }}>
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
            </article>
          ))}
        </div>
      </section>

      {/* ── Werkwijze — a real sequence, so numbering earns its place ── */}
      <section id="werkwijze" className="lz-section">
        <div className="lz-head lz-reveal">
          <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Werkwijze</span>
          <h2 className="lz-h2">Van idee naar live<br />oplossing in 4 stappen.</h2>
          <p className="lz-lead">We houden het simpel. Jij vertelt ons wat je wil bereiken. Wij zorgen dat het werkt.</p>
        </div>

        <ol className="lz-steps">
          {WERKWIJZE.map((s) => (
            <li key={s.nr} className="lz-step lz-reveal">
              <span className="lz-step-nr">{s.nr}</span>
              <div className="lz-step-body">
                <h3 className="lz-step-title">{s.title}</h3>
                <p className="lz-step-desc">{s.desc}</p>
              </div>
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
              <a href="#contact" className="lz-btn lz-btn-primary">
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

        <div className="lz-work-grid">
          {PORTFOLIO_ITEMS.map((p, i) => (
            <article key={p.slug} className="lz-work lz-reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="lz-browser">
                <div className="lz-browser-bar">
                  <span className="lz-dot" /><span className="lz-dot" /><span className="lz-dot" />
                  <span className="lz-browser-url">{p.domain}</span>
                </div>
                <div className="lz-preview">
                  <div className="lz-reelbox">
                    <iframe
                      src={p.url}
                      title={`Preview van ${p.title}`}
                      loading="lazy"
                      scrolling="no"
                      tabIndex={-1}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <a className="lz-preview-cover" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title} in een nieuw tabblad`} />
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
                  <a className="lz-work-link" href={p.url} target="_blank" rel="noopener noreferrer">
                    Bekijk live
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                      <path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Prijzen ── */}
      <section id="prijzen" className="lz-section">
        <div className="lz-head lz-reveal">
          <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Prijzen</span>
          <h2 className="lz-h2">Transparante,<br />vaste prijzen.</h2>
          <p className="lz-lead">
            Geen verborgen kosten, geen uurtje-factuurtje. We werken met een eenmalige setup
            en een vast maandbedrag.
          </p>
        </div>

        <div className="lz-price-grid">
          {PRIJZEN.map((p, i) => (
            <article key={p.name} className={`lz-price lz-reveal${p.featured ? " lz-price-featured" : ""}`} style={{ transitionDelay: `${i * 70}ms` }}>
              {p.featured && <span className="lz-price-badge">Meest gekozen</span>}
              <h3 className="lz-price-name">{p.name}</h3>
              <div className="lz-price-amount">
                <span className="lz-price-num">{p.price}</span>
                {p.setup ? <span className="lz-price-per">/maand</span> : <span className="lz-price-per">&nbsp;</span>}
              </div>
              <span className="lz-price-setup">{p.setup || "op aanvraag"}</span>
              <p className="lz-price-tagline">{p.tagline}</p>
              <ul className="lz-price-list">
                {p.features.map((f) => (
                  <li key={f}>
                    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden className="lz-tick"><path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`lz-btn ${p.featured ? "lz-btn-primary" : "lz-btn-ghost"} lz-price-cta`}>{p.cta}</a>
            </article>
          ))}
        </div>
        <p className="lz-price-note lz-reveal">Alle prijzen zijn excl. btw. Setup is eenmalig. Maandabonnement opzegbaar per kwartaal.</p>
      </section>

      {/* ── FAQ ── */}
      <section className="lz-section">
        <div className="lz-head lz-reveal">
          <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Veelgestelde vragen</span>
          <h2 className="lz-h2">Goed om<br />te weten.</h2>
        </div>
        <div className="lz-faq lz-reveal">
          {FAQS.map((f) => (
            <details key={f.q} className="lz-faq-item">
              <summary className="lz-faq-q">
                {f.q}
                <span className="lz-faq-plus" aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </span>
              </summary>
              <p className="lz-faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Contact / closing CTA ── */}
      <section id="contact" className="lz-section">
        <div className="lz-cta lz-reveal">
          <div className="lz-cta-glow" aria-hidden />
          <span className="lz-kicker"><span className="lz-kicker-dot" aria-hidden />Contact</span>
          <h2 className="lz-cta-title">Klaar om <span className="lz-iris">slimmer</span><br />te werken?</h2>
          <p className="lz-lead lz-cta-lead">
            Kies hieronder direct een moment dat jou uitkomt. Past er niets tussen? Bel of app
            ons, dan plannen we samen een ander tijdstip.
          </p>
          <div className="lz-cal-card">
            <CalEmbed calUrl={SITE.cal} />
          </div>
          <div className="lz-cta-contacts">
            <a href={`tel:${SITE.phoneIntl}`} className="lz-contact-link">{SITE.phone}</a>
            <span className="lz-contact-sep" aria-hidden>·</span>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="lz-contact-link">WhatsApp</a>
            <span className="lz-contact-sep" aria-hidden>·</span>
            <a href={`mailto:${SITE.email}`} className="lz-contact-link">{SITE.email}</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lz-footer">
        <div className="lz-footer-grid">
          <div className="lz-footer-brandcol">
            <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="lz-logo" />
            <p className="lz-footer-tag">
              Leadz Systems helpt ondernemers en teams in Nederland AI en automations praktisch
              toe te passen, via software op maat, koppelingen en implementatie.
            </p>
            <p className="lz-footer-copy">© {year} {SITE.name}</p>
          </div>

          <div className="lz-footer-col">
            <h3 className="lz-footer-h">Over {SITE.name}</h3>
            <p className="lz-footer-person"><strong>Jesse</strong>, oprichter</p>
            <a href="https://www.linkedin.com/company/leadz-systems/" target="_blank" rel="noopener noreferrer" className="lz-footer-link">LinkedIn</a>
            <a href={`mailto:${SITE.email}`} className="lz-footer-link">{SITE.email}</a>
          </div>

          <div className="lz-footer-col">
            <h3 className="lz-footer-h">Bedrijfsgegevens</h3>
            <p className="lz-footer-line">{SITE.name}</p>
            <p className="lz-footer-line"><span className="lz-footer-label">KvK:</span> {SITE.kvk}</p>
            <div className="lz-footer-legal">
              <a href="#contact" className="lz-footer-link">Contact</a>
            </div>
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
.lz-live-dot{ width:7px; height:7px; border-radius:999px; background:var(--mint); box-shadow:0 0 0 0 rgba(74,222,158,.55); animation:lzPulse 2.4s ease-out infinite; }
.lz-h1{ font-family:var(--font-bricolage),var(--font-geist-sans),sans-serif; font-weight:800; letter-spacing:-.03em; line-height:.98; font-size:clamp(2.85rem,7vw,4.9rem); margin:var(--sp-4) 0 0; }
.lz-h1 .lz-line{ display:block; }
.lz-iris{ background:linear-gradient(100deg,var(--iris-2) 0%, color-mix(in srgb, var(--iris-2) 55%, #fff) 55%, var(--iris) 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lz-sub{ max-width:33rem; margin:var(--sp-4) 0 0; color:var(--fog); font-size:clamp(1.02rem,1.5vw,1.16rem); line-height:1.7; }
.lz-cta-row{ display:flex; flex-wrap:wrap; gap:var(--sp-2); margin-top:var(--sp-5); }
.lz-trust{ margin-top:var(--sp-4); color:var(--fog-2); font-family:var(--font-geist-mono),monospace; font-size:12.5px; letter-spacing:.02em; }

/* ── Signature panel ── */
.lz-col-panel{ perspective:1400px; }
.lz-panel{ position:relative; border:1px solid var(--line-2); border-radius:20px; overflow:hidden;
  background:linear-gradient(180deg, rgba(26,30,40,.92) 0%, rgba(18,21,28,.94) 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.06) inset, 0 40px 80px -40px rgba(0,0,0,.95), 0 30px 60px -30px color-mix(in srgb, var(--iris) 30%, transparent);
  animation:lzFloat 8s ease-in-out infinite; }
.lz-panel::before{ content:""; position:absolute; inset:0; pointer-events:none; border-radius:inherit; background:radial-gradient(90% 60% at 90% 0%, color-mix(in srgb, var(--iris) 16%, transparent) 0%, transparent 60%); }
.lz-panel-head{ display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--line); }
.lz-panel-live{ display:inline-flex; align-items:center; gap:9px; font-family:var(--font-geist-mono),monospace; font-size:13px; color:var(--paper); letter-spacing:.02em; }
.lz-panel-badge{ font-family:var(--font-geist-mono),monospace; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:var(--iris-2); padding:4px 9px; border-radius:999px;
  border:1px solid color-mix(in srgb, var(--iris-2) 34%, transparent); background:color-mix(in srgb, var(--iris) 12%, transparent); }
.lz-log{ position:relative; padding:8px 6px 8px 16px; height:236px; display:flex; flex-direction:column; justify-content:flex-end; }
.lz-log-fade{ position:absolute; top:0; left:0; right:0; height:56px; z-index:2; pointer-events:none; background:linear-gradient(180deg, rgba(20,23,31,.98), transparent); }
.lz-log-line{ display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:12px; padding:9px 10px 9px 0; font-family:var(--font-geist-mono),monospace; font-size:13.5px; border-top:1px solid rgba(255,255,255,.05); animation:lzLineIn .5s cubic-bezier(.22,1,.36,1) both; }
.lz-log-time{ color:var(--fog-2); font-variant-numeric:tabular-nums; }
.lz-log-task{ color:var(--paper); font-family:var(--font-geist-sans),sans-serif; font-size:14px; }
.lz-log-done{ display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border-radius:6px; color:var(--mint); background:rgba(74,222,158,.12); border:1px solid rgba(74,222,158,.28); }
.lz-log-run{ display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; }
.lz-spinner{ width:13px; height:13px; border-radius:999px; border:2px solid color-mix(in srgb, var(--iris-2) 26%, transparent); border-top-color:var(--iris-2); animation:lzSpin .7s linear infinite; }
.lz-panel-foot{ display:flex; align-items:center; justify-content:space-between; gap:var(--sp-3); flex-wrap:wrap; padding:14px 16px; border-top:1px solid var(--line); background:rgba(10,11,16,.4); }
.lz-counter{ display:flex; flex-direction:column; gap:2px; }
.lz-counter-num{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:22px; letter-spacing:-.01em; color:var(--paper); font-variant-numeric:tabular-nums; }
.lz-counter-label{ font-size:11.5px; color:var(--fog-2); }
.lz-panel-status{ display:inline-flex; align-items:center; gap:7px; font-family:var(--font-geist-mono),monospace; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--fog-2); }
.lz-chip{ font-family:var(--font-geist-mono),monospace; font-size:11px; color:var(--fog); padding:4px 9px; border:1px solid var(--line); border-radius:7px; background:rgba(255,255,255,.02); }

/* ── Tools marquee (full-width bar under the hero) ── */
.lz-marquee-band{ position:relative; z-index:1; padding:var(--sp-5) 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.lz-marquee-label{ text-align:center; font-family:var(--font-geist-mono),monospace; font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--fog-2); margin-bottom:var(--sp-4); padding:0 var(--edge); }
.lz-marquee{ overflow:hidden; -webkit-mask-image:linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image:linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.lz-marquee-track{ display:flex; align-items:center; width:max-content; animation:lzMarquee 48s linear infinite; }
.lz-marquee:hover .lz-marquee-track{ animation-play-state:paused; }
.lz-tool{ display:inline-flex; align-items:center; gap:16px; padding:0 26px; font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.28rem; letter-spacing:-.01em; color:var(--fog); white-space:nowrap; }
.lz-tool-dot{ width:5px; height:5px; border-radius:2px; background:var(--iris); transform:rotate(45deg); }
@keyframes lzMarquee{ from{ transform:translateX(-50%); } to{ transform:translateX(0); } }

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
.lz-card{ position:relative; border:1px solid var(--line); border-radius:18px; padding:26px; background:linear-gradient(180deg, var(--surface) 0%, #101219 100%);
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

/* ── Werkwijze ── */
.lz-steps{ display:grid; grid-template-columns:1fr; gap:0; counter-reset:none; list-style:none; }
.lz-step{ display:grid; grid-template-columns:auto 1fr; gap:20px; padding:24px 0; border-top:1px solid var(--line); }
.lz-step:last-child{ border-bottom:1px solid var(--line); }
.lz-step-nr{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:1.5rem; line-height:1; color:transparent; -webkit-text-stroke:1.4px color-mix(in srgb, var(--iris) 70%, transparent); min-width:3ch; font-variant-numeric:tabular-nums; }
.lz-step-title{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.25rem; letter-spacing:-.01em; }
.lz-step-desc{ margin-top:6px; color:var(--fog); font-size:.98rem; line-height:1.65; max-width:44rem; }
@media(min-width:760px){ .lz-step{ grid-template-columns:120px 1fr; align-items:baseline; gap:32px; padding:30px 0; } .lz-step-nr{ font-size:2.4rem; } }


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

/* ── Prijzen ── */
.lz-price-grid{ display:grid; grid-template-columns:1fr; gap:var(--sp-4); align-items:stretch; }
@media(min-width:860px){ .lz-price-grid{ grid-template-columns:repeat(3,1fr); } }
.lz-price{ position:relative; display:flex; flex-direction:column; border:1px solid var(--line); border-radius:20px; padding:28px; background:linear-gradient(180deg, var(--surface) 0%, #101219 100%); box-shadow:0 1px 0 rgba(255,255,255,.04) inset, 0 24px 48px -34px rgba(0,0,0,.9); }
.lz-price-featured{ border-color:color-mix(in srgb, var(--iris) 55%, var(--line-2)); box-shadow:0 1px 0 rgba(255,255,255,.06) inset, 0 30px 60px -30px rgba(0,0,0,.95), 0 24px 60px -30px var(--iris-glow); }
@media(min-width:860px){ .lz-price-featured{ transform:translateY(-10px); } }
.lz-price-badge{ position:absolute; top:-11px; left:28px; font-family:var(--font-geist-mono),monospace; font-size:11px; letter-spacing:.05em; text-transform:uppercase; color:var(--on-accent); padding:5px 11px; border-radius:999px; background:linear-gradient(180deg,var(--iris-2),var(--iris)); box-shadow:0 6px 16px -6px var(--iris-glow); }
.lz-price-name{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.3rem; }
.lz-price-amount{ display:flex; align-items:baseline; gap:6px; margin-top:14px; }
.lz-price-num{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:2.5rem; letter-spacing:-.03em; line-height:1; color:var(--paper); }
.lz-price-per{ color:var(--fog-2); font-size:.95rem; }
.lz-price-setup{ display:block; margin-top:8px; font-family:var(--font-geist-mono),monospace; font-size:12.5px; color:var(--iris-2); }
.lz-price-tagline{ margin-top:16px; color:var(--fog); font-size:.95rem; line-height:1.6; }
.lz-price-list{ margin-top:20px; margin-bottom:24px; display:flex; flex-direction:column; gap:11px; flex:1; }
.lz-price-list li{ display:flex; align-items:flex-start; gap:10px; font-size:.92rem; color:#C4C8D4; line-height:1.45; }
.lz-price-cta{ width:100%; }
.lz-price-note{ margin-top:var(--sp-4); text-align:center; color:var(--fog-2); font-size:.86rem; }

/* ── Portfolio ── */
.lz-work-grid{ display:grid; grid-template-columns:1fr; gap:var(--sp-4); }
@media(min-width:760px){ .lz-work-grid{ grid-template-columns:1fr 1fr; } }
.lz-work{ border:1px solid var(--line); border-radius:18px; overflow:hidden; background:linear-gradient(180deg, var(--surface) 0%, #101219 100%); box-shadow:0 1px 0 rgba(255,255,255,.04) inset, 0 24px 48px -32px rgba(0,0,0,.9); transition:transform .3s cubic-bezier(.22,1,.36,1), border-color .3s ease; }
.lz-work:hover{ transform:translateY(-4px); border-color:var(--line-2); }
.lz-browser{ background:#0d0f15; border-bottom:1px solid var(--line); }
.lz-browser-bar{ display:flex; align-items:center; gap:6px; padding:10px 14px; border-bottom:1px solid var(--line); }
.lz-dot{ width:9px; height:9px; border-radius:999px; background:#2a2f3a; }
.lz-browser-url{ margin-left:10px; font-family:var(--font-geist-mono),monospace; font-size:11.5px; color:var(--fog-2); }
.lz-preview{ position:relative; height:230px; overflow:hidden; background:#0e1017; }
.lz-reelbox{ position:absolute; top:0; left:0; width:1280px; transform:scale(.42); transform-origin:top left; }
.lz-reelbox iframe{ display:block; width:1280px; height:2600px; border:0; background:#fff; animation:lzReel 24s ease-in-out infinite alternate; }
.lz-preview:hover .lz-reelbox iframe{ animation-play-state:paused; }
.lz-preview-cover{ position:absolute; inset:0; z-index:2; display:block; }
.lz-work-body{ padding:22px; }
.lz-work-tag{ display:inline-block; font-family:var(--font-geist-mono),monospace; font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--iris-2); padding:4px 9px; border-radius:999px; border:1px solid color-mix(in srgb, var(--iris-2) 30%, transparent); }
.lz-work-title{ font-family:var(--font-bricolage),sans-serif; font-weight:700; font-size:1.2rem; letter-spacing:-.01em; margin-top:12px; }
.lz-work-desc{ margin-top:8px; color:var(--fog); font-size:.93rem; line-height:1.6; }
.lz-work-foot{ display:flex; align-items:center; justify-content:space-between; gap:var(--sp-3); flex-wrap:wrap; margin-top:18px; }
.lz-work-stack{ display:flex; flex-wrap:wrap; gap:6px; }
.lz-work-link{ display:inline-flex; align-items:center; gap:6px; font-size:.9rem; font-weight:600; color:var(--iris-2); text-decoration:none; border-radius:6px; transition:gap .2s ease, color .2s ease; white-space:nowrap; }
.lz-work-link:hover{ gap:9px; color:var(--iris); }
.lz-work-link:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }

/* ── FAQ ── */
.lz-faq{ border-top:1px solid var(--line); }
.lz-faq-item{ border-bottom:1px solid var(--line); }
.lz-faq-q{ display:flex; align-items:center; justify-content:space-between; gap:var(--sp-4); padding:22px 4px; cursor:pointer; list-style:none; font-family:var(--font-bricolage),sans-serif; font-weight:600; font-size:1.12rem; letter-spacing:-.01em; color:var(--paper); }
.lz-faq-q::-webkit-details-marker{ display:none; }
.lz-faq-q:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; border-radius:6px; }
.lz-faq-plus{ flex:none; width:32px; height:32px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; color:var(--iris-2); border:1px solid var(--line-2); transition:transform .25s cubic-bezier(.22,1,.36,1), background-color .2s ease; }
.lz-faq-item[open] .lz-faq-plus{ transform:rotate(135deg); background:color-mix(in srgb, var(--iris) 14%, transparent); }
.lz-faq-a{ padding:0 4px 24px; color:var(--fog); font-size:1rem; line-height:1.7; max-width:52rem; }

/* ── Closing CTA ── */
.lz-cta{ position:relative; overflow:hidden; text-align:center; border:1px solid var(--line-2); border-radius:26px; padding:64px var(--sp-4); background:linear-gradient(180deg, #14161e 0%, #0e1016 100%); }
.lz-cta-glow{ position:absolute; inset:0; z-index:0; pointer-events:none; background:radial-gradient(60% 90% at 50% 0%, color-mix(in srgb, var(--iris) 22%, transparent) 0%, transparent 62%); }
.lz-cta > *{ position:relative; z-index:1; }
.lz-cta .lz-kicker{ justify-content:center; }
.lz-cta-title{ font-family:var(--font-bricolage),sans-serif; font-weight:800; letter-spacing:-.03em; line-height:1.02; font-size:clamp(2rem,5vw,3.4rem); margin:var(--sp-3) auto 0; max-width:18ch; }
.lz-cta-lead{ margin-left:auto; margin-right:auto; }
.lz-cta-center{ justify-content:center; margin-top:var(--sp-5); }
.lz-cal-card{ width:100%; margin-top:var(--sp-5); text-align:left; border:1px solid var(--line-2); border-radius:20px; overflow:hidden; background:#fff; box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -40px rgba(20,24,40,.4); }
.lz-cta-contacts{ display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:10px; margin-top:var(--sp-5); font-family:var(--font-geist-mono),monospace; font-size:13px; }
.lz-contact-link{ color:var(--paper); text-decoration:none; border-radius:6px; transition:color .18s ease; }
.lz-contact-link:hover{ color:var(--iris-2); }
.lz-contact-link:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }
.lz-contact-sep{ color:var(--fog-2); }
.lz-contact-muted{ color:var(--fog-2); }

/* ── Footer ── */
.lz-footer{ position:relative; z-index:1; max-width:var(--maxw); margin:0 auto; padding:var(--sp-7) var(--edge) var(--sp-6); border-top:1px solid var(--line); }
.lz-footer-grid{ display:grid; grid-template-columns:1fr; gap:var(--sp-6); }
@media(min-width:760px){ .lz-footer-grid{ grid-template-columns:1.7fr 1fr 1.2fr; gap:var(--sp-5); } }
.lz-footer .lz-logo{ height:24px; }
.lz-footer-brandcol{ max-width:360px; }
.lz-footer-tag{ margin-top:18px; color:var(--fog); font-size:.95rem; line-height:1.65; }
.lz-footer-copy{ margin-top:20px; color:var(--fog-2); font-size:.9rem; }
.lz-footer-h{ font-family:var(--font-geist-sans),sans-serif; font-weight:600; font-size:1rem; color:var(--paper); margin-bottom:16px; }
.lz-footer-col{ display:flex; flex-direction:column; gap:12px; }
.lz-footer-person{ color:var(--fog); font-size:.95rem; }
.lz-footer-person strong{ color:var(--paper); font-weight:600; }
.lz-footer-line{ color:var(--fog); font-size:.95rem; line-height:1.5; }
.lz-footer-label{ color:var(--paper); font-weight:500; }
.lz-footer-link{ color:var(--fog); font-size:.95rem; text-decoration:none; border-radius:4px; width:fit-content; transition:color .18s ease; }
.lz-footer-link:hover{ color:var(--iris-2); }
.lz-footer-link:focus-visible{ outline:2px solid var(--iris-2); outline-offset:3px; }
.lz-footer-legal{ display:flex; flex-wrap:wrap; gap:var(--sp-4); margin-top:8px; }

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
@keyframes lzLineIn{ from{ opacity:0; transform:translateY(8px);} to{ opacity:1; transform:translateY(0);} }
@keyframes lzSpin{ to{ transform:rotate(360deg);} }
@keyframes lzPulse{ 0%{ box-shadow:0 0 0 0 rgba(74,222,158,.5);} 70%{ box-shadow:0 0 0 8px rgba(74,222,158,0);} 100%{ box-shadow:0 0 0 0 rgba(74,222,158,0);} }
@keyframes lzFloat{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-8px);} }
@keyframes lzReel{ 0%,8%{ transform:translateY(0);} 92%,100%{ transform:translateY(-1720px);} }

@media(max-width:480px){ .lz-eyebrow{ font-size:11px; letter-spacing:.08em; padding:6px 12px; } }
/* Clear the floating WhatsApp button so it never overlaps footer text on small screens */
@media(max-width:620px){ .lz-footer{ padding-bottom:92px; } }

/* ── Light theme ── keeps amber accent; flips base surfaces, text, lines, shadows ── */
.lz-light{
  --ink:#F3F4F7; --ink-2:#EDEFF3;
  --surface:#ffffff; --surface-2:#ffffff;
  --line:rgba(16,20,32,.10); --line-2:rgba(16,20,32,.16);
  --paper:#14171F; --fog:#525869; --fog-2:#8890A0;
  --iris-2:#A2650E; --mint:#15A34A;
}
.lz-light .lz-bg-grad{
  background:
    radial-gradient(48% 42% at 12% 0%, color-mix(in srgb, var(--iris) 26%, transparent) 0%, transparent 60%),
    radial-gradient(42% 40% at 92% 6%, color-mix(in srgb, var(--iris) 15%, transparent) 0%, transparent 58%),
    linear-gradient(180deg,#F8F7F4 0%, #F3F4F7 60%, #F3F4F7 100%);
}
.lz-light .lz-bg-grain{ opacity:.22; }
.lz-light .lz-nav-inner{ background:rgba(255,255,255,.74); box-shadow:0 1px 0 rgba(255,255,255,.7) inset, 0 18px 40px -26px rgba(20,24,40,.35); }
/* Fully dark logo on light theme — flattens the indigo mark to the same dark as the wordmark */
.lz-light .lz-logo{ filter:brightness(0); opacity:.92; }
.lz-light .lz-eyebrow{ background:rgba(20,24,40,.03); }
.lz-light .lz-panel{ background:linear-gradient(180deg,#ffffff 0%,#F6F7FA 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 40px 80px -46px rgba(20,24,40,.4), 0 30px 60px -34px color-mix(in srgb,var(--iris) 24%,transparent); }
.lz-light .lz-panel-foot{ background:rgba(20,24,40,.03); }
.lz-light .lz-log-fade{ background:linear-gradient(180deg, rgba(255,255,255,.98), transparent); }
.lz-light .lz-log-line{ border-top-color:rgba(16,20,32,.08); }
.lz-light .lz-log-done{ color:#0F8A43; background:rgba(21,163,74,.12); border-color:rgba(21,163,74,.30); }
.lz-light .lz-card,.lz-light .lz-work{ background:linear-gradient(180deg,#ffffff 0%,#F6F7FA 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 24px 48px -34px rgba(20,24,40,.32); }
.lz-light .lz-card:hover{ box-shadow:0 1px 0 rgba(255,255,255,1) inset, 0 30px 60px -34px rgba(20,24,40,.4), 0 20px 50px -32px var(--iris-glow); }
.lz-light .lz-card-list li,.lz-light .lz-price-list li{ color:#3A4150; }
.lz-light .lz-price{ background:linear-gradient(180deg,#ffffff 0%,#F6F7FA 100%); box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 24px 48px -34px rgba(20,24,40,.32); }
.lz-light .lz-price-featured{ box-shadow:0 1px 0 rgba(255,255,255,1) inset, 0 30px 60px -34px rgba(20,24,40,.42), 0 24px 60px -30px var(--iris-glow); }
.lz-light .lz-chip{ background:rgba(20,24,40,.03); }
.lz-light .lz-browser{ background:#EDEFF3; }
.lz-light .lz-dot{ background:#C4C9D4; }
.lz-light .lz-preview{ background:#ffffff; }
.lz-light .lz-iris{ background:linear-gradient(100deg,#B4740E 0%, #E0952B 55%, #A2650E 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lz-light .lz-about-photo{ background:#E9EBEF; }
.lz-light .lz-about-img{ mix-blend-mode:normal; }
.lz-light .lz-cta{ background:linear-gradient(180deg,#ffffff 0%,#F4F5F8 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 40px 80px -50px rgba(20,24,40,.4); }
.lz-light .lz-wa{ box-shadow:0 12px 30px -8px rgba(32,185,90,.45), 0 2px 6px rgba(20,24,40,.15); }

@media(prefers-reduced-motion:reduce){
  .lz-anim,.lz-reveal{ opacity:1; transform:none; animation:none; transition:none; }
  .lz-panel,.lz-live-dot,.lz-spinner,.lz-log-line{ animation:none; }
  .lz-reelbox iframe{ animation:none; }
  .lz-marquee-track{ animation:none; }
  .lz-btn,.lz-btn-arrow,.lz-nav-link,.lz-card,.lz-work,.lz-faq-plus,.lz-wa{ transition:none; }
  .lz-burger-bar,.lz-mobile-menu{ transition:none; }
}
`;
