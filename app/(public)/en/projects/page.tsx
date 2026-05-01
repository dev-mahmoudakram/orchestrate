import { ProjectsPage } from "@/components/public/projects-page";

type EnglishProjectsPageProps = {
  searchParams: Promise<{
    sector?: string;
  }>;
};

export default async function EnglishProjectsPage({ searchParams }: EnglishProjectsPageProps) {
  const { sector } = await searchParams;

  return <ProjectsPage locale="en" selectedSectorSlug={sector} />;
}
