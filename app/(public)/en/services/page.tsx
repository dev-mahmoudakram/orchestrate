import type { Metadata } from "next";

import { StandardPage } from "@/components/public/standard-page";
import { getPageSeoMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeoMetadata("services", "en", "/services");
}

export default function EnglishServicesPage() {
  return <StandardPage locale="en" pageKey="services" />;
}
