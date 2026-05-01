import type { Metadata } from "next";

import { StandardPage } from "@/components/public/standard-page";
import { getPageSeoMetadata } from "@/lib/seo/metadata";

type ArabicContactPageProps = {
  searchParams: Promise<{ contact?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeoMetadata("contact", "ar", "/contact");
}

export default async function ArabicContactPage({ searchParams }: ArabicContactPageProps) {
  const { contact } = await searchParams;
  const contactState = contact === "sent" || contact === "error" ? contact : undefined;

  return <StandardPage contactState={contactState} locale="ar" pageKey="contact" />;
}
