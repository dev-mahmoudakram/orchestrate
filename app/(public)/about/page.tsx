import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export default function ArabicAboutPage() {
  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <SectionHeader
          description="صفحة تمهيدية لمسار من نحن. ستعرض لاحقا القصة، الفلسفة، القيم، وفريق القيادة من قاعدة البيانات."
          eyebrow="من نحن"
          title="أساس صفحة التعريف"
        />
        <Card className="mt-10">
          <p className="leading-8 text-petrol/70">
            هذه الصفحة جزء من هيكل Phase 1 فقط، وليست شاشة محتوى نهائية.
          </p>
        </Card>
      </Container>
    </main>
  );
}
