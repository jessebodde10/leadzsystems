import { Bricolage_Grotesque } from "next/font/google";
import HeroConcept from "../components/HeroConcept";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
});

export const metadata = {
  title: "Concept — Leadz Systems",
  robots: { index: false, follow: false },
};

export default function ConceptPage() {
  return (
    <main className={bricolage.variable}>
      <HeroConcept />
    </main>
  );
}
