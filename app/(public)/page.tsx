import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const sections = [
  "Hero",
  "Philosophy",
  "Sectors",
  "Services preview",
  "Featured case studies",
  "Methodology",
  "Partners",
  "Final CTA",
];

export default function ArabicHomePage() {
  return (
    <main className="orchestration-grid min-h-screen bg-soft py-16">
      <Container>
        <Badge tone="orange">Arabic default route</Badge>
        <SectionHeader
          description="تأسيس أولي لتجربة الموقع العامة. سيتم ربط المحتوى وقيم الواجهة بقاعدة البيانات ولوحة الترجمة في المراحل اللاحقة."
          eyebrow="تناغم الابتكار"
          title="موقع مؤسسي ثنائي اللغة مع نظام إدارة محتوى مخصص"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Card className="min-h-36" key={section}>
              <p className="text-sm font-semibold text-orange">{section}</p>
              <p className="mt-4 text-sm leading-7 text-petrol/70">
                Placeholder foundation for Phase 1.
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
