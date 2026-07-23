import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "../../lib/content";
import { ARTIKELEN } from "../../lib/news";

export function generateStaticParams() {
  return ARTIKELEN.map((a) => ({ slug: a.slug }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artikel = ARTIKELEN.find((a) => a.slug === slug);
  if (!artikel) return {};
  return {
    title: artikel.title,
    description: artikel.excerpt,
    alternates: { canonical: `/nieuws/${artikel.slug}` },
    openGraph: {
      type: "article",
      title: artikel.title,
      description: artikel.excerpt,
      url: `${SITE.url}/nieuws/${artikel.slug}`,
      publishedTime: artikel.date,
    },
  };
}

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artikel = ARTIKELEN.find((a) => a.slug === slug);
  if (!artikel) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: artikel.title,
    description: artikel.excerpt,
    datePublished: artikel.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <div className="nws-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ── Top bar ── */}
      <header className="nws-bar">
        <div className="nws-bar-inner">
          <Link href="/" className="nws-brand" aria-label="Leadz Systems home">
            <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="nws-logo" priority />
          </Link>
          <div className="nws-bar-actions">
            <Link href="/nieuws" className="nws-back">← Alle artikelen</Link>
            <a href="/#contact" className="nws-btn">Plan een AI Scan</a>
          </div>
        </div>
      </header>

      {/* ── Article ── */}
      <article className="nws-article">
        <div className="nws-card-meta nws-article-meta">
          <span className="nws-tag">{artikel.category}</span>
          <time dateTime={artikel.date}>{formatDate(artikel.date)}</time>
        </div>
        <h1 className="nws-article-title">{artikel.title}</h1>
        <p className="nws-article-lead">{artikel.excerpt}</p>

        {artikel.cover && (
          <div className="nws-article-media">
            <Image src={artikel.cover} alt="" width={1200} height={630} className="nws-article-img" />
          </div>
        )}

        <div className="nws-article-body">
          {artikel.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="nws-article-foot">
          <Link href="/nieuws" className="nws-back">← Terug naar alle artikelen</Link>
          <a href="/#contact" className="nws-btn">Plan een AI Scan</a>
        </div>
      </article>

      {/* ── Footer ── */}
      <footer className="nws-footer">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <Link href="/" className="nws-back">Naar de homepage</Link>
      </footer>
    </div>
  );
}
