import Image from "next/image";

export const metadata = {
  title: "Even offline | Leadz Systems",
  robots: { index: false },
};

export default function MaintenancePage() {
  return (
    <div className="ul-root flex min-h-screen flex-col items-center justify-center bg-[var(--ul-bg)] px-6 text-center">
      <div className="mb-10">
        <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="h-7 w-auto" />
      </div>

      <div className="max-w-md">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--ul-accent)]">Even offline</p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--ul-ink)] md:text-4xl">
          We zijn zo terug.
        </h1>
        <p className="mt-4 leading-7 text-[var(--ul-muted)]">
          De website is tijdelijk offline voor onderhoud. We zijn druk bezig en zijn snel weer bereikbaar.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="mailto:info@leadzsystems.nl"
            className="inline-block rounded-full bg-[var(--ul-accent)] px-6 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Stuur een e-mail
          </a>
          <a
            href="https://wa.me/31624505863"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-[var(--ul-line)] px-6 py-2.5 text-sm font-medium text-[var(--ul-ink)] transition-transform hover:-translate-y-0.5"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <p className="absolute bottom-8 text-xs text-[var(--ul-muted)]">© 2026 Leadz Systems</p>
    </div>
  );
}
