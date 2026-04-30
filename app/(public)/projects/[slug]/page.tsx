import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArabicProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <Badge>{slug}</Badge>
        <SectionHeader
          description="صفحة تفاصيل المشروع ستكون مدعومة ببيانات التحدي، المنهجية، والنتائج."
          eyebrow="تفاصيل المشروع"
          title="هيكل صفحة مشروع"
        />
        <Card className="mt-10">
          <p className="leading-8 text-petrol/70">Stable slugs will be added in the Prisma phase.</p>
        </Card>
      </Container>
    </main>
  );
}
