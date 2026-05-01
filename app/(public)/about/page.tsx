import type { Metadata } from "next";

import { StandardPage } from "@/components/public/standard-page";
import { getPageSeoMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeoMetadata("about", "ar", "/about");
}

export default function ArabicAboutPage() {
  return <StandardPage locale="ar" pageKey="about" />;
}
