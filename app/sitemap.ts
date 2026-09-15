import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const BASE = "https://estudiomodocasa.com";
const locales = ["es", "en"] as const;
const staticPaths = ["", "/servicios", "/proyectos", "/estudio", "/prensa", "/contacto"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
    for (const p of projects) {
      entries.push({
        url: `${BASE}/${locale}/proyectos/${p.id}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
