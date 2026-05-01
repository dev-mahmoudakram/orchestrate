import type { Metadata } from "next";

import { ProjectDetailPage } from "@/components/public/project-detail-page";
import { getProjectSeoMetadata } from "@/lib/seo/metadata";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return getProjectSeoMetadata(slug, "ar");
}

export default async function ArabicProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  return <ProjectDetailPage locale="ar" slug={slug} />;
}
