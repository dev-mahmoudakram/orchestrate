import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export default function EnglishContactPage() {
  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <SectionHeader
          description="The contact form, saved messages, SMTP delivery, and translated status messages will be added in a later phase."
          eyebrow="Contact"
          title="Contact page foundation"
        />
        <Card className="mt-10">
          <p className="leading-8 text-petrol/70">Contact workflow is intentionally out of Phase 1.</p>
        </Card>
      </Container>
    </main>
  );
}
