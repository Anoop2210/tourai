import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const staticRoutes = ["", "/planner", "/budget", "/pricing", "/blog", "/dashboard"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));

  const destinations = await prisma.destination.findMany({ select: { slug: true, updatedAt: true } }).catch(() => []);
  const destRoutes = destinations.map((d) => ({ url: `${base}/${d.slug}`, lastModified: d.updatedAt }));

  return [...staticRoutes, ...destRoutes];
}
