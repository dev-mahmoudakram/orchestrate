import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EnglishProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <Badge>{slug}</Badge>
        <SectionHeader
          description="Project details will include challenge, approach, and results from translated CMS fields."
          eyebrow="Project details"
          title="Project detail foundation"
        />
        <Card className="mt-10">
          <p className="leading-8 text-petrol/70">Stable slugs will be added in the Prisma phase.</p>
        </Card>
      </Container>
    </main>
  );
}
