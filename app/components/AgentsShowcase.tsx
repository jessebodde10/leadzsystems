import type { ReactNode } from "react";

// Kaartenraster "Digitale collega's" op de AI Agents-pagina.
// Vervangt de oude HubFlow-animatie; groene agent-huisstijl, self-contained via .dca-* in globals.css.

type Agent = {
  title: string;
  sub: string;
  icon: ReactNode;
  points: string[];
};

const IconTarget = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconHeadset = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <rect x="2.5" y="13" width="4" height="6.5" rx="1.6" />
    <rect x="17.5" y="13" width="4" height="6.5" rx="1.6" />
    <path d="M20 19.5a4 4 0 0 1-4 3h-2" />
  </svg>
);

const IconDoc = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v4h4" />
    <path d="M9 12.5h6" />
    <path d="M9 16.5h6" />
  </svg>
);

const IconFolder = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 7a2 2 0 0 1 2-2h3.5l2 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M8 13h8" />
  </svg>
);

const IconPeople = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <circle cx="17.5" cy="9" r="2.3" />
    <path d="M16 20a4.5 4.5 0 0 1 5.5-3.2" />
  </svg>
);

const AGENTS: Agent[] = [
  {
    title: "Sales Agent",
    sub: "Kwalificeert leads en volgt op",
    icon: IconTarget,
    points: ["Beoordeelt elke lead direct", "Plant opvolging in je agenda", "Houdt je CRM actueel"],
  },
  {
    title: "Support Agent",
    sub: "Beantwoordt klantvragen 24/7",
    icon: IconHeadset,
    points: ["Reageert binnen seconden", "Kent jouw producten en beleid", "Escaleert alleen wat écht moet"],
  },
  {
    title: "Offerte Agent",
    sub: "Stelt offertes voor je op",
    icon: IconDoc,
    points: ["Rekent met jouw prijzen", "Gebruikt jouw huisstijl", "Klaar voor akkoord in minuten"],
  },
  {
    title: "Administratie Agent",
    sub: "Verwerkt documenten en facturen",
    icon: IconFolder,
    points: ["Herkent en boekt facturen", "Signaleert afwijkingen", "Koppelt met je boekhouding"],
  },
  {
    title: "HR Agent",
    sub: "Ondersteunt werving en onboarding",
    icon: IconPeople,
    points: ["Screent sollicitaties", "Plant gesprekken in", "Begeleidt nieuwe medewerkers"],
  },
];

export default function AgentsShowcase() {
  return (
    <div className="dca">
      <div className="dca-grid">
        {AGENTS.map((a) => (
          <article key={a.title} className="dca-card">
            <div className="dca-card-top">
              <span className="dca-ico">{a.icon}</span>
              <span className="dca-pill"><span className="dca-dot" aria-hidden />Actief 24/7</span>
            </div>
            <h3 className="dca-card-title">{a.title}</h3>
            <p className="dca-card-sub">{a.sub}</p>
            <hr className="dca-div" />
            <ul className="dca-points">
              {a.points.map((p) => (
                <li key={p}><span className="dca-bullet" aria-hidden />{p}</li>
              ))}
            </ul>
          </article>
        ))}

        <article className="dca-card dca-cta">
          <h3 className="dca-card-title">Jouw eigen agent</h3>
          <p className="dca-cta-text">
            Elk bedrijf werkt anders. We bouwen agents op maat voor de processen die bij jou de
            meeste tijd kosten.
          </p>
          <a href="/#agenda" className="dca-cta-link">Bespreek de mogelijkheden →</a>
        </article>
      </div>
    </div>
  );
}
