import type { Metadata } from "next";
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
    title: dienst.metaTitle,
    description: dienst.metaDescription,
    alternates: { canonical: `/diensten/${dienst.slug}` },
    openGraph: {
      title: dienst.metaTitle,
      description: dienst.metaDescription,
      url: `${SITE.url}/diensten/${dienst.slug}`,
    },
  };
}

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
    <div className="ul-root min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-[var(--ul-line)] bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--ul-accent)] to-[var(--ul-accent-2)] text-white">L</span>
            <span className="text-[17px]">Leadz Systems</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a href="/#diensten" className="text-sm text-[var(--ul-muted)] transition-colors hover:text-[var(--ul-ink)]">Diensten</a>
            <a href="/#werkwijze" className="text-sm text-[var(--ul-muted)] transition-colors hover:text-[var(--ul-ink)]">Werkwijze</a>
            <a href="/#portfolio" className="text-sm text-[var(--ul-muted)] transition-colors hover:text-[var(--ul-ink)]">Portfolio</a>
            <a href="/#contact" className="text-sm text-[var(--ul-muted)] transition-colors hover:text-[var(--ul-ink)]">Contact</a>
          </div>
          <a href="/#contact" className="rounded-full bg-[var(--ul-ink)] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">
            Plan een gesprek
          </a>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="ul-mesh relative px-6 pt-16 pb-16 md:pt-24">
        <div className="mx-auto max-w-3xl">
          <a href="/#diensten" className="block w-fit text-sm text-[var(--ul-muted)] transition-colors hover:text-[var(--ul-ink)]">← Alle diensten</a>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--ul-line)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--ul-muted)] shadow-sm">
            <span className="text-lg">{dienst.icon}</span>
            {dienst.title}
          </div>
          <h1 className="mt-10 text-4xl font-semibold leading-[1.08] tracking-tight md:mt-12 md:text-5xl">{dienst.metaTitle.split("|")[0].trim()}</h1>
          <p className="mt-5 text-lg text-[var(--ul-muted)] md:text-xl">{dienst.heroLead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] px-7 py-3.5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-transform hover:-translate-y-0.5">
              Plan een vrijblijvend gesprek
            </a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--ul-line)] bg-white px-7 py-3.5 text-center font-medium transition-colors hover:bg-[var(--ul-accent-soft)]">
              Stel een vraag via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── HERKENBAAR ── */}
      <section className="border-y border-[var(--ul-line)] bg-[var(--ul-accent-soft)]/40 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Komt dit bekend voor?</h2>
          <p className="mt-3 text-lg text-[var(--ul-muted)]">Dit zijn de situaties waar wij wat aan doen.</p>
          <div className="mt-8 space-y-3">
            {dienst.herkenbaar.map((h) => (
              <div key={h} className="flex items-start gap-4 rounded-2xl border border-[var(--ul-line)] bg-white p-5">
                <span className="text-2xl leading-none text-[var(--ul-accent)]">&ldquo;</span>
                <p className="leading-7 text-[var(--ul-ink)]/85">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPLOSSING ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ul-accent)]">De oplossing</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Wat wij bouwen</h2>
            <p className="mt-4 text-[var(--ul-muted)]">{dienst.stat}.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {dienst.oplossing.map((o, i) => (
              <div key={o.title} className="rounded-2xl border border-[var(--ul-line)] bg-white p-8 transition-shadow hover:shadow-lg">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--ul-accent)] to-[var(--ul-accent-2)] font-semibold text-white">{i + 1}</div>
                <h3 className="text-lg font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--ul-muted)]">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KOPPELINGEN ── */}
      <section className="border-y border-[var(--ul-line)] bg-[var(--ul-accent-soft)]/40 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Werkt met jouw software</h2>
          <p className="mt-2 text-lg text-[var(--ul-muted)]">We koppelen aan de software en tools die je al gebruikt.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {dienst.koppelingen.map((k) => (
              <span key={k} className="inline-flex items-center gap-2 rounded-full border border-[var(--ul-line)] bg-white px-4 py-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--ul-accent)]" />
                {k}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANDERE DIENSTEN ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight">Andere diensten</h2>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {andere.map((d) => (
              <a key={d.slug} href={`/diensten/${d.slug}`} className="group rounded-2xl border border-[var(--ul-line)] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[var(--ul-accent)]/40 hover:shadow-xl">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[var(--ul-accent-soft)] text-2xl">{d.icon}</div>
                <h3 className="text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--ul-muted)]">{d.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--ul-accent)]">Lees meer →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[var(--ul-ink)] px-8 py-16 text-center text-white">
          <div className="ul-mesh pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">Benieuwd wat dit voor jou oplevert?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">Plan een vrijblijvend gesprek. Geen verkooppraatje, gewoon eerlijk kijken waar het tijd bespaart.</p>
            <a href="/#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] px-8 py-4 font-medium shadow-lg shadow-indigo-500/30 transition-transform hover:-translate-y-0.5">
              Plan een gesprek
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--ul-line)] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--ul-accent)] to-[var(--ul-accent-2)] text-white">L</span>
            Leadz Systems
          </a>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {DIENSTEN.map((d) => (
              <a key={d.slug} href={`/diensten/${d.slug}`} className="text-sm text-[var(--ul-muted)] transition-colors hover:text-[var(--ul-ink)]">
                {d.title}
              </a>
            ))}
          </div>
          <p className="text-sm text-[var(--ul-muted)]">© 2026 Leadz Systems · KvK {SITE.kvk}</p>
        </div>
      </footer>

      {/* ── FLOATING KNOPPEN ── */}
      <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Stuur een WhatsApp-bericht" className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 md:grid">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="white" aria-hidden="true"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a3 3 0 00-1 2.3c0 1.3 1 2.6 1.1 2.8.1.2 1.9 3 4.7 4.1 1.7.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.4-.2z" /></svg>
      </a>
      <a href={`tel:${SITE.phoneIntl}`} aria-label={`Bel ${SITE.phone}`} className="fixed bottom-6 left-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-r from-[var(--ul-accent)] to-[var(--ul-accent-2)] shadow-lg shadow-indigo-500/30 md:hidden">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="white" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
      </a>
      <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Stuur een WhatsApp-bericht" className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-lg shadow-black/30 md:hidden">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="white" aria-hidden="true"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a3 3 0 00-1 2.3c0 1.3 1 2.6 1.1 2.8.1.2 1.9 3 4.7 4.1 1.7.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.4-.2z" /></svg>
      </a>
    </div>
  );
}
