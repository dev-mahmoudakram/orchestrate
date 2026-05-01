import { ProjectsPage } from "@/components/public/projects-page";

type ArabicProjectsPageProps = {
  searchParams: Promise<{
    sector?: string;
  }>;
};

export default async function ArabicProjectsPage({ searchParams }: ArabicProjectsPageProps) {
  const { sector } = await searchParams;

  return <ProjectsPage locale="ar" selectedSectorSlug={sector} />;
}
