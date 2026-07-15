import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, PORTFOLIO_ITEMS } from "../../lib/content";

export function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  if (!item) return {};
  return {
    // absolute voorkomt dat de layout-template de merknaam nog een keer toevoegt.
    title: { absolute: `${item.title} | Leadz Systems` },
    description: item.description,
    alternates: { canonical: `/portfolio/${item.slug}` },
    openGraph: {
      title: `${item.title} | Leadz Systems`,
      description: item.description,
      url: `${SITE.url}/portfolio/${item.slug}`,
    },
  };
}

const TICK = (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden className="pg-tick">
    <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  if (!item) notFound();

  const andere = PORTFOLIO_ITEMS.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.description,
    url: `${SITE.url}/portfolio/${item.slug}`,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <div className="pg-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ── Top bar ── */}
      <header className="pg-bar">
        <div className="pg-bar-inner">
          <Link href="/" className="pg-brand" aria-label="Leadz Systems home">
            <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="pg-logo" priority />
          </Link>
          <div className="pg-bar-actions">
            <Link href="/#portfolio" className="pg-back">← Alle cases</Link>
            <a href="/#agenda" className="pg-btn">Plan een gesprek</a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pg-hero">
        <span className="pg-kicker"><span className="pg-kicker-dot" aria-hidden />Case · {item.tag}</span>
        <h1 className="pg-title">{item.title}</h1>
        <p className="pg-stat">{item.domain}</p>
        <p className="pg-lead">{item.description}</p>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="pg-btn pg-hero-cta">
          Bekijk de live site ↗
        </a>
      </section>

      {/* ── Live preview ── */}
      <section className="pg-section">
        <div className="case-browser">
          <div className="case-browser-bar">
            <span className="case-dot" /><span className="case-dot" /><span className="case-dot" />
            <span className="case-url">{item.domain}</span>
          </div>
          <div className="case-preview">
            <div className="case-reelbox">
              <iframe
                src={item.url}
                title={`Live preview van ${item.title}`}
                loading="lazy"
                scrolling="no"
                tabIndex={-1}
                referrerPolicy="no-referrer"
              />
            </div>
            <a
              className="case-cover"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${item.title} in een nieuw tabblad`}
            />
          </div>
        </div>
        <p className="pg-sub case-note">Dit is de echte site, live geladen. Klik erop om 'm te openen.</p>
      </section>

      {/* ── Uitdaging ── */}
      <section className="pg-section">
        <h2 className="pg-h2">De uitdaging</h2>
        <p className="pg-maat-p">{item.uitdaging}</p>
      </section>

      {/* ── Wat we deden ── */}
      <section className="pg-section">
        <h2 className="pg-h2">Wat we deden</h2>
        <ul className="pg-maat-list case-did">
          {item.watWeDeden.map((w) => (
            <li key={w}>{TICK}{w}</li>
          ))}
        </ul>
      </section>

      {/* ── Resultaat ── */}
      <section className="pg-section">
        <div className="pg-maat">
          <h2 className="pg-h2">Het resultaat</h2>
          <p className="pg-maat-p">{item.resultaat}</p>
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="pg-section">
        <h2 className="pg-h2">Gebouwd met</h2>
        <div className="pg-chips">
          {item.stack.map((s) => (
            <span key={s} className="pg-chip">{s}</span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pg-section">
        <div className="pg-cta">
          <h2 className="pg-cta-title">Zoiets voor jouw bedrijf?</h2>
          <p className="pg-cta-lead">
            Elk project begint met een gesprek van 30 minuten. We kijken wat er speelt, wat het
            oplevert en waar we het beste kunnen beginnen. Vrijblijvend.
          </p>
          <a href="/#agenda" className="pg-btn pg-cta-btn">Plan een vrijblijvend gesprek</a>
        </div>
      </section>

      {/* ── Andere cases ── */}
      <section className="pg-section">
        <h2 className="pg-h2">Andere cases</h2>
        <div className="pg-grid3">
          {andere.map((a) => (
            <Link key={a.slug} href={`/portfolio/${a.slug}`} className="pg-other">
              <span className="pg-kicker">{a.tag}</span>
              <h3 className="pg-card-title case-other-title">{a.title}</h3>
              <p className="pg-card-desc">{a.description}</p>
              <span className="pg-other-link">Bekijk case →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pg-footer">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <Link href="/" className="pg-back">Naar de homepage</Link>
      </footer>
    </div>
  );
}
