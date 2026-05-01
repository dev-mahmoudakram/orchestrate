import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/admin/*", "/uploads", "/uploads/*", "/_next/*"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
