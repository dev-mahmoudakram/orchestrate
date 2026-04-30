import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export default function EnglishProjectsPage() {
  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <SectionHeader
          description="Project cards, featured flags, and sector filters will be added after database and CMS setup."
          eyebrow="Projects"
          title="Projects page foundation"
        />
        <Card className="mt-10">
          <p className="leading-8 text-petrol/70">
            This route is ready for CMS-backed project listings.
          </p>
        </Card>
      </Container>
    </main>
  );
}
