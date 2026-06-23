import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
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
    <div className="min-h-screen bg-[#111418] text-white overflow-x-hidden pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Nav />

      {/* ── HERO ── */}
      <section className="relative pt-36 md:pt-40 pb-16 md:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 blueprint opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <a href="/#diensten" className="text-sm text-white/60 hover:text-white transition-colors">← Alle diensten</a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-sm font-medium mt-6 mb-6">
            <span className="text-lg">{dienst.icon}</span>
            {dienst.title}
          </div>
          <h1 className="text-[2.5rem] leading-[1.08] md:text-6xl font-bold mb-6">{dienst.metaTitle.split("|")[0].trim()}</h1>
          <p className="text-lg md:text-xl text-white/75 leading-8 mb-8">{dienst.heroLead}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/#contact"
              className="px-7 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all font-semibold text-center shadow-lg shadow-orange-500/25"
            >
              Plan een gratis scan
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-full border border-white/15 hover:border-white/35 hover:bg-white/5 transition-all font-medium text-center text-white/90"
            >
              Stel een vraag via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── HERKENBAAR ── (lichter werkvlak) */}
      <section className="py-16 md:py-24 px-6 bg-[#15191e] border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Komt dit bekend voor?</h2>
          <p className="text-white/70 text-lg leading-8 mb-8">Dit zijn de situaties waar wij wat aan doen.</p>
          <div className="space-y-3">
            {dienst.herkenbaar.map((h) => (
              <div key={h} className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-[#1a1f25]">
                <span className="text-orange-400 text-2xl leading-none shrink-0">&ldquo;</span>
                <p className="text-white/85 text-[0.95rem] leading-7">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPLOSSING ── */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Wat wij{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">bouwen</span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-8">{dienst.stat}.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {dienst.oplossing.map((o, i) => (
              <div key={o.title} className="p-8 rounded-2xl border border-white/10 bg-[#15191e]">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold mb-5">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{o.title}</h3>
                <p className="text-white/70 text-[0.95rem] leading-7">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KOPPELINGEN ── (lichter werkvlak) */}
      <section className="py-16 md:py-20 px-6 bg-[#15191e] border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Werkt met jouw software</h2>
          <p className="text-white/70 text-lg leading-8 mb-8">We koppelen aan de pakketten en groothandels die je al gebruikt.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {dienst.koppelingen.map((k) => (
              <span key={k} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                {k}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANDERE DIENSTEN ── */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Andere diensten</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {andere.map((d) => (
              <a
                key={d.slug}
                href={`/diensten/${d.slug}`}
                className="group p-7 rounded-2xl border border-white/10 bg-[#15191e] hover:border-orange-500/40 hover:bg-[#1a1f25] transition-all"
              >
                <div className="text-3xl mb-4">{d.icon}</div>
                <h3 className="text-lg font-bold mb-2">{d.title}</h3>
                <p className="text-white/70 text-[0.95rem] leading-7 mb-4">{d.description}</p>
                <span className="text-sm font-semibold text-orange-400 group-hover:text-orange-300 transition-colors">
                  Lees meer →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto p-10 md:p-12 rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-600/15 to-amber-600/5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Benieuwd wat dit voor jou oplevert?</h2>
          <p className="text-white/75 text-lg leading-8 mb-8">Plan een gratis scan. Geen verkooppraatje, gewoon eerlijk kijken waar het tijd bespaart.</p>
          <a
            href="/#contact"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all font-semibold shadow-lg shadow-orange-500/25"
          >
            Plan een gesprek
          </a>
        </div>
      </section>

      {/* ── WHATSAPP FLOATING (desktop) ── */}
      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Stuur Leadz Systems een WhatsApp-bericht"
        title="Stuur ons een WhatsApp-bericht"
        className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] transition-all shadow-lg shadow-black/30 hover:scale-110 duration-200 items-center justify-center"
      >
        <span className="sr-only">Stuur Leadz Systems een WhatsApp-bericht</span>
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7" aria-hidden="true" focusable="false">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ── MOBIELE STICKY CTA-BALK ── */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 flex gap-2 p-3 bg-[#111418]/95 backdrop-blur-md border-t border-white/10">
        <a href={`tel:${SITE.phoneIntl}`} className="flex-1 py-3 rounded-full border border-white/15 text-white/90 font-medium text-center text-sm">
          📞 Bellen
        </a>
        <a href="/#contact" className="flex-[1.4] py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 font-semibold text-center text-sm shadow-md shadow-orange-500/20">
          Plan gratis scan
        </a>
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Stuur een WhatsApp-bericht"
          className="w-12 shrink-0 rounded-full bg-[#25D366] flex items-center justify-center"
        >
          <span className="sr-only">Stuur een WhatsApp-bericht</span>
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/" className="text-lg font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Leadz Systems
          </a>
          <p className="text-white/45 text-sm">© {new Date().getFullYear()} Leadz Systems. Alle rechten voorbehouden.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {DIENSTEN.map((d) => (
              <a key={d.slug} href={`/diensten/${d.slug}`} className="text-sm text-white/45 hover:text-white/80 transition-colors">
                {d.title}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
