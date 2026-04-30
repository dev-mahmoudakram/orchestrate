import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { localized } from "@/lib/public/content";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/types/locale";

export async function ProjectDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const project = await prisma.project.findFirst({
    where: {
      deletedAt: null,
      isPublished: true,
      slug,
    },
    include: {
      sector: { include: { translations: true } },
      translations: true,
    },
  });

  if (!project) {
    notFound();
  }

  const translation = localized(project.translations, locale);
  const sectorTranslation = project.sector ? localized(project.sector.translations, locale) : null;

  return (
    <main className="min-h-screen bg-soft py-16">
      <Container>
        <SectionHeader
          description={translation?.summary ?? undefined}
          eyebrow={sectorTranslation?.title ?? (locale === "ar" ? "دراسة حالة" : "Case Study")}
          title={translation?.title ?? project.slug}
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Card>
            <h2 className="text-lg font-semibold text-petrol">{locale === "ar" ? "التحدي" : "Challenge"}</h2>
            <p className="mt-4 text-sm leading-7 text-petrol/65">{translation?.challenge}</p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-petrol">{locale === "ar" ? "النهج المنظومي" : "Systemic Approach"}</h2>
            <p className="mt-4 text-sm leading-7 text-petrol/65">{translation?.approach}</p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-petrol">{locale === "ar" ? "النتائج المحققة" : "Results Achieved"}</h2>
            <p className="mt-4 text-sm leading-7 text-petrol/65">{translation?.results}</p>
          </Card>
        </div>
        {translation?.body ? (
          <Card className="mt-4">
            <p className="text-base leading-8 text-petrol/70">{translation.body}</p>
          </Card>
        ) : null}
      </Container>
    </main>
  );
}
