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

  return getProjectSeoMetadata(slug, "en");
}

export default async function EnglishProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  return <ProjectDetailPage locale="en" slug={slug} />;
}
