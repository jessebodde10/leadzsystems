import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, DIENSTEN } from "../../lib/content";

export function generateStaticParams() {
  return DIENSTEN.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dienst = DIENSTEN.find((d) => d.slug === slug);
  if (!dienst) return {};
  return {
    // metaTitle bevat de merknaam al; absolute voorkomt dat de layout-template 'm nog eens toevoegt.
    title: { absolute: dienst.metaTitle },
    description: dienst.metaDescription,
    alternates: { canonical: `/diensten/${dienst.slug}` },
    openGraph: {
      title: dienst.metaTitle,
      description: dienst.metaDescription,
      url: `${SITE.url}/diensten/${dienst.slug}`,
    },
  };
}

const TICK = (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden className="dnst-tick">
    <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function DienstPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dienst = DIENSTEN.find((d) => d.slug === slug);
  if (!dienst) notFound();

  const andere = DIENSTEN.filter((d) => d.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: dienst.title,
    description: dienst.metaDescription,
    provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url },
    areaServed: SITE.region,
    serviceType: dienst.title,
  };

  return (
    <div className="dnst-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ── Top bar ── */}
      <header className="dnst-bar">
        <div className="dnst-bar-inner">
          <Link href="/" className="dnst-brand" aria-label="Leadz Systems home">
            <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="dnst-logo" priority />
          </Link>
          <div className="dnst-bar-actions">
            <Link href="/#diensten" className="dnst-back">← Alle diensten</Link>
            <a href="/#agenda" className="dnst-btn">Plan een gesprek</a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="dnst-hero">
        <span className="dnst-kicker"><span className="dnst-kicker-dot" aria-hidden />Diensten</span>
        <h1 className="dnst-title">{dienst.title}</h1>
        <p className="dnst-stat">{dienst.stat}</p>
        <p className="dnst-lead">{dienst.heroLead}</p>
        <a href="/#agenda" className="dnst-btn dnst-hero-cta">Plan een vrijblijvend gesprek</a>
      </section>

      {/* ── Herkenbaar ── */}
      <section className="dnst-section">
        <h2 className="dnst-h2">Herkenbaar?</h2>
        <ul className="dnst-pain">
          {dienst.herkenbaar.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      {/* ── Oplossing ── */}
      <section className="dnst-section">
        <h2 className="dnst-h2">Hoe we het oplossen</h2>
        <div className="dnst-grid3">
          {dienst.oplossing.map((o) => (
            <article key={o.title} className="dnst-card">
              <h3 className="dnst-card-title">{o.title}</h3>
              <p className="dnst-card-desc">{o.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Voorbeelden ── */}
      <section className="dnst-section">
        <h2 className="dnst-h2">Voorbeelden uit de praktijk</h2>
        <p className="dnst-sub">
          Een greep uit wat we binnen {dienst.title.toLowerCase()} bouwen. Staat jouw situatie er
          niet tussen? Dat is eerder regel dan uitzondering: we bouwen het gewoon op maat.
        </p>
        <div className="dnst-grid2">
          {dienst.voorbeelden.map((v) => (
            <article key={v.title} className="dnst-ex">
              <div className="dnst-ex-head">
                {TICK}
                <h3 className="dnst-ex-title">{v.title}</h3>
              </div>
              <p className="dnst-ex-desc">{v.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Alles op maat ── */}
      <section className="dnst-section">
        <div className="dnst-maat">
          <h2 className="dnst-h2">Alles is bespreekbaar</h2>
          <p className="dnst-maat-p">
            We werken niet met een vast pakket waar jij je omheen moet buigen. Werkt jouw proces
            net even anders? Prima, dan bouwen we het zo. In het eerste gesprek kijken we wat er
            nodig is, wat het oplevert en waar we het beste kunnen beginnen. Klein starten mag,
            uitbreiden kan altijd.
          </p>
          <ul className="dnst-maat-list">
            <li>{TICK}Gebouwd rond jouw proces, niet andersom</li>
            <li>{TICK}Klein beginnen en stap voor stap uitbreiden</li>
            <li>{TICK}Vaste prijs vooraf, geen verrassingen achteraf</li>
            <li>{TICK}Je praat direct met Jesse, degene die het ook bouwt</li>
          </ul>
        </div>
      </section>

      {/* ── Koppelingen ── */}
      <section className="dnst-section">
        <h2 className="dnst-h2">Koppelt met je bestaande tools</h2>
        <p className="dnst-sub">
          Werk je met iets dat er niet tussen staat? Grote kans dat we het alsnog kunnen koppelen.
          Vraag het gerust.
        </p>
        <div className="dnst-chips">
          {dienst.koppelingen.map((k) => (
            <span key={k} className="dnst-chip">{k}</span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="dnst-section">
        <div className="dnst-cta">
          <h2 className="dnst-cta-title">Benieuwd wat dit voor jou oplevert?</h2>
          <p className="dnst-cta-lead">
            In 30 minuten kijken we samen waar je nu tijd verliest en of dit de juiste stap is.
            Vrijblijvend, en we zeggen het eerlijk als iets anders slimmer is.
          </p>
          <a href="/#agenda" className="dnst-btn dnst-cta-btn">Plan een vrijblijvend gesprek</a>
        </div>
      </section>

      {/* ── Andere diensten ── */}
      <section className="dnst-section">
        <h2 className="dnst-h2">Andere diensten</h2>
        <div className="dnst-grid3">
          {andere.map((a) => (
            <Link key={a.slug} href={`/diensten/${a.slug}`} className="dnst-other">
              <h3 className="dnst-card-title">{a.title}</h3>
              <p className="dnst-card-desc">{a.description}</p>
              <span className="dnst-other-link">Bekijk dienst →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="dnst-footer">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <Link href="/" className="dnst-back">Naar de homepage</Link>
      </footer>
    </div>
  );
}
