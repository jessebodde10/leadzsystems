import UplinkedHome from "./components/UplinkedHome";
import { SITE, FAQS } from "./lib/content";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE.url}/#business`,
        name: SITE.name,
        description:
          "AI-tools voor aannemers en installatiebedrijven: slimme planning, automatische offertes, digitale werkbonnen en materiaalbeheer.",
        url: SITE.url,
        email: SITE.email,
        telephone: SITE.phoneIntl,
        areaServed: SITE.region,
        address: { "@type": "PostalAddress", addressCountry: "NL" },
        founder: { "@type": "Person", name: "Jesse" },
        knowsAbout: ["AI-automatisering", "Bouw", "Installatietechniek", "Offertes", "Projectplanning"],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <UplinkedHome />
    </>
  );
}
