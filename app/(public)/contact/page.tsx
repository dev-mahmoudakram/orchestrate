import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export default function ArabicContactPage() {
  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <SectionHeader
          description="نموذج التواصل وحفظ الرسائل وإرسال البريد عبر SMTP ستتم إضافتها في مرحلة مخصصة."
          eyebrow="تواصل معنا"
          title="هيكل صفحة التواصل"
        />
        <Card className="mt-10">
          <p className="leading-8 text-petrol/70">
            Contact form, validation, translated states, and admin message handling are out of Phase 1.
          </p>
        </Card>
      </Container>
    </main>
  );
}
