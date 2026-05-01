import type { Metadata } from "next";

import { HomePage } from "@/components/public/home-page";
import { getPageSeoMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeoMetadata("home", "en", "/");
}

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
