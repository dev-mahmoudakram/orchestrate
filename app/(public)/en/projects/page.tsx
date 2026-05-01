import type { Metadata } from "next";

import { ProjectsPage } from "@/components/public/projects-page";
import { getPageSeoMetadata } from "@/lib/seo/metadata";

type EnglishProjectsPageProps = {
  searchParams: Promise<{
    sector?: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeoMetadata("projects", "en", "/projects");
}

export default async function EnglishProjectsPage({ searchParams }: EnglishProjectsPageProps) {
  const { sector } = await searchParams;

  return <ProjectsPage locale="en" selectedSectorSlug={sector} />;
}
