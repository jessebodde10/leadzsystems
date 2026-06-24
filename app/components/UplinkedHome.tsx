"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE, DIENSTEN } from "../lib/content";

/* ──────────────────────────────────────────────────────────────
   Hoofd-homepage in uplinked-stijl (oranje variant).
   Alle styling scoped onder .ul-root in globals.css.
   ────────────────────────────────────────────────────────────── */

const NAV = [
  { label: "Hoe het werkt", href: "#hoe" },
  { label: "Functies", href: "#functies" },
  { label: "Over ons", href: "#over" },
  { label: "Prijzen", href: "#prijzen" },
  { label: "Contact", href: "#contact" },
];

const PROOF = [
  { naam: "Mark — installatiebedrijf", cijfer: "9 uur per week", tekst: "minder avondwerk aan offertes en werkbonnen" },
  { naam: "Dennis — aannemer", cijfer: "15% lager", tekst: "inkoopkosten door slimmer bestellen per project" },
  { naam: "Rico — dakdekkersbedrijf", cijfer: "0 keer", tekst: "een monteur zonder materiaal op de bouw dit kwartaal" },
  { naam: "Patrick — elektra", cijfer: "2 dagen", tekst: "sneller factureren na oplevering van een klus" },
];

const STAPPEN = [
  { nr: "1", titel: "Vertel hoe je werkt", duur: "30 minuten", desc: "We lopen mee met je offertes, werkbonnen en planning. Geen vragenlijst, gewoon kijken hoe het nú gaat." },
  { nr: "2", titel: "Wij bouwen op maat", duur: "2 tot 6 weken", desc: "Een tool rond jouw werkwijze: jouw prijslijst, jouw werkbon, jouw groothandel. Geen pakket van de plank." },
  { nr: "3", titel: "Live op de bouw", duur: "1 dag", desc: "We zetten het live en lopen er samen doorheen, ook met je monteurs op locatie op hun telefoon." },
  { nr: "4", titel: "Blijft meegroeien", duur: "doorlopend", desc: "De tool leert mee en we breiden uit waar dat loont. Je staat er niet alleen voor." },
];

const FUNCTIES = [
  { icon: "📄", titel: "Offerte uit een spraaknotitie", desc: "Spreek de situatie in vanuit de meterkast; binnen minuten ligt er een nette offerte met je eigen prijzen." },
  { icon: "📋", titel: "Planning die klopt", desc: "Monteurs, busjes en materiaal automatisch ingepland, inclusief reistijd en uitloop. Seint als het knelt." },
  { icon: "🏗️", titel: "Materiaal op het juiste moment", desc: "Verbruik per project bijgehouden, bestellijst klaar voordat iets opraakt, beste prijs tussen groothandels." },
  { icon: "🧾", titel: "Werkbon op de telefoon", desc: "Uren, materiaal en meerwerk ter plekke ingevuld. Niets raakt meer kwijt, de factuur volgt vanzelf." },
  { icon: "🔌", titel: "Koppelt aan je pakket", desc: "Exact, AFAS, Snelstart, Bouw7 en groothandels als Technische Unie en Rexel. Geen dubbel werk meer." },
  { icon: "🤝", titel: "Taal van de bouw", desc: "We praten over werkbonnen en meerwerk, niet over algoritmes. Persoonlijk van eerste gesprek tot oplevering." },
];

const PRIJZEN = [
  {
    naam: "Start",
    maand: 1500,
    jaar: 1500,
    eenmalig: true,
    omschrijving: "Eén concrete automatisering, snel live.",
    features: ["Eén tool op maat (bijv. digitale werkbon)", "Eén koppeling naar je pakket", "Oplevering binnen 2 tot 4 weken", "Persoonlijke begeleiding bij livegang"],
    cta: "Plan een gesprek",
    populair: false,
  },
  {
    naam: "Groei",
    maand: 149,
    jaar: 119,
    eenmalig: false,
    omschrijving: "Meerdere tools die samenwerken, doorlopend onderhouden.",
    features: ["Meerdere tools en koppelingen", "Doorontwikkeling en aanpassingen", "Voorrang bij vragen en storingen", "Kwartaalcheck op nieuwe besparingen", "Onbeperkt monteurs toevoegen"],
    cta: "Plan een gesprek",
    populair: true,
  },
];

const FAQS = [
  { q: "Moet ik verstand van techniek hebben?", a: "Nee. Op de bouw vullen je monteurs alleen een simpel formulier in op hun telefoon: uren, materiaal en een foto. De rest gebeurt op de achtergrond." },
  { q: "Hoe snel zie ik resultaat?", a: "De meeste tools draaien binnen 2 tot 6 weken. We werken in korte cycli, dus je ziet snel iets werken in plaats van pas na maanden." },
  { q: "Werkt dit met mijn huidige software?", a: "In de meeste gevallen wel. We koppelen aan Exact, AFAS, Snelstart en Bouw7, en aan groothandels als Technische Unie en Rexel." },
  { q: "Wat als het niet doet wat ik wil?", a: "Dan lossen we het op. We leveren pas op als jij tevreden bent en blijven daarna beschikbaar voor aanpassingen." },
  { q: "Is het iets voor een klein bedrijf?", a: "Juist wel. We werken voor MKB in de bouw en installatietechniek, van eenpitter tot een ploeg van twintig man." },
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
  const [jaarlijks, setJaarlijks] = useState(true);
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
            AI-tools voor bouw &amp; installatietechniek
          </div>
          <h1 className="ul-reveal text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            Minder papierwerk,<br className="hidden md:block" /> <span className="ul-mark">meer bouwen.</span>
          </h1>
          <p className="ul-reveal mx-auto mt-6 max-w-2xl text-lg text-[var(--ul-muted)] md:text-xl">
            Offertes &apos;s avonds uittypen, werkbonnen die kwijtraken, monteurs zonder materiaal op de bouw. Leadz
            Systems bouwt slimme tools die dat uit handen nemen, zodat jij je op het werk kunt richten.
          </p>
          <div className="ul-reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] px-7 py-3.5 font-medium text-white shadow-lg shadow-orange-500/25 transition-transform hover:-translate-y-0.5">
              Plan een vrijblijvend gesprek
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#hoe" className="rounded-full border border-[var(--ul-line)] bg-white px-7 py-3.5 font-medium transition-colors hover:bg-[var(--ul-accent-soft)]">
              Hoe het werkt
            </a>
          </div>

          {/* Social proof */}
          <div className="ul-reveal mt-12 flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {["#ff5c1a", "#ff8a3d", "#0c0a09", "#57534e"].map((c, i) => (
                <span key={i} className="grid h-10 w-10 place-items-center rounded-full border-2 border-white text-sm font-semibold text-white shadow" style={{ background: c }}>
                  {["M", "D", "R", "P"][i]}
                </span>
              ))}
            </div>
            <p className="text-left text-sm text-[var(--ul-muted)]">
              <span className="font-semibold text-[var(--ul-ink)]">MKB in de bouw</span> dat slimmer werkt met Leadz
            </p>
          </div>
        </div>

        {/* Interactieve mockup: dagplanning-board */}
        <div className="ul-reveal mx-auto max-w-5xl px-6 pb-20">
          <PlanningMockup />
        </div>
      </section>

      {/* ── LOGOBALK / KOPPELINGEN ── */}
      <section className="border-y border-[var(--ul-line)] bg-[var(--ul-accent-soft)]/40 py-6">
        <div className="mx-auto flex max-w-6xl items-center gap-10 overflow-hidden px-6">
          <span className="shrink-0 text-sm font-medium text-[var(--ul-muted)]">Koppelt aan</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="ul-marquee flex w-max gap-12">
              {[...Array(2)].flatMap((_, r) =>
                ["Exact", "AFAS", "Snelstart", "Bouw7", "Technische Unie", "Rexel", "Moneybird", "Wildkamp"].map((m) => (
                  <span key={`${r}-${m}`} className="whitespace-nowrap text-lg font-semibold text-[var(--ul-ink)]/40">
                    {m}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOE HET WERKT ── */}
      <section id="hoe" className="mx-auto max-w-6xl px-6 py-24">
        <div className="ul-reveal mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Hoe het werkt</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">In vier stappen van papierwerk naar rust</h2>
          <p className="mt-4 text-[var(--ul-muted)]">Geen lang traject. We beginnen klein, leveren snel iets werkends en bouwen van daaruit verder.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STAPPEN.map((s, i) => (
            <div key={s.nr} className="ul-reveal rounded-2xl border border-[var(--ul-line)] bg-white p-6 transition-shadow hover:shadow-lg" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--ul-accent)] to-[var(--ul-accent-2)] font-semibold text-white">{s.nr}</div>
              <h3 className="font-semibold">{s.titel}</h3>
              <span className="mt-1 inline-block rounded-full bg-[var(--ul-accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--ul-accent)]">{s.duur}</span>
              <p className="mt-3 text-sm text-[var(--ul-muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESULTATEN ── */}
      <section className="bg-[var(--ul-ink)] py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="ul-reveal mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent-2)]">Resultaat</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Wat het oplevert in de praktijk</h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {PROOF.map((p, i) => (
              <div key={i} className="ul-reveal rounded-2xl border border-white/10 bg-white/[0.04] p-7" style={{ transitionDelay: `${i * 70}ms` }}>
                <p className="text-4xl font-semibold ul-shimmer md:text-5xl">{p.cijfer}</p>
                <p className="mt-2 text-white/80">{p.tekst}</p>
                <p className="mt-4 text-sm text-white/50">{p.naam}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUNCTIES ── */}
      <section id="functies" className="mx-auto max-w-6xl px-6 py-24">
        <div className="ul-reveal mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Functies</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Alles wat je dag vertraagt, geautomatiseerd</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FUNCTIES.map((f, i) => (
            <div key={f.titel} className="ul-reveal group rounded-2xl border border-[var(--ul-line)] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[var(--ul-accent)]/40 hover:shadow-xl" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[var(--ul-accent-soft)] text-2xl transition-transform group-hover:scale-110">{f.icon}</div>
              <h3 className="font-semibold">{f.titel}</h3>
              <p className="mt-2 text-sm text-[var(--ul-muted)]">{f.desc}</p>
            </div>
          ))}
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
                Ik ben Jesse, oprichter van Leadz Systems. Ik bouw AI-tools voor de bouw en installatietechniek, niet
                vanaf een afstand, maar door eerst écht te begrijpen hoe jouw dag eruitziet.
              </p>
              <p>
                Ik geloof niet in dikke pakketten waar je je werkwijze omheen moet wringen. Ik kijk waar bij jou de
                meeste tijd verdwijnt, en bouw daar iets concreets voor: jouw werkbon, jouw prijslijst, jouw
                groothandel. Klein beginnen, snel iets werkends, en van daaruit verder.
              </p>
              <p>
                Korte lijntjes, geen jargon. Van het eerste gesprek tot ver na de oplevering heb je gewoon met mij te
                maken.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] px-7 py-3.5 font-medium text-white shadow-lg shadow-orange-500/25 transition-transform hover:-translate-y-0.5">
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
      <section id="prijzen" className="ul-mesh py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="ul-reveal mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Prijzen</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Geen verborgen kosten, geen verrassingen</h2>
            <p className="mt-4 text-[var(--ul-muted)]">We kijken altijd eerst wat het oplevert voordat we een prijs noemen.</p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--ul-line)] bg-white p-1">
              <button onClick={() => setJaarlijks(false)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!jaarlijks ? "bg-[var(--ul-ink)] text-white" : "text-[var(--ul-muted)]"}`}>Maandelijks</button>
              <button onClick={() => setJaarlijks(true)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${jaarlijks ? "bg-[var(--ul-ink)] text-white" : "text-[var(--ul-muted)]"}`}>
                Jaarlijks <span className="text-[var(--ul-accent)]">-20%</span>
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PRIJZEN.map((p) => (
              <div key={p.naam} className={`ul-reveal relative rounded-3xl border bg-white p-8 ${p.populair ? "border-[var(--ul-accent)] shadow-xl shadow-orange-500/10" : "border-[var(--ul-line)]"}`}>
                {p.populair && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] px-3 py-1 text-xs font-semibold text-white">Meest gekozen</span>
                )}
                <h3 className="text-lg font-semibold">{p.naam}</h3>
                <p className="mt-1 text-sm text-[var(--ul-muted)]">{p.omschrijving}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="text-4xl font-semibold">€{p.eenmalig ? p.maand : jaarlijks ? p.jaar : p.maand}</span>
                  <span className="mb-1 text-sm text-[var(--ul-muted)]">{p.eenmalig ? "eenmalig" : "/maand"}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ul-accent)]" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`mt-7 block rounded-full px-6 py-3 text-center font-medium transition-transform hover:-translate-y-0.5 ${p.populair ? "bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] text-white shadow-lg shadow-orange-500/25" : "bg-[var(--ul-ink)] text-white"}`}>{p.cta}</a>
              </div>
            ))}
          </div>
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
              We kijken samen waar in jouw bedrijf de meeste tijd verdwijnt en wat het oplevert om dat te
              automatiseren. Geen verkooppraatje, gewoon een eerlijk gesprek.
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
                  className="w-full rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] px-6 py-3.5 font-medium text-white shadow-lg shadow-orange-500/25 transition-transform hover:-translate-y-0.5"
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
              Slimme AI-tools voor de bouw en installatietechniek. Minder papierwerk, meer bouwen.
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
              <a href="#hoe" className="hover:text-[var(--ul-ink)]">Hoe het werkt</a>
              <a href="#over" className="hover:text-[var(--ul-ink)]">Over ons</a>
              <a href="#prijzen" className="hover:text-[var(--ul-ink)]">Prijzen</a>
              <a href="#contact" className="hover:text-[var(--ul-ink)]">Contact</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-[var(--ul-line)] px-6 pt-6">
          <p className="text-sm text-[var(--ul-muted)]">© 2026 Leadz Systems</p>
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
        className="fixed bottom-6 left-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] shadow-lg shadow-orange-500/30 md:hidden"
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

/* Hero-mockup: een dagplanning-board, het bouw-equivalent van uplinked's content-kalender */
function PlanningMockup() {
  const kaarten = [
    { tijd: "08:00", titel: "Cv-ketel vervangen", plaats: "Almere", kleur: "var(--ul-accent)", status: "Materiaal compleet" },
    { tijd: "10:30", titel: "Meterkast uitbreiden", plaats: "Lelystad", kleur: "#0c0a09", status: "Monteur onderweg" },
    { tijd: "13:00", titel: "Dakgoot herstellen", plaats: "Almere", kleur: "var(--ul-accent-2)", status: "Bon gereed" },
    { tijd: "15:30", titel: "Spoed: lekkage", plaats: "Zeewolde", kleur: "#dc2626", status: "Ingepland vandaag" },
  ];
  return (
    <div className="ul-float rounded-2xl border border-[var(--ul-line)] bg-white p-4 shadow-2xl shadow-orange-500/10 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Dagplanning — donderdag 25 juni</p>
          <p className="text-xs text-[var(--ul-muted)]">4 klussen · 3 monteurs · alles voorzien van materiaal</p>
        </div>
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[var(--ul-line)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--ul-line)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--ul-accent)]" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {kaarten.map((k, i) => (
          <div key={i} className="group flex items-center gap-3 rounded-xl border border-[var(--ul-line)] bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg text-xs font-semibold text-white" style={{ background: k.kleur }}>{k.tijd}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{k.titel}</p>
              <p className="text-xs text-[var(--ul-muted)]">{k.plaats}</p>
            </div>
            <span className="hidden shrink-0 rounded-full bg-[var(--ul-accent-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--ul-accent)] sm:inline">{k.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
