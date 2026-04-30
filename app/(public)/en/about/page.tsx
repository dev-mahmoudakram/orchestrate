import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export default function EnglishAboutPage() {
  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <SectionHeader
          description="Placeholder route for story, philosophy, values, and leadership content from the CMS."
          eyebrow="About"
          title="About page foundation"
        />
        <Card className="mt-10">
          <p className="leading-8 text-petrol/70">This is a Phase 1 structure placeholder.</p>
        </Card>
      </Container>
    </main>
  );
}
