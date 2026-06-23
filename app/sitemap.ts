import type { MetadataRoute } from "next";
import { SITE, DIENSTEN } from "./lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...DIENSTEN.map((d) => ({
      url: `${SITE.url}/diensten/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
