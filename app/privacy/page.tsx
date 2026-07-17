import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "../lib/content";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe Leadz Systems omgaat met je gegevens: wat we verwerken, waarom, met welke partijen we werken en welke rechten je hebt.",
  alternates: { canonical: "/privacy" },
};

// Datum van de laatste inhoudelijke wijziging van deze verklaring.
const LAATST_BIJGEWERKT = "17 juli 2026";

export default function PrivacyPage() {
  return (
    <div className="pg-root">
      {/* ── Top bar ── */}
      <header className="pg-bar">
        <div className="pg-bar-inner">
          <Link href="/" className="pg-brand" aria-label="Leadz Systems home">
            <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="pg-logo" priority />
          </Link>
          <div className="pg-bar-actions">
            <Link href="/" className="pg-back">← Terug naar site</Link>
            <a href="/#agenda" className="pg-btn">Plan een gesprek</a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pg-hero">
        <span className="pg-kicker"><span className="pg-kicker-dot" aria-hidden />Privacy</span>
        <h1 className="pg-title">Privacyverklaring</h1>
        <p className="pg-lead">
          Kort en zonder juridisch gedoe: dit is welke gegevens we verwerken, waarom we dat
          doen en wat jij daarover te zeggen hebt. We verkopen niets door en we volgen je niet.
        </p>
        <p className="pg-stat">Laatst bijgewerkt: {LAATST_BIJGEWERKT}</p>
      </section>

      <article className="pg-section prose">
        <h2 className="pg-h2">Wie zijn wij</h2>
        <p>
          {SITE.name} is verantwoordelijk voor de verwerking van je gegevens zoals beschreven op
          deze pagina.
        </p>
        <ul className="plain">
          <li><strong>{SITE.name}</strong>, gevestigd in {SITE.region}</li>
          <li>KvK: {SITE.kvk}</li>
          <li>E-mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          <li>Telefoon: <a href={`tel:${SITE.phoneIntl}`}>{SITE.phone}</a></li>
        </ul>

        <h2 className="pg-h2">Wat we niet doen</h2>
        <p>
          Deze website gebruikt <strong>geen analytics, geen advertentienetwerken en geen
          tracking-cookies</strong>. We meten je gedrag niet, we bouwen geen profiel van je op en
          we verkopen of verhuren je gegevens nooit aan derden. Lettertypen worden vanaf onze
          eigen server geladen, dus daarvoor gaat er ook geen verzoek naar externe partijen.
        </p>

        <h2 className="pg-h2">Welke gegevens we verwerken</h2>

        <h3 className="sub">Als je een gesprek inplant</h3>
        <p>
          Onze agenda is een ingesloten planningstool van Cal.com. Plan je een gesprek, dan geef
          je daar je <strong>naam, e-mailadres, gekozen tijdstip</strong> en eventueel een
          toelichting op. Die gegevens gebruiken we alleen om de afspraak te maken en het gesprek
          voor te bereiden. Grondslag: het op jouw verzoek nemen van stappen vóór een eventuele
          overeenkomst.
        </p>

        <h3 className="sub">Als je contact opneemt</h3>
        <p>
          Mail, bel of app je ons, dan verwerken we de gegevens die je zelf deelt: je naam,
          contactgegevens en de inhoud van je bericht. We gebruiken dat om je vraag te
          beantwoorden. Grondslag: ons gerechtvaardigd belang om op je bericht te reageren.
          Gebruik je WhatsApp, dan loopt dat bericht via WhatsApp (Meta) en gelden ook hun
          voorwaarden.
        </p>

        <h3 className="sub">Technische gegevens</h3>
        <p>
          Onze website draait bij Vercel. Zoals bij vrijwel elke website worden daarbij technische
          gegevens verwerkt, zoals je IP-adres, het tijdstip van je bezoek en welke pagina je
          opvraagt. Dat is nodig om de site te kunnen tonen en te beschermen tegen misbruik.
          Grondslag: gerechtvaardigd belang (een werkende, veilige website).
        </p>

        <h2 className="pg-h2">Ingesloten inhoud van derden</h2>
        <p>
          Twee onderdelen van deze site laden inhoud van andere partijen. Die partijen kunnen zelf
          gegevens ontvangen (zoals je IP-adres) en cookies plaatsen zodra dat onderdeel laadt:
        </p>
        <ul className="plain">
          <li>
            <strong>Cal.com</strong> — de agenda waarmee je een gesprek inplant.
          </li>
          <li>
            <strong>Previews in ons portfolio</strong> — op de portfoliopagina&apos;s tonen we de
            echte websites van projecten. Die worden live ingeladen vanaf hun eigen adres.
          </li>
        </ul>
        <p>
          Op de verwerking door die partijen hebben wij geen invloed. Raadpleeg hun eigen
          privacyverklaring als je daar meer over wilt weten.
        </p>

        <h2 className="pg-h2">Hoe lang we gegevens bewaren</h2>
        <p>
          We bewaren je gegevens niet langer dan nodig. Contactverzoeken en ingeplande gesprekken
          die niet tot samenwerking leiden, bewaren we tot maximaal twee jaar, zodat we een
          eerder gesprek nog kunnen terugvinden. Word je klant, dan bewaren we de gegevens die bij
          de administratie horen zolang de wet dat vraagt (voor de belastingdienst zeven jaar).
        </p>

        <h2 className="pg-h2">Met wie we gegevens delen</h2>
        <p>
          Alleen met partijen die nodig zijn om de site en onze dienstverlening te laten werken,
          zoals onze hosting (Vercel), de planningstool (Cal.com) en onze e-mail. Zij verwerken
          gegevens in onze opdracht. Verder delen we niets, tenzij we daar wettelijk toe verplicht
          zijn.
        </p>

        <h2 className="pg-h2">Je rechten</h2>
        <p>
          Je mag ons altijd vragen om je gegevens in te zien, te corrigeren of te laten
          verwijderen. Ook kun je bezwaar maken tegen de verwerking of vragen om je gegevens over
          te dragen. Stuur een mail naar <a href={`mailto:${SITE.email}`}>{SITE.email}</a> en we
          pakken het op. Kom je er met ons niet uit, dan kun je een klacht indienen bij de{" "}
          <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
            Autoriteit Persoonsgegevens
          </a>
          .
        </p>

        <h2 className="pg-h2">Beveiliging</h2>
        <p>
          We nemen passende maatregelen om je gegevens te beschermen. De site gaat volledig via een
          beveiligde verbinding (HTTPS) en toegang tot gegevens is beperkt tot wie het nodig heeft.
          Denk je dat er iets niet klopt of dat gegevens niet goed beveiligd zijn? Laat het ons
          weten via <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2 className="pg-h2">Wijzigingen</h2>
        <p>
          Verandert onze werkwijze, dan passen we deze verklaring aan. Bovenaan staat wanneer we
          dat voor het laatst hebben gedaan.
        </p>
      </article>

      {/* ── Footer ── */}
      <footer className="pg-footer">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <Link href="/" className="pg-back">Naar de homepage</Link>
      </footer>
    </div>
  );
}
