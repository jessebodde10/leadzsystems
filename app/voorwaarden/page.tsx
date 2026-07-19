import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "../lib/content";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van Leadz Systems: afspraken over offertes, uitvoering, prijzen, betaling, intellectueel eigendom en aansprakelijkheid.",
  alternates: { canonical: "/voorwaarden" },
};

// Datum van de laatste inhoudelijke wijziging van deze voorwaarden.
const LAATST_BIJGEWERKT = "18 juli 2026";

export default function VoorwaardenPage() {
  return (
    <div className="pg-root">
      {/* ── Top bar ── */}
      <header className="pg-bar">
        <div className="pg-bar-inner">
          <Link href="/" className="pg-brand" aria-label={`${SITE.name} home`}>
            <Image src="/logo.png" alt={SITE.name} width={1350} height={157} className="pg-logo" priority />
          </Link>
          <div className="pg-bar-actions">
            <Link href="/" className="pg-back">← Terug naar site</Link>
            <a href="/#agenda" className="pg-btn">Plan een AI Scan</a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pg-hero">
        <span className="pg-kicker"><span className="pg-kicker-dot" aria-hidden />Voorwaarden</span>
        <h1 className="pg-title">Algemene voorwaarden</h1>
        <p className="pg-lead">
          Kort en in gewone taal: dit zijn de afspraken die gelden voor onze offertes en
          opdrachten. Zo weet je van tevoren waar je aan toe bent, zonder verrassingen achteraf.
        </p>
        <p className="pg-stat">Laatst bijgewerkt: {LAATST_BIJGEWERKT}</p>
      </section>

      <article className="pg-section prose">
        <h2 className="pg-h2">1. Wie zijn wij</h2>
        <p>
          Deze voorwaarden zijn van toepassing op alle offertes, opdrachten en overeenkomsten met:
        </p>
        <ul className="plain">
          <li><strong>{SITE.name}</strong>, gevestigd in {SITE.region}</li>
          <li>KvK: {SITE.kvk}</li>
          <li>E-mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          <li>Telefoon: <a href={`tel:${SITE.phoneIntl}`}>{SITE.phone}</a></li>
        </ul>
        <p>
          Met &quot;wij&quot; of &quot;ons&quot; bedoelen we {SITE.name}. Met &quot;jij&quot; of
          &quot;klant&quot; bedoelen we de partij die met ons een overeenkomst aangaat.
        </p>

        <h2 className="pg-h2">2. Toepasselijkheid</h2>
        <p>
          Deze voorwaarden gelden voor elke offerte en overeenkomst tussen ons en de klant, tenzij
          we samen schriftelijk iets anders afspreken. Eventuele inkoop- of andere voorwaarden van
          de klant wijzen we uitdrukkelijk van de hand, tenzij we die vooraf schriftelijk hebben
          aanvaard.
        </p>

        <h2 className="pg-h2">3. Offertes en aanbiedingen</h2>
        <p>
          Onze offertes zijn vrijblijvend en dertig dagen geldig, tenzij er iets anders in staat.
          Een offerte is gebaseerd op de informatie die je op dat moment aanlevert. Prijzen zijn in
          euro&apos;s en exclusief btw, tenzij anders vermeld. Kennelijke vergissingen of fouten in
          een offerte binden ons niet.
        </p>

        <h2 className="pg-h2">4. De overeenkomst</h2>
        <p>
          De overeenkomst komt tot stand zodra je een offerte of voorstel akkoord geeft, per e-mail
          of schriftelijk. We spreken samen de scope af: wat we opleveren, tegen welke prijs en
          binnen welke termijn. Werk dat buiten die afspraak valt (meerwerk) stemmen we eerst met je
          af voordat we het uitvoeren.
        </p>

        <h2 className="pg-h2">5. Uitvoering en medewerking</h2>
        <p>
          We voeren de opdracht naar beste inzicht en vermogen uit. Voor een goede uitvoering ben je
          verantwoordelijk voor het tijdig aanleveren van de informatie, toegang, teksten en
          materialen die we nodig hebben. Lopen we daardoor vertraging op, dan schuiven de
          afgesproken termijnen mee op. Genoemde opleveringstermijnen zijn een inschatting en geen
          harde deadline (fatale termijn), tenzij we dat expliciet zo afspreken.
        </p>

        <h2 className="pg-h2">6. Wijzigingen en meerwerk</h2>
        <p>
          Wil je tussentijds de opdracht uitbreiden of aanpassen? Dat kan. We laten je vooraf weten
          wat dit betekent voor de prijs en de planning. Meerwerk brengen we op basis van de
          afgesproken tarieven in rekening.
        </p>

        <h2 className="pg-h2">7. Prijzen en betaling</h2>
        <p>
          Tenzij anders afgesproken factureren we in termijnen: een deel bij de start en het restant
          bij oplevering. Onze betaaltermijn is veertien dagen na factuurdatum. Betaal je niet op
          tijd, dan mogen we de wettelijke (handels)rente en redelijke incassokosten in rekening
          brengen en de werkzaamheden opschorten tot de openstaande facturen zijn voldaan.
        </p>

        <h2 className="pg-h2">8. Intellectueel eigendom</h2>
        <p>
          Na volledige betaling krijg je het gebruiksrecht op de voor jou gemaakte oplossing, zoals
          afgesproken in de overeenkomst. Onderliggende componenten, frameworks, generieke code en
          methodes die we breder inzetten, blijven van ons of van derden. We mogen de opgedane kennis
          en algemene werkwijze blijven gebruiken voor andere opdrachten.
        </p>

        <h2 className="pg-h2">9. Diensten en modellen van derden</h2>
        <p>
          Voor onze oplossingen maken we gebruik van diensten van derden, zoals hosting, AI-modellen
          en koppelingen met externe software. Op die diensten zijn de voorwaarden en beschikbaarheid
          van die partijen van toepassing. We zijn niet verantwoordelijk voor storingen, wijzigingen
          of prijsaanpassingen bij die derden.
        </p>

        <h2 className="pg-h2">10. Aansprakelijkheid</h2>
        <p>
          We doen ons werk zorgvuldig, maar kunnen niet garanderen dat software altijd foutloos of
          ononderbroken werkt. Onze aansprakelijkheid is beperkt tot directe schade en tot maximaal
          het bedrag dat we voor de betreffende opdracht hebben gefactureerd (of, bij een lopende
          opdracht, de laatste drie maanden). We zijn niet aansprakelijk voor indirecte schade, zoals
          gemiste omzet, data-verlies of gevolgschade. Deze beperking geldt niet bij opzet of bewuste
          roekeloosheid van onze kant.
        </p>

        <h2 className="pg-h2">11. Geheimhouding</h2>
        <p>
          We gaan vertrouwelijk om met alle informatie die we in het kader van de opdracht van je
          ontvangen en delen die niet met derden, behalve als dat nodig is voor de uitvoering of als
          de wet ons daartoe verplicht. Andersom verwachten we hetzelfde van jou ten aanzien van onze
          werkwijze en voorstellen.
        </p>

        <h2 className="pg-h2">12. Duur en beëindiging</h2>
        <p>
          Een opdracht loopt tot de afgesproken werkzaamheden zijn opgeleverd. Bij doorlopende
          diensten (zoals onderhoud of support) geldt de afgesproken looptijd en opzegtermijn. We
          mogen de overeenkomst opschorten of beëindigen als je je verplichtingen niet nakomt, na een
          redelijke termijn om dat alsnog te doen.
        </p>

        <h2 className="pg-h2">13. Overmacht</h2>
        <p>
          Kunnen we onze verplichtingen niet nakomen door omstandigheden buiten onze schuld (zoals
          storingen bij leveranciers, uitval van internet of ziekte), dan worden die verplichtingen
          tijdelijk opgeschort. Duurt de overmacht langer dan dertig dagen, dan mogen beide partijen
          de overeenkomst beëindigen voor het deel dat nog niet is uitgevoerd.
        </p>

        <h2 className="pg-h2">14. Klachten</h2>
        <p>
          Ben je ergens niet tevreden over? Laat het ons zo snel mogelijk weten via{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, uiterlijk binnen veertien dagen nadat je
          het probleem hebt ontdekt. We zoeken dan samen naar een passende oplossing.
        </p>

        <h2 className="pg-h2">15. Toepasselijk recht</h2>
        <p>
          Op onze overeenkomsten is Nederlands recht van toepassing. Geschillen die we niet samen
          kunnen oplossen, leggen we voor aan de bevoegde rechter in Nederland.
        </p>

        <h2 className="pg-h2">16. Wijzigingen</h2>
        <p>
          We mogen deze voorwaarden aanpassen. Voor lopende opdrachten gelden de voorwaarden zoals
          die golden op het moment dat de overeenkomst tot stand kwam. Bovenaan staat wanneer we deze
          voorwaarden voor het laatst hebben bijgewerkt.
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
