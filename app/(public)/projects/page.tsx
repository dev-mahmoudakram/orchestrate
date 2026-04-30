import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export default function ArabicProjectsPage() {
  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <SectionHeader
          description="مسار المشاريع سيضم لاحقا الفلاتر حسب القطاع، المشاريع المميزة، وروابط تفاصيل كل مشروع."
          eyebrow="المشاريع"
          title="هيكل صفحة المشاريع"
        />
        <Card className="mt-10">
          <p className="leading-8 text-petrol/70">
            Project cards and sector filtering will be connected after the database and CMS are in place.
          </p>
        </Card>
      </Container>
    </main>
  );
}
