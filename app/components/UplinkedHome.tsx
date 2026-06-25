"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SITE, DIENSTEN, FAQS, PORTFOLIO_ITEMS } from "../lib/content";

/* ──────────────────────────────────────────────────────────────
   Hoofd-homepage in uplinked-stijl (indigo accent).
   Alle styling scoped onder .ul-root in globals.css.
   ────────────────────────────────────────────────────────────── */

const NAV = [
  { label: "Diensten", href: "#diensten" },
  { label: "Werkwijze", href: "#werkwijze" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Over ons", href: "#over" },
  { label: "Contact", href: "#contact" },
];

const PROOF = [
  { cijfer: "50+", tekst: "tools en systemen waar we direct mee koppelen" },
  { cijfer: "3 weken", tekst: "gemiddelde doorlooptijd van idee tot live" },
  { cijfer: "100%", tekst: "tevredenheidsgarantie. We stoppen pas als jij blij bent" },
];

const STAPPEN = [
  { nr: "1", titel: "Intake gesprek", desc: "We beginnen met een vrijblijvend gesprek om te begrijpen wat je wil aanpakken, welke systemen je gebruikt en wat het meeste oplevert." },
  { nr: "2", titel: "Ontwerp & voorstel", desc: "We leveren een helder voorstel met technische aanpak en vaste prijs. Pas als jij akkoord geeft, starten we." },
  { nr: "3", titel: "Bouwen & testen", desc: "Wij bouwen je oplossing op maat, koppelen alle systemen en testen alles uitgebreid met jou erbij." },
  { nr: "4", titel: "Live & onderhoud", desc: "Je oplossing gaat live. Wij zorgen voor hosting, updates en monitoring. Maand na maand, zonder gedoe." },
];

const PRIJZEN = [
  {
    naam: "Starter",
    prijs: 250,
    setup: 2500,
    omschrijving: "Jouw eerste oplossing live. Eén automatisering, website of koppeling op maat.",
    features: [
      "1 automatisering, website of koppeling",
      "Tot 3 systemen gekoppeld",
      "Oplevering binnen 2 tot 4 weken",
      "Hosting en onderhoud",
      "Maandelijkse rapportage",
      "E-mail support",
    ],
    cta: "Start je project",
    populair: false,
    custom: false,
  },
  {
    naam: "Growth",
    prijs: 350,
    setup: 3500,
    omschrijving: "Meer koppelingen, AI-workflows en een oplossing die écht meegroeit met jouw bedrijf.",
    features: [
      "Meerdere automatiseringen en koppelingen",
      "Tot 7 systemen gekoppeld",
      "Realtime inzicht in je data",
      "Hosting en onderhoud",
      "AI-workflows en slimme notificaties",
      "Wekelijkse rapportages",
      "Prioriteit support en kwartaalgesprek",
    ],
    cta: "Start je project",
    populair: true,
    custom: false,
  },
  {
    naam: "Custom",
    prijs: null,
    setup: null,
    omschrijving: "Complexe automatisering, meerdere oplossingen of specifieke wensen. We denken graag mee.",
    features: [
      "Onbeperkt koppelingen",
      "Onbeperkt automatiseringen",
      "Maatwerk AI-integraties",
      "Dedicated ontwikkelaar",
      "SLA met uptime garantie",
      "24/7 telefoon support",
    ],
    cta: "Neem contact op",
    populair: false,
    custom: true,
  },
];

/* Voegt .is-visible toe zodra een element in beeld scrollt */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".ul-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function UplinkedHome() {
  useReveal();
  // jaarlijks toggle verwijderd — vaste prijzen per tier
  const [open, setOpen] = useState<number | null>(0);
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState({ naam: "", email: "", bericht: "" });
  const [sent, setSent] = useState(false);

  return (
    <div className="ul-root min-h-screen overflow-x-hidden">
      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-[var(--ul-line)] bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--ul-accent)] to-[var(--ul-accent-2)] text-white">L</span>
            <span className="text-[17px]">Leadz Systems</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-[var(--ul-muted)] transition-colors hover:text-[var(--ul-ink)]">
                {n.label}
              </a>
            ))}
          </div>
          <div className="hidden md:block">
            <a href="#contact" className="rounded-full bg-[var(--ul-ink)] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">
              Plan een gesprek
            </a>
          </div>
          <button onClick={() => setMenu((v) => !v)} aria-label="Menu" className="md:hidden">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              {menu ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </nav>
        {menu && (
          <div className="border-t border-[var(--ul-line)] px-6 py-4 md:hidden">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="block py-2.5 text-[var(--ul-muted)]">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenu(false)} className="mt-2 block rounded-full bg-[var(--ul-ink)] px-5 py-3 text-center font-medium text-white">
              Plan een gesprek
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="top" className="ul-mesh relative">
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center md:pt-28">
          <div className="ul-reveal mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--ul-line)] bg-white px-4 py-1.5 text-sm text-[var(--ul-muted)] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--ul-accent)] ul-pulse" />
            AI-software &amp; automatisering voor het MKB
          </div>
          <h1 className="ul-reveal text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            Software die werkt.<br className="hidden md:block" /> <span className="ul-mark">Processen die lopen.</span>
          </h1>
          <p className="ul-reveal mx-auto mt-6 max-w-2xl text-lg text-[var(--ul-muted)] md:text-xl">
            Leadz Systems bouwt slimme software en automatiseringen op maat, zodat jij je op de groei van je bedrijf kunt richten.
          </p>
          <div className="ul-reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] px-7 py-3.5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-transform hover:-translate-y-0.5">
              Plan een vrijblijvend gesprek
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#diensten" className="rounded-full border border-[var(--ul-line)] bg-white px-7 py-3.5 font-medium transition-colors hover:bg-[var(--ul-accent-soft)]">
              Bekijk wat we doen
            </a>
          </div>

          {/* Social proof */}
          <div className="ul-reveal mt-12 flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {["#4f46e5", "#6366f1", "#0c0a09", "#57534e"].map((c, i) => (
                <span key={i} className="grid h-10 w-10 place-items-center rounded-full border-2 border-white text-sm font-semibold text-white shadow" style={{ background: c }}>
                  {["A", "B", "C", "D"][i]}
                </span>
              ))}
            </div>
            <p className="text-left text-sm text-[var(--ul-muted)]">
              <span className="font-semibold text-[var(--ul-ink)]">MKB-ondernemers</span> die slimmer werken met Leadz
            </p>
          </div>
        </div>

      </section>

      {/* ── LOGOBALK / KOPPELINGEN ── */}
      <section className="border-y border-[var(--ul-line)] bg-[var(--ul-accent-soft)]/40 py-6">
        <div className="mx-auto flex max-w-6xl items-center gap-10 overflow-hidden px-6">
          <span className="shrink-0 text-sm font-medium text-[var(--ul-muted)]">Werkt met</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="ul-marquee flex w-max gap-12">
              {[...Array(2)].flatMap((_, r) =>
                ["OpenAI", "Claude", "Make", "Zapier", "Moneybird", "HubSpot", "Slack", "Microsoft 365", "Google Workspace", "Stripe"].map((m) => (
                  <span key={`${r}-${m}`} className="whitespace-nowrap text-lg font-semibold text-[var(--ul-ink)]/40">
                    {m}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIENSTEN ── */}
      <section id="diensten" className="mx-auto max-w-6xl px-6 py-24">
        <div className="ul-reveal mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Diensten</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Wat we voor je bouwen</h2>
          <p className="mt-4 text-[var(--ul-muted)]">Van losse automatisering tot een complete webapplicatie. Altijd op maat, altijd rond hoe jij werkt.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {DIENSTEN.map((d, i) => (
            <a
              key={d.slug}
              href={`/diensten/${d.slug}`}
              className="ul-reveal group flex flex-col rounded-2xl border border-[var(--ul-line)] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[var(--ul-accent)]/40 hover:shadow-xl"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[var(--ul-accent-soft)] text-2xl transition-transform group-hover:scale-110">{d.icon}</div>
              <h3 className="text-lg font-semibold">{d.title}</h3>
              <span className="mt-1 inline-block w-fit rounded-full bg-[var(--ul-accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--ul-accent)]">{d.stat}</span>
              <p className="mt-3 text-sm text-[var(--ul-muted)]">{d.description}</p>
              <ul className="mt-4 space-y-2">
                {d.items.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--ul-ink)]/80">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ul-accent)]" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ul-accent)]">
                Lees meer
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── HOE HET WERKT ── */}
      <section id="werkwijze" className="border-t border-[var(--ul-line)] bg-[var(--ul-accent-soft)]/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="ul-reveal mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Werkwijze</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Van idee naar live oplossing in 4 stappen</h2>
            <p className="mt-4 text-[var(--ul-muted)]">We houden het simpel. Jij vertelt ons wat je wil bereiken. Wij zorgen dat het werkt.</p>
          </div>
          <div className="ul-reveal relative mt-16">
            {/* Verbindingslijn achter de cirkels */}
            <div className="absolute top-7 left-[12.5%] right-[12.5%] hidden h-0.5 bg-[var(--ul-line)] md:block" />
            <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
              {STAPPEN.map((s, i) => (
                <div key={s.nr} className="flex flex-col items-center text-center" style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--ul-accent)] to-[var(--ul-accent-2)] text-lg font-semibold text-white shadow-lg shadow-indigo-500/20">
                    {s.nr}
                  </div>
                  <h3 className="mt-5 font-semibold">{s.titel}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--ul-muted)]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-24">
        <div className="ul-reveal mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Portfolio</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Een greep uit wat we bouwen</h2>
          <p className="mt-4 text-[var(--ul-muted)]">Concrete oplossingen voor concrete problemen. Van automatisering tot webapplicatie.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PORTFOLIO_ITEMS.map((p, i) => (
            <div
              key={p.title}
              className="ul-reveal ul-preview group flex flex-col overflow-hidden rounded-2xl border border-[var(--ul-line)] bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <LivePreview url={p.url} domain={p.domain} tag={p.tag} />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-[var(--ul-muted)]">{p.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md bg-[var(--ul-accent-soft)] px-2 py-1 text-[11px] font-medium text-[var(--ul-accent)]">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESULTATEN ── */}
      <section className="border-t border-[var(--ul-line)] bg-[var(--ul-accent-soft)]/30 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {PROOF.map((p, i) => (
              <div key={i} className="ul-reveal rounded-2xl border border-[var(--ul-line)] bg-white p-8 text-center shadow-sm" style={{ transitionDelay: `${i * 70}ms` }}>
                <p className="text-5xl font-bold text-[var(--ul-accent)] md:text-6xl">{p.cijfer}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--ul-muted)]">{p.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVER JESSE ── */}
      <section id="over" className="border-y border-[var(--ul-line)] bg-[var(--ul-accent-soft)]/40 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[0.8fr_1fr]">
          <div className="ul-reveal relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-[var(--ul-accent)]/20 to-[var(--ul-accent-2)]/10 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-[var(--ul-line)] bg-white shadow-xl">
              <Image
                src="/jesse.png"
                alt="Jesse, oprichter van Leadz Systems"
                width={520}
                height={620}
                className="h-auto w-full object-cover"
                priority={false}
              />
            </div>
          </div>
          <div className="ul-reveal">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Over ons</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Geen ver-van-je-bed software, maar iemand die meedenkt</h2>
            <div className="mt-5 space-y-4 text-[var(--ul-muted)]">
              <p>
                Ik ben Jesse, oprichter van Leadz Systems. Ik bouw AI-software en automatiseringen voor het MKB, niet
                vanaf een afstand, maar door eerst écht te begrijpen hoe jouw bedrijf werkt.
              </p>
              <p>
                Ik geloof niet in dikke pakketten waar je je werkwijze omheen moet wringen. Ik kijk waar bij jou de
                meeste tijd of omzet blijft liggen, en bouw daar iets concreets voor. Klein beginnen, snel iets
                werkends, en van daaruit verder.
              </p>
              <p>
                Korte lijntjes, geen jargon. Van het eerste gesprek tot ver na de oplevering heb je gewoon met mij te
                maken.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] px-7 py-3.5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-transform hover:-translate-y-0.5">
                Plan een kennismaking
              </a>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--ul-line)] bg-white px-7 py-3.5 text-center font-medium transition-colors hover:bg-white">
                App me direct
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRIJZEN ── */}
      <section id="prijzen" className="border-t border-[var(--ul-line)] bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="ul-reveal mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Prijzen</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Transparante, vaste prijzen</h2>
            <p className="mt-4 text-[var(--ul-muted)]">Geen verborgen kosten, geen uurtje-factuurtje. We werken met een eenmalige setup en een vast maandbedrag.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRIJZEN.map((p) => (
              <div key={p.naam} className={`ul-reveal relative flex flex-col rounded-3xl border bg-white p-8 ${p.populair ? "border-[var(--ul-accent)] shadow-xl shadow-indigo-500/10" : "border-[var(--ul-line)]"}`}>
                {p.populair && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] px-4 py-1 text-xs font-semibold text-white">Meest gekozen</span>
                )}
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--ul-accent)]">{p.naam}</p>
                {p.custom ? (
                  <h3 className="mt-3 text-4xl font-bold text-[var(--ul-ink)]">Op maat</h3>
                ) : (
                  <>
                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-5xl font-bold text-[var(--ul-ink)]">€{p.prijs}</span>
                      <span className="mb-1.5 text-sm text-[var(--ul-muted)]">/maand</span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--ul-accent)]">Eenmalige setup: € {p.setup?.toLocaleString("nl-NL")}</p>
                  </>
                )}
                <p className="mt-3 text-sm leading-6 text-[var(--ul-muted)]">{p.omschrijving}</p>
                <hr className="my-6 border-[var(--ul-line)]" />
                <ul className="flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ul-accent)]" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`mt-7 block rounded-full px-6 py-3.5 text-center font-medium transition-transform hover:-translate-y-0.5 ${p.populair ? "bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] text-white shadow-lg shadow-indigo-500/25" : "bg-[var(--ul-ink)] text-white"}`}>{p.cta} ›</a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-[var(--ul-muted)]">
            Alle prijzen zijn excl. BTW. Setup is eenmalig. Maandabonnement opzegbaar per kwartaal.{" "}
            <a href="#contact" className="font-medium text-[var(--ul-accent)] hover:underline">Vragen? Stuur ons een bericht.</a>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div className="ul-reveal mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Veelgestelde vragen</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Goed om te weten</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="ul-reveal overflow-hidden rounded-2xl border border-[var(--ul-line)] bg-white">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium">
                {f.q}
                <svg viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 text-[var(--ul-accent)] transition-transform ${open === i ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-[var(--ul-muted)]">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="ul-reveal grid gap-8 overflow-hidden rounded-3xl border border-[var(--ul-line)] bg-white md:grid-cols-2">
          {/* Links: uitleg + contactgegevens */}
          <div className="ul-mesh relative p-8 md:p-12">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Plan een vrijblijvend gesprek</h2>
            <p className="mt-4 text-[var(--ul-muted)]">
              We kijken samen waar in jouw bedrijf de meeste tijd of omzet blijft liggen en wat het oplevert om dat
              aan te pakken. Geen verkooppraatje, gewoon een eerlijk gesprek.
            </p>
            <div className="mt-8 space-y-3">
              <a href={`tel:${SITE.phoneIntl}`} className="flex items-center gap-3 rounded-xl border border-[var(--ul-line)] bg-white px-4 py-3 transition-colors hover:bg-[var(--ul-accent-soft)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--ul-accent-soft)] text-[var(--ul-accent)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
                </span>
                <span><span className="block text-xs text-[var(--ul-muted)]">Bel direct</span><span className="font-medium">{SITE.phone}</span></span>
              </a>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-[var(--ul-line)] bg-white px-4 py-3 transition-colors hover:bg-[var(--ul-accent-soft)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#e7f9ee] text-[#25D366]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a3 3 0 00-1 2.3c0 1.3 1 2.6 1.1 2.8.1.2 1.9 3 4.7 4.1 1.7.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.4-.2z" /></svg>
                </span>
                <span><span className="block text-xs text-[var(--ul-muted)]">App ons</span><span className="font-medium">WhatsApp</span></span>
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 rounded-xl border border-[var(--ul-line)] bg-white px-4 py-3 transition-colors hover:bg-[var(--ul-accent-soft)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--ul-accent-soft)] text-[var(--ul-accent)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16v12H4z" /><path d="M4 7l8 6 8-6" /></svg>
                </span>
                <span><span className="block text-xs text-[var(--ul-muted)]">Mail ons</span><span className="font-medium">{SITE.email}</span></span>
              </a>
            </div>
          </div>

          {/* Rechts: formulier */}
          <div className="p-8 md:p-12">
            {sent ? (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-[var(--ul-accent-soft)] text-2xl text-[var(--ul-accent)]">✓</div>
                <h3 className="text-xl font-semibold">Bericht ontvangen</h3>
                <p className="mt-2 text-[var(--ul-muted)]">We nemen zo snel mogelijk contact met je op.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Naam</label>
                  <input
                    type="text"
                    required
                    value={form.naam}
                    onChange={(e) => setForm({ ...form, naam: e.target.value })}
                    placeholder="Jouw naam"
                    className="w-full rounded-xl border border-[var(--ul-line)] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--ul-accent)]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">E-mailadres</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jouw@email.nl"
                    className="w-full rounded-xl border border-[var(--ul-line)] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--ul-accent)]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Waar loop je tegenaan?</label>
                  <textarea
                    required
                    rows={4}
                    value={form.bericht}
                    onChange={(e) => setForm({ ...form, bericht: e.target.value })}
                    placeholder="Vertel kort over je bedrijf en waar de meeste tijd verloren gaat..."
                    className="w-full resize-none rounded-xl border border-[var(--ul-line)] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--ul-accent)]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] px-6 py-3.5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-transform hover:-translate-y-0.5"
                >
                  Verstuur en plan een gesprek
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--ul-line)] py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--ul-accent)] to-[var(--ul-accent-2)] text-white">L</span>
              Leadz Systems
            </div>
            <p className="mt-4 max-w-xs text-sm text-[var(--ul-muted)]">
              Slimme AI-software en automatisering voor het MKB. Minder handwerk, meer resultaat.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Diensten</p>
            <div className="flex flex-col gap-2 text-sm text-[var(--ul-muted)]">
              {DIENSTEN.map((d) => (
                <a key={d.slug} href={`/diensten/${d.slug}`} className="hover:text-[var(--ul-ink)]">{d.title}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Menu</p>
            <div className="flex flex-col gap-2 text-sm text-[var(--ul-muted)]">
              <a href="#werkwijze" className="hover:text-[var(--ul-ink)]">Werkwijze</a>
              <a href="#portfolio" className="hover:text-[var(--ul-ink)]">Portfolio</a>
              <a href="#over" className="hover:text-[var(--ul-ink)]">Over ons</a>
              <a href="#contact" className="hover:text-[var(--ul-ink)]">Contact</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-1 border-t border-[var(--ul-line)] px-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--ul-muted)]">© 2026 Leadz Systems</p>
          <p className="text-sm text-[var(--ul-muted)]">KvK {SITE.kvk}</p>
        </div>
      </footer>

      {/* ── FLOATING KNOPPEN ── */}
      {/* Desktop: WhatsApp rechtsonder */}
      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Stuur een WhatsApp-bericht"
        className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 md:grid"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="white" aria-hidden="true"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a3 3 0 00-1 2.3c0 1.3 1 2.6 1.1 2.8.1.2 1.9 3 4.7 4.1 1.7.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.4-.2z" /></svg>
      </a>
      {/* Mobiel: bel linksonder, WhatsApp rechtsonder */}
      <a
        href={`tel:${SITE.phoneIntl}`}
        aria-label={`Bel ${SITE.phone}`}
        className="fixed bottom-6 left-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] shadow-lg shadow-indigo-500/30 md:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="white" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
      </a>
      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Stuur een WhatsApp-bericht"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-lg shadow-black/30 md:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="white" aria-hidden="true"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a3 3 0 00-1 2.3c0 1.3 1 2.6 1.1 2.8.1.2 1.9 3 4.7 4.1 1.7.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.4-.2z" /></svg>
      </a>
    </div>
  );
}

/* Live preview: toont de echte site in een browserframe en scrollt 'm langzaam door,
   zodat het op een korte videotour lijkt. De site wordt op 1280px gerenderd en
   teruggeschaald naar de kaartbreedte (via ResizeObserver). */
function LivePreview({ url, domain, tag }: { url: string; domain: string; tag: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const DESIGN_W = 1280;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DESIGN_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="border-b border-[var(--ul-line)]">
      {/* Browser-balkje */}
      <div className="flex items-center gap-2 border-b border-[var(--ul-line)] bg-[var(--ul-accent-soft)]/50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--ul-line)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--ul-line)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--ul-line)]" />
        <span className="ml-auto rounded-full bg-[var(--ul-accent)] px-2 py-0.5 text-[11px] font-medium text-white">{tag}</span>
      </div>
      {/* Schaalbare viewport met auto-scrollende iframe */}
      <div ref={viewportRef} className="relative h-56 overflow-hidden bg-white">
        <div style={{ width: DESIGN_W, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <iframe
            src={url}
            title={`Preview van ${domain}`}
            loading="lazy"
            scrolling="no"
            tabIndex={-1}
            aria-hidden="true"
            className="ul-reel pointer-events-none border-0"
            style={{ width: DESIGN_W, height: 2200 }}
          />
        </div>
      </div>
    </div>
  );
}

/* Hero-mockup: een automatiseringen-board dat laat zien welke processen op de achtergrond draaien */
function AutomationMockup() {
  const rijen = [
    { icon: "📥", titel: "Nieuwe lead → CRM + welkomstmail", kleur: "var(--ul-accent)", status: "Automatisch" },
    { icon: "📄", titel: "Aanvraag → concept-offerte klaar", kleur: "#0c0a09", status: "Bespaart 20 min" },
    { icon: "💶", titel: "Factuur betaald → boekhouding bijgewerkt", kleur: "var(--ul-accent-2)", status: "Gekoppeld" },
    { icon: "📊", titel: "Wekelijkse cijfers → dashboard", kleur: "#16a34a", status: "Elke maandag" },
  ];
  return (
    <div className="ul-float rounded-2xl border border-[var(--ul-line)] bg-white p-4 shadow-2xl shadow-indigo-500/10 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Automatiseringen — live</p>
          <p className="text-xs text-[var(--ul-muted)]">4 processen draaien op de achtergrond, zonder handwerk</p>
        </div>
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[var(--ul-line)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--ul-line)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--ul-accent)]" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {rijen.map((k, i) => (
          <div key={i} className="group flex items-center gap-3 rounded-xl border border-[var(--ul-line)] bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-lg" style={{ background: `color-mix(in srgb, ${k.kleur} 14%, white)` }}>{k.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{k.titel}</p>
            </div>
            <span className="hidden shrink-0 rounded-full bg-[var(--ul-accent-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--ul-accent)] sm:inline">{k.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
