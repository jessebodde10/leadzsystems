import type { Metadata } from "next";
import V2Home from "../components/V2Home";

export const metadata: Metadata = {
  title: { absolute: "Leadz Systems | AI-consultancy & implementatie voor het MKB" },
  description:
    "Leadz Systems helpt het MKB bedrijfsprocessen automatiseren met AI: AI-agents, procesautomatisering en integraties die uren werk besparen, fouten voorkomen en de productiviteit verhogen.",
  // Concept ter review — nog niet indexeren tot we live gaan.
  robots: { index: false, follow: false },
  alternates: { canonical: "/v2" },
};

export default function V2Page() {
  return <V2Home />;
}
