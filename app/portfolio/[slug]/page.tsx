import type { Metadata } from "next";
import Image from "next/image";
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
    title: `${item.title} | Portfolio | Leadz Systems`,
    description: item.description,
    alternates: { canonical: `/portfolio/${item.slug}` },
    openGraph: {
      title: `${item.title} | Leadz Systems`,
      description: item.description,
      url: `${SITE.url}/portfolio/${item.slug}`,
    },
  };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  if (!item) notFound();

  const andere = PORTFOLIO_ITEMS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="ul-root min-h-screen overflow-x-hidden bg-white">
      {/* ── NAV ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--ul-line)] bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center">
            <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="h-[18px] w-auto object-contain" />
          </a>
          <div className="flex items-center gap-6">
            <a href="/#portfolio" className="text-sm text-[var(--ul-muted)] transition-colors hover:text-[var(--ul-ink)]">← Portfolio</a>
            <a href="/#contact" className="hidden md:inline-block rounded-full bg-[var(--ul-ink)] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">
              Plan een gesprek
            </a>
          </div>
        </nav>
      </header>
      <div className="h-[73px]" />

      {/* ── HERO ── */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-4 flex items-center gap-3">
          <a href="/#portfolio" className="text-sm text-[var(--ul-muted)] hover:text-[var(--ul-ink)]">Portfolio</a>
          <span className="text-[var(--ul-line)]">/</span>
          <span className="text-sm text-[var(--ul-ink)]">{item.title}</span>
        </div>
        <span className="mb-4 inline-block rounded-full bg-[var(--ul-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--ul-accent)]">{item.tag}</span>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{item.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--ul-muted)]">{item.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {item.stack.map((s) => (
            <span key={s} className="rounded-md border border-[var(--ul-line)] px-3 py-1 text-xs font-medium text-[var(--ul-muted)]">{s}</span>
          ))}
        </div>
      </section>

      {/* ── PREVIEW ── */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        {item.screenshot ? (
          <div className="overflow-hidden rounded-2xl border border-[var(--ul-line)] shadow-xl">
            <Image src={item.screenshot} alt={`Screenshot van ${item.title}`} width={1280} height={720} className="w-full" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[var(--ul-line)] shadow-xl">
            <div className="flex items-center gap-1.5 border-b border-[var(--ul-line)] bg-gray-50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 flex-1 rounded bg-white px-3 py-1 text-center text-xs text-gray-400">{item.domain}</span>
            </div>
            <iframe
              src={item.url}
              title={item.title}
              className="h-[500px] w-full"
              loading="lazy"
            />
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--ul-accent)] hover:underline"
          >
            Bekijk live site →
          </a>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="border-t border-[var(--ul-line)] bg-[var(--ul-accent-soft)]/20 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2">

          {/* Uitdaging */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--ul-accent)]">De uitdaging</p>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">Wat speelde er?</h2>
            <p className="leading-7 text-[var(--ul-muted)]">{item.uitdaging}</p>
          </div>

          {/* Wat we deden */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Wat we gebouwd hebben</p>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">Onze aanpak</h2>
            <ul className="space-y-3">
              {item.watWeDeden.map((w, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--ul-accent)] text-[10px] font-bold text-white">{i + 1}</span>
                  <span className="text-sm leading-6 text-[var(--ul-muted)]">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Resultaat */}
        <div className="mx-auto mt-12 max-w-5xl px-6">
          <div className="rounded-2xl border border-[var(--ul-accent)]/20 bg-white p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--ul-accent)]">Het resultaat</p>
            <p className="text-lg font-medium leading-7 text-[var(--ul-ink)]">{item.resultaat}</p>
          </div>
        </div>
      </section>

      {/* ── ANDERE PROJECTEN ── */}
      {andere.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">Andere projecten</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {andere.map((p) => (
              <a
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-[var(--ul-line)] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="mb-3 inline-block rounded-full bg-[var(--ul-accent-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--ul-accent)]">{p.tag}</span>
                <h3 className="font-semibold text-[var(--ul-ink)] group-hover:text-[var(--ul-accent)] transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-[var(--ul-muted)]">{p.description}</p>
                <span className="mt-4 text-sm font-medium text-[var(--ul-accent)]">Bekijk project →</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="border-t border-[var(--ul-line)] bg-[var(--ul-ink)] py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Ook iets laten bouwen?</h2>
          <p className="mt-4 text-white/70">Plan een vrijblijvend gesprek en we kijken samen wat de beste aanpak is voor jouw situatie.</p>
          <a
            href="/#contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-[var(--ul-ink)] transition-transform hover:-translate-y-0.5"
          >
            Plan een gesprek
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 bg-[var(--ul-ink)] py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <a href="/" className="flex items-center">
            <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="h-[18px] w-auto object-contain brightness-0 invert" />
          </a>
          <p className="text-sm text-white/40">© 2026 Leadz Systems</p>
        </div>
      </footer>
    </div>
  );
}
