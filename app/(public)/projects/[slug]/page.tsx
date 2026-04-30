import { ProjectDetailPage } from "@/components/public/project-detail-page";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArabicProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  return <ProjectDetailPage locale="ar" slug={slug} />;
}
