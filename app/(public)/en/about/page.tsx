import type { Metadata } from "next";

import { StandardPage } from "@/components/public/standard-page";
import { getPageSeoMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeoMetadata("about", "en", "/about");
}

export default function EnglishAboutPage() {
  return <StandardPage locale="en" pageKey="about" />;
}
