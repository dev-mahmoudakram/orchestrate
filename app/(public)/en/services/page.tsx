import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export default function EnglishServicesPage() {
  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <SectionHeader
          description="Services will be loaded from Prisma with translated content after the CMS phases."
          eyebrow="Services"
          title="Services page foundation"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["ServiceTranslation", "Sort order", "Publish state"].map((item) => (
            <Card key={item}>
              <p className="text-sm font-semibold text-petrol">{item}</p>
              <p className="mt-3 text-sm leading-7 text-petrol/65">Scheduled for CMS phases.</p>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
