import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "../lib/content";
import { ARTIKELEN } from "../lib/news";

export const metadata: Metadata = {
  title: "AI Nieuws",
  description:
    "De laatste AI-nieuwtjes, ontwikkelingen en praktijkinzichten voor het MKB — verzameld door Leadz Systems.",
  alternates: { canonical: "/nieuws" },
  openGraph: {
    title: "AI Nieuws | Leadz Systems",
    description:
      "De laatste AI-nieuwtjes, ontwikkelingen en praktijkinzichten voor het MKB.",
    url: `${SITE.url}/nieuws`,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export default function NieuwsPage() {
  const artikelen = [...ARTIKELEN].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="nws-root">
      {/* ── Top bar ── */}
      <header className="nws-bar">
        <div className="nws-bar-inner">
          <Link href="/" className="nws-brand" aria-label="Leadz Systems home">
            <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="nws-logo" priority />
          </Link>
          <div className="nws-bar-actions">
            <Link href="/" className="nws-back">← Terug naar site</Link>
            <a href="/#contact" className="nws-btn">Plan een gesprek</a>
          </div>
        </div>
      </header>

      {/* ── Header ── */}
      <section className="nws-hero">
        <span className="nws-kicker"><span className="nws-kicker-dot" aria-hidden />Nieuws</span>
        <h1 className="nws-title">AI Nieuws</h1>
        <p className="nws-lead">
          De laatste AI-nieuwtjes, ontwikkelingen en praktijkinzichten — kort en helder,
          voor ondernemers die slimmer willen werken.
        </p>
      </section>

      {/* ── Articles ── */}
      <section className="nws-list-wrap">
        {artikelen.length === 0 ? (
          <div className="nws-empty">
            <h2>Binnenkort meer</h2>
            <p>We delen hier binnenkort de eerste artikelen. Kom snel terug.</p>
          </div>
        ) : (
          <div className="nws-grid">
            {artikelen.map((a) => (
              <Link key={a.slug} href={`/nieuws/${a.slug}`} className="nws-card">
                {a.cover && (
                  <div className="nws-card-media">
                    <Image src={a.cover} alt="" fill sizes="(max-width:760px) 100vw, 360px" className="nws-card-img" />
                  </div>
                )}
                <div className="nws-card-body">
                  <div className="nws-card-meta">
                    <span className="nws-tag">{a.category}</span>
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                  </div>
                  <h2 className="nws-card-title">{a.title}</h2>
                  <p className="nws-card-excerpt">{a.excerpt}</p>
                  <span className="nws-card-link">Lees meer →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer className="nws-footer">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <Link href="/" className="nws-back">Naar de homepage</Link>
      </footer>
    </div>
  );
}
