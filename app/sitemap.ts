import { MetadataRoute } from "next";

export const revalidate = 86400; // 1 day

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.traphandle.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}