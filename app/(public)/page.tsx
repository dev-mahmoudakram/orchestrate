import type { Metadata } from "next";

import { HomePage } from "@/components/public/home-page";
import { getPageSeoMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeoMetadata("home", "ar", "/");
}

export default function ArabicHomePage() {
  return <HomePage locale="ar" />;
}
