import type { Metadata } from "next";

import { ProjectsPage } from "@/components/public/projects-page";
import { getPageSeoMetadata } from "@/lib/seo/metadata";

type ArabicProjectsPageProps = {
  searchParams: Promise<{
    sector?: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeoMetadata("projects", "ar", "/projects");
}

export default async function ArabicProjectsPage({ searchParams }: ArabicProjectsPageProps) {
  const { sector } = await searchParams;

  return <ProjectsPage locale="ar" selectedSectorSlug={sector} />;
}
