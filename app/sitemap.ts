import type { MetadataRoute } from "next";
import { SITE, DIENSTEN, PORTFOLIO_ITEMS } from "./lib/content";
import { ARTIKELEN } from "./lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/nieuws`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...DIENSTEN.map((d) => ({
      url: `${SITE.url}/diensten/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PORTFOLIO_ITEMS.map((p) => ({
      url: `${SITE.url}/portfolio/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Artikelen krijgen hun eigen publicatiedatum mee, zodat zoekmachines zien
    // wanneer een bericht daadwerkelijk is verschenen.
    ...ARTIKELEN.map((a) => ({
      url: `${SITE.url}/nieuws/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
