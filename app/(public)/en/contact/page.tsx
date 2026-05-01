import type { Metadata } from "next";

import { StandardPage } from "@/components/public/standard-page";
import { getPageSeoMetadata } from "@/lib/seo/metadata";

type EnglishContactPageProps = {
  searchParams: Promise<{ contact?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeoMetadata("contact", "en", "/contact");
}

export default async function EnglishContactPage({ searchParams }: EnglishContactPageProps) {
  const { contact } = await searchParams;
  const contactState = contact === "sent" || contact === "error" ? contact : undefined;

  return <StandardPage contactState={contactState} locale="en" pageKey="contact" />;
}
