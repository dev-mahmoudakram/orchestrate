import type { Metadata } from "next";

import { StandardPage } from "@/components/public/standard-page";
import { getPageSeoMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeoMetadata("services", "ar", "/services");
}

export default function ArabicServicesPage() {
  return <StandardPage locale="ar" pageKey="services" />;
}
